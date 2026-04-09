import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, LogOut, User, ChevronDown, Settings } from 'lucide-react';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { logoutAction } from '../../store/actions/authActions';
import { DGES_LOGO } from '../../utils/logoData';

export default function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(s => s.auth);
  const { notifications } = useSelector(s => s.ui);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-dark-100 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-lg text-dark-400 hover:bg-dark-100 hover:text-dark-700 transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Mobile logo — shown only when sidebar is collapsed/hidden */}
        <img
          src={DGES_LOGO}
          alt="DGES"
          className="h-7 w-auto object-contain lg:hidden"
        />

        <div className="hidden md:flex items-center gap-2 bg-dark-50 rounded-lg px-3 py-2 w-64 border border-dark-100">
          <Search size={15} className="text-dark-300 shrink-0" />
          <input
            type="text"
            placeholder="Search modules..."
            className="bg-transparent text-sm text-dark-600 placeholder-dark-300 outline-none w-full"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowUserMenu(false); }}
            className="relative p-2 rounded-lg text-dark-400 hover:bg-dark-100 transition-colors"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full" />
            )}
          </button>
          {showNotif && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-dark-100 z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-dark-100">
                <span className="font-semibold text-dark-800 text-sm">Notifications</span>
                <span className="text-xs text-dark-400">{notifications.length} new</span>
              </div>
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-dark-400 text-sm">No new notifications</div>
              ) : (
                notifications.slice(0, 5).map(n => (
                  <div key={n.id} className="px-4 py-3 border-b border-dark-50 hover:bg-dark-50 transition-colors">
                    <p className="text-sm text-dark-700">{n.message}</p>
                    <p className="text-xs text-dark-400 mt-0.5">{n.time}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotif(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-dark-100 transition-colors"
          >
            <div className="w-7 h-7 gold-gradient rounded-full flex items-center justify-center">
              <span className="text-dark-900 font-bold text-xs">{user?.avatar}</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-dark-800 leading-tight">{user?.name}</p>
              <p className="text-xs text-dark-400">{user?.role}</p>
            </div>
            <ChevronDown size={14} className="text-dark-400 hidden md:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-2xl border border-dark-100 z-50">
              <div className="px-4 py-3 border-b border-dark-100">
                <p className="text-sm font-semibold text-dark-800">{user?.name}</p>
                <p className="text-xs text-dark-400">{user?.email}</p>
              </div>
              <div className="py-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dark-600 hover:bg-dark-50 transition-colors">
                  <User size={15} className="text-dark-400" />
                  My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dark-600 hover:bg-dark-50 transition-colors">
                  <Settings size={15} className="text-dark-400" />
                  Settings
                </button>
                <div className="border-t border-dark-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
