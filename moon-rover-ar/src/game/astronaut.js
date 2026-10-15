/* ============================================================
   ASTRONAUT — on-foot explorer mode
   Procedural spacesuit character with walk/idle/jump animations,
   moon-style low gravity. Mimics the Rover interface (pos, forward,
   up, step, sync, updateVisuals) so the camera rig just works.
   ============================================================ */
import * as THREE from 'three';
import { clamp, lerp } from '../core/rng.js';

export const ASTRO = {
  GRAVITY: 3.2,        // floaty moon-ish gravity (m/s^2)
  WALK_SPEED: 4.2,     // m/s
  RUN_SPEED: 7.5,      // m/s with boost
  JUMP_VEL: 5.2,       // floaty jump
  TURN_RATE: 2.6,      // rad/s
};

function pinkMat(color, opts = {}) {
  return new THREE.MeshStandardMaterial(Object.assign({
    color, roughness: 0.55, metalness: 0.15,
  }, opts));
}

export class Astronaut {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.pos = new THREE.Vector3(0, 0, 0);
    this.vel = new THREE.Vector3();
    this.forward = new THREE.Vector3(0, 0, 1);
    this.up = new THREE.Vector3(0, 1, 0);
    this.yaw = 0;
    this.grounded = true;
    this.walkPhase = 0;
    this.moving = false;
    this.visible = false;

    this.build();
    this.group.visible = false;
    scene.add(this.group);
  }

  build() {
    const g = this.group;
    const suit = pinkMat(0xFFF0F5);        // white-pink suit
    const accent = pinkMat(0xFF69B4);      // hot pink accents
    const dark = pinkMat(0xC71585);        // deep pink joints
    const visor = new THREE.MeshStandardMaterial({
      color: 0x1a0a12, roughness: 0.1, metalness: 0.9,
    });

    // ---- torso ----
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.5, 6, 14), suit);
    torso.position.y = 1.15;
    torso.castShadow = true;
    g.add(torso);
    this.torso = torso;

    // chest pack (pink)
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.18), accent);
    chest.position.set(0, 1.25, 0.28);
    chest.castShadow = true;
    g.add(chest);

    // ---- backpack ----
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.62, 0.3), suit);
    pack.position.set(0, 1.2, -0.36);
    pack.castShadow = true;
    g.add(pack);
    const packStripe = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.1, 0.32), accent);
    packStripe.position.set(0, 1.35, -0.36);
    g.add(packStripe);

    // ---- helmet ----
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.30, 20, 16), suit);
    helmet.position.y = 1.85;
    helmet.castShadow = true;
    g.add(helmet);
    // visor
    const vis = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 16, -Math.PI / 3.2, Math.PI / 1.6, Math.PI / 4.5, Math.PI / 2.6), visor);
    vis.position.set(0, 1.85, 0.08);
    g.add(vis);
    // helmet ring (pink)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.30, 0.045, 10, 24), accent);
    ring.position.y = 1.62;
    ring.rotation.x = Math.PI / 2;
    g.add(ring);

    // ---- arms (pivot groups at shoulders) ----
    const mkArm = (side) => {
      const pivot = new THREE.Group();
      pivot.position.set(0.42 * side, 1.48, 0);
      const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.32, 6, 10), suit);
      upper.position.y = -0.22;
      upper.castShadow = true;
      pivot.add(upper);
      const glove = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), accent);
      glove.position.y = -0.48;
      glove.castShadow = true;
      pivot.add(glove);
      // shoulder joint
      const joint = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), dark);
      pivot.add(joint);
      g.add(pivot);
      return pivot;
    };
    this.armL = mkArm(-1);
    this.armR = mkArm(1);

    // ---- legs (pivot groups at hips) ----
    const mkLeg = (side) => {
      const pivot = new THREE.Group();
      pivot.position.set(0.19 * side, 0.82, 0);
      const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.34, 6, 10), suit);
      thigh.position.y = -0.24;
      thigh.castShadow = true;
      pivot.add(thigh);
      const boot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.34), dark);
      boot.position.set(0, -0.52, 0.06);
      boot.castShadow = true;
      pivot.add(boot);
      // hip joint
      const joint = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10), dark);
      pivot.add(joint);
      g.add(pivot);
      return pivot;
    };
    this.legL = mkLeg(-1);
    this.legR = mkLeg(1);

    // antenna
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4, 6), dark);
    ant.position.set(0.2, 2.15, -0.36);
    g.add(ant);
    const antTip = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xFF1493, emissive: 0xFF1493, emissiveIntensity: 1.2 }));
    antTip.position.set(0.2, 2.36, -0.36);
    g.add(antTip);
    this.antTip = antTip;
  }

  /** Place astronaut next to the rover and activate on-foot mode */
  exitFrom(roverPos, roverYaw) {
    this.yaw = roverYaw;
    const off = new THREE.Vector3(Math.cos(roverYaw), 0, -Math.sin(roverYaw));
    this.pos.copy(roverPos).addScaledVector(off, 2.2);
    this.vel.set(0, 0, 0);
    this.grounded = true;
    this.visible = true;
    this.group.visible = true;
    this.sync();
  }

  hide() {
    this.visible = false;
    this.group.visible = false;
  }

  step(dt, ctl, terrain) {
    if (!this.visible) return;

    const throttle = clamp(ctl.throttle || 0, -1, 1);
    const steer = clamp(ctl.steer || 0, -1, 1);
    const boost = ctl.boost ? 1 : 0;

    // turn
    this.yaw -= steer * ASTRO.TURN_RATE * dt;
    this.forward.set(Math.sin(this.yaw), 0, Math.cos(this.yaw));

    // move
    const speed = lerp(ASTRO.WALK_SPEED, ASTRO.RUN_SPEED, boost) * throttle;
    const targetVx = this.forward.x * speed;
    const targetVz = this.forward.z * speed;
    const accel = this.grounded ? 14 : 4;
    this.vel.x = lerp(this.vel.x, targetVx, Math.min(1, accel * dt));
    this.vel.z = lerp(this.vel.z, targetVz, Math.min(1, accel * dt));

    // gravity (low!)
    this.vel.y -= ASTRO.GRAVITY * dt;

    // jump
    if (ctl.jump && this.grounded) {
      this.vel.y = ASTRO.JUMP_VEL;
      this.grounded = false;
    }

    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;
    this.pos.y += this.vel.y * dt;

    // ground collision
    const groundY = terrain ? terrain.heightAt(this.pos.x, this.pos.z) : 0;
    if (this.pos.y <= groundY) {
      this.pos.y = groundY;
      this.vel.y = 0;
      this.grounded = true;
    } else if (this.pos.y > groundY + 0.05) {
      this.grounded = false;
    }

    // walk animation phase
    const hSpeed = Math.hypot(this.vel.x, this.vel.z);
    this.moving = hSpeed > 0.4;
    if (this.moving && this.grounded) {
      this.walkPhase += dt * (4 + hSpeed * 1.6);
    }

    this.sync();
  }

  sync() {
    this.group.position.copy(this.pos);
    this.group.rotation.y = this.yaw;
  }

  updateVisuals(dt, elapsed) {
    if (!this.visible) return;
    const t = elapsed;
    const swing = this.moving && this.grounded ? Math.sin(this.walkPhase) * 0.55 : 0;
    const airPose = !this.grounded;

    // legs
    if (airPose) {
      // tuck legs when jumping
      this.legL.rotation.x = lerp(this.legL.rotation.x, -0.5, dt * 8);
      this.legR.rotation.x = lerp(this.legR.rotation.x, 0.35, dt * 8);
    } else {
      this.legL.rotation.x = swing;
      this.legR.rotation.x = -swing;
    }

    // arms (opposite swing)
    if (airPose) {
      this.armL.rotation.x = lerp(this.armL.rotation.x, -0.9, dt * 8);
      this.armR.rotation.x = lerp(this.armR.rotation.x, -0.9, dt * 8);
      this.armL.rotation.z = 0.5; this.armR.rotation.z = -0.5;
    } else {
      this.armL.rotation.x = -swing * 0.8;
      this.armR.rotation.x = swing * 0.8;
      this.armL.rotation.z = 0.12; this.armR.rotation.z = -0.12;
    }

    // idle breathing bob
    const bob = this.moving ? Math.abs(Math.sin(this.walkPhase)) * 0.05 : Math.sin(t * 2.2) * 0.02;
    this.torso.position.y = 1.15 + bob;
    this.group.position.y = this.pos.y + (airPose ? 0 : bob * 0.4);

    // antenna blink
    this.antTip.material.emissiveIntensity = 0.8 + Math.sin(t * 5) * 0.6;
  }
}
