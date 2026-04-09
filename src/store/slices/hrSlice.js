import { createSlice } from '@reduxjs/toolkit';

const hrSlice = createSlice({
  name: 'hr',
  initialState: {
    employees: [],
    attendance: [],
    leaveRequests: [],
    payroll: [],
    recruitment: [],
    performance: [],
    training: [],
    disciplinary: [],
    hrAssets: [],
    exits: [],
    selectedEmployee: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => { state.loading = true; state.error = null; },
    fetchEmployeesSuccess: (state, action) => { state.loading = false; state.employees = action.payload; },
    fetchAttendanceSuccess: (state, action) => { state.loading = false; state.attendance = action.payload; },
    fetchLeaveSuccess: (state, action) => { state.loading = false; state.leaveRequests = action.payload; },
    fetchPayrollSuccess: (state, action) => { state.loading = false; state.payroll = action.payload; },
    fetchRecruitmentSuccess: (state, action) => { state.loading = false; state.recruitment = action.payload; },
    fetchPerformanceSuccess: (state, action) => { state.loading = false; state.performance = action.payload; },
    fetchTrainingSuccess: (state, action) => { state.loading = false; state.training = action.payload; },
    fetchDisciplinarySuccess: (state, action) => { state.loading = false; state.disciplinary = action.payload; },
    fetchHRAssetsSuccess: (state, action) => { state.loading = false; state.hrAssets = action.payload; },
    fetchExitsSuccess: (state, action) => { state.loading = false; state.exits = action.payload; },
    fetchFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    setSelectedEmployee: (state, action) => { state.selectedEmployee = action.payload; },
    addEmployee: (state, action) => { state.employees.unshift(action.payload); },
    updateEmployee: (state, action) => {
      const idx = state.employees.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.employees[idx] = action.payload;
    },
    addLeaveRequest: (state, action) => { state.leaveRequests.unshift(action.payload); },
    updateLeaveRequest: (state, action) => {
      const idx = state.leaveRequests.findIndex(l => l.id === action.payload.id);
      if (idx !== -1) state.leaveRequests[idx] = action.payload;
    },
    addRecruitment: (state, action) => { state.recruitment.unshift(action.payload); },
    addTraining: (state, action) => { state.training.unshift(action.payload); },
    addDisciplinary: (state, action) => { state.disciplinary.unshift(action.payload); },
    addHRAsset: (state, action) => { state.hrAssets.unshift(action.payload); },
    addExit: (state, action) => { state.exits.unshift(action.payload); },
  },
});

export const {
  fetchStart, fetchEmployeesSuccess, fetchAttendanceSuccess,
  fetchLeaveSuccess, fetchPayrollSuccess, fetchRecruitmentSuccess,
  fetchPerformanceSuccess, fetchTrainingSuccess, fetchDisciplinarySuccess,
  fetchHRAssetsSuccess, fetchExitsSuccess,
  fetchFailure, setSelectedEmployee,
  addEmployee, updateEmployee,
  addLeaveRequest, updateLeaveRequest,
  addRecruitment, addTraining, addDisciplinary, addHRAsset, addExit,
} = hrSlice.actions;
export default hrSlice.reducer;
