import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModule } from '../store/slices/uiSlice';
import {
  Users, Clock, Calendar, Search, User, BarChart2, Briefcase,
  Plus, ChevronRight, Award, BookOpen, ShieldAlert, Package,
  LogOut, FileText, DollarSign, Settings, X, Camera, Upload,
  Check, AlertTriangle, Eye, Edit2, ChevronDown, ChevronUp
} from 'lucide-react';
import {
  fetchEmployees, fetchAttendance, fetchLeave, fetchPayroll,
  fetchRecruitment, fetchTraining, fetchDisciplinary,
  fetchHRAssets, fetchExits,
  createEmployee, createLeaveRequest, approveLeave, rejectLeave,
  createRecruitment, createTraining, createDisciplinary,
  createHRAsset, createExit
} from '../store/actions/hrActions';
import {
  PageHeader, Card, Badge, Table, Modal, FormField,
  SearchBar, LoadingState, EmptyState, StatCard
} from '../components/common';
import { formatDate } from '../utils/helpers';

// ─── Sidebar sub-navigation items ────────────────────────────────────────────
const HR_MODULES = [
  { key: 'overview',    label: 'Overview',          icon: BarChart2 },
  { key: 'employees',   label: 'Employee Management', icon: Users },
  { key: 'recruitment', label: 'Recruitment',        icon: Briefcase },
  { key: 'attendance',  label: 'Attendance & Shifts', icon: Clock },
  { key: 'leave',       label: 'Leave Management',   icon: Calendar },
  { key: 'payroll',     label: 'Payroll',            icon: DollarSign },
  { key: 'performance', label: 'Performance',        icon: Award },
  { key: 'training',    label: 'Training',           icon: BookOpen },
  { key: 'selfservice', label: 'Self Service',       icon: User },
  { key: 'disciplinary',label: 'Disciplinary',       icon: ShieldAlert },
  { key: 'hrassets',    label: 'Assets',             icon: Package },
  { key: 'exit',        label: 'Exit Management',    icon: LogOut },
  { key: 'reports',     label: 'Reports',            icon: FileText },
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return <h3 className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-3 mt-1">{children}</h3>;
}
function FieldRow({ label, value }) {
  return (
    <div className="flex items-start gap-1 py-1 border-b border-dark-50">
      <span className="text-xs text-dark-400 w-36 shrink-0">{label}</span>
      <span className="text-xs text-dark-800 font-medium">{value || '—'}</span>
    </div>
  );
}

// ─── Add Employee Form (mirrors old C# interface) ─────────────────────────────
function AddEmployeeForm({ onClose, onSave, employees }) {
  const photoRef = useRef();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [form, setForm] = useState({
    serviceNo: '', title: 'Mr', gender: 'Male', initials: '',
    firstName: '', lastName: '', reportName: '',
    designation: '', proximityCardNo: '', barcodeNo: '', cdlServiceNo: '',
    bloodGroup: '', occupationalGroup: '', status: 'Active',
    address1: '', address2: '', town: '', city: '', corporateMobile: '', personalMobile: '',
    telephone: '',
    homeAddress1: '', homeAddress2: '', homeTown: '', homeCity: '',
    homeTelephone: '', homeGramasewaka: '', homePoliceStation: '',
    homeElectorate: '', homeDistrict: '', homeProvince: '', homeDistance: '',
    nationalId: '', passportNo: '', dob: '', maritalStatus: 'Single',
    religion: '', race: '',
    mealRequirement: 'No', breakfastRequirement: 'No', snackCenter: '', transportMode: '',
    ownVehicle: 'No', vehicleType: '', licenceNo: '', vehicleNo: '',
    ownHome: 'No', rentalAmount: '',
    nextOfKinFirstName: '', nextOfKinLastName: '', nextOfKinAddress: '',
    nextOfKinPhone: '', nextOfKinRelationship: '',
    spouseFirstName: '', spouseLastName: '', spouseDob: '', noOfChildren: '',
    highestEducation: '', highestProfessional: '', skills: '',
    division: '', department: '', location: '', grade: '', workCategory: '',
    employeeCategory: '', epfNo: '', email: '', extension: '',
    temporaryInactive: 'No', extraHoursEntitlement: 'No', attendancePayment: 'No',
    shiftCode1: '', shiftCode2: '', shiftCode3: '',
    unionCode: '', association: '', otherInfo: '',
    initialCategory: '', initialGrade: '', reportingOfficer: '',
    recruitmentDate: '', promotedDate: '', permanentDate: '', retirementDate: '',
    leavingDate: '', reasonForLeaving: '', presentEmployer: '',
    contractType: 'Permanent', projectNo: '', startDate: '', endDate: '',
    photo: null,
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPhotoPreview(ev.target.result); set('photo', ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.department) {
      alert('Please fill First Name, Last Name and Department');
      return;
    }
    onSave({ ...form, name: `${form.firstName} ${form.lastName}`, phone: form.personalMobile });
    onClose();
  };

  const inputCls = "w-full border border-dark-200 rounded px-2 py-1 text-xs text-dark-800 focus:outline-none focus:border-gold-400 bg-amber-50/30";
  const selectCls = "w-full border border-dark-200 rounded px-2 py-1 text-xs text-dark-800 focus:outline-none focus:border-gold-400 bg-amber-50/30";
  const lbl = (text, req) => (
    <label className="block text-xs text-dark-500 mb-0.5">{text}{req && <span className="text-red-500">*</span>}</label>
  );

  return (
    <div className="text-xs">
      {/* Top header row */}
      <div className="grid grid-cols-12 gap-2 mb-3 pb-3 border-b border-dark-100">
        <div className="col-span-2">
          {lbl('Service No', true)}
          <input className={inputCls} value={form.serviceNo} onChange={e => set('serviceNo', e.target.value)} />
        </div>
        <div className="col-span-1">
          {lbl('Title')}
          <select className={selectCls} value={form.title} onChange={e => set('title', e.target.value)}>
            {['Mr','Mrs','Ms','Dr','Prof','Rev'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          {lbl('Gender')}
          <select className={selectCls} value={form.gender} onChange={e => set('gender', e.target.value)}>
            <option>Male</option><option>Female</option>
          </select>
        </div>
        <div className="col-span-2">
          {lbl('Initials')}
          <input className={inputCls} value={form.initials} onChange={e => set('initials', e.target.value)} placeholder="e.g. R.P." />
        </div>
        <div className="col-span-5 row-span-4 flex flex-col items-center justify-center border border-dashed border-dark-200 rounded p-2 bg-dark-50">
          <div className="w-24 h-28 border border-dark-200 rounded overflow-hidden bg-white flex items-center justify-center mb-2">
            {photoPreview
              ? <img src={photoPreview} alt="Employee" className="w-full h-full object-cover" />
              : <Camera size={28} className="text-dark-200" />
            }
          </div>
          <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          <button type="button" onClick={() => photoRef.current.click()}
            className="flex items-center gap-1 text-xs bg-dark-800 text-white px-3 py-1 rounded hover:bg-dark-700">
            <Upload size={12} /> Upload Photo
          </button>
          <div className="mt-2 w-full">
            {lbl('Status')}
            <select className={selectCls} value={form.status} onChange={e => set('status', e.target.value)}>
              <option>Active</option><option>Inactive</option><option>On Leave</option>
            </select>
          </div>
        </div>

        <div className="col-span-7">
          {lbl('First Name', true)}
          <input className={inputCls} value={form.firstName} onChange={e => set('firstName', e.target.value)} />
        </div>
        <div className="col-span-7">
          {lbl('Last Name', true)}
          <input className={inputCls} value={form.lastName} onChange={e => set('lastName', e.target.value)} />
        </div>
        <div className="col-span-4">
          {lbl('Report Name')}
          <input className={inputCls} value={form.reportName} onChange={e => set('reportName', e.target.value)} />
        </div>
        <div className="col-span-3">
          {lbl('Designation')}
          <input className={inputCls} value={form.designation} onChange={e => set('designation', e.target.value)} />
        </div>
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-2 gap-x-4">
        {/* LEFT COLUMN */}
        <div>
          {/* Contact Details */}
          <SectionTitle>Contact Details</SectionTitle>
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div className="col-span-2">{lbl('Address 1')}<input className={inputCls} value={form.address1} onChange={e => set('address1', e.target.value)} /></div>
            <div className="col-span-2">{lbl('Address 2')}<input className={inputCls} value={form.address2} onChange={e => set('address2', e.target.value)} /></div>
            <div>{lbl('Town')}<input className={inputCls} value={form.town} onChange={e => set('town', e.target.value)} /></div>
            <div>{lbl('Corporate Mobile')}<input className={inputCls} value={form.corporateMobile} onChange={e => set('corporateMobile', e.target.value)} /></div>
            <div>{lbl('City')}<input className={inputCls} value={form.city} onChange={e => set('city', e.target.value)} /></div>
            <div>{lbl('Personal Mobile')}<input className={inputCls} value={form.personalMobile} onChange={e => set('personalMobile', e.target.value)} /></div>
            <div>{lbl('Telephone')}<input className={inputCls} value={form.telephone} onChange={e => set('telephone', e.target.value)} /></div>
          </div>

          {/* Home Details */}
          <SectionTitle>Home Details</SectionTitle>
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div className="col-span-2">{lbl('Address 1')}<input className={inputCls} value={form.homeAddress1} onChange={e => set('homeAddress1', e.target.value)} /></div>
            <div className="col-span-2">{lbl('Address 2')}<input className={inputCls} value={form.homeAddress2} onChange={e => set('homeAddress2', e.target.value)} /></div>
            <div>{lbl('Town')}<input className={inputCls} value={form.homeTown} onChange={e => set('homeTown', e.target.value)} /></div>
            <div>{lbl('Telephone')}<input className={inputCls} value={form.homeTelephone} onChange={e => set('homeTelephone', e.target.value)} /></div>
            <div>{lbl('City')}<input className={inputCls} value={form.homeCity} onChange={e => set('homeCity', e.target.value)} /></div>
            <div>{lbl('Gramasewaka Division')}<input className={inputCls} value={form.homeGramasewaka} onChange={e => set('homeGramasewaka', e.target.value)} /></div>
            <div>{lbl('Electorate')}<input className={inputCls} value={form.homeElectorate} onChange={e => set('homeElectorate', e.target.value)} /></div>
            <div>{lbl('Police Station')}<input className={inputCls} value={form.homePoliceStation} onChange={e => set('homePoliceStation', e.target.value)} /></div>
            <div>{lbl('District')}<input className={inputCls} value={form.homeDistrict} onChange={e => set('homeDistrict', e.target.value)} /></div>
            <div className="flex gap-1 items-end">
              <div className="flex-1">{lbl('Distance')}<input className={inputCls} value={form.homeDistance} onChange={e => set('homeDistance', e.target.value)} /></div>
              <span className="text-xs text-dark-400 pb-1">km</span>
            </div>
            <div>{lbl('Province')}<input className={inputCls} value={form.homeProvince} onChange={e => set('homeProvince', e.target.value)} /></div>
          </div>

          {/* Employment Details */}
          <SectionTitle>Employment Details</SectionTitle>
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div>{lbl('Division')}<input className={inputCls} value={form.division} onChange={e => set('division', e.target.value)} /></div>
            <div>{lbl('Grade')}<input className={inputCls} value={form.grade} onChange={e => set('grade', e.target.value)} /></div>
            <div>{lbl('Department', true)}<input className={inputCls} value={form.department} onChange={e => set('department', e.target.value)} /></div>
            <div>{lbl('Work Category')}
              <select className={selectCls} value={form.workCategory} onChange={e => set('workCategory', e.target.value)}>
                <option value="">Select...</option>
                {['Permanent','Contract','Casual','Trainee','Part-Time'].map(w => <option key={w}>{w}</option>)}
              </select>
            </div>
            <div>{lbl('Location')}<input className={inputCls} value={form.location} onChange={e => set('location', e.target.value)} /></div>
            <div>{lbl('Employee Category')}
              <select className={selectCls} value={form.employeeCategory} onChange={e => set('employeeCategory', e.target.value)}>
                <option value="">Select...</option>
                {['Staff','Worker','Management','Executive'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>{lbl('Initial Category')}<input className={inputCls} value={form.initialCategory} onChange={e => set('initialCategory', e.target.value)} /></div>
            <div>{lbl('EPF No')}<input className={inputCls} value={form.epfNo} onChange={e => set('epfNo', e.target.value)} /></div>
            <div className="col-span-2">{lbl('Email Address', true)}<input className={inputCls} type="email" value={form.email} onChange={e => set('email', e.target.value)} /></div>
            <div>{lbl('Initial Grade')}<input className={inputCls} value={form.initialGrade} onChange={e => set('initialGrade', e.target.value)} /></div>
            <div>{lbl('Extension')}<input className={inputCls} value={form.extension} onChange={e => set('extension', e.target.value)} /></div>
            <div>{lbl('Reporting Officer')}
              <select className={selectCls} value={form.reportingOfficer} onChange={e => set('reportingOfficer', e.target.value)}>
                <option value="">Select...</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
              </select>
            </div>
            <div>{lbl('Attendance Payment')}
              <select className={selectCls} value={form.attendancePayment} onChange={e => set('attendancePayment', e.target.value)}>
                <option>No</option><option>Yes</option>
              </select>
            </div>
            <div>{lbl('Recruitment Date')}<input className={inputCls} type="date" value={form.recruitmentDate} onChange={e => set('recruitmentDate', e.target.value)} /></div>
            <div>{lbl('Shift Code 1')}<input className={inputCls} value={form.shiftCode1} onChange={e => set('shiftCode1', e.target.value)} /></div>
            <div>{lbl('Promoted Date')}<input className={inputCls} type="date" value={form.promotedDate} onChange={e => set('promotedDate', e.target.value)} /></div>
            <div>{lbl('Shift Code 2')}<input className={inputCls} value={form.shiftCode2} onChange={e => set('shiftCode2', e.target.value)} /></div>
            <div>{lbl('Permanent Date')}<input className={inputCls} type="date" value={form.permanentDate} onChange={e => set('permanentDate', e.target.value)} /></div>
            <div>{lbl('Shift Code 3')}<input className={inputCls} value={form.shiftCode3} onChange={e => set('shiftCode3', e.target.value)} /></div>
            <div>{lbl('Retirement Date')}<input className={inputCls} type="date" value={form.retirementDate} onChange={e => set('retirementDate', e.target.value)} /></div>
            <div>{lbl('Union Code')}<input className={inputCls} value={form.unionCode} onChange={e => set('unionCode', e.target.value)} /></div>
            <div>{lbl('Leaving Date')}<input className={inputCls} type="date" value={form.leavingDate} onChange={e => set('leavingDate', e.target.value)} /></div>
            <div>{lbl('Association')}<input className={inputCls} value={form.association} onChange={e => set('association', e.target.value)} /></div>
            <div>{lbl('Reason For Leaving')}
              <select className={selectCls} value={form.reasonForLeaving} onChange={e => set('reasonForLeaving', e.target.value)}>
                <option value="">Select...</option>
                {['Resignation','Retirement','Termination','Transfer','Death','Contract End'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>{lbl('Present Employer')}
              <select className={selectCls} value={form.presentEmployer} onChange={e => set('presentEmployer', e.target.value)}>
                <option value="">Select...</option><option>DGE</option><option>External</option>
              </select>
            </div>
            <div>{lbl('Contract Type')}
              <select className={selectCls} value={form.contractType} onChange={e => set('contractType', e.target.value)}>
                {['Permanent','Contract','Probation'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>{lbl('Project No')}<input className={inputCls} value={form.projectNo} onChange={e => set('projectNo', e.target.value)} /></div>
            <div>{lbl('Start Date')}<input className={inputCls} type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} /></div>
            <div>{lbl('End Date')}<input className={inputCls} type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} /></div>
            <div className="col-span-2">{lbl('Other Important Information')}<textarea className={inputCls + ' h-14 resize-none'} value={form.otherInfo} onChange={e => set('otherInfo', e.target.value)} /></div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* IDs */}
          <div className="grid grid-cols-2 gap-1 mb-3 p-2 bg-dark-50 rounded">
            <div>{lbl('Proximity Card No')}<input className={inputCls} value={form.proximityCardNo} onChange={e => set('proximityCardNo', e.target.value)} /></div>
            <div>{lbl('Barcode No')}<input className={inputCls} value={form.barcodeNo} onChange={e => set('barcodeNo', e.target.value)} /></div>
            <div>{lbl('CDL Service No')}<input className={inputCls} value={form.cdlServiceNo} onChange={e => set('cdlServiceNo', e.target.value)} /></div>
            <div>{lbl('Blood Group')}
              <select className={selectCls} value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}>
                <option value="">Select...</option>
                {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="col-span-2">{lbl('Occupational Group')}<input className={inputCls} value={form.occupationalGroup} onChange={e => set('occupationalGroup', e.target.value)} /></div>
          </div>

          {/* Employee Details */}
          <SectionTitle>Employee Details</SectionTitle>
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div>{lbl('National ID', true)}<input className={inputCls} value={form.nationalId} onChange={e => set('nationalId', e.target.value)} /></div>
            <div>{lbl('Meal Requirement')}
              <select className={selectCls} value={form.mealRequirement} onChange={e => set('mealRequirement', e.target.value)}>
                <option>No</option><option>Yes</option>
              </select>
            </div>
            <div>{lbl('Transport Mode')}
              <select className={selectCls} value={form.transportMode} onChange={e => set('transportMode', e.target.value)}>
                <option value="">Select...</option>
                {['Company Bus','Own Vehicle','Public Transport','Company Vehicle','Walking'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>{lbl('Passport No')}<input className={inputCls} value={form.passportNo} onChange={e => set('passportNo', e.target.value)} /></div>
            <div>{lbl('Breakfast Requirement')}
              <select className={selectCls} value={form.breakfastRequirement} onChange={e => set('breakfastRequirement', e.target.value)}>
                <option>No</option><option>Yes</option>
              </select>
            </div>
            <div>{lbl('Own Vehicle')}
              <select className={selectCls} value={form.ownVehicle} onChange={e => set('ownVehicle', e.target.value)}>
                <option>No</option><option>Yes</option>
              </select>
            </div>
            <div>{lbl('D.O.B.', true)}<input className={inputCls} type="date" value={form.dob} onChange={e => set('dob', e.target.value)} /></div>
            <div>{lbl('Snack Center')}<input className={inputCls} value={form.snackCenter} onChange={e => set('snackCenter', e.target.value)} /></div>
            <div>{lbl('Vehicle Type')}
              <select className={selectCls} value={form.vehicleType} onChange={e => set('vehicleType', e.target.value)}>
                <option value="">Select...</option>
                {['Car','Motorbike','Van','Bicycle','Three-wheeler'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>{lbl('Marital Status')}
              <select className={selectCls} value={form.maritalStatus} onChange={e => set('maritalStatus', e.target.value)}>
                {['Single','Married','Divorced','Widowed'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>{lbl('Own Home')}
              <select className={selectCls} value={form.ownHome} onChange={e => set('ownHome', e.target.value)}>
                <option>No</option><option>Yes</option>
              </select>
            </div>
            <div>{lbl('Licence No')}<input className={inputCls} value={form.licenceNo} onChange={e => set('licenceNo', e.target.value)} /></div>
            <div>{lbl('Religion')}
              <select className={selectCls} value={form.religion} onChange={e => set('religion', e.target.value)}>
                <option value="">Select...</option>
                {['Buddhist','Hindu','Muslim','Catholic','Christian','Other'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>{lbl('Rental Amount')}<input className={inputCls} value={form.rentalAmount} onChange={e => set('rentalAmount', e.target.value)} /></div>
            <div>{lbl('Vehicle No')}<input className={inputCls} value={form.vehicleNo} onChange={e => set('vehicleNo', e.target.value)} /></div>
            <div>{lbl('Race')}
              <select className={selectCls} value={form.race} onChange={e => set('race', e.target.value)}>
                <option value="">Select...</option>
                {['Sinhalese','Tamil','Muslim','Burgher','Malay','Other'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* Next of Kin */}
          <SectionTitle>Next of Kin Details</SectionTitle>
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div>{lbl('First Name')}<input className={inputCls} value={form.nextOfKinFirstName} onChange={e => set('nextOfKinFirstName', e.target.value)} /></div>
            <div>{lbl('Last Name')}<input className={inputCls} value={form.nextOfKinLastName} onChange={e => set('nextOfKinLastName', e.target.value)} /></div>
            <div className="col-span-2">{lbl('Full Address')}<input className={inputCls} value={form.nextOfKinAddress} onChange={e => set('nextOfKinAddress', e.target.value)} /></div>
            <div>{lbl('Telephone')}<input className={inputCls} value={form.nextOfKinPhone} onChange={e => set('nextOfKinPhone', e.target.value)} /></div>
            <div>{lbl('Relationship')}
              <select className={selectCls} value={form.nextOfKinRelationship} onChange={e => set('nextOfKinRelationship', e.target.value)}>
                <option value="">Select...</option>
                {['Spouse','Father','Mother','Son','Daughter','Brother','Sister','Other'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* Spouse Details */}
          <SectionTitle>Spouse Details</SectionTitle>
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div>{lbl('First Name')}<input className={inputCls} value={form.spouseFirstName} onChange={e => set('spouseFirstName', e.target.value)} /></div>
            <div>{lbl('Last Name')}<input className={inputCls} value={form.spouseLastName} onChange={e => set('spouseLastName', e.target.value)} /></div>
            <div>{lbl('D.O.B.')}<input className={inputCls} type="date" value={form.spouseDob} onChange={e => set('spouseDob', e.target.value)} /></div>
            <div>{lbl('No. of Children')}<input className={inputCls} type="number" min="0" value={form.noOfChildren} onChange={e => set('noOfChildren', e.target.value)} /></div>
          </div>

          {/* Grades & Designation */}
          <SectionTitle>Grades & Designation Details</SectionTitle>
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div className="col-span-2">{lbl('Highest Educational Qualification')}<input className={inputCls} value={form.highestEducation} onChange={e => set('highestEducation', e.target.value)} /></div>
            <div className="col-span-2">{lbl('Highest Professional Qualification')}<input className={inputCls} value={form.highestProfessional} onChange={e => set('highestProfessional', e.target.value)} /></div>
            <div className="col-span-2">{lbl('Skills')}<textarea className={inputCls + ' h-16 resize-none'} value={form.skills} onChange={e => set('skills', e.target.value)} /></div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3 pt-3 border-t border-dark-100 mt-2">
        <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
        <button type="button" onClick={handleSubmit} className="btn-primary flex items-center gap-2">
          <Check size={14} /> Save Employee
        </button>
      </div>
    </div>
  );
}

// ─── Employee Summary Card ────────────────────────────────────────────────────
function EmployeeSummaryCard({ emp, onClick }) {
  const initials = emp.firstName ? `${emp.firstName[0]}${emp.lastName ? emp.lastName[0] : ''}` : emp.name?.split(' ').map(n => n[0]).join('') || '?';
  return (
    <Card className="cursor-pointer hover:border-gold-400 hover:shadow-md transition-all" onClick={() => onClick(emp)}>
      <div className="flex gap-3">
        <div className="shrink-0">
          {emp.photo
            ? <img src={emp.photo} alt={emp.firstName} className="w-14 h-16 rounded-lg object-cover border border-dark-100" />
            : <div className="w-14 h-16 gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-dark-900 font-bold text-base">{initials}</span>
              </div>
          }
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1">
            <p className="font-bold text-dark-900 text-sm leading-tight">{emp.firstName || emp.name} {emp.lastName || ''}</p>
            <Badge status={emp.status} />
          </div>
          <p className="text-xs text-gold-600 font-medium mt-0.5">{emp.id}</p>
          <p className="text-xs text-dark-500 mt-1">{emp.designation}</p>
          <p className="text-xs text-dark-400">{emp.department} {emp.division ? `· ${emp.division}` : ''}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-dark-400">{emp.email || '—'}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Employee Detail View ──────────────────────────────────────────────────────
function EmployeeDetailView({ emp, onClose }) {
  const [tab, setTab] = useState('personal');
  const tabs = ['personal','contact','employment','kin','qualifications'];
  return (
    <div className="text-xs">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-dark-100">
        <div className="shrink-0">
          {emp.photo
            ? <img src={emp.photo} alt="" className="w-20 h-24 rounded-xl object-cover border-2 border-gold-300" />
            : <div className="w-20 h-24 gold-gradient rounded-xl flex items-center justify-center">
                <span className="text-dark-900 font-bold text-2xl">{emp.initials || (emp.firstName?.[0] + (emp.lastName?.[0] || ''))}</span>
              </div>
          }
        </div>
        <div>
          <h2 className="text-lg font-bold text-dark-900">{emp.title} {emp.firstName} {emp.lastName}</h2>
          <p className="text-gold-600 font-medium">{emp.id} · {emp.designation}</p>
          <p className="text-dark-400">{emp.department} {emp.division ? `— ${emp.division}` : ''}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge status={emp.status} />
            <span className="text-dark-400">EPF: {emp.epfNo}</span>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-3 overflow-x-auto">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded text-xs font-medium capitalize whitespace-nowrap transition-colors
              ${tab === t ? 'bg-dark-900 text-gold-400' : 'bg-dark-100 text-dark-500 hover:text-dark-800'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'personal' && (
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <SectionTitle>Personal</SectionTitle>
            <FieldRow label="National ID" value={emp.nationalId} />
            <FieldRow label="Passport No" value={emp.passportNo} />
            <FieldRow label="Date of Birth" value={emp.dob} />
            <FieldRow label="Gender" value={emp.gender} />
            <FieldRow label="Marital Status" value={emp.maritalStatus} />
            <FieldRow label="Religion" value={emp.religion} />
            <FieldRow label="Race" value={emp.race} />
            <FieldRow label="Blood Group" value={emp.bloodGroup} />
          </div>
          <div>
            <SectionTitle>Identification</SectionTitle>
            <FieldRow label="Service No" value={emp.serviceNo} />
            <FieldRow label="Proximity Card" value={emp.proximityCardNo} />
            <FieldRow label="Barcode" value={emp.barcodeNo} />
            <FieldRow label="CDL Service No" value={emp.cdlServiceNo} />
            <SectionTitle>Transport</SectionTitle>
            <FieldRow label="Transport Mode" value={emp.transportMode} />
            <FieldRow label="Own Vehicle" value={emp.ownVehicle} />
            <FieldRow label="Vehicle Type" value={emp.vehicleType} />
            <FieldRow label="Licence No" value={emp.licenceNo} />
            <FieldRow label="Vehicle No" value={emp.vehicleNo} />
          </div>
        </div>
      )}
      {tab === 'contact' && (
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <SectionTitle>Contact Address</SectionTitle>
            <FieldRow label="Address 1" value={emp.address1} />
            <FieldRow label="Address 2" value={emp.address2} />
            <FieldRow label="Town" value={emp.town} />
            <FieldRow label="City" value={emp.city} />
            <FieldRow label="Corporate Mobile" value={emp.corporateMobile} />
            <FieldRow label="Personal Mobile" value={emp.phone || emp.personalMobile} />
            <FieldRow label="Email" value={emp.email} />
          </div>
          <div>
            <SectionTitle>Home Address</SectionTitle>
            <FieldRow label="Address 1" value={emp.homeAddress1} />
            <FieldRow label="Address 2" value={emp.homeAddress2} />
            <FieldRow label="Gramasewaka Div." value={emp.homeGramasewaka} />
            <FieldRow label="Police Station" value={emp.homePoliceStation} />
            <FieldRow label="District" value={emp.homeDistrict || emp.district} />
            <FieldRow label="Province" value={emp.homeProvince || emp.province} />
            <FieldRow label="Distance" value={emp.homeDistance ? `${emp.homeDistance} km` : ''} />
            <SectionTitle>Spouse</SectionTitle>
            <FieldRow label="Spouse Name" value={`${emp.spouseFirstName || ''} ${emp.spouseLastName || ''}`.trim()} />
            <FieldRow label="Spouse DOB" value={emp.spouseDob} />
            <FieldRow label="No. of Children" value={emp.noOfChildren} />
          </div>
        </div>
      )}
      {tab === 'employment' && (
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <SectionTitle>Employment</SectionTitle>
            <FieldRow label="Division" value={emp.division} />
            <FieldRow label="Department" value={emp.department} />
            <FieldRow label="Location" value={emp.location} />
            <FieldRow label="Grade" value={emp.grade} />
            <FieldRow label="Work Category" value={emp.workCategory} />
            <FieldRow label="Emp. Category" value={emp.employeeCategory} />
            <FieldRow label="EPF No" value={emp.epfNo} />
            <FieldRow label="Contract Type" value={emp.contractType} />
            <FieldRow label="Occ. Group" value={emp.occupationalGroup} />
          </div>
          <div>
            <SectionTitle>Key Dates</SectionTitle>
            <FieldRow label="Recruitment Date" value={emp.recruitmentDate} />
            <FieldRow label="Join Date" value={emp.joinDate} />
            <FieldRow label="Promoted Date" value={emp.promotedDate} />
            <FieldRow label="Permanent Date" value={emp.permanentDate} />
            <FieldRow label="Retirement Date" value={emp.retirementDate} />
            <SectionTitle>Meal & Welfare</SectionTitle>
            <FieldRow label="Meal Requirement" value={emp.mealRequirement} />
            <FieldRow label="Breakfast Req." value={emp.breakfastRequirement} />
            <FieldRow label="Snack Center" value={emp.snackCenter} />
            <FieldRow label="Own Home" value={emp.ownHome} />
            <FieldRow label="Rental Amount" value={emp.rentalAmount ? `Rs. ${emp.rentalAmount}` : ''} />
          </div>
        </div>
      )}
      {tab === 'kin' && (
        <div>
          <SectionTitle>Next of Kin</SectionTitle>
          <div className="grid grid-cols-2 gap-x-6">
            <FieldRow label="Name" value={`${emp.nextOfKinFirstName || ''} ${emp.nextOfKinLastName || ''}`.trim()} />
            <FieldRow label="Relationship" value={emp.nextOfKinRelationship} />
            <FieldRow label="Telephone" value={emp.nextOfKinPhone} />
            <FieldRow label="Address" value={emp.nextOfKinAddress} />
          </div>
        </div>
      )}
      {tab === 'qualifications' && (
        <div>
          <SectionTitle>Education & Skills</SectionTitle>
          <FieldRow label="Highest Education" value={emp.highestEducation} />
          <FieldRow label="Highest Professional" value={emp.highestProfessional} />
          <div className="mt-2">
            <span className="text-xs text-dark-400">Skills</span>
            <p className="text-xs text-dark-800 mt-1 bg-dark-50 p-2 rounded">{emp.skills || '—'}</p>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-4 pt-3 border-t border-dark-100">
        <button onClick={onClose} className="btn-ghost">Close</button>
      </div>
    </div>
  );
}

// ─── MAIN HRM PAGE ────────────────────────────────────────────────────────────
export default function HRMPage() {
  const dispatch = useDispatch();
  const { employees, attendance, leaveRequests, payroll, recruitment, training, disciplinary, hrAssets, exits, loading } = useSelector(s => s.hr);
  const { activeModule: reduxActiveModule } = useSelector(s => s.ui);

  // Use redux activeModule; default to 'overview' if null or not set by HR nav
  const activeModule = reduxActiveModule || 'overview';

  const [search, setSearch] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showRecruitModal, setShowRecruitModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showDiscModal, setShowDiscModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ employeeId: '', type: 'Annual', from: '', to: '', days: 1, reason: '' });
  const [recruitForm, setRecruitForm] = useState({ position: '', department: '', vacancies: 1, postedDate: '', closingDate: '' });
  const [trainingForm, setTrainingForm] = useState({ title: '', employeeId: '', category: 'Technical', startDate: '', endDate: '', provider: '', status: 'Scheduled' });
  const [discForm, setDiscForm] = useState({ employeeId: '', type: 'Warning Letter', reason: '', date: '', issuedBy: '' });
  const [assetForm, setAssetForm] = useState({ employeeId: '', assetType: '', assetId: '', issuedDate: '', condition: 'Good' });
  const [exitForm, setExitForm] = useState({ employeeId: '', resignDate: '', lastDay: '', reason: '', finalSettlement: 0 });

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchAttendance());
    dispatch(fetchLeave());
    dispatch(fetchPayroll());
    dispatch(fetchRecruitment());
    dispatch(fetchTraining());
    dispatch(fetchDisciplinary());
    dispatch(fetchHRAssets());
    dispatch(fetchExits());
  }, [dispatch]);

  const filtered = employees.filter(e => {
    const name = `${e.firstName || ''} ${e.lastName || e.name || ''}`.toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || (e.department || '').toLowerCase().includes(q) || (e.id || '').toLowerCase().includes(q);
  });

  const empName = (id) => {
    const e = employees.find(x => x.id === id);
    return e ? `${e.firstName || ''} ${e.lastName || e.name || ''}`.trim() : id;
  };

  const setLF = (k, v) => setLeaveForm(f => ({ ...f, [k]: v }));
  const setRF = (k, v) => setRecruitForm(f => ({ ...f, [k]: v }));
  const setTF = (k, v) => setTrainingForm(f => ({ ...f, [k]: v }));
  const setDF = (k, v) => setDiscForm(f => ({ ...f, [k]: v }));
  const setAF = (k, v) => setAssetForm(f => ({ ...f, [k]: v }));
  const setEF = (k, v) => setExitForm(f => ({ ...f, [k]: v }));

  const inputCls = "input-field text-sm";
  const selectCls = "input-field text-sm";

  const activeCount = employees.filter(e => e.status === 'Active').length;
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const pendingLeave = leaveRequests.filter(l => l.status === 'Pending').length;
  const pendingPayroll = payroll.filter(p => p.status === 'Pending').length;

  return (
    <div className="min-h-screen">
      <div className="overflow-auto min-w-0">

        {/* ═══ OVERVIEW ═══ */}
        {activeModule === 'overview' && (
          <div>
            <PageHeader title="eHuman Resource Management" subtitle="HR overview & quick access" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard label="Total Employees" value={employees.length} icon={Users} color="blue" />
              <StatCard label="Active Employees" value={activeCount} icon={Users} color="green" />
              <StatCard label="Present Today" value={presentCount} icon={Clock} color="gold" />
              <StatCard label="Pending Leave" value={pendingLeave} icon={Calendar} color="red" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard label="Pending Payroll" value={pendingPayroll} icon={DollarSign} color="purple" />
              <StatCard label="Open Vacancies" value={recruitment.filter(r => r.status === 'Active').length} icon={Briefcase} color="blue" />
              <StatCard label="Trainings Scheduled" value={training.filter(t => t.status === 'Scheduled').length} icon={BookOpen} color="green" />
              <StatCard label="HR Assets Issued" value={hrAssets.filter(a => a.status === 'Issued').length} icon={Package} color="gold" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <Card>
                <h3 className="font-semibold text-dark-800 mb-4 text-sm">Employees by Department</h3>
                {[...new Set(employees.map(e => e.department))].map(dept => {
                  const count = employees.filter(e => e.department === dept).length;
                  const pct = employees.length ? Math.round((count / employees.length) * 100) : 0;
                  return (
                    <div key={dept} className="flex items-center gap-3 mb-2.5">
                      <span className="text-xs text-dark-600 w-32 truncate">{dept}</span>
                      <div className="flex-1 h-2 bg-dark-100 rounded-full overflow-hidden">
                        <div className="h-full gold-gradient rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-dark-700 w-5 text-right">{count}</span>
                    </div>
                  );
                })}
              </Card>
              <Card>
                <h3 className="font-semibold text-dark-800 mb-4 text-sm">Today's Attendance</h3>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {[
                    { label: 'Present', count: presentCount, c: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Late', count: attendance.filter(a => a.status === 'Late').length, c: 'text-amber-600 bg-amber-50' },
                    { label: 'Absent', count: attendance.filter(a => a.status === 'Absent').length, c: 'text-red-500 bg-red-50' },
                  ].map(s => (
                    <div key={s.label} className={`text-center p-3 rounded-xl ${s.c}`}>
                      <p className="text-xl font-bold">{s.count}</p>
                      <p className="text-xs mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <h3 className="font-semibold text-dark-800 mb-4 text-sm">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Add Employee', action: () => setShowAddEmployee(true), icon: Plus },
                    { label: 'Post Vacancy', action: () => { dispatch(setActiveModule('recruitment')); setShowRecruitModal(true); }, icon: Briefcase },
                    { label: 'Approve Leave', action: () => dispatch(setActiveModule('leave')), icon: Calendar },
                    { label: 'Run Payroll', action: () => dispatch(setActiveModule('payroll')), icon: DollarSign },
                  ].map(({ label, action, icon: Icon }) => (
                    <button key={label} onClick={action}
                      className="w-full flex items-center gap-2 px-4 py-2.5 bg-dark-50 hover:bg-gold-50 hover:border-gold-300 border border-transparent rounded-lg text-sm font-medium text-dark-700 transition-all">
                      <Icon size={15} className="text-gold-500" /> {label} <ChevronRight size={14} className="ml-auto text-dark-300" />
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ═══ EMPLOYEE MANAGEMENT ═══ */}
        {activeModule === 'employees' && (
          <div>
            <PageHeader title="Employee Management" subtitle="Master data, records & documents"
              actions={
                <button onClick={() => setShowAddEmployee(true)} className="btn-primary flex items-center gap-2">
                  <Plus size={14} /> Add Employee
                </button>
              }
            />
            <div className="mb-4">
              <SearchBar value={search} onChange={setSearch} placeholder="Search by name, ID, department..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(e => (
                <EmployeeSummaryCard key={e.id} emp={e} onClick={setViewEmployee} />
              ))}
              {filtered.length === 0 && <div className="col-span-3"><EmptyState title="No employees found" icon={Users} /></div>}
            </div>
          </div>
        )}

        {/* ═══ RECRUITMENT ═══ */}
        {activeModule === 'recruitment' && (
          <div>
            <PageHeader title="Recruitment & Onboarding" subtitle="Vacancies, applicants, interviews, selection"
              actions={
                <button onClick={() => setShowRecruitModal(true)} className="btn-primary flex items-center gap-2">
                  <Plus size={14} /> Post Vacancy
                </button>
              }
            />
            <div className="grid grid-cols-3 gap-4 mb-5">
              <StatCard label="Active Vacancies" value={recruitment.filter(r=>r.status==='Active').length} icon={Briefcase} color="blue" />
              <StatCard label="Total Applicants" value={recruitment.reduce((a,r)=>a+r.applicants,0)} icon={Users} color="green" />
              <StatCard label="Shortlisted" value={recruitment.reduce((a,r)=>a+r.shortlisted,0)} icon={Award} color="gold" />
            </div>
            <Card noPad>
              <Table headers={['Ref', 'Position', 'Department', 'Vacancies', 'Posted', 'Closing', 'Applicants', 'Shortlisted', 'Status']}>
                {recruitment.map(r => (
                  <tr key={r.id} className="table-row">
                    <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{r.id}</td>
                    <td className="px-4 py-3 font-medium text-dark-800 text-sm">{r.position}</td>
                    <td className="px-4 py-3 text-dark-600 text-sm">{r.department}</td>
                    <td className="px-4 py-3 text-center text-dark-700 font-medium text-sm">{r.vacancies}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{r.postedDate}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{r.closingDate}</td>
                    <td className="px-4 py-3 text-center text-dark-700 text-sm">{r.applicants}</td>
                    <td className="px-4 py-3 text-center text-dark-700 text-sm">{r.shortlisted}</td>
                    <td className="px-4 py-3"><Badge status={r.status} /></td>
                  </tr>
                ))}
              </Table>
            </Card>
          </div>
        )}

        {/* ═══ ATTENDANCE ═══ */}
        {activeModule === 'attendance' && (
          <div>
            <PageHeader title="Attendance & Time Management" subtitle="Daily logs, shifts, overtime" />
            <div className="grid grid-cols-4 gap-4 mb-5">
              <StatCard label="Present" value={presentCount} icon={Users} color="green" />
              <StatCard label="Late" value={attendance.filter(a=>a.status==='Late').length} icon={Clock} color="gold" />
              <StatCard label="Absent" value={attendance.filter(a=>a.status==='Absent').length} icon={AlertTriangle} color="red" />
              <StatCard label="Total OT Hours" value={attendance.reduce((s,a)=>s+(a.overtime||0),0).toFixed(1)+'h'} icon={Clock} color="blue" />
            </div>
            <Card noPad>
              <div className="px-4 py-3 border-b border-dark-100">
                <span className="font-semibold text-dark-800 text-sm">Daily Attendance — {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </div>
              <Table headers={['Employee ID', 'Name', 'Department', 'Check In', 'Check Out', 'Hours', 'Overtime', 'Status']}>
                {attendance.map(a => {
                  const emp = employees.find(e => e.id === a.employeeId);
                  return (
                    <tr key={a.id} className="table-row">
                      <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{a.employeeId}</td>
                      <td className="px-4 py-3 font-medium text-dark-800 text-sm">{emp ? `${emp.firstName} ${emp.lastName}` : a.employeeId}</td>
                      <td className="px-4 py-3 text-dark-500 text-sm">{emp?.department || '—'}</td>
                      <td className="px-4 py-3 text-dark-600 text-sm">{a.checkIn || '—'}</td>
                      <td className="px-4 py-3 text-dark-600 text-sm">{a.checkOut || '—'}</td>
                      <td className="px-4 py-3 text-dark-700 font-medium text-sm">{a.hours > 0 ? `${a.hours}h` : '—'}</td>
                      <td className="px-4 py-3 text-dark-700 text-sm">{a.overtime > 0 ? `${a.overtime}h` : '—'}</td>
                      <td className="px-4 py-3"><Badge status={a.status} /></td>
                    </tr>
                  );
                })}
              </Table>
            </Card>
          </div>
        )}

        {/* ═══ LEAVE MANAGEMENT ═══ */}
        {activeModule === 'leave' && (
          <div>
            <PageHeader title="Leave Management" subtitle="Requests, approvals, balances"
              actions={
                <button onClick={() => setShowLeaveModal(true)} className="btn-primary flex items-center gap-2">
                  <Plus size={14} /> New Request
                </button>
              }
            />
            <div className="grid grid-cols-4 gap-4 mb-5">
              {['Annual','Medical','Casual','Unpaid'].map(type => (
                <StatCard key={type} label={`${type} Leave`}
                  value={leaveRequests.filter(l => l.type === type && l.status === 'Approved').reduce((s,l)=>s+l.days,0) + ' days'}
                  icon={Calendar} color={type==='Annual'?'blue':type==='Medical'?'green':type==='Casual'?'gold':'red'} />
              ))}
            </div>
            <Card noPad>
              <Table headers={['Ref', 'Employee', 'Type', 'From', 'To', 'Days', 'Reason', 'Applied', 'Status', 'Actions']}>
                {leaveRequests.map(l => (
                  <tr key={l.id} className="table-row">
                    <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{l.id}</td>
                    <td className="px-4 py-3 font-medium text-dark-800 text-sm">{l.employeeName || empName(l.employeeId)}</td>
                    <td className="px-4 py-3 text-dark-600 text-sm">{l.type}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{l.from}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{l.to}</td>
                    <td className="px-4 py-3 text-center text-dark-700 font-medium text-sm">{l.days}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm max-w-32 truncate">{l.reason}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{l.appliedDate}</td>
                    <td className="px-4 py-3"><Badge status={l.status} /></td>
                    <td className="px-4 py-3">
                      {l.status === 'Pending' && (
                        <div className="flex gap-1">
                          <button onClick={() => dispatch(approveLeave(l))}
                            className="p-1.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors" title="Approve">
                            <Check size={12} />
                          </button>
                          <button onClick={() => dispatch(rejectLeave(l))}
                            className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors" title="Reject">
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </Table>
              {leaveRequests.length === 0 && <EmptyState title="No leave requests" icon={Calendar} />}
            </Card>
          </div>
        )}

        {/* ═══ PAYROLL ═══ */}
        {activeModule === 'payroll' && (
          <div>
            <PageHeader title="Payroll Management" subtitle="Salary, EPF/ETF, payslips, deductions" />
            <div className="grid grid-cols-4 gap-4 mb-5">
              <StatCard label="Total Payroll" value={'Rs. ' + payroll.reduce((s,p)=>s+p.netPay,0).toLocaleString()} icon={DollarSign} color="blue" />
              <StatCard label="Paid This Month" value={payroll.filter(p=>p.status==='Paid').length} icon={Check} color="green" />
              <StatCard label="Pending" value={payroll.filter(p=>p.status==='Pending').length} icon={Clock} color="gold" />
              <StatCard label="Total EPF" value={'Rs. ' + payroll.reduce((s,p)=>s+p.epf,0).toLocaleString()} icon={DollarSign} color="purple" />
            </div>
            <Card noPad>
              <Table headers={['Ref', 'Employee', 'Month', 'Basic', 'Allowances', 'Overtime', 'Deductions', 'EPF (8%)', 'ETF (3%)', 'Net Pay', 'Status']}>
                {payroll.map(p => (
                  <tr key={p.id} className="table-row">
                    <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{p.id}</td>
                    <td className="px-4 py-3 font-medium text-dark-800 text-sm">{p.employeeName}</td>
                    <td className="px-4 py-3 text-dark-600 text-sm">{p.month}</td>
                    <td className="px-4 py-3 text-dark-700 text-sm text-right">{p.basic.toLocaleString()}</td>
                    <td className="px-4 py-3 text-dark-700 text-sm text-right">{p.allowances.toLocaleString()}</td>
                    <td className="px-4 py-3 text-dark-700 text-sm text-right">{p.overtime.toLocaleString()}</td>
                    <td className="px-4 py-3 text-red-600 text-sm text-right">({p.deductions.toLocaleString()})</td>
                    <td className="px-4 py-3 text-dark-600 text-sm text-right">{p.epf.toLocaleString()}</td>
                    <td className="px-4 py-3 text-dark-600 text-sm text-right">{p.etf.toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold text-dark-900 text-sm text-right">{p.netPay.toLocaleString()}</td>
                    <td className="px-4 py-3"><Badge status={p.status} /></td>
                  </tr>
                ))}
              </Table>
            </Card>
          </div>
        )}

        {/* ═══ PERFORMANCE ═══ */}
        {activeModule === 'performance' && (
          <div>
            <PageHeader title="Performance Management" subtitle="KPIs, appraisals, reviews" />
            <div className="grid grid-cols-3 gap-5">
              <Card className="col-span-3">
                <p className="text-dark-500 text-sm text-center py-8">Performance appraisal cycles, KPI settings and employee reviews will be managed here. Configure KPI targets per department and run quarterly/annual reviews.</p>
                <div className="grid grid-cols-3 gap-4">
                  {employees.slice(0,3).map(e => (
                    <div key={e.id} className="border border-dark-100 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center shrink-0">
                          <span className="text-dark-900 font-bold text-sm">{(e.firstName||e.name||'?')[0]}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-dark-800 text-sm">{e.firstName} {e.lastName}</p>
                          <p className="text-xs text-dark-400">{e.designation}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {['KPI Achievement','Attendance','Targets Met'].map((kpi,i) => (
                          <div key={kpi}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-dark-500">{kpi}</span>
                              <span className="font-medium text-dark-700">{[88,95,75][i]}%</span>
                            </div>
                            <div className="h-1.5 bg-dark-100 rounded-full">
                              <div className="h-full gold-gradient rounded-full" style={{width:`${[88,95,75][i]}%`}} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ═══ TRAINING ═══ */}
        {activeModule === 'training' && (
          <div>
            <PageHeader title="Training & Development" subtitle="Programs, skills, certifications"
              actions={
                <button onClick={() => setShowTrainingModal(true)} className="btn-primary flex items-center gap-2">
                  <Plus size={14} /> Add Training
                </button>
              }
            />
            <div className="grid grid-cols-3 gap-4 mb-5">
              <StatCard label="Total Programs" value={training.length} icon={BookOpen} color="blue" />
              <StatCard label="Completed" value={training.filter(t=>t.status==='Completed').length} icon={Check} color="green" />
              <StatCard label="Scheduled" value={training.filter(t=>t.status==='Scheduled').length} icon={Calendar} color="gold" />
            </div>
            <Card noPad>
              <Table headers={['Ref', 'Training Title', 'Employee', 'Category', 'Start', 'End', 'Provider', 'Score', 'Status']}>
                {training.map(t => (
                  <tr key={t.id} className="table-row">
                    <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{t.id}</td>
                    <td className="px-4 py-3 font-medium text-dark-800 text-sm">{t.title}</td>
                    <td className="px-4 py-3 text-dark-600 text-sm">{t.employeeName || empName(t.employeeId)}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{t.category}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{t.startDate}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{t.endDate}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{t.provider}</td>
                    <td className="px-4 py-3 text-dark-700 font-medium text-sm">{t.score != null ? `${t.score}%` : '—'}</td>
                    <td className="px-4 py-3"><Badge status={t.status} /></td>
                  </tr>
                ))}
              </Table>
            </Card>
          </div>
        )}

        {/* ═══ SELF SERVICE ═══ */}
        {activeModule === 'selfservice' && (
          <div>
            <PageHeader title="Employee Self Service" subtitle="Payslips, leave, attendance, personal info" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'View Payslips', icon: DollarSign, desc: 'Download monthly payslips', color: 'blue' },
                { label: 'Apply Leave', icon: Calendar, desc: 'Submit leave requests', color: 'green', action: () => { dispatch(setActiveModule('leave')); setShowLeaveModal(true); } },
                { label: 'My Attendance', icon: Clock, desc: 'View attendance history', color: 'gold', action: () => dispatch(setActiveModule('attendance')) },
                { label: 'Update Profile', icon: User, desc: 'Update personal details', color: 'purple' },
              ].map(({ label, icon: Icon, desc, color, action }) => (
                <div key={label} onClick={action}
                  className="bg-white border border-dark-100 rounded-xl p-5 cursor-pointer hover:border-gold-400 hover:shadow-md transition-all">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    color==='blue'?'bg-blue-100 text-blue-600':color==='green'?'bg-emerald-100 text-emerald-600':
                    color==='gold'?'bg-gold-100 text-gold-600':'bg-purple-100 text-purple-600'}`}>
                    <Icon size={20} />
                  </div>
                  <p className="font-semibold text-dark-800 text-sm">{label}</p>
                  <p className="text-xs text-dark-400 mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ DISCIPLINARY ═══ */}
        {activeModule === 'disciplinary' && (
          <div>
            <PageHeader title="Disciplinary & Grievance" subtitle="Warnings, actions, incident tracking"
              actions={
                <button onClick={() => setShowDiscModal(true)} className="btn-primary flex items-center gap-2">
                  <Plus size={14} /> New Action
                </button>
              }
            />
            <Card noPad>
              <Table headers={['Ref', 'Employee', 'Type', 'Reason', 'Date', 'Issued By', 'Status']}>
                {disciplinary.map(d => (
                  <tr key={d.id} className="table-row">
                    <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{d.id}</td>
                    <td className="px-4 py-3 font-medium text-dark-800 text-sm">{d.employeeName || empName(d.employeeId)}</td>
                    <td className="px-4 py-3 text-dark-600 text-sm">{d.type}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm max-w-40 truncate">{d.reason}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{d.date}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{d.issuedBy}</td>
                    <td className="px-4 py-3"><Badge status={d.status} /></td>
                  </tr>
                ))}
              </Table>
              {disciplinary.length === 0 && <EmptyState title="No disciplinary records" icon={ShieldAlert} />}
            </Card>
          </div>
        )}

        {/* ═══ HR ASSETS ═══ */}
        {activeModule === 'hrassets' && (
          <div>
            <PageHeader title="Asset Management (HR)" subtitle="Company assets assigned to employees"
              actions={
                <button onClick={() => setShowAssetModal(true)} className="btn-primary flex items-center gap-2">
                  <Plus size={14} /> Assign Asset
                </button>
              }
            />
            <Card noPad>
              <Table headers={['Ref', 'Employee', 'Asset Type', 'Asset ID', 'Issued Date', 'Return Date', 'Condition', 'Status']}>
                {hrAssets.map(a => (
                  <tr key={a.id} className="table-row">
                    <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{a.id}</td>
                    <td className="px-4 py-3 font-medium text-dark-800 text-sm">{a.employeeName || empName(a.employeeId)}</td>
                    <td className="px-4 py-3 text-dark-600 text-sm">{a.assetType}</td>
                    <td className="px-4 py-3 font-mono text-xs text-dark-500">{a.assetId}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{a.issuedDate}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{a.returnDate || '—'}</td>
                    <td className="px-4 py-3 text-dark-600 text-sm">{a.condition}</td>
                    <td className="px-4 py-3"><Badge status={a.status} /></td>
                  </tr>
                ))}
              </Table>
              {hrAssets.length === 0 && <EmptyState title="No assets assigned" icon={Package} />}
            </Card>
          </div>
        )}

        {/* ═══ EXIT MANAGEMENT ═══ */}
        {activeModule === 'exit' && (
          <div>
            <PageHeader title="Exit Management" subtitle="Resignations, clearance, final settlement"
              actions={
                <button onClick={() => setShowExitModal(true)} className="btn-primary flex items-center gap-2">
                  <Plus size={14} /> New Exit
                </button>
              }
            />
            <Card noPad>
              <Table headers={['Ref', 'Employee', 'Designation', 'Dept', 'Resign Date', 'Last Day', 'Reason', 'Final Settlement', 'Clearance', 'Status']}>
                {exits.map(e => (
                  <tr key={e.id} className="table-row">
                    <td className="px-4 py-3 font-mono text-xs text-gold-600 font-semibold">{e.id}</td>
                    <td className="px-4 py-3 font-medium text-dark-800 text-sm">{e.employeeName || empName(e.employeeId)}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{e.designation}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{e.department}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{e.resignDate}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{e.lastDay}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm max-w-32 truncate">{e.reason}</td>
                    <td className="px-4 py-3 text-dark-700 font-medium text-sm">{e.finalSettlement ? `Rs. ${e.finalSettlement.toLocaleString()}` : '—'}</td>
                    <td className="px-4 py-3 text-dark-500 text-sm">{e.clearance}</td>
                    <td className="px-4 py-3"><Badge status={e.status} /></td>
                  </tr>
                ))}
              </Table>
              {exits.length === 0 && <EmptyState title="No exit records" icon={LogOut} />}
            </Card>
          </div>
        )}

        {/* ═══ REPORTS ═══ */}
        {activeModule === 'reports' && (
          <div>
            <PageHeader title="Reports & Analytics" subtitle="Attendance, payroll, turnover, leave summaries" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Attendance Report', desc: 'Daily/monthly attendance summary per department', icon: Clock, color: 'blue' },
                { title: 'Payroll Report', desc: 'Salary, EPF/ETF summaries for accounting', icon: DollarSign, color: 'green' },
                { title: 'Leave Summary', desc: 'Leave taken vs. balance per employee', icon: Calendar, color: 'gold' },
                { title: 'Employee Turnover', desc: 'Joins, exits, retention rate analysis', icon: Users, color: 'purple' },
                { title: 'Department Analytics', desc: 'Headcount & grade distribution by department', icon: BarChart2, color: 'blue' },
                { title: 'Training Report', desc: 'Completed trainings and skill development', icon: BookOpen, color: 'green' },
              ].map(({ title, desc, icon: Icon, color }) => (
                <div key={title} className="bg-white border border-dark-100 rounded-xl p-5 hover:border-gold-400 hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    color==='blue'?'bg-blue-100 text-blue-600':color==='green'?'bg-emerald-100 text-emerald-600':
                    color==='gold'?'bg-gold-100 text-gold-600':'bg-purple-100 text-purple-600'}`}>
                    <Icon size={20} />
                  </div>
                  <p className="font-semibold text-dark-800 text-sm">{title}</p>
                  <p className="text-xs text-dark-400 mt-1">{desc}</p>
                  <button className="mt-3 text-xs text-gold-600 font-medium hover:text-gold-700 flex items-center gap-1">
                    Generate <ChevronRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════ MODALS ══════════════════════ */}

      {/* Add Employee – full-page-like modal */}
      <Modal open={showAddEmployee} onClose={() => setShowAddEmployee(false)} title="Employee Information — Add New Employee" size="xl">
        <AddEmployeeForm onClose={() => setShowAddEmployee(false)} onSave={(data) => dispatch(createEmployee(data))} employees={employees} />
      </Modal>

      {/* View Employee Detail */}
      <Modal open={!!viewEmployee} onClose={() => setViewEmployee(null)} title="Employee Information" size="xl">
        {viewEmployee && <EmployeeDetailView emp={viewEmployee} onClose={() => setViewEmployee(null)} />}
      </Modal>

      {/* New Leave Request */}
      <Modal open={showLeaveModal} onClose={() => setShowLeaveModal(false)} title="New Leave Request">
        <div className="space-y-4">
          <FormField label="Employee" required>
            <select className={selectCls} value={leaveForm.employeeId} onChange={e => setLF('employeeId', e.target.value)}>
              <option value="">Select Employee...</option>
              {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.id})</option>)}
            </select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Leave Type" required>
              <select className={selectCls} value={leaveForm.type} onChange={e => setLF('type', e.target.value)}>
                {['Annual','Casual','Medical','Unpaid','Maternity','Paternity'].map(t => <option key={t}>{t}</option>)}
              </select>
            </FormField>
            <FormField label="No. of Days" required>
              <input className={inputCls} type="number" min="1" value={leaveForm.days} onChange={e => setLF('days', parseInt(e.target.value))} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="From Date" required><input className={inputCls} type="date" value={leaveForm.from} onChange={e => setLF('from', e.target.value)} /></FormField>
            <FormField label="To Date" required><input className={inputCls} type="date" value={leaveForm.to} onChange={e => setLF('to', e.target.value)} /></FormField>
          </div>
          <FormField label="Reason">
            <textarea className={inputCls + ' h-20 resize-none'} value={leaveForm.reason} onChange={e => setLF('reason', e.target.value)} placeholder="Reason for leave..." />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowLeaveModal(false)} className="btn-ghost">Cancel</button>
            <button onClick={() => { dispatch(createLeaveRequest({ ...leaveForm, employeeName: empName(leaveForm.employeeId) })); setShowLeaveModal(false); }} className="btn-primary">Submit Request</button>
          </div>
        </div>
      </Modal>

      {/* Post Vacancy */}
      <Modal open={showRecruitModal} onClose={() => setShowRecruitModal(false)} title="Post New Vacancy">
        <div className="space-y-4">
          <FormField label="Position Title" required>
            <input className={inputCls} value={recruitForm.position} onChange={e => setRF('position', e.target.value)} placeholder="e.g. Mechanical Engineer" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Department" required>
              <select className={selectCls} value={recruitForm.department} onChange={e => setRF('department', e.target.value)}>
                <option value="">Select...</option>
                {['Engineering','Finance','HR','Production','Procurement','Commercial','ICT','Administration'].map(d => <option key={d}>{d}</option>)}
              </select>
            </FormField>
            <FormField label="No. of Vacancies" required>
              <input className={inputCls} type="number" min="1" value={recruitForm.vacancies} onChange={e => setRF('vacancies', parseInt(e.target.value))} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Posted Date"><input className={inputCls} type="date" value={recruitForm.postedDate} onChange={e => setRF('postedDate', e.target.value)} /></FormField>
            <FormField label="Closing Date"><input className={inputCls} type="date" value={recruitForm.closingDate} onChange={e => setRF('closingDate', e.target.value)} /></FormField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowRecruitModal(false)} className="btn-ghost">Cancel</button>
            <button onClick={() => { dispatch(createRecruitment(recruitForm)); setShowRecruitModal(false); }} className="btn-primary">Post Vacancy</button>
          </div>
        </div>
      </Modal>

      {/* Add Training */}
      <Modal open={showTrainingModal} onClose={() => setShowTrainingModal(false)} title="Add Training Record">
        <div className="space-y-4">
          <FormField label="Training Title" required>
            <input className={inputCls} value={trainingForm.title} onChange={e => setTF('title', e.target.value)} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Employee" required>
              <select className={selectCls} value={trainingForm.employeeId} onChange={e => setTF('employeeId', e.target.value)}>
                <option value="">Select...</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
              </select>
            </FormField>
            <FormField label="Category">
              <select className={selectCls} value={trainingForm.category} onChange={e => setTF('category', e.target.value)}>
                {['Technical','Compliance','Quality','Management','Soft Skills'].map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Start Date"><input className={inputCls} type="date" value={trainingForm.startDate} onChange={e => setTF('startDate', e.target.value)} /></FormField>
            <FormField label="End Date"><input className={inputCls} type="date" value={trainingForm.endDate} onChange={e => setTF('endDate', e.target.value)} /></FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Provider"><input className={inputCls} value={trainingForm.provider} onChange={e => setTF('provider', e.target.value)} /></FormField>
            <FormField label="Status">
              <select className={selectCls} value={trainingForm.status} onChange={e => setTF('status', e.target.value)}>
                {['Scheduled','In Progress','Completed','Cancelled'].map(s => <option key={s}>{s}</option>)}
              </select>
            </FormField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowTrainingModal(false)} className="btn-ghost">Cancel</button>
            <button onClick={() => { dispatch(createTraining({ ...trainingForm, employeeName: empName(trainingForm.employeeId) })); setShowTrainingModal(false); }} className="btn-primary">Save Training</button>
          </div>
        </div>
      </Modal>

      {/* Disciplinary Action */}
      <Modal open={showDiscModal} onClose={() => setShowDiscModal(false)} title="New Disciplinary Action">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Employee" required>
              <select className={selectCls} value={discForm.employeeId} onChange={e => setDF('employeeId', e.target.value)}>
                <option value="">Select...</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
              </select>
            </FormField>
            <FormField label="Action Type" required>
              <select className={selectCls} value={discForm.type} onChange={e => setDF('type', e.target.value)}>
                {['Verbal Warning','Warning Letter','Final Warning','Suspension','Termination'].map(t => <option key={t}>{t}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Reason" required>
            <textarea className={inputCls + ' h-20 resize-none'} value={discForm.reason} onChange={e => setDF('reason', e.target.value)} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date"><input className={inputCls} type="date" value={discForm.date} onChange={e => setDF('date', e.target.value)} /></FormField>
            <FormField label="Issued By"><input className={inputCls} value={discForm.issuedBy} onChange={e => setDF('issuedBy', e.target.value)} /></FormField>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowDiscModal(false)} className="btn-ghost">Cancel</button>
            <button onClick={() => { dispatch(createDisciplinary({ ...discForm, employeeName: empName(discForm.employeeId) })); setShowDiscModal(false); }} className="btn-primary">Save</button>
          </div>
        </div>
      </Modal>

      {/* Assign Asset */}
      <Modal open={showAssetModal} onClose={() => setShowAssetModal(false)} title="Assign HR Asset">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Employee" required>
              <select className={selectCls} value={assetForm.employeeId} onChange={e => setAF('employeeId', e.target.value)}>
                <option value="">Select...</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
              </select>
            </FormField>
            <FormField label="Asset Type" required>
              <select className={selectCls} value={assetForm.assetType} onChange={e => setAF('assetType', e.target.value)}>
                <option value="">Select...</option>
                {['Laptop','Desktop','Mobile Phone','ID Card','Uniform','Access Card','Vehicle','Tools','Other'].map(t => <option key={t}>{t}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Asset ID"><input className={inputCls} value={assetForm.assetId} onChange={e => setAF('assetId', e.target.value)} /></FormField>
            <FormField label="Condition">
              <select className={selectCls} value={assetForm.condition} onChange={e => setAF('condition', e.target.value)}>
                {['New','Good','Fair','Poor'].map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Issued Date"><input className={inputCls} type="date" value={assetForm.issuedDate} onChange={e => setAF('issuedDate', e.target.value)} /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowAssetModal(false)} className="btn-ghost">Cancel</button>
            <button onClick={() => { dispatch(createHRAsset({ ...assetForm, employeeName: empName(assetForm.employeeId) })); setShowAssetModal(false); }} className="btn-primary">Assign Asset</button>
          </div>
        </div>
      </Modal>

      {/* Exit Management */}
      <Modal open={showExitModal} onClose={() => setShowExitModal(false)} title="New Exit Record">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Employee" required>
              <select className={selectCls} value={exitForm.employeeId} onChange={e => setEF('employeeId', e.target.value)}>
                <option value="">Select...</option>
                {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
              </select>
            </FormField>
            <FormField label="Reason">
              <select className={selectCls} value={exitForm.reason} onChange={e => setEF('reason', e.target.value)}>
                <option value="">Select...</option>
                {['Resignation','Retirement','Termination','Transfer','Contract End','Death'].map(r => <option key={r}>{r}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Resign Date"><input className={inputCls} type="date" value={exitForm.resignDate} onChange={e => setEF('resignDate', e.target.value)} /></FormField>
            <FormField label="Last Working Day"><input className={inputCls} type="date" value={exitForm.lastDay} onChange={e => setEF('lastDay', e.target.value)} /></FormField>
          </div>
          <FormField label="Final Settlement (Rs.)">
            <input className={inputCls} type="number" value={exitForm.finalSettlement} onChange={e => setEF('finalSettlement', parseFloat(e.target.value))} />
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowExitModal(false)} className="btn-ghost">Cancel</button>
            <button onClick={() => {
              const emp = employees.find(x => x.id === exitForm.employeeId);
              dispatch(createExit({ ...exitForm, employeeName: empName(exitForm.employeeId), designation: emp?.designation, department: emp?.department, clearance: 'In Progress' }));
              setShowExitModal(false);
            }} className="btn-primary">Save Exit Record</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
