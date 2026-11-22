"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight, Volume2, VolumeX } from "lucide-react";

const vertexShader = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uProgress;
uniform float uAspect;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}
float sceneMap(vec3 p, out float material) {
  float d = p.y;
  material = 0.0;
  for (int x = -2; x <= 2; x++) {
    for (int z = 0; z < 7; z++) {
      vec2 cell = vec2(float(x), float(z));
      float r = hash(cell + 12.7);
      float h = 9.0 + r * 21.0;
      vec3 center = vec3(float(x) * 8.4, h * 0.5, -8.0 - float(z) * 10.5);
      float b = sdBox(p - center, vec3(2.8, h * 0.5, 3.1));
      if (b < d) { d = b; material = 1.0 + r; }
    }
  }
  // A broad boulevard and a low coastal promenade.
  float road = sdBox(p - vec3(0.0, -0.12, -21.0), vec3(8.0, 0.12, 90.0));
  if (road < d) { d = road; material = 3.0; }
  // Palm trunks, deliberately placed along the waterfront.
  for (int side = -1; side <= 1; side += 2) {
    for (int i = 0; i < 4; i++) {
      float z = -7.0 - float(i) * 19.0;
      vec3 a = vec3(float(side) * 13.0, 0.0, z);
      vec3 b = a + vec3(float(side) * 1.3, 8.5, 0.0);
      vec3 pa = p - a;
      vec3 ba = b - a;
      float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      float trunk = length(pa - ba * hh) - 0.19;
      if (trunk < d) { d = trunk; material = 4.0; }
      vec3 crown = b;
      float crownD = length(p - crown) - 0.55;
      if (crownD < d) { d = crownD; material = 4.0; }
      for (int leaf = 0; leaf < 5; leaf++) {
        float angle = float(leaf) * 1.256 + float(i) * 0.4;
        vec3 tip = crown + vec3(cos(angle) * 3.4, -1.2 - float(leaf % 2) * 0.35, sin(angle) * 3.4);
        vec3 v = tip - crown;
        vec3 w = p - crown;
        float t = clamp(dot(w, v) / dot(v, v), 0.0, 1.0);
        float leafD = length(w - v * t) - (0.12 + t * 0.12);
        if (leafD < d) { d = leafD; material = 4.0; }
      }
    }
  }
  return d;
}
vec3 getNormal(vec3 p) {
  float m;
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    sceneMap(p + e.xyy, m) - sceneMap(p - e.xyy, m),
    sceneMap(p + e.yxy, m) - sceneMap(p - e.yxy, m),
    sceneMap(p + e.yyx, m) - sceneMap(p - e.yyx, m)
  ));
}
void main() {
  vec2 uv = (vUv - 0.5) * vec2(uAspect, 1.0);
  float p = clamp(uProgress, 0.0, 1.0);
  float day = smoothstep(0.58, 0.92, p);
  vec3 skyTop = mix(vec3(0.035,0.045,0.105), vec3(0.012,0.022,0.052), day);
  vec3 skyHorizon = mix(vec3(0.92,0.34,0.28), vec3(0.12,0.15,0.30), day);
  vec3 sky = mix(skyHorizon, skyTop, smoothstep(-0.12, 0.72, uv.y));
  vec2 sunPos = vec2(-0.28, 0.22 + day * 0.08);
  float sun = 1.0 - smoothstep(0.075, 0.09, length(uv - sunPos));
  sky += sun * mix(vec3(1.0,0.55,0.32), vec3(0.45,0.64,0.95), day) * 1.6;
  vec3 ro = vec3(sin(p * 5.8) * 3.0, 5.0 + sin(p * 3.0) * 1.5, 24.0 - p * 63.0);
  vec3 target = vec3(0.0, 5.0, -24.0 - p * 66.0);
  vec3 ww = normalize(target - ro);
  vec3 uu = normalize(cross(ww, vec3(0.0,1.0,0.0)));
  vec3 vv = cross(uu, ww);
  vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.48 * ww);
  float t = 0.0;
  float material = 0.0;
  bool hit = false;
  vec3 pos = ro;
  for (int i = 0; i < 62; i++) {
    pos = ro + rd * t;
    float d = sceneMap(pos, material);
    if (d < 0.018) { hit = true; break; }
    if (t > 150.0) break;
    t += max(d * 0.78, 0.035);
  }
  vec3 color = sky;
  if (hit) {
    vec3 n = getNormal(pos);
    vec3 lightDir = normalize(vec3(-0.5, 0.85, -0.35));
    float diffuse = max(dot(n, lightDir), 0.0);
    float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    vec3 base = vec3(0.075,0.09,0.17);
    if (material > 1.0 && material < 2.8) {
      float windowGrid = step(0.72, fract(pos.y * 0.42)) * step(0.28, fract(pos.x * 0.48 + floor(pos.z * 0.2)));
      float lit = step(0.76, hash(floor(pos.xy * 2.2) + floor(pos.z)));
      vec3 windowColor = mix(vec3(1.0,0.48,0.25), vec3(0.34,0.78,0.92), step(0.52, hash(floor(pos.xz))));
      base = vec3(0.055,0.075,0.14) + windowGrid * lit * windowColor * (0.6 + day * 0.25);
      base += vec3(0.04,0.08,0.12) * (0.5 + 0.5 * sin(pos.y * 0.2));
    } else if (material > 2.8 && material < 3.8) {
      float lane = smoothstep(0.08, 0.0, abs(fract(pos.z * 0.09) - 0.5));
      base = vec3(0.045,0.05,0.085) + lane * vec3(0.8,0.5,0.25);
    } else if (material > 3.8) {
      base = vec3(0.025,0.10,0.075);
    }
    float glow = pow(max(dot(reflect(-lightDir,n), -rd),0.0), 18.0);
    color = base * (0.32 + diffuse * 0.8) + glow * vec3(1.0,0.46,0.27) * 0.65 + fresnel * vec3(0.15,0.26,0.45);
    float fog = 1.0 - exp(-t * 0.012);
    color = mix(color, skyHorizon, fog * 0.68);
  }
  // Ocean plane with long, soft sunset reflections.
  if (rd.y < -0.015) {
    float waterT = -ro.y / rd.y;
    vec3 waterPos = ro + rd * waterT;
    if (waterT > 0.0 && abs(waterPos.x) > 8.0) {
      float wave = sin(waterPos.z * 1.8 + uTime * 0.35) * 0.018 + sin(waterPos.z * 0.45) * 0.025;
      float reflection = exp(-abs(uv.x + 0.28) * 8.0) * exp(-abs(uv.y + 0.22) * 5.0);
      float lines = 0.5 + 0.5 * sin(waterPos.z * 3.8 + sin(waterPos.x * 1.2) + uTime * 0.7);
      vec3 water = vec3(0.018,0.055,0.105) + reflection * vec3(0.95,0.28,0.24) * (0.18 + lines * 0.24);
      water += wave + lines * 0.012;
      color = mix(color, water, 0.9);
    }
  }
  float vignette = smoothstep(1.3, 0.18, length(uv));
  color *= 0.68 + vignette * 0.32;
  color += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.012;
  gl_FragColor = vec4(pow(max(color,0.0), vec3(0.88)), 1.0);
}
`;

function CinematicWorld() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglReady, setWebglReady] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, vertexShader);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const timeLocation = gl.getUniformLocation(program, "uTime");
    const progressLocation = gl.getUniformLocation(program, "uProgress");
    const aspectLocation = gl.getUniformLocation(program, "uAspect");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let progress = 0;
    let lastTime = 0;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(aspectLocation, canvas.width / canvas.height);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress = max > 0 ? window.scrollY / max : 0;
    };
    const draw = (now: number) => {
      if (!reduced || now - lastTime > 1000) {
        gl.uniform1f(timeLocation, now * 0.001);
        gl.uniform1f(progressLocation, progress);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        lastTime = now;
      }
      frame = window.requestAnimationFrame(draw);
    };
    resize();
    onScroll();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = window.requestAnimationFrame(draw);
    setWebglReady(true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);
  return (
    <div className={`world-renderer ${webglReady ? "world-renderer-ready" : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="world-atmosphere" />
      <div className="world-grain" />
    </div>
  );
}

const experience = [
  { company: "ZARSAHAM", role: "Software Engineer — Front-end", period: "2025 — PRESENT", location: "PRODUCT ENGINEERING", image: "/images/zarsaham.jpg", detail: "Turning complex product workflows into clear, dependable interfaces.", points: ["Refactored React interfaces and improved application maintainability.", "Built reusable component systems with Storybook and Atomic Design.", "Used AI-assisted workflows for implementation, debugging and refactoring."] },
  { company: "ESPEREZ", role: "Backend Developer — C# / Unity", period: "PROJECT EXPERIENCE", location: "INTERACTIVE SYSTEMS", image: "/images/nectar.jpg", detail: "Exploring interactive systems through real-time logic and game mechanics.", points: ["Implemented vehicle movement, acceleration and braking systems.", "Worked with collision detection, object-oriented design and gameplay logic.", "Connected interactive behavior to a structured Unity scene."] },
  { company: "NEXTERA", role: "Software Engineer Intern", period: "INTERNSHIP", location: "MONITORING & DASHBOARDS", image: "/images/nextera.jpg", detail: "Designing information-dense monitoring experiences for real operators.", points: ["Developed CCTV monitoring dashboards with React and TypeScript.", "Applied Feature-Based Architecture and reusable component patterns.", "Built responsive interfaces with Tailwind CSS."] },
];

const projects = [
  { name: "NECTAR", type: "FULL-STACK APPLICATION", description: "A Node.js application exploring structured APIs, authentication, data modeling and maintainable backend architecture.", image: "/images/nectar.jpg", stack: ["Node.js", "Express", "MongoDB", "REST API"], github: "https://github.com/faanid/job-application-api", live: "" },
  { name: "CYBERIA", type: "FRONTEND ENGINEERING", description: "A responsive product experience built around reusable UI, thoughtful layout and clean frontend implementation.", image: "/images/cyberiaa.jpg", stack: ["React", "TypeScript", "Tailwind CSS"], github: "https://github.com/faanid/cyberia-tech-challenge", live: "https://cyberia-tech-challenge.netlify.app/" },
  { name: "ALGORITHM LOG", type: "PROBLEM SOLVING", description: "An evolving collection of data-structure and algorithm solutions, with implementation notes and complexity analysis.", image: "/images/leetcode-solutions.jpg", stack: ["JavaScript", "TypeScript", "DSA", "Big O"], github: "https://github.com/faanid/leetcode-solutions", live: "" },
];

const skillGroups = [
  { label: "FRONTEND", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind CSS"] },
  { label: "BACKEND", items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "C#", "Python"] },
  { label: "ENGINEERING", items: ["OOP", "Design Patterns", "Modular Architecture", "Data Structures", "Algorithms"] },
  { label: "TOOLS", items: ["Docker", "CI/CD", "Linux", "Bash", "Git", "GitHub", "GitLab", "Postman", "Swagger"] },
  { label: "AI & EMERGING", items: ["AI-Assisted Development", "AI Coding Agents", "Debugging & Refactoring", "Machine Learning"] },
];

const courses = ["Data Structures & Algorithms — Quera / LeetCode / Princeton", "Introduction to Computer Systems — Carnegie Mellon", "CS50 Introduction to Computer Science — Harvard / edX", "Node.js, Express & MongoDB — Jonas Schmedtmann", "Full Stack Open — University of Helsinki", "Docker Fundamentals — Docker Docs", "Machine Learning — Quera Academy", "Cybersecurity Training — Shahid Beheshti University", "Go Programming for Beginners — freeCodeCamp"];

function ChapterLabel({ number, name, side = "CHAPTER" }: { number: string; name: string; side?: string }) {
  return <div className="chapter-label"><span>{number} / {side}</span><span>{name}</span></div>;
}

export function ViceCityWorld() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = useRef<HTMLElement[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.index || 0));
    }, { threshold: [0.15,0.35,0.55,0.75] });
    sections.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const nav = [["ABOUT","#about"],["EXPERIENCE","#experience"],["PROJECTS","#projects"],["SKILLS","#skills"],["EDUCATION","#education"],["CONTACT","#contact"]];
  return (
    <main className="vice-world">
      <CinematicWorld />
      <div className="world-vignette" aria-hidden="true" />
      <div className="world-progress"><span style={{ transform: `scaleX(${(active + 1) / 8})` }} /></div>
      <header className="world-nav">
        <a className="world-logo" href="#home" aria-label="Fateme Kharazmi home">FK<span>.</span></a>
        <nav aria-label="Main navigation">{nav.map(([label,href]) => <a href={href} key={href}>{label}</a>)}</nav>
        <a className="world-availability" href="mailto:fatemeekharazmi@gmail.com"><i /> AVAILABLE FOR OPPORTUNITIES</a>
        <button className="world-menu" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}> {menuOpen ? "CLOSE" : "MENU"} </button>
        {menuOpen && <div className="world-mobile-nav">{nav.map(([label,href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>}
      </header>

      <section id="home" data-index="0" ref={(el) => { if (el) sections.current[0] = el; }} className="world-hero">
        <div className="hero-coordinate">VICE CITY · LEONIDA<br/>26°07&apos;N / 80°08&apos;W</div>
        <div className="hero-main">
          <p className="eyebrow">AN INDEPENDENT DIGITAL EXPERIENCE</p>
          <h1><span>FATEME</span><span>KHARAZMI<span className="hero-star">®</span></span></h1>
          <div className="hero-subline"><span>SOFTWARE ENGINEER</span><i /><span>FRONTEND · BACKEND · INTERACTIVE SYSTEMS</span></div>
          <a href="#about" className="enter-link">ENTER THE CITY <ArrowDownRight size={18}/></a>
        </div>
        <div className="hero-billboard" aria-hidden="true"><span>NOW ENTERING</span><strong>VICE CITY</strong><small>BUILT BY FATEME KHARAZMI</small></div>
        <div className="hero-footer"><span>SCROLL TO EXPLORE</span><span>01 — 08</span></div>
      </section>

      <section id="about" data-index="1" ref={(el) => { if (el) sections.current[1] = el; }} className="world-section about-section">
        <ChapterLabel number="02" name="THE PERSON BEHIND THE CODE" />
        <div className="about-layout">
          <div className="about-portrait"><Image src="/images/profile/fateme-kh1.jpg" alt="Fateme Kharazmi" fill sizes="(max-width: 760px) 70vw, 28vw" priority={false}/><span>ENGINEER / CREATOR</span></div>
          <div className="about-copy"><p className="eyebrow">A LITTLE CONTEXT</p><h2>Curiosity<br/>with <em>direction.</em></h2><p className="about-lead">Software Engineer with hands-on experience in frontend and backend development, interactive systems, and software architecture.</p><p>Working across JavaScript, TypeScript, React, Next.js, Node.js, Express.js, MongoDB, C# and Unity. Passionate about problem-solving, modular architecture, and building reliable software solutions.</p><a href="#experience" className="text-cta">FOLLOW THE JOURNEY <ArrowDownRight size={16}/></a></div>
        </div>
        <div className="scene-note">SCENE 02 <span>—</span> THE HIGH-RISE / GOLDEN HOUR</div>
      </section>

      <section id="experience" data-index="2" ref={(el) => { if (el) sections.current[2] = el; }} className="world-section experience-section">
        <ChapterLabel number="03" name="PROFESSIONAL JOURNEY" />
        <div className="section-intro"><p className="eyebrow">THREE ROLES. THREE WORLDS.</p><h2>Built in<br/><em>the field.</em></h2></div>
        <div className="experience-worlds">{experience.map((job,index) => <article className={`experience-world experience-world-${index+1}`} key={job.company}><div className="experience-image"><Image src={job.image} alt={job.company + " environment"} fill sizes="(max-width: 760px) 90vw, 52vw"/><span className="image-stamp">ENVIRONMENT / 0{index+1}</span></div><div className="experience-copy"><span className="eyebrow">{job.period} · {job.location}</span><h3>{job.company}</h3><h4>{job.role}</h4><p>{job.detail}</p><ul>{job.points.map(point => <li key={point}>{point}</li>)}</ul></div></article>)}</div>
      </section>

      <section id="projects" data-index="3" ref={(el) => { if (el) sections.current[3] = el; }} className="world-section projects-section">
        <ChapterLabel number="04" name="SELECTED PROJECTS / OPEN MISSIONS" />
        <div className="section-intro projects-intro"><p className="eyebrow">REAL WORK. REAL REPOSITORIES.</p><h2>Open<br/><em>missions.</em></h2><p>Selected builds and engineering practice. Each project is a new environment to explore.</p></div>
        <div className="project-stage">{projects.map((project,index) => <article className={`project-world project-world-${index+1}`} key={project.name}><div className="project-art"><Image src={project.image} alt={project.name + " project preview"} fill sizes="(max-width: 760px) 90vw, 58vw"/><span className="project-no">0{index+1} / 03</span><span className="project-type">{project.type}</span></div><div className="project-details"><h3>{project.name}</h3><p>{project.description}</p><div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div><div className="project-actions"><a href={project.github} target="_blank" rel="noreferrer"><Github size={16}/> SOURCE CODE <ArrowUpRight size={14}/></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">LIVE EXPERIENCE <ArrowUpRight size={14}/></a>}</div></div></article>)}</div>
      </section>

      <section id="skills" data-index="4" ref={(el) => { if (el) sections.current[4] = el; }} className="world-section skills-section">
        <ChapterLabel number="05" name="THE DIGITAL ECOSYSTEM" />
        <div className="skills-heading"><p className="eyebrow">A CONNECTED TOOLKIT</p><h2>Systems<br/>in <em>motion.</em></h2><p>Five connected disciplines. One engineering mindset.</p></div>
        <div className="skill-orbit" aria-hidden="true"><div className="orbit-ring orbit-one"/><div className="orbit-ring orbit-two"/><div className="orbit-core">FK<span>.</span></div><b className="orbit-node node-one">JS</b><b className="orbit-node node-two">TS</b><b className="orbit-node node-three">UI</b><b className="orbit-node node-four">API</b><b className="orbit-node node-five">AI</b></div>
        <div className="skill-atlas">{skillGroups.map((group,index) => <div className="skill-region" key={group.label}><span>0{index+1} / ECOSYSTEM</span><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></div>)}</div>
      </section>

      <section id="education" data-index="5" ref={(el) => { if (el) sections.current[5] = el; }} className="world-section education-section">
        <ChapterLabel number="06" name="EDUCATION / ACHIEVEMENTS" />
        <div className="education-heading"><p className="eyebrow">THE FOUNDATION</p><h2>Built on<br/><em>curiosity.</em></h2></div>
        <div className="education-architecture"><article><span>2024 — 2026</span><h3>M.Sc. Computer Engineering</h3><p>Software Engineering</p><small>Shahid Beheshti University</small></article><article><span>2020 — 2024</span><h3>B.Sc. Electrical Engineering</h3><p>Electronics</p><small>Tehran Markaz Azad University</small></article></div>
        <div className="achievement-plinth"><div><span>2025 / ALGORITHM COMPETITION</span><strong>07<sup>TH</sup></strong><p>Mili Gold</p></div><div><span>2024 / FUTURE STARS</span><strong>40<sup>TH</sup></strong><p>Golrang</p></div></div>
        <div className="course-list"><span className="eyebrow">SELECTED STUDY / SIDE QUESTS</span>{courses.slice(0,6).map((course,index)=><p key={course}><b>0{index+1}</b>{course}</p>)}</div>
      </section>

      <section id="contact" data-index="6" ref={(el) => { if (el) sections.current[6] = el; }} className="world-section contact-section">
        <ChapterLabel number="07" name="THE COAST / AFTER DARK" />
        <div className="contact-content"><p className="eyebrow">THE CITY IS YOURS</p><h2>LET&apos;S BUILD<br/>SOMETHING <em>EXTRAORDINARY.</em></h2><p>Have an interesting idea? Let&apos;s make it real.</p><a className="contact-email" href="mailto:fatemeekharazmi@gmail.com">fatemeekharazmi@gmail.com <ArrowUpRight size={20}/></a><div className="contact-socials"><a href="https://github.com/faanid" target="_blank" rel="noreferrer"><Github size={17}/> GITHUB <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/fateme-kharazmi/" target="_blank" rel="noreferrer"><Linkedin size={17}/> LINKEDIN <ArrowUpRight size={13}/></a><a href="mailto:fatemeekharazmi@gmail.com"><Mail size={17}/> EMAIL <ArrowUpRight size={13}/></a></div></div>
        <footer className="world-footer"><a href="#home" className="world-logo">FK<span>.</span></a><span>© {new Date().getFullYear()} FATEME KHARAZMI / SOFTWARE ENGINEER</span><a href="#home">BACK TO THE TOP <MoveUpRight size={14}/></a></footer>
      </section>
    </main>
  );
}
