import React, { useMemo } from 'react';
import { Flame, Wallet, ShoppingBag } from 'lucide-react';
import { useInventory } from '../hooks/useInventory';
import { useExpenses } from '../hooks/useExpenses';
import { useDiet } from '../hooks/useDiet';

export default function Dashboard() {
  const { inventory } = useInventory();
  const { expenses } = useExpenses();
  const { logs } = useDiet();

  const expenseTotal = useMemo(() => 
    expenses.reduce((acc, curr) => acc + curr.amount, 0),
  [expenses]);

  const macros = useMemo(() => {
    let p = 0, c = 0, f = 0;
    logs.forEach((log) => {
      if (log.macros) {
        try {
          const m = JSON.parse(log.macros);
          p += m.protein || 0;
          c += m.carbs || 0;
          f += m.fat || 0;
        } catch (e) {}
      }
    });
    return { protein: p, carbs: c, fat: f };
  }, [logs]);

  return (
    <>
      <div className="glass-card">
        <div className="card-header">
          <h2 className="card-title">
            <Flame size={20} color="#ec4899" />
            Consumed Macros
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Today</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#8b5cf6', fontSize: '20px', fontWeight: 'bold' }}>{macros.protein}g</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Protein</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#ec4899', fontSize: '20px', fontWeight: 'bold' }}>{macros.carbs}g</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Carbs</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#f59e0b', fontSize: '20px', fontWeight: 'bold' }}>{macros.fat}g</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Fat</div>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="card-header">
          <h2 className="card-title">
            <Wallet size={20} color="#10b981" />
            Total Expenses
          </h2>
        </div>
        <div className="card-value" style={{ color: '#10b981' }}>${expenseTotal.toFixed(2)}</div>
      </div>

      <div className="glass-card">
        <div className="card-header">
          <h2 className="card-title">
            <ShoppingBag size={20} color="#f59e0b" />
            Inventory Quick View
          </h2>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {inventory.slice(0, 3).map((item) => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-primary)' }}>{item.item_name} ({item.quantity}{item.unit})</span>
              {item.quantity < 2 ? (
                <span style={{ color: '#ef4444', fontSize: '12px', background: 'rgba(239, 68, 68, 0.2)', padding: '2px 8px', borderRadius: '12px' }}>Low</span>
              ) : (
                <span style={{ color: '#10b981', fontSize: '12px', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 8px', borderRadius: '12px' }}>Good</span>
              )}
            </li>
          ))}
          {inventory.length === 0 && <li style={{color: 'var(--text-secondary)'}}>No items found.</li>}
        </ul>
      </div>
    </>
  );
}
