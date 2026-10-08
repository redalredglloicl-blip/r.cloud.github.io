/**
 * weapon.js — Weapon definitions and first-person weapon mesh
 */

const WEAPONS = {
  AK47: {
    name:       'AK-47',
    damage:     25,
    fireRate:   0.1,    // seconds between shots
    magSize:    30,
    maxReserve: 90,
    reloadTime: 2.2,
    spread:     0.025,
    recoilX:    0.012,
    recoilY:    0.008,
    auto:       true,
    color:      0x2a2a2a,
    stockColor: 0x5c3a1e,
  },
  MP5: {
    name:       'MP5',
    damage:     18,
    fireRate:   0.07,
    magSize:    25,
    maxReserve: 75,
    reloadTime: 1.8,
    spread:     0.03,
    recoilX:    0.008,
    recoilY:    0.006,
    auto:       true,
    color:      0x1a1a1a,
    stockColor: 0x333333,
  },
  DEAGLE: {
    name:       'DEAGLE',
    damage:     55,
    fireRate:   0.5,
    magSize:    7,
    maxReserve: 35,
    reloadTime: 2.5,
    spread:     0.01,
    recoilX:    0.03,
    recoilY:    0.02,
    auto:       false,
    color:      0x888888,
    stockColor: 0x444444,
  },
};

class Weapon {
  constructor(scene, camera, config = WEAPONS.AK47) {
    this.scene    = scene;
    this.camera   = camera;
    this.config   = config;

    this.ammo     = config.magSize;
    this.reserve  = config.maxReserve;
    this.reloading = false;
    this._reloadTimer = 0;
    this._fireTimer   = 0;
    this._recoilX     = 0;
    this._recoilY     = 0;

    // Muzzle flash mesh
    this._flashMesh = null;
    this._flashTimer = 0;

    this._buildMesh();
    this._buildMuzzleFlash();
  }

  // ---- Build weapon visual ----
  _buildMesh() {
    const c = this.config;
    this.group = new THREE.Group();

    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.12, 0.55),
      new THREE.MeshStandardMaterial({ color: c.color, roughness: 0.7 })
    );
    body.position.set(0, 0, -0.1);
    this.group.add(body);

    // Barrel
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.018, 0.35, 8),
      new THREE.MeshStandardMaterial({ color: c.color, metalness: 0.8 })
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.01, -0.42);
    this.group.add(barrel);

    // Stock
    const stock = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.08, 0.2),
      new THREE.MeshStandardMaterial({ color: c.stockColor, roughness: 0.9 })
    );
    stock.position.set(0, -0.02, 0.18);
    this.group.add(stock);

    // Magazine
    const mag = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.16, 0.07),
      new THREE.MeshStandardMaterial({ color: c.color })
    );
    mag.position.set(0, -0.14, -0.05);
    this.group.add(mag);

    // Grip
    const grip = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.12, 0.07),
      new THREE.MeshStandardMaterial({ color: c.stockColor })
    );
    grip.rotation.x = -0.25;
    grip.position.set(0, -0.12, 0.08);
    this.group.add(grip);

    // Sight
    const sight = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.03, 0.015),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    sight.position.set(0, 0.075, -0.05);
    this.group.add(sight);

    // Position in camera space
    this.group.position.set(0.28, -0.26, -0.45);
    this.camera.add(this.group);

    // Barrel tip world position (for bullet spawn)
    this._barrelTip = new THREE.Object3D();
    this._barrelTip.position.set(0, 0.01, -0.62);
    this.group.add(this._barrelTip);
  }

  _buildMuzzleFlash() {
    const geo = new THREE.SphereGeometry(0.06, 6, 6);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffaa, transparent: true, opacity: 0.9 });
    this._flashMesh = new THREE.Mesh(geo, mat);
    this._flashMesh.position.set(0, 0.01, -0.62);
    this._flashMesh.visible = false;
    this.group.add(this._flashMesh);
  }

  /** Returns world position of barrel tip */
  getBarrelTipWorld() {
    const v = new THREE.Vector3();
    this._barrelTip.getWorldPosition(v);
    return v;
  }

  /** Returns world shooting direction */
  getShootDirection() {
    const dir = new THREE.Vector3(0, 0, -1);
    this.camera.getWorldQuaternion(this._tmpQuat || (this._tmpQuat = new THREE.Quaternion()));
    dir.applyQuaternion(this._tmpQuat);
    return dir;
  }

  /** Attempt to fire. Returns true if a shot happened. */
  tryFire(dt) {
    this._fireTimer -= dt;
    if (this.reloading || this._fireTimer > 0 || this.ammo <= 0) return false;

    this.ammo--;
    this._fireTimer = this.config.fireRate;

    // Recoil
    this._recoilX += this.config.recoilX * (1 + Math.random() * 0.5 - 0.25);
    this._recoilY += this.config.recoilY * (1 + Math.random() * 0.5);

    // Muzzle flash
    this._flashMesh.visible = true;
    this._flashTimer = 0.06;

    if (this.ammo === 0) this._autoReload();
    return true;
  }

  _autoReload() {
    if (this.reserve > 0) this.startReload();
  }

  startReload() {
    if (this.reloading || this.ammo === this.config.magSize || this.reserve === 0) return;
    this.reloading = true;
    this._reloadTimer = this.config.reloadTime;
  }

  update(dt) {
    // Muzzle flash
    if (this._flashTimer > 0) {
      this._flashTimer -= dt;
      if (this._flashTimer <= 0) this._flashMesh.visible = false;
    }

    // Reload countdown
    if (this.reloading) {
      this._reloadTimer -= dt;
      if (this._reloadTimer <= 0) this._finishReload();

      // Mag drop visual
      const t = 1 - (this._reloadTimer / this.config.reloadTime);
      this.group.position.y = -0.26 - Math.sin(t * Math.PI) * 0.04;
    } else {
      this.group.position.y = -0.26;
    }

    // Recoil recover
    this._recoilX *= 0.82;
    this._recoilY *= 0.82;

    // Bob
    const time = performance.now() * 0.001;
    this.group.position.x = 0.28 + Math.sin(time * 8) * 0.003 + this._recoilX;
    this.group.rotation.x = -0.04 + this._recoilY;
  }

  _finishReload() {
    const needed = this.config.magSize - this.ammo;
    const take   = Math.min(needed, this.reserve);
    this.ammo   += take;
    this.reserve -= take;
    this.reloading = false;
  }

  getAmmoState() {
    return { ammo: this.ammo, reserve: this.reserve, reloading: this.reloading };
  }

  switchTo(configName) {
    this.camera.remove(this.group);
    const cfg = WEAPONS[configName] || WEAPONS.AK47;
    this.config  = cfg;
    this.ammo    = cfg.magSize;
    this.reserve = cfg.maxReserve;
    this.reloading = false;
    this._fireTimer = 0;
    this._buildMesh();
    this._buildMuzzleFlash();
  }

  destroy() {
    this.camera.remove(this.group);
  }
}
