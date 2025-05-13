const gameboyProjects = [
  {
    id: "portfolio-site",
    title: "Portfolio Site",
    desc: "You're on it! A custom-coded, pixel-meets-pro site with HTML/CSS/JS.",
    liveUrl: "https://your-portfolio-site.com",
    githubUrl: "https://github.com/yourusername/portfolio",
    thumbnail: "https://via.placeholder.com/300x150?text=Portfolio+Site",
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
    thumbnail: "https://via.placeholder.com/300x150?text=Pixel+RPG",
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
    thumbnail: "https://via.placeholder.com/300x150?text=Pokedex+App",
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
    thumbnail: "https://via.placeholder.com/300x150?text=Retro+Blog",
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
    thumbnail: "https://via.placeholder.com/300x150?text=Snake+Game",
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
    thumbnail: "https://via.placeholder.com/300x150?text=Node.js+Server",
    screenshot: "https://via.placeholder.com/500x300?text=Node.js+Server+Screenshot",
    technologies: ["Node.js", "Express", "Render"],
    challenges: "Securing API endpoints and handling CORS."
  }
];

let currentProject = 0;

const titleEl = document.getElementById("screen-title");
const descEl = document.getElementById("screen-desc");

// Sound effect (replace with actual audio file path)
const clickSound = new Audio("assets/button-click.mp3");

function typewriterEffect(element, text, speed, callback) {
  element.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function showProject(index) {
  const project = gameboyProjects[index];
  typewriterEffect(titleEl, project.title, 50, () => {
    typewriterEffect(descEl, project.desc, 30, () => {
      // Add links after typewriter effect
      descEl.querySelector(".project-links")?.remove();
      const linksEl = document.createElement("div");
      linksEl.className = "project-links";
      linksEl.innerHTML = `
        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Live Demo</a>` : ""}
        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">GitHub</a>` : ""}
      `;
      descEl.appendChild(linksEl);
    });
  });
}

// Gameboy controls
document.getElementById("up")?.addEventListener("click", () => {
  currentProject = (currentProject - 1 + gameboyProjects.length) % gameboyProjects.length;
  showProject(currentProject);
  clickSound.play().catch(() => {});
});

document.getElementById("down")?.addEventListener("click", () => {
  currentProject = (currentProject + 1) % gameboyProjects.length;
  showProject(currentProject);
  clickSound.play().catch(() => {});
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    currentProject = (currentProject - 1 + gameboyProjects.length) % gameboyProjects.length;
    showProject(currentProject);
    clickSound.play().catch(() => {});
  } else if (e.key === "ArrowDown") {
    currentProject = (currentProject + 1) % gameboyProjects.length;
    showProject(currentProject);
    clickSound.play().catch(() => {});
  }
});

// Dark mode toggle with local storage
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
});
// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
}

// Populate project grid
function populateProjectGrid() {
  const projectGrid = document.querySelector(".project-grid");
  if (projectGrid) {
    projectGrid.innerHTML = gameboyProjects.map(project => `
      <a href="projects/${project.id}.html" class="project">
        <img src="${project.thumbnail}" alt="${project.title} thumbnail" loading="lazy">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
      </a>
    `).join("");
  }
}

// Contact form submission
document.getElementById("contact-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
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

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  const showcase = document.querySelector(".gameboy-showcase");
  if (showcase) {
    setTimeout(() => {
      showcase.classList.remove("loading");
      showProject(currentProject);
    }, 1000);
  }
  populateProjectGrid();
});