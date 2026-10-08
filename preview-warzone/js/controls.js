/**
 * controls.js — Input management
 * Handles keyboard, mouse (pointer lock), and mobile touch inputs.
 */

class Controls {
  constructor(sensitivity = 2.0) {
    this.sensitivity = sensitivity * 0.001;

    // Key state map
    this.keys = {};

    // Mouse deltas (consumed each frame)
    this.mouseDX = 0;
    this.mouseDY = 0;

    // Buttons
    this.shooting   = false;
    this.reloading  = false;
    this.jumping    = false;
    this.sprinting  = false;

    // Mobile joystick state
    this.joystick = { x: 0, y: 0, active: false };
    this._joystickTouch = null;
    this._joystickOrigin = { x: 0, y: 0 };

    // Mobile aim state
    this._aimTouch    = null;
    this._aimLast     = { x: 0, y: 0 };
    this.mobileDX     = 0;
    this.mobileDY     = 0;

    this.isPointerLocked = false;
    this._bound = {};
    this._isMobile = /Mobi|Android|Touch/i.test(navigator.userAgent)
                  || (window.innerWidth < 900 && 'ontouchstart' in window);
  }

  // ---- Init ----
  init(canvas) {
    this._canvas = canvas;
    this._bindKeyboard();
    this._bindMouse(canvas);
    if (this._isMobile) this._bindMobile();
    return this;
  }

  setSensitivity(v) { this.sensitivity = v * 0.001; }

  // ---- Keyboard ----
  _bindKeyboard() {
    this._bound.kd = (e) => {
      this.keys[e.code] = true;
      if (e.code === 'Space') { e.preventDefault(); this.jumping = true; }
      if (e.code === 'KeyR')  this.reloading = true;
      if (e.code === 'Escape') this._onEscape();
    };
    this._bound.ku = (e) => {
      this.keys[e.code] = false;
      if (e.code === 'KeyR') this.reloading = false;
      if (e.code === 'Space') this.jumping = false;
    };
    document.addEventListener('keydown', this._bound.kd);
    document.addEventListener('keyup',   this._bound.ku);
  }

  _onEscape() {
    if (this.isPointerLocked) document.exitPointerLock();
  }

  // ---- Mouse / Pointer Lock ----
  _bindMouse(canvas) {
    this._bound.click = () => {
      if (!this.isPointerLocked) canvas.requestPointerLock();
    };
    this._bound.mousedown = (e) => {
      if (e.button === 0) this.shooting = true;
    };
    this._bound.mouseup = (e) => {
      if (e.button === 0) this.shooting = false;
    };
    this._bound.mousemove = (e) => {
      if (this.isPointerLocked) {
        this.mouseDX += e.movementX || 0;
        this.mouseDY += e.movementY || 0;
      }
    };
    this._bound.plchange = () => {
      this.isPointerLocked = (document.pointerLockElement === canvas);
      const cts = document.getElementById('click-to-start');
      if (cts) cts.classList.toggle('hidden', this.isPointerLocked);
    };

    canvas.addEventListener('click', this._bound.click);
    canvas.addEventListener('mousedown', this._bound.mousedown);
    document.addEventListener('mouseup',   this._bound.mouseup);
    document.addEventListener('mousemove', this._bound.mousemove);
    document.addEventListener('pointerlockchange', this._bound.plchange);
  }

  // ---- Mobile ----
  _bindMobile() {
    const mobileDiv = document.getElementById('mobile-controls');
    if (mobileDiv) mobileDiv.classList.remove('hidden');

    // Show minimap on mobile too
    const mm = document.getElementById('minimap-canvas');
    if (mm) mm.style.display = 'block';

    const jZone = document.getElementById('joystick-zone');
    const stick = document.getElementById('joystick-stick');
    const aimZone = document.getElementById('mobile-aim-zone');
    const shootBtn = document.getElementById('mobile-shoot');
    const reloadBtn = document.getElementById('mobile-reload');
    const jumpBtn   = document.getElementById('mobile-jump');

    const jRadius = 38; // max stick travel px

    if (jZone) {
      jZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const t = e.changedTouches[0];
        this._joystickTouch = t.identifier;
        const r = jZone.getBoundingClientRect();
        this._joystickOrigin = { x: r.left + r.width/2, y: r.top + r.height/2 };
        this.joystick.active = true;
      }, { passive: false });

      jZone.addEventListener('touchmove', (e) => {
        e.preventDefault();
        for (const t of e.changedTouches) {
          if (t.identifier === this._joystickTouch) {
            let dx = t.clientX - this._joystickOrigin.x;
            let dy = t.clientY - this._joystickOrigin.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist > jRadius) { dx *= jRadius/dist; dy *= jRadius/dist; }
            this.joystick.x = dx / jRadius;
            this.joystick.y = dy / jRadius;
            if (stick) { stick.style.transform = `translate(${dx}px,${dy}px)`; }
          }
        }
      }, { passive: false });

      const jEnd = (e) => {
        for (const t of e.changedTouches) {
          if (t.identifier === this._joystickTouch) {
            this._joystickTouch = null;
            this.joystick.x = 0; this.joystick.y = 0; this.joystick.active = false;
            if (stick) stick.style.transform = 'translate(0,0)';
          }
        }
      };
      jZone.addEventListener('touchend', jEnd, { passive: false });
      jZone.addEventListener('touchcancel', jEnd, { passive: false });
    }

    if (aimZone) {
      aimZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const t = e.changedTouches[0];
        this._aimTouch = t.identifier;
        this._aimLast = { x: t.clientX, y: t.clientY };
      }, { passive: false });

      aimZone.addEventListener('touchmove', (e) => {
        e.preventDefault();
        for (const t of e.changedTouches) {
          if (t.identifier === this._aimTouch) {
            this.mobileDX += (t.clientX - this._aimLast.x) * 0.4;
            this.mobileDY += (t.clientY - this._aimLast.y) * 0.4;
            this._aimLast = { x: t.clientX, y: t.clientY };
          }
        }
      }, { passive: false });

      const aEnd = (e) => {
        for (const t of e.changedTouches) {
          if (t.identifier === this._aimTouch) this._aimTouch = null;
        }
      };
      aimZone.addEventListener('touchend', aEnd, { passive: false });
      aimZone.addEventListener('touchcancel', aEnd, { passive: false });
    }

    if (shootBtn) {
      shootBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.shooting = true; }, { passive: false });
      shootBtn.addEventListener('touchend',   (e) => { e.preventDefault(); this.shooting = false; }, { passive: false });
    }
    if (reloadBtn) {
      reloadBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.reloading = true; }, { passive: false });
      reloadBtn.addEventListener('touchend',   (e) => { e.preventDefault(); this.reloading = false; }, { passive: false });
    }
    if (jumpBtn) {
      jumpBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.jumping = true; }, { passive: false });
      jumpBtn.addEventListener('touchend',   (e) => { e.preventDefault(); this.jumping = false; }, { passive: false });
    }

    // Auto pointer-lock = not needed on mobile, treat as locked
    this.isPointerLocked = true;
  }

  // ---- Per-frame accessors ----
  /** Returns movement intent as unit vector { x(strafe), z(forward) } */
  getMovement() {
    let fx = 0, fz = 0;
    if (this._isMobile) {
      fx = this.joystick.x;
      fz = this.joystick.y;
    } else {
      if (this.keys['KeyW'] || this.keys['ArrowUp'])    fz -= 1;
      if (this.keys['KeyS'] || this.keys['ArrowDown'])  fz += 1;
      if (this.keys['KeyA'] || this.keys['ArrowLeft'])  fx -= 1;
      if (this.keys['KeyD'] || this.keys['ArrowRight']) fx += 1;
      // Normalise diagonal
      if (fx && fz) { fx *= 0.707; fz *= 0.707; }
    }
    return { x: fx, z: fz };
  }

  isSprinting() {
    return this.keys['ShiftLeft'] || this.keys['ShiftRight'];
  }

  /** Consume and return mouse/touch aim delta */
  consumeAimDelta() {
    let dx, dy;
    if (this._isMobile) {
      dx = this.mobileDX * this.sensitivity * 800;
      dy = this.mobileDY * this.sensitivity * 800;
      this.mobileDX = 0; this.mobileDY = 0;
    } else {
      dx = this.mouseDX * this.sensitivity;
      dy = this.mouseDY * this.sensitivity;
      this.mouseDX = 0; this.mouseDY = 0;
    }
    return { dx, dy };
  }

  consumeJump() {
    const j = this.jumping;
    this.jumping = false;
    return j;
  }

  consumeReload() {
    const r = this.reloading;
    this.reloading = false;
    return r;
  }

  // ---- Cleanup ----
  destroy() {
    document.removeEventListener('keydown', this._bound.kd);
    document.removeEventListener('keyup',   this._bound.ku);
    document.removeEventListener('mousemove', this._bound.mousemove);
    document.removeEventListener('mouseup',   this._bound.mouseup);
    document.removeEventListener('pointerlockchange', this._bound.plchange);
    if (this._canvas) {
      this._canvas.removeEventListener('click',     this._bound.click);
      this._canvas.removeEventListener('mousedown', this._bound.mousedown);
    }
  }
}
