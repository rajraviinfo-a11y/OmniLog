import React from 'react';
import { Package } from 'lucide-react';
import { useInventory } from '../hooks/useInventory';

export default function Inventory() {
  const { inventory, loading } = useInventory();

  if (loading && inventory.length === 0) return <div>Loading...</div>;

  return (
    <div className="glass-card">
      <div className="card-header">
        <h2 className="card-title">
          <Package size={20} color="#3b82f6" />
          Household Inventory
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        {inventory.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--surface-border)' }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{item.item_name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Last stocked: {new Date(item.last_restocked).toLocaleDateString()}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{item.quantity} {item.unit}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.category}</div>
            </div>
          </div>
        ))}
        {inventory.length === 0 && <p style={{color: 'var(--text-secondary)'}}>No inventory tracked yet.</p>}
      </div>
    </div>
  );
}
