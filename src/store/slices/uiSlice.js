import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    activeModule: null,
    notifications: [],
    theme: 'light',
  },
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
    setSidebarOpen: (state, action) => { state.sidebarOpen = action.payload; },
    setActiveModule: (state, action) => { state.activeModule = action.payload; },
    addNotification: (state, action) => { state.notifications.unshift({ id: Date.now(), ...action.payload }); },
    removeNotification: (state, action) => { state.notifications = state.notifications.filter(n => n.id !== action.payload); },
    clearNotifications: (state) => { state.notifications = []; },
  },
});

export const { toggleSidebar, setSidebarOpen, setActiveModule, addNotification, removeNotification, clearNotifications } = uiSlice.actions;
export default uiSlice.reducer;
