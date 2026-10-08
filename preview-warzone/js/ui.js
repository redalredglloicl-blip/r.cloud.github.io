/**
 * ui.js — HUD updates, kill feed, minimap
 */

class UI {
  constructor() {
    this._healthBar   = document.getElementById('health-bar');
    this._healthText  = document.getElementById('health-text');
    this._ammoCur     = document.getElementById('ammo-current');
    this._ammoRes     = document.getElementById('ammo-reserve');
    this._reloadInd   = document.getElementById('reload-indicator');
    this._scoreVal    = document.getElementById('score-value');
    this._killFeed    = document.getElementById('kill-feed');
    this._hitMarker   = document.getElementById('hit-marker');
    this._dmgVig      = document.getElementById('damage-vignette');
    this._weaponName  = document.getElementById('hud-weapon');
    this._fpsCounter  = document.getElementById('fps-counter');
    this._crosshair   = document.getElementById('crosshair');

    this._minimap     = document.getElementById('minimap-canvas');
    this._minimapCtx  = this._minimap ? this._minimap.getContext('2d') : null;
    this._minimap && (this._minimap.style.display = 'block');
    this._minimap && (this._minimap.width = 140) && (this._minimap.height = 140);

    this._fpsFrames   = 0;
    this._fpsAccum    = 0;

    this._hitTimeout  = null;
    this._spreadTimeout = null;
  }

  // ---- Health ----
  setHealth(hp, max = 100) {
    const pct = Math.max(0, hp / max * 100);
    this._healthBar.style.width = pct + '%';
    this._healthText.textContent = Math.ceil(hp);
    this._healthBar.classList.toggle('low', pct < 30);
  }

  showDamageVignette() {
    this._dmgVig.classList.remove('hidden');
    this._dmgVig.style.animation = 'none';
    void this._dmgVig.offsetWidth; // reflow
    this._dmgVig.style.animation = '';
    setTimeout(() => this._dmgVig.classList.add('hidden'), 800);
  }

  // ---- Ammo ----
  setAmmo(cur, reserve, reloading) {
    this._ammoCur.textContent  = cur;
    this._ammoRes.textContent  = reserve;
    this._reloadInd.classList.toggle('hidden', !reloading);
  }

  setWeaponName(name) {
    this._weaponName.textContent = name;
  }

  // ---- Score ----
  setScore(n) { this._scoreVal.textContent = n; }

  // ---- Hit marker ----
  showHitMarker() {
    clearTimeout(this._hitTimeout);
    this._hitMarker.classList.remove('hidden');
    this._hitMarker.style.animation = 'none';
    void this._hitMarker.offsetWidth;
    this._hitMarker.style.animation = '';
    this._hitTimeout = setTimeout(() => this._hitMarker.classList.add('hidden'), 280);
  }

  // ---- Kill feed ----
  addKill(name = 'ENEMY') {
    const el = document.createElement('div');
    el.className = 'kill-entry';
    el.textContent = `YOU ✕ ${name}`;
    this._killFeed.appendChild(el);
    setTimeout(() => el.remove(), 3000);
    if (this._killFeed.children.length > 5) this._killFeed.firstChild.remove();
  }

  // ---- Crosshair spread ----
  showSpread() {
    clearTimeout(this._spreadTimeout);
    this._crosshair.classList.add('spread');
    this._spreadTimeout = setTimeout(() => this._crosshair.classList.remove('spread'), 180);
  }

  // ---- FPS ----
  updateFPS(dt) {
    this._fpsAccum  += dt;
    this._fpsFrames ++;
    if (this._fpsAccum >= 0.5) {
      const fps = Math.round(this._fpsFrames / this._fpsAccum);
      this._fpsCounter.textContent = fps + ' FPS';
      this._fpsAccum  = 0;
      this._fpsFrames = 0;
    }
  }

  // ---- Minimap ----
  /**
   * Draw an overhead 2D minimap.
   * @param {THREE.Vector3} playerPos
   * @param {number}        playerYaw   radians
   * @param {Array}         enemies     Enemy[]
   * @param {object}        mapBounds   {minX,maxX,minZ,maxZ}
   */
  drawMinimap(playerPos, playerYaw, enemies, mapBounds) {
    if (!this._minimapCtx) return;
    const ctx = this._minimapCtx;
    const W = 140, H = 140;
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = 'rgba(10,12,16,0.85)';
    ctx.fillRect(0, 0, W, H);

    const bw = mapBounds.maxX - mapBounds.minX;
    const bh = mapBounds.maxZ - mapBounds.minZ;
    const scale = Math.min(W / bw, H / bh) * 0.9;
    const offX = W/2 - (playerPos.x - mapBounds.minX) * scale;
    const offZ = H/2 - (playerPos.z - mapBounds.minZ) * scale;

    const toScreen = (wx, wz) => ({
      x: wx * scale + (W/2 - playerPos.x * scale),
      y: wz * scale + (H/2 - playerPos.z * scale),
    });

    // Map border
    const tl = toScreen(mapBounds.minX, mapBounds.minZ);
    const br = toScreen(mapBounds.maxX, mapBounds.maxZ);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);

    // Enemies
    for (const e of enemies) {
      if (!e.alive || e.state === 'dead') continue;
      const ep = toScreen(e.mesh.position.x, e.mesh.position.z);
      ctx.beginPath();
      ctx.arc(ep.x, ep.y, 4, 0, Math.PI*2);
      ctx.fillStyle = e.state === 'shoot' || e.state === 'chase' ? '#ff4400' : '#ffaa00';
      ctx.fill();
    }

    // Player (arrow)
    ctx.save();
    ctx.translate(W/2, H/2);
    ctx.rotate(-playerYaw + Math.PI);
    ctx.beginPath();
    ctx.moveTo(0, -7); ctx.lineTo(-4, 5); ctx.lineTo(0, 2); ctx.lineTo(4, 5);
    ctx.closePath();
    ctx.fillStyle = '#44ddff';
    ctx.fill();
    ctx.restore();

    // Compass
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '9px monospace';
    ctx.fillText('N', 67, 12);
  }
}
