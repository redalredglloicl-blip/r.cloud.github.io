/**
 * maps/map1.js — Arena map definition
 * Describes buildings, walls, obstacles, spawn points.
 */

const MAP1 = {
  name: 'URBAN SIEGE',
  bounds: { minX: -40, maxX: 40, minZ: -40, maxZ: 40 },

  playerSpawn: { x: 0, y: 0, z: 10 },

  enemySpawns: [
    { x: -15, y: 0, z: -18 },
    { x:  18, y: 0, z: -20 },
    { x: -22, y: 0, z:   5 },
    { x:  25, y: 0, z:   8 },
    { x:   0, y: 0, z: -30 },
    { x: -30, y: 0, z: -10 },
    { x:  30, y: 0, z: -10 },
    { x: -10, y: 0, z:  28 },
  ],

  // Each building: { x, z, w, h, d, color }  (y-height = h, placed on ground)
  buildings: [
    // Central structure
    { x:  0,   z: -8,  w: 8,   h: 5,   d: 8,   color: 0x556677, label: 'center' },

    // Ring buildings
    { x: -20,  z: -15, w: 10,  h: 7,   d: 6,   color: 0x445566 },
    { x:  20,  z: -15, w: 10,  h: 6,   d: 6,   color: 0x445566 },
    { x: -20,  z:  10, w: 6,   h: 5,   d: 10,  color: 0x4a5a6a },
    { x:  20,  z:  10, w: 6,   h: 5,   d: 10,  color: 0x4a5a6a },
    { x:   0,  z: -28, w: 14,  h: 4,   d: 6,   color: 0x556677 },

    // Small shelters / crates cluster
    { x:  8,   z:  15, w: 3,   h: 2,   d: 3,   color: 0x7a6a4a },
    { x: -8,   z:  15, w: 3,   h: 2,   d: 3,   color: 0x7a6a4a },
    { x:  12,  z:  20, w: 2.5, h: 1.5, d: 2.5, color: 0x8a7a5a },
    { x: -12,  z:  20, w: 2.5, h: 1.5, d: 2.5, color: 0x8a7a5a },

    // Outer walls / ruins
    { x: -35,  z:  0,  w: 1.5, h: 3,   d: 30,  color: 0x3a4a55 },
    { x:  35,  z:  0,  w: 1.5, h: 3,   d: 30,  color: 0x3a4a55 },
    { x:   0,  z: -38, w: 40,  h: 2.5, d: 1.5, color: 0x3a4a55 },

    // Barriers
    { x:  6,   z: -2,  w: 0.5, h: 1.2, d: 5,   color: 0x667788 },
    { x: -6,   z: -2,  w: 0.5, h: 1.2, d: 5,   color: 0x667788 },
    { x:  0,   z: -5,  w: 5,   h: 1.2, d: 0.5, color: 0x667788 },

    // Staircase visual
    { x: -4,   z: -12, w: 4,   h: 1,   d: 1.5, color: 0x445566 },
    { x: -4,   z:-13.5, w: 4,  h: 2,   d: 1.5, color: 0x445566 },

    // Rubble mounds
    { x:  14,  z:  0,  w: 2,   h: 1,   d: 2,   color: 0x5a5040 },
    { x: -14,  z:  0,  w: 2,   h: 1,   d: 2,   color: 0x5a5040 },
    { x:  25,  z: -30, w: 5,   h: 3,   d: 4,   color: 0x445566 },
    { x: -25,  z: -30, w: 5,   h: 3,   d: 4,   color: 0x445566 },
  ],

  // Decor details (non-collidable)
  details: [
    // Window strips on center building
    { type: 'window', x: 0, y: 3, z: -4,  w: 1.5, h: 1.5, color: 0x223344 },
    { type: 'window', x: 0, y: 3, z: -12, w: 1.5, h: 1.5, color: 0x223344 },
  ],

  groundColor:  0x3a3f38,
  skyColor:     0x1a2030,
  fogDensity:   0.012,
};
