import React from 'react';
import { Flame } from 'lucide-react';
import { useDiet } from '../hooks/useDiet';

export default function Diet() {
  const { logs, loading } = useDiet();

  if (loading && logs.length === 0) return <div>Loading...</div>;

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <Flame size={20} color="#ec4899" />
          Today's Diet Logs
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        {logs.map((log) => {
          const macros = log.macros ? JSON.parse(log.macros) : { protein: 0, carbs: 0, fat: 0 };
          return (
            <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--surface-border)' }}>
              <div>
                <div style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{log.meal_name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  P: {macros.protein}g | C: {macros.carbs}g | F: {macros.fat}g
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#ec4899', fontWeight: 'bold' }}>{log.calories || 0} kcal</div>
              </div>
            </div>
          );
        })}
        {logs.length === 0 && <p style={{color: 'var(--text-secondary)'}}>No meals logged today.</p>}
      </div>
    </div>
  );
}
