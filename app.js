let scene, camera, renderer;
let cubelets = [];
let moveQueue = [], animating = false;
const CUBIE_SIZE = 0.95;
const GAP = 0.05;

const COLORS = {
  U: 0xffffff, D: 0xffff00, L: 0xff8000,
  R: 0xff0000, F: 0x00ff00, B: 0x0000ff
};

//  Creates a single cubie with appropriate face colors based on its position
function createCubie(x, y, z) {
  const geometry = new THREE.BoxGeometry(CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE);
  const materials = [
    new THREE.MeshBasicMaterial({ color: x === 1 ? COLORS.R : 0x111111 }),
    new THREE.MeshBasicMaterial({ color: x === -1 ? COLORS.L : 0x111111 }),
    new THREE.MeshBasicMaterial({ color: y === 1 ? COLORS.U : 0x111111 }),
    new THREE.MeshBasicMaterial({ color: y === -1 ? COLORS.D : 0x111111 }),
    new THREE.MeshBasicMaterial({ color: z === 1 ? COLORS.F : 0x111111 }),
    new THREE.MeshBasicMaterial({ color: z === -1 ? COLORS.B : 0x111111 })
  ];
  const cubie = new THREE.Mesh(geometry, materials);
  cubie.position.set(
    x * (CUBIE_SIZE + GAP),
    y * (CUBIE_SIZE + GAP),
    z * (CUBIE_SIZE + GAP)
  );
  return cubie;
}

// Initializes the 3D scene, camera, renderer, and adds all cubies to the scene
function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("cube-container").appendChild(renderer.domElement);

  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) {
        const cubie = createCubie(x, y, z);
        scene.add(cubie);
        cubelets.push(cubie);
      }

  camera.position.set(6, 6, 6);
  camera.lookAt(0, 0, 0);
  animate();
}

// Continuously renders the scene using 'requestAnimationFrame'
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Rotates a group of cubies around a given axis and layer over a specified duration
function rotateGroup(axis, layer, angle, duration = 300) {
  return new Promise(resolve => {
    const group = new THREE.Group();
    const eps = 0.01;
    cubelets.forEach(c => {
      if (Math.abs(c.position[axis] - layer) < eps) group.attach(c);
    });
    scene.add(group);

    const start = performance.now();
    const rad = THREE.MathUtils.degToRad(angle);

    function rotateFrame(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      group.rotation[axis] = rad * progress;

      if (progress < 1) {
        requestAnimationFrame(rotateFrame);
      } else {
        group.updateMatrixWorld();
        cubelets.forEach(c => scene.attach(c));
        scene.remove(group);
        resolve();
      }
    }
    requestAnimationFrame(rotateFrame);
  });
}

// Handles U, U', U2, etc.
async function animateMove(move) {
  const base = move[0];
  let turns = 1;

  if (move.includes("2")) turns = 2;
  const prime = move.includes("'");

  const angle = prime ? -90 : 90;

  for (let i = 0; i < turns; i++) {
    switch (base) {
      case 'U': await rotateGroup('y', 1, angle); break;
      case 'D': await rotateGroup('y', -1, angle); break;
      case 'R': await rotateGroup('x', 1, angle); break;
      case 'L': await rotateGroup('x', -1, angle); break;
      case 'F': await rotateGroup('z', 1, angle); break;
      case 'B': await rotateGroup('z', -1, angle); break;
    }
  }
}

async function animateMoves() {
  if (animating || moveQueue.length === 0) return;
  animating = true;
  while (moveQueue.length > 0) {
    const move = moveQueue.shift();
    await animateMove(move);
  }
  animating = false;
}

// Inverts a move (e.g. U -> U', U' -> U, U2 -> U2)
function invertMove(move) {
  if (move.includes("2")) return move;
  return move.endsWith("'") ? move.slice(0, -1) : move + "'";
}

// Handles scrambling
document.getElementById("applyScramble").addEventListener("click", async () => {
  const input = document.getElementById("scrambleInput").value.trim();
  if (!input) return alert("Please enter a scramble.");
  const scrambleMoves = input.split(/\s+/);

  // Animate scramble
  for (const move of scrambleMoves) {
    await animateMove(move);
  }

  // Store the inverse moves for solving (reversed)
  moveQueue = scrambleMoves.slice().reverse().map(invertMove);
});

// Solve
document.getElementById("solveBtn").addEventListener("click", animateMoves);

initScene();
