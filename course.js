// ===== Data =====
const SKILLS = [
  {
    n: "01", name: "HTML", id: "html", tag: "structure", xp: 100,
    desc: "The skeleton of every web page — semantic tags, links, and images.",
    learned: [
      "Semantic tags: header, main, section, footer",
      "Links, lists, images with alt text",
      "Forms, inputs, and buttons",
    ],
    example: '<main>\n  <h1>Hello world</h1>\n  <a href="menu.html">Our site</a>\n</main>',
  },
  {
    n: "02", name: "CSS", id: "css", tag: "style", xp: 95,
    desc: "The paint and layout — colors, spacing, and responsive design.",
    learned: [
      "Colors, fonts, borders & shadows",
      "Flexbox for centering and layout",
      "Media queries for mobile screens",
    ],
    example: ".btn {\n  display: flex;\n  background: #00e5ff;\n  border-radius: 8px;\n}",
  },
  {
    n: "03", name: "Tailwind CSS", id: "tailwind", tag: "style", xp: 85,
    desc: "Styling at lightning speed using utility classes in the HTML.",
    learned: [
      "Utility-first classes (flex, p-4, text-xl)",
      "Responsive prefixes (md:, lg:)",
      "Building UI without writing CSS files",
    ],
    example: '<button class="flex px-4 py-2 rounded-lg bg-cyan-400">\n  Click me\n</button>',
  },
  {
    n: "04", name: "JavaScript", id: "javascript", tag: "logic", xp: 80,
    desc: "The brain — interactivity, logic, and things that react to clicks.",
    learned: [
      "Variables, functions & conditions",
      "Selecting and changing the DOM",
      "Event listeners (click, submit, keypress)",
    ],
    example: "const btn = document.querySelector('button');\nbtn.addEventListener('click', () => {\n  alert('It works!');\n});",
  },
  {
    n: "05", name: "Next.js", id: "nextjs", tag: "framework", xp: 70,
    desc: "A React framework for building fast, modern full-stack web apps.",
    learned: [
      "Pages and file-based routing",
      "Reusable React components",
      "Building real multi-page apps",
    ],
    example: "export default function Page() {\n  return <h1>Welcome!</h1>;\n}",
  },
  {
    n: "06", name: "Terminal", id: "terminal", tag: "tools", xp: 75,
    desc: "Talking to the computer with commands instead of clicks.",
    learned: [
      "Moving around: cd, ls, mkdir",
      "Running dev servers & scripts",
      "Installing packages with npm",
    ],
    example: "$ cd my-site\n$ npm run dev\n$ git status",
  },
  {
    n: "07", name: "GitHub", id: "github", tag: "tools", xp: 85,
    desc: "Saving versions of code and building together as a team.",
    learned: [
      "commit, push & pull",
      "Branches for safe changes",
      "Collaborating on one project",
    ],
    example: "$ git add .\n$ git commit -m 'add homepage'\n$ git push",
  },
  {
    n: "08", name: "Vercel", id: "vercel", tag: "deploy", xp: 90,
    desc: "Sending the website live so anyone in the world can visit it.",
    learned: [
      "Connecting a GitHub repo",
      "One-click deploys",
      "Getting a live URL to share",
    ],
    example: "$ vercel deploy\n> https://my-site.vercel.app  [live]",
  },
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
      <h3>${s.name} <span class="tag">${s.tag}</span></h3>
      <p>${s.desc}</p>
      <ul class="learned">
        ${s.learned.map((l) => `<li>${escapeHtml(l)}</li>`).join("")}
      </ul>
      <pre class="snippet"><code>${escapeHtml(s.example)}</code></pre>
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
        "  <skill>      details on one skill (e.g. html, css, nextjs)\n" +
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
    printLine("res", "\ntip: type a name like 'html' or 'nextjs' for the full breakdown.");
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
  const skill = SKILLS.find((s) => s.id === cmd || s.name.toLowerCase() === cmd);
  if (skill) {
    printSkill(skill);
    return;
  }
  if (COMMANDS[cmd]) {
    COMMANDS[cmd]();
  } else {
    printLine("warn", `command not found: ${escapeHtml(cmd)} — try 'help'`);
  }
}

function printSkill(s) {
  printLine("accent", `// ${s.name}  [${s.tag}]  —  ${s.xp}% xp`);
  printLine("res", "  " + s.desc);
  printLine("res", "\n  what I learned:");
  s.learned.forEach((l) => printLine("res", "    - " + escapeHtml(l)));
  printLine("res", "\n  example:");
  s.example.split("\n").forEach((l) => printLine("code", "    " + escapeHtml(l)));
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
