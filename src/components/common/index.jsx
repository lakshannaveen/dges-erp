import React from 'react';
import { Loader2, AlertCircle, X } from 'lucide-react';

// Loading Spinner
export function Spinner({ size = 'md' }) {
  const sz = { sm: 16, md: 24, lg: 40 }[size];
  return <Loader2 size={sz} className="animate-spin text-gold-500" />;
}

// Page Header
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="text-dark-400 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// Card
export function Card({ children, className = '', noPad = false }) {
  return (
    <div className={`bg-white rounded-xl border border-dark-100 shadow-sm ${noPad ? '' : 'p-5'} ${className}`}>
      {children}
    </div>
  );
}

// Stats Card
export function StatCard({ label, value, icon: Icon, trend, color = 'gold', sub }) {
  const colorMap = {
    gold: 'bg-gold-50 text-gold-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-dark-400 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-dark-900 mt-1">{value}</p>
          {sub && <p className="text-xs text-dark-400 mt-0.5">{sub}</p>}
          {trend && <p className={`text-xs mt-1 font-medium ${trend.up ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend.up ? '↑' : '↓'} {trend.text}
          </p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${colorMap[color]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

// Empty State
export function EmptyState({ title = 'No data found', message, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <Icon size={40} className="text-dark-200 mb-3" />}
      <p className="text-dark-600 font-semibold">{title}</p>
      {message && <p className="text-dark-400 text-sm mt-1">{message}</p>}
    </div>
  );
}

// Loading State
export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Spinner />
      <p className="text-dark-400 text-sm">{message}</p>
    </div>
  );
}

// Status Badge
export function Badge({ status }) {
  const map = {
    Active: 'bg-emerald-100 text-emerald-700',
    active: 'bg-emerald-100 text-emerald-700',
    Approved: 'bg-emerald-100 text-emerald-700',
    Authorized: 'bg-emerald-100 text-emerald-700',
    Paid: 'bg-emerald-100 text-emerald-700',
    Certified: 'bg-emerald-100 text-emerald-700',
    Delivered: 'bg-emerald-100 text-emerald-700',
    Completed: 'bg-emerald-100 text-emerald-700',
    Present: 'bg-emerald-100 text-emerald-700',
    Posted: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-700',
    Draft: 'bg-amber-100 text-amber-700',
    Sent: 'bg-blue-100 text-blue-700',
    'In Transit': 'bg-blue-100 text-blue-700',
    Late: 'bg-orange-100 text-orange-700',
    'On Leave': 'bg-purple-100 text-purple-700',
    Proposal: 'bg-blue-100 text-blue-700',
    Maintenance: 'bg-orange-100 text-orange-700',
    Inactive: 'bg-red-100 text-red-600',
    Overdue: 'bg-red-100 text-red-600',
    Absent: 'bg-red-100 text-red-600',
  };
  const cls = map[status] || 'bg-dark-100 text-dark-600';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

// Modal
export function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;
  const widthMap = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white rounded-xl shadow-2xl w-full ${widthMap[size]} animate-fade-in max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-100 shrink-0">
          <h3 className="font-bold text-dark-800 text-base">{title}</h3>
          <button onClick={onClose} className="text-dark-400 hover:text-dark-700 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

// Table wrapper
export function Table({ headers, children, empty }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="table-header text-left first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {empty}
    </div>
  );
}

// Search & Filter bar
export function SearchBar({ value, onChange, placeholder = 'Search...', children }) {
  return (
    <div className="flex items-center gap-3 mb-5 flex-wrap">
      <div className="relative flex-1 min-w-48">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-field pl-4"
        />
      </div>
      {children}
    </div>
  );
}

// Module sub-nav tabs
export function ModuleTabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-dark-100 rounded-xl p-1 mb-6 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
            ${active === tab.key
              ? 'bg-dark-900 text-gold-400 shadow-sm'
              : 'text-dark-500 hover:text-dark-800'
            }`}
        >
          {tab.icon && <tab.icon size={14} />}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Form field
export function FormField({ label, children, required, error }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-dark-600 mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Alert
export function Alert({ type = 'info', message }) {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    warning: 'bg-amber-50 border-amber-200 text-amber-700',
    error: 'bg-red-50 border-red-200 text-red-700',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  };
  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm ${colors[type]}`}>
      <AlertCircle size={15} />
      {message}
    </div>
  );
}
