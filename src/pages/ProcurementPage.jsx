import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, ShoppingCart, Package, Truck, BarChart2, AlertTriangle } from 'lucide-react';
import { fetchSuppliers, fetchStock, fetchOrders, createSupplier } from '../store/actions/procurementActions';
import { PageHeader, Card, Badge, Table, Modal, FormField, ModuleTabs, LoadingState, StatCard } from '../components/common';
import { formatCurrency, formatDate } from '../utils/helpers';

const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart2 },
  { key: 'suppliers', label: 'Supplier Catalogue', icon: ShoppingCart },
  { key: 'stock', label: 'Stock Balance', icon: Package },
  { key: 'orders', label: 'MOC Tracking', icon: Truck },
];

export default function ProcurementPage() {
  const dispatch = useDispatch();
  const { suppliers, stockItems, orders, loading } = useSelector(s => s.procurement);
  const [tab, setTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', contact: '', phone: '', email: '' });

  useEffect(() => {
    dispatch(fetchSuppliers());
    dispatch(fetchStock());
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(createSupplier(form));
    setShowModal(false);
    setForm({ name: '', category: '', contact: '', phone: '', email: '' });
  };

  const lowStock = stockItems.filter(s => s.qtyOnHand <= s.reorderLevel);

  return (
    <div>
      <PageHeader
        title="eProcurement"
        subtitle="Supplier catalogue, stores management & stock control"
        actions={
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={15} /> Add Supplier
          </button>
        }
      />

      <ModuleTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Active Suppliers" value={suppliers.filter(s => s.status === 'Active').length} icon={ShoppingCart} color="blue" />
            <StatCard label="Stock Items" value={stockItems.length} icon={Package} color="gold" />
            <StatCard label="Low Stock Alerts" value={lowStock.length} icon={AlertTriangle} color="red" />
            <StatCard label="Pending Orders" value={orders.filter(o => o.status === 'Pending').length} icon={Truck} color="purple" />
          </div>
          {lowStock.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-amber-600" />
                <span className="text-amber-700 font-semibold text-sm">Low Stock Alert — {lowStock.length} item(s) at or below reorder level</span>
              </div>
              <div className="space-y-1">
                {lowStock.map(s => (
                  <div key={s.id} className="flex items-center justify-between text-sm">
                    <span className="text-amber-700">{s.description}</span>
                    <span className="font-medium text-amber-800">{s.qtyOnHand} {s.unit} remaining (min: {s.reorderLevel})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">Recent Orders (MOC)</h3>
              {orders.map(o => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-dark-50">
                  <div>
                    <p className="text-sm font-medium text-dark-800">{o.id}</p>
                    <p className="text-xs text-dark-400">{o.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-dark-700">{formatCurrency(o.totalAmount)}</p>
                    <Badge status={o.status} />
                  </div>
                </div>
              ))}
            </Card>
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">Stock Level Summary</h3>
              {stockItems.map(s => (
                <div key={s.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-dark-600 truncate max-w-[180px]">{s.description}</span>
                    <span className={`text-xs font-medium ${s.qtyOnHand <= s.reorderLevel ? 'text-red-500' : 'text-emerald-600'}`}>
                      {s.qtyOnHand} {s.unit}
                    </span>
                  </div>
                  <div className="h-1.5 bg-dark-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.qtyOnHand <= s.reorderLevel ? 'bg-red-400' : 'bg-gold-400'}`}
                      style={{ width: `${Math.min(100, (s.qtyOnHand / (s.reorderLevel * 3)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {tab === 'suppliers' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Supplier Catalogue</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Supplier ID', 'Company Name', 'Category', 'Contact Person', 'Phone', 'Email', 'Rating', 'Status']}>
              {suppliers.map(s => (
                <tr key={s.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{s.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{s.name}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{s.category}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{s.contact}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{s.phone}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-gold-600 font-semibold text-sm">★ {s.rating}</span>
                  </td>
                  <td className="px-4 py-3"><Badge status={s.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'stock' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Stock Balance Inquiry</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Item Code', 'Description', 'Store', 'Unit', 'Qty On Hand', 'Reorder Level', 'Unit Cost (LKR)', 'Status']}>
              {stockItems.map(s => (
                <tr key={s.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{s.itemCode}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{s.description}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{s.store}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{s.unit}</td>
                  <td className={`px-4 py-3 font-semibold text-sm ${s.qtyOnHand <= s.reorderLevel ? 'text-red-500' : 'text-dark-700'}`}>{s.qtyOnHand.toLocaleString()}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{s.reorderLevel.toLocaleString()}</td>
                  <td className="px-4 py-3 text-dark-700 text-sm">{formatCurrency(s.unitCost)}</td>
                  <td className="px-4 py-3">
                    <Badge status={s.qtyOnHand <= s.reorderLevel ? 'Overdue' : 'Active'} />
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'orders' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Material Ordering Card (MOC) Tracking</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['MOC No', 'Supplier', 'Items', 'Total Amount (LKR)', 'Order Date', 'Expected Delivery', 'Status']}>
              {orders.map(o => (
                <tr key={o.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{o.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{o.supplier}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{o.items}</td>
                  <td className="px-4 py-3 font-semibold text-dark-700">{formatCurrency(o.totalAmount)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(o.orderDate)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(o.deliveryDate)}</td>
                  <td className="px-4 py-3"><Badge status={o.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New Supplier">
        <form onSubmit={handleAdd} className="space-y-4">
          <FormField label="Company Name" required>
            <input className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Company name" required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category" required>
              <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required>
                <option value="">Select...</option>
                {['Raw Materials', 'Paint & Coatings', 'Consumables', 'Equipment Parts', 'Services'].map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Contact Person" required>
              <input className="input-field" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Mr./Ms. Name" required />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone" required>
              <input className="input-field" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="011XXXXXXX" required />
            </FormField>
            <FormField label="Email">
              <input className="input-field" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="name@company.lk" />
            </FormField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">Add Supplier</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
