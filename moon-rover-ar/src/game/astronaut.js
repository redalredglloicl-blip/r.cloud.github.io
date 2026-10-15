/* ============================================================
   ASTRONAUT — on-foot explorer mode (v2, rebuilt properly)
   - Procedural pink spacesuit with walk/idle/jump animations
   - Moon-style low gravity
   - frustumCulled disabled + own light: guaranteed visible
   ============================================================ */
import * as THREE from 'three';
import { clamp, lerp } from '../core/rng.js';

export const ASTRO = {
  GRAVITY: 3.2,
  WALK_SPEED: 4.2,
  RUN_SPEED: 7.5,
  JUMP_VEL: 5.2,
  TURN_RATE: 2.6,
};

function suitMat(color, emissive = 0x000000, eInt = 0) {
  return new THREE.MeshStandardMaterial({
    color, roughness: 0.5, metalness: 0.2,
    emissive, emissiveIntensity: eInt,
  });
}

export class Astronaut {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.frustumCulled = false;   // never let culling hide him
    this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3();
    this.yaw = 0;
    this.forward = new THREE.Vector3(0, 0, 1);
    this.grounded = true;
    this.walkPhase = 0;
    this.moving = false;
    this.active = false;

    this.build();
    this.group.visible = false;
    scene.add(this.group);
  }

  build() {
    const g = this.group;
    const suit = suitMat(0xFFF0F5);
    const pink = suitMat(0xFF69B4, 0xFF1493, 0.35);
    const deep = suitMat(0xC71585);
    const visor = suitMat(0x1a0a12);
    visor.roughness = 0.1; visor.metalness = 0.9;

    // torso
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.52, 6, 14), suit);
    torso.position.y = 1.18;
    g.add(torso);
    this.torso = torso;

    // glowing chest light (pink)
    const chestLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 12, 10),
      suitMat(0xFF69B4, 0xFF1493, 2.0)
    );
    chestLight.position.set(0, 1.32, 0.32);
    g.add(chestLight);

    // backpack
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.64, 0.3), suit);
    pack.position.set(0, 1.22, -0.38);
    g.add(pack);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.12, 0.32), pink);
    stripe.position.set(0, 1.38, -0.38);
    g.add(stripe);

    // helmet
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.31, 20, 16), suit);
    helmet.position.y = 1.88;
    g.add(helmet);
    const vis = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 20, 16, -1.1, 2.2, 1.1, 1.2), visor);
    vis.position.set(0, 1.88, 0.07);
    g.add(vis);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.05, 10, 24), pink);
    ring.position.y = 1.64;
    ring.rotation.x = Math.PI / 2;
    g.add(ring);

    // arms
    const mkArm = (s) => {
      const p = new THREE.Group();
      p.position.set(0.44 * s, 1.5, 0);
      const a = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.34, 6, 10), suit);
      a.position.y = -0.24;
      p.add(a);
      const glove = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), pink);
      glove.position.y = -0.5;
      p.add(glove);
      g.add(p);
      return p;
    };
    this.armL = mkArm(-1);
    this.armR = mkArm(1);

    // legs
    const mkLeg = (s) => {
      const p = new THREE.Group();
      p.position.set(0.2 * s, 0.84, 0);
      const l = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.36, 6, 10), suit);
      l.position.y = -0.26;
      p.add(l);
      const boot = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.36), deep);
      boot.position.set(0, -0.54, 0.06);
      p.add(boot);
      g.add(p);
      return p;
    };
    this.legL = mkLeg(-1);
    this.legR = mkLeg(1);

    // personal light — guarantees visibility + nice glow
    const lamp = new THREE.PointLight(0xFFB6C1, 12, 9, 1.6);
    lamp.position.set(0, 2.4, 0);
    g.add(lamp);

    // beacon diamond above head
    const beacon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.2),
      suitMat(0xFF1493, 0xFF1493, 2.5)
    );
    beacon.position.y = 2.95;
    g.add(beacon);
    this.beacon = beacon;

    // make everything cast shadow + disable culling per-mesh too
    g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } });
  }

  /** Spawn next to the rover, facing the rover's heading */
  spawnAt(x, y, z, yaw) {
    this.yaw = yaw;
    // 2.5m to the side
    this.pos.set(
      x + Math.cos(yaw) * 2.5,
      y,
      z - Math.sin(yaw) * 2.5
    );
    this.vel.set(0, 0, 0);
    this.grounded = false;   // let him drop to ground naturally
    this.forward.set(Math.sin(yaw), 0, Math.cos(yaw));
    this.active = true;
    this.group.visible = true;
    this.sync();
  }

  despawn() {
    this.active = false;
    this.group.visible = false;
  }

  step(dt, ctl, terrain) {
    if (!this.active) return;
    const throttle = clamp(ctl.throttle || 0, -1, 1);
    const steer = clamp(ctl.steer || 0, -1, 1);
    const boost = ctl.boost ? 1 : 0;

    this.yaw -= steer * ASTRO.TURN_RATE * dt;
    this.forward.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));

    const speed = lerp(ASTRO.WALK_SPEED, ASTRO.RUN_SPEED, boost) * throttle;
    const acc = this.grounded ? 12 : 4;
    this.vel.x = lerp(this.vel.x, this.forward.x * speed, Math.min(1, acc * dt));
    this.vel.z = lerp(this.vel.z, this.forward.z * speed, Math.min(1, acc * dt));
    this.vel.y -= ASTRO.GRAVITY * dt;

    if (ctl.jump && this.grounded) {
      this.vel.y = ASTRO.JUMP_VEL;
      this.grounded = false;
    }

    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    this.pos.y += this.vel.y * dt;

    const gy = terrain ? terrain.heightAt(this.pos.x, this.pos.z) : 0;
    if (this.pos.y <= gy) {
      this.pos.y = gy;
      this.vel.y = 0;
      this.grounded = true;
    } else if (this.pos.y > gy + 0.05) {
      this.grounded = false;
    }

    const hs = Math.hypot(this.vel.x, this.vel.z);
    this.moving = hs > 0.4;
    if (this.moving && this.grounded) this.walkPhase += dt * (4 + hs * 1.6);
    this.sync();
  }

  sync() {
    this.group.position.copy(this.pos);
    this.group.rotation.y = this.yaw;
  }

  updateVisuals(dt, t) {
    if (!this.active) return;
    const swing = (this.moving && this.grounded) ? Math.sin(this.walkPhase) * 0.55 : 0;
    const air = !this.grounded;

    if (air) {
      this.legL.rotation.x = lerp(this.legL.rotation.x, -0.5, dt * 8);
      this.legR.rotation.x = lerp(this.legR.rotation.x, 0.35, dt * 8);
      this.armL.rotation.x = lerp(this.armL.rotation.x, -0.9, dt * 8);
      this.armR.rotation.x = lerp(this.armR.rotation.x, -0.9, dt * 8);
    } else {
      this.legL.rotation.x = swing;
      this.legR.rotation.x = -swing;
      this.armL.rotation.x = -swing * 0.8;
      this.armR.rotation.x = swing * 0.8;
    }

    const bob = this.moving ? Math.abs(Math.sin(this.walkPhase)) * 0.05 : Math.sin(t * 2.2) * 0.02;
    this.torso.position.y = 1.18 + bob;
    this.beacon.position.y = 2.95 + Math.sin(t * 3) * 0.15;
    this.beacon.rotation.y = t * 2.5;
  }
}
