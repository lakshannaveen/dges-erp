import React, { useState } from 'react';
import {
  Tag, BookOpen, Briefcase, Building2, Clock, MapPin,
  Shield, Calendar, Plus, Save, X, RotateCcw, ChevronRight,
  BarChart2, Search, CheckCircle
} from 'lucide-react';
import { PageHeader, Card, Badge, Table, Modal } from '../components/common';

// ─── Static seed data mirroring the old C# HKM screenshots ──────────────────

const SEED_DESIGNATIONS = [
  { code: '181', description: 'TECHNICAL SALES & MARKETING MANAGER', abbr: 'TECH. SALES & MARKE…', type: 'Executive', status: 'Active' },
  { code: '176', description: 'ACCOUNTANT', abbr: 'ACCOUNTANT', type: 'Executive', status: 'Active' },
  { code: '182', description: 'ACCOUNTS ASSISTANT', abbr: 'ACC. ASST.', type: 'Non Executive', status: 'Active' },
  { code: '202', description: 'ACCOUNTS ASSISTANT - CIVIL PROJECTS', abbr: 'ACCOUNTS ASST. - CIVIL P…', type: 'Non Executive', status: 'Active' },
  { code: '869', description: 'ACCOUNTS CLERK', abbr: 'AC', type: 'Non Executive', status: 'Active' },
  { code: '854', description: 'ACCOUNTS EXECUTIVE', abbr: 'AE', type: 'Executive', status: 'Active' },
  { code: '189', description: 'ACCOUNTS TRAINEE', abbr: 'ACCOUNTS TRAINEE', type: 'Non Executive', status: 'Active' },
  { code: '865', description: 'ACCOUNTS, ADMIN & SAFETY SUPERVISOR', abbr: 'ACC. ADMIN & SEF SUP', type: 'Non Executive', status: 'Active' },
  { code: '114', description: 'ACTING GENERAL MANAGER', abbr: 'ACT. GM.', type: 'Executive', status: 'Active' },
  { code: '023', description: 'ADMINISTRATIVE ASSISTANT', abbr: 'A A', type: 'Non Executive', status: 'Active' },
  { code: '187', description: 'ADMINISTRATIVE ASSISTANT (CIVIL PROJECTS)', abbr: 'ADMIN. ASST. (CIVIL PROJ…', type: 'Non Executive', status: 'Active' },
  { code: '864', description: 'ADMINISTRATIVE ASSISTANT (FINANCE)', abbr: 'ADMIN ASST. (F)', type: 'Non Executive', status: 'Active' },
  { code: '956', description: 'ADMINISTRATIVE ASSISTANT (HUMAN RESOURCE)', abbr: 'ADMIN ASST. (HR)', type: 'Non Executive', status: 'Active' },
  { code: '019', description: 'ASSISTANT ELECTRICAL ENGINEER', abbr: 'ASST. E. ENG.', type: 'Executive', status: 'Active' },
  { code: '172', description: 'ASSISTANT ENGINEER (CIVIL)', abbr: 'ASST. ENG. (CIVIL)', type: 'Executive', status: 'Active' },
  { code: '055', description: 'ASSISTANT ENGINEERING MANAGER', abbr: 'ASST EM', type: 'Executive', status: 'Active' },
  { code: '140', description: 'ASSISTANT GENERAL MANAGER (CIVIL PROPOSAL)', abbr: 'AGM (CP)', type: 'Executive', status: 'Active' },
];

const SEED_EDUCATION = [
  { code: '1', country: 'SRI LANKA', description: 'Below Grade V', conductedBy: '', status: 'Active' },
  { code: '2', country: 'SRI LANKA', description: 'Below Grade VIII', conductedBy: '', status: 'Active' },
  { code: '3', country: 'SRI LANKA', description: 'Upto GCE(O/L) /SSC/ NCGE', conductedBy: '', status: 'Active' },
  { code: '4', country: 'SRI LANKA', description: 'Sat for GCE(O/L) / SSC / NCGE', conductedBy: '', status: 'Active' },
  { code: '5', country: 'SRI LANKA', description: 'Passed GCE(O/L) /SSC / NCGE', conductedBy: '', status: 'Active' },
  { code: '6', country: 'SRI LANKA', description: 'Sat for GCE(A/L)', conductedBy: '', status: 'Active' },
  { code: '7', country: 'SRI LANKA', description: 'Passed GCE(A/L)', conductedBy: '', status: 'Active' },
  { code: '8', country: 'SRI LANKA', description: 'M.Sc.Eng.(Hons.)', conductedBy: '', status: 'Active' },
  { code: '9', country: 'SRI LANKA', description: 'M.Sc.(Eng.)', conductedBy: '', status: 'Active' },
  { code: '10', country: 'SRI LANKA', description: 'B.Sc.Eng.(U.K.)', conductedBy: '', status: 'Active' },
  { code: '11', country: 'SRI LANKA', description: 'B.Sc.Eng.(Hons.)', conductedBy: '', status: 'Active' },
  { code: '12', country: 'SRI LANKA', description: 'B.Sc.Eng.', conductedBy: '', status: 'Active' },
  { code: '13', country: 'SRI LANKA', description: 'M.Sc.', conductedBy: '', status: 'Active' },
  { code: '14', country: 'SRI LANKA', description: 'B.Sc.', conductedBy: '', status: 'Active' },
  { code: '15', country: 'SRI LANKA', description: 'B.Sc.(Hons.)', conductedBy: '', status: 'Active' },
  { code: '16', country: 'SRI LANKA', description: 'M.B.S.(COLOMBO)', conductedBy: '', status: 'Active' },
  { code: '17', country: 'SRI LANKA', description: 'L.L.B.', conductedBy: '', status: 'Active' },
  { code: '18', country: 'SRI LANKA', description: 'UNKNOWN', conductedBy: '', status: 'Active' },
  { code: '19', country: 'SRI LANKA', description: 'B.Com', conductedBy: '', status: 'Active' },
  { code: '20', country: 'SRI LANKA', description: 'B.Com (Hons)', conductedBy: '', status: 'Active' },
  { code: '21', country: 'SRI LANKA', description: 'DIPLOMA IN QUANTITY SURVEYING', conductedBy: 'NAITA', status: 'Active' },
  { code: '99', country: 'SRI LANKA', description: '(NONE)', conductedBy: '', status: 'Active' },
];

const SEED_PROFESSIONAL = [
  { code: '1', country: 'SRI LANKA', description: 'HIGHER DIPLOMA', instituteName: '', duration: '', status: 'Active' },
  { code: '2', country: 'SRI LANKA', description: 'ORDINARY DEGREE', instituteName: '', duration: '', status: 'Active' },
  { code: '3', country: 'SRI LANKA', description: 'HONORS DEGREE', instituteName: '', duration: '', status: 'Active' },
  { code: '4', country: 'SRI LANKA', description: 'M.Sc.', instituteName: '', duration: '', status: 'Active' },
  { code: '5', country: 'SRI LANKA', description: 'Ph.D.', instituteName: '', duration: '', status: 'Active' },
  { code: '6', country: 'SRI LANKA', description: 'HIGHER CERTIFICATE', instituteName: '', duration: '', status: 'Active' },
  { code: '7', country: 'SRI LANKA', description: 'CHARTERED PRELIMINARY', instituteName: '', duration: '', status: 'Active' },
  { code: '8', country: 'SRI LANKA', description: 'DIPLOMA IN ELECTRICAL POWER DISTRIBUTION SYSTEM', instituteName: '', duration: '', status: 'Active' },
  { code: '9', country: 'SRI LANKA', description: 'NATIONAL DIPLOMA IN TECHNOLOGY (N.D.T)', instituteName: '', duration: '', status: 'Active' },
  { code: '10', country: 'SRI LANKA', description: 'SPECIAL APPRENTICE COURSE', instituteName: '', duration: '', status: 'Active' },
  { code: '11', country: 'SRI LANKA', description: 'APPRENTICE COURSE IN ENGINEERING', instituteName: '', duration: '', status: 'Active' },
  { code: '12', country: 'SRI LANKA', description: 'SPECIAL APPRENTICESHIP IN MECHANICAL ENGINEERING', instituteName: '', duration: '', status: 'Active' },
  { code: '13', country: 'SRI LANKA', description: 'B.Sc. DEGREE', instituteName: '', duration: '', status: 'Active' },
  { code: '14', country: 'SRI LANKA', description: 'CHARTED AND MIESL', instituteName: '', duration: '', status: 'Active' },
  { code: '15', country: 'SRI LANKA', description: 'M.Sc. ELECTRICAL ENGINEERING', instituteName: '', duration: '', status: 'Active' },
  { code: '16', country: 'SRI LANKA', description: 'SECRETARIAL COURSE', instituteName: '', duration: '', status: 'Active' },
  { code: '17', country: 'SRI LANKA', description: 'B.COM. DEGREE', instituteName: '', duration: '', status: 'Active' },
  { code: '21', country: 'SRI LANKA', description: 'NATIONAL DIPLOMA IN ENGINEERING SCIENCE', instituteName: '', duration: '', status: 'Active' },
  { code: '22', country: 'SRI LANKA', description: 'DIPLOMA IN ENGINEERING', instituteName: '', duration: '', status: 'Active' },
  { code: '23', country: 'SRI LANKA', description: 'DIPLOMA IN INDUSTRIAL ENGINEERING', instituteName: '', duration: '', status: 'Active' },
  { code: '24', country: 'SRI LANKA', description: 'C.I.B. - GRADUATE', instituteName: '', duration: '', status: 'Active' },
  { code: '25', country: 'SRI LANKA', description: 'N.C.T. E.E.S.', instituteName: '', duration: '', status: 'Active' },
  { code: '26', country: 'SRI LANKA', description: 'AMIESL', instituteName: '', duration: '', status: 'Active' },
];

const SEED_DIVISIONS = [
  { code: 'MAIN', description: 'Main Division', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { code: 'ENG', description: 'Engineering Division', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { code: 'FIN', description: 'Finance Division', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { code: 'OPS', description: 'Operations Division', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
];

const SEED_DEPARTMENTS = [
  { divCode: 'ENG', code: 'CIVIL', description: 'Civil Engineering', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { divCode: 'ENG', code: 'MECH', description: 'Mechanical Engineering', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { divCode: 'ENG', code: 'ELEC', description: 'Electrical Engineering', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { divCode: 'FIN', code: 'ACC', description: 'Accounts', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { divCode: 'FIN', code: 'PROC', description: 'Procurement', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { divCode: 'OPS', code: 'HR', description: 'Human Resources', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { divCode: 'OPS', code: 'ADMIN', description: 'Administration', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
];

const SEED_LOCATIONS = [
  { divCode: 'ENG', deptCode: 'CIVIL', code: 'HO', description: 'Head Office', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { divCode: 'ENG', deptCode: 'MECH', code: 'WK1', description: 'Workshop 1 - Colombo', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
  { divCode: 'OPS', deptCode: 'HR', code: 'HR-HO', description: 'HR Head Office', effectiveDate: '2010-01-01', status: 'Active', inactiveDate: '' },
];

const SEED_SHIFTS = [
  { code: 'DAY', description: 'Day Shift', type: 'Normal', timeIn: '08:00', timeOut: '17:00', status: 'Active' },
  { code: 'NIGHT', description: 'Night Shift', type: 'Rotating', timeIn: '20:00', timeOut: '06:00', status: 'Active' },
  { code: 'GENERAL', description: 'General Shift', type: 'Normal', timeIn: '08:30', timeOut: '17:30', status: 'Active' },
];

const SEED_PROVINCES = [
  { code: 'WP', name: 'Western Province', status: 'Active' },
  { code: 'CP', name: 'Central Province', status: 'Active' },
  { code: 'SP', name: 'Southern Province', status: 'Active' },
  { code: 'NP', name: 'Northern Province', status: 'Active' },
  { code: 'EP', name: 'Eastern Province', status: 'Active' },
  { code: 'NWP', name: 'North Western Province', status: 'Active' },
  { code: 'NCP', name: 'North Central Province', status: 'Active' },
  { code: 'UVA', name: 'Uva Province', status: 'Active' },
  { code: 'SAB', name: 'Sabaragamuwa Province', status: 'Active' },
];

const SEED_DISTRICTS = [
  { provCode: 'WP', provName: 'Western Province', code: 'CMB', name: 'Colombo', status: 'Active' },
  { provCode: 'WP', provName: 'Western Province', code: 'GAM', name: 'Gampaha', status: 'Active' },
  { provCode: 'WP', provName: 'Western Province', code: 'KLT', name: 'Kalutara', status: 'Active' },
  { provCode: 'CP', provName: 'Central Province', code: 'KDY', name: 'Kandy', status: 'Active' },
  { provCode: 'SP', provName: 'Southern Province', code: 'GLE', name: 'Galle', status: 'Active' },
  { provCode: 'SP', provName: 'Southern Province', code: 'MTR', name: 'Matara', status: 'Active' },
];

const SEED_ELECTORATES = [
  { provCode: 'WP', distCode: 'CMB', code: '134', name: 'Colombo Central', status: 'Active' },
  { provCode: 'WP', distCode: 'CMB', code: '135', name: 'Colombo East', status: 'Active' },
  { provCode: 'WP', distCode: 'GAM', code: '140', name: 'Gampaha', status: 'Active' },
];

const SEED_POLICE_STATIONS = [
  { code: '1', electorateCode: '134', name: 'AHANGAMA', status: 'Active' },
  { code: '2', electorateCode: '134', name: 'KADUWELA', status: 'Active' },
  { code: '3', electorateCode: '134', name: 'ATURUGIRIYA', status: 'Active' },
  { code: '4', electorateCode: '134', name: 'BADDEGAMA', status: 'Active' },
  { code: '5', electorateCode: '134', name: 'BALANGODA', status: 'Active' },
  { code: '6', electorateCode: '134', name: 'BANDARAGAMA', status: 'Active' },
  { code: '7', electorateCode: '134', name: 'BENTOTA', status: 'Active' },
  { code: '8', electorateCode: '134', name: 'BORALESGAMUWA', status: 'Active' },
  { code: '9', electorateCode: '134', name: 'BORELLA', status: 'Active' },
  { code: '10', electorateCode: '134', name: 'CHILAW', status: 'Active' },
  { code: '11', electorateCode: '134', name: 'CINNAMON GARDEN', status: 'Active' },
  { code: '12', electorateCode: '134', name: 'DEHIWALA', status: 'Active' },
  { code: '13', electorateCode: '134', name: 'DIKWELA', status: 'Active' },
  { code: '14', electorateCode: '134', name: 'ELPITIYA', status: 'Active' },
  { code: '15', electorateCode: '134', name: 'GALLE', status: 'Active' },
  { code: '16', electorateCode: '134', name: 'GAMPAHA', status: 'Active' },
  { code: '17', electorateCode: '134', name: 'GAMPOLA', status: 'Active' },
  { code: '18', electorateCode: '134', name: 'GANEMULLA', status: 'Active' },
  { code: '19', electorateCode: '134', name: 'GOKARELLA', status: 'Active' },
  { code: '20', electorateCode: '134', name: 'HOMAGAMA', status: 'Active' },
  { code: '21', electorateCode: '12', name: 'MATHTHEGODA', status: 'Active' },
  { code: '22', electorateCode: '134', name: 'JA-ELA', status: 'Active' },
  { code: '23', electorateCode: '134', name: 'KADAWATHA', status: 'Active' },
  { code: '24', electorateCode: '134', name: 'KAHATUDUWA', status: 'Active' },
  { code: '25', electorateCode: '134', name: 'KAHAWATTA', status: 'Active' },
  { code: '26', electorateCode: '134', name: 'KALUTARA', status: 'Active' },
  { code: '27', electorateCode: '134', name: 'KALUTARA NORTH', status: 'Active' },
  { code: '28', electorateCode: '134', name: 'KALUTARA SOUTH', status: 'Active' },
  { code: '29', electorateCode: '134', name: 'KANDANA', status: 'Active' },
  { code: '30', electorateCode: '134', name: 'KATUNAYAKE', status: 'Active' },
  { code: '31', electorateCode: '134', name: 'KEGALLE', status: 'Active' },
  { code: '32', electorateCode: '134', name: 'KEKIRAWA', status: 'Active' },
  { code: '33', electorateCode: '134', name: 'KELANIYA', status: 'Active' },
  { code: '34', electorateCode: '134', name: 'KIRIBATHGODA', status: 'Active' },
  { code: '35', electorateCode: '134', name: 'KIRINDIWELA', status: 'Active' },
  { code: '36', electorateCode: '134', name: 'KIRULAPONE', status: 'Active' },
  { code: '37', electorateCode: '134', name: 'KOCHCHIKADE', status: 'Active' },
];

const SEED_CALENDAR = [
  { date: '2010-01-14', type: 'Mercantile Holiday', hours: 0, description: 'Thai - Pongal Day' },
  { date: '2010-01-29', type: 'Poya Day', hours: 0, description: 'Poya Day' },
  { date: '2010-02-04', type: 'Mercantile Holiday', hours: 0, description: 'National Day' },
  { date: '2010-02-28', type: 'Mercantile Holiday', hours: 0, description: 'Birthday Of Miladh un Nabi' },
  { date: '2010-03-29', type: 'Poya Day', hours: 0, description: 'Poya Day' },
  { date: '2010-04-13', type: 'Mercantile Holiday', hours: 0, description: 'Sinhala New Year' },
  { date: '2010-04-14', type: 'Mercantile Holiday', hours: 0, description: 'Sinhala New Year' },
  { date: '2010-04-15', type: 'Mercantile Holiday', hours: 0, description: 'May Day and Christmas Day' },
  { date: '2010-04-28', type: 'Poya Day', hours: 0, description: 'Poya Day' },
  { date: '2010-05-01', type: 'Mercantile Holiday', hours: 0, description: 'May Day' },
  { date: '2010-12-25', type: 'Mercantile Holiday', hours: 0, description: 'Christmas Day' },
  { date: '2012-02-04', type: 'Mercantile Holiday', hours: 0, description: 'National Day' },
  { date: '2012-04-13', type: 'Mercantile Holiday', hours: 0, description: 'Sinhala New Year' },
  { date: '2012-04-14', type: 'Mercantile Holiday', hours: 0, description: 'Sinhala New Year' },
  { date: '2025-01-14', type: 'Mercantile Holiday', hours: 0, description: 'Thai - Pongal Day' },
  { date: '2025-04-13', type: 'Mercantile Holiday', hours: 0, description: 'Sinhala New Year' },
  { date: '2025-04-14', type: 'Mercantile Holiday', hours: 0, description: 'Sinhala New Year' },
  { date: '2025-05-01', type: 'Mercantile Holiday', hours: 0, description: 'May Day' },
  { date: '2025-12-25', type: 'Mercantile Holiday', hours: 0, description: 'Christmas Day' },
  { date: '2026-01-14', type: 'Mercantile Holiday', hours: 0, description: 'Thai - Pongal Day' },
  { date: '2026-04-13', type: 'Mercantile Holiday', hours: 0, description: 'Sinhala New Year' },
  { date: '2026-04-14', type: 'Mercantile Holiday', hours: 0, description: 'Sinhala New Year' },
];

// ─── Sidebar tabs matching old C# app layout ─────────────────────────────────
const MF_TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart2 },
  { key: 'designation', label: 'Designation Details', icon: Tag },
  { key: 'education', label: 'Educational Details', icon: BookOpen },
  { key: 'professional', label: 'Professional Details', icon: Briefcase },
  { key: 'divdeploc', label: 'Div / Dep / Loc Details', icon: Building2 },
  { key: 'shift', label: 'Shift Details', icon: Clock },
  { key: 'province', label: 'Province / District / Electorate', icon: MapPin },
  { key: 'police', label: 'Police Station Details', icon: Shield },
  { key: 'calendar', label: 'Calendar', icon: Calendar },
];

// ─── Shared field/input styles (replicate old form look) ─────────────────────
const INP = 'border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 focus:outline-none focus:border-blue-500 bg-yellow-50 w-full';
const SEL = 'border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 focus:outline-none focus:border-blue-500 bg-white w-full';

function Lbl({ children, req }) {
  return <label className="block text-xs text-gray-600 mb-0.5 font-medium">{children}{req && <span className="text-red-500">*</span>}</label>;
}

function EntryPanel({ title, children, onSave, onClear }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3 border-b border-blue-100 pb-1">{title}</h4>
      <div className="space-y-2">{children}</div>
      <div className="flex gap-2 mt-3">
        <button onClick={onSave} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded transition-colors">
          <Save size={11} /> Save
        </button>
        <button onClick={onClear} className="flex items-center gap-1 border border-gray-300 hover:bg-gray-50 text-gray-600 text-xs px-3 py-1.5 rounded transition-colors">
          <RotateCcw size={11} /> Clear
        </button>
      </div>
    </div>
  );
}

function GridSection({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-blue-50 border-b border-blue-100 px-4 py-2">
        <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">{title}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Drag a column header here to group by that column</p>
      </div>
      <div className="overflow-auto max-h-64">{children}</div>
    </div>
  );
}

// ─── Designation Details ─────────────────────────────────────────────────────
function DesignationSection() {
  const [rows, setRows] = useState(SEED_DESIGNATIONS);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ code: '', description: '', abbr: '', type: 'Non Executive', status: 'Active' });
  const [saved, setSaved] = useState(false);

  const filtered = rows.filter(r =>
    r.description.toLowerCase().includes(search.toLowerCase()) || r.code.includes(search)
  );

  const handleSave = () => {
    if (!form.code || !form.description) return;
    setRows(prev => {
      const idx = prev.findIndex(r => r.code === form.code);
      if (idx >= 0) { const next = [...prev]; next[idx] = { ...form }; return next; }
      return [...prev, { ...form }];
    });
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="border border-gray-200 rounded px-2 py-1 pl-7 text-xs w-full" placeholder="Search designations…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <GridSection title="Designation Details">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Code', 'Description', 'Abbreviation', 'Type', 'Status', 'Created By'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.code} onClick={() => setForm({ code: r.code, description: r.description, abbr: r.abbr, type: r.type, status: r.status })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.code}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium max-w-xs truncate">{r.description}</td>
                  <td className="px-3 py-1.5 text-gray-500 max-w-[140px] truncate">{r.abbr}</td>
                  <td className="px-3 py-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${r.type === 'Executive' ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'}`}>{r.type}</span>
                  </td>
                  <td className="px-3 py-1.5"><Badge status={r.status} /></td>
                  <td className="px-3 py-1.5 text-gray-400">Jayasena S.D.D.D.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>
      </div>
      <div>
        <EntryPanel title="Designation Entry" onSave={handleSave} onClear={() => setForm({ code: '', description: '', abbr: '', type: 'Non Executive', status: 'Active' })}>
          {saved && <div className="flex items-center gap-1 text-emerald-600 text-xs mb-1"><CheckCircle size={12}/> Saved!</div>}
          <div><Lbl req>Code</Lbl><input className={INP} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} /></div>
          <div><Lbl req>Description</Lbl><input className={INP} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
          <div><Lbl>Abbreviation</Lbl><input className={INP} value={form.abbr} onChange={e => setForm(f => ({ ...f, abbr: e.target.value }))} /></div>
          <div>
            <Lbl>Type</Lbl>
            <select className={SEL} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option>Executive</option><option>Non Executive</option>
            </select>
          </div>
          <div>
            <Lbl>Status</Lbl>
            <select className={SEL} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </EntryPanel>
      </div>
    </div>
  );
}

// ─── Educational Details ──────────────────────────────────────────────────────
function EducationSection() {
  const [rows, setRows] = useState(SEED_EDUCATION);
  const [form, setForm] = useState({ code: '', country: 'SRI LANKA', description: '', conductedBy: '', status: 'Active' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!form.code || !form.description) return;
    setRows(prev => {
      const idx = prev.findIndex(r => r.code === form.code);
      if (idx >= 0) { const next = [...prev]; next[idx] = { ...form }; return next; }
      return [...prev, { ...form }];
    });
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <GridSection title="Educational Details">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Qual. Code', 'Country Code', 'Country', 'Description', 'Conducted By', 'Status'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.code} onClick={() => setForm({ code: r.code, country: r.country, description: r.description, conductedBy: r.conductedBy, status: r.status })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.code}</td>
                  <td className="px-3 py-1.5 text-gray-500">201</td>
                  <td className="px-3 py-1.5 text-gray-700">{r.country}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium">{r.description}</td>
                  <td className="px-3 py-1.5 text-gray-500">{r.conductedBy}</td>
                  <td className="px-3 py-1.5"><Badge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>
      </div>
      <div>
        <EntryPanel title="Education Data Entry" onSave={handleSave} onClear={() => setForm({ code: '', country: 'SRI LANKA', description: '', conductedBy: '', status: 'Active' })}>
          {saved && <div className="flex items-center gap-1 text-emerald-600 text-xs mb-1"><CheckCircle size={12}/> Saved!</div>}
          <div><Lbl req>Qualification Code</Lbl><input className={INP} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} /></div>
          <div>
            <Lbl>Country</Lbl>
            <select className={SEL} value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}>
              <option>SRI LANKA</option><option>INDIA</option><option>UNITED KINGDOM</option><option>AUSTRALIA</option><option>USA</option>
            </select>
          </div>
          <div><Lbl req>Description</Lbl><input className={INP} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
          <div><Lbl>Conducted By</Lbl><input className={INP} value={form.conductedBy} onChange={e => setForm(f => ({ ...f, conductedBy: e.target.value }))} /></div>
          <div>
            <Lbl>Status</Lbl>
            <select className={SEL} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </EntryPanel>
      </div>
    </div>
  );
}

// ─── Professional Details ─────────────────────────────────────────────────────
function ProfessionalSection() {
  const [rows, setRows] = useState(SEED_PROFESSIONAL);
  const [form, setForm] = useState({ code: '', country: 'SRI LANKA', description: '', instituteName: '', duration: '', status: 'Active' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!form.code || !form.description) return;
    setRows(prev => {
      const idx = prev.findIndex(r => r.code === form.code);
      if (idx >= 0) { const next = [...prev]; next[idx] = { ...form }; return next; }
      return [...prev, { ...form }];
    });
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <GridSection title="Professional Details">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Qual. Code', 'Country', 'Description', 'Institute Name', 'Duration', 'Status'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.code} onClick={() => setForm({ code: r.code, country: r.country, description: r.description, instituteName: r.instituteName, duration: r.duration, status: r.status })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.code}</td>
                  <td className="px-3 py-1.5 text-gray-700">{r.country}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium max-w-xs truncate">{r.description}</td>
                  <td className="px-3 py-1.5 text-gray-500">{r.instituteName}</td>
                  <td className="px-3 py-1.5 text-gray-500">{r.duration}</td>
                  <td className="px-3 py-1.5"><Badge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>
      </div>
      <div>
        <EntryPanel title="Professional Details Entry" onSave={handleSave} onClear={() => setForm({ code: '', country: 'SRI LANKA', description: '', instituteName: '', duration: '', status: 'Active' })}>
          {saved && <div className="flex items-center gap-1 text-emerald-600 text-xs mb-1"><CheckCircle size={12}/> Saved!</div>}
          <div><Lbl req>Qualification Code</Lbl><input className={INP} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} /></div>
          <div>
            <Lbl>Country</Lbl>
            <select className={SEL} value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}>
              <option>SRI LANKA</option><option>INDIA</option><option>UNITED KINGDOM</option><option>AUSTRALIA</option><option>USA</option>
            </select>
          </div>
          <div><Lbl req>Description</Lbl><input className={INP} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
          <div><Lbl>Institute Name</Lbl><input className={INP} value={form.instituteName} onChange={e => setForm(f => ({ ...f, instituteName: e.target.value }))} /></div>
          <div><Lbl>Duration</Lbl><input className={INP} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} /></div>
          <div>
            <Lbl>Status</Lbl>
            <select className={SEL} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </EntryPanel>
      </div>
    </div>
  );
}

// ─── Div / Dep / Loc Details ─────────────────────────────────────────────────
function DivDepLocSection() {
  const today = new Date().toISOString().split('T')[0];
  const [divisions, setDivisions] = useState(SEED_DIVISIONS);
  const [departments, setDepartments] = useState(SEED_DEPARTMENTS);
  const [locations, setLocations] = useState(SEED_LOCATIONS);
  const [selDiv, setSelDiv] = useState('');
  const [divForm, setDivForm] = useState({ code: '', description: '', effectiveDate: today, inactiveDate: today, status: 'Active' });
  const [deptForm, setDeptForm] = useState({ divCode: '', code: '', description: '', effectiveDate: today, inactiveDate: today, status: 'Active' });
  const [locForm, setLocForm] = useState({ divCode: '', deptCode: '', code: '', description: '', effectiveDate: today, inactiveDate: today, status: 'Active' });

  const filtDepts = selDiv ? departments.filter(d => d.divCode === selDiv) : departments;

  const saveDivision = () => {
    if (!divForm.code) return;
    setDivisions(prev => {
      const idx = prev.findIndex(d => d.code === divForm.code);
      if (idx >= 0) { const n = [...prev]; n[idx] = { ...divForm }; return n; }
      return [...prev, { ...divForm }];
    });
    setDivForm({ code: '', description: '', effectiveDate: today, inactiveDate: today, status: 'Active' });
  };

  const saveDept = () => {
    if (!deptForm.code) return;
    setDepartments(prev => {
      const idx = prev.findIndex(d => d.code === deptForm.code && d.divCode === deptForm.divCode);
      if (idx >= 0) { const n = [...prev]; n[idx] = { ...deptForm }; return n; }
      return [...prev, { ...deptForm }];
    });
    setDeptForm({ divCode: '', code: '', description: '', effectiveDate: today, inactiveDate: today, status: 'Active' });
  };

  const saveLoc = () => {
    if (!locForm.code) return;
    setLocations(prev => {
      const idx = prev.findIndex(l => l.code === locForm.code);
      if (idx >= 0) { const n = [...prev]; n[idx] = { ...locForm }; return n; }
      return [...prev, { ...locForm }];
    });
    setLocForm({ divCode: '', deptCode: '', code: '', description: '', effectiveDate: today, inactiveDate: today, status: 'Active' });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left: Division / Department / Location grids */}
      <div className="space-y-4">
        {/* Division Selector */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">Division Details</p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Lbl>Select Division</Lbl>
              <select className={SEL} value={selDiv} onChange={e => setSelDiv(e.target.value)}>
                <option value="">All Divisions</option>
                {divisions.map(d => <option key={d.code} value={d.code}>{d.description}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <Lbl>Description</Lbl>
              <input className={INP} readOnly value={divisions.find(d => d.code === selDiv)?.description || ''} />
            </div>
          </div>
        </div>

        {/* Department Details grid */}
        <GridSection title="Department Details">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Code', 'Description', 'Effective Date', 'Status', 'Inactive Date'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtDepts.map((r, i) => (
                <tr key={r.code + r.divCode} onClick={() => setDeptForm({ divCode: r.divCode, code: r.code, description: r.description, effectiveDate: r.effectiveDate, inactiveDate: r.inactiveDate || today, status: r.status })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.code}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium">{r.description}</td>
                  <td className="px-3 py-1.5 text-gray-500">{r.effectiveDate}</td>
                  <td className="px-3 py-1.5"><Badge status={r.status} /></td>
                  <td className="px-3 py-1.5 text-gray-500">{r.inactiveDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>

        {/* Location Details grid */}
        <GridSection title="Location Details">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Code', 'Description', 'Effective Date', 'Status', 'Inactive Date'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {locations.map((r, i) => (
                <tr key={r.code} onClick={() => setLocForm({ divCode: r.divCode, deptCode: r.deptCode, code: r.code, description: r.description, effectiveDate: r.effectiveDate, inactiveDate: r.inactiveDate || today, status: r.status })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.code}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium">{r.description}</td>
                  <td className="px-3 py-1.5 text-gray-500">{r.effectiveDate}</td>
                  <td className="px-3 py-1.5"><Badge status={r.status} /></td>
                  <td className="px-3 py-1.5 text-gray-500">{r.inactiveDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>
      </div>

      {/* Right: Entry forms */}
      <div className="space-y-4">
        {/* Create New Division */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">Create New Division</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div><Lbl req>Division Code</Lbl><input className={INP} value={divForm.code} onChange={e => setDivForm(f => ({ ...f, code: e.target.value }))} /></div>
            <div><Lbl req>Description</Lbl><input className={INP} value={divForm.description} onChange={e => setDivForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div><Lbl>Effective Date</Lbl><input className={INP} type="date" value={divForm.effectiveDate} onChange={e => setDivForm(f => ({ ...f, effectiveDate: e.target.value }))} /></div>
            <div><Lbl>Inactive Date</Lbl><input className={INP} type="date" value={divForm.inactiveDate} onChange={e => setDivForm(f => ({ ...f, inactiveDate: e.target.value }))} /></div>
            <div><Lbl>Status</Lbl><select className={SEL} value={divForm.status} onChange={e => setDivForm(f => ({ ...f, status: e.target.value }))}><option>Active</option><option>Inactive</option></select></div>
          </div>
          <div className="flex gap-2">
            <button onClick={saveDivision} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded"><Save size={11} /> Save</button>
            <button onClick={() => setDivForm({ code: '', description: '', effectiveDate: today, inactiveDate: today, status: 'Active' })} className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded"><RotateCcw size={11} /> Clear</button>
          </div>
        </div>

        {/* Create New Department */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">Create New Department</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div><Lbl>Division Code</Lbl><input className={INP} value={deptForm.divCode} onChange={e => setDeptForm(f => ({ ...f, divCode: e.target.value }))} /></div>
            <div><Lbl req>Department Code</Lbl><input className={INP} value={deptForm.code} onChange={e => setDeptForm(f => ({ ...f, code: e.target.value }))} /></div>
            <div className="col-span-2"><Lbl req>Description</Lbl><input className={INP} value={deptForm.description} onChange={e => setDeptForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div><Lbl>Effective Date</Lbl><input className={INP} type="date" value={deptForm.effectiveDate} onChange={e => setDeptForm(f => ({ ...f, effectiveDate: e.target.value }))} /></div>
            <div><Lbl>Inactive Date</Lbl><input className={INP} type="date" value={deptForm.inactiveDate} onChange={e => setDeptForm(f => ({ ...f, inactiveDate: e.target.value }))} /></div>
            <div><Lbl>Status</Lbl><select className={SEL} value={deptForm.status} onChange={e => setDeptForm(f => ({ ...f, status: e.target.value }))}><option>Active</option><option>Inactive</option></select></div>
          </div>
          <div className="flex gap-2">
            <button onClick={saveDept} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded"><Save size={11} /> Save</button>
            <button onClick={() => setDeptForm({ divCode: '', code: '', description: '', effectiveDate: today, inactiveDate: today, status: 'Active' })} className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded"><RotateCcw size={11} /> Clear</button>
          </div>
        </div>

        {/* Create New Location */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">Create New Location</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div><Lbl>Division Code</Lbl><input className={INP} readOnly value={locForm.divCode} /></div>
            <div><Lbl>Department Code</Lbl><input className={INP} readOnly value={locForm.deptCode} /></div>
            <div><Lbl req>Location Code</Lbl><input className={INP} value={locForm.code} onChange={e => setLocForm(f => ({ ...f, code: e.target.value }))} /></div>
            <div className="col-span-1"><Lbl req>Description</Lbl><input className={INP} value={locForm.description} onChange={e => setLocForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div><Lbl>Effective Date</Lbl><input className={INP} type="date" value={locForm.effectiveDate} onChange={e => setLocForm(f => ({ ...f, effectiveDate: e.target.value }))} /></div>
            <div><Lbl>Inactive Date</Lbl><input className={INP} type="date" value={locForm.inactiveDate} onChange={e => setLocForm(f => ({ ...f, inactiveDate: e.target.value }))} /></div>
            <div><Lbl>Status</Lbl><select className={SEL} value={locForm.status} onChange={e => setLocForm(f => ({ ...f, status: e.target.value }))}><option>Active</option><option>Inactive</option></select></div>
          </div>
          <div className="flex gap-2">
            <button onClick={saveLoc} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded"><Save size={11} /> Save</button>
            <button onClick={() => setLocForm({ divCode: '', deptCode: '', code: '', description: '', effectiveDate: today, inactiveDate: today, status: 'Active' })} className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded"><RotateCcw size={11} /> Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shift Details ────────────────────────────────────────────────────────────
function ShiftSection() {
  const [shifts, setShifts] = useState(SEED_SHIFTS);
  const [form, setForm] = useState({ code: '', description: '', type: 'Normal', timeIn: '08:00', timeOut: '17:00', status: 'Active', shortLeave: 2 });
  const [saved, setSaved] = useState(false);
  const [dailyRows] = useState([
    { dayType: 'Weekday', inTime: '08:00', outTime: '17:00', lunchIn: '12:00', lunchOut: '13:00', dinnerIn: '', dinnerOut: '', shiftAllow: 0, otBase: 9, otStart: 17 },
    { dayType: 'Saturday', inTime: '08:00', outTime: '13:00', lunchIn: '', lunchOut: '', dinnerIn: '', dinnerOut: '', shiftAllow: 0, otBase: 5, otStart: 13 },
  ]);
  const [ruleRows] = useState([
    { ruleNo: 1, inStart: '07:30', inEnd: '08:15', outStart: '16:30', outEnd: '17:30', deducted: 0, fullAtt: 5, lateAtt: 3 },
  ]);

  const handleSave = () => {
    if (!form.code) return;
    setShifts(prev => {
      const idx = prev.findIndex(s => s.code === form.code);
      if (idx >= 0) { const n = [...prev]; n[idx] = { code: form.code, description: form.description, type: form.type, timeIn: form.timeIn, timeOut: form.timeOut, status: form.status }; return n; }
      return [...prev, { code: form.code, description: form.description, type: form.type, timeIn: form.timeIn, timeOut: form.timeOut, status: form.status }];
    });
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="space-y-4">
      {/* Shift Type entry */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">Shift Type</p>
        {saved && <div className="flex items-center gap-1 text-emerald-600 text-xs mb-2"><CheckCircle size={12}/> Saved!</div>}
        <div className="grid grid-cols-6 gap-3 items-end">
          <div><Lbl req>Shift Code</Lbl><input className={INP} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} /></div>
          <div className="col-span-2"><Lbl>Description</Lbl><input className={INP} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
          <div><Lbl>Status</Lbl><select className={SEL} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option>Active</option><option>Inactive</option></select></div>
          <div className="col-span-2 flex gap-2 items-end">
            <button onClick={handleSave} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded"><Save size={11} /> Save</button>
            <button onClick={() => setForm({ code: '', description: '', type: 'Normal', timeIn: '08:00', timeOut: '17:00', status: 'Active', shortLeave: 2 })} className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded"><RotateCcw size={11} /> Clear</button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3 items-end mt-2">
          <div>
            <Lbl>Shift Type</Lbl>
            <select className={SEL} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option>Normal</option><option>Rotating</option><option>Flexible</option>
            </select>
          </div>
          <div><Lbl>Time In</Lbl><input className={INP} type="time" value={form.timeIn} onChange={e => setForm(f => ({ ...f, timeIn: e.target.value }))} /></div>
          <div><Lbl>Time Out</Lbl><input className={INP} type="time" value={form.timeOut} onChange={e => setForm(f => ({ ...f, timeOut: e.target.value }))} /></div>
          <div><Lbl>No. of Short Leave Allow</Lbl><input className={INP} type="number" value={form.shortLeave} onChange={e => setForm(f => ({ ...f, shortLeave: parseInt(e.target.value) }))} /></div>
        </div>
      </div>

      {/* Existing Shifts */}
      <GridSection title="Defined Shifts">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Shift Code', 'Description', 'Type', 'Time In', 'Time Out', 'Status'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shifts.map((r, i) => (
              <tr key={r.code} onClick={() => setForm({ code: r.code, description: r.description, type: r.type, timeIn: r.timeIn, timeOut: r.timeOut, status: r.status, shortLeave: 2 })}
                className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.code}</td>
                <td className="px-3 py-1.5 text-gray-800 font-medium">{r.description}</td>
                <td className="px-3 py-1.5 text-gray-500">{r.type}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.timeIn}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.timeOut}</td>
                <td className="px-3 py-1.5"><Badge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GridSection>

      {/* Daily Time Details */}
      <GridSection title="Daily Time Details">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Day Type', 'Time In', 'Time Out', 'Lunch In', 'Lunch Out', 'Dinner In', 'Dinner Out', 'Shift Allow', 'OT Base', 'OT Start'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dailyRows.map((r, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="px-3 py-1.5 font-medium text-gray-800">{r.dayType}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.inTime}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.outTime}</td>
                <td className="px-3 py-1.5 text-gray-500">{r.lunchIn}</td>
                <td className="px-3 py-1.5 text-gray-500">{r.lunchOut}</td>
                <td className="px-3 py-1.5 text-gray-400">{r.dinnerIn || '—'}</td>
                <td className="px-3 py-1.5 text-gray-400">{r.dinnerOut || '—'}</td>
                <td className="px-3 py-1.5 text-gray-500">{r.shiftAllow}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.otBase}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.otStart}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GridSection>

      {/* Rule Details */}
      <GridSection title="Rule Details">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Rule No', 'In Start Time', 'In End Time', 'Out Start Time', 'Out End Time', 'Hours Deducted', 'No of Full Attendance', 'No of Late Attendance'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ruleRows.map((r, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="px-3 py-1.5 text-blue-700 font-semibold">{r.ruleNo}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.inStart}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.inEnd}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.outStart}</td>
                <td className="px-3 py-1.5 text-gray-600">{r.outEnd}</td>
                <td className="px-3 py-1.5 text-gray-500">{r.deducted}</td>
                <td className="px-3 py-1.5 text-gray-500">{r.fullAtt}</td>
                <td className="px-3 py-1.5 text-gray-500">{r.lateAtt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GridSection>
    </div>
  );
}

// ─── Province / District / Electorate ────────────────────────────────────────
function ProvinceSection() {
  const [provinces, setProvinces] = useState(SEED_PROVINCES);
  const [districts, setDistricts] = useState(SEED_DISTRICTS);
  const [electorates, setElectorates] = useState(SEED_ELECTORATES);
  const [provForm, setProvForm] = useState({ code: '', name: '', status: 'Active' });
  const [distForm, setDistForm] = useState({ code: '', name: '', status: 'Active' });
  const [elecForm, setElecForm] = useState({ code: '', name: '', status: 'Active' });

  const saveProvince = () => {
    if (!provForm.code) return;
    setProvinces(prev => {
      const idx = prev.findIndex(p => p.code === provForm.code);
      if (idx >= 0) { const n = [...prev]; n[idx] = { ...provForm }; return n; }
      return [...prev, { ...provForm }];
    });
    setProvForm({ code: '', name: '', status: 'Active' });
  };

  const saveDistrict = () => {
    if (!distForm.code) return;
    setDistricts(prev => {
      const idx = prev.findIndex(d => d.code === distForm.code);
      if (idx >= 0) { const n = [...prev]; n[idx] = { ...distForm, provCode: 'WP', provName: 'Western Province' }; return n; }
      return [...prev, { ...distForm, provCode: 'WP', provName: 'Western Province' }];
    });
    setDistForm({ code: '', name: '', status: 'Active' });
  };

  const saveElectorate = () => {
    if (!elecForm.code) return;
    setElectorates(prev => {
      const idx = prev.findIndex(e => e.code === elecForm.code);
      if (idx >= 0) { const n = [...prev]; n[idx] = { ...elecForm, provCode: 'WP', distCode: 'CMB' }; return n; }
      return [...prev, { ...elecForm, provCode: 'WP', distCode: 'CMB' }];
    });
    setElecForm({ code: '', name: '', status: 'Active' });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* LEFT: Province Details & Electorate Details grids */}
      <div className="space-y-4">
        {/* Province entry form */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">Province Details</p>
          <div className="grid grid-cols-3 gap-2 items-end">
            <div><Lbl req>Province Code</Lbl><input className={INP} value={provForm.code} onChange={e => setProvForm(f => ({ ...f, code: e.target.value }))} placeholder="e.g. WP" /></div>
            <div className="col-span-2"><Lbl>Province Name</Lbl><input className={INP} value={provForm.name} onChange={e => setProvForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><Lbl>Status</Lbl><select className={SEL} value={provForm.status} onChange={e => setProvForm(f => ({ ...f, status: e.target.value }))}><option>Active</option><option>Inactive</option></select></div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={saveProvince} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded"><Save size={11} /> Save</button>
            <button onClick={() => setProvForm({ code: '', name: '', status: 'Active' })} className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded"><RotateCcw size={11} /> Clear</button>
          </div>
        </div>

        {/* Districts Grid */}
        <GridSection title="District Details">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Province Code', 'Province Name', 'District Code', 'District Name', 'Status'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {districts.map((r, i) => (
                <tr key={r.code} onClick={() => setDistForm({ code: r.code, name: r.name, status: r.status })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.provCode}</td>
                  <td className="px-3 py-1.5 text-gray-600">{r.provName}</td>
                  <td className="px-3 py-1.5 font-mono text-gray-700 font-semibold">{r.code}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium">{r.name}</td>
                  <td className="px-3 py-1.5"><Badge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>

        {/* Electorates Grid */}
        <GridSection title="Electorate Details">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Province Code', 'District Code', 'Electorate Code', 'Electorate Name', 'Status'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {electorates.map((r, i) => (
                <tr key={r.code} onClick={() => setElecForm({ code: r.code, name: r.name, status: r.status })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.provCode}</td>
                  <td className="px-3 py-1.5 font-mono text-gray-700">{r.distCode}</td>
                  <td className="px-3 py-1.5 font-mono text-gray-700 font-semibold">{r.code}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium">{r.name}</td>
                  <td className="px-3 py-1.5"><Badge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>
      </div>

      {/* RIGHT: District & Electorate entry + Province list */}
      <div className="space-y-4">
        {/* District Details Entry */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">District Details Entry</p>
          <div className="grid grid-cols-2 gap-2 items-end">
            <div><Lbl req>District Code</Lbl><input className={INP} value={distForm.code} onChange={e => setDistForm(f => ({ ...f, code: e.target.value }))} /></div>
            <div><Lbl req>District Name</Lbl><input className={INP} value={distForm.name} onChange={e => setDistForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><Lbl>Status</Lbl><select className={SEL} value={distForm.status} onChange={e => setDistForm(f => ({ ...f, status: e.target.value }))}><option>Active</option><option>Inactive</option></select></div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={saveDistrict} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded"><Save size={11} /> Save</button>
            <button onClick={() => setDistForm({ code: '', name: '', status: 'Active' })} className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded"><RotateCcw size={11} /> Clear</button>
          </div>
        </div>

        {/* Electorate Details Entry */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">Electorate Details Entry</p>
          <div className="grid grid-cols-2 gap-2 items-end">
            <div><Lbl req>Electorate Code</Lbl><input className={INP} value={elecForm.code} onChange={e => setElecForm(f => ({ ...f, code: e.target.value }))} /></div>
            <div><Lbl req>Electorate Name</Lbl><input className={INP} value={elecForm.name} onChange={e => setElecForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><Lbl>Status</Lbl><select className={SEL} value={elecForm.status} onChange={e => setElecForm(f => ({ ...f, status: e.target.value }))}><option>Active</option><option>Inactive</option></select></div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={saveElectorate} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded"><Save size={11} /> Save</button>
            <button onClick={() => setElecForm({ code: '', name: '', status: 'Active' })} className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded"><RotateCcw size={11} /> Clear</button>
          </div>
        </div>

        {/* Province List */}
        <GridSection title="Provinces">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Code', 'Province Name', 'Status'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {provinces.map((r, i) => (
                <tr key={r.code} onClick={() => setProvForm({ code: r.code, name: r.name, status: r.status })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.code}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium">{r.name}</td>
                  <td className="px-3 py-1.5"><Badge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>
      </div>
    </div>
  );
}

// ─── Police Station Details ───────────────────────────────────────────────────
function PoliceStationSection() {
  const [stations, setStations] = useState(SEED_POLICE_STATIONS);
  const [form, setForm] = useState({ code: '', electorateCode: '', name: '', status: 'Active' });
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);

  const filtered = stations.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.code.includes(search)
  );

  const handleSave = () => {
    if (!form.code || !form.name) return;
    setStations(prev => {
      const idx = prev.findIndex(s => s.code === form.code);
      if (idx >= 0) { const n = [...prev]; n[idx] = { ...form }; return n; }
      return [...prev, { ...form }];
    });
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative flex-1">
            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="border border-gray-200 rounded px-2 py-1 pl-7 text-xs w-full" placeholder="Search stations…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <GridSection title="Police Station Details">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Station Code', 'Electorate Code', 'Station Name', 'Status', 'Created By', 'Created Date', 'Updated By', 'Updated Date'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.code} onClick={() => setForm({ code: r.code, electorateCode: r.electorateCode, name: r.name, status: r.status })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.code}</td>
                  <td className="px-3 py-1.5 text-gray-600">{r.electorateCode}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium">{r.name}</td>
                  <td className="px-3 py-1.5"><Badge status={r.status} /></td>
                  <td className="px-3 py-1.5 text-gray-400">Not Available</td>
                  <td className="px-3 py-1.5 text-gray-400">1899-12-30</td>
                  <td className="px-3 py-1.5 text-gray-400">Not Available</td>
                  <td className="px-3 py-1.5 text-gray-400">1899-12-30</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>
      </div>
      <div>
        <EntryPanel title="Police Station Data Entry" onSave={handleSave} onClear={() => setForm({ code: '', electorateCode: '', name: '', status: 'Active' })}>
          {saved && <div className="flex items-center gap-1 text-emerald-600 text-xs mb-1"><CheckCircle size={12}/> Saved!</div>}
          <div><Lbl req>Code</Lbl><input className={INP} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} /></div>
          <div>
            <Lbl>Electorate Name</Lbl>
            <select className={SEL} value={form.electorateCode} onChange={e => setForm(f => ({ ...f, electorateCode: e.target.value }))}>
              <option value="">Select...</option>
              {SEED_ELECTORATES.map(e => <option key={e.code} value={e.code}>{e.name}</option>)}
            </select>
          </div>
          <div><Lbl req>Station Name</Lbl><input className={INP} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div>
            <Lbl>Status</Lbl>
            <select className={SEL} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option>Active</option><option>Inactive</option>
            </select>
          </div>
        </EntryPanel>
      </div>
    </div>
  );
}

// ─── Calendar ─────────────────────────────────────────────────────────────────
function CalendarSection() {
  const today = new Date().toISOString().split('T')[0];
  const [holidays, setHolidays] = useState(SEED_CALENDAR);
  const [form, setForm] = useState({ date: today, type: '', hours: 0, description: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!form.date || !form.type) return;
    setHolidays(prev => {
      const idx = prev.findIndex(h => h.date === form.date);
      if (idx >= 0) { const n = [...prev]; n[idx] = { ...form }; return n; }
      return [...prev, { ...form }].sort((a, b) => a.date.localeCompare(b.date));
    });
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <GridSection title="Calendar — Holiday Schedule">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Date', 'Holiday Type', 'No of Hours', 'Description', 'Created By', 'Created Date', 'Updated By'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holidays.map((r, i) => (
                <tr key={r.date + r.type} onClick={() => setForm({ date: r.date, type: r.type, hours: r.hours, description: r.description })}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${i === 0 ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-1.5 font-mono text-blue-700 font-semibold">{r.date}</td>
                  <td className="px-3 py-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      r.type === 'Mercantile Holiday' ? 'bg-orange-100 text-orange-700' :
                      r.type === 'Poya Day' ? 'bg-purple-100 text-purple-700' :
                      r.type === 'Company Holiday' ? 'bg-blue-100 text-blue-700' :
                      r.type === 'Half Day' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{r.type}</span>
                  </td>
                  <td className="px-3 py-1.5 text-gray-500">{r.hours}</td>
                  <td className="px-3 py-1.5 text-gray-800 font-medium">{r.description}</td>
                  <td className="px-3 py-1.5 text-gray-400">· Not Available</td>
                  <td className="px-3 py-1.5 text-gray-400"></td>
                  <td className="px-3 py-1.5 text-gray-400">· Not Available</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GridSection>
      </div>
      <div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-3 border-b border-blue-100 pb-1">Holiday Entry</p>
          {saved && <div className="flex items-center gap-1 text-emerald-600 text-xs mb-2"><CheckCircle size={12}/> Saved!</div>}
          <div className="space-y-2">
            <div><Lbl req>Date</Lbl><input className={INP} type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
            <div>
              <Lbl req>Type</Lbl>
              <select className={SEL} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="">Select...</option>
                <option>Mercantile Holiday</option>
                <option>Poya Day</option>
                <option>Company Holiday</option>
                <option>Half Day</option>
                <option>Bank Holiday</option>
              </select>
            </div>
            <div>
              <Lbl>No of Hours</Lbl>
              <input className={INP} type="number" min="0" max="12" value={form.hours} onChange={e => setForm(f => ({ ...f, hours: parseInt(e.target.value) }))} />
            </div>
            <div>
              <Lbl>Description</Lbl>
              <input className={INP} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={handleSave} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded"><Save size={11} /> Save</button>
            <button onClick={() => setForm({ date: today, type: '', hours: 0, description: '' })} className="flex items-center gap-1 border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded"><RotateCcw size={11} /> Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function OverviewSection({ setTab }) {
  const cards = [
    { key: 'designation', label: 'Designation Details', icon: Tag, count: SEED_DESIGNATIONS.length, color: 'bg-blue-50 text-blue-600', desc: 'Job titles, abbreviations & types' },
    { key: 'education', label: 'Educational Details', icon: BookOpen, count: SEED_EDUCATION.length, color: 'bg-emerald-50 text-emerald-600', desc: 'Academic qualifications reference' },
    { key: 'professional', label: 'Professional Details', icon: Briefcase, count: SEED_PROFESSIONAL.length, color: 'bg-purple-50 text-purple-600', desc: 'Professional certifications & degrees' },
    { key: 'divdeploc', label: 'Div / Dep / Loc', icon: Building2, count: SEED_DIVISIONS.length + SEED_DEPARTMENTS.length, color: 'bg-orange-50 text-orange-600', desc: 'Organizational structure master data' },
    { key: 'shift', label: 'Shift Details', icon: Clock, count: SEED_SHIFTS.length, color: 'bg-sky-50 text-sky-600', desc: 'Work shift configurations & rules' },
    { key: 'province', label: 'Province / District / Electorate', icon: MapPin, count: SEED_PROVINCES.length + SEED_DISTRICTS.length, color: 'bg-teal-50 text-teal-600', desc: 'Geographic administrative data' },
    { key: 'police', label: 'Police Station Details', icon: Shield, count: SEED_POLICE_STATIONS.length, color: 'bg-red-50 text-red-600', desc: 'Police station reference data' },
    { key: 'calendar', label: 'Calendar', icon: Calendar, count: SEED_CALENDAR.length, color: 'bg-amber-50 text-amber-600', desc: 'Public & company holiday schedule' },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Masters</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{cards.reduce((a, c) => a + c.count, 0)}</p>
          <p className="text-xs text-gray-400 mt-0.5">Records across all sections</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Designations</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{SEED_DESIGNATIONS.length}</p>
          <p className="text-xs text-emerald-600 mt-0.5">All Active</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Holidays (2026)</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{SEED_CALENDAR.filter(c => c.date.startsWith('2026')).length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Scheduled this year</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Police Stations</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{SEED_POLICE_STATIONS.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Reference entries</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <button key={c.key} onClick={() => setTab(c.key)}
            className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-blue-400 hover:shadow-md transition-all group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${c.color}`}>
              <c.icon size={20} />
            </div>
            <p className="font-semibold text-gray-800 text-sm">{c.label}</p>
            <p className="text-xs text-gray-400 mt-0.5 mb-2">{c.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600">{c.count} records</span>
              <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MasterFilesPage() {
  const [tab, setTab] = useState('overview');
  const activeTab = MF_TABS.find(t => t.key === tab);

  const renderContent = () => {
    switch (tab) {
      case 'overview': return <OverviewSection setTab={setTab} />;
      case 'designation': return <DesignationSection />;
      case 'education': return <EducationSection />;
      case 'professional': return <ProfessionalSection />;
      case 'divdeploc': return <DivDepLocSection />;
      case 'shift': return <ShiftSection />;
      case 'province': return <ProvinceSection />;
      case 'police': return <PoliceStationSection />;
      case 'calendar': return <CalendarSection />;
      default: return null;
    }
  };

  return (
    <div className="-m-4 lg:-m-6 min-h-full bg-gray-50">
      <div className="px-4 lg:px-6 pt-4 lg:pt-6">
        <div className="bg-black rounded-lg border border-gray-800 shadow-sm p-2 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {MF_TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap
                  ${tab === t.key
                    ? 'bg-amber-500 text-black'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                <t.icon size={13} className="shrink-0" />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-6 pb-4 lg:pb-6">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <span>Master Files</span>
                <ChevronRight size={10} />
                <span className="text-blue-600 font-medium">{activeTab?.label}</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">{activeTab?.label}</h1>
            </div>
            {tab !== 'overview' && (
              <button onClick={() => setTab('overview')} className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 border border-gray-200 rounded px-3 py-1.5 transition-colors">
                ← Back to Overview
              </button>
            )}
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
