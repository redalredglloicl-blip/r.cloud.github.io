/* ============================================================
   TRAVEL MODE — Moon to Earth (procedural, no external textures)
   ============================================================ */
import * as THREE from 'three';

export function createTravelMode(scene, camera) {
  const state = {
    active: false,
    phase: 'idle',
    t: 0,
    earth: null,
    earthGroup: null,
    rocket: null,
    camera: camera,
    onDone: null,
  };

  // Procedural Earth texture
  function makeEarthTexture() {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    const ctx = c.getContext('2d');
    // Ocean
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#1a4d8f');
    grad.addColorStop(0.5, '#1e6bb8');
    grad.addColorStop(1, '#1a4d8f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);
    // Continents (simplified)
    ctx.fillStyle = '#3d8b37';
    const lands = [
      [150, 120, 180, 100], [400, 80, 150, 120], [650, 150, 200, 130],
      [850, 100, 120, 90], [300, 300, 160, 100], [600, 320, 180, 80],
    ];
    lands.forEach(([x, y, w, h]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, w/2, h/2, Math.random(), 0, Math.PI*2);
      ctx.fill();
      // Detail
      ctx.fillStyle = '#4da34d';
      ctx.beginPath();
      ctx.ellipse(x+20, y+10, w/4, h/4, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#3d8b37';
    });
    // Ice caps
    ctx.fillStyle = '#e8f4ff';
    ctx.fillRect(0, 0, 1024, 30);
    ctx.fillRect(0, 482, 1024, 30);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }

  function makeCloudTexture() {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 256;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 512, 256);
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 512, y = Math.random() * 256;
      const r = 15 + Math.random() * 40;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(255,255,255,0.7)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(c);
  }

  function buildEarth() {
    const group = new THREE.Group();
    const earthGeo = new THREE.SphereGeometry(60, 48, 48);
    const earthMat = new THREE.MeshPhongMaterial({
      map: makeEarthTexture(),
      shininess: 20,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    group.add(earth);
    state.earth = earth;
    
    const cloudGeo = new THREE.SphereGeometry(61, 32, 32);
    const cloudMat = new THREE.MeshLambertMaterial({
      map: makeCloudTexture(),
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    clouds.name = 'clouds';
    group.add(clouds);
    
    const atmGeo = new THREE.SphereGeometry(64, 32, 32);
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0x4488ff, transparent: true, opacity: 0.15,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    group.add(new THREE.Mesh(atmGeo, atmMat));
    
    group.position.set(0, 0, -800);
    scene.add(group);
    state.earthGroup = group;
    return group;
  }

  function buildRocket() {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 8, 12),
      new THREE.MeshPhongMaterial({ color: 0xdddddd })
    );
    group.add(body);
    const nose = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 3, 12),
      new THREE.MeshPhongMaterial({ color: 0xcc3333 })
    );
    nose.position.y = 5.5;
    group.add(nose);
    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.9, 4, 8),
      new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })
    );
    flame.position.y = -6;
    flame.rotation.x = Math.PI;
    flame.name = 'flame';
    flame.visible = false;
    group.add(flame);
    scene.add(group);
    state.rocket = group;
    return group;
  }

  function start(onDone) {
    state.active = true;
    state.phase = 'launch';
    state.t = 0;
    state.onDone = onDone;
    buildEarth();
    buildRocket();
    state.rocket.position.set(0, 2, 0);
    camera.position.set(15, 8, 20);
    camera.lookAt(0, 4, 0);
  }

  function update(dt) {
    if (!state.active) return;
    state.t += dt;
    const cam = state.camera, rocket = state.rocket, earthGroup = state.earthGroup;
    
    if (state.phase === 'launch') {
      const t = Math.min(state.t / 6, 1);
      rocket.position.y = 2 + t * t * 100;
      rocket.getObjectByName('flame').visible = true;
      cam.position.set(15 - t*5, 8 + t*25, 20 - t*8);
      cam.lookAt(rocket.position);
      if (t >= 1) { state.phase = 'cruise'; state.t = 0; }
    } else if (state.phase === 'cruise') {
      const t = Math.min(state.t / 15, 1);
      earthGroup.position.z = -800 + t * 700;
      rocket.position.z = -t * 50;
      rocket.position.y = 102 - t * 30;
      const a = state.t * 0.4;
      cam.position.set(rocket.position.x + Math.cos(a)*22, rocket.position.y + 8, rocket.position.z + Math.sin(a)*22);
      cam.lookAt(0, 0, earthGroup.position.z);
      state.earth.rotation.y += dt * 0.05;
      const clouds = earthGroup.getObjectByName('clouds');
      if (clouds) clouds.rotation.y += dt * 0.08;
      if (t >= 1) { state.phase = 'entry'; state.t = 0; }
    } else if (state.phase === 'entry') {
      const t = Math.min(state.t / 5, 1);
      rocket.position.z = -50 - t * 25;
      rocket.position.y = 72 - t * 50;
      const flame = rocket.getObjectByName('flame');
      flame.visible = true;
      flame.scale.set(2, 2.5, 2);
      cam.position.set(rocket.position.x + 18, rocket.position.y + 10, rocket.position.z + 22);
      cam.lookAt(rocket.position);
      earthGroup.position.z = -100 + t * 25;
      if (t >= 1) { state.phase = 'landing'; state.t = 0; }
    } else if (state.phase === 'landing') {
      const t = Math.min(state.t / 6, 1);
      const ease = 1 - Math.pow(1-t, 3);
      rocket.position.y = 22 - ease * 18;
      rocket.getObjectByName('flame').visible = ease < 0.85;
      earthGroup.position.set(0, -58, -70);
      cam.position.set(16, 10, 14);
      cam.lookAt(rocket.position);
      if (t >= 1) {
        state.phase = 'done';
        state.active = false;
        if (state.onDone) state.onDone();
      }
    }
  }

  function stop() {
    state.active = false;
    if (state.earthGroup) scene.remove(state.earthGroup);
    if (state.rocket) scene.remove(state.rocket);
    state.phase = 'idle';
  }

  return { start, update, stop, state };
}
