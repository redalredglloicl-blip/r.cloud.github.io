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
    // MINIMAL TEST: single bright pink capsule — if this renders, we build up
    const mat = new THREE.MeshBasicMaterial({ color: 0xFF1493 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 1.2, 6, 12), mat);
    body.position.y = 1.2;
    body.frustumCulled = false;
    g.add(body);
    this.torso = body;
    // keep references for animations (dummy groups)
    this.armL = new THREE.Group(); this.armR = new THREE.Group();
    this.legL = new THREE.Group(); this.legR = new THREE.Group();
    this.beacon = new THREE.Mesh(new THREE.OctahedronGeometry(0.25),
      new THREE.MeshBasicMaterial({ color: 0xFF1493 }));
    this.beacon.position.y = 2.8;
    this.beacon.frustumCulled = false;
    g.add(this.beacon);
    g.traverse((o) => { if (o.isMesh) o.frustumCulled = false; });
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
    // bob the whole body
    const bob = this.moving ? Math.abs(Math.sin(this.walkPhase)) * 0.08 : Math.sin(t * 2.2) * 0.03;
    this.group.position.y = this.pos.y + bob;
    this.beacon.position.y = 2.8 + Math.sin(t * 3) * 0.15;
    this.beacon.rotation.y = t * 2.5;
  }


}
