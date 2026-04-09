import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Factory, Wrench, Package, DollarSign, BarChart2 } from 'lucide-react';
import { fetchEWOs, fetchMaterialOrders, fetchPettyCash, createEWO } from '../store/actions/productionActions';
import { PageHeader, Card, Badge, Table, Modal, FormField, ModuleTabs, LoadingState, StatCard } from '../components/common';
import { formatCurrency, formatDate } from '../utils/helpers';

const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart2 },
  { key: 'ewo', label: 'EWO Management', icon: Wrench },
  { key: 'material', label: 'Material Orders', icon: Package },
  { key: 'petty', label: 'Petty Cash', icon: DollarSign },
];

export default function ProductionPage() {
  const dispatch = useDispatch();
  const { ewoList, materialOrders, pettyCash, loading } = useSelector(s => s.production);
  const [tab, setTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ jobNo: '', description: '', type: '', amount: '', dueDate: '' });

  useEffect(() => {
    dispatch(fetchEWOs());
    dispatch(fetchMaterialOrders());
    dispatch(fetchPettyCash());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(createEWO({ ...form, amount: parseFloat(form.amount), createdDate: new Date().toISOString().split('T')[0] }));
    setShowModal(false);
    setForm({ jobNo: '', description: '', type: '', amount: '', dueDate: '' });
  };

  const authorizedEWOs = ewoList.filter(e => e.status === 'Authorized' || e.status === 'Certified').length;
  const totalEWOValue = ewoList.reduce((s, e) => s + (e.amount || 0), 0);

  return (
    <div>
      <PageHeader
        title="eProduction"
        subtitle="EWO management, material orders and petty cash"
        actions={
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={15} /> New EWO
          </button>
        }
      />

      <ModuleTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total EWOs" value={ewoList.length} icon={Wrench} color="blue" />
            <StatCard label="Authorized EWOs" value={authorizedEWOs} icon={Factory} color="green" />
            <StatCard label="Material Orders" value={materialOrders.length} icon={Package} color="gold" />
            <StatCard label="Total EWO Value" value={`LKR ${(totalEWOValue / 1000000).toFixed(1)}M`} icon={BarChart2} color="purple" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">EWO Status Breakdown</h3>
              {['Authorized', 'Certified', 'Pending'].map(status => {
                const count = ewoList.filter(e => e.status === status).length;
                const val = ewoList.filter(e => e.status === status).reduce((s, e) => s + e.amount, 0);
                return (
                  <div key={status} className="flex items-center justify-between py-2 border-b border-dark-50">
                    <Badge status={status} />
                    <div className="text-right">
                      <span className="text-sm font-semibold text-dark-700">{count} EWOs</span>
                      <span className="text-xs text-dark-400 ml-2">({formatCurrency(val)})</span>
                    </div>
                  </div>
                );
              })}
            </Card>
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">Recent EWOs</h3>
              {ewoList.slice(0, 3).map(e => (
                <div key={e.id} className="flex items-center justify-between py-2 border-b border-dark-50">
                  <div>
                    <p className="text-sm font-medium text-dark-800">{e.id}</p>
                    <p className="text-xs text-dark-400 truncate max-w-[200px]">{e.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-dark-700">{formatCurrency(e.amount)}</p>
                    <Badge status={e.status} />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {tab === 'ewo' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100 flex items-center justify-between">
            <h3 className="font-semibold text-dark-800">Engineering Work Orders</h3>
            <button onClick={() => setShowModal(true)} className="btn-primary text-xs py-2 flex items-center gap-1">
              <Plus size={13} /> New EWO
            </button>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['EWO No', 'Job No', 'Description', 'Type', 'Amount (LKR)', 'Created', 'Due Date', 'Status']}>
              {ewoList.map(e => (
                <tr key={e.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{e.id}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm font-mono">{e.jobNo}</td>
                  <td className="px-4 py-3 text-dark-700 text-sm max-w-xs truncate">{e.description}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${e.type === 'Production' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{e.type}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-dark-700">{formatCurrency(e.amount)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(e.createdDate)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(e.dueDate)}</td>
                  <td className="px-4 py-3"><Badge status={e.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'material' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Integrated Material Management</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Order ID', 'EWO Reference', 'Material', 'Qty', 'Unit', 'Required Date', 'Status']}>
              {materialOrders.map(m => (
                <tr key={m.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{m.id}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm font-mono">{m.ewoRef}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{m.material}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{m.qty}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{m.unit}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(m.reqDate)}</td>
                  <td className="px-4 py-3"><Badge status={m.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'petty' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Petty Cash Requests</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Request ID', 'Requested By', 'Purpose', 'Amount (LKR)', 'Date', 'Status']}>
              {pettyCash.map(p => (
                <tr key={p.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{p.requestedBy}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{p.purpose}</td>
                  <td className="px-4 py-3 font-semibold text-dark-700">{formatCurrency(p.amount)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(p.date)}</td>
                  <td className="px-4 py-3"><Badge status={p.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Create New EWO">
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Job Number" required>
              <input className="input-field" value={form.jobNo} onChange={e => setForm(f => ({ ...f, jobNo: e.target.value }))} placeholder="JOB-XXXX" required />
            </FormField>
            <FormField label="EWO Type" required>
              <select className="input-field" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} required>
                <option value="">Select...</option>
                <option>Production</option>
                <option>Non Production</option>
              </select>
            </FormField>
          </div>
          <FormField label="Description" required>
            <textarea className="input-field resize-none h-20" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Work description..." required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Amount (LKR)" required>
              <input className="input-field" type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="0.00" required />
            </FormField>
            <FormField label="Due Date" required>
              <input className="input-field" type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} required />
            </FormField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">Create EWO</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
