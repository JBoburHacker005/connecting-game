const ROWS = 8;
const COLS = 15;
const MAX_TURNS = 3;
const POINTS_PER_MATCH = 120;

const LOGO_POOL = [
  { id: "python", label: "Python", iconClass: "devicon-python-plain colored", glow: "#4b8bbe" },
  { id: "mongodb", label: "MongoDB", iconClass: "devicon-mongodb-plain colored", glow: "#4db33d" },
  { id: "mysql", label: "MySQL", iconClass: "devicon-mysql-plain colored", glow: "#4479a1" },
  { id: "postgresql", label: "PostgreSQL", iconClass: "devicon-postgresql-plain colored", glow: "#336791" },
  { id: "redis", label: "Redis", iconClass: "devicon-redis-plain colored", glow: "#d82c20" },
  { id: "html5", label: "HTML5", iconClass: "devicon-html5-plain colored", glow: "#e34f26" },
  { id: "css3", label: "CSS3", iconClass: "devicon-css3-plain colored", glow: "#1572b6" },
  { id: "javascript", label: "JavaScript", iconClass: "devicon-javascript-plain colored", glow: "#f7df1e" },
  { id: "typescript", label: "TypeScript", iconClass: "devicon-typescript-plain colored", glow: "#3178c6" },
  { id: "react", label: "React", iconClass: "devicon-react-original colored", glow: "#61dafb" },
  { id: "vue", label: "Vue.js", iconClass: "devicon-vuejs-plain colored", glow: "#42b883" },
  { id: "angular", label: "Angular", iconClass: "devicon-angularjs-plain colored", glow: "#dd0031" },
  { id: "svelte", label: "Svelte", iconClass: "devicon-svelte-plain colored", glow: "#ff3e00" },
  { id: "nodejs", label: "Node.js", iconClass: "devicon-nodejs-plain colored", glow: "#8cc84b" },
  { id: "go", label: "Go", iconClass: "devicon-go-original-wordmark colored", glow: "#00add8" },
  { id: "rust", label: "Rust", iconClass: "devicon-rust-plain colored", glow: "#dea584" },
  { id: "swift", label: "Swift", iconClass: "devicon-swift-plain colored", glow: "#fa7343" },
  { id: "kotlin", label: "Kotlin", iconClass: "devicon-kotlin-plain colored", glow: "#7f52ff" },
  { id: "java", label: "Java", iconClass: "devicon-java-plain colored", glow: "#5382a1" },
  { id: "csharp", label: "C#", iconClass: "devicon-csharp-plain colored", glow: "#239120" },
  { id: "php", label: "PHP", iconClass: "devicon-php-plain colored", glow: "#777bb4" },
  { id: "ruby", label: "Ruby", iconClass: "devicon-ruby-plain colored", glow: "#cc342d" },
  { id: "dart", label: "Dart", iconClass: "devicon-dart-plain colored", glow: "#0175c2" },
  { id: "flutter", label: "Flutter", iconClass: "devicon-flutter-plain colored", glow: "#02569b" },
  { id: "android", label: "Android", iconClass: "devicon-android-plain colored", glow: "#3ddc84" },
  { id: "apple", label: "Apple", iconClass: "devicon-apple-original colored", glow: "#a3aaae" },
  { id: "windows", label: "Windows", iconClass: "devicon-windows8-original colored", glow: "#0078d6" },
  { id: "linux", label: "Linux", iconClass: "devicon-linux-plain colored", glow: "#fcc624" },
  { id: "aws", label: "AWS", iconClass: "devicon-amazonwebservices-original colored", glow: "#ff9900" },
  { id: "azure", label: "Azure", iconClass: "devicon-azure-plain colored", glow: "#0089d6" },
  { id: "gcp", label: "Google Cloud", iconClass: "devicon-googlecloud-plain colored", glow: "#4285f4" },
  { id: "firebase", label: "Firebase", iconClass: "devicon-firebase-plain colored", glow: "#ffcc2f" },
  { id: "docker", label: "Docker", iconClass: "devicon-docker-plain colored", glow: "#2496ed" },
  { id: "kubernetes", label: "Kubernetes", iconClass: "devicon-kubernetes-plain colored", glow: "#326ce5" },
  { id: "terraform", label: "Terraform", iconClass: "devicon-terraform-plain colored", glow: "#7b42bc" },
  { id: "git", label: "Git", iconClass: "devicon-git-plain colored", glow: "#f05032" },
  { id: "github", label: "GitHub", iconClass: "devicon-github-original colored", glow: "#ffffff" },
  { id: "gitlab", label: "GitLab", iconClass: "devicon-gitlab-plain colored", glow: "#fc6d26" },
  { id: "bitbucket", label: "Bitbucket", iconClass: "devicon-bitbucket-original colored", glow: "#0047b3" },
  { id: "figma", label: "Figma", iconClass: "devicon-figma-plain colored", glow: "#f24e1e" },
  { id: "xd", label: "Adobe XD", iconClass: "devicon-xd-plain colored", glow: "#ff61f6" },
  { id: "jira", label: "Jira", iconClass: "devicon-jira-plain colored", glow: "#0052cc" },
  { id: "slack", label: "Slack", iconClass: "devicon-slack-plain colored", glow: "#4a154b" },
  { id: "vscode", label: "VS Code", iconClass: "devicon-vscode-plain colored", glow: "#007acc" },
  { id: "unity", label: "Unity", iconClass: "devicon-unity-original colored", glow: "#ffffff" },
  { id: "unreal", label: "Unreal", iconClass: "devicon-unrealengine-original colored", glow: "#0e1128" },
  { id: "blender", label: "Blender", iconClass: "devicon-blender-original colored", glow: "#f5792a" },
];

const boardEl = document.getElementById("board");
const pairsRemainingEl = document.getElementById("pairsRemaining");
const moveCountEl = document.getElementById("moveCount");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");
const hintBtn = document.getElementById("hintBtn");
const hintCountEl = document.getElementById("hintCount");
const pauseBtn = document.getElementById("pauseBtn");
const progressFill = document.getElementById("progressFill");
const scoreValueEl = document.getElementById("scoreValue");
const lifeEls = document.querySelectorAll(".life");
const statusMessageEl = document.getElementById("statusMessage");
const levelValueEl = document.getElementById("levelValue");

const directions = [
  { r: 0, c: 1 },
  { r: 1, c: 0 },
  { r: 0, c: -1 },
  { r: -1, c: 0 },
];

let grid = [];
let domTiles = [];
let firstSelection = null;
let matches = 0;
let moves = 0;
let score = 0;
let hintsLeft = 3;
let lives = 3;
let isPaused = false;
let pauseMode = null; // null | "user" | "end"
const totalPairs = (ROWS * COLS) / 2;
const level = 1;

function createDeck() {
  const neededTiles = ROWS * COLS;
  const pairsNeeded = neededTiles / 2;
  const icons = [];

  let index = 0;
  while (icons.length < pairsNeeded) {
    const base = LOGO_POOL[index % LOGO_POOL.length];
    icons.push({ ...base });
    index += 1;
  }

  const deck = [...icons, ...icons].map((logo, idx) => ({
    ...logo,
    key: `${logo.id}-${idx}`,
  }));

  shuffle(deck);
  return deck;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function buildGrid() {
  const paddedRows = ROWS + 2;
  const paddedCols = COLS + 2;

  grid = Array.from({ length: paddedRows }, (_, r) =>
    Array.from({ length: paddedCols }, (_, c) => ({
      value: null,
      row: r,
      col: c,
    }))
  );

  const deck = createDeck();
  let index = 0;
  for (let r = 1; r <= ROWS; r += 1) {
    for (let c = 1; c <= COLS; c += 1) {
      grid[r][c].value = deck[index];
      index += 1;
    }
  }
}

function renderBoard() {
  boardEl.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
  boardEl.innerHTML = "";
  boardEl.dataset.paused = "false";
  domTiles = Array.from({ length: ROWS + 2 }, () =>
    Array.from({ length: COLS + 2 }, () => null)
  );

  for (let r = 1; r <= ROWS; r += 1) {
    for (let c = 1; c <= COLS; c += 1) {
      const cell = grid[r][c];
      const tile = document.createElement("button");
      tile.className = "tile";
      tile.type = "button";
      tile.dataset.row = r;
      tile.dataset.col = c;
      tile.setAttribute("aria-pressed", "false");
      setTileContent(tile, cell.value);
      tile.addEventListener("click", () => onTileClick(r, c));
      boardEl.appendChild(tile);
      domTiles[r][c] = tile;
    }
  }
}

function setTileContent(tile, value) {
  if (value) {
    tile.innerHTML = `<i class="${value.iconClass}" aria-hidden="true"></i>`;
    tile.setAttribute("aria-label", value.label);
    tile.style.setProperty("--tile-color", value.glow || "#6cf");
    tile.disabled = false;
  } else {
    tile.innerHTML = "";
    tile.removeAttribute("aria-label");
    tile.disabled = true;
  }
}

function resetState() {
  matches = 0;
  moves = 0;
  score = 0;
  hintsLeft = 3;
  lives = 3;
  isPaused = false;
  pauseMode = null;
  firstSelection = null;
  buildGrid();
  renderBoard();
  updateLivesUI();
  updateHud();
  clearStatusMessage();
}

function updateHud() {
  pairsRemainingEl.textContent = (totalPairs - matches).toString();
  moveCountEl.textContent = moves.toString();
  scoreValueEl.textContent = score.toString();
  progressFill.style.width = `${(matches / totalPairs) * 100}%`;
  hintCountEl.textContent = hintsLeft.toString();
  updateLivesUI();
  updatePauseButton();
}

function onTileClick(row, col) {
  if (isPaused) return;
  const tileValue = grid[row][col].value;
  if (!tileValue) return;

  if (firstSelection && firstSelection.row === row && firstSelection.col === col) {
    clearSelection();
    return;
  }

  selectTile(row, col);

  if (!firstSelection) {
    firstSelection = { row, col, logo: tileValue };
    return;
  }

  const second = { row, col, logo: tileValue };
  moves += 1;

  if (firstSelection.logo.id === second.logo.id && canConnect(firstSelection, second)) {
    applyMatch(firstSelection, second);
  } else {
    handleMismatch();
  }
  updateHud();
}

function selectTile(row, col) {
  const tileEl = domTiles[row][col];
  tileEl.dataset.selected = "true";
  tileEl.setAttribute("aria-pressed", "true");
}

function clearSelection() {
  for (let r = 1; r <= ROWS; r += 1) {
    for (let c = 1; c <= COLS; c += 1) {
      const tileEl = domTiles[r][c];
      if (tileEl) {
        tileEl.dataset.selected = "false";
        tileEl.dataset.hint = "false";
        tileEl.setAttribute("aria-pressed", "false");
      }
    }
  }
  firstSelection = null;
}

function applyMatch(a, b) {
  drawPath(a, b);
  grid[a.row][a.col].value = null;
  grid[b.row][b.col].value = null;
  domTiles[a.row][a.col].dataset.cleared = "true";
  domTiles[b.row][b.col].dataset.cleared = "true";
  domTiles[a.row][a.col].disabled = true;
  domTiles[b.row][b.col].disabled = true;
  matches += 1;
  score += POINTS_PER_MATCH;
  clearSelection();
  if (matches === totalPairs) {
    winGame();
  }
}

function drawPath(a, b) {
  const path = findPath(a, b);
  if (!path.length) return;

  for (let i = 0; i < path.length - 1; i += 1) {
    const start = path[i];
    const end = path[i + 1];
    const startEl = domTiles[start.row][start.col];
    const endEl = domTiles[end.row][end.col];
    if (!startEl || !endEl) continue;

    const line = document.createElement("div");
    line.className = "path-line";
    const rectA = startEl.getBoundingClientRect();
    const rectB = endEl.getBoundingClientRect();
    const parentRect = boardEl.getBoundingClientRect();

    const x1 = rectA.left + rectA.width / 2 - parentRect.left;
    const y1 = rectA.top + rectA.height / 2 - parentRect.top;
    const x2 = rectB.left + rectB.width / 2 - parentRect.left;
    const y2 = rectB.top + rectB.height / 2 - parentRect.top;

    line.style.left = `${Math.min(x1, x2)}px`;
    line.style.top = `${Math.min(y1, y2)}px`;
    line.style.width = `${Math.abs(x1 - x2) || 2}px`;
    line.style.height = `${Math.abs(y1 - y2) || 2}px`;

    boardEl.appendChild(line);
    setTimeout(() => line.remove(), 400);
  }
}

function canConnect(start, end) {
  const path = findPath(start, end);
  return path.length > 0;
}

function findPath(start, end) {
  const rows = ROWS + 2;
  const cols = COLS + 2;
  const visited = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Array(4).fill(Infinity))
  );

  const queue = [];
  queue.push({ row: start.row, col: start.col, dir: -1, turns: 0, path: [start] });

  while (queue.length) {
    const current = queue.shift();

    for (let dirIndex = 0; dirIndex < directions.length; dirIndex += 1) {
      const dir = directions[dirIndex];
      let turns = current.dir === -1 || current.dir === dirIndex ? current.turns : current.turns + 1;
      if (turns > MAX_TURNS) continue;

      let row = current.row + dir.r;
      let col = current.col + dir.c;
      const path = [...current.path];

      while (row >= 0 && row < rows && col >= 0 && col < cols) {
        if (!(row === start.row && col === start.col)) {
          if (row === end.row && col === end.col) {
            path.push({ row, col });
            return path;
          }
          if (grid[row][col].value) break;
        }

        if (visited[row][col][dirIndex] <= turns) break;
        visited[row][col][dirIndex] = turns;

        queue.push({
          row,
          col,
          dir: dirIndex,
          turns,
          path: [...path, { row, col }],
        });

        row += dir.r;
        col += dir.c;
      }
    }
  }

  return [];
}

function shuffleBoard() {
  if (isPaused && pauseMode !== "user") return;
  const activeTiles = [];
  for (let r = 1; r <= ROWS; r += 1) {
    for (let c = 1; c <= COLS; c += 1) {
      if (grid[r][c].value) {
        activeTiles.push(grid[r][c].value);
      }
    }
  }

  shuffle(activeTiles);
  let idx = 0;
  for (let r = 1; r <= ROWS; r += 1) {
    for (let c = 1; c <= COLS; c += 1) {
      if (grid[r][c].value) {
        grid[r][c].value = activeTiles[idx];
        idx += 1;
        const tileEl = domTiles[r][c];
        setTileContent(tileEl, grid[r][c].value);
      }
    }
  }
  clearSelection();
}

shuffleBtn.addEventListener("click", () => {
  if (isPaused) return;
  shuffleBoard();
  moves += 1;
  updateHud();
});

resetBtn.addEventListener("click", () => {
  resetState();
});

hintBtn.addEventListener("click", () => {
  if (isPaused) return;
  useHint();
});

pauseBtn.addEventListener("click", () => {
  togglePause();
});

function useHint() {
  if (hintsLeft <= 0) {
    flashStatus("Hint tugadi!");
    return;
  }
  const match = findAnyMatch();
  if (!match) {
    flashStatus("Hech qanday yo‘l topilmadi");
    return;
  }
  hintsLeft -= 1;
  const [a, b] = match;
  domTiles[a.row][a.col].dataset.hint = "true";
  domTiles[b.row][b.col].dataset.hint = "true";
  setTimeout(() => {
    domTiles[a.row][a.col].dataset.hint = "false";
    domTiles[b.row][b.col].dataset.hint = "false";
  }, 1000);
  updateHud();
}

function findAnyMatch() {
  for (let r1 = 1; r1 <= ROWS; r1 += 1) {
    for (let c1 = 1; c1 <= COLS; c1 += 1) {
      const first = grid[r1][c1].value;
      if (!first) continue;
      for (let r2 = r1; r2 <= ROWS; r2 += 1) {
        for (let c2 = 1; c2 <= COLS; c2 += 1) {
          if (r1 === r2 && c2 <= c1) continue;
          const second = grid[r2][c2].value;
          if (!second || first.id !== second.id) continue;
          if (canConnect({ row: r1, col: c1, logo: first }, { row: r2, col: c2, logo: second })) {
            return [
              { row: r1, col: c1 },
              { row: r2, col: c2 },
            ];
          }
        }
      }
    }
  }
  return null;
}

function loseLife() {
  if (lives <= 0) return;
  lives -= 1;
  updateLivesUI();
  if (lives === 0) {
    endGame("Yo‘qotdingiz! ↻ bosib qayta urinib ko‘ring.");
  } else {
    flashStatus(`Xatolik! Qolgan yurak: ${lives}`);
  }
}

function updateLivesUI() {
  lifeEls.forEach((lifeEl, index) => {
    if (index < lives) {
      lifeEl.classList.add("active");
    } else {
      lifeEl.classList.remove("active");
    }
  });
}

function winGame() {
  endGame("Tabriklaymiz! Maydon tozalandi.");
}

function endGame(message) {
  isPaused = true;
  pauseMode = "end";
  boardEl.dataset.paused = "true";
  showStatusMessage(message);
  updatePauseButton();
}

function togglePause() {
  if (pauseMode === "end") return;
  isPaused = !isPaused;
  pauseMode = isPaused ? "user" : null;
  boardEl.dataset.paused = isPaused ? "true" : "false";
  if (isPaused) {
    showStatusMessage("Pauza");
  } else {
    clearStatusMessage();
  }
  updatePauseButton();
}

function showStatusMessage(message) {
  statusMessageEl.textContent = message;
  statusMessageEl.classList.add("active");
}

function clearStatusMessage() {
  statusMessageEl.textContent = "";
  statusMessageEl.classList.remove("active");
}

function flashStatus(message) {
  showStatusMessage(message);
  setTimeout(() => {
    if (pauseMode !== "end" && !(isPaused && pauseMode === "user")) {
      clearStatusMessage();
    }
  }, 900);
}

function updatePauseButton() {
  if (!pauseBtn) return;
  pauseBtn.textContent = isPaused && pauseMode === "user" ? "▶" : "⏸";
}

function handleMismatch() {
  loseLife();
  setTimeout(clearSelection, 250);
}

function initializeStaticHud() {
  if (levelValueEl) {
    levelValueEl.textContent = level.toString();
  }
}

initializeStaticHud();
resetState();
