// ===== Data =====
const SKILLS = [
  { n: "01", name: "HTML", desc: "Structuring pages with semantic tags, links, and images.", xp: 100 },
  { n: "02", name: "CSS", desc: "Styling with colors, layout, and responsive design.", xp: 95 },
  { n: "03", name: "Tailwind CSS", desc: "Building UIs fast with utility-first classes.", xp: 85 },
  { n: "04", name: "JavaScript", desc: "Adding interactivity, logic, and dynamic behavior.", xp: 80 },
  { n: "05", name: "Next.js", desc: "A React framework for modern full-stack web apps.", xp: 70 },
  { n: "06", name: "Terminal", desc: "Controlling projects from the command line.", xp: 75 },
  { n: "07", name: "GitHub", desc: "Version control and collaborating on code.", xp: 85 },
  { n: "08", name: "Vercel", desc: "Deploying and hosting websites live on the web.", xp: 90 },
];

const SOFT = [
  { name: "Teamwork", desc: "Working together, sharing ideas, and building as a group." },
  { name: "Playing Games", desc: "Learning and recharging by playing games with the class." },
  { name: "We Shipped a Site", desc: "Our team built and launched a real website together." },
];

const BOOT_LINES = [
  "booting teen_coder.os v1.0 ...",
  "loading modules: html css tailwind js nextjs git vercel ...  [ok]",
  "mounting /skills ............................................ [ok]",
  "starting user session: lkhamdolgor ......................... [ok]",
  "type 'help' to explore.  welcome :)",
];

// ===== Boot sequence =====
const bootEl = document.getElementById("boot");
const bootLog = document.getElementById("boot-log");
const osEl = document.getElementById("os");

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeBoot(i = 0) {
  if (i >= BOOT_LINES.length) {
    setTimeout(revealOS, 500);
    return;
  }
  const line = BOOT_LINES[i].replace("[ok]", "");
  bootLog.innerHTML += line;
  if (BOOT_LINES[i].includes("[ok]")) {
    bootLog.innerHTML += '<span class="ok">[ok]</span>';
  }
  bootLog.innerHTML += "\n";
  setTimeout(() => typeBoot(i + 1), 420);
}

function revealOS() {
  bootEl.classList.add("done");
  osEl.hidden = false;
  buildCards();
  animateXP();
  printLine("res", "session ready. try: skills, about, run website, whoami");
  document.getElementById("cmd").focus();
}

// ===== Build skill + soft cards =====
function buildCards() {
  const grid = document.getElementById("skill-grid");
  grid.innerHTML = SKILLS.map(
    (s) => `
    <article class="card">
      <div class="top">
        <span class="num">SKILL_${s.n}</span>
        <span class="badge">unlocked</span>
      </div>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="xp"><span data-xp="${s.xp}"></span></div>
    </article>`
  ).join("");

  const soft = document.getElementById("soft-grid");
  soft.innerHTML = SOFT.map(
    (s) => `
    <article class="card">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
    </article>`
  ).join("");
}

function animateXP() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".xp span").forEach((bar) => {
      bar.style.width = reduced ? bar.dataset.xp + "%" : "0%";
      if (!reduced) setTimeout(() => (bar.style.width = bar.dataset.xp + "%"), 150);
      else bar.style.width = bar.dataset.xp + "%";
    });
  });
}

// ===== Terminal =====
const output = document.getElementById("output");
const form = document.getElementById("prompt-form");
const input = document.getElementById("cmd");

function printLine(cls, html) {
  const div = document.createElement("div");
  div.className = "line " + cls;
  div.innerHTML = html;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

const COMMANDS = {
  help() {
    printLine(
      "res",
      "available commands:\n" +
        "  skills       list every technology I learned\n" +
        "  about        who I am\n" +
        "  whoami       short version\n" +
        "  run website  open the site my team built\n" +
        "  soft         teamwork, games & more\n" +
        "  clear        wipe the terminal"
    );
  },
  skills() {
    printLine("accent", "// technologies unlocked (" + SKILLS.length + ")");
    SKILLS.forEach((s) =>
      printLine("res", `  ${s.n}  ${s.name.padEnd(14)} ${"█".repeat(Math.round(s.xp / 10))} ${s.xp}%`)
    );
  },
  about() {
    printLine(
      "res",
      "Lkhamdolgor — a teen coder who went from a blank HTML file\n" +
        "to shipping a real website during the Teen Coder Course."
    );
  },
  whoami() {
    printLine("res", "lkhamdolgor // teen coder");
  },
  soft() {
    SOFT.forEach((s) => printLine("res", `  + ${s.name}: ${s.desc}`));
  },
  clear() {
    output.innerHTML = "";
  },
};

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  printLine("echo", `<b>lkhamdolgor@teen-coder:~$</b> ${escapeHtml(raw)}`);

  if (cmd === "run website" || cmd === "run" || cmd === "website") {
    printLine("warn", "opening our team website ...");
    setTimeout(() => (window.location.href = "menu.html"), 700);
    return;
  }
  if (cmd === "home") {
    window.location.href = "index.html";
    return;
  }
  if (COMMANDS[cmd]) {
    COMMANDS[cmd]();
  } else {
    printLine("warn", `command not found: ${escapeHtml(cmd)} — try 'help'`);
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  runCommand(input.value);
  input.value = "";
});

// command chips
document.querySelectorAll(".cmd-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    runCommand(chip.dataset.cmd);
    input.focus();
  });
});

// keep focus on terminal when clicking the screen
document.addEventListener("click", (e) => {
  if (e.target.closest(".terminal") && !osEl.hidden) input.focus();
});

// ===== Start =====
if (reduced) {
  bootLog.textContent = BOOT_LINES.join("\n");
  revealOS();
} else {
  typeBoot();
}
