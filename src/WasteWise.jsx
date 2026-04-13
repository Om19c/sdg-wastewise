import React, { useState } from 'react';

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --bg-app: #F3F7F5;
  --bg-sidebar: #0C1E14;
  --bg-sidebar-hover: #163323;
  --bg-card: #FFFFFF;
  
  --text-main: #132A1D;
  --text-muted: #647B6E;
  --text-sidebar: #8EAC9B;
  
  --accent-primary: #10B981;
  --accent-secondary: #059669;
  --accent-warning: #F59E0B;
  --accent-danger: #EF4444;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.03), 0 2px 4px rgba(0, 0, 0, 0.02);
  --shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.02);
  --shadow-float: 0 20px 40px rgba(16, 185, 129, 0.1);
  
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-app);
  font-family: 'Inter', -apple-system, sans-serif;
  color: var(--text-main);
  -webkit-font-smoothing: antialiased;
}

* { box-sizing: border-box; }

/* APP SHELL LAYOUT */
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* MOBILE NAV (Sticks to bottom) */
.app-sidebar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;
  padding: 12px 10px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #E2E8F0;
  z-index: 50;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.04);
}

.sidebar-brand { display: none; }
.sidebar-footer { display: none; }

.sidebar-links {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: none;
  font-family: inherit;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 8px 12px;
  border-radius: var(--radius-lg);
}

.nav-item:hover { color: var(--accent-primary); }
.nav-item.active { color: var(--accent-secondary); }

.nav-item-icon {
  font-size: 22px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-item.active .nav-item-icon {
  transform: scale(1.15) translateY(-2px);
}

.nav-item-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* MAIN CONTENT BLOCK */
.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 90px; /* Make room for mobile bottom nav */
}

/* PAGE HEADER */
.page-header {
  background: #ffffff;
  padding: 24px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 40;
}

.page-title {
  margin: 0 0 6px 0;
  font-size: 24px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.03em;
}

.page-subtitle {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

.page-content {
  padding: 24px;
  flex: 1;
}

/* ANIMATIONS */
.fade-enter {
  animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* CARDS */
.w-card {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: 28px;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0,0,0,0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.w-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-title {
  margin: 0 0 24px 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #F0F4F2;
  padding-bottom: 16px;
}

/* TYPOGRAPHY UTILS */
.t-h2 { font-size: 26px; font-weight: 800; letter-spacing: -0.03em; color: var(--text-main); margin: 0 0 10px 0; }
.t-p { font-size: 15px; color: var(--text-muted); margin: 0; line-height: 1.6; }

/* GRID SYSTEM */
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* DESKTOP & LAPTOP BREAKPOINT */
@media (min-width: 1024px) {
  .app-shell {
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
  }
  
  .app-sidebar {
    position: static;
    width: 300px;
    height: 100vh;
    background: var(--bg-sidebar);
    border-top: none;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 40px 24px;
    box-shadow: 1px 0 0 rgba(255,255,255,0.05);
  }

  .app-main {
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 0;
    scroll-behavior: smooth;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 56px;
    width: 100%;
    padding: 0 12px;
  }

  .brand-icon {
    font-size: 32px;
    background: rgba(16, 185, 129, 0.15);
    padding: 10px;
    border-radius: var(--radius-ld);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  .brand-title {
    display: block;
    font-size: 24px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .brand-subtitle {
    display: block;
    font-size: 10px;
    color: var(--text-sidebar);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 800;
    margin-top: 4px;
  }

  .sidebar-links {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .nav-item {
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    padding: 16px 20px;
    border-radius: var(--radius-md);
    color: var(--text-sidebar);
    gap: 16px;
  }

  .nav-item:hover {
    background: var(--bg-sidebar-hover);
    color: #fff;
  }

  .nav-item.active {
    background: var(--accent-primary);
    color: #fff;
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2);
  }

  .nav-item.active .nav-item-icon {
    transform: none;
  }

  .nav-item-label {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0;
  }

  .sidebar-footer {
    display: flex;
    margin-top: auto;
    padding-top: 24px;
    border-top: 1px solid rgba(255,255,255,0.05);
    width: 100%;
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 12px;
    border-radius: var(--radius-md);
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.02);
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .user-profile:hover { background: rgba(255,255,255,0.08); }

  .avatar {
    font-size: 24px;
    background: var(--bg-sidebar-hover);
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-name { display: block; font-size: 14px; color: #fff; font-weight: 700; margin-bottom: 2px;}
  .user-role { display: block; font-size: 12px; color: var(--text-sidebar); font-weight: 500; }

  .page-header {
    background: transparent;
    padding: 40px 48px 12px;
    border-bottom: none;
    box-shadow: none;
    position: static;
  }

  .page-title { font-size: 36px; }
  .page-subtitle { font-size: 16px; }

  .page-content {
    padding: 24px 48px 48px;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 28px;
  }

  .col-span-12 { grid-column: span 12; }
  .col-span-8 { grid-column: span 8; }
  .col-span-7 { grid-column: span 7; }
  .col-span-6 { grid-column: span 6; }
  .col-span-5 { grid-column: span 5; }
  .col-span-4 { grid-column: span 4; }
}

/* EXTENDED DESKTOP BREAKPOINT */
@media (min-width: 1600px) {
  .page-content { padding-left: 80px; padding-right: 80px; }
}

/* HERO COMPONENT */
.hero-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  background: white;
  gap: 32px;
}

@media (min-width: 768px) {
  .hero-card {
    flex-direction: row;
    text-align: left;
    background: linear-gradient(120deg, #ffffff 0%, #F5FBF8 100%);
  }
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
  justify-content: center;
}

@media (min-width: 768px) {
  .hero-stats { justify-content: flex-start; }
}

.stat-pill {
  background: #fff;
  padding: 12px 20px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  color: var(--text-main);
  box-shadow: var(--shadow-md);
  border: 1px solid #EDF5F0;
  font-size: 14px;
}

/* IMPACT COMPONENT */
.impact-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.impact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-app);
  border-radius: var(--radius-lg);
  border: 1px solid #E2E8F0;
  transition: transform 0.2s;
}

.impact-item:hover { transform: translateX(4px); }

.impact-icon {
  font-size: 24px;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 14px;
  box-shadow: var(--shadow-sm);
}

.impact-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.impact-val { font-size: 18px; font-weight: 800; line-height: 1.2; }
.impact-lbl { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

/* SCORE RING DIV */
.score-ring {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);
  flex-shrink: 0;
}

.score-ring-inner {
  position: absolute;
  inset: 12px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.06);
}

.score-val { font-size: 40px; font-weight: 800; color: var(--text-main); line-height: 1; }
.score-lbl { font-size: 10px; font-weight: 800; color: var(--accent-primary); letter-spacing: 0.15em; margin-top: 6px; text-transform: uppercase;}

/* PROGRESS BARS */
.prog-row { margin-bottom: 24px; }
.prog-row:last-child { margin-bottom: 0; }
.prog-head { display: flex; justify-content: space-between; align-items: baseline; font-size: 14px; font-weight: 700; margin-bottom: 10px; color: var(--text-main); }
.prog-bg { height: 12px; background: #E2E8F0; border-radius: 6px; overflow: hidden; }
.prog-fill { height: 100%; border-radius: 6px; transition: width 1s cubic-bezier(0.16, 1, 0.3, 1); }

/* TREND CHART */
.trend-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 220px;
  padding-top: 20px;
}

.trend-bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  flex: 1;
  gap: 12px;
}

.trend-bar {
  width: 100%;
  max-width: 48px;
  border-radius: 8px 8px 0 0;
  transition: height 1s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  position: relative;
}

.trend-bar:hover { filter: brightness(0.9); }
.trend-val { font-size: 13px; font-weight: 800; color: var(--text-main); }
.trend-lbl { font-size: 13px; font-weight: 600; color: var(--text-muted); }

/* FORMS AND INPUTS */
.split-form { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
@media (min-width: 768px) { .split-form { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; } }

.w-label { display: block; margin-bottom: 10px; font-size: 13px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.w-input {
  width: 100%; padding: 18px 24px; border-radius: var(--radius-lg); border: 2px solid #E2E8F0;
  background: #F8FAFC; font-size: 15px; font-weight: 600; color: var(--text-main);
  transition: all 0.2s; outline: none; font-family: inherit;
}
.w-input:focus { border-color: var(--accent-primary); background: #fff; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }

.w-pill-group { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
.w-pill {
  padding: 14px 24px; border-radius: 100px; border: 2px solid #E2E8F0; background: white;
  color: var(--text-muted); cursor: pointer; font-size: 14px; font-weight: 700; transition: all 0.2s;
}
.w-pill:hover { background: #F8FAFC; }
.w-pill.active { background: #ECFDF5; border-color: var(--accent-secondary); color: var(--accent-secondary); }

.w-btn {
  width: 100%; padding: 18px 24px; border-radius: var(--radius-lg); background: var(--text-main);
  color: white; border: none; font-size: 16px; font-weight: 800; cursor: pointer;
  transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 12px;
  box-shadow: 0 4px 14px rgba(19, 42, 29, 0.2);
}
.w-btn:hover { background: var(--bg-sidebar-hover); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(19, 42, 29, 0.3); }
.w-btn:active { transform: scale(0.98); }
.w-btn.primary { background: var(--accent-primary); box-shadow: var(--shadow-float); }
.w-btn.primary:hover { background: var(--accent-secondary); }
.w-btn.outline { background: transparent; color: var(--text-main); border: 2px solid #E2E8F0; box-shadow: none; }
.w-btn.outline:hover { background: #F8FAFC; transform: none; }

/* LOG LIST */
.log-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
.log-item { display: flex; justify-content: space-between; align-items: center; padding: 20px; border: 1px solid #E2E8F0; border-radius: var(--radius-lg); background: #fff; transition: box-shadow 0.2s; }
.log-item:hover { box-shadow: var(--shadow-md); border-color: transparent; }
.log-info { display: flex; flex-direction: column; gap: 6px; }
.log-title { font-weight: 800; color: var(--text-main); font-size: 16px; }
.log-meta { font-size: 14px; color: var(--text-muted); font-weight: 500; }
.log-delete { color: var(--accent-danger); background: #FEE2E2; border: none; width: 44px; height: 44px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 22px; transition: all 0.2s; }
.log-delete:hover { background: #FECACA; transform: scale(1.05); }

/* AI GRID */
.ai-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.ai-card { background: linear-gradient(145deg, #ffffff, #F0FDF4); border-left: 6px solid var(--accent-primary); padding: 24px; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
.ai-header { display: flex; gap: 20px; align-items: flex-start; }
.ai-icon { font-size: 40px; line-height: 1; }
.ai-title { font-size: 16px; margin: 0 0 10px 0; font-weight: 800; color: var(--text-main); }
.ai-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin: 0 0 16px 0; }
.ai-impact { font-size: 12px; color: var(--accent-secondary); font-weight: 800; background: #D1FAE5; padding: 8px 14px; border-radius: 8px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em; }

/* THEME CARDS */
.dark-card { background: var(--bg-sidebar); color: #fff; border: none; }
.dark-card .card-title { color: #fff; border-bottom-color: rgba(255,255,255,0.1); }
.dark-card p { color: #A7F3D0; }

.spinner {
  border: 4px solid rgba(16, 185, 129, 0.2);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-left-color: var(--accent-primary);
  animation: spin 1s linear infinite;
  margin: 0 auto;
}
@keyframes spin { 100% { transform: rotate(360deg); } }
`;

// --- UI COMPONENTS ---
const Card = ({ children, style, className = '' }) => (
  <div className={"w-card " + className} style={style}>
    {children}
  </div>
);

const SectionTitle = ({ children, icon }) => (
  <h3 className="card-title">
    {icon && <span style={{fontSize: '26px'}}>{icon}</span>}
    {children}
  </h3>
);

const ScoreRing = ({ score }) => {
  const percent = Math.min(100, Math.max(0, score));
  const ringStyle = {
    background: "conic-gradient(var(--accent-primary) " + percent + "%, #E2E8F0 0)"
  };
  return (
    <div className="score-ring" style={ringStyle}>
      <div className="score-ring-inner">
        <div className="score-val">{score}</div>
        <div className="score-lbl">ECO SCORE</div>
      </div>
    </div>
  );
};

const ProgressBar = ({ label, value, max, color }) => {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <div className="prog-row">
      <div className="prog-head">
        <span>{label}</span>
        <strong style={{color: 'var(--accent-secondary)'}}>{value} kg</strong>
      </div>
      <div className="prog-bg">
        <div className="prog-fill" style={{ width: percent + "%", backgroundColor: color }}></div>
      </div>
    </div>
  );
};

const ImpactRow = ({ icon, label, val, highlightColor }) => (
  <div className="impact-item">
    <div className="impact-icon">{icon}</div>
    <div className="impact-text">
      <span className="impact-val" style={{color: highlightColor || 'inherit'}}>{val}</span>
      <span className="impact-lbl">{label}</span>
    </div>
  </div>
);


// --- VIEWS ---
const DashboardView = ({ logs }) => {
  const totalWaste = logs.reduce((sum, log) => sum + Number(log.quantity), 0);
  const lastWeekWaste = 45; 
  const diff = totalWaste - lastWeekWaste;
  const diffPercent = Math.abs((diff / lastWeekWaste) * 100).toFixed(1);
  const isIncrease = diff > 0;
  
  const costLoss = totalWaste * 50; 
  const co2Impact = (totalWaste * 2.5).toFixed(1); 
  const waterWasted = totalWaste * 1000; 
  const mealsLost = Math.floor(totalWaste * 3.33); 
  const score = Math.max(0, Math.min(100, 100 - Math.floor(totalWaste * 0.8)));

  const typeMap = logs.reduce((acc, log) => { acc[log.foodType] = (acc[log.foodType] || 0) + Number(log.quantity); return acc; }, {});
  const slotMap = logs.reduce((acc, log) => { acc[log.mealSlot] = (acc[log.mealSlot] || 0) + Number(log.quantity); return acc; }, {});
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const trendMap = logs.reduce((acc, log) => { acc[log.date] = (acc[log.date] || 0) + Number(log.quantity); return acc; }, {});
  const maxTrend = Math.max(...Object.values(trendMap), 10); 

  return (
    <div className="dashboard-grid fade-enter">
      
      {/* Hero Section */}
      <div className="w-card col-span-8 hero-card">
        <div>
          <h2 className="t-h2">Weekly Emissions Tracker</h2>
          <p className="t-p">You've successfully documented <strong>{logs.length}</strong> waste logs this cycle.</p>
          <div className="hero-stats">
            <div className="stat-pill"><span style={{fontSize: '20px'}}>💸</span> ₹{costLoss} Deficit</div>
            <div className="stat-pill"><span style={{fontSize: '20px'}}>☁️</span> {co2Impact}kg CO₂</div>
            <div className="stat-pill"><span style={{fontSize: '20px'}}>💧</span> {waterWasted}L Water</div>
          </div>
        </div>
        <ScoreRing score={score} />
      </div>

      {/* Impact Sidebar */}
      <div className="w-card col-span-4">
        <SectionTitle icon="⚡️">Core Metrics</SectionTitle>
        <div className="impact-list">
          <ImpactRow icon="🍱" label="Preserved Equivalent" val={mealsLost + " Meals"} />
          <ImpactRow 
            icon="📊" 
            label="Versus Last Week" 
            val={diffPercent + "% " + (isIncrease ? "Increase" : "Reduction")} 
            highlightColor={isIncrease ? "var(--accent-danger)" : "var(--accent-primary)"} 
          />
        </div>
      </div>

      {/* Breakdowns */}
      <div className="w-card col-span-4">
        <SectionTitle icon="🍕">By Food Type</SectionTitle>
        {Object.entries(typeMap).sort((a,b) => b[1]-a[1]).map(([type, qty]) => (
          <ProgressBar key={type} label={type} value={qty} max={totalWaste} color="var(--accent-primary)" />
        ))}
        {Object.keys(typeMap).length === 0 && <p className="t-p">No contextual data logged.</p>}
      </div>

      <div className="w-card col-span-4">
        <SectionTitle icon="⏱️">By Meal Timing</SectionTitle>
        {Object.entries(slotMap).sort((a,b) => b[1]-a[1]).map(([slot, qty]) => (
          <ProgressBar key={slot} label={slot} value={qty} max={totalWaste} color="var(--accent-warning)" />
        ))}
        {Object.keys(slotMap).length === 0 && <p className="t-p">No sequential data logged.</p>}
      </div>

      {/* Deep Trend Chart */}
      <div className="w-card col-span-4">
        <SectionTitle icon="📈">Discharge Trend</SectionTitle>
        <div className="trend-chart">
          {days.map(day => {
            const val = trendMap[day] || 0;
            const height = Math.max(4, (val / maxTrend) * 100);
            return (
              <div key={day} className="trend-bar-wrapper">
                <span className="trend-val">{val > 0 ? val : ''}</span>
                <div className="trend-bar" style={{ height: height + "%", background: "linear-gradient(180deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)" }}></div>
                <span className="trend-lbl">{day}</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
};

const LogWasteView = ({ logs, setLogs }) => {
  const [foodType, setFoodType] = useState('Rice');
  const [mealSlot, setMealSlot] = useState('Lunch');
  const [quantity, setQuantity] = useState('');
  const [msg, setMsg] = useState('');

  const submitLog = (e) => {
    e.preventDefault();
    if(!quantity || isNaN(quantity) || Number(quantity) <= 0) return;
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = days[new Date().getDay()];

    const newLog = {
      id: Date.now(),
      foodType,
      mealSlot,
      quantity: Number(quantity),
      date: currentDay === 'Sun' ? 'Mon' : currentDay
    };
    
    setLogs([newLog, ...logs]);
    setQuantity('');
    setMsg('Operation payload appended securely into records.');
    setTimeout(() => setMsg(''), 3000);
  };

  const deleteLog = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  return (
    <div className="dashboard-grid fade-enter">
      <div className="w-card col-span-5">
        <SectionTitle icon="✍️">Data Input API</SectionTitle>
        <form onSubmit={submitLog}>
          
          <div className="w-form-group">
            <label className="w-label">Culinary Type Selection</label>
            <select className="w-input" value={foodType} onChange={e => setFoodType(e.target.value)}>
              <option>Rice</option>
              <option>Dal</option>
              <option>Sabzi</option>
              <option>Roti</option>
              <option>Snacks</option>
              <option>Other</option>
            </select>
          </div>

          <div className="w-form-group">
             <label className="w-label">Loss Volume (kg)</label>
             <input 
               type="number" 
               step="0.1"
               className="w-input" 
               placeholder="Example: 2.5" 
               value={quantity} 
               onChange={e => setQuantity(e.target.value)} 
             />
          </div>
          
          <div className="w-form-group">
            <label className="w-label">Designated Timeframe</label>
            <div className="w-pill-group">
              {['Breakfast', 'Lunch', 'Evening', 'Dinner'].map(slot => (
                <button 
                  type="button" 
                  key={slot} 
                  className={"w-pill " + (mealSlot === slot ? "active" : "")}
                  onClick={() => setMealSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-btn primary">Initialize Pipeline Execution</button>
          
          {msg && <div style={{marginTop: '24px', color: 'var(--accent-secondary)', fontSize: '14px', textAlign: 'center', fontWeight: '800', padding: '16px', background: '#ECFDF5', borderRadius: '12px'}}>{msg}</div>}
        </form>
      </div>

      <div className="w-card col-span-7">
        <SectionTitle icon="🗄️">Operational State Ledger</SectionTitle>
        <ul className="log-list">
          {logs.map(log => (
            <li key={log.id} className="log-item">
              <div className="log-info">
                <span className="log-title">{log.foodType} &bull; {log.quantity} kg</span>
                <span className="log-meta">{log.mealSlot} Execution &bull; {log.date} Sequence</span>
              </div>
              <button type="button" className="log-delete" onClick={() => deleteLog(log.id)} title="Purge Record">×</button>
            </li>
          ))}
          {logs.length === 0 && <p className="t-p" style={{textAlign: 'center', padding: '40px 0'}}>Ledger is currently completely empty.</p>}
        </ul>
      </div>
    </div>
  );
};

const AiRecommendationsView = () => {
  const [loading, setLoading] = useState(false);
  const [showRecs, setShowRecs] = useState(false);

  const fetchAI = () => {
    setLoading(true); setShowRecs(false);
    setTimeout(() => { setLoading(false); setShowRecs(true); }, 1500);
  };

  const suggestions = [
    { icon: '📉', title: 'Rice Preparation Matrix', desc: 'Predictive modeling dictates scaling down base production output by precisely 11.4%.', impact: '20% Overhead Drop' },
    { icon: '♻️', title: 'Localized Reactor Processing', desc: 'Divert organic sabotage layers (peels/stems) directly into micro-compost node.', impact: '10% Landfill Drop' },
    { icon: '🍲', title: 'Carbohydrate Repurposing', desc: 'Unused liquid resources (Dal) are mathematically viable for morning utilization matrices.', impact: '15% Efficiency Gain' },
    { icon: '📢', title: 'Behavioral Node Anchors', desc: 'Install localized visual cues drastically guiding individual consumer loading behavior.', impact: '5% Total Output Drop' },
  ];

  return (
    <div className="dashboard-grid fade-enter">
      <div className="w-card col-span-12">
        <SectionTitle icon="🤖">Algorithmic Predictive Inference</SectionTitle>
        <p className="t-p" style={{marginBottom: '40px', maxWidth: '800px'}}>
          Our neural cloud framework autonomously assesses your exact facility input/output differential, isolating complex inefficiencies to stream direct architectural correction directives.
        </p>

        {!showRecs && !loading && (
          <button className="w-btn" style={{maxWidth: '300px'}} onClick={fetchAI}>Execute Analysis Thread</button>
        )}

        {loading && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0', gap: '24px'}}>
            <div className="spinner"></div>
            <p style={{fontSize: '15px', color: 'var(--accent-secondary)', fontWeight: '800'}}>Parsing systemic anomalies...</p>
          </div>
        )}

        {showRecs && (
          <>
            <div className="ai-grid">
              {suggestions.map((s, i) => (
                <div key={i} className="ai-card">
                  <div className="ai-header">
                    <span className="ai-icon">{s.icon}</span>
                    <div>
                      <h4 className="ai-title">{s.title}</h4>
                      <p className="ai-desc">{s.desc}</p>
                      <span className="ai-impact">Projection: {s.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-btn outline" style={{marginTop: '32px', maxWidth: '280px'}} onClick={() => setShowRecs(false)}>Purge Cache & Restart Analysis</button>
          </>
        )}
      </div>
    </div>
  );
};

const PracticesView = () => {
  const practices = [
    { title: 'Strict Portion Engineering', desc: 'Physically diminish baseline serving spoons. Psychological barriers prevent secondary refills, capping maximum individual load.' },
    { title: 'Terminal Phase Batching', desc: 'Cease bulk manufacturing processes within the final 45 minutes of active operational rotation. Build entirely on-demand.' },
    { title: 'NGO Logistics Integration', desc: 'Open automated API-like communication with dedicated logistics runners to evacuate secure surplus instantaneously.' },
    { title: 'Organic Matter Reactor', desc: 'Channel non-consumable biowaste straight into botanical fertilization zones. Do not blend with synthetic trash lines.' },
  ];

  return (
    <div className="dashboard-grid fade-enter">
      <div className="w-card col-span-7">
        <SectionTitle icon="🌱">Sustainability SOPs</SectionTitle>
        <p className="t-p" style={{marginBottom: '32px'}}>
          Implementing standard operating procedures forces physical system bottlenecks that explicitly protect global SDG compliance infrastructure.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {practices.map((p, i) => (
            <div key={i} style={{ borderLeft: '6px solid var(--accent-primary)', padding: '24px', background: '#F8FAFC', borderRadius: '0 16px 16px 0' }}>
              <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-main)', fontSize: '18px', fontWeight: '800' }}>{p.title}</h4>
              <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Graphic Side */}
      <div className="w-card col-span-5" style={{background: 'var(--bg-sidebar)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '24px'}}>
         <div style={{fontSize: '80px', lineHeight: 1}}>🌿</div>
         <h3 style={{fontSize: '28px', margin: 0, fontWeight: '800'}}>Nature Demands Efficiency</h3>
         <p style={{fontSize: '16px', color: 'var(--text-sidebar)', lineHeight: '1.6', margin: 0}}>Over 30% of all energy harvested globally is lost due to critical failure across supply and consumption vectors. Stand with us to end the leak.</p>
      </div>
    </div>
  );
};

const SurveyView = () => {
  return (
    <div className="dashboard-grid fade-enter">
      <div className="w-card col-span-8">
        <SectionTitle icon="📋">Ground Truth Research</SectionTitle>
        <ul style={{ paddingLeft: '24px', fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', margin: 0, fontWeight: '500' }}>
          <li style={{marginBottom: '16px'}}><strong>Systemic Blindness:</strong> Current administrative layers possess zero digital vision of their own exhaust logs.</li>
          <li style={{marginBottom: '16px'}}><strong>Total Cross-Contamination:</strong> Organic matter combines destructively with synthetics, causing massive downstream refinement failure.</li>
          <li style={{marginBottom: '16px'}}><strong>Lost Routing Vectors:</strong> Perfectly viable excess caloric loads are terminated primarily via dumpsters instead of localized hungry populations.</li>
          <li style={{marginBottom: '16px'}}><strong>Identified Bulk Nodes:</strong> Carbohydrates (Rice, Roti) suffer the greatest velocity of structural rejection at scale.</li>
          <li><strong>Agent Readiness:</strong> 85% of active ground operators heavily advocate adopting lightweight, frictionless digital interception methods.</li>
        </ul>
      </div>

      <div className="w-card col-span-4 dark-card shadow-float" style={{display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center'}}>
        <h3 className="card-title text-white" style={{border: 'none', margin: 0, fontSize: '24px'}}><span style={{fontSize: '32px'}}>💡</span> Executive Brief</h3>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.8', color: 'var(--text-sidebar)', fontWeight: '500' }}>
          The absence of a centralized operational watchdog inherently breeds catastrophic energy debt affecting monetary and environmental frameworks alike.<br/><br/>
          Activating the <strong>WasteWise</strong> analytical pipeline permanently unlocks visibility, actively bridging current primitive consumption methods completely into the modern UN SDG architectural vision.
        </p>
      </div>
    </div>
  );
};

const ObjectiveView = () => {
  return (
    <div className="dashboard-grid fade-enter">
      <div className="w-card col-span-12" style={{ textAlign: 'center', padding: '60px 40px', background: 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)', border: '1px solid #A7F3D0' }}>
        <div style={{ fontSize: '72px', marginBottom: '32px' }}>🎯</div>
        <h3 style={{fontSize: '32px', color: 'var(--text-main)', margin: '0 0 24px 0', fontWeight: '800', letterSpacing: '-0.03em'}}>Core Project Mandate</h3>
        <p style={{ margin: '0 auto', fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '700px', fontWeight: '500' }}>
          WasteWise fundamentally exists to enforce a modern culture of hardened sustainability within campus micro-cities. By digitizing the very concept of "waste", we pivot behavioral frameworks purely to eradicate our environmental bleed.
        </p>
      </div>

      {[{num: "2", title: "Zero Hunger Logistics", col: "#F59E0B", sub: "Maximizing deployment of existing resources perfectly."},
        {num: "12", title: "Responsible Operations", col: "#D97706", sub: "Tracking variables definitively to sever waste loops."},
        {num: "13", title: "Global Climate Action", col: "#059669", sub: "Cutting raw CO₂ generation caused by direct decay at source."}].map((g, i) => (
        <div key={i} className="w-card col-span-4" style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
            <div style={{ background: g.col, color: 'white', fontWeight: '800', minWidth: '70px', height: '70px', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', boxShadow: "0 8px 24px " + g.col + "40" }}>{g.num}</div>
            <div>
              <strong style={{ display: 'block', fontSize: '20px', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '800' }}>{g.title}</strong>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', display: 'block' }}>{g.sub}</span>
            </div>
        </div>
      ))}
    </div>
  );
};

export default function WasteWise() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [logs, setLogs] = useState([
    { id: 1, foodType: 'Rice', mealSlot: 'Lunch', quantity: 12.5, date: 'Mon' },
    { id: 2, foodType: 'Dal', mealSlot: 'Lunch', quantity: 5.2, date: 'Tue' },
    { id: 3, foodType: 'Sabzi', mealSlot: 'Evening', quantity: 8.8, date: 'Wed' },
    { id: 4, foodType: 'Roti', mealSlot: 'Dinner', quantity: 6.0, date: 'Thu' },
    { id: 5, foodType: 'Rice', mealSlot: 'Dinner', quantity: 14.1, date: 'Fri' },
  ]);

  const tabs = [
    { id: 'dashboard', label: 'Command Center', icon: '📊' },
    { id: 'log', label: 'Log Execution', icon: '✍️' },
    { id: 'ai', label: 'AI Intel', icon: '🤖' },
    { id: 'practices', label: 'SOP Hub', icon: '🌱' },
    { id: 'survey', label: 'Ground Research', icon: '📋' },
    { id: 'objective', label: 'Mission Directive', icon: '🎯' },
  ];

  const headerTitles = {
    dashboard: "Command Center",
    log: "Input Waste Coordinates",
    ai: "Predictive Analytics",
    practices: "Operational SOPs",
    survey: "Data Warehouse",
    objective: "Primary Directive"
  };

  const headerSubs = {
    dashboard: "Live overhead metrics monitoring campus deployment logic.",
    log: "Manually assert daily exhaustion figures securely.",
    ai: "Let algorithmic intelligence optimize your physical procedures.",
    practices: "Strict guidelines ensuring uncompromised SDG operational adherence.",
    survey: "Analyzed local variables collected by active investigation agents.",
    objective: "Formal alignment parameters ensuring future success."
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app-shell">
        
        {/* NAV SHELL */}
        <nav className="app-sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon">🌱</div>
            <div>
              <span className="brand-title">WasteWise</span>
              <span className="brand-subtitle">Enterprise Metrics</span>
            </div>
          </div>
          
          <div className="sidebar-links">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                className={"nav-item " + (activeTab === tab.id ? "active" : "")}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className="nav-item-icon">{tab.icon}</div>
                <span className="nav-item-label">{tab.label}</span>
              </button>
            ))}
          </div>
          
          <div className="sidebar-footer">
            <div className="user-profile">
               <div className="avatar">👨‍💻</div>
               <div>
                 <span className="user-name">Terminal Operative</span>
                 <span className="user-role">System Administrator</span>
               </div>
            </div>
          </div>
        </nav>
        
        {/* MAIN FEED */}
        <main className="app-main">
          <header className="page-header">
            <h1 className="page-title">{headerTitles[activeTab]}</h1>
            <p className="page-subtitle">{headerSubs[activeTab]}</p>
          </header>
          
          <div className="page-content">
            {activeTab === 'dashboard' && <DashboardView logs={logs} />}
            {activeTab === 'log' && <LogWasteView logs={logs} setLogs={setLogs} />}
            {activeTab === 'ai' && <AiRecommendationsView />}
            {activeTab === 'practices' && <PracticesView />}
            {activeTab === 'survey' && <SurveyView />}
            {activeTab === 'objective' && <ObjectiveView />}
          </div>
        </main>
      </div>
    </>
  );
}
