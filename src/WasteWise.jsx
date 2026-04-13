import React, { useState } from 'react';

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

:root {
  --bg-color: #F0FDF4; 
  --card-bg: #FFFFFF;
  --text-dark: #064E3B;
  --text-gray: #4B5563;
  
  --primary: #10B981; 
  --primary-hover: #059669;
  --secondary: #FDE68A; 
  --secondary-text: #D97706;
  
  --danger-light: #FEE2E2;
  --danger-text: #DC2626;
  
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
  --shadow-hover: 0 12px 24px rgba(16, 185, 129, 0.15);
  
  --radius: 24px;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  font-family: 'Nunito', sans-serif;
  color: var(--text-dark);
}

* { box-sizing: border-box; }

.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header { text-align: center; padding: 20px 0 10px; }
.logo { font-size: 48px; margin-bottom: 10px; display: inline-block; animation: bounce 2s infinite ease-in-out; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.title { font-size: 32px; font-weight: 900; margin: 0 0 8px 0; color: var(--text-dark); letter-spacing: -0.02em; }
.subtitle { font-size: 16px; color: var(--text-gray); margin: 0; font-weight: 600; }

/* GLOBAL MESS PICKER */
.context-picker-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 30px;
  animation: fadeIn 0.4s ease-out forwards;
}

.context-picker-lbl {
  font-size: 14px;
  font-weight: 800;
  color: var(--text-gray);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.context-picker {
  padding: 14px 44px 14px 24px;
  font-size: 18px;
  font-weight: 800;
  border-radius: 100px;
  border: 4px solid var(--primary);
  background: white url('data:image/svg+xml;utf8,<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2.5L8 7.5L13.5 2.5" stroke="%2310B981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>') no-repeat right 20px center;
  color: var(--text-dark);
  cursor: pointer;
  outline: none;
  appearance: none;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
  transition: all 0.2s;
  font-family: inherit;
  max-width: 100%;
}

.context-picker:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(16, 185, 129, 0.25);
}

.nav-container { display: flex; overflow-x: auto; gap: 12px; padding: 10px 5px 20px; justify-content: flex-start; scrollbar-width: none; }
@media (min-width: 768px) { .nav-container { justify-content: center; flex-wrap: wrap; } }
.nav-container::-webkit-scrollbar { display: none; }

.tab-btn { background: var(--card-bg); border: 2px solid transparent; padding: 12px 24px; border-radius: 100px; font-size: 16px; font-weight: 700; color: var(--text-gray); cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: var(--shadow-sm); transition: all 0.3s; white-space: nowrap; }
.tab-btn:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); border-color: #D1FAE5; }
.tab-btn.active { background: var(--primary); color: white; box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3); }
.tab-icon { font-size: 20px; }

.card { background: var(--card-bg); border-radius: var(--radius); padding: 30px; box-shadow: var(--shadow-sm); margin-bottom: 24px; transition: transform 0.3s; border: 3px solid transparent; }
.card:hover { border-color: #D1FAE5; transform: translateY(-2px); }
.card-title { font-size: 22px; font-weight: 800; margin: 0 0 20px 0; display: flex; align-items: center; gap: 12px; }
.card-icon { font-size: 28px; background: var(--secondary); width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 16px; }

.fade-in { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 24px; }
.stat-box { background: #F8FAFC; padding: 24px; border-radius: 20px; text-align: center; border: 2px solid #F1F5F9; transition: all 0.2s; }
.stat-box:hover { transform: scale(1.02); background: white; border-color: var(--primary); box-shadow: var(--shadow-hover); }
.stat-emoji { font-size: 40px; margin-bottom: 12px; }
.stat-val { font-size: 28px; font-weight: 900; color: var(--text-dark); margin-bottom: 4px; }
.stat-lbl { font-size: 14px; font-weight: 700; color: var(--text-gray); }

.score-wrapper { display: flex; flex-direction: column; align-items: center; margin: 20px 0 40px; }
.score-bubble { width: 150px; height: 150px; background: var(--primary); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4); border: 8px solid #D1FAE5; transform: rotate(-5deg); transition: transform 0.3s; }
.score-bubble:hover { transform: rotate(5deg) scale(1.05); }
.score-num { font-size: 48px; font-weight: 900; line-height: 1; }
.score-text { font-size: 14px; font-weight: 800; letter-spacing: 1px; margin-top: 4px;}

.friendly-bar-container { margin-bottom: 20px; }
.friendly-bar-header { display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 8px; font-size: 15px;}
.friendly-bar-bg { height: 16px; background: #E2E8F0; border-radius: 10px; overflow: hidden; }
.friendly-bar-fill { height: 100%; border-radius: 10px; background: var(--primary); transition: width 1s ease-out; }

/* LEADERBOARD */
.leaderboard { display: flex; flex-direction: column; gap: 16px; }
.leader-row { display: flex; align-items: center; background: #F8FAFC; border: 2px solid #F1F5F9; padding: 16px 20px; border-radius: 20px; transition: all 0.2s;}
.leader-row:hover { background: white; border-color: var(--primary); box-shadow: var(--shadow-sm); transform: translateX(5px); }
.leader-rank { font-size: 24px; font-weight: 900; width: 40px; color: var(--text-gray); }
.leader-name { flex: 1; font-weight: 800; font-size: 18px; color: var(--text-dark); }
.leader-stat { font-weight: 900; font-size: 20px; color: var(--danger-text); display: flex; align-items: center; gap: 8px;}

/* FORMS */
.input-label { display: block; font-weight: 800; margin-bottom: 10px; color: var(--text-dark); font-size: 16px;}
.input-field { width: 100%; padding: 16px 20px; border-radius: 16px; border: 3px solid #E2E8F0; font-size: 16px; font-weight: 600; font-family: inherit; color: var(--text-dark); background: #F8FAFC; margin-bottom: 24px; transition: all 0.2s; appearance: none; }
select.input-field { background: #F8FAFC url('data:image/svg+xml;utf8,<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6 6L11 1" stroke="%234B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>') no-repeat right 20px center; }
.input-field:focus { outline: none; border-color: var(--primary); background: white; box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.15); }
.pill-options { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 30px; }
.pill-btn { padding: 12px 20px; border-radius: 100px; border: 3px solid #E2E8F0; background: white; font-weight: 700; font-size: 15px; color: var(--text-gray); cursor: pointer; transition: all 0.2s; }
.pill-btn:hover { background: #F1F5F9; transform: scale(1.05); }
.pill-btn.selected { border-color: var(--primary); background: #D1FAE5; color: var(--text-dark); }
.action-btn { width: 100%; padding: 18px; background: var(--primary); color: white; border: none; border-radius: 16px; font-size: 18px; font-weight: 800; cursor: pointer; transition: all 0.2s; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3); display: flex; align-items: center; justify-content: center; gap: 10px; }
.action-btn:hover { background: var(--primary-hover); transform: translateY(-3px); box-shadow: 0 12px 25px rgba(16, 185, 129, 0.4); }
.action-btn:active { transform: scale(0.96); }

/* RECENT LIST */
.history-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; margin-top: 24px; }
.history-card { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-radius: 20px; background: #F8FAFC; border: 2px solid #F1F5F9; transition: all 0.2s; }
.history-card:hover { border-color: var(--secondary); background: white; transform: scale(1.01); }
.h-info { display: flex; align-items: center; gap: 16px; }
.h-icon { font-size: 32px; background: white; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 16px; box-shadow: var(--shadow-sm); flex-shrink: 0;}
.h-title { font-weight: 800; font-size: 18px; color: var(--text-dark); margin-bottom: 4px; }
.h-sub { font-size: 14px; font-weight: 600; color: var(--text-gray); }
.h-delete { background: var(--danger-light); color: var(--danger-text); border: none; width: 40px; height: 40px; border-radius: 12px; font-size: 20px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
.h-delete:hover { background: #FECACA; transform: scale(1.1) rotate(5deg); }

/* AI TIPS CARDS */
.tips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
.tip-card { padding: 24px; border-radius: 24px; text-align: left; transition: transform 0.2s; position: relative; overflow: hidden;}
.tip-card:hover { transform: translateY(-5px); }
.tip-emoji { font-size: 40px; margin-bottom: 12px; background: rgba(255,255,255,0.5); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 16px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);}
.tip-title { font-size: 18px; font-weight: 800; margin-bottom: 8px; color: var(--text-dark); line-height: 1.3;}
.tip-desc { font-size: 15px; font-weight: 600; line-height: 1.5; color: rgba(0,0,0,0.7); }

.loader-wrapper { display: flex; flex-direction: column; align-items: center; padding: 40px 0; gap: 20px; }
.fun-spinner { font-size: 50px; animation: wobble 1.5s infinite; }
@keyframes wobble { 0%, 100% { transform: rotate(0deg) scale(1); } 25% { transform: rotate(-20deg) scale(1.1); } 50% { transform: rotate(0deg) scale(1); } 75% { transform: rotate(20deg) scale(1.1); } }
.success-message { margin-top: 24px; background: #D1FAE5; color: #065F46; padding: 20px; border-radius: 16px; text-align: center; font-weight: 800; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 10px; animation: fadeIn 0.3s forwards; }
`;

// Helper component for colorful tip cards
const TipCard = ({ icon, title, desc, bg }) => (
  <div className="tip-card" style={{ background: bg }}>
    <div className="tip-emoji">{icon}</div>
    <div className="tip-title">{title}</div>
    <div className="tip-desc">{desc}</div>
  </div>
);

const FriendlyProgressBar = ({ label, value, max, color }) => {
  const percent = Math.min(100, max > 0 ? (value / max) * 100 : 0);
  return (
    <div className="friendly-bar-container">
      <div className="friendly-bar-header">
        <span>{label}</span>
        <span style={{color: color}}>{value.toFixed(1)} kg</span>
      </div>
      <div className="friendly-bar-bg">
        <div className="friendly-bar-fill" style={{ width: percent + "%", backgroundColor: color }}></div>
      </div>
    </div>
  );
};


// 1. Dashboard View
const DashboardView = ({ logs, activeMess, messes }) => {
  const filteredLogs = activeMess === 'All Campus' ? logs : logs.filter(l => l.messName === activeMess);
  
  const totalWaste = filteredLogs.reduce((sum, log) => sum + Number(log.quantity), 0);
  const costLoss = totalWaste * 50; 
  const score = Math.max(0, Math.min(100, 100 - Math.floor(totalWaste * 0.8)));
  const mealsLost = Math.floor(totalWaste * 3.33); 
  
  const typeMap = filteredLogs.reduce((acc, log) => { acc[log.foodType] = (acc[log.foodType] || 0) + Number(log.quantity); return acc; }, {});

  // For leaderboard calculation
  const messWasteMap = messes.reduce((acc, mess) => {
     acc[mess] = logs.filter(l => l.messName === mess).reduce((sum, log) => sum + Number(log.quantity), 0);
     return acc;
  }, {});
  
  const sortedMesses = Object.entries(messWasteMap).sort((a,b) => b[1]-a[1]);

  return (
    <div className="fade-in">
      <div className="score-wrapper">
        <h2 style={{margin: '0 0 20px 0', fontSize: '24px', fontWeight: 800}}>
          {activeMess === 'All Campus' ? 'Total Campus Score 🌟' : `${activeMess} Score 🌟`}
        </h2>
        <div className="score-bubble">
          <span className="score-num">{score}</span>
          <span className="score-text">awesome!</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-emoji">🗑️</div>
          <div className="stat-val">{totalWaste.toFixed(1)} <span style={{fontSize: '18px'}}>kg</span></div>
          <div className="stat-lbl">Food Wasted</div>
        </div>
        <div className="stat-box">
          <div className="stat-emoji">💸</div>
          <div className="stat-val">₹{costLoss.toFixed(0)}</div>
          <div className="stat-lbl">Money Lost</div>
        </div>
        <div className="stat-box">
          <div className="stat-emoji">🍱</div>
          <div className="stat-val" style={{color: '#D97706'}}>{mealsLost}</div>
          <div className="stat-lbl" style={{color: '#D97706'}}>Meals we could have saved</div>
        </div>
      </div>

      {activeMess === 'All Campus' && (
        <div className="card">
          <div className="card-title">
            <div className="card-icon">🏆</div>
            Campus Leaderboard
          </div>
          <p style={{fontWeight: 600, color: 'var(--text-gray)', marginBottom: '24px'}}>Which mess is contributing the most to our waste footprint?</p>
          
          <div className="leaderboard">
            {sortedMesses.map(([mName, mWaste], idx) => {
              let medal = "⭐";
              if(idx === 0) medal = "😢";
              if(idx === sortedMesses.length - 1) medal = "👑"; // lowest waste!
              
              return (
                <div key={mName} className="leader-row" style={idx === sortedMesses.length - 1 ? {borderColor: 'var(--primary)', background: '#F0FDF4'} : {}}>
                  <div className="leader-rank">{idx + 1}</div>
                  <div className="leader-name">{mName}</div>
                  <div className="leader-stat">
                    {mWaste.toFixed(1)}kg <span style={{fontSize: '24px'}}>{medal}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">
          <div className="card-icon">🍕</div>
          What are we throwing away most?
        </div>
        
        {Object.keys(typeMap).length === 0 ? (
          <p style={{fontWeight: 600, color: 'var(--text-gray)'}}>We haven't tracked anything yet. Nice job!</p>
        ) : (
          Object.entries(typeMap).sort((a,b) => b[1]-a[1]).map(([type, qty], i) => {
            const colors = ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#8B5CF6'];
            return <FriendlyProgressBar key={type} label={type} value={qty} max={totalWaste} color={colors[i % colors.length]} />
          })
        )}
      </div>
    </div>
  );
};


// 2. Log View
const LogWasteView = ({ logs, setLogs, activeMess, messes }) => {
  const [foodType, setFoodType] = useState('Rice');
  const [mealSlot, setMealSlot] = useState('Lunch');
  const [quantity, setQuantity] = useState('');
  const [selectedMess, setSelectedMess] = useState(activeMess === 'All Campus' ? messes[0] : activeMess);
  const [showYay, setShowYay] = useState(false);

  // Sync selected mess if global context changes
  React.useEffect(() => {
    if(activeMess !== 'All Campus') setSelectedMess(activeMess);
  }, [activeMess]);

  const saveEntry = (e) => {
    e.preventDefault();
    if(!quantity || isNaN(quantity) || Number(quantity) <= 0) return;
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = days[new Date().getDay()];

    const entry = {
      id: Date.now(),
      messName: selectedMess,
      foodType,
      mealSlot,
      quantity: Number(quantity),
      date: today
    };
    
    setLogs([entry, ...logs]);
    setQuantity('');
    setShowYay(true);
    setTimeout(() => setShowYay(false), 3000);
  };

  const getEmojiForFood = (food) => {
    const map = { 'Rice': '🍚', 'Dal': '🍲', 'Sabzi': '🥗', 'Roti': '🫓', 'Snacks': '🍟', 'Other': '🍽️' };
    return map[food] || '🍽️';
  };
  
  // Only show history for selected mess in log view
  const visibleLogs = logs.filter(l => l.messName === selectedMess);

  return (
    <div className="fade-in">
      <div className="card" style={{border: '4px solid #D1FAE5'}}>
        <div className="card-title">
          <div className="card-icon">📝</div>
          Track New Food Waste
        </div>
        <p style={{fontWeight: 600, marginBottom: '24px', color: 'var(--text-gray)'}}>
          Let's log the leftovers securely so we can help the specific mess cook smarter!
        </p>

        <form onSubmit={saveEntry}>
          
          <label className="input-label">Which Mess are you recording for?</label>
          <select className="input-field" value={selectedMess} onChange={e => setSelectedMess(e.target.value)}>
            {messes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          
          <label className="input-label">What kind of food was it?</label>
          <select className="input-field" value={foodType} onChange={e => setFoodType(e.target.value)}>
            <option>Rice</option>
            <option>Dal</option>
            <option>Sabzi</option>
            <option>Roti</option>
            <option>Snacks</option>
            <option>Other</option>
          </select>

          <label className="input-label">How much? (in kilograms)</label>
          <input 
            type="number" step="0.1"
            className="input-field" 
            placeholder="e.g. 2.5" 
            value={quantity} 
            onChange={e => setQuantity(e.target.value)} 
          />
          
          <label className="input-label">Which meal was this from?</label>
          <div className="pill-options">
            {['Breakfast', 'Lunch', 'Evening', 'Dinner'].map(slot => (
              <button 
                type="button" key={slot} 
                className={"pill-btn " + (mealSlot === slot ? "selected" : "")}
                onClick={() => setMealSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <button type="submit" className="action-btn">
            <span>💾</span> Save to {selectedMess} Records
          </button>
          
          {showYay && (
            <div className="success-message">
              <span style={{fontSize: '24px'}}>🎉</span> Awesome! You're helping {selectedMess} get smarter!
            </div>
          )}
        </form>
      </div>

      <h3 style={{fontSize: '20px', fontWeight: 800, margin: '32px 0 0'}}>Recent Activity for {selectedMess} 🕒</h3>
      <ul className="history-list">
        {visibleLogs.map(log => (
          <li key={log.id} className="history-card">
            <div className="h-info">
              <div className="h-icon">{getEmojiForFood(log.foodType)}</div>
              <div>
                <div className="h-title">{log.quantity} kg of {log.foodType}</div>
                <div className="h-sub">{log.mealSlot} &bull; {log.date}</div>
              </div>
            </div>
            <button type="button" className="h-delete" onClick={() => setLogs(logs.filter(l => l.id !== log.id))} title="Remove entry">×</button>
          </li>
        ))}
        {visibleLogs.length === 0 && <p style={{fontWeight: 700, color: 'var(--text-gray)', textAlign: 'center', padding: '20px'}}>No waste logged recently for this mess!</p>}
      </ul>
    </div>
  );
};


// 3. AI Tips View
const AiTipsView = ({ activeMess, messes, logs }) => {
  const [loading, setLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);

  // Sync effect if context changes while tips are open
  React.useEffect(() => {
    setShowTips(false);
  }, [activeMess]);

  const getTips = () => {
    setLoading(true); setShowTips(false);
    setTimeout(() => { setLoading(false); setShowTips(true); }, 1500);
  };

  const getDynamicTips = () => {
    if (activeMess === 'All Campus') {
      return [
        { bg: "#FEF3C7", icon: "🏢", title: "Standardize Rice Pots", desc: "North Campus Mess is wasting 30% more Rice than South Campus! Consider standardizing pot sizes across campus." },
        { bg: "#D1FAE5", icon: "🌱", title: "Expand South's Composting", desc: "South Campus Mess handles 50% of the campus's organic waste. They need a larger compost bin immediately." },
        { bg: "#DBEAFE", icon: "👥", title: "Shift Girls Hostel Dinner", desc: "Girls Hostel wastes more during dinner. Adjusting their dinner serving timing by 30 mins could drastically help." }
      ];
    } else {
      // Fake dynamic localized tips
      return [
        { bg: "#FEF3C7", icon: "🍚", title: "Cook less Rice for Lunch", desc: `Rice is the #1 wasted item at ${activeMess}! Try making 2 bowls less than usual.` },
        { bg: "#D1FAE5", icon: "🍎", title: "Use Veggie Peels", desc: "Don't throw away potato or carrot peels! Give them to the student gardeners." },
        { bg: "#FCE7F3", icon: "📝", title: "Use Smaller Spoons", desc: "If you physically switch the serving spoon to a smaller size, total waste drops automatically!" }
      ];
    }
  };

  return (
    <div className="fade-in card">
      <div className="card-title" style={{fontSize: '28px', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center'}}>
        <span style={{fontSize: '64px', animation: 'bounce 2s infinite'}}>💡</span>
        Smart Tips for {activeMess}!
      </div>
      <p style={{textAlign: 'center', fontSize: '18px', fontWeight: 600, color: 'var(--text-gray)', marginBottom: '40px'}}>
        Our friendly AI bot looks at the specific footprint of {activeMess}, and generates tailored, simple fixes!
      </p>

      {!showTips && !loading && (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button className="action-btn" style={{maxWidth: '400px'}} onClick={getTips}>
            ✨ Analyze {activeMess} Traffic
          </button>
        </div>
      )}

      {loading && (
        <div className="loader-wrapper">
          <div className="fun-spinner">🤖</div>
          <h3 style={{margin: 0, color: 'var(--primary)', fontWeight: 800}}>Looking into the local data...</h3>
        </div>
      )}

      {showTips && (
        <div className="fade-in">
          <div className="tips-grid">
             {getDynamicTips().map((t, i) => (
                <TipCard key={i} bg={t.bg} icon={t.icon} title={t.title} desc={t.desc} />
             ))}
          </div>
          
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
            <button className="pill-btn selected" onClick={() => setShowTips(false)}>Close Analysis</button>
          </div>
        </div>
      )}
    </div>
  );
};


// 4. Learn View
const LearnView = () => (
  <div className="fade-in card">
    <div className="card-title"><div className="card-icon">📚</div> Learn Good Habits!</div>
    <p style={{fontWeight: 700, fontSize: '16px', color: 'var(--text-gray)', marginBottom: '32px'}}>
      Whether you work in the North Mess or South Mess, these standard practices keep us perfectly green!
    </p>

    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      {[
        { i: '🍽️', t: 'Serve Small, Refill Free', d: 'Always give a small amount first. Students can come back for more if they are still hungry!' },
        { i: '🔥', t: 'Cook Slowly at the End', d: 'When it gets close to closing time, only make fresh food if students are actively waiting.' },
        { i: '🤝', t: 'Share Leftovers', d: 'If we have untouched, clean food left, we pack it and send it to local shelters immediately.' },
        { i: '🌱', t: 'Compost is Food for Plants', d: 'Food scraps are super healthy for our campus trees! Put scraps in the green bin, not the black bin.' }
      ].map((item, idx) => (
        <div key={idx} style={{display: 'flex', gap: '20px', padding: '20px', background: '#F8FAFC', borderRadius: '20px', alignItems: 'center'}}>
           <div style={{fontSize: '40px'}}>{item.i}</div>
           <div>
             <h4 style={{margin: '0 0 4px', fontSize: '18px', fontWeight: 800, color: 'var(--text-dark)'}}>{item.t}</h4>
             <p style={{margin: 0, fontWeight: 600, color: 'var(--text-gray)'}}>{item.d}</p>
           </div>
        </div>
      ))}
    </div>
  </div>
);


// 5. Survey View
const SurveyView = () => (
  <div className="fade-in">
    <div className="card" style={{border: '4px solid #FDE68A'}}>
      <div className="card-title"><div className="card-icon">🤔</div> What did students say?</div>
      <p style={{fontWeight: 700, marginBottom: '24px'}}>We walked around campus visiting all the messes and asked everyone about the food. Here is what we found:</p>
      
      <ul style={{fontSize: '16px', fontWeight: 700, color: 'var(--text-dark)', lineHeight: '2', paddingLeft: '20px', margin: 0}}>
        <li><span style={{fontSize: '20px'}}>❌</span> Canteens have zero communication with each other about over-catering.</li>
        <li><span style={{fontSize: '20px'}}>🚮</span> Food scraps and plastic wrappers are being thrown in the exact same dustbin.</li>
        <li><span style={{fontSize: '20px'}}>🥡</span> A lot of perfectly good food gets tossed because there's no system to share it before it spoils.</li>
        <li style={{color: 'var(--primary)'}}><span style={{fontSize: '20px'}}>✅</span> Good news: The mess workers said they would eagerly use a multi-canteen app to track their specific locations!</li>
      </ul>
    </div>
  </div>
);


// 6. About View
const ObjectiveView = () => (
  <div className="fade-in card" style={{textAlign: 'center', background: 'white', padding: '60px 40px'}}>
    <div style={{fontSize: '80px', marginBottom: '20px'}}>👋🌍</div>
    <h2 style={{fontSize: '32px', margin: '0 0 20px', fontWeight: 900}}>Welcome to WasteWise!</h2>
    <p style={{fontSize: '18px', fontWeight: 600, color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6}}>
      Our goal is to stitch all the individual campus messes together into one massive, smart, unified eco-friendly ecosystem! 
      By comparing, tracking, and assisting each location, we solve global problems right here at home.
    </p>

    <h3 style={{fontSize: '20px', fontWeight: 800, margin: '0 0 24px'}}>We help our campus achieve the UN Global Goals:</h3>
    
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'left'}}>
      <div style={{background: '#FEF3C7', padding: '24px', borderRadius: '24px'}}>
        <div style={{fontSize: '32px', fontWeight: 900, color: '#D97706'}}>Goal 2</div>
        <h4 style={{margin: '10px 0 5px', fontSize: '18px', fontWeight: 800}}>Zero Hunger</h4>
        <p style={{margin: 0, fontWeight: 600, fontSize: '14px', color: '#B45309'}}>Making sure fresh extra food from any mess goes to people, not the trash.</p>
      </div>

      <div style={{background: '#FFEDD5', padding: '24px', borderRadius: '24px'}}>
        <div style={{fontSize: '32px', fontWeight: 900, color: '#C2410C'}}>Goal 12</div>
        <h4 style={{margin: '10px 0 5px', fontSize: '18px', fontWeight: 800}}>Responsible Choice</h4>
        <p style={{margin: 0, fontWeight: 600, fontSize: '14px', color: '#9A3412'}}>Buying, cooking, and eating only what we really need locally.</p>
      </div>

      <div style={{background: '#D1FAE5', padding: '24px', borderRadius: '24px'}}>
        <div style={{fontSize: '32px', fontWeight: 900, color: '#047857'}}>Goal 13</div>
        <h4 style={{margin: '10px 0 5px', fontSize: '18px', fontWeight: 800}}>Climate Love</h4>
        <p style={{margin: 0, fontWeight: 600, fontSize: '14px', color: '#065F46'}}>Less food in the trash dump means a cleaner, cooler Earth!</p>
      </div>
    </div>
  </div>
);


// MAIN PARENT
export default function WasteWise() {
  const messes = ['North Campus Mess', 'South Campus Mess', 'Girls Hostel Mess', 'Boys Hostel Mess'];
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeMess, setActiveMess] = useState('All Campus'); 
  
  const [logs, setLogs] = useState([
    { id: 1, messName: 'North Campus Mess', foodType: 'Rice', mealSlot: 'Lunch', quantity: 12.5, date: 'Mon' },
    { id: 2, messName: 'South Campus Mess', foodType: 'Dal', mealSlot: 'Lunch', quantity: 5.2, date: 'Tue' },
    { id: 3, messName: 'Girls Hostel Mess', foodType: 'Sabzi', mealSlot: 'Evening', quantity: 8.8, date: 'Wed' },
    { id: 4, messName: 'Boys Hostel Mess', foodType: 'Roti', mealSlot: 'Dinner', quantity: 6.0, date: 'Thu' },
    { id: 5, messName: 'North Campus Mess', foodType: 'Dal', mealSlot: 'Dinner', quantity: 14.1, date: 'Fri' },
    { id: 6, messName: 'Girls Hostel Mess', foodType: 'Snacks', mealSlot: 'Evening', quantity: 4.5, date: 'Mon' },
  ]);

  const tabs = [
    { id: 'dashboard', label: 'My Impact', icon: '🌍' },
    { id: 'log', label: 'Log Waste', icon: '📝' },
    { id: 'ai', label: 'Smart Tips', icon: '💡' },
    { id: 'practices', label: 'Learn', icon: '📚' },
    { id: 'survey', label: 'Survey', icon: '📊' },
    { id: 'objective', label: 'About Us', icon: '👋' },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="app-container">
        
        <div className="header">
          <div className="logo">🌱</div>
          <h1 className="title">WasteWise</h1>
          <p className="subtitle">Unifying all campus messes to turn perfectly green!</p>
        </div>

        {/* CLOUD CONTEXT SWITCHER */}
        <div className="context-picker-wrapper">
          <label className="context-picker-lbl">Currently Viewing Data For</label>
          <select 
            className="context-picker"
            value={activeMess}
            onChange={(e) => setActiveMess(e.target.value)}
          >
            <option value="All Campus">🌍 Entire Campus (Overview)</option>
            {messes.map(m => (
              <option key={m} value={m}>🏢 {m}</option>
            ))}
          </select>
        </div>

        <div className="nav-container">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={"tab-btn " + (activeTab === tab.id ? "active" : "")}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <main style={{marginTop: '10px'}}>
          {activeTab === 'dashboard' && <DashboardView logs={logs} activeMess={activeMess} messes={messes} />}
          {activeTab === 'log' && <LogWasteView logs={logs} setLogs={setLogs} activeMess={activeMess} messes={messes} />}
          {activeTab === 'ai' && <AiTipsView activeMess={activeMess} messes={messes} logs={logs} />}
          {activeTab === 'practices' && <LearnView />}
          {activeTab === 'survey' && <SurveyView />}
          {activeTab === 'objective' && <ObjectiveView />}
        </main>
        
      </div>
    </>
  );
}
