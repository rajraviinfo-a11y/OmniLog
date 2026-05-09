import React from 'react';
import { Receipt } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';

export default function Expenses() {
  const { expenses, loading } = useExpenses();

  if (loading && expenses.length === 0) return <div>Loading...</div>;

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <Receipt size={20} color="#10b981" />
          Recent Expenses
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        {expenses.map((expense) => (
          <div key={expense.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--surface-border)' }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{expense.description || expense.category}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{new Date(expense.timestamp).toLocaleDateString()} &middot; Paid by {expense.user?.name}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#10b981', fontWeight: 'bold' }}>${expense.amount.toFixed(2)}</div>
            </div>
          </div>
        ))}
        {expenses.length === 0 && <p style={{color: 'var(--text-secondary)'}}>No expenses logged yet.</p>}
      </div>
    </div>
  );
}
