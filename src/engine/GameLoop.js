/**
 * GameLoop.js — Decoupled Fixed-Timestep Engine Loop
 *
 * Architecture:
 *  - Physics / logic run at a fixed rate (default 60 Hz).
 *  - Rendering runs as fast as the browser allows (requestAnimationFrame).
 *  - An accumulator + alpha interpolation factor is provided so renderers
 *    can smoothly interpolate between the previous and current physics state.
 *
 * Communication:
 *  - Emits on the shared bus:
 *      'engine:fixedUpdate'  → { dt: number }          (fixed timestep)
 *      'engine:render'       → { alpha: number, dt: number }  (variable)
 *      'engine:started'
 *      'engine:stopped'
 *  - Listens for:
 *      'engine:pause' / 'engine:resume'  (optional external control)
 *
 * No knowledge of physics, networking, or rendering — pure timing.
 */

export class GameLoop {
  constructor(bus, options = {}) {
    this.bus = bus;
    this.tickRate = options.tickRate ?? 60;
    this.fixedDt = 1 / this.tickRate;
    this.maxFrameDelta = options.maxFrameDelta ?? 0.25;

    this._running = false;
    this._rafId = null;
    this._lastTime = 0;
    this._accumulator = 0;
    this._frameCount = 0;
    this._tickCount = 0;

    this._frame = this._frame.bind(this);

    this.bus.on('engine:pause', () => this.stop());
    this.bus.on('engine:resume', () => this.start());
  }

  start() {
    if (this._running) return;
    this._running = true;
    this._lastTime = performance.now() / 1000;
    this._accumulator = 0;
    this.bus.emit('engine:started');
    this._rafId = requestAnimationFrame(this._frame);
  }

  stop() {
    if (!this._running) return;
    this._running = false;
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this.bus.emit('engine:stopped');
  }

  get isRunning() {
    return this._running;
  }

  get tickCount() {
    return this._tickCount;
  }

  get frameCount() {
    return this._frameCount;
  }

  _frame(nowMs) {
    if (!this._running) return;

    const now = nowMs / 1000;
    let frameDelta = now - this._lastTime;
    this._lastTime = now;

    if (frameDelta > this.maxFrameDelta) {
      frameDelta = this.maxFrameDelta;
    }

    this._accumulator += frameDelta;

    while (this._accumulator >= this.fixedDt) {
      this.bus.emit('engine:fixedUpdate', { dt: this.fixedDt });
      this._accumulator -= this.fixedDt;
      this._tickCount++;
    }

    const alpha = this._accumulator / this.fixedDt;

    this.bus.emit('engine:render', { alpha, dt: frameDelta });
    this._frameCount++;

    this._rafId = requestAnimationFrame(this._frame);
  }
}
