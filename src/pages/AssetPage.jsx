import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Package, ArrowRightLeft, Trash2, Search, Eye, BarChart2 } from 'lucide-react';
import { fetchAssets, fetchTransfers, fetchDisposals, createAsset } from '../store/actions/assetActions';
import { PageHeader, Card, Badge, Table, Modal, FormField, ModuleTabs, SearchBar, LoadingState, EmptyState, StatCard } from '../components/common';
import { formatCurrency, formatDate } from '../utils/helpers';

const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart2 },
  { key: 'assets', label: 'Asset Register', icon: Package },
  { key: 'transfers', label: 'Transfer Notes', icon: ArrowRightLeft },
  { key: 'disposals', label: 'Disposal Notes', icon: Trash2 },
];

export default function AssetPage() {
  const dispatch = useDispatch();
  const { assets, transfers, disposals, loading } = useSelector(s => s.asset);
  const [tab, setTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', location: '', value: '', purchaseDate: '' });

  useEffect(() => {
    dispatch(fetchAssets());
    dispatch(fetchTransfers());
    dispatch(fetchDisposals());
  }, [dispatch]);

  const filteredAssets = assets.filter(a =>
    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.category?.toLowerCase().includes(search.toLowerCase()) ||
    a.location?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(createAsset({ ...form, value: parseFloat(form.value) }));
    setShowModal(false);
    setForm({ name: '', category: '', location: '', value: '', purchaseDate: '' });
  };

  const totalValue = assets.reduce((s, a) => s + (a.value || 0), 0);
  const activeCount = assets.filter(a => a.status === 'Active').length;

  return (
    <div>
      <PageHeader
        title="eAsset Management"
        subtitle="Manage capital assets, transfers and disposals"
        actions={
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={15} /> New Asset
          </button>
        }
      />

      <ModuleTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Assets" value={assets.length} icon={Package} color="gold" />
            <StatCard label="Active Assets" value={activeCount} icon={Package} color="green" />
            <StatCard label="Transfers (MTD)" value={transfers.length} icon={ArrowRightLeft} color="blue" />
            <StatCard label="Total Asset Value" value={`LKR ${(totalValue / 1000000).toFixed(1)}M`} icon={BarChart2} color="purple" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">Assets by Category</h3>
              {['Heavy Equipment', 'Vehicles', 'Tools & Equipment', 'Power Equipment'].map(cat => {
                const count = assets.filter(a => a.category === cat).length;
                const pct = assets.length ? Math.round((count / assets.length) * 100) : 0;
                return (
                  <div key={cat} className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-dark-600 w-44 truncate">{cat}</span>
                    <div className="flex-1 h-2 bg-dark-100 rounded-full overflow-hidden">
                      <div className="h-full gold-gradient rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-medium text-dark-700 w-6 text-right">{count}</span>
                  </div>
                );
              })}
            </Card>
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">Recent Asset Activity</h3>
              <div className="space-y-3">
                {transfers.slice(0, 3).map(t => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-dark-50">
                    <div>
                      <p className="text-sm font-medium text-dark-700">{t.id}</p>
                      <p className="text-xs text-dark-400">{t.fromLocation} → {t.toLocation}</p>
                    </div>
                    <Badge status={t.status} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'assets' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <SearchBar value={search} onChange={setSearch} placeholder="Search assets by name, category, location..." />
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Asset ID', 'Name', 'Category', 'Location', 'Value (LKR)', 'Purchase Date', 'Status']}>
              {filteredAssets.map(a => (
                <tr key={a.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{a.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{a.name}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{a.category}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{a.location}</td>
                  <td className="px-4 py-3 text-dark-700 text-sm font-medium">{formatCurrency(a.value)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(a.purchaseDate)}</td>
                  <td className="px-4 py-3"><Badge status={a.status} /></td>
                </tr>
              ))}
            </Table>
          )}
          {!loading && filteredAssets.length === 0 && (
            <EmptyState title="No assets found" message="Try adjusting your search" icon={Package} />
          )}
        </Card>
      )}

      {tab === 'transfers' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Asset Transfer Notes</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Transfer ID', 'Asset ID', 'From Location', 'To Location', 'Transfer Date', 'Approved By', 'Status']}>
              {transfers.map(t => (
                <tr key={t.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{t.id}</td>
                  <td className="px-4 py-3 text-dark-700 text-sm">{t.assetId}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{t.fromLocation}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{t.toLocation}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(t.transferDate)}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{t.approvedBy}</td>
                  <td className="px-4 py-3"><Badge status={t.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'disposals' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Asset Disposal Notes</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Disposal ID', 'Asset Name', 'Disposal Date', 'Method', 'Amount (LKR)', 'Status']}>
              {disposals.map(d => (
                <tr key={d.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{d.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{d.assetName}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(d.disposalDate)}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{d.method}</td>
                  <td className="px-4 py-3 text-dark-700 font-medium text-sm">{formatCurrency(d.amount)}</td>
                  <td className="px-4 py-3"><Badge status={d.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Register New Asset">
        <form onSubmit={handleAdd} className="space-y-4">
          <FormField label="Asset Name" required>
            <input className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Tower Crane #2" required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category" required>
              <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required>
                <option value="">Select...</option>
                {['Heavy Equipment', 'Vehicles', 'Tools & Equipment', 'Power Equipment', 'Office Equipment'].map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Location" required>
              <input className="input-field" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Dock A" required />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Asset Value (LKR)" required>
              <input className="input-field" type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder="0.00" required />
            </FormField>
            <FormField label="Purchase Date" required>
              <input className="input-field" type="date" value={form.purchaseDate} onChange={e => setForm(f => ({ ...f, purchaseDate: e.target.value }))} required />
            </FormField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">Register Asset</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
