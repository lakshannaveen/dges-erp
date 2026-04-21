import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, setActiveModule } from '../../store/slices/uiSlice';
import { DGES_LOGO } from '../../utils/logoData';
import {
  LayoutDashboard, Package, Handshake, DollarSign,
  Users, Building2, ShoppingCart, Factory,
  FileSignature, ChevronLeft, ChevronRight, X,
  BarChart2, Briefcase, Clock, Calendar, Award, BookOpen,
  User, ShieldAlert, LogOut, FileText, ChevronDown,
  FolderOpen, Database,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/asset', label: 'eAsset', icon: Package },
  { path: '/commercial', label: 'eCommercial', icon: Handshake },
  { path: '/finance', label: 'eFinancials', icon: DollarSign },
  { path: '/hrm', label: 'eHRM', icon: Users },
  { path: '/office', label: 'eOffice', icon: Building2 },
  { path: '/procurement', label: 'eProcurement', icon: ShoppingCart },
  { path: '/production', label: 'eProduction', icon: Factory },
  { path: '/subcontract', label: 'eSubcontract', icon: FileSignature },
  { path: '/master-files', label: 'Master Files', icon: Database },
];

const HR_MODULES = [
  { key: 'overview',     label: 'Overview',           icon: BarChart2 },
  { key: 'employees',    label: 'Employee Management', icon: Users },
  { key: 'recruitment',  label: 'Recruitment',         icon: Briefcase },
  { key: 'masterfiles',  label: 'Master Files',        icon: Database },
  { key: 'attendance',   label: 'Attendance & Shifts', icon: Clock },
  { key: 'leave',        label: 'Leave Management',    icon: Calendar },
  { key: 'payroll',      label: 'Payroll',             icon: DollarSign },
  { key: 'performance',  label: 'Performance',         icon: Award },
  { key: 'training',     label: 'Training',            icon: BookOpen },
  { key: 'selfservice',  label: 'Self Service',        icon: User },
  { key: 'disciplinary', label: 'Disciplinary',        icon: ShieldAlert },
  { key: 'hrassets',     label: 'Assets',              icon: Package },
  { key: 'exit',         label: 'Exit Management',     icon: LogOut },
  { key: 'reports',      label: 'Reports',             icon: FileText },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { sidebarOpen, activeModule } = useSelector(s => s.ui);
  const { user } = useSelector(s => s.auth);
  const { leaveRequests } = useSelector(s => s.hr);

  const isHRMActive = location.pathname === '/hrm';
  const pendingLeave = leaveRequests ? leaveRequests.filter(l => l.status === 'Pending').length : 0;

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full z-30 flex flex-col
        bg-dark-900 border-r border-dark-700
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-60' : 'w-16'}
        lg:relative lg:translate-x-0
        ${!sidebarOpen ? '-translate-x-full lg:translate-x-0' : ''}
      `}>

        {/* Logo area */}
        <div className="flex items-center justify-between px-3 h-16 border-b border-dark-700 shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-2 animate-fade-in min-w-0">
              <img src={DGES_LOGO} alt="DGES Logo" className="h-8 w-auto object-contain shrink-0" style={{ filter: 'brightness(1)' }} />
              <div className="min-w-0">
                <p className="text-gold-400 text-[10px] font-semibold uppercase tracking-widest truncate">Enterprise ERP</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto flex items-center justify-center">
              <img src={DGES_LOGO} alt="DGES" className="h-7 w-auto object-contain" />
            </div>
          )}
          <button onClick={() => dispatch(toggleSidebar())} className="text-dark-400 hover:text-gold-400 p-1 rounded transition-colors hidden lg:flex shrink-0 ml-1">
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
          <button onClick={() => dispatch(toggleSidebar())} className="text-dark-300 hover:text-white p-1 rounded transition-colors lg:hidden">
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isHRM = path === '/hrm';
            return (
              <div key={path}>
                <NavLink
                  to={path}
                  onClick={() => { if (isHRM) dispatch(setActiveModule('overview')); }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative
                    ${isActive ? 'bg-gold-500 text-dark-900' : 'text-dark-300 hover:bg-dark-700 hover:text-white'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={18} className={`shrink-0 ${isActive ? 'text-dark-900' : 'text-dark-400 group-hover:text-gold-400'}`} />
                      {sidebarOpen && <span className="truncate animate-fade-in flex-1">{label}</span>}
                      {sidebarOpen && isHRM && (
                        <ChevronDown size={14} className={`shrink-0 transition-transform duration-200 ${isActive ? 'text-dark-900 rotate-180' : 'text-dark-500'}`} />
                      )}
                      {!sidebarOpen && (
                        <span className="absolute left-full ml-2 px-2 py-1 bg-dark-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                          {label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>

                {/* HR Sub-modules shown in sidebar when on /hrm and sidebar open */}
                {isHRM && isHRMActive && sidebarOpen && (
                  <div className="mt-1 ml-3 pl-3 border-l-2 border-gold-600/30 space-y-0.5 pb-1">
                    <p className="text-gold-500/60 text-[9px] font-bold uppercase tracking-widest px-2 pt-1 pb-0.5">HR Management</p>
                    {HR_MODULES.map(({ key, label: subLabel, icon: SubIcon }) => (
                      <button
                        key={key}
                        onClick={() => dispatch(setActiveModule(key))}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left
                          ${activeModule === key
                            ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                            : 'text-dark-400 hover:bg-dark-700 hover:text-white'
                          }`}
                      >
                        <SubIcon size={12} className={`shrink-0 ${activeModule === key ? 'text-gold-400' : 'text-dark-500'}`} />
                        <span className="truncate">{subLabel}</span>
                        {key === 'leave' && pendingLeave > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center shrink-0">{pendingLeave}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User footer */}
        {user && (
          <div className={`border-t border-dark-700 p-3 shrink-0 ${sidebarOpen ? '' : 'flex justify-center'}`}>
            {sidebarOpen ? (
              <div className="flex items-center gap-2 animate-fade-in">
                <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center shrink-0">
                  <span className="text-dark-900 font-bold text-xs">{user.avatar}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{user.name}</p>
                  <p className="text-dark-400 text-[10px] truncate">{user.role}</p>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center">
                <span className="text-dark-900 font-bold text-xs">{user.avatar}</span>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
