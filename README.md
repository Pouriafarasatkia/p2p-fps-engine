# P2P FPS Engine

Highly modular **3D browser-based multiplayer First-Person Shooter** built for serverless/static deployment (Vercel, Netlify, etc.).

## Tech Stack

| Layer | Technology |
|-------|------------|
| Build | Vite (ES modules) |
| Rendering | Three.js (WebGL, shadows, ACES tone mapping) |
| Physics | Rapier3D WASM (`@dimforge/rapier3d-compat`) |
| Networking | PeerJS (WebRTC DataChannels ≈ UDP) |
| Architecture | Decoupled event-bus + fixed-timestep |

## Features

- **Decoupled fixed-timestep engine** — 60 Hz physics/logic, variable render rate with alpha interpolation
- **Real ballistics** — RK4 integration, G1/G7 aerodynamic drag, projectile drop, wind, material penetration & ricochet (no hitscan)
- **Authoritative Host P2P** — one peer runs the simulation; clients send raw inputs
- **Client-side prediction + server reconciliation** — masks latency
- **Procedural weapon recoil** — translational pushback + rotational muzzle climb
- **Data-driven config** — all weapon stats, physics constants, movement variables in isolated files
- **Kinematic character controller** — slopes, autostep, snap-to-ground

## Project Structure

```
src/
├── config/          # PhysicsConfig, WeaponConfigs
├── engine/          # GameLoop, AssetManager
├── physics/         # PhysicsWorld, Ballistics, CharacterBody
├── graphics/        # Renderer, WeaponView, VFXManager
├── logic/           # GameState, DamageSystem
├── network/         # WebRTCManager, StateSync, Prediction
├── input/           # InputPoller
└── ui/              # HUD, Lobby
```

All modules communicate via a shared `EventEmitter` bus. Physics, networking, rendering and logic never import each other for runtime data.

## Quick Start

```bash
npm install
npm run dev
```

1. Click **Host Game** → copy the room code  
2. Open another tab/browser → **Join** with the code  
3. Click the canvas to lock pointer → WASD + mouse + LMB

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |

## Deploy (Vercel)

```bash
npm run build
# Deploy the `dist/` folder — pure static SPA, no server required
```

PeerJS uses public STUN servers by default. For production behind strict NATs you may want to add a TURN server.

## License

MIT
