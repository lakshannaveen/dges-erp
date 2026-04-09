import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Users, FolderOpen, FileText, TrendingUp, Package, ShoppingCart, Factory, Handshake } from 'lucide-react';
import { fetchDashboardStats } from '../store/actions/dashboardActions';
import { StatCard, Card, LoadingState, PageHeader } from '../components/common';
import { formatCurrency } from '../utils/helpers';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { month: 'Oct', revenue: 3200000, expenses: 1800000 },
  { month: 'Nov', revenue: 3800000, expenses: 2100000 },
  { month: 'Dec', revenue: 4100000, expenses: 2300000 },
  { month: 'Jan', revenue: 3600000, expenses: 1950000 },
  { month: 'Feb', revenue: 4500000, expenses: 2400000 },
  { month: 'Mar', revenue: 4820000, expenses: 2600000 },
];

const moduleData = [
  { name: 'Commercial', value: 34 },
  { name: 'Production', value: 28 },
  { name: 'Procurement', value: 22 },
  { name: 'Finance', value: 16 },
];

const modules = [
  { path: '/asset', label: 'eAsset', icon: Package, desc: 'Asset & Transfer Management', color: 'bg-red-500' },
  { path: '/commercial', label: 'eCommercial', icon: Handshake, desc: 'Sales & Project Proposals', color: 'bg-blue-500' },
  { path: '/finance', label: 'eFinancials', icon: TrendingUp, desc: 'Accounts & Financial Reports', color: 'bg-teal-500' },
  { path: '/hrm', label: 'eHRM', icon: Users, desc: 'HR & Attendance Management', color: 'bg-amber-500' },
  { path: '/office', label: 'eOffice', icon: FolderOpen, desc: 'Work & Job Management', color: 'bg-gray-500' },
  { path: '/procurement', label: 'eProcurement', icon: ShoppingCart, desc: 'Suppliers & Stock Control', color: 'bg-rose-600' },
  { path: '/production', label: 'eProduction', icon: Factory, desc: 'EWO & Material Management', color: 'bg-purple-600' },
  { path: '/subcontract', label: 'eSubcontract', icon: FileText, desc: 'Contractor Management', color: 'bg-green-600' },
];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, recentActivities, loading } = useSelector(s => s.dashboard);
  const { user } = useSelector(s => s.auth);

  useEffect(() => { dispatch(fetchDashboardStats()); }, [dispatch]);

  const fmtK = (v) => v >= 1000000 ? `LKR ${(v / 1000000).toFixed(1)}M` : `LKR ${(v / 1000).toFixed(0)}K`;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0]} 👋`}
        subtitle="Here's what's happening across DGE systems today."
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Employees" value={stats.totalEmployees.toLocaleString()} icon={Users} color="blue" trend={{ up: true, text: '12 this month' }} />
        <StatCard label="Active Projects" value={stats.activeProjects} icon={FolderOpen} color="purple" trend={{ up: true, text: '3 new' }} />
        <StatCard label="Pending Invoices" value={stats.pendingInvoices} icon={FileText} color="gold" trend={{ up: false, text: '5 overdue' }} />
        <StatCard label="Monthly Revenue" value={fmtK(stats.monthlyRevenue)} icon={TrendingUp} color="green" trend={{ up: true, text: '7% vs last month' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-dark-800">Revenue vs Expenses</h3>
              <p className="text-xs text-dark-400">Last 6 months overview</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0a0a0a" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="#0a0a0a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#a0a0a0' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#a0a0a0' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
              <Tooltip formatter={v => formatCurrency(v)} labelStyle={{ fontSize: 12 }} contentStyle={{ borderRadius: 8, border: '1px solid #f0f0f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} fill="url(#colorRev)" name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="#141414" strokeWidth={2} fill="url(#colorExp)" name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Module Activity */}
        <Card>
          <h3 className="font-semibold text-dark-800 mb-1">Module Activity</h3>
          <p className="text-xs text-dark-400 mb-4">Transactions this month</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={moduleData} layout="vertical" barSize={14}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#6b6b6b' }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #f0f0f0', fontSize: 12 }} />
              <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Activity */}
        <Card className="lg:col-span-2" noPad>
          <div className="px-5 py-4 border-b border-dark-100">
            <h3 className="font-semibold text-dark-800">Recent Activity</h3>
          </div>
          <div className="divide-y divide-dark-50">
            {recentActivities.map(a => (
              <div key={a.id} className="flex items-start gap-3 px-5 py-3 hover:bg-dark-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-gold-400 mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-dark-700">{a.message}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-dark-400">{a.user}</span>
                    <span className="w-1 h-1 rounded-full bg-dark-200" />
                    <span className="text-xs text-dark-400">{a.time}</span>
                    <span className="text-xs bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full">{a.module}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Access */}
        <Card>
          <h3 className="font-semibold text-dark-800 mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 gap-2">
            {modules.map(m => (
              <button
                key={m.path}
                onClick={() => navigate(m.path)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dark-100 hover:border-gold-300 hover:bg-gold-50 transition-all group text-center"
              >
                <div className={`w-8 h-8 ${m.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <m.icon size={16} className="text-white" />
                </div>
                <span className="text-xs font-medium text-dark-700 leading-tight">{m.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
