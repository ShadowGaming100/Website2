function addGlobalListener(type, selector, callback) {
  document.addEventListener(type, (e) => {
    const target = e.target.closest(selector);
    if (target) {
      callback(e, target);
    }
  });
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m];
  });
}

function getTheme() {
  return (
    localStorage.getItem("fh_theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.add("theme-transition");

  localStorage.setItem("fh_theme", theme);
  const date = new Date();
  date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie =
    "fh_theme=" +
    theme +
    ";expires=" +
    date.toUTCString() +
    ";path=/;SameSite=Lax";

  const icons = document.querySelectorAll("[data-theme-toggle] i");
  icons.forEach((icon) => {
    icon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  });

  const toggles = document.querySelectorAll("[data-theme-toggle]");
  toggles.forEach((btn) => {
    btn.setAttribute("aria-pressed", theme === "dark");
    btn.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme"
    );
  });

  if (typeof updateSnowTheme === "function") updateSnowTheme();

  setTimeout(() => {
    document.documentElement.classList.remove("theme-transition");
  }, 220);
}

addGlobalListener("click", "[data-theme-toggle]", (e) => {
  e.preventDefault();
  const current =
    document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
});

function toggleSidebar(open) {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (open) {
    sidebar?.classList.add("open");
    overlay?.classList.add("active");
    if (overlay) {
      overlay.style.visibility = "visible";
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";
    }
    document.body.style.overflow = "hidden";
    sidebar?.setAttribute("aria-hidden", "false");
  } else {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("active");
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      setTimeout(() => {
        overlay.style.visibility = "hidden";
      }, 300);
    }
    document.body.style.overflow = "";
    sidebar?.setAttribute("aria-hidden", "true");
  }
}

addGlobalListener("click", "#sidebarToggle", () => toggleSidebar(true));
addGlobalListener("click", "#sidebarClose", () => toggleSidebar(false));
addGlobalListener("click", "#overlay", () => toggleSidebar(false));
addGlobalListener("click", ".sidebar-link, .sidebar-dropdown-menu a", () =>
  toggleSidebar(false)
);

addGlobalListener("click", ".sidebar-dropdown-toggle", (e, btn) => {
  e.preventDefault();
  const dropdown = btn.closest(".sidebar-dropdown");
  const isOpen = dropdown.classList.contains("open");

  document.querySelectorAll(".sidebar-dropdown").forEach((d) => {
    if (d !== dropdown) d.classList.remove("open");
  });

  if (!isOpen) dropdown.classList.add("open");
  else dropdown.classList.remove("open");
});

var _mtm = (window._mtm = window._mtm || []);
_mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });
(function () {
  var d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.async = true;
  g.src = "https://matomo.codelabworks.is-a.dev/js/container_au1DPBl0.js";
  s.parentNode.insertBefore(g, s);
})();

function initPageLogic() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document
    .querySelectorAll(".feature-card, .staff-card")
    .forEach((el) => observer.observe(el));

  const staffGrid = document.getElementById("staffGrid");
  if (staffGrid && !staffGrid.hasAttribute("data-loaded")) {
    staffGrid.setAttribute("data-loaded", "true");
    fetch("/Src/data/staff.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject("No staff")))
      .then((data) => {
        const entries = Object.keys(data).map((name) => ({
          name,
          role: data[name],
        }));

        staffGrid.innerHTML = "";
        entries.forEach((member, index) => {
          const div = document.createElement("div");
          div.className = "staff-card";
          div.style.animationDelay = index * 0.1 + "s";
          let icon = "fa-user",
            role = member.role.toLowerCase();
          if (role.includes("owner")) icon = "fa-crown";
          else if (role.includes("dev")) icon = "fa-code";

          div.innerHTML = `
            <div class="staff-icon"><i class="fa-solid ${icon}"></i></div>
            <div class="staff-body">
                <h3>${escapeHtml(member.name)}</h3>
                <div class="role">${escapeHtml(member.role)}</div>
            </div>`;
          staffGrid.appendChild(div);
          observer.observe(div);
        });
      })
      .catch((e) => console.error(e));
  }

  const typedEl = document.getElementById("typedText");
  if (typedEl && !typedEl.dataset.typing) {
    typedEl.dataset.typing = "true";
    const words = [
      "for demos",
      "for students",
      "for hobby projects",
      "for experiments",
    ];
    let i = 0,
      charIndex = 0,
      isDeleting = false;

    function type() {
      if (!document.getElementById("typedText")) return;
      const currentWord = words[i % words.length];
      if (isDeleting) {
        typedEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1100);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        i++;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? 40 : 90);
      }
    }
    type();
  }

  const yearSpans = document.querySelectorAll(
    "#year, #year2, #year3, #copyright span"
  );
  const currentYear = new Date().getFullYear();
  yearSpans.forEach((span) => (span.textContent = currentYear));
}

window.initPageLogic = initPageLogic;

function createSnowEffect() {
  window.createSnowEffect = createSnowEffect;
  
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (new Date().getMonth() !== 11) return;
  if (document.getElementById("snow-container")) return;

  const container = document.createElement("div");
  container.id = "snow-container";
  container.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 10000; overflow: hidden;`;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes fall { 0% { opacity: 0; transform: translateY(-10px); } 10% { opacity: 1; } 100% { opacity: 0; transform: translateY(100vh) rotate(360deg); } }
    .snowflake { position: absolute; top: -10px; background: currentColor; border-radius: 50%; animation: fall linear infinite; }
    [data-theme="light"] .snowflake { color: rgba(160, 200, 255, 0.8); }
    [data-theme="dark"] .snowflake { color: rgba(255, 255, 255, 0.9); }
  `;
  document.head.appendChild(style);
  document.body.appendChild(container);

  function spawn() {
    const flake = document.createElement("div");
    flake.className = "snowflake";
    const size = Math.random() * 4 + 2;
    flake.style.width = size + "px";
    flake.style.height = size + "px";
    flake.style.left = Math.random() * 100 + "vw";
    flake.style.animationDuration = Math.random() * 10 + 5 + "s";
    flake.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(flake);
  }
  for (let i = 0; i < 50; i++) spawn();
}

function updateSnowTheme() {
  const c = document.getElementById("snow-container");
  if (c) {
    c.style.display = "none";
    void c.offsetWidth;
    c.style.display = "block";
  }
}

window.updateSnowTheme = updateSnowTheme;

addGlobalListener("click", ".preview-link", (e, link) => {
  e.preventDefault();
  const card = document.getElementById("previewCard");
  if (!card) return;

  const data = {
    title: link.getAttribute("data-title") || link.textContent,
    desc: link.getAttribute("data-desc") || "",
    image: link.getAttribute("data-image") || "",
    href: link.href,
  };

  card.innerHTML = `
        ${
          data.image
            ? `<div class="img" style="background-image:url(${escapeHtml(
                data.image
              )})"></div>`
            : ""
        }
        <div class="meta">
            <div class="title">${escapeHtml(data.title)}</div>
            <div class="desc">${escapeHtml(data.desc)}</div>
            <div style="margin-top:10px">
                <a class="btn primary" href="${escapeHtml(
                  data.href
                )}" target="_blank">Open</a> 
                <button id="closePreview" class="btn ghost">Close</button>
            </div>
        </div>`;
  card.style.display = "block";
});

addGlobalListener("click", "#closePreview", () => {
  const card = document.getElementById("previewCard");
  if (card) card.style.display = "none";
});

(function () {
  const t = getTheme();
  document.documentElement.setAttribute("data-theme", t);
  window.addEventListener("DOMContentLoaded", () => setTheme(t));
})();

document.addEventListener("DOMContentLoaded", () => {
  window.initPageLogic();
  createSnowEffect();
});
