const gameboyProjects = [
  {
    id: "portfolio-site",
    title: "Portfolio Site",
    desc: "You're on it! A custom-coded, pixel-meets-pro site with HTML/CSS/JS.",
    liveUrl: "https://your-portfolio-site.com",
    githubUrl: "https://github.com/yourusername/portfolio",
    thumbnail: "assets/imgs/POKEBALL1.png", // First project: POKEBALL1.png
    screenshot: "https://via.placeholder.com/500x300?text=Portfolio+Site+Screenshot",
    technologies: ["HTML", "CSS", "JavaScript"],
    challenges: "Balancing retro aesthetics with modern functionality."
  },
  {
    id: "pixel-rpg",
    title: "Pixel RPG Game",
    desc: "A 2D JavaScript canvas game with tilemaps, collisions, and quests.",
    liveUrl: "https://pixel-rpg-demo.com",
    githubUrl: "https://github.com/yourusername/pixel-rpg",
    thumbnail: "assets/imgs/POKEBALL3.png", // Second project: POKEBALL3.png
    screenshot: "https://via.placeholder.com/500x300?text=Pixel+RPG+Screenshot",
    technologies: ["JavaScript", "Canvas", "Tilemaps"],
    challenges: "Optimizing collision detection for smooth gameplay."
  },
  {
    id: "pokedex-app",
    title: "Pokedex App",
    desc: "Dynamic web app powered by PokeAPI, with search, filter, and modals.",
    liveUrl: "https://pokedex-app.com",
    githubUrl: "https://github.com/yourusername/pokedex",
    thumbnail: "assets/imgs/POKEBALL4.png", // Third project: POKEBALL4.png
    screenshot: "https://via.placeholder.com/500x300?text=Pokedex+Screenshot",
    technologies: ["JavaScript", "PokeAPI", "REST API"],
    challenges: "Handling asynchronous API calls efficiently."
  },
  {
    id: "retro-blog",
    title: "Retro Blog",
    desc: "Personal blog engine styled like NES menus. Markdown-powered.",
    liveUrl: "https://retro-blog.com",
    githubUrl: "https://github.com/yourusername/retro-blog",
    thumbnail: "assets/imgs/POKEBALL5.png", // Fourth project: POKEBALL5.png
    screenshot: "https://via.placeholder.com/500x300?text=Retro+Blog+Screenshot",
    technologies: ["Markdown", "JavaScript", "Node.js"],
    challenges: "Parsing Markdown files dynamically."
  },
  {
    id: "snake-game",
    title: "Snake Game",
    desc: "Classic JS snake game with a scoring system and local storage.",
    liveUrl: "https://snake-game-demo.com",
    githubUrl: "https://github.com/yourusername/snake-game",
    thumbnail: "assets/imgs/POKEBALL6.png", // Fifth project: POKEBALL6.png
    screenshot: "https://via.placeholder.com/500x300?text=Snake+Game+Screenshot",
    technologies: ["JavaScript", "HTML5", "Local Storage"],
    challenges: "Implementing smooth controls and scoring."
  },
  {
    id: "node-js-server",
    title: "Node.js Server",
    desc: "Custom REST API server for projects + contact forms, deployed to Render.",
    liveUrl: "https://node-server-demo.com",
    githubUrl: "https://github.com/yourusername/node-server",
    thumbnail: "assets/imgs/POKEBALL2.png", // Sixth project: POKEBALL2.png
    screenshot: "https://via.placeholder.com/500x300?text=Node.js+Server+Screenshot",
    technologies: ["Node.js", "Express", "Render"],
    challenges: "Securing API endpoints and handling CORS."
  }
];

let currentProject = 0;
let isTyping = false;
let currentAbortSignal = { aborted: false };

// Sound effect for button clicks (replace with actual audio file path, or comment out to disable)
const clickSound = new Audio("assets/button-click.mp3");
// Sound effect for theme toggle
const themeSound = new Audio("assets/button-click2.mp3");
// If you don't have an audio file, comment out the above lines and remove play() calls below

const titleEl = document.getElementById("screen-title");
const descEl = document.getElementById("screen-desc");

function typewriterEffect(element, text, speed, callback, abortSignal) {
  isTyping = true;
  element.textContent = "";
  let i = 0;
  function type() {
    if (abortSignal.aborted) {
      element.textContent = text;
      isTyping = false;
      if (callback) callback();
      return;
    }
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }
  type();
}

function abortTyping() {
  if (isTyping) {
    console.log("Aborting typewriter animation...");
    currentAbortSignal.aborted = true;
    if (descEl.textContent && !descEl.querySelector(".project-links")) {
      const project = gameboyProjects[currentProject];
      descEl.querySelector(".project-links")?.remove();
      const linksEl = document.createElement("div");
      linksEl.className = "project-links";
      linksEl.innerHTML = `
        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Live Demo</a>` : ""}
        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">GitHub</a>` : ""}
      `;
      descEl.appendChild(linksEl);
    }
    currentAbortSignal = { aborted: false };
  }
}

function showProject(index) {
  if (isTyping) {
    console.log("Cannot start new project while typing; call abortTyping first.");
    return;
  }
  const project = gameboyProjects[index];
  typewriterEffect(titleEl, project.title, 50, () => {
    typewriterEffect(
      descEl,
      project.desc,
      30,
      () => {
        descEl.querySelector(".project-links")?.remove();
        const linksEl = document.createElement("div");
        linksEl.className = "project-links";
        linksEl.innerHTML = `
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Live Demo</a>` : ""}
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">GitHub</a>` : ""}
        `;
        descEl.appendChild(linksEl);
      },
      currentAbortSignal
    );
  }, currentAbortSignal);
}

document.getElementById("up")?.addEventListener("click", () => {
  if (isTyping) {
    abortTyping();
    console.log("Animation skipped, proceeding to previous project...");
  }
  currentProject = (currentProject - 1 + gameboyProjects.length) % gameboyProjects.length;
  showProject(currentProject);
  clickSound.play().catch(() => {});
});

document.getElementById("down")?.addEventListener("click", () => {
  if (isTyping) {
    abortTyping();
    console.log("Animation skipped, proceeding to next project...");
  }
  currentProject = (currentProject + 1) % gameboyProjects.length;
  showProject(currentProject);
  clickSound.play().catch(() => {});
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    if (isTyping) {
      abortTyping();
      console.log("Animation skipped, proceeding to previous project...");
    }
    currentProject = (currentProject - 1 + gameboyProjects.length) % gameboyProjects.length;
    showProject(currentProject);
    clickSound.play().catch(() => {});
  } else if (e.key === "ArrowDown") {
    if (isTyping) {
      abortTyping();
      console.log("Animation skipped, proceeding to next project...");
    }
    currentProject = (currentProject + 1) % gameboyProjects.length;
    showProject(currentProject);
    clickSound.play().catch(() => {});
  }
});

const themeToggle = document.getElementById("theme-toggle");
function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  }
  localStorage.setItem("theme", theme);
}
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
  console.log("Playing theme toggle sound...");
  themeSound.play().catch(err => console.error("Failed to play theme sound:", err));
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
}

function populateProjectGrid() {
  const projectGrid = document.querySelector(".project-grid");
  if (projectGrid) {
    projectGrid.innerHTML = gameboyProjects.map(project => `
      <a href="projects/${project.id}.html" class="project pokemon-card">
        <img src="${project.thumbnail}" alt="${project.title} thumbnail" loading="lazy">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div class="hp-bar"></div> <!-- HP bar for Pokémon styling -->
      </a>
    `).join("");
  } else {
    console.error("Project grid element not found!");
  }
}

document.getElementById("contact-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Replace with your actual backend endpoint or comment out if disabled
  try {
    const response = await fetch("https://your-node-server.com/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      alert("Message sent successfully!");
      e.target.reset();
    } else {
      alert("Error sending message. Please try again.");
    }
  } catch (error) {
    alert("Network error. Please try again later.");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const showcase = document.querySelector(".gameboy-showcase");
  if (showcase) {
    console.log("Showcase found, removing loading class...");
    setTimeout(() => {
      showcase.classList.remove("loading");
      showProject(currentProject);
    }, 1000);
  } else {
    console.error("Gameboy showcase element not found!");
  }
  // Fallback to ensure loading class is removed
  setTimeout(() => {
    if (showcase && showcase.classList.contains("loading")) {
      console.warn("Fallback: Forcing removal of loading class");
      showcase.classList.remove("loading");
    }
  }, 1500);
  populateProjectGrid();
});
