import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Mic, Image as ImageIcon, Send } from 'lucide-react';
import { useAI } from './hooks/useAI';

import Dashboard from './screens/Dashboard';
import Inventory from './screens/Inventory';
import Expenses from './screens/Expenses';
import Diet from './screens/Diet';
import BottomNav from './components/BottomNav';

function App() {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { processing, submitInput } = useAI();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    try {
      const result = await submitInput(inputText);
      console.log('AI Parsed:', result);
      
      // Auto-navigate based on category
      if (result.parsed_intent.category === 'Expense') navigate('/expenses');
      if (result.parsed_intent.category === 'Inventory') navigate('/inventory');
      if (result.parsed_intent.category === 'Consumption') navigate('/diet');
      
    } catch (err) {
      console.error('Failed to parse input', err);
    } finally {
      setInputText('');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>OmniLog</h1>
        <div className="profile-pic" style={{ backgroundImage: 'linear-gradient(45deg, #8b5cf6, #ec4899)' }}>
          R
        </div>
      </header>

      <main className="content-area">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/diet" element={<Diet />} />
        </Routes>
      </main>

      <div className="input-bar-container" style={{ bottom: '80px' }}>
        <form className={`input-bar ${isListening ? 'listening' : ''}`} onSubmit={handleSubmit}>
          <button type="button" className="icon-btn">
            <ImageIcon size={20} />
          </button>
          
          <input 
            type="text" 
            placeholder={processing ? "Processing..." : "Log expense, meal, or grocery..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={processing}
          />
          
          {inputText ? (
            <button type="submit" className="primary-btn" disabled={processing}>
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

      <BottomNav />
    </div>
  )
}

export default App
