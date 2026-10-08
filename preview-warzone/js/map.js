/**
 * map.js — Builds Three.js geometry from MAP1 data
 */

class MapBuilder {
  constructor(scene, mapData) {
    this.scene   = scene;
    this.data    = mapData;
    this.walls   = [];        // collidable meshes
    this._meshes = [];        // all meshes for cleanup

    this._buildGround();
    this._buildSkybox();
    this._buildBuildings();
    this._buildLighting();
    this._buildFog();
    this._buildGroundDecals();
  }

  // ---- Ground ----
  _buildGround() {
    const geo = new THREE.PlaneGeometry(100, 100, 20, 20);
    const mat = new THREE.MeshStandardMaterial({
      color: this.data.groundColor,
      roughness: 0.95, metalness: 0.0,
    });

    // Grid lines texture via canvas
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#3a3f38';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= size; i += size / 10) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(size, i); ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 8);
    mat.map = tex;

    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this._meshes.push(ground);
  }

  // ---- Skybox ----
  _buildSkybox() {
    // Gradient sky using canvas
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0.0, '#0d1520');
    grad.addColorStop(0.4, '#1a2535');
    grad.addColorStop(0.7, '#253045');
    grad.addColorStop(1.0, '#303a50');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Stars
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size * 0.6;
      const r = Math.random() * 1.2 + 0.3;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
    }

    const skyTex = new THREE.CanvasTexture(canvas);
    const skyGeo = new THREE.SphereGeometry(180, 16, 8);
    const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(sky);
    this._meshes.push(sky);

    // Moon
    const moonGeo = new THREE.SphereGeometry(4, 12, 8);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xddeeff });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.set(-60, 80, -120);
    this.scene.add(moon);
    this._meshes.push(moon);
  }

  // ---- Buildings ----
  _buildBuildings() {
    for (const b of this.data.buildings) {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const mat = new THREE.MeshStandardMaterial({
        color: b.color,
        roughness: 0.85,
        metalness: 0.05,
      });

      // Add subtle window texture
      const cSize = 128;
      const cv = document.createElement('canvas');
      cv.width = cv.height = cSize;
      const cx = cv.getContext('2d');
      cx.fillStyle = `#${b.color.toString(16).padStart(6,'0')}`;
      cx.fillRect(0, 0, cSize, cSize);

      // Random window grid
      cx.fillStyle = 'rgba(30,60,90,0.6)';
      const cols = Math.max(2, Math.floor(b.w * 1.5));
      const rows = Math.max(2, Math.floor(b.h * 1.5));
      const cw = cSize / cols, ch = cSize / rows;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (Math.random() > 0.35) {
            cx.fillRect(c*cw + 3, r*ch + 3, cw - 6, ch - 6);
          }
        }
      }
      const tex = new THREE.CanvasTexture(cv);
      mat.map = tex;

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.x, b.h / 2, b.z);
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this._meshes.push(mesh);
      this.walls.push(mesh);

      // Rooftop edge trim
      const trimGeo = new THREE.BoxGeometry(b.w + 0.2, 0.15, b.d + 0.2);
      const trimMat = new THREE.MeshStandardMaterial({ color: 0x223344, roughness: 0.6 });
      const trim = new THREE.Mesh(trimGeo, trimMat);
      trim.position.set(b.x, b.h + 0.075, b.z);
      trim.castShadow = true;
      this.scene.add(trim);
      this._meshes.push(trim);
    }
  }

  // ---- Lighting ----
  _buildLighting() {
    // Ambient
    const ambient = new THREE.AmbientLight(0x334455, 0.6);
    this.scene.add(ambient);

    // Moon directional
    const moon = new THREE.DirectionalLight(0x8899bb, 0.9);
    moon.position.set(-20, 40, -30);
    moon.castShadow = true;
    moon.shadow.mapSize.width  = 1024;
    moon.shadow.mapSize.height = 1024;
    moon.shadow.camera.near   = 0.5;
    moon.shadow.camera.far    = 120;
    moon.shadow.camera.left   = -50;
    moon.shadow.camera.right  =  50;
    moon.shadow.camera.top    =  50;
    moon.shadow.camera.bottom = -50;
    moon.shadow.bias = -0.001;
    this.scene.add(moon);

    // Warm accent (fire barrel simulation)
    const fire1 = new THREE.PointLight(0xff7722, 1.2, 18);
    fire1.position.set(-8, 1.5, 5);
    this.scene.add(fire1);

    const fire2 = new THREE.PointLight(0xff6600, 1.0, 15);
    fire2.position.set(10, 1.5, -5);
    this.scene.add(fire2);

    this._fireLights = [fire1, fire2];
  }

  // ---- Fog ----
  _buildFog() {
    this.scene.fog = new THREE.FogExp2(this.data.skyColor, this.data.fogDensity);
  }

  // ---- Ground decals ----
  _buildGroundDecals() {
    // Road lines
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.9 });

    const makeRoad = (x, z, w, d) => {
      const g = new THREE.BoxGeometry(w, 0.02, d);
      const m = new THREE.Mesh(g, roadMat);
      m.position.set(x, 0.01, z);
      m.receiveShadow = true;
      this.scene.add(m);
      this._meshes.push(m);
    };

    makeRoad(0, 0, 5, 80);   // vertical road
    makeRoad(0, 0, 80, 5);   // horizontal road

    // Debris / rubble scattered
    const rubbleMat = new THREE.MeshStandardMaterial({ color: 0x4a4540, roughness: 1 });
    for (let i = 0; i < 30; i++) {
      const geo = new THREE.BoxGeometry(
        0.3 + Math.random() * 0.6,
        0.1 + Math.random() * 0.3,
        0.3 + Math.random() * 0.6
      );
      const mesh = new THREE.Mesh(geo, rubbleMat);
      let px, pz;
      do {
        px = (Math.random() - 0.5) * 70;
        pz = (Math.random() - 0.5) * 70;
      } while (Math.abs(px) < 3 && Math.abs(pz) < 3); // avoid spawn
      mesh.position.set(px, 0.1, pz);
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this._meshes.push(mesh);
    }
  }

  /** Flicker fire lights — call every frame */
  updateLights() {
    for (const fl of this._fireLights) {
      fl.intensity = 0.9 + Math.random() * 0.6;
    }
  }

  destroy() {
    for (const m of this._meshes) this.scene.remove(m);
    this._meshes = []; this.walls = [];
  }
}
