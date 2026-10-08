/**
 * game.js — Main game class
 * Orchestrates scene, player, enemies, bullets, UI, and game loop.
 */

class Game {
  constructor() {
    this._running     = false;
    this._paused      = false;
    this._animFrame   = null;
    this._lastTime    = 0;
    this._initialized = false;

    // Game state
    this.kills       = 0;
    this.totalKills  = 20; // kills needed to win
    this._playerDead = false;
    this._gameOver   = false;
  }

  // ---- Init ----
  init() {
    this._setupRenderer();
    this._setupScene();
    this._setupCamera();
    this._setupAudio();
    this._setupMap();
    this._setupBullets();
    this._setupPlayer();
    this._setupEnemies();
    this._setupWeapon();
    this._setupUI();
    this._setupControls();
    this._setupEventListeners();
    this._showClickToStart();

    this._running = true;
    this._lastTime = performance.now();
    this._loop(this._lastTime);
    this._initialized = true;
  }

  // ---- Renderer ----
  _setupRenderer() {
    this._canvas = document.getElementById('game-canvas');
    this._renderer = new THREE.WebGLRenderer({
      canvas:    this._canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    this._renderer.outputEncoding    = THREE.sRGBEncoding;
    this._renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    this._renderer.toneMappingExposure = 1.1;

    window.addEventListener('resize', () => {
      this._camera.aspect = window.innerWidth / window.innerHeight;
      this._camera.updateProjectionMatrix();
      this._renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ---- Scene ----
  _setupScene() {
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(MAP1.skyColor);
  }

  // ---- Camera ----
  _setupCamera() {
    this._camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.05,
      300
    );
    this._scene.add(this._camera);
  }

  // ---- Audio ----
  _setupAudio() {
    this._audio = new AudioManager();
  }

  // ---- Map ----
  _setupMap() {
    this._mapBuilder = new MapBuilder(this._scene, MAP1);
    this._walls      = this._mapBuilder.walls;
    this._mapBounds  = MAP1.bounds;
  }

  // ---- Bullets ----
  _setupBullets() {
    this._bulletPool = new BulletPool(this._scene, 80);
  }

  // ---- Player ----
  _setupPlayer() {
    this._controls = new Controls(2.0);
    this._controls.init(this._canvas);

    const spawn = MAP1.playerSpawn;
    this._player = new Player(this._scene, this._camera, this._controls);
    this._player.position.set(spawn.x, MAP1.playerSpawn.y + 1.7, spawn.z);

    this._player.onHit = (hp, dmg) => {
      this._ui.setHealth(hp);
      this._ui.showDamageVignette();
      this._audio.playPlayerHurt();
    };

    this._player.onDeath = () => {
      this._onPlayerDeath();
    };
  }

  // ---- Enemies ----
  _setupEnemies() {
    this._enemies = [];
    MAP1.enemySpawns.forEach((sp, i) => {
      const pos = new THREE.Vector3(sp.x, 0, sp.z);
      const enemy = new Enemy(this._scene, this._bulletPool, pos, i);
      this._enemies.push(enemy);
    });
  }

  // ---- Weapon ----
  _setupWeapon() {
    this._weapon = new Weapon(this._scene, this._camera, WEAPONS.AK47);
    this._currentWeaponKey = 'AK47';
  }

  // ---- UI ----
  _setupUI() {
    this._ui = new UI();
    this._ui.setHealth(100);
    this._ui.setAmmo(30, 90, false);
    this._ui.setWeaponName('AK-47');
    this._ui.setScore(0);
  }

  // ---- Controls event listeners ----
  _setupControls() {
    // Pause on pointer unlock
    document.addEventListener('pointerlockchange', () => {
      if (!document.pointerLockElement && this._running && !this._playerDead && !this._gameOver) {
        this._showPause();
      }
    });
  }

  // ---- Menu buttons ----
  _setupEventListeners() {
    const btnResume = document.getElementById('btn-resume');
    const btnMenu   = document.getElementById('btn-menu');
    const btnRestart = document.getElementById('btn-restart');
    const btnToMenu  = document.getElementById('btn-to-menu');
    const cts        = document.getElementById('click-to-start');

    btnResume?.addEventListener('click', () => this._resumeGame());
    btnMenu?.addEventListener('click',   () => this._goToMenu());
    btnRestart?.addEventListener('click', () => { this.destroy(); startGame(); });
    btnToMenu?.addEventListener('click',  () => this._goToMenu());

    // Weapon switch (1,2,3 keys)
    document.addEventListener('keydown', (e) => {
      if (!this._running) return;
      if (e.code === 'Digit1') this._switchWeapon('AK47');
      if (e.code === 'Digit2') this._switchWeapon('MP5');
      if (e.code === 'Digit3') this._switchWeapon('DEAGLE');
      if (e.code === 'KeyG')   this._throwGrenade();
    });
  }

  _showClickToStart() {
    const hud = document.getElementById('hud');
    const cts = document.getElementById('click-to-start');
    if (hud) hud.classList.remove('hidden');
    if (cts) cts.classList.remove('hidden');
  }

  _showPause() {
    if (this._gameOver || this._playerDead) return;
    this._paused = true;
    document.getElementById('pause-menu')?.classList.remove('hidden');
  }

  _resumeGame() {
    this._paused = false;
    document.getElementById('pause-menu')?.classList.add('hidden');
    this._canvas.requestPointerLock();
  }

  _goToMenu() {
    this.destroy();
    document.getElementById('hud')?.classList.add('hidden');
    document.getElementById('minimap-canvas') && (document.getElementById('minimap-canvas').style.display = 'none');
    ['pause-menu','death-screen','gameover-screen'].forEach(id => {
      document.getElementById(id)?.classList.add('hidden');
    });
    document.getElementById('main-menu')?.classList.remove('hidden');
  }

  _switchWeapon(key) {
    if (!WEAPONS[key]) return;
    this._weapon.destroy();
    this._weapon = new Weapon(this._scene, this._camera, WEAPONS[key]);
    this._currentWeaponKey = key;
    this._ui.setWeaponName(WEAPONS[key].name);
  }

  // ---- Grenade (bonus) ----
  _throwGrenade() {
    if (!this._controls.isPointerLocked) return;
    const origin = this._player.getPosition().clone();
    origin.y += 0.5;
    const dir = new THREE.Vector3(0, 0.3, -1);
    this._camera.getWorldQuaternion(this._tmpQ || (this._tmpQ = new THREE.Quaternion()));
    dir.applyQuaternion(this._tmpQ).normalize();

    // Visual grenade
    const geo = new THREE.SphereGeometry(0.08, 6, 6);
    const mat = new THREE.MeshStandardMaterial({ color: 0x334422 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(origin);
    this._scene.add(mesh);

    const vel = dir.clone().multiplyScalar(18);
    vel.y += 5;
    const gravity = new THREE.Vector3(0, -18, 0);
    let life = 0;
    const explodeTime = 2.5;

    this._grenades = this._grenades || [];
    this._grenades.push({ mesh, vel, life, explodeTime });
  }

  _updateGrenades(dt) {
    if (!this._grenades) return;
    for (let i = this._grenades.length - 1; i >= 0; i--) {
      const g = this._grenades[i];
      g.life += dt;
      g.vel.y -= 18 * dt;
      g.mesh.position.add(g.vel.clone().multiplyScalar(dt));
      g.mesh.rotation.x += dt * 5; g.mesh.rotation.z += dt * 3;
      if (g.mesh.position.y < 0.08) { g.mesh.position.y = 0.08; g.vel.y = Math.abs(g.vel.y) * 0.4; g.vel.x *= 0.7; g.vel.z *= 0.7; }

      if (g.life >= g.explodeTime) {
        // Explosion
        this._explode(g.mesh.position.clone());
        this._scene.remove(g.mesh);
        this._grenades.splice(i, 1);
      }
    }
  }

  _explode(pos) {
    // Damage enemies in radius
    const RADIUS = 7;
    for (const e of this._enemies) {
      if (!e.alive) continue;
      const d = e.mesh.position.distanceTo(pos);
      if (d < RADIUS) {
        const dmg = (1 - d / RADIUS) * 100;
        const killed = e.takeDamage(dmg);
        if (killed) this._onEnemyKilled(e);
      }
    }
    // Flash
    const fl = new THREE.PointLight(0xff8800, 10, 18);
    fl.position.copy(pos);
    this._scene.add(fl);
    setTimeout(() => this._scene.remove(fl), 300);

    // Audio
    if (this._audio && this._audio.ctx) {
      const master = this._audio._master();
      if (master) {
        const now = this._audio.ctx.currentTime;
        const osc = this._audio.ctx.createOscillator();
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
        const g = this._audio.ctx.createGain();
        g.gain.setValueAtTime(1.0, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(g); g.connect(master);
        osc.start(now); osc.stop(now + 0.5);
      }
    }
  }

  // ---- Player death ----
  _onPlayerDeath() {
    this._playerDead = true;
    document.exitPointerLock();
    document.getElementById('death-screen')?.classList.remove('hidden');

    let count = 3;
    const el = document.getElementById('respawn-timer');
    if (el) el.textContent = count;

    const tick = setInterval(() => {
      count--;
      if (el) el.textContent = count;
      if (count <= 0) {
        clearInterval(tick);
        this._respawnPlayer();
      }
    }, 1000);
  }

  _respawnPlayer() {
    this._playerDead = false;
    document.getElementById('death-screen')?.classList.add('hidden');
    const sp = MAP1.playerSpawn;
    this._player.respawn(new THREE.Vector3(sp.x, sp.y + 1.7, sp.z));
    this._ui.setHealth(100);
    this._canvas.requestPointerLock();
  }

  // ---- Enemy killed ----
  _onEnemyKilled(enemy) {
    this.kills++;
    this._player.addKill();
    this._ui.setScore(this.kills);
    this._ui.addKill('ENEMY ' + (enemy.id + 1));
    this._ui.showHitMarker();
    this._audio.playKill();

    if (this.kills >= this.totalKills) {
      this._showGameOver(true);
    }
  }

  // ---- Game over ----
  _showGameOver(win) {
    this._gameOver = true;
    document.exitPointerLock();
    const screen = document.getElementById('gameover-screen');
    const title  = document.getElementById('gameover-title');
    const score  = document.getElementById('final-score');
    if (screen) screen.classList.remove('hidden');
    if (title)  title.textContent = win ? '★ MISSION COMPLETE ★' : 'MISSION FAILED';
    if (score)  score.textContent = `Kills: ${this.kills} / ${this.totalKills}`;
  }

  setSensitivity(v) { if (this._controls) this._controls.setSensitivity(v); }
  setVolume(v)      { if (this._audio)    this._audio.setVolume(v); }

  // ---- Main Loop ----
  _loop(timestamp) {
    if (!this._running) return;
    this._animFrame = requestAnimationFrame((t) => this._loop(t));

    const dt = Math.min((timestamp - this._lastTime) / 1000, 0.05); // cap at 50ms
    this._lastTime = timestamp;

    if (this._paused || this._gameOver) {
      this._renderer.render(this._scene, this._camera);
      return;
    }

    this._update(dt);
    this._renderer.render(this._scene, this._camera);
  }

  _update(dt) {
    if (!this._controls.isPointerLocked && !this._playerDead) return;
    if (this._audio) this._audio.resume();

    const playerPos = this._player.getPosition();

    // Player
    this._player.update(dt, this._mapBounds, this._walls);

    // Weapon
    const wCfg = this._weapon.config;
    if (this._controls.isPointerLocked) {
      // Shooting
      if (this._controls.shooting && (wCfg.auto || this._controls.consumeShot)) {
        const fired = this._weapon.tryFire(dt);
        if (fired) {
          this._bulletPool.spawn(
            this._weapon.getBarrelTipWorld(),
            this._weapon.getShootDirection(),
            true, wCfg.damage, wCfg.spread
          );
          this._audio.playShot();
          this._ui.showSpread();
        } else if (this._weapon.ammo === 0 && !this._weapon.reloading) {
          // Dry fire
        }
      } else if (!wCfg.auto) {
        this._weapon._fireTimer = 0; // reset for semi-auto
      }

      // Reload
      if (this._controls.consumeReload()) {
        this._weapon.startReload();
        this._audio.playReload();
      }
    }

    this._weapon.update(dt);

    const ammo = this._weapon.getAmmoState();
    this._ui.setAmmo(ammo.ammo, ammo.reserve, ammo.reloading);

    // Enemies
    for (const enemy of this._enemies) {
      const prevAlive = enemy.alive;
      enemy.update(dt, playerPos, this._camera);

      // Check if just killed by bullet (enemy.health <= 0)
      if (prevAlive && !enemy.alive && enemy.state === 'dead') {
        // Already handled in bullet→enemy hit
      }
    }

    // Bullets
    this._bulletPool.update(dt, this._enemies, this._walls, this._player);

    // Detect new kills from bullet hits (enemy.health <= 0 and newly dead)
    for (const e of this._enemies) {
      if (e._justKilled) {
        e._justKilled = false;
        this._ui.showHitMarker();
        this._audio.playHit();
        this._onEnemyKilled(e);
      }
    }

    // Grenades
    this._updateGrenades(dt);

    // Map lights
    this._mapBuilder.updateLights();

    // UI
    this._ui.updateFPS(dt);
    this._ui.drawMinimap(playerPos, this._player.yaw, this._enemies, this._mapBounds);
  }

  // ---- Cleanup ----
  destroy() {
    this._running = false;
    if (this._animFrame) cancelAnimationFrame(this._animFrame);
    this._controls?.destroy();
    this._weapon?.destroy();
    this._bulletPool?.destroy();
    this._enemies?.forEach(e => e.destroy());
    this._mapBuilder?.destroy();
    this._renderer?.dispose();
    document.exitPointerLock();
  }
}
