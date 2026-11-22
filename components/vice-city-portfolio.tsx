"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const experience = [
  {
    number: "01",
    company: "ZARSAHAM",
    role: "Software Engineer · Front-End",
    dates: "MAY 2025 — NOV 2026",
    place: "TEHRAN / ON-SITE",
    tone: "rose",
    image: "/images/zarsaham.jpg",
    points: [
      "Refactored React components and introduced reusable UI components.",
      "Documented components with Storybook and Atomic Design principles.",
      "Improved code quality, application structure and maintainability.",
      "Used AI-assisted tools for debugging and refactoring workflows.",
    ],
    stack: ["React", "TypeScript", "Storybook", "Atomic Design"],
  },
  {
    number: "02",
    company: "ESPEREZ",
    role: "Backend Developer · C#",
    dates: "MAR 2024 — MAY 2025",
    place: "TEHRAN / ON-SITE",
    tone: "orange",
    image: null,
    points: [
      "Developed gameplay mechanics and interactive systems using C# and Unity.",
      "Implemented vehicle movement, acceleration, braking and speed control.",
      "Built collision detection and object interaction systems.",
      "Applied OOP principles and reusable game components.",
    ],
    stack: ["C#", "Unity", "OOP", "Gameplay Systems"],
  },
  {
    number: "03",
    company: "NEXTERA",
    role: "Software Engineer Intern",
    dates: "APR 2023 — MAR 2024",
    place: "TEHRAN / ON-SITE",
    tone: "cyan",
    image: "/images/nextera.jpg",
    points: [
      "Improved CCTV monitoring dashboards for usability and operational clarity.",
      "Introduced Feature-Based Architecture and reusable React UI primitives.",
      "Translated Figma designs into responsive interfaces.",
      "Worked with React, TypeScript and Tailwind CSS.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Figma"],
  },
];

const projects = [
  {
    id: "nectar",
    index: "01",
    category: "BACKEND ENGINEERING",
    title: "NECTAR",
    subtitle: "Tour Booking API",
    description:
      "A RESTful backend for a tour platform, with authentication, user management, tours, reviews, bookings and advanced MongoDB queries.",
    image: "/images/nectar.jpg",
    stack: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/faanid/nectar",
    live: null,
    accent: "project-sunset",
  },
  {
    id: "cyberia",
    index: "02",
    category: "FRONTEND ENGINEERING",
    title: "CYBERIA",
    subtitle: "Architecture Firm Portfolio",
    description:
      "A responsive architecture portfolio with project listings, detail pages, image galleries and a validated contact form.",
    image: "/images/cyberiaa.jpg",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    github: "https://github.com/faanid/cyberia-tech-challenge",
    live: "https://cyberia-tech-challenge.netlify.app/",
    accent: "project-cyan",
  },
  {
    id: "leetcode",
    index: "03",
    category: "PROBLEM SOLVING",
    title: "ALGORITHM LOG",
    subtitle: "LeetCode Solutions",
    description:
      "An evolving collection of data structure and algorithm solutions, with implementation notes and complexity analysis.",
    image: "/images/leetcode-solutions.jpg",
    stack: ["TypeScript", "JavaScript", "DSA", "Big O"],
    github: "https://github.com/faanid/leetcode-solutions",
    live: null,
    accent: "project-violet",
  },
];

const skillGroups = [
  {
    number: "01",
    name: "FRONTEND",
    note: "Interfaces with intention.",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    number: "02",
    name: "BACKEND",
    note: "Systems that hold together.",
    skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "C#", "Python"],
  },
  {
    number: "03",
    name: "ENGINEERING",
    note: "Thinking beyond the component.",
    skills: ["OOP", "Design Patterns", "Modular Architecture", "Data Structures", "Algorithms"],
  },
  {
    number: "04",
    name: "TOOLS & WORKFLOW",
    note: "A dependable toolkit.",
    skills: ["Git", "GitHub", "GitLab", "Docker", "CI/CD", "Linux", "Bash", "Postman", "Swagger"],
  },
  {
    number: "05",
    name: "AI & EMERGING TECH",
    note: "Building with the next wave.",
    skills: ["AI-Assisted Development", "AI Coding Agents", "Debugging & Refactoring", "Machine Learning"],
  },
];

const courses = [
  "Data Structures & Algorithms — Quera / LeetCode / Princeton",
  "Introduction to Computer Systems (15-213) — Carnegie Mellon",
  "CS50 Introduction to Computer Science — Harvard / edX",
  "Node.js, Express & MongoDB — Jonas Schmedtmann",
  "Full Stack Open — University of Helsinki",
  "Docker Fundamentals — Docker Docs",
  "Machine Learning — Quera Academy",
  "Cybersecurity Training — Shahid Beheshti University",
  "Go Programming for Beginners — freeCodeCamp",
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CityArtwork() {
  return (
    <div className="city-art" aria-hidden="true">
      <div className="city-sun" />
      <div className="city-haze" />
      <div className="city-water" />
      <div className="city-reflection" />
      <div className="city-skyline city-skyline-back">
        {Array.from({ length: 17 }).map((_, i) => (
          <span key={i} style={{ height: `${22 + ((i * 31) % 46)}%`, width: `${3 + (i % 3)}%` }} />
        ))}
      </div>
      <div className="city-skyline city-skyline-front">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ height: `${28 + ((i * 19) % 55)}%`, width: `${4 + (i % 2)}%` }} />
        ))}
      </div>
      <div className="palm palm-left"><i /><b /><em /></div>
      <div className="palm palm-right"><i /><b /><em /></div>
      <div className="city-road" />
      <div className="city-grain" />
    </div>
  );
}

export function ViceCityPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const projectSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: projectProgress } = useScroll({ target: projectSectionRef, offset: ["start start", "end end"] });
  const projectX = useTransform(projectProgress, [0, 1], ["0%", "-30%"]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.85, 1], [0.95, 0.35, 0.7, 0.2, 0.85]);

  const navItems = [
    ["ABOUT", "#about"],
    ["JOURNEY", "#journey"],
    ["PROJECTS", "#projects"],
    ["SKILLS", "#skills"],
    ["CONTACT", "#contact"],
  ];

  return (
    <main className="vice-city">
      <motion.div className="reading-progress" style={{ scaleX: progressScale }} />
      <motion.div className="ambient-orb" style={{ opacity: ambientOpacity }} aria-hidden="true" />
      <header className="vc-nav">
        <a href="#home" className="vc-brand" aria-label="Fateme Kharazmi home">
          <span className="brand-mark">FK<span>.</span></span>
          <span className="brand-caption">INDEPENDENT SOFTWARE ENGINEER</span>
        </a>
        <nav className="vc-nav-links" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
        <a className="nav-availability" href="mailto:fatemeekharazmi@gmail.com">
          <span /> AVAILABLE FOR OPPORTUNITIES
        </a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a href="mailto:fatemeekharazmi@gmail.com">LET'S TALK ↗</a>
          </nav>
        )}
      </header>

      <section className="hero-scene" id="home">
        <CityArtwork />
        <div className="hero-topline">
          <span>LEONIDA, FLORIDA — 26°07&apos;N 80°08&apos;W</span>
          <span>AN INDEPENDENT DIGITAL EXPERIENCE</span>
        </div>
        <div className="hero-copy">
          <motion.p
            className="hero-eyebrow"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            THE NEXT CHAPTER STARTS HERE
          </motion.p>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            FATEME
            <span>KHARAZMI<span className="hero-period">.</span></span>
          </motion.h1>
          <motion.div
            className="hero-bottomline"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div>
              <span className="hero-role">SOFTWARE ENGINEER</span>
              <p>Building experiences.<br />Engineering possibilities.</p>
            </div>
            <div className="hero-actions">
              <a className="button-primary" href="#about">EXPLORE MY WORLD <ArrowDownRight size={17} /></a>
              <a className="button-quiet" href="mailto:fatemeekharazmi@gmail.com?subject=Resume%20request">REQUEST MY RESUME <ArrowUpRight size={15} /></a>
            </div>
          </motion.div>
        </div>
        <div className="hero-side-note"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></div>
        <div className="hero-index"><span>01</span><i /> 07</div>
        <div className="hero-wordmark">VICE / CODE / CITY</div>
      </section>

      <section className="intro-scene section-pad" id="about">
        <div className="section-kicker"><span>01 / THE PERSON BEHIND THE PIXELS</span><span>ABOUT ME</span></div>
        <div className="intro-grid">
          <Reveal className="intro-heading">
            <p className="micro-label">NOT JUST LINES OF CODE.</p>
            <h2>Curiosity<br />meets <em>craft.</em></h2>
            <div className="intro-stamp"><Sparkles size={15} /> BUILT DIFFERENT, BY DESIGN</div>
          </Reveal>
          <Reveal className="intro-copy" delay={0.12}>
            <p className="intro-lead">I&apos;m Fateme — a software engineer drawn to the space where thoughtful engineering meets experiences people love to use.</p>
            <p>My work spans frontend development with JavaScript, TypeScript, React and Next.js, alongside backend engineering with Node.js, Express, REST APIs and MongoDB. I also bring hands-on experience with C# and Unity.</p>
            <p>I care about problem-solving, software architecture, modular applications and building reliable, scalable solutions. Good software should feel effortless on the surface — because someone cared about every detail underneath.</p>
            <a href="#journey" className="text-link">A LOOK AT MY JOURNEY <ArrowDownRight size={16} /></a>
          </Reveal>
        </div>
        <div className="intro-marquee" aria-hidden="true">
          <div className="marquee-track"><span>DESIGN WITH INTENT</span><b>✳</b><span>ENGINEER WITH CARE</span><b>✳</b><span>STAY CURIOUS</span><b>✳</b><span>DESIGN WITH INTENT</span><b>✳</b></div>
        </div>
      </section>

      <section className="journey-scene section-pad" id="journey">
        <div className="section-kicker"><span>02 / THE PROFESSIONAL JOURNEY</span><span>THREE CHAPTERS</span></div>
        <div className="section-heading-row">
          <Reveal><p className="micro-label">EVERY ROLE LEFT A MARK.</p><h2>Made along<br /><em>the way.</em></h2></Reveal>
          <Reveal delay={0.15}><p className="section-aside">Different teams. Different challenges.<br />One constant: making the work better.</p></Reveal>
        </div>
        <div className="experience-list">
          {experience.map((job, index) => (
            <Reveal key={job.company} className={`experience-row ${job.tone}`} delay={index * 0.08}>
              <div className="experience-number">{job.number}<span> / 03</span></div>
              <div className="experience-main">
                <div className="experience-meta"><span>{job.dates}</span><span>{job.place}</span></div>
                <h3>{job.company}</h3>
                <p className="experience-role">{job.role}</p>
                <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                <div className="tag-row">{job.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <div className="experience-visual">
                {job.image ? (
                  <Image src={job.image} alt={`${job.company} work environment`} fill sizes="(max-width: 768px) 100vw, 32vw" />
                ) : (
                  <div className="unity-visual"><span>UNITY</span><b>PLAY</b><i>INTERACTIVE SYSTEMS</i></div>
                )}
                <span className="visual-index">CHAPTER {job.number}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="projects-scene section-pad" id="projects" ref={projectSectionRef}>
        <div className="project-story-pin">
        <div className="section-kicker"><span>03 / SELECTED WORK</span><span>OPEN THE CASE FILES</span></div>
        <div className="section-heading-row projects-heading">
          <Reveal><p className="micro-label">A FEW THINGS I&apos;VE BUILT.</p><h2>Selected<br /><em>missions.</em></h2></Reveal>
          <Reveal delay={0.15}><p className="section-aside">A small selection of real work and ongoing<br />engineering practice. More chapters ahead.</p></Reveal>
        </div>
        <motion.div className="project-rail" style={{ x: projectX }}>
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.id}>
              <a className="project-image" href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}>
                <Image src={project.image} alt={project.subtitle} fill sizes="(max-width: 768px) 88vw, 50vw" />
                <span className="project-image-index">CASE FILE / {project.index}</span>
                <span className="project-image-arrow"><ArrowUpRight size={22} /></span>
              </a>
              <div className="project-info">
                <div className="project-category">{project.category}</div>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <div className="tag-row">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer"><Github size={15} /> SOURCE CODE <ArrowUpRight size={13} /></a>
                  {project.live && <a href={project.live} target="_blank" rel="noreferrer">LIVE EXPERIENCE <ArrowUpRight size={13} /></a>}
                </div>
              </div>
            </article>
          ))}
        </motion.div>
        <div className="rail-hint"><span>01 — 03</span><span>SCROLL TO EXPLORE <ArrowRight size={14} /></span></div>
        </div>
      </section>

      <section className="skills-scene section-pad" id="skills">
        <div className="section-kicker"><span>04 / THE TOOLKIT</span><span>BUILT FOR THE JOB</span></div>
        <div className="section-heading-row">
          <Reveal><p className="micro-label">TOOLS ARE ONLY THE BEGINNING.</p><h2>What I bring<br /><em>to the table.</em></h2></Reveal>
          <Reveal delay={0.15}><p className="section-aside">A practical toolkit, shaped by shipping<br />interfaces, APIs and interactive systems.</p></Reveal>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal className="skill-group" key={group.number} delay={index * 0.06}>
              <div className="skill-group-top"><span>{group.number}</span><span>0{index + 1} — 05</span></div>
              <h3>{group.name}</h3>
              <p>{group.note}</p>
              <div className="skill-cloud">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="education-scene section-pad" id="education">
        <div className="section-kicker"><span>05 / THE FOUNDATION</span><span>EDUCATION & CURIOSITY</span></div>
        <div className="education-grid">
          <div className="education-main">
            <Reveal><p className="micro-label">THE CLASSROOM WAS JUST THE START.</p><h2>Always<br /><em>learning.</em></h2></Reveal>
            <div className="education-timeline">
              <Reveal className="education-item">
                <span className="education-date">2024 — 2026</span>
                <div><h3>M.Sc. Computer Engineering</h3><p>Software Engineering</p><span>Shahid Beheshti University</span></div>
              </Reveal>
              <Reveal className="education-item" delay={0.1}>
                <span className="education-date">2020 — 2024</span>
                <div><h3>B.Sc. Electrical Engineering</h3><p>Electronics</p><span>Tehran Markaz Azad University</span></div>
              </Reveal>
            </div>
            <div className="achievement-strip">
              <div><span>2025</span><strong>7<sup>TH</sup></strong><p>Mili Gold Algorithm Competition</p></div>
              <div><span>2024</span><strong>40<sup>TH</sup></strong><p>Golrang Future Stars Competition</p></div>
            </div>
          </div>
          <Reveal className="courses-panel" delay={0.12}>
            <div className="courses-heading"><span>THE NEVER-ENDING SIDE QUEST</span><span>09 COURSES</span></div>
            <h3>Currently collecting<br />new perspectives.</h3>
            <ul>{courses.map((course, index) => <li key={course}><span>0{index + 1}</span>{course}<ArrowUpRight size={13} /></li>)}</ul>
          </Reveal>
        </div>
      </section>

      <section className="contact-scene section-pad" id="contact">
        <div className="contact-skyline" aria-hidden="true"><CityArtwork /></div>
        <div className="section-kicker"><span>06 / THE NEXT CHAPTER</span><span>YOUR MOVE</span></div>
        <Reveal className="contact-content">
          <p className="micro-label">GOT SOMETHING INTERESTING IN MIND?</p>
          <h2>Every great project<br />starts with a <em>conversation.</em></h2>
          <p className="contact-subtitle">Have an interesting idea? Let&apos;s build something meaningful.</p>
          <a className="contact-email" href="mailto:fatemeekharazmi@gmail.com">fatemeekharazmi@gmail.com <ArrowUpRight size={21} /></a>
          <div className="contact-links">
            <a href="https://github.com/faanid" target="_blank" rel="noreferrer"><Github size={17} /> GITHUB <ArrowUpRight size={13} /></a>
            <a href="https://www.linkedin.com/in/fateme-kharazmi/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LINKEDIN <ArrowUpRight size={13} /></a>
            <a href="mailto:fatemeekharazmi@gmail.com"><Mail size={17} /> EMAIL <ArrowUpRight size={13} /></a>
          </div>
        </Reveal>
        <footer className="vc-footer">
          <a href="#home" className="footer-brand">FK<span>.</span></a>
          <span>MADE WITH INTENTION · © {new Date().getFullYear()} FATEME KHARAZMI</span>
          <a href="#home">BACK TO TOP <MoveUpRight size={13} /></a>
        </footer>
      </section>
    </main>
  );
}
