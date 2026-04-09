import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, FileSignature, Users, Building, Search } from 'lucide-react';
import { fetchContractors, fetchContractorEmployees, createContractor } from '../store/actions/subcontractActions';
import { PageHeader, Card, Badge, Table, Modal, FormField, ModuleTabs, LoadingState, StatCard } from '../components/common';

const TABS = [
  { key: 'contractors', label: 'Contractors', icon: Building },
  { key: 'employees', label: 'Contractor Employees', icon: Users },
  { key: 'registration', label: 'Supplier Registration', icon: FileSignature },
];

export default function SubcontractPage() {
  const dispatch = useDispatch();
  const { contractors, contractorEmployees, loading } = useSelector(s => s.subcontract);
  const [tab, setTab] = useState('contractors');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ company: '', registration: '', contact: '', phone: '', type: '' });

  useEffect(() => {
    dispatch(fetchContractors());
    dispatch(fetchContractorEmployees());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(createContractor(form));
    setShowModal(false);
    setForm({ company: '', registration: '', contact: '', phone: '', type: '' });
  };

  return (
    <div>
      <PageHeader
        title="eSubcontract"
        subtitle="Contractor company and employee management"
        actions={
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={15} /> Register Contractor
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Contractors" value={contractors.length} icon={Building} color="blue" />
        <StatCard label="Active Contractors" value={contractors.filter(c => c.status === 'Active').length} icon={FileSignature} color="green" />
        <StatCard label="Contractor Employees" value={contractorEmployees.length} icon={Users} color="gold" />
      </div>

      <ModuleTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'contractors' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Contractor Company Details</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Contractor ID', 'Company Name', 'Registration', 'Contact Person', 'Phone', 'Type', 'Status']}>
              {contractors.map(c => (
                <tr key={c.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{c.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{c.company}</td>
                  <td className="px-4 py-3 font-mono text-xs text-dark-500">{c.registration}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{c.contact}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{c.phone}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{c.type}</td>
                  <td className="px-4 py-3"><Badge status={c.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'employees' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Contractor Employee Details</h3>
          </div>
          {loading ? <LoadingState /> : (
            <Table headers={['Employee ID', 'Name', 'Contractor ID', 'Designation', 'NIC', 'Phone', 'Status']}>
              {contractorEmployees.map(e => (
                <tr key={e.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{e.id}</td>
                  <td className="px-4 py-3 font-medium text-dark-800">{e.name}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm font-mono">{e.contractorId}</td>
                  <td className="px-4 py-3 text-dark-600 text-sm">{e.designation}</td>
                  <td className="px-4 py-3 font-mono text-xs text-dark-500">{e.nic}</td>
                  <td className="px-4 py-3 text-dark-500 text-sm">{e.phone}</td>
                  <td className="px-4 py-3"><Badge status={e.status} /></td>
                </tr>
              ))}
            </Table>
          )}
        </Card>
      )}

      {tab === 'registration' && (
        <Card>
          <h3 className="font-semibold text-dark-800 mb-4">Miscellaneous Supplier Registration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contractors.map(c => (
              <div key={c.id} className="border border-dark-100 rounded-xl p-4 hover:border-gold-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-dark-800">{c.company}</p>
                    <p className="text-xs text-dark-400 font-mono">{c.registration}</p>
                  </div>
                  <Badge status={c.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                  <div><span className="text-dark-400">Type: </span><span className="text-dark-700">{c.type}</span></div>
                  <div><span className="text-dark-400">Contact: </span><span className="text-dark-700">{c.contact}</span></div>
                  <div className="col-span-2"><span className="text-dark-400">Phone: </span><span className="text-dark-700">{c.phone}</span></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Register New Contractor">
        <form onSubmit={handleAdd} className="space-y-4">
          <FormField label="Company Name" required>
            <input className="input-field" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Registration No" required>
              <input className="input-field" value={form.registration} onChange={e => setForm(f => ({ ...f, registration: e.target.value }))} placeholder="REG-XXXX-XXXX" required />
            </FormField>
            <FormField label="Type" required>
              <select className="input-field" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} required>
                <option value="">Select...</option>
                {['Civil Works', 'Fabrication', 'Marine', 'Electrical', 'Mechanical'].map(t => <option key={t}>{t}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Contact Person" required>
              <input className="input-field" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Mr./Ms. Name" required />
            </FormField>
            <FormField label="Phone" required>
              <input className="input-field" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="07XXXXXXXX" required />
            </FormField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary">Register Contractor</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
