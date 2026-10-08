/**
 * bullet.js — Bullet pool and collision
 * Uses object pooling to avoid GC spikes.
 */

class BulletPool {
  constructor(scene, poolSize = 60) {
    this.scene    = scene;
    this.poolSize = poolSize;
    this.pool     = [];   // inactive bullets
    this.active   = [];   // live bullets

    this.SPEED    = 80;   // units/s
    this.MAX_LIFE = 1.8;  // seconds before auto-recycle
    this.RADIUS   = 0.06;

    this._initPool();
  }

  _initPool() {
    const geo = new THREE.SphereGeometry(this.RADIUS, 4, 4);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffdd44 });
    for (let i = 0; i < this.poolSize; i++) {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      mesh.userData = {
        velocity: new THREE.Vector3(),
        life: 0,
        alive: false,
        fromPlayer: true,
        damage: 20,
      };
      this.scene.add(mesh);
      this.pool.push(mesh);
    }
  }

  /**
   * Spawn a bullet.
   * @param {THREE.Vector3} origin
   * @param {THREE.Vector3} direction  — normalised
   * @param {boolean} fromPlayer
   * @param {number}  damage
   * @param {number}  spread  — radians
   */
  spawn(origin, direction, fromPlayer = true, damage = 20, spread = 0) {
    const bullet = this.pool.pop();
    if (!bullet) return null; // pool empty, skip

    const ud = bullet.userData;
    bullet.position.copy(origin);

    // Apply spread
    const dir = direction.clone();
    if (spread > 0) {
      dir.x += (Math.random() - 0.5) * spread;
      dir.y += (Math.random() - 0.5) * spread;
      dir.z += (Math.random() - 0.5) * spread;
      dir.normalize();
    }
    ud.velocity.copy(dir).multiplyScalar(this.SPEED);
    ud.life       = 0;
    ud.alive      = true;
    ud.fromPlayer = fromPlayer;
    ud.damage     = damage;
    bullet.visible = true;

    this.active.push(bullet);
    return bullet;
  }

  _recycle(bullet) {
    bullet.visible = false;
    bullet.userData.alive = false;
    const idx = this.active.indexOf(bullet);
    if (idx !== -1) this.active.splice(idx, 1);
    this.pool.push(bullet);
  }

  /**
   * Update all active bullets.
   * @param {number} dt  seconds
   * @param {Array}  enemies  — array of Enemy instances
   * @param {Array}  walls    — THREE.Object3D array for env collision
   * @param {object} player   — Player instance (for enemy bullet hits)
   */
  update(dt, enemies, walls, player) {
    const raycaster = new THREE.Raycaster();

    for (let i = this.active.length - 1; i >= 0; i--) {
      const b = this.active[i];
      const ud = b.userData;

      ud.life += dt;
      if (ud.life > this.MAX_LIFE) { this._recycle(b); continue; }

      const moveVec = ud.velocity.clone().multiplyScalar(dt);
      const dist    = moveVec.length();

      // Ray cast for hit detection (sweep this frame)
      raycaster.set(b.position, ud.velocity.clone().normalize());
      raycaster.far = dist + 0.1;

      let hit = false;

      // --- Environment walls ---
      if (walls.length) {
        const envHits = raycaster.intersectObjects(walls, false);
        if (envHits.length && envHits[0].distance <= dist + 0.1) {
          this._recycle(b);
          hit = true;
        }
      }
      if (hit) continue;

      // --- Enemy / Player hits ---
      if (ud.fromPlayer) {
        for (const enemy of enemies) {
          if (!enemy.alive) continue;
          if (b.position.distanceTo(enemy.mesh.position) < 0.9) {
            const isHead = b.position.y > enemy.mesh.position.y + 1.2;
            enemy.takeDamage(isHead ? ud.damage * 2.5 : ud.damage, isHead);
            this._recycle(b);
            hit = true;
            break;
          }
        }
      } else {
        // Enemy bullet — hit player
        if (player && b.position.distanceTo(player.getPosition()) < 0.7) {
          player.takeDamage(ud.damage);
          this._recycle(b);
          continue;
        }
      }
      if (!hit) b.position.add(moveVec);
    }
  }

  destroy() {
    [...this.active, ...this.pool].forEach(b => this.scene.remove(b));
    this.active = []; this.pool = [];
  }
}
