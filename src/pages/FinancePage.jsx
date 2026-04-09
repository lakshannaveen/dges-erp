import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, DollarSign, BookOpen, FileText, CreditCard, BarChart2, TrendingUp, PiggyBank } from 'lucide-react';
import { fetchAccounts, fetchJournals, fetchInvoices, fetchCashBooks } from '../store/actions/financeActions';
import { PageHeader, Card, Badge, Table, Modal, FormField, ModuleTabs, LoadingState, StatCard } from '../components/common';
import { formatCurrency, formatDate } from '../utils/helpers';

const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart2 },
  { key: 'accounts', label: 'Chart of Accounts', icon: BookOpen },
  { key: 'journals', label: 'Journal Entries', icon: FileText },
  { key: 'invoices', label: 'Invoices', icon: CreditCard },
  { key: 'cashbook', label: 'Cash Books', icon: PiggyBank },
];

export default function FinancePage() {
  const dispatch = useDispatch();
  const { accounts, journals, invoices, cashBooks, loading } = useSelector(s => s.finance);
  const [tab, setTab] = useState('overview');
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [jForm, setJForm] = useState({ description: '', debit: '', credit: '', date: '' });

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchJournals());
    dispatch(fetchInvoices());
    dispatch(fetchCashBooks());
  }, [dispatch]);

  const totalRevenue = accounts.filter(a => a.type === 'Revenue').reduce((s, a) => s + a.balance, 0);
  const totalExpense = accounts.filter(a => a.type === 'Expense').reduce((s, a) => s + a.balance, 0);
  const totalAssets = accounts.filter(a => a.type === 'Asset').reduce((s, a) => s + a.balance, 0);
  const pendingInvoices = invoices.filter(i => i.status === 'Pending').length;

  return (
    <div>
      <PageHeader
        title="eFinancials"
        subtitle="Accounts, journals, invoices & financial reports"
        actions={
          <button onClick={() => setShowJournalModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={15} /> Journal Entry
          </button>
        }
      />

      <ModuleTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Revenue" value={`LKR ${(totalRevenue / 1000000).toFixed(1)}M`} icon={TrendingUp} color="green" />
            <StatCard label="Total Expenses" value={`LKR ${(totalExpense / 1000000).toFixed(1)}M`} icon={DollarSign} color="red" />
            <StatCard label="Total Assets" value={`LKR ${(totalAssets / 1000000).toFixed(1)}M`} icon={BarChart2} color="blue" />
            <StatCard label="Pending Invoices" value={pendingInvoices} icon={FileText} color="gold" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">Recent Journal Entries</h3>
              <div className="space-y-3">
                {journals.slice(0, 4).map(j => (
                  <div key={j.id} className="flex items-center justify-between py-2 border-b border-dark-50">
                    <div>
                      <p className="text-sm font-medium text-dark-800">{j.id}</p>
                      <p className="text-xs text-dark-400 truncate max-w-xs">{j.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-dark-700">{formatCurrency(j.debit)}</p>
                      <Badge status={j.status} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="font-semibold text-dark-800 mb-4">Invoice Summary</h3>
              {['Paid', 'Pending', 'Overdue', 'Draft'].map(status => {
                const count = invoices.filter(i => i.status === status).length;
                const total = invoices.filter(i => i.status === status).reduce((s, i) => s + i.amount, 0);
                return (
                  <div key={status} className="flex items-center justify-between py-2.5 border-b border-dark-50">
                    <div className="flex items-center gap-2">
                      <Badge status={status} />
                      <span className="text-sm text-dark-500">({count})</span>
                    </div>
                    <span className="text-sm font-semibold text-dark-700">{formatCurrency(total)}</span>
                  </div>
                );
              })}
            </Card>
          </div>
        </div>
      )}

      {tab === 'accounts' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Chart of Accounts</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Account Code', 'Account Name', 'Type', 'Balance (LKR)', 'Currency']}>
              {accounts.map(a => (
                <tr key={a.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{a.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{a.name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      a.type === 'Asset' ? 'bg-blue-100 text-blue-700' :
                      a.type === 'Liability' ? 'bg-red-100 text-red-600' :
                      a.type === 'Revenue' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>{a.type}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-dark-700">{formatCurrency(a.balance)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{a.currency}</td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'journals' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100 flex items-center justify-between">
            <h3 className="font-semibold text-dark-800">Journal Entries</h3>
            <button onClick={() => setShowJournalModal(true)} className="btn-primary flex items-center gap-1.5 text-xs py-2">
              <Plus size={13} /> New Entry
            </button>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Journal ID', 'Date', 'Description', 'Debit (LKR)', 'Credit (LKR)', 'Created By', 'Status']}>
              {journals.map(j => (
                <tr key={j.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{j.id}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(j.date)}</td>
                  <td className="px-4 py-3 text-dark-700 text-sm max-w-xs truncate">{j.description}</td>
                  <td className="px-4 py-3 text-dark-700 font-medium text-sm">{formatCurrency(j.debit)}</td>
                  <td className="px-4 py-3 text-dark-700 font-medium text-sm">{formatCurrency(j.credit)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{j.createdBy}</td>
                  <td className="px-4 py-3"><Badge status={j.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'invoices' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Sales Invoices</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Invoice No', 'Client', 'Type', 'Amount (LKR)', 'Due Date', 'Status']}>
              {invoices.map(i => (
                <tr key={i.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{i.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{i.client}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{i.type}</td>
                  <td className="px-4 py-3 font-semibold text-dark-700">{formatCurrency(i.amount)}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(i.dueDate)}</td>
                  <td className="px-4 py-3"><Badge status={i.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'cashbook' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Cash Book</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Entry ID', 'Date', 'Description', 'Type', 'Amount (LKR)', 'Balance (LKR)']}>
              {cashBooks.map(c => (
                <tr key={c.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{c.id}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{formatDate(c.date)}</td>
                  <td className="px-4 py-3 text-dark-700 text-sm">{c.description}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.type === 'Receipt' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{c.type}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-dark-700">{formatCurrency(c.amount)}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{formatCurrency(c.balance)}</td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      <Modal open={showJournalModal} onClose={() => setShowJournalModal(false)} title="New Journal Entry">
        <form onSubmit={(e) => { e.preventDefault(); setShowJournalModal(false); }} className="space-y-4">
          <FormField label="Date" required>
            <input className="input-field" type="date" value={jForm.date} onChange={e => setJForm(f => ({ ...f, date: e.target.value }))} required />
          </FormField>
          <FormField label="Description" required>
            <input className="input-field" value={jForm.description} onChange={e => setJForm(f => ({ ...f, description: e.target.value }))} placeholder="Journal entry description" required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Debit (LKR)" required>
              <input className="input-field" type="number" value={jForm.debit} onChange={e => setJForm(f => ({ ...f, debit: e.target.value }))} placeholder="0.00" required />
            </FormField>
            <FormField label="Credit (LKR)" required>
              <input className="input-field" type="number" value={jForm.credit} onChange={e => setJForm(f => ({ ...f, credit: e.target.value }))} placeholder="0.00" required />
            </FormField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowJournalModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">Post Entry</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
