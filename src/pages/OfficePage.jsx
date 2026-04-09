import React from 'react';
import { Building2, Briefcase, Wrench, FileCheck } from 'lucide-react';
import { PageHeader, Card, ModuleTabs, StatCard } from '../components/common';

const TABS = [
  { key: 'inquiries', label: 'All Inquiries', icon: FileCheck },
  { key: 'jobs', label: 'Master Job Control', icon: Briefcase },
  { key: 'work', label: 'Work Management', icon: Wrench },
];

const mockJobs = [
  { id: 'JOB-4521', title: 'MV Samudra Dry Dock Refit', type: 'Production', client: 'Sri Lanka Navy', startDate: '2024-02-15', status: 'Active' },
  { id: 'JOB-4520', title: 'Propeller Shaft Replacement', type: 'Production', client: 'Ceylon Shipping', startDate: '2024-02-20', status: 'Active' },
  { id: 'JOB-4519', title: 'Office Renovation Block C', type: 'Non Production', client: 'Internal', startDate: '2024-02-25', status: 'Completed' },
  { id: 'JOB-4518', title: 'Engine Room Maintenance', type: 'Production', client: 'SLPA', startDate: '2024-02-18', status: 'Completed' },
  { id: 'JOB-4517', title: 'Hull Inspection & Cleaning', type: 'Production', client: 'Navy Dockyard', startDate: '2024-03-01', status: 'Active' },
];

export function OfficePage() {
  const [tab, setTab] = React.useState('inquiries');

  return (
    <div>
      <PageHeader title="eOffice" subtitle="Job control, work management and inquiries" />
      <ModuleTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'inquiries' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <h3 className="font-semibold text-dark-800 mb-4">All Inquiries Summary</h3>
            {[
              { label: 'Production Jobs (Active)', count: 3 },
              { label: 'Non Production Jobs (Active)', count: 2 },
              { label: 'Jobs Completed this Month', count: 5 },
              { label: 'Work Orders Pending', count: 8 },
            ].map(i => (
              <div key={i.label} className="flex items-center justify-between py-3 border-b border-dark-50">
                <span className="text-sm text-dark-600">{i.label}</span>
                <span className="text-lg font-bold text-gold-600">{i.count}</span>
              </div>
            ))}
          </Card>
          <Card>
            <h3 className="font-semibold text-dark-800 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Active Jobs" value="5" icon={Briefcase} color="blue" />
              <StatCard label="Work Orders" value="12" icon={Wrench} color="gold" />
            </div>
          </Card>
        </div>
      )}

      {tab === 'jobs' && (
        <Card noPad>
          <div className="p-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Master Job Control</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {['Job No', 'Title', 'Type', 'Client', 'Start Date', 'Status'].map(h => (
                    <th key={h} className="table-header text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockJobs.map(j => (
                  <tr key={j.id} className="table-row">
                    <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{j.id}</td>
                    <td className="px-4 py-3 font-medium text-dark-800">{j.title}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${j.type === 'Production' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{j.type}</span>
                    </td>
                    <td className="px-4 py-3 text-dark-600 text-sm">{j.client}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{new Date(j.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${j.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-dark-100 text-dark-500'}`}>{j.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'work' && (
        <Card>
          <h3 className="font-semibold text-dark-800 mb-4">Work Management Module</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Open Work Orders', value: 8, color: 'text-amber-600' },
              { label: 'In Progress', value: 5, color: 'text-blue-600' },
              { label: 'Completed Today', value: 3, color: 'text-emerald-600' },
            ].map(s => (
              <div key={s.label} className="text-center p-5 bg-dark-50 rounded-xl">
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-sm text-dark-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
