/* ============================================================
   TRAVEL MODE — Moon to Earth cinematic journey
   ============================================================ */
import * as THREE from 'three';

const TEX_BASE = 'https://unpkg.com/three@0.160.0/examples/textures/planets/';

export function createTravelMode(scene, camera) {
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');
  
  const state = {
    active: false,
    phase: 'idle', // idle, launch, cruise, entry, landing, done
    t: 0,
    earth: null,
    earthGroup: null,
    rocket: null,
    camera: camera,
    onDone: null,
  };

  // --- Build Earth ---
  function buildEarth() {
    const group = new THREE.Group();
    
    // Earth sphere - realistic
    const earthGeo = new THREE.SphereGeometry(60, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: loader.load(TEX_BASE + 'earth_atmos_2048.jpg'),
      normalMap: loader.load(TEX_BASE + 'earth_normal_2048.jpg'),
      specularMap: loader.load(TEX_BASE + 'earth_specular_2048.jpg'),
      specular: new THREE.Color(0x333333),
      shininess: 25,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    group.add(earth);
    state.earth = earth;
    
    // Clouds
    const cloudGeo = new THREE.SphereGeometry(60.8, 48, 48);
    const cloudMat = new THREE.MeshLambertMaterial({
      map: loader.load(TEX_BASE + 'earth_clouds_1024.png'),
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    clouds.name = 'clouds';
    group.add(clouds);
    
    // Atmosphere glow
    const atmGeo = new THREE.SphereGeometry(63, 48, 48);
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    group.add(new THREE.Mesh(atmGeo, atmMat));
    
    // Night lights (subtle)
    const nightGeo = new THREE.SphereGeometry(60.2, 48, 48);
    const nightMat = new THREE.MeshBasicMaterial({
      map: loader.load(TEX_BASE + 'earth_lights_2048.png'),
      transparent: true,
      opacity: 0.0, // fades in on night side
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const night = new THREE.Mesh(nightGeo, nightMat);
    night.name = 'night';
    group.add(night);
    
    // Position Earth far away
    group.position.set(0, 0, -800);
    scene.add(group);
    state.earthGroup = group;
    
    return group;
  }

  // --- Build simple rocket ---
  function buildRocket() {
    const group = new THREE.Group();
    
    // Body
    const bodyGeo = new THREE.CylinderGeometry(1.2, 1.2, 8, 16);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0xdddddd, shininess: 80 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);
    
    // Nose
    const noseGeo = new THREE.ConeGeometry(1.2, 3, 16);
    const noseMat = new THREE.MeshPhongMaterial({ color: 0xcc3333, shininess: 60 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.y = 5.5;
    group.add(nose);
    
    // Fins
    for (let i = 0; i < 4; i++) {
      const finGeo = new THREE.BoxGeometry(0.2, 2.5, 1.5);
      const finMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
      const fin = new THREE.Mesh(finGeo, finMat);
      const a = (i / 4) * Math.PI * 2;
      fin.position.set(Math.cos(a) * 1.3, -3.5, Math.sin(a) * 1.3);
      fin.rotation.y = -a;
      group.add(fin);
    }
    
    // Engine flame (initially hidden)
    const flameGeo = new THREE.ConeGeometry(0.9, 4, 12);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = -6;
    flame.rotation.x = Math.PI;
    flame.name = 'flame';
    flame.visible = false;
    group.add(flame);
    
    scene.add(group);
    state.rocket = group;
    return group;
  }

  // --- Start the journey ---
  function start(onDone) {
    state.active = true;
    state.phase = 'launch';
    state.t = 0;
    state.onDone = onDone;
    
    buildEarth();
    buildRocket();
    
    // Position rocket on moon surface
    state.rocket.position.set(0, 2, 0);
    
    // Cinematic camera start
    camera.position.set(15, 8, 20);
    camera.lookAt(0, 4, 0);
  }

  // --- Update (called each frame) ---
  function update(dt) {
    if (!state.active) return;
    state.t += dt;
    
    const cam = state.camera;
    const rocket = state.rocket;
    const earthGroup = state.earthGroup;
    
    switch (state.phase) {
      case 'launch': {
        // Rocket ascends, camera follows
        const t = Math.min(state.t / 8, 1);
        rocket.position.y = 2 + t * t * 120;
        rocket.getObjectByName('flame').visible = true;
        // Flame flicker
        const flame = rocket.getObjectByName('flame');
        flame.scale.set(1 + Math.random()*0.3, 1 + Math.random()*0.5, 1 + Math.random()*0.3);
        
        cam.position.set(15 - t*5, 8 + t*30, 20 - t*8);
        cam.lookAt(rocket.position);
        
        if (t >= 1) { state.phase = 'cruise'; state.t = 0; }
        break;
      }
      case 'cruise': {
        // Travel through space toward Earth
        const t = Math.min(state.t / 20, 1);
        // Earth approaches
        earthGroup.position.z = -800 + t * 700;
        // Rocket moves toward Earth
        rocket.position.z = -t * 60;
        rocket.position.y = 122 - t * 40;
        
        // Cinematic: camera orbits rocket with Earth growing
        const a = state.t * 0.3;
        cam.position.set(
          rocket.position.x + Math.cos(a) * 25,
          rocket.position.y + 8,
          rocket.position.z + Math.sin(a) * 25
        );
        cam.lookAt(earthGroup.position.x, earthGroup.position.y, earthGroup.position.z);
        
        // Rotate Earth slowly
        state.earth.rotation.y += dt * 0.05;
        const clouds = earthGroup.getObjectByName('clouds');
        if (clouds) clouds.rotation.y += dt * 0.07;
        
        if (t >= 1) { state.phase = 'entry'; state.t = 0; }
        break;
      }
      case 'entry': {
        // Atmospheric entry - fire effect
        const t = Math.min(state.t / 6, 1);
        rocket.position.z = -60 - t * 30;
        rocket.position.y = 82 - t * 60;
        
        // Entry glow
        const flame = rocket.getObjectByName('flame');
        flame.visible = true;
        flame.material.color.setHex(0xff3300);
        flame.scale.set(2, 3 + Math.random(), 2);
        
        cam.position.set(rocket.position.x + 20, rocket.position.y + 10, rocket.position.z + 25);
        cam.lookAt(rocket.position);
        
        // Earth fills view
        earthGroup.position.z = -100 + t * 30;
        earthGroup.scale.setScalar(1 + t * 0.5);
        
        if (t >= 1) { state.phase = 'landing'; state.t = 0; }
        break;
      }
      case 'landing': {
        // Gentle descent to Earth surface
        const t = Math.min(state.t / 8, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        
        rocket.position.y = 22 - ease * 18;
        rocket.getObjectByName('flame').visible = ease < 0.9;
        
        // Earth surface below
        earthGroup.position.set(0, -55 - ease*5, -70);
        
        cam.position.set(18, 12 - ease*4, 15);
        cam.lookAt(rocket.position);
        
        if (t >= 1) {
          state.phase = 'done';
          if (state.onDone) state.onDone();
        }
        break;
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
