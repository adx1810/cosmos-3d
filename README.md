# COSMOS Studio — 3D Universe Explorer

A polished, responsive, multi-section website featuring a 3D orbital sandbox, procedural planet surfaces, a cinematic space scene, planet atlas, and three interactive physics experiments.

## How to run on Windows

1. Extract the ZIP.
2. Open the **COSMOS_Studio** folder (the one containing `index.html`).
3. Click the File Explorer address bar, type `cmd`, and press Enter.
4. Run:

   ```cmd
   py -m http.server 8000
   ```

5. Open `http://localhost:8000` in Opera GX or Chrome.
6. Keep the Command Prompt window open while using the local site. Press `Ctrl+C` to stop it.

An internet connection is required for the Three.js modules and Google Fonts loaded from CDNs. If port 8000 is occupied, use `py -m http.server 8001` and `http://localhost:8001` instead.

## Publish free with GitHub Pages

1. Create a **new** public GitHub repository (e.g. `cosmos-studio`). Do not replace Interest Explorer.
2. Upload `index.html`, `css/style.css`, `js/app.js` and `README.md`, retaining the `css` and `js` folders.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**; choose `main` and `/ (root)`, then Save.
5. Wait for the Pages URL to appear. Typical repository URL: `https://YOUR-USERNAME.github.io/cosmos-studio/`.

The public site works without your laptop running. GitHub Pages and CDN availability are subject to provider policies and service limits.

## Controls

- Drag to rotate, scroll/pinch to zoom, right-drag to pan.
- Click a planet to select it; change its mass in the toolbar.
- Adjust simulation speed and central gravity.
- Add planets, pause, reset, and fullscreen the sandbox.
- Explore planets in the Atlas tab; use “Observe in simulation”.
- Click Physics Lab experiment buttons to modify the simulation.

## How the physics works

A fixed central star attracts orbiting bodies under a stylized inverse-square force, integrated with velocity-Verlet steps and a swept-sphere collision test. Mass of each planet is stored and editable but does **not** currently change its acceleration or affect other planets: gravitational interactions between planets are not included yet. Body radii, distances and speeds are not to astronomical scale. Colliding bodies are removed; there are no explosive effects yet.

## Graphics and licensing

Textures and nebula are **generated procedurally in JavaScript** at runtime. No NASA images or third-party planet textures are bundled. Three.js is loaded via jsDelivr (MIT-licensed project), and Google Fonts via official provider. Visuals prioritize an imaginative cinematic art direction, rather than scientific photorealism. Since texture generation occurs in the browser, initial load may take a few seconds.

## Project structure

- `index.html` — homepage, sandbox, atlas, and lab content
- `css/style.css` — visual design and mobile layouts
- `js/app.js` — Three.js scene, shader, planet textures, orbital physics, and UI logic
- `README.md` — setup and publishing instructions

## Learning roadmap

1. Change page text and styling in `index.html` / `css/style.css`.
2. Change the initial planetary positions in `reset()`.
3. Add save/load of custom universes to `localStorage`.
4. Add full mutual N-body dynamics and adjustable star mass.
5. Improve textures and shaders with licensed high-res maps and LOD/mobile settings.
