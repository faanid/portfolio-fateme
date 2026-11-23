"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, ChevronDown } from "lucide-react";

const chapters = [
  { id: "start", number: "01", title: "A NEW ADVENTURE", subtitle: "Software Engineer · Frontend & Backend", kind: "start" },
  { id: "about", number: "02", title: "THE PLAYER", subtitle: "A little about the person behind the keyboard", kind: "about" },
  { id: "experience", number: "03", title: "QUEST LOG", subtitle: "The places where I learned, built and shipped", kind: "experience" },
  { id: "projects", number: "04", title: "TREASURE CHESTS", subtitle: "A few things I have built along the way", kind: "projects" },
  { id: "skills", number: "05", title: "POWER-UPS", subtitle: "Tools and skills in my inventory", kind: "skills" },
  { id: "education", number: "06", title: "CHECKPOINTS", subtitle: "Education, achievements and milestones", kind: "education" },
  { id: "contact", number: "07", title: "THE NEXT WORLD", subtitle: "Every good adventure starts with a hello", kind: "contact" },
];

const experience = [
  { company: "Zarsaham", role: "Software Engineer · Front-End", detail: "Building thoughtful interfaces and improving the experience of real products." },
  { company: "Esperez", role: "Backend Developer · C# / Unity", detail: "Working across backend logic and interactive 3D environments." },
  { company: "Nextera", role: "Software Engineer Intern", detail: "Developing CCTV monitoring dashboards for operators and live workflows." },
];

const projects = [
  { name: "Nectar", type: "REST API · Node.js · TypeScript", detail: "A backend application for tours, reviews and structured API workflows.", href: "https://github.com/faanid/nectar" },
  { name: "Cyberia", type: "Cybersecurity · Research", detail: "Hands-on security labs and experiments from university coursework.", href: "https://github.com/faanid/cyber-security-labs-sbu" },
  { name: "LeetCode Solutions", type: "Algorithms · JavaScript", detail: "A growing collection of problem-solving patterns and implementations.", href: "https://github.com/faanid/leetcode-solutions" },
];

const skillGroups = [
  { name: "FRONTEND", items: "JavaScript · TypeScript · React · Next.js · HTML · CSS · Tailwind" },
  { name: "BACKEND", items: "Node.js · Express · REST APIs · MongoDB · C#" },
  { name: "TOOLS", items: "Git · Docker · Linux · Bash · Postman · Swagger · CI/CD" },
  { name: "THINKING", items: "OOP · Design Patterns · DSA · Modular Architecture · AI-assisted development" },
];

function PixelCharacter() {
  return (
    <div className="pixel-hero" aria-hidden="true">
      <div className="pixel-shadow" />
      <div className="pixel-character">
        <i className="pc-hair" /><i className="pc-face" /><i className="pc-eye" />
        <i className="pc-shirt" /><i className="pc-arm" /><i className="pc-bag" />
        <i className="pc-leg pc-leg-one" /><i className="pc-leg pc-leg-two" />
      </div>
    </div>
  );
}

function PixelTree({ className = "" }: { className?: string }) {
  return <div className={`pixel-tree ${className}`} aria-hidden="true"><i /><b /><em /></div>;
}

function Cloud({ className = "" }: { className?: string }) {
  return <div className={`pixel-cloud ${className}`} aria-hidden="true"><i /><b /><em /></div>;
}

export function PixelAdventurePortfolio() {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const max = root.scrollHeight - window.innerHeight;
        const next = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        setProgress(next);
        setActiveChapter(Math.min(chapters.length - 1, Math.floor(next * chapters.length)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const worldShift = progress * 600;
  const jumpTo = (index: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (index / (chapters.length - 1)) * max, behavior: "smooth" });
  };

  return (
    <main className="pixel-portfolio">
      <div className="game-hud">
        <a className="game-logo" href="#top" aria-label="Back to start"><span className="logo-pixel">F</span><span>FATEME<span className="logo-dot">.</span></span></a>
        <div className="hud-level"><span>WORLD 01</span><span className="hud-divider">/</span><span>{chapters[activeChapter]?.number ?? "01"} — {chapters[activeChapter]?.title ?? "START"}</span></div>
        <span className="hud-prompt">SCROLL TO PLAY</span>
      </div>

      <div className="game-progress"><span style={{ width: `${progress * 100}%` }} /></div>

      <div className="world-scroll" id="top">
        <div className="world-sticky">
          <div className="sky-layer sky-back" style={{ transform: `translate3d(${-worldShift * 0.08}px,0,0)` }}>
            <Cloud className="cloud-one" /><Cloud className="cloud-two" /><Cloud className="cloud-three" />
            <div className="sun-pixel" />
            <div className="mountains"><i /><b /><em /></div>
          </div>
          <div className="world-track" style={{ transform: `translate3d(-${worldShift}vw,0,0)` }}>
            <div className="landscape landscape-one"><PixelTree className="tree-a" /><PixelTree className="tree-b" /><div className="floating-island"><i /><b /><em /></div><div className="stage-label">WELCOME, PLAYER!</div></div>
            <div className="landscape landscape-two"><PixelTree className="tree-c" /><div className="about-sign">ABOUT ME <span>↘</span></div><div className="small-house"><i /><b /><em /></div></div>
            <div className="landscape landscape-three"><div className="quest-board"><span className="board-title">QUEST LOG</span>{experience.map((item) => <div className="quest-line" key={item.company}><b>✦</b><span>{item.company}</span><small>✓</small></div>)}</div><PixelTree className="tree-d" /><div className="stone-arch" /></div>
            <div className="landscape landscape-four"><div className="chest chest-one"><i /><b /><em /></div><div className="chest chest-two"><i /><b /><em /></div><div className="chest chest-three"><i /><b /><em /></div><div className="cave-mouth" /></div>
            <div className="landscape landscape-five"><div className="power-orb orb-one">JS</div><div className="power-orb orb-two">TS</div><div className="power-orb orb-three">UI</div><div className="power-orb orb-four">API</div><PixelTree className="tree-e" /></div>
            <div className="landscape landscape-six"><div className="checkpoint-flag"><i /><b>CHECKPOINT</b></div><div className="castle"><i /><b /><em /><strong /></div><PixelTree className="tree-f" /></div>
            <div className="landscape landscape-seven"><div className="portal"><i /><b /><em /></div><div className="end-sign">THE END?<small>OR A NEW BEGINNING.</small></div></div>
            <div className="ground-line" />
            <div className="grass-line" />
          </div>

          <PixelCharacter />

          <div className="chapter-layer">
            <section className="chapter-card chapter-start" style={{ left: "5vw" }}>
              <span className="chapter-kicker">{chapters[0].number} / PLAYER ONE</span>
              <h1>Hi, I’m <span>Fateme</span><br />I build things<br />for the <em>web.</em></h1>
              <p>Software engineer with a curious mind, a love for solving problems and a soft spot for well-crafted interfaces.</p>
              <button className="pixel-button" onClick={() => jumpTo(1)}>START THE JOURNEY <span>→</span></button>
              <span className="scroll-hint"><ChevronDown size={14} /> SCROLL TO MOVE</span>
            </section>

            <section className="chapter-card chapter-about" style={{ left: "112vw" }}>
              <span className="chapter-kicker">{chapters[1].number} / CHARACTER PROFILE</span>
              <h2>The player<br />behind the <em>pixels.</em></h2>
              <p>I’m a software engineer who enjoys turning ideas into useful, considered digital experiences. I move between frontend details and backend logic, always looking for a cleaner way to build.</p>
              <div className="stat-row"><div><b>01</b><small>CURIOUS MIND</small></div><div><b>∞</b><small>THINGS TO LEARN</small></div></div>
            </section>

            <section className="chapter-card chapter-experience" style={{ left: "210vw" }}>
              <span className="chapter-kicker">{chapters[2].number} / COMPLETED QUESTS</span>
              <h2>Every level<br />taught me <em>something.</em></h2>
              <div className="experience-list">{experience.map((item) => <article key={item.company}><span className="quest-star">✦</span><div><h3>{item.company}</h3><b>{item.role}</b><p>{item.detail}</p></div></article>)}</div>
            </section>

            <section className="chapter-card chapter-projects" style={{ left: "310vw" }}>
              <span className="chapter-kicker">{chapters[3].number} / FOUND ITEMS</span>
              <h2>Open a chest.<br />Find a <em>project.</em></h2>
              <div className="project-list">{projects.map((project) => <a href={project.href} target="_blank" rel="noreferrer" key={project.name}><span className="chest-mini">✧</span><span><b>{project.name}</b><small>{project.type}</small><p>{project.detail}</p></span><ArrowUpRight size={17} /></a>)}</div>
            </section>

            <section className="chapter-card chapter-skills" style={{ left: "410vw" }}>
              <span className="chapter-kicker">{chapters[4].number} / INVENTORY</span>
              <h2>Collected<br /><em>power-ups.</em></h2>
              <div className="skill-list">{skillGroups.map((group, i) => <div key={group.name}><span className="skill-icon">{["✦", "⌘", "⚒", "◇"][i]}</span><span><b>{group.name}</b><small>{group.items}</small></span></div>)}</div>
            </section>

            <section className="chapter-card chapter-education" style={{ left: "510vw" }}>
              <span className="chapter-kicker">{chapters[5].number} / SAVE POINT</span>
              <h2>Milestones<br />along the <em>way.</em></h2>
              <div className="milestone"><b>2024 — 2026</b><span>MSc Computer Engineering · Software Engineering</span><small>Shahid Beheshti University</small></div>
              <div className="milestone"><b>2020 — 2024</b><span>BSc Electrical Engineering · Electronics</span><small>Tehran Markaz Azad University</small></div>
              <div className="achievement-row"><span>🏆 7TH · MILI GOLD ALGORITHM COMPETITION</span><span>🏅 40TH · GOLRANG FUTURE STARS</span></div>
            </section>

            <section className="chapter-card chapter-contact" style={{ left: "610vw" }}>
              <span className="chapter-kicker">{chapters[6].number} / NEXT LEVEL</span>
              <h2>Let’s build<br />the next <em>thing.</em></h2>
              <p>Have an idea, an interesting challenge or just want to say hello? My inbox is open.</p>
              <a className="pixel-button" href="mailto:fatemeekharazmi@gmail.com">SAY HELLO <span>↗</span></a>
              <div className="social-links"><a href="https://github.com/faanid" target="_blank" rel="noreferrer"><Github size={18} /> GITHUB</a><a href="https://www.linkedin.com/in/fateme-kharazmi" target="_blank" rel="noreferrer"><Linkedin size={18} /> LINKEDIN</a><a href="mailto:fatemeekharazmi@gmail.com"><Mail size={18} /> EMAIL</a></div>
            </section>
          </div>

          <div className="scene-vignette" />
          <div className="scene-caption"><span>WORLD 01</span><span>SCROLL TO EXPLORE</span><span>{String(Math.round(progress * 100)).padStart(2, "0")}%</span></div>
        </div>
      </div>

      <nav className="level-select" aria-label="Portfolio chapters">{chapters.map((chapter, i) => <button key={chapter.id} className={activeChapter === i ? "active" : ""} onClick={() => jumpTo(i)} aria-label={chapter.title} title={chapter.title}><span>{chapter.number}</span></button>)}</nav>
      <footer className="pixel-footer"><span>© {new Date().getFullYear()} FATEME KHARAZMI</span><span>MADE WITH CURIOSITY <b>✦</b></span></footer>
    </main>
  );
}
