/**
 * enemy.js — Enemy NPC with patrol, chase, shoot AI
 */

const EnemyState = { PATROL: 'patrol', CHASE: 'chase', SHOOT: 'shoot', DEAD: 'dead' };

class Enemy {
  constructor(scene, bulletPool, spawnPos, id) {
    this.scene      = scene;
    this.bulletPool = bulletPool;
    this.id         = id;

    this.maxHealth  = 100;
    this.health     = 100;
    this.alive      = true;
    this.state      = EnemyState.PATROL;

    this.DETECT_RANGE  = 22;
    this.SHOOT_RANGE   = 14;
    this.MOVE_SPEED    = 4.0;
    this.SPRINT_SPEED  = 6.5;
    this.FIRE_RATE     = 1.2;  // seconds between shots
    this._fireTimer    = Math.random() * this.FIRE_RATE;
    this._patrolTarget = null;
    this._patrolTimer  = 0;

    this._respawnTimer = 0;
    this._respawnDelay = 8;
    this._spawnPos     = spawnPos.clone();

    this._hitFlashTimer = 0;
    this._deathTimer    = 0;

    this._buildMesh(spawnPos);
  }

  // ---- Build enemy visual ----
  _buildMesh(pos) {
    this.mesh = new THREE.Group();

    // Body
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3a5f3a, roughness: 0.8 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.85, 0.35), bodyMat);
    body.position.y = 1.0;
    body.castShadow = true;
    this.mesh.add(body);

    // Head
    const headMat = new THREE.MeshStandardMaterial({ color: 0xd4a47a, roughness: 0.6 });
    this._headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), headMat);
    this._headMesh.position.y = 1.7;
    this._headMesh.castShadow = true;
    this.mesh.add(this._headMesh);

    // Helmet
    const helmetMat = new THREE.MeshStandardMaterial({ color: 0x2a3a1a, roughness: 0.7 });
    const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.24, 0.46), helmetMat);
    helmet.position.y = 1.88;
    this.mesh.add(helmet);

    // Arms
    const armMat = new THREE.MeshStandardMaterial({ color: 0x3a5f3a, roughness: 0.8 });
    [-0.42, 0.42].forEach(x => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.65, 0.2), armMat);
      arm.position.set(x, 1.0, 0);
      arm.castShadow = true;
      this.mesh.add(arm);
    });

    // Legs
    [-0.18, 0.18].forEach(x => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.7, 0.25), armMat);
      leg.position.set(x, 0.35, 0);
      leg.castShadow = true;
      this.mesh.add(leg);
    });

    // Gun
    const gunMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9 });
    const gun = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.1, 0.5), gunMat);
    gun.position.set(0.42, 1.1, -0.3);
    this.mesh.add(gun);

    // Health bar (billboard)
    this._hpBarGroup = new THREE.Group();
    const bgGeo = new THREE.PlaneGeometry(0.7, 0.08);
    const bgMat = new THREE.MeshBasicMaterial({ color: 0x330000, side: THREE.DoubleSide });
    this._hpBg = new THREE.Mesh(bgGeo, bgMat);
    this._hpBarGroup.add(this._hpBg);

    const fgGeo = new THREE.PlaneGeometry(0.7, 0.08);
    const fgMat = new THREE.MeshBasicMaterial({ color: 0x22dd22, side: THREE.DoubleSide });
    this._hpFg = new THREE.Mesh(fgGeo, fgMat);
    this._hpFg.position.z = 0.001;
    this._hpBarGroup.add(this._hpFg);

    this._hpBarGroup.position.y = 2.2;
    this.mesh.add(this._hpBarGroup);

    this.mesh.position.copy(pos);
    this.scene.add(this.mesh);
  }

  // ---- AI Update ----
  update(dt, playerPos, camera) {
    if (!this.alive) {
      this._respawnTimer -= dt;
      if (this._respawnTimer <= 0) this._respawn();
      return;
    }

    // Death animation
    if (this.state === EnemyState.DEAD) {
      this._deathTimer += dt;
      this.mesh.rotation.z = Math.min(this._deathTimer * 3, Math.PI / 2);
      this.mesh.position.y -= dt * 0.5;
      if (this._deathTimer > 1.2) {
        this.mesh.visible = false;
        this.alive = false;
        this._respawnTimer = this._respawnDelay;
      }
      return;
    }

    // HP bar faces camera
    if (camera) {
      this._hpBarGroup.lookAt(camera.position);
    }

    // Hit flash
    if (this._hitFlashTimer > 0) {
      this._hitFlashTimer -= dt;
      const on = Math.sin(this._hitFlashTimer * 40) > 0;
      this.mesh.traverse(c => {
        if (c.isMesh && c.material) c.material.emissive?.set(on ? 0xff0000 : 0x000000);
      });
    }

    const dist = this.mesh.position.distanceTo(playerPos);

    // State machine
    if (dist <= this.SHOOT_RANGE) {
      this.state = EnemyState.SHOOT;
    } else if (dist <= this.DETECT_RANGE) {
      this.state = EnemyState.CHASE;
    } else {
      this.state = EnemyState.PATROL;
    }

    switch (this.state) {
      case EnemyState.PATROL: this._patrol(dt); break;
      case EnemyState.CHASE:  this._chase(dt, playerPos); break;
      case EnemyState.SHOOT:  this._shootAI(dt, playerPos); break;
    }

    // Keep on ground
    this.mesh.position.y = Math.max(this.mesh.position.y, 0);
  }

  _patrol(dt) {
    this._patrolTimer -= dt;
    if (!this._patrolTarget || this._patrolTimer <= 0) {
      this._patrolTarget = new THREE.Vector3(
        this._spawnPos.x + (Math.random() - 0.5) * 20,
        0,
        this._spawnPos.z + (Math.random() - 0.5) * 20
      );
      this._patrolTimer = 2 + Math.random() * 3;
    }
    this._moveTo(this._patrolTarget, this.MOVE_SPEED * 0.6, dt);
  }

  _chase(dt, playerPos) {
    const target = playerPos.clone();
    target.y = 0;
    this._moveTo(target, this.SPRINT_SPEED, dt);
  }

  _shootAI(dt, playerPos) {
    // Strafe while shooting
    const angle = Math.sin(performance.now() * 0.001 * 1.5 + this.id) * 0.4;
    const strafeDir = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
    this.mesh.position.add(strafeDir.multiplyScalar(this.MOVE_SPEED * 0.5 * dt));

    // Face player
    const dir = new THREE.Vector3().subVectors(playerPos, this.mesh.position).normalize();
    this.mesh.rotation.y = Math.atan2(dir.x, dir.z);

    // Fire
    this._fireTimer -= dt;
    if (this._fireTimer <= 0) {
      this._fireTimer = this.FIRE_RATE + (Math.random() - 0.5) * 0.4;
      this._fireAtPlayer(playerPos);
    }
  }

  _moveTo(target, speed, dt) {
    const dir = new THREE.Vector3().subVectors(target, this.mesh.position);
    dir.y = 0;
    const dist = dir.length();
    if (dist < 0.5) return;
    dir.normalize();
    this.mesh.position.add(dir.multiplyScalar(speed * dt));
    this.mesh.rotation.y = Math.atan2(dir.x, dir.z);

    // Leg animation
    const t = performance.now() * 0.003;
    this.mesh.children.forEach((c, i) => {
      if (i >= 5 && i <= 6) c.rotation.x = Math.sin(t + i) * 0.4;
    });
  }

  _fireAtPlayer(playerPos) {
    if (!this.bulletPool) return;
    // Aim with inaccuracy
    const origin = this.mesh.position.clone();
    origin.y += 1.4;
    const dir = new THREE.Vector3().subVectors(playerPos, origin).normalize();
    dir.x += (Math.random() - 0.5) * 0.18;
    dir.y += (Math.random() - 0.5) * 0.12;
    dir.z += (Math.random() - 0.5) * 0.18;
    dir.normalize();
    this.bulletPool.spawn(origin, dir, false, 12, 0);
  }

  // ---- Damage ----
  takeDamage(amount, isHeadshot = false) {
    if (!this.alive || this.state === EnemyState.DEAD) return false;
    this.health -= amount;
    this._hitFlashTimer = 0.3;

    // Update HP bar
    const pct = Math.max(0, this.health / this.maxHealth);
    this._hpFg.scale.x = pct;
    this._hpFg.position.x = -(1 - pct) * 0.35;
    if (pct < 0.35) this._hpFg.material.color.set(0xdd2200);
    else if (pct < 0.6) this._hpFg.material.color.set(0xddaa00);

    if (this.health <= 0) {
      this._die();
      return true; // killed
    }
    // Immediately chase if hurt
    if (this.state === EnemyState.PATROL) this.state = EnemyState.CHASE;
    return false;
  }

  _die() {
    this.state = EnemyState.DEAD;
    this._deathTimer = 0;
    this._hpBarGroup.visible = false;
    this._justKilled = true;
  }

  _respawn() {
    this.health = this.maxHealth;
    this.alive  = true;
    this.state  = EnemyState.PATROL;
    this._fireTimer = Math.random() * this.FIRE_RATE;
    this._deathTimer = 0;
    this._hpFg.scale.x = 1;
    this._hpFg.position.x = 0;
    this._hpFg.material.color.set(0x22dd22);
    this._hpBarGroup.visible = true;

    this.mesh.position.copy(this._spawnPos);
    this.mesh.rotation.set(0, 0, 0);
    this.mesh.visible = true;

    this.mesh.traverse(c => {
      if (c.isMesh && c.material) c.material.emissive?.set(0x000000);
    });
  }

  destroy() {
    this.scene.remove(this.mesh);
  }
}
