import { useEffect, useRef, useState } from "react";

const clickSound = new Audio("/sounds/universfield-computer-mouse-click-352734.mp3");
const playClick = () => {
  clickSound.currentTime = 0;
  clickSound.volume = 0.4;
  clickSound.play().catch(() => {});
};

const portfolioSections = {
  home: {
    label: "Home",
    content: (
      <>
        <h1 style={{ fontSize: "38px", margin: "0 0 8px" }}>James Cicerello</h1>
        <p style={{ fontSize: "18px", color: "#666", margin: "0 0 24px" }}>Software Engineer</p>
        <p style={{ fontSize: "16px", lineHeight: 1.7, maxWidth: "560px" }}>
          Welcome to my interactive portfolio. Double-click the icons on the desktop
          to explore my projects, background, and a couple of extras.
        </p>
      </>
    ),
  },
  about: {
    label: "About",
    content: (
      <>
        <h2 style={{ fontSize: "26px", marginTop: 0 }}>About Me</h2>
        <p style={{ fontSize: "16px", lineHeight: 1.7 }}>
          I'm a software engineer focused on building clean, functional, and creative
          digital experiences. This portfolio itself is a 3D scene built with React
          Three Fiber, React, and Tailwind CSS.
        </p>
        <p style={{ fontSize: "16px", lineHeight: 1.7 }}>
          Add more of your background, education, and interests here.
        </p>
      </>
    ),
  },
  experience: {
    label: "Experience",
    content: (
      <>
        <h2 style={{ fontSize: "26px", marginTop: 0 }}>Experience</h2>
        {[1, 2].map((item) => (
          <div key={item} style={{ marginBottom: "24px" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "18px" }}>Job Title — Company Name</h3>
            <p style={{ margin: "0 0 8px", color: "#777", fontSize: "13px" }}>
              Month Year — Month Year
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.7 }}>
              Description of what you did, the technologies you used, and the impact.
            </p>
          </div>
        ))}
      </>
    ),
  },
  projects: {
    label: "Projects",
    content: (
      <>
        <h2 style={{ fontSize: "26px", marginTop: 0 }}>Projects</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "16px" }}>
          {[1, 2, 3, 4].map((n) => (
            <article
              key={n}
              style={{
                border: "1px solid #e2e5e9",
                borderRadius: "10px",
                padding: "16px",
                background: "#fff",
                boxShadow: "0 3px 10px rgba(0,0,0,.05)",
              }}
            >
              <h3 style={{ margin: "0 0 6px", fontSize: "17px" }}>Project {n}</h3>
              <p style={{ margin: "0 0 10px", fontSize: "14px", lineHeight: 1.6, color: "#666" }}>
                Short description of the project, what it does, and the stack used.
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{ color: "#2563eb", fontSize: "13px", fontWeight: 700 }}
              >
                View Project
              </a>
            </article>
          ))}
        </div>
      </>
    ),
  },
  contact: {
    label: "Contact",
    content: (
      <>
        <h2 style={{ fontSize: "26px", marginTop: 0 }}>Contact</h2>
        <p style={{ fontSize: "16px", lineHeight: 1.7 }}>Email: you@example.com</p>
        <p style={{ fontSize: "16px", lineHeight: 1.7 }}>LinkedIn and GitHub links go here.</p>
      </>
    ),
  },
};

function ShowcaseContent() {
  const [tab, setTab] = useState("home");
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", gap: "4px", padding: "10px 16px", borderBottom: "1px solid #ddd", background: "#f7f7f8" }}>
        {Object.entries(portfolioSections).map(([key, s]) => (
          <button
            key={key}
            onClick={() => {
              playClick();
              setTab(key);
            }}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "none",
              background: tab === key ? "#2563eb" : "transparent",
              color: tab === key ? "#fff" : "#333",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "28px 34px", color: "#1f2430" }}>
        {portfolioSections[tab].content}
      </div>
    </div>
  );
}

function ResumeContent() {
  return (
    <div style={{ padding: "24px 30px", fontFamily: "'Courier New', monospace", fontSize: "14px", lineHeight: 1.7, color: "#222" }}>
      <strong>JAMES CICERELLO</strong>
      <br />
      Software Engineer
      <br />
      <br />
      EXPERIENCE
      <br />
      — Job Title, Company (Year–Year)
      <br />
      &nbsp;&nbsp;Description of role and impact.
      <br />
      <br />
      EDUCATION
      <br />
      — Degree, School (Year)
      <br />
      <br />
      SKILLS
      <br />
      — JavaScript, React, Three.js, Node, Tailwind
    </div>
  );
}

function RecycleContent() {
  return (
    <div style={{ padding: "40px", textAlign: "center", color: "#888", fontSize: "14px" }}>
      Recycle Bin is empty.
    </div>
  );
}

const GRID = 16;
function SnakeGame({ active }) {
  const [snake, setSnake] = useState([[7, 7], [6, 7], [5, 7]]);
  const [food, setFood] = useState([10, 10]);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const dirRef = useRef([1, 0]);

  useEffect(() => {
    const onKey = (e) => {
      const map = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] };
      if (map[e.key]) {
        e.preventDefault();
        const [nx, ny] = map[e.key];
        const [cx, cy] = dirRef.current;
        if (nx === -cx && ny === -cy) return;
        dirRef.current = [nx, ny];
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!active || !alive) return;
    const t = setInterval(() => {
      setSnake((prev) => {
        const [dx, dy] = dirRef.current;
        const head = prev[0];
        const next = [(head[0] + dx + GRID) % GRID, (head[1] + dy + GRID) % GRID];
        if (prev.some(([x, y]) => x === next[0] && y === next[1])) {
          setAlive(false);
          return prev;
        }
        const ate = next[0] === food[0] && next[1] === food[1];
        const body = ate ? [next, ...prev] : [next, ...prev.slice(0, -1)];
        if (ate) {
          setScore((s) => s + 1);
          let f;
          do {
            f = [Math.floor(Math.random() * GRID), Math.floor(Math.random() * GRID)];
          } while (body.some(([x, y]) => x === f[0] && y === f[1]));
          setFood(f);
        }
        return body;
      });
    }, 140);
    return () => clearInterval(t);
  }, [active, alive, food]);

  const restart = () => {
    playClick();
    setSnake([[7, 7], [6, 7], [5, 7]]);
    dirRef.current = [1, 0];
    setAlive(true);
    setScore(0);
  };

  const cell = 20;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px", background: "#1b1b1b", height: "100%", color: "#fff" }}>
      <div style={{ marginBottom: "8px", fontSize: "13px", fontWeight: 600 }}>Score: {score}</div>
      <div style={{ position: "relative", width: GRID * cell, height: GRID * cell, background: "#111", border: "2px solid #333" }}>
        {snake.map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x * cell,
              top: y * cell,
              width: cell - 2,
              height: cell - 2,
              background: i === 0 ? "#4ade80" : "#22c55e",
              borderRadius: "3px",
            }}
          />
        ))}
        <div style={{ position: "absolute", left: food[0] * cell, top: food[1] * cell, width: cell - 2, height: cell - 2, background: "#f87171", borderRadius: "50%" }} />
        {!alive && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.75)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <span>Game Over</span>
            <button onClick={restart} style={{ padding: "6px 14px", borderRadius: "6px", border: "none", background: "#4da6ff", color: "#fff", cursor: "pointer" }}>
              Restart
            </button>
          </div>
        )}
      </div>
      <div style={{ marginTop: "8px", fontSize: "11px", opacity: 0.6 }}>Use arrow keys to move</div>
    </div>
  );
}

function BootScreen() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px", color: "#fff" }}>
      <div style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "1px" }}>James Cicerello OS</div>
      <div style={{ width: "180px", height: "4px", background: "rgba(255,255,255,.15)", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%", background: "#4da6ff", animation: "bootbar 0.9s ease forwards" }} />
      </div>
      <style>{`@keyframes bootbar { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}

function DesktopIcon({ icon, label, onOpen }) {
  return (
    <div
      onDoubleClick={onOpen}
      style={{ width: "88px", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,.6)", cursor: "default" }}
    >
      <div style={{ fontSize: "36px" }}>{icon}</div>
      <span style={{ fontSize: "12px", textAlign: "center", lineHeight: 1.2 }}>{label}</span>
    </div>
  );
}

const btnStyle = {
  width: "28px",
  height: "24px",
  border: "none",
  borderRadius: "4px",
  background: "rgba(255,255,255,.12)",
  color: "#fff",
  cursor: "pointer",
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function AppWindow({ app, win, onFocus, onClose, onMinimize, onMaximize, onDragStart, children }) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const box = win.maximized
    ? { top: 0, left: 0, width: 1200, height: 768 - 46 }
    : { top: win.y, left: win.x, width: win.w, height: win.h };

  return (
    <div
      onMouseDown={onFocus}
      style={{
        position: "absolute",
        ...box,
        zIndex: win.z,
        background: "#f3f3f3",
        borderRadius: win.maximized ? 0 : "10px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.25)",
        display: "flex",
        flexDirection: "column",
        transform: entered ? "scale(1)" : "scale(.92)",
        opacity: entered ? 1 : 0,
        transition: "transform .18s ease, opacity .18s ease",
      }}
    >
      <div
        onPointerDown={onDragStart}
        onDoubleClick={onMaximize}
        style={{
          height: "38px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6px 0 12px",
          background: "linear-gradient(180deg,#3a3d46,#24262c)",
          color: "#fff",
          cursor: win.maximized ? "default" : "move",
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
          <span>{app.icon}</span>
          {app.title}
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          <button onClick={onMinimize} style={btnStyle}>_</button>
          <button onClick={onMaximize} style={btnStyle}>{win.maximized ? "❐" : "□"}</button>
          <button onClick={onClose} style={{ ...btnStyle, background: "#e5484d" }}>×</button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", background: "#fff" }}>{children}</div>
    </div>
  );
}

const APPS = {
  showcase: { title: "My Showcase", icon: "🗂️", width: 900, height: 600 },
  resume: { title: "Resume.txt", icon: "📄", width: 520, height: 420 },
  snake: { title: "Snake", icon: "🐍", width: 420, height: 480 },
  recycle: { title: "Recycle Bin", icon: "🗑️", width: 420, height: 300 },
};

const Desktop = ({ onExit, zoomedIn }) => {
  const [booting, setBooting] = useState(false);
  const [windows, setWindows] = useState({});
  const [zCounter, setZCounter] = useState(1);
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState(new Date());
  const dragState = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (zoomedIn) {
      setBooting(true);
      const t = setTimeout(() => setBooting(false), 900);
      return () => clearTimeout(t);
    }
  }, [zoomedIn]);

  const openApp = (id) => {
    playClick();
    setStartOpen(false);
    setZCounter((z) => z + 1);
    setWindows((w) => {
      const existing = w[id];
      const count = Object.keys(w).length;
      return {
        ...w,
        [id]: existing
          ? { ...existing, minimized: false, z: zCounter + 1 }
          : { x: 120 + count * 30, y: 80 + count * 26, w: APPS[id].width, h: APPS[id].height, minimized: false, maximized: false, z: zCounter + 1 },
      };
    });
  };

  const closeApp = (id) => {
    playClick();
    setWindows((w) => {
      const c = { ...w };
      delete c[id];
      return c;
    });
  };

  const minimizeApp = (id) => {
    playClick();
    setWindows((w) => ({ ...w, [id]: { ...w[id], minimized: true } }));
  };

  const toggleMaximize = (id) => {
    playClick();
    setWindows((w) => ({ ...w, [id]: { ...w[id], maximized: !w[id].maximized } }));
  };

  const focusApp = (id) => {
    setZCounter((z) => z + 1);
    setWindows((w) => ({ ...w, [id]: { ...w[id], z: zCounter + 1 } }));
  };

  const startDrag = (id, e) => {
    if (windows[id].maximized) return;
    focusApp(id);
    dragState.current = { id, offX: e.clientX - windows[id].x, offY: e.clientY - windows[id].y };
  };

  useEffect(() => {
    const move = (e) => {
      if (!dragState.current) return;
      const { id, offX, offY } = dragState.current;
      setWindows((w) =>
        w[id] ? { ...w, [id]: { ...w[id], x: Math.max(0, e.clientX - offX), y: Math.max(0, e.clientY - offY) } } : w
      );
    };
    const up = () => {
      dragState.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const openIds = Object.keys(windows);

  return (
    <div
      onClick={() => setStartOpen(false)}
      style={{
        width: "1200px",
        height: "768px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "linear-gradient(160deg, #1e3c72 0%, #2a5298 45%, #74ebd5 100%)",
        pointerEvents: zoomedIn ? "auto" : "none",
        userSelect: "none",
      }}
    >
      {booting ? (
        <BootScreen />
      ) : (
        <>
          <div style={{ position: "absolute", top: "30px", left: "24px", display: "flex", flexDirection: "column", gap: "22px" }}>
            {Object.entries(APPS).map(([id, app]) => (
              <DesktopIcon key={id} icon={app.icon} label={app.title} onOpen={() => openApp(id)} />
            ))}
          </div>

          {openIds.map((id) => {
            const win = windows[id];
            if (win.minimized) return null;
            return (
              <AppWindow
                key={id}
                app={APPS[id]}
                win={win}
                onFocus={() => focusApp(id)}
                onClose={() => closeApp(id)}
                onMinimize={() => minimizeApp(id)}
                onMaximize={() => toggleMaximize(id)}
                onDragStart={(e) => startDrag(id, e)}
              >
                {id === "showcase" && <ShowcaseContent />}
                {id === "resume" && <ResumeContent />}
                {id === "snake" && <SnakeGame active={!win.minimized} />}
                {id === "recycle" && <RecycleContent />}
              </AppWindow>
            );
          })}

          {startOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                left: "8px",
                bottom: "52px",
                width: "260px",
                background: "rgba(30,30,40,.92)",
                backdropFilter: "blur(12px)",
                borderRadius: "10px",
                boxShadow: "0 12px 40px rgba(0,0,0,.5)",
                padding: "10px",
                zIndex: 9999,
              }}
            >
              {Object.entries(APPS).map(([id, app]) => (
                <button
                  key={id}
                  onClick={() => openApp(id)}
                  style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 12px", background: "transparent", border: "none", color: "#fff", fontSize: "14px", borderRadius: "6px", cursor: "pointer" }}
                >
                  <span style={{ fontSize: "18px" }}>{app.icon}</span>
                  {app.title}
                </button>
              ))}
              <div style={{ height: "1px", background: "rgba(255,255,255,.12)", margin: "6px 0" }} />
              <button
                onClick={() => {
                  playClick();
                  onExit();
                }}
                style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 12px", background: "transparent", border: "none", color: "#ff8a8a", fontSize: "14px", borderRadius: "6px", cursor: "pointer" }}
              >
                <span style={{ fontSize: "18px" }}>⏻</span> Exit Monitor
              </button>
            </div>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "46px",
              background: "rgba(20,20,28,.75)",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              padding: "0 8px",
              gap: "8px",
              borderTop: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <button
              onClick={() => {
                playClick();
                setStartOpen((o) => !o);
              }}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "6px", border: "none", background: startOpen ? "rgba(255,255,255,.18)" : "transparent", color: "#fff", fontWeight: 600, cursor: "pointer" }}
            >
              <span style={{ fontSize: "16px" }}>⊞</span> Start
            </button>
            <div style={{ width: "1px", height: "26px", background: "rgba(255,255,255,.15)" }} />
            {openIds.map((id) => (
              <button
                key={id}
                onClick={() => {
                  if (windows[id].minimized) setWindows((w) => ({ ...w, [id]: { ...w[id], minimized: false } }));
                  focusApp(id);
                }}
                style={{ padding: "6px 14px", borderRadius: "6px", border: "none", background: !windows[id].minimized ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.06)", color: "#fff", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span>{APPS[id].icon}</span>
                {APPS[id].title}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ color: "#fff", fontSize: "12px", textAlign: "right", lineHeight: 1.2, padding: "0 10px" }}>
              <div>{clock.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</div>
              <div style={{ opacity: 0.7 }}>{clock.toLocaleDateString([], { month: "short", day: "numeric" })}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Desktop;
