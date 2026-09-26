/**
 * WeaponConfigs.js — Data-driven weapon definitions
 *
 * All weapon stats live here. Systems (Ballistics, WeaponView, DamageSystem)
 * read from these objects; they never hard-code numbers.
 *
 * Units: SI where applicable (muzzleVelocity m/s, mass kg, etc.)
 */

export const WeaponConfigs = Object.freeze({
  assaultRifle: {
    id: 'assaultRifle',
    name: 'Assault Rifle',
    muzzleVelocity: 720,
    projectileMass: 0.004,
    ballisticCoefficient: 0.25,
    dragModel: 'G7',
    caliber: 0.00556,
    baseDamage: 28,
    headshotMultiplier: 2.4,
    limbMultiplier: 0.75,
    penetrationPower: 1.2,
    ricochetChance: 0.15,
    fireMode: 'auto',
    fireRate: 650,
    magazineSize: 30,
    reloadTime: 2.4,
    recoil: {
      kickVertical: 0.018,
      kickHorizontal: 0.006,
      kickTranslational: 0.012,
      recoverySpeed: 8.0,
      pattern: 'climbing'
    },
    model: 'weapons/ar.glb',
    muzzleFlash: 'vfx/muzzle_flash',
    tracerColor: 0xffaa00
  },
  pistol: {
    id: 'pistol',
    name: 'Pistol',
    muzzleVelocity: 380,
    projectileMass: 0.008,
    ballisticCoefficient: 0.18,
    dragModel: 'G1',
    caliber: 0.009,
    baseDamage: 35,
    headshotMultiplier: 2.6,
    limbMultiplier: 0.7,
    penetrationPower: 0.6,
    ricochetChance: 0.25,
    fireMode: 'semi',
    fireRate: 320,
    magazineSize: 15,
    reloadTime: 1.6,
    recoil: {
      kickVertical: 0.035,
      kickHorizontal: 0.012,
      kickTranslational: 0.02,
      recoverySpeed: 10.0,
      pattern: 'sharp'
    },
    model: 'weapons/pistol.glb',
    muzzleFlash: 'vfx/muzzle_flash',
    tracerColor: 0xffee88
  },
  sniper: {
    id: 'sniper',
    name: 'Sniper Rifle',
    muzzleVelocity: 850,
    projectileMass: 0.012,
    ballisticCoefficient: 0.45,
    dragModel: 'G7',
    caliber: 0.0086,
    baseDamage: 95,
    headshotMultiplier: 3.0,
    limbMultiplier: 0.6,
    penetrationPower: 2.5,
    ricochetChance: 0.08,
    fireMode: 'semi',
    fireRate: 45,
    magazineSize: 5,
    reloadTime: 3.2,
    recoil: {
      kickVertical: 0.06,
      kickHorizontal: 0.015,
      kickTranslational: 0.04,
      recoverySpeed: 4.5,
      pattern: 'heavy'
    },
    model: 'weapons/sniper.glb',
    muzzleFlash: 'vfx/muzzle_flash_large',
    tracerColor: 0xff4400
  }
});

export const DefaultLoadout = ['assaultRifle', 'pistol'];
