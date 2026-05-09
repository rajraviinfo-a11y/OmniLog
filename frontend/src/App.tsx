import { useState } from 'react';
import { Mic, Image as ImageIcon, Send, Flame, Wallet, ShoppingBag } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    console.log('Sending to AI parser:', inputText);
    setInputText('');
  };

  return (
    <div className="app-container">
      <header>
        <h1>OmniLog</h1>
        <div className="profile-pic" style={{ backgroundImage: 'linear-gradient(45deg, #8b5cf6, #ec4899)' }}>
          R
        </div>
      </header>

      <main>
        {/* Diet Macros Card */}
        <div className="glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <Flame size={20} color="#ec4899" />
              Remaining Macros
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Today</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#8b5cf6', fontSize: '20px', fontWeight: 'bold' }}>50g</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Protein</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#ec4899', fontSize: '20px', fontWeight: 'bold' }}>120g</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Carbs</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#f59e0b', fontSize: '20px', fontWeight: 'bold' }}>45g</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Fat</div>
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <Wallet size={20} color="#10b981" />
              Recent Expenses
            </h2>
          </div>
          <div className="card-value" style={{ color: '#10b981' }}>$1,240.50</div>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Next daily need: Cooking Gas in 3 days
          </p>
        </div>

        {/* Inventory Quick Glance */}
        <div className="glass-card">
          <div className="card-header">
            <h2 className="card-title">
              <ShoppingBag size={20} color="#f59e0b" />
              Inventory Alerts
            </h2>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-primary)' }}>Milk (2L)</span>
              <span style={{ color: '#ef4444', fontSize: '12px', background: 'rgba(239, 68, 68, 0.2)', padding: '2px 8px', borderRadius: '12px' }}>Low</span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-primary)' }}>Rice (5kg)</span>
              <span style={{ color: '#10b981', fontSize: '12px', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 8px', borderRadius: '12px' }}>Good</span>
            </li>
          </ul>
        </div>
      </main>

      {/* Unified AI Input Bar */}
      <div className="input-bar-container">
        <form className={`input-bar ${isListening ? 'listening' : ''}`} onSubmit={handleSubmit}>
          <button type="button" className="icon-btn">
            <ImageIcon size={20} />
          </button>
          
          <input 
            type="text" 
            placeholder="Log expense, meal, or grocery..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          
          {inputText ? (
            <button type="submit" className="primary-btn">
              <Send size={18} />
            </button>
          ) : (
            <button 
              type="button" 
              className="primary-btn"
              onClick={() => setIsListening(!isListening)}
            >
              <Mic size={18} />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default App
