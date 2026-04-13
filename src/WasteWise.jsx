import React, { useState, useEffect } from 'react';

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.ww-container {
  max-width: 420px;
  margin: 0 auto;
  background-color: #f4f9f6;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, sans-serif;
  color: #1b4332;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}

.ww-container * {
  box-sizing: border-box;
}

.ww-header {
  background: #1b4332;
  color: #fff;
  padding: 24px 20px;
  text-align: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.ww-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.ww-header p {
  margin: 6px 0 0;
  font-size: 14px;
  opacity: 0.9;
}

.ww-nav {
  display: flex;
  overflow-x: auto;
  padding: 16px 20px;
  gap: 8px;
  scrollbar-width: none;
  background: transparent;
}
.ww-nav::-webkit-scrollbar {
  display: none;
}
.ww-nav-btn {
  background: #fff;
  border: 1px solid #e5e7eb;
  padding: 10px 16px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.ww-nav-btn.active {
  background: #2d6a4f;
  color: #fff;
  border-color: #2d6a4f;
  box-shadow: 0 4px 8px rgba(45, 106, 79, 0.2);
}

.ww-content {
  padding: 0 20px 40px;
  flex: 1;
}

.animate-fade {
  animation: fadeIn 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.ww-card {
  background: #fff;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  border: 1px solid #f3f4f6;
  overflow: hidden;
  padding: 20px;
}

.ww-card-title {
  margin: 0 0 16px 0;
  font-size: 17px;
  font-weight: 600;
  color: #1b4332;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ww-stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.ww-stat-box {
  background: #f0f7f4;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid #e2efe8;
}
.ww-stat-box.highlight {
  background: #e0f2e9;
  border-color: #c2e2d3;
}
.ww-stat-value {
  font-size: 22px;
  font-weight: 700;
  color: #1b4332;
}
.ww-stat-label {
  font-size: 11px;
  color: #52b788;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ww-score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 8px solid #52b788;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto 24px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(82, 183, 136, 0.2);
}
.ww-score-num {
  font-size: 36px;
  font-weight: 800;
  color: #1b4332;
  line-height: 1;
}
.ww-score-label {
  font-size: 11px;
  color: #52b788;
  font-weight: 700;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ww-bar-wrap {
  margin-bottom: 14px;
}
.ww-bar-wrap:last-child {
  margin-bottom: 0;
}
.ww-bar-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 6px;
  font-weight: 500;
  color: #4b5563;
}
.ww-bar-bg {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}
.ww-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.ww-trend-grid {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 140px;
  padding-top: 20px;
  justify-content: space-between;
}
.ww-trend-bar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}
.ww-trend-bar {
  width: 100%;
  background: #52b788;
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  transition: height 0.5s ease;
}
.ww-trend-label {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}
.ww-trend-val {
  font-size: 11px;
  color: #1b4332;
  font-weight: 600;
}

.ww-input {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  margin-bottom: 16px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.2s;
  color: #1b4332;
}
.ww-input:focus {
  outline: none;
  border-color: #52b788;
  box-shadow: 0 0 0 3px rgba(82, 183, 136, 0.2);
}

.ww-form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ww-pill-group {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.ww-pill {
  padding: 10px 16px;
  border-radius: 20px;
  border: 1px solid #d1d5db;
  background: white;
  color: #4b5563;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}
.ww-pill.active {
  background: #e0f2e9;
  border-color: #2d6a4f;
  color: #1b4332;
  font-weight: 600;
}

.ww-btn {
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  background: #2d6a4f;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(45, 106, 79, 0.2);
}
.ww-btn:active {
  transform: scale(0.98);
}
.ww-btn:hover {
  background: #1b4332;
}
.ww-btn.outline {
  background: #fff;
  color: #2d6a4f;
  border: 2px solid #2d6a4f;
  box-shadow: none;
}
.ww-btn.outline:hover {
  background: #f0f7f4;
}

.ww-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.ww-list-item {
  padding: 16px;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
}
.ww-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.ww-item-title {
  font-weight: 600;
  color: #1b4332;
  font-size: 15px;
}
.ww-item-meta {
  font-size: 13px;
  color: #6b7280;
}
.ww-delete-btn {
  color: #ef4444;
  background: #fee2e2;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 18px;
  line-height: 1;
}
.ww-delete-btn:hover {
  background: #fecaca;
}

.ww-ai-card {
  background: linear-gradient(145deg, #ffffff, #f0f7f4);
  border-left: 4px solid #52b788;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.spinner {
  border: 3px solid rgba(82, 183, 136, 0.2);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-left-color: #2d6a4f;
  animation: spin 1s linear infinite;
}
@keyframes spin { 
  0% { transform: rotate(0deg); } 
  100% { transform: rotate(360deg); } 
}
`;

// reusable components
const Card = ({ children, style, className = '' }) => (
  <div className={\`ww-card \${className}\`} style={style}>
    {children}
  </div>
);

const SectionTitle = ({ children, icon }) => (
  <h3 className="ww-card-title">
    {icon && <span style={{fontSize: '20px'}}>{icon}</span>}
    {children}
  </h3>
);

// views
const DashboardView = ({ logs }) => {
  const totalWaste = logs.reduce((sum, log) => sum + Number(log.quantity), 0);
  
  // Example dummy data for last week to demonstrate comparison calculations
  const lastWeekWaste = 45; 
  const diff = totalWaste - lastWeekWaste;
  const diffPercent = Math.abs((diff / lastWeekWaste) * 100).toFixed(1);
  const isIncrease = diff > 0;
  
  const costLoss = totalWaste * 50; // assuming avg 50 rupees per kg
  const co2Impact = (totalWaste * 2.5).toFixed(1); // approx 2.5kg CO2 per kg food waste
  const waterWasted = totalWaste * 1000; // liters in agricultural loss
  const mealsLost = Math.floor(totalWaste * 3.33); // approx 300g per meal
  
  // Dummy sustainability score logic
  const score = Math.max(0, Math.min(100, 100 - Math.floor(totalWaste * 0.8)));

  const typeMap = logs.reduce((acc, log) => {
    acc[log.foodType] = (acc[log.foodType] || 0) + Number(log.quantity);
    return acc;
  }, {});
  
  const slotMap = logs.reduce((acc, log) => {
    acc[log.mealSlot] = (acc[log.mealSlot] || 0) + Number(log.quantity);
    return acc;
  }, {});

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const trendMap = logs.reduce((acc, log) => {
    acc[log.date] = (acc[log.date] || 0) + Number(log.quantity);
    return acc;
  }, {});
  
  const maxTrend = Math.max(...Object.values(trendMap), 10); 

  const ProgressBar = ({ label, value, max, color }) => {
    const percent = Math.min(100, (value / max) * 100);
    return (
      <div className="ww-bar-wrap">
        <div className="ww-bar-head">
          <span>{label}</span>
          <strong>{value} kg</strong>
        </div>
        <div className="ww-bar-bg">
          <div className="ww-bar-fill" style={{ width: \`\${percent}%\`, backgroundColor: color }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade">
      <div className="ww-score-circle">
        <div className="ww-score-num">{score}</div>
        <div className="ww-score-label">Eco Score</div>
      </div>

      <Card>
        <SectionTitle icon="📊">Weekly Overview</SectionTitle>
        <div className="ww-stat-grid">
          <div className="ww-stat-box highlight">
            <span className="ww-stat-label">Total Waste</span>
            <span className="ww-stat-value">{totalWaste} kg</span>
          </div>
          <div className="ww-stat-box">
            <span className="ww-stat-label">Cost Loss</span>
            <span className="ww-stat-value">₹{costLoss}</span>
          </div>
        </div>
        <div style={{ marginTop: '14px', fontSize: '13px', color: isIncrease ? '#EF4444' : '#10B981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isIncrease ? '↑' : '↓'} {diffPercent}% {isIncrease ? 'increase' : 'reduction'} from last week
        </div>
      </Card>

      <Card>
        <SectionTitle icon="🌍">Environmental Impact</SectionTitle>
        <div className="ww-stat-grid">
          <div className="ww-stat-box">
            <span style={{ fontSize: '20px', marginBottom: '4px' }}>☁️</span>
            <span className="ww-stat-label">CO₂ Output</span>
            <span className="ww-stat-value" style={{ fontSize: '18px' }}>{co2Impact} kg</span>
          </div>
          <div className="ww-stat-box">
            <span style={{ fontSize: '20px', marginBottom: '4px' }}>💧</span>
            <span className="ww-stat-label">Water Lost</span>
            <span className="ww-stat-value" style={{ fontSize: '18px' }}>{waterWasted} L</span>
          </div>
          <div className="ww-stat-box" style={{ gridColumn: 'span 2' }}>
            <span style={{ fontSize: '20px', marginBottom: '4px' }}>🍱</span>
            <span className="ww-stat-label">Equivalent Meals Lost</span>
            <span className="ww-stat-value">{mealsLost} meals</span>
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle>Waste by Food Type</SectionTitle>
        {Object.entries(typeMap).sort((a,b) => b[1]-a[1]).map(([type, qty]) => (
          <ProgressBar key={type} label={type} value={qty} max={totalWaste} color="#52b788" />
        ))}
        {Object.keys(typeMap).length === 0 && <p style={{fontSize: '14px', color: '#6b7280'}}>No data available yet.</p>}
      </Card>

      <Card>
        <SectionTitle>Waste by Meal Slot</SectionTitle>
        {Object.entries(slotMap).sort((a,b) => b[1]-a[1]).map(([slot, qty]) => (
          <ProgressBar key={slot} label={slot} value={qty} max={totalWaste} color="#e5a52e" />
        ))}
        {Object.keys(slotMap).length === 0 && <p style={{fontSize: '14px', color: '#6b7280'}}>No data available yet.</p>}
      </Card>

      <Card>
        <SectionTitle>Weekly Trend</SectionTitle>
        <div className="ww-trend-grid">
          {days.map(day => {
            const val = trendMap[day] || 0;
            const height = Math.max(4, (val / maxTrend) * 100);
            return (
              <div key={day} className="ww-trend-bar-wrap">
                <span className="ww-trend-val">{val > 0 ? val : ''}</span>
                <div className="ww-trend-bar" style={{ height: \`\${height}%\`, opacity: val > 0 ? 1 : 0.4 }}></div>
                <span className="ww-trend-label">{day}</span>
              </div>
            )
          })}
        </div>
      </Card>
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
    
    // Simulate mapping to the current day for trend graph visuals
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDay = days[new Date().getDay()];

    const newLog = {
      id: Date.now(),
      foodType,
      mealSlot,
      quantity: Number(quantity),
      date: currentDay === 'Sun' ? 'Mon' : currentDay // default to valid week days for simple mock
    };
    
    setLogs([newLog, ...logs]);
    setQuantity('');
    setMsg('✅ Waste entry logged successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const deleteLog = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  return (
    <div className="animate-fade">
      <Card>
        <SectionTitle icon="✍️">Log New Entry</SectionTitle>
        <form onSubmit={submitLog}>
          <label className="ww-form-label">Food Type</label>
          <select className="ww-input" value={foodType} onChange={e => setFoodType(e.target.value)}>
            <option>Rice</option>
            <option>Dal</option>
            <option>Sabzi</option>
            <option>Roti</option>
            <option>Snacks</option>
            <option>Other</option>
          </select>
          
          <label className="ww-form-label">Meal Slot</label>
          <div className="ww-pill-group">
            {['Breakfast', 'Lunch', 'Evening', 'Dinner'].map(slot => (
              <button 
                type="button" 
                key={slot} 
                className={\`ww-pill \${mealSlot === slot ? 'active' : ''}\`}
                onClick={() => setMealSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>

          <label className="ww-form-label">Quantity (in kg)</label>
          <input 
            type="number" 
            step="0.1"
            className="ww-input" 
            placeholder="e.g. 2.5" 
            value={quantity} 
            onChange={e => setQuantity(e.target.value)} 
          />

          <button type="submit" className="ww-btn">Submit Log</button>
          
          {msg && <div style={{marginTop: '16px', color: '#10B981', fontSize: '14px', textAlign: 'center', fontWeight: '600'}}>{msg}</div>}
        </form>
      </Card>

      <Card>
        <SectionTitle icon="📋">Recent Entries</SectionTitle>
        <ul className="ww-list">
          {logs.map(log => (
            <li key={log.id} className="ww-list-item">
              <div className="ww-item-info">
                <span className="ww-item-title">{log.foodType} &bull; {log.quantity} kg</span>
                <span className="ww-item-meta">{log.mealSlot} &bull; {log.date}</span>
              </div>
              <button type="button" className="ww-delete-btn" onClick={() => deleteLog(log.id)} title="Delete entry">×</button>
            </li>
          ))}
          {logs.length === 0 && <p style={{fontSize: '14px', color: '#6b7280'}}>No logs available.</p>}
        </ul>
      </Card>
    </div>
  );
};

const AiRecommendationsView = ({ logs }) => {
  const [loading, setLoading] = useState(false);
  const [showRecs, setShowRecs] = useState(false);
  const [error, setError] = useState('');

  const fetchAIRecommendations = () => {
    setLoading(true);
    setError('');
    setShowRecs(false);
    
    // Simulate AI analysis delay and potential failure
    setTimeout(() => {
      setLoading(false);
      // 10% chance to simulate API error for true robustness testing
      if (Math.random() > 0.9) {
        setError('Network Error: Unable to reach AI service due to connection timeout. Please try again.');
      } else {
        setShowRecs(true);
      }
    }, 1800);
  };

  const aiSuggestions = [
    { icon: '📉', title: 'Reduce Rice Preparation', desc: 'Rice accounts for highest waste. Scale down lunch batch sizes by 10%.', impact: '20% reduction' },
    { icon: '♻️', title: 'Start Composting Prep Waste', desc: 'Vegetable peels from sabzi preparation can be composted locally.', impact: '10% reduction' },
    { icon: '🍲', title: 'Repurpose Leftover Dal', desc: 'Store unused, safe dal for breakfast recipes like parathas.', impact: '15% reduction' },
    { icon: '📢', title: 'Portion Control Signage', desc: 'Add visual cues near serving areas to guide students towards smaller plates.', impact: '5% reduction' },
  ];

  return (
    <div className="animate-fade">
      <Card>
        <SectionTitle icon="🤖">AI Insights</SectionTitle>
        <p style={{fontSize: '14px', color: '#4b5563', lineHeight: '1.5', marginBottom: '24px'}}>
          Our intelligent AI agent analyzes your canteen's daily waste patterns to provide tailored recommendations to maximize efficiency.
        </p>
        
        {!showRecs && !loading && (
          <button className="ww-btn" onClick={fetchAIRecommendations}>
            ✨ Get AI Recommendations
          </button>
        )}
        
        {loading && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', gap: '16px'}}>
            <div className="spinner"></div>
            <p style={{fontSize: '14px', color: '#6b7280', fontWeight: '500'}}>Analyzing waste patterns...</p>
          </div>
        )}

        {error && (
          <div style={{ padding: '16px', background: '#fee2e2', color: '#ef4444', borderRadius: '12px', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', lineHeight: '1.5' }}>
            <span>⚠️</span> {error}
          </div>
        )}

        {error && !loading && (
           <button className="ww-btn outline" style={{marginTop: '16px'}} onClick={fetchAIRecommendations}>Retry Analysis</button>
        )}

        {showRecs && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {aiSuggestions.map((s, i) => (
              <div key={i} className="ww-card ww-ai-card" style={{ marginBottom: 0, padding: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '28px', lineHeight: 1 }}>{s.icon}</span>
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', color: '#1b4332', fontSize: '15px' }}>{s.title}</h4>
                    <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#4b5563', lineHeight: '1.5' }}>{s.desc}</p>
                    <span style={{ fontSize: '12px', color: '#2d6a4f', fontWeight: '700', backgroundColor: '#e0f2e9', padding: '4px 10px', borderRadius: '12px', display: 'inline-block' }}>
                      Expected Impact: {s.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button className="ww-btn outline" style={{marginTop: '12px'}} onClick={() => setShowRecs(false)}>Reset Analysis</button>
          </div>
        )}
      </Card>
    </div>
  );
};

const PracticesView = () => {
  const practices = [
    { title: 'Portion Control', desc: 'Serve smaller base portions and encourage students to take second helpings instead of a massive initial serving.' },
    { title: 'Reduce Batch Cooking', desc: 'Cook in smaller batches towards the end of the meal slot to prevent vast leftover pots.' },
    { title: 'Food Donation', desc: 'Partner with local NGOs to immediately distribute safe, untouched leftovers.' },
    { title: 'Composting', desc: 'Set up an in-campus composting pit for organic food waste and kitchen scraps to use as fertilizer for campus flora.' },
    { title: 'Waste Monitoring', desc: 'Make waste statistics visible on screens outside the dining hall to actively raise student awareness.' },
  ];

  return (
    <div className="animate-fade">
      <Card>
        <SectionTitle icon="🌱">Sustainable Practices</SectionTitle>
        <p style={{fontSize: '14px', color: '#4b5563', marginBottom: '24px', lineHeight: '1.5'}}>
          Following these best practices can drastically reduce footprint and align operations with formal sustainability goals.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {practices.map((p, i) => (
            <div key={i} style={{ borderLeft: '4px solid #74c69d', paddingLeft: '14px' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#1b4332', fontSize: '15px' }}>{p.title}</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const SurveyView = () => {
  return (
    <div className="animate-fade">
      <Card>
        <SectionTitle icon="📋">Key Survey Findings</SectionTitle>
        <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
          <li style={{marginBottom: '8px'}}><strong>No Baseline Tracking:</strong> Currently, no numerical tracking exists for daily food discard.</li>
          <li style={{marginBottom: '8px'}}><strong>No Segregation:</strong> Wet and dry waste are currently mixed, making composting efforts highly difficult.</li>
          <li style={{marginBottom: '8px'}}><strong>No Redistribution:</strong> Surplus untouched food is dumped rather than being donated locally.</li>
          <li style={{marginBottom: '8px'}}><strong>High Waste Items:</strong> Standard staples like Rice, Dal, and Sabzi consistently constitute the bulk of the waste.</li>
          <li><strong>Staff Readiness:</strong> A promising 85% of canteen staff surveyed are open to executing a digital solution if it’s simple to use.</li>
        </ul>
      </Card>

      <Card style={{ background: '#1b4332', color: 'white', border: 'none' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#74c69d' }}>Survey Conclusion</h3>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', opacity: 0.9 }}>
          The lack of a centralized monitoring system consistently leads to massive resource drain in terms of monetary cost, water, and emissions.
          Implementing a monitoring system like WasteWise provides a much-needed baseline measurement and enables data-driven decisions while perfectly aligning our campus operations with core SDGs.
        </p>
      </Card>
    </div>
  );
};

const ObjectiveView = () => {
  return (
    <div className="animate-fade">
      <Card style={{ textAlign: 'center', padding: '32px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
        <SectionTitle>Project Objective</SectionTitle>
        <p style={{ margin: '0 auto', fontSize: '14px', color: '#4b5563', lineHeight: '1.6', maxWidth: '320px' }}>
          WasteWise aims to build a culture of genuine sustainability within our campus dining facilities. By providing actionable insights into daily wastage, we focus on driving behavioral change and fundamentally reducing our environmental footprint.
        </p>
      </Card>

      <Card>
        <SectionTitle icon="🌍">SDG Alignment</SectionTitle>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: '#e5a52e', color: 'white', fontWeight: 'bold', minWidth: '44px', height: '44px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>2</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px', color: '#1b4332', marginBottom: '2px' }}>Zero Hunger</strong>
              <span style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.4', display: 'block' }}>Optimizing food use to comprehensively prevent aggregate loss.</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: '#bf8b2e', color: 'white', fontWeight: 'bold', minWidth: '44px', height: '44px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>12</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px', color: '#1b4332', marginBottom: '2px' }}>Responsible Consumption</strong>
              <span style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.4', display: 'block' }}>Tracking and rigorously reducing culinary waste.</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: '#3f7e44', color: 'white', fontWeight: 'bold', minWidth: '44px', height: '44px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>13</div>
            <div>
              <strong style={{ display: 'block', fontSize: '15px', color: '#1b4332', marginBottom: '2px' }}>Climate Action</strong>
              <span style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.4', display: 'block' }}>Lowering harmful CO₂ emissions sourced from landfills.</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Main Export Component
export default function WasteWise() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Pre-seed some sample data
  const [logs, setLogs] = useState([
    { id: 1, foodType: 'Rice', mealSlot: 'Lunch', quantity: 12, date: 'Mon' },
    { id: 2, foodType: 'Dal', mealSlot: 'Lunch', quantity: 5, date: 'Tue' },
    { id: 3, foodType: 'Sabzi', mealSlot: 'Evening', quantity: 8, date: 'Wed' },
    { id: 4, foodType: 'Roti', mealSlot: 'Dinner', quantity: 6, date: 'Thu' },
    { id: 5, foodType: 'Rice', mealSlot: 'Dinner', quantity: 14, date: 'Fri' },
  ]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'log', label: 'Log Waste', icon: '✍️' },
    { id: 'ai', label: 'AI Advice', icon: '🤖' },
    { id: 'practices', label: 'Practices', icon: '🌱' },
    { id: 'survey', label: 'Survey', icon: '📋' },
    { id: 'objective', label: 'Mission', icon: '🎯' },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="ww-container">
        <header className="ww-header">
          <h1>🌍 WasteWise</h1>
          <p>College Canteen Sustainability Tracker</p>
        </header>
        
        <nav className="ww-nav">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={\`ww-nav-btn \${activeTab === tab.id ? 'active' : ''}\`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>
        
        <main className="ww-content">
          {activeTab === 'dashboard' && <DashboardView logs={logs} />}
          {activeTab === 'log' && <LogWasteView logs={logs} setLogs={setLogs} />}
          {activeTab === 'ai' && <AiRecommendationsView logs={logs} />}
          {activeTab === 'practices' && <PracticesView />}
          {activeTab === 'survey' && <SurveyView />}
          {activeTab === 'objective' && <ObjectiveView />}
        </main>
      </div>
    </>
  );
}
