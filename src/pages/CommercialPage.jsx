import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Handshake, FileText, FolderOpen, Tag, BarChart2 } from 'lucide-react';
import { fetchSalesInvoices, fetchProjects, fetchPriceLists } from '../store/actions/commercialActions';
import { PageHeader, Card, Badge, Table, Modal, FormField, ModuleTabs, LoadingState, StatCard } from '../components/common';
import { formatCurrency, formatDate } from '../utils/helpers';

const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart2 },
  { key: 'invoices', label: 'Sales Invoices', icon: FileText },
  { key: 'projects', label: 'Project Proposals', icon: FolderOpen },
  { key: 'pricelist', label: 'Sales Price List', icon: Tag },
];

export default function CommercialPage() {
  const dispatch = useDispatch();
  const { salesInvoices, projects, priceLists, loading } = useSelector(s => s.commercial);
  const [tab, setTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSalesInvoices());
    dispatch(fetchProjects());
    dispatch(fetchPriceLists());
  }, [dispatch]);

  const totalInvoiceValue = salesInvoices.reduce((s, i) => s + i.amount, 0);
  const authorizedCount = salesInvoices.filter(i => i.authorized).length;

  return (
    <div>
      <PageHeader
        title="eCommercial"
        subtitle="Sales invoices, project proposals and price lists"
        actions={
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={15} /> New Invoice
          </button>
        }
      />

      <ModuleTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Invoices" value={salesInvoices.length} icon={FileText} color="blue" />
            <StatCard label="Authorized" value={authorizedCount} icon={Handshake} color="green" />
            <StatCard label="Active Projects" value={projects.filter(p => p.status === 'Active').length} icon={FolderOpen} color="gold" />
            <StatCard label="Total Invoice Value" value={`LKR ${(totalInvoiceValue / 1000000).toFixed(1)}M`} icon={BarChart2} color="purple" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">Recent Sales Invoices</h3>
              <div className="space-y-2">
                {salesInvoices.slice(0, 4).map(i => (
                  <div key={i.id} className="flex items-center justify-between py-2 border-b border-dark-50">
                    <div>
                      <p className="text-sm font-medium text-dark-800">{i.id}</p>
                      <p className="text-xs text-dark-400">{i.client} — {i.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-dark-700">{formatCurrency(i.amount)}</p>
                      <Badge status={i.status} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">Active Projects</h3>
              <div className="space-y-2">
                {projects.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-dark-50">
                    <div>
                      <p className="text-sm font-medium text-dark-800 truncate max-w-[180px]">{p.name}</p>
                      <p className="text-xs text-dark-400">{p.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-dark-700">{formatCurrency(p.value)}</p>
                      <Badge status={p.status} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'invoices' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Sales Invoices</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Invoice No', 'Client', 'Job No', 'Type', 'Amount (LKR)', 'Date', 'Status', 'Authorized']}>
              {salesInvoices.map(i => (
                <tr key={i.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{i.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{i.client}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm font-mono">{i.jobNo}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{i.type}</td>
                  <td className="px-4 py-3 font-semibold text-dark-700">{formatCurrency(i.amount)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(i.date)}</td>
                  <td className="px-4 py-3"><Badge status={i.status} /></td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${i.authorized ? 'bg-emerald-100 text-emerald-700' : 'bg-dark-100 text-dark-500'}`}>
                      {i.authorized ? 'Yes' : 'No'}
                    </span>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'projects' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Project Proposals</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Project ID', 'Project Name', 'Client', 'Proposal Date', 'Value (LKR)', 'Manager', 'Status']}>
              {projects.map(p => (
                <tr key={p.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800 max-w-xs truncate">{p.name}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{p.client}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(p.proposalDate)}</td>
                  <td className="px-4 py-3 font-semibold text-dark-700">{formatCurrency(p.value)}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{p.manager}</td>
                  <td className="px-4 py-3"><Badge status={p.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'pricelist' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Sales Price List</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Price List ID', 'Service Description', 'Unit', 'Unit Price (LKR)', 'Currency']}>
              {priceLists.map(p => (
                <tr key={p.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{p.service}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{p.unit}</td>
                  <td className="px-4 py-3 font-semibold text-dark-700">{formatCurrency(p.price)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{p.currency}</td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="New Sales Invoice">
        <form onSubmit={(e) => { e.preventDefault(); setShowModal(false); }} className="space-y-4">
          <FormField label="Client Name" required>
            <input className="input-field" placeholder="e.g. Sri Lanka Navy" required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Job Number" required>
              <input className="input-field" placeholder="JOB-XXXX" required />
            </FormField>
            <FormField label="Invoice Type" required>
              <select className="input-field" required>
                <option value="">Select...</option>
                {['Marine Paint', 'Auto Paint', 'Civil Works', 'Mechanical'].map(t => <option key={t}>{t}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Amount (LKR)" required>
            <input className="input-field" type="number" placeholder="0.00" required />
          </FormField>
          <FormField label="Invoice Date" required>
            <input className="input-field" type="date" required />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">Create Invoice</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
