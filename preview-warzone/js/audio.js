/**
 * audio.js — Procedural sound effects via Web Audio API
 * No external files needed - all sounds synthesised.
 */

class AudioManager {
  constructor() {
    this.ctx    = null;
    this.volume = 0.5;
    this._init();
  }

  _init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio not supported');
    }
  }

  _master() {
    if (!this.ctx) return null;
    const gain = this.ctx.createGain();
    gain.gain.value = this.volume;
    gain.connect(this.ctx.destination);
    return gain;
  }

  setVolume(v) { this.volume = v; }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  // ---- Gunshot ----
  playShot() {
    if (!this.ctx) return;
    const master = this._master();
    const now = this.ctx.currentTime;

    // Noise burst
    const bufSize = this.ctx.sampleRate * 0.15;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);

    const src = this.ctx.createBufferSource();
    src.buffer = buf;

    // Band pass
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 800; bp.Q.value = 0.5;

    // Gain envelope
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.9, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    src.connect(bp); bp.connect(g); g.connect(master);
    src.start(now); src.stop(now + 0.15);

    // Low thump
    const osc = this.ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    const g2 = this.ctx.createGain();
    g2.gain.setValueAtTime(0.6, now);
    g2.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(g2); g2.connect(master);
    osc.start(now); osc.stop(now + 0.1);
  }

  // ---- Enemy shot (slightly different) ----
  playEnemyShot() {
    if (!this.ctx) return;
    const master = this._master();
    const now = this.ctx.currentTime;

    const bufSize = this.ctx.sampleRate * 0.1;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;

    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 1200; bp.Q.value = 0.8;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.35, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    src.connect(bp); bp.connect(g); g.connect(master);
    src.start(now); src.stop(now + 0.1);
  }

  // ---- Reload click ----
  playReload() {
    if (!this.ctx) return;
    const master = this._master();
    const now = this.ctx.currentTime;

    // Mag click
    const click = (t, freq) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'square'; osc.frequency.value = freq;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.3, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(g); g.connect(master);
      osc.start(t); osc.stop(t + 0.05);
    };
    click(now, 350);
    click(now + 0.06, 280);
    click(now + 0.12, 420);
  }

  // ---- Hit marker (enemy hit) ----
  playHit() {
    if (!this.ctx) return;
    const master = this._master();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = 1100;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.25, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(g); g.connect(master);
    osc.start(now); osc.stop(now + 0.07);
  }

  // ---- Player hurt ----
  playPlayerHurt() {
    if (!this.ctx) return;
    const master = this._master();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth'; osc.frequency.value = 80;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.5, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(g); g.connect(master);
    osc.start(now); osc.stop(now + 0.22);
  }

  // ---- Kill ----
  playKill() {
    if (!this.ctx) return;
    const master = this._master();
    const now = this.ctx.currentTime;
    [880, 1100, 1320].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine'; osc.frequency.value = freq;
      const g = this.ctx.createGain();
      const t = now + i * 0.07;
      g.gain.setValueAtTime(0.2, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(g); g.connect(master);
      osc.start(t); osc.stop(t + 0.13);
    });
  }

  // ---- Empty click ----
  playDryFire() {
    if (!this.ctx) return;
    const master = this._master();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'square'; osc.frequency.value = 220;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.15, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(g); g.connect(master);
    osc.start(now); osc.stop(now + 0.05);
  }
}
