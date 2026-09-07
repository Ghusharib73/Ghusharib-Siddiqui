PORTFOLIO WEBSITE - TECHNICAL DOCUMENTATION MANUAL

1. EXECUTIVE SUMMARY
The Portfolio Website is a high-performance, responsive single-page developer portfolio designed to showcase modern frontend engineering skills, personal projects, and professional background. Engineered using pure HTML5, CSS3 Custom Properties, and Vanilla JavaScript, the application delivers a seamless interactive experience without heavy third-party framework overhead.

2. SYSTEM ARCHITECTURE & TECH STACK
- Core Frontend: HTML5, CSS3, ES6+ JavaScript (Semantic DOM, Native APIs)
- Styling & Layout: CSS Custom Properties, Grid, Flexbox (Bento grid, Theme engine)
- Typography: Space Grotesk, Manrope
- Visual Effects: Backdrop Filter, CSS Keyframes (Glassmorphism, Glow overlays)
- Accessibility: ARIA Roles & Media Query Controls (prefers-reduced-motion)

3. FILE DIRECTORY STRUCTURE
portfolio-website/
├── index.html         # Main portfolio layout & semantic markup
├── style_4.css        # Stylesheet, CSS variables & responsive rules
├── script.js          # Interactive features (Theme toggle, cursor, typewriter)
└── assets/            # Static media, project previews & icons

4. KEY FEATURES
- Glassmorphic UI: Back-drop frosted glass effects with custom border overlays.
- Dual Theme Engine: Light/Dark state handling via root data-theme attribute.
- Dynamic Custom Cursor: Fluid multi-element cursor follower with hover states.
- Typewriter Animation: Automated JS loop cycling through technical roles.
- Bento Grid & Ticker: Modular layout with an infinite CSS horizontal marquee.

5. CSS COLOR CONFIGURATION
:root {
  --bg: #070a10;
  --bg-soft: #0a0d13;
  --white: #ffffff;
  --text: #dce4f1;
  --muted: #aab3c2;
  --line: rgba(255, 255, 255, 0.12);
  --cyan: #63d9ff;
  --blue: #6ca8ff;
  --purple: #a789ff;
  --green: #8cf5b7;
}

html[data-theme="light"] {
  --bg: #f7f8fc;
  --bg-soft: #ffffff;
  --text: #202737;
  --muted: #5a6578;
  --line: rgba(0, 0, 0, 0.1);
  --cyan: #0284c7;
  --purple: #7c3aed;
}

6. SETUP & INSTALLATION
Step 1: Clone Repository
git clone https://github.com/your-username/portfolio-website.git

Step 2: Navigate to Directory
cd portfolio-website

Step 3: Launch Local Server
python -m http.server 8000

7. CUSTOMIZATION
- Updating Text: Edit index.html directly for bio, skills, and project descriptions.
- Color Scheme: Update primary hex variables in style_4.css under :root.
- Adding Items: Duplicate .project-card blocks inside the main grid container in index.html.
