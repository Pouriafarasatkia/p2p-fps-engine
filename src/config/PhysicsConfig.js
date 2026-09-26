/**
 * PhysicsConfig.js — Central data-driven physics constants
 *
 * All numerical values that affect simulation live here.
 * Never hard-code gravity, friction, or air density inside systems.
 *
 * Units: SI (meters, kilograms, seconds)
 */

export const PhysicsConfig = Object.freeze({
  // Earth gravity (m/s²). Negative Y in a right-handed Y-up coordinate system.
  gravity: { x: 0, y: -9.81, z: 0 },

  // Air density at sea level (kg/m³) — used by Ballistics for drag.
  airDensity: 1.225,

  // Default material friction / restitution for static world geometry.
  defaultFriction: 0.6,
  defaultRestitution: 0.1,

  // Character controller defaults (overridable per-player later).
  character: {
    height: 1.8,          // meters
    radius: 0.35,         // capsule radius
    mass: 80,             // kg
    walkSpeed: 4.5,       // m/s
    sprintMultiplier: 1.6,
    jumpImpulse: 6.5,     // m/s vertical
    airControl: 0.3,      // fraction of ground control while airborne
    groundFriction: 0.8,
    maxSlopeAngle: Math.PI / 4 // 45°
  },

  // Fixed timestep settings (mirrored in GameLoop for convenience).
  fixedTimestep: 1 / 60,

  // Rapier solver iterations (higher = more accurate, more expensive).
  solverIterations: 4,
  solverNdsIterations: 1
});
