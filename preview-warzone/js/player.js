/**
 * player.js — First-person player controller
 * Handles movement, jumping, camera pitch/yaw, health.
 */

class Player {
  constructor(scene, camera, controls) {
    this.scene    = scene;
    this.camera   = camera;
    this.controls = controls;

    // Stats
    this.maxHealth  = 100;
    this.health     = 100;
    this.alive      = true;
    this.kills      = 0;
    this._respawning = false;

    // Movement
    this.position   = new THREE.Vector3(0, 1.7, 0);
    this.velocity   = new THREE.Vector3();
    this.yaw        = 0;
    this.pitch      = 0;

    this.WALK_SPEED   = 7;
    this.SPRINT_SPEED = 12;
    this.JUMP_FORCE   = 8;
    this.GRAVITY      = 22;
    this.HEIGHT       = 1.7;

    this._grounded = true;
    this._bobTimer = 0;

    // Callbacks
    this.onDeath   = null;
    this.onHit     = null;

    camera.position.copy(this.position);
  }

  getPosition() { return this.position; }

  // ---- Update ----
  update(dt, mapBounds, walls) {
    if (!this.alive) return;

    const { dx, dy } = this.controls.consumeAimDelta();

    // Yaw / Pitch
    this.yaw   -= dx;
    this.pitch -= dy;
    this.pitch  = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.pitch));

    // Movement
    const move = this.controls.getMovement();
    const sprinting = this.controls.isSprinting() && move.z < 0;
    const speed = sprinting ? this.SPRINT_SPEED : this.WALK_SPEED;

    // World-space direction
    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right   = new THREE.Vector3( Math.cos(this.yaw), 0, -Math.sin(this.yaw));

    const desiredVel = new THREE.Vector3();
    desiredVel.addScaledVector(forward, -move.z * speed);
    desiredVel.addScaledVector(right,    move.x * speed);

    this.velocity.x = desiredVel.x;
    this.velocity.z = desiredVel.z;

    // Jump
    if (this.controls.consumeJump() && this._grounded) {
      this.velocity.y = this.JUMP_FORCE;
      this._grounded  = false;
    }

    // Gravity
    if (!this._grounded) {
      this.velocity.y -= this.GRAVITY * dt;
    }

    // Integrate
    this.position.x += this.velocity.x * dt;
    this.position.z += this.velocity.z * dt;
    this.position.y += this.velocity.y * dt;

    // Ground clamp
    if (this.position.y <= this.HEIGHT) {
      this.position.y = this.HEIGHT;
      this.velocity.y = 0;
      this._grounded  = true;
    }

    // Map bounds
    if (mapBounds) {
      this.position.x = Math.max(mapBounds.minX + 0.5, Math.min(mapBounds.maxX - 0.5, this.position.x));
      this.position.z = Math.max(mapBounds.minZ + 0.5, Math.min(mapBounds.maxZ - 0.5, this.position.z));
    }

    // Wall collisions (simple AABB push-out)
    if (walls) this._resolveWalls(walls);

    // Head bob
    const moving = Math.abs(move.x) + Math.abs(move.z) > 0.1;
    if (moving && this._grounded) {
      this._bobTimer += dt * (sprinting ? 14 : 9);
      const bobY = Math.abs(Math.sin(this._bobTimer)) * (sprinting ? 0.04 : 0.025);
      const bobX = Math.sin(this._bobTimer * 0.5) * (sprinting ? 0.02 : 0.01);
      this.camera.position.set(
        this.position.x + bobX,
        this.position.y + bobY,
        this.position.z
      );
    } else {
      this._bobTimer = 0;
      this.camera.position.copy(this.position);
    }

    // Apply rotation
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;

    // Sprint HUD
    const sprintEl = document.getElementById('sprint-icon');
    if (sprintEl) sprintEl.classList.toggle('hidden', !sprinting);
  }

  _resolveWalls(walls) {
    const RADIUS = 0.4;
    for (const wall of walls) {
      if (!wall.geometry) continue;
      wall.geometry.computeBoundingBox();
      const bb = wall.geometry.boundingBox.clone().applyMatrix4(wall.matrixWorld);
      // Expand by radius
      bb.min.x -= RADIUS; bb.max.x += RADIUS;
      bb.min.z -= RADIUS; bb.max.z += RADIUS;
      if (
        this.position.x > bb.min.x && this.position.x < bb.max.x &&
        this.position.z > bb.min.z && this.position.z < bb.max.z &&
        this.position.y < bb.max.y + 0.2
      ) {
        // Push out on closest axis
        const dx1 = this.position.x - bb.min.x;
        const dx2 = bb.max.x - this.position.x;
        const dz1 = this.position.z - bb.min.z;
        const dz2 = bb.max.z - this.position.z;
        const minD = Math.min(dx1, dx2, dz1, dz2);
        if (minD === dx1) this.position.x = bb.min.x;
        else if (minD === dx2) this.position.x = bb.max.x;
        else if (minD === dz1) this.position.z = bb.min.z;
        else this.position.z = bb.max.z;
      }
    }
  }

  // ---- Damage ----
  takeDamage(amount) {
    if (!this.alive) return;
    this.health = Math.max(0, this.health - amount);
    if (this.onHit) this.onHit(this.health, amount);
    if (this.health <= 0) this._die();
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  _die() {
    this.alive = false;
    if (this.onDeath) this.onDeath();
  }

  respawn(spawnPos) {
    this.health  = this.maxHealth;
    this.alive   = true;
    this.position.copy(spawnPos);
    this.velocity.set(0, 0, 0);
    this._grounded = true;
    this.pitch = 0;
  }

  addKill() { this.kills++; }
}
