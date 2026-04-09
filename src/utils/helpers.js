export const formatCurrency = (amount, currency = 'LKR') => {
  if (!amount && amount !== 0) return '-';
  return new Intl.NumberFormat('en-LK', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const getStatusColor = (status) => {
  const map = {
    Active: 'badge-active', active: 'badge-active',
    Approved: 'badge-active', approved: 'badge-active',
    Paid: 'badge-active', paid: 'badge-active',
    Authorized: 'badge-active', authorized: 'badge-active',
    Certified: 'badge-active', certified: 'badge-active',
    Delivered: 'badge-active', delivered: 'badge-active',
    Completed: 'badge-active', completed: 'badge-active',
    Present: 'badge-active', present: 'badge-active',
    Posted: 'badge-active', posted: 'badge-active',

    Pending: 'badge-pending', pending: 'badge-pending',
    Draft: 'badge-pending', draft: 'badge-pending',
    Sent: 'badge-pending', sent: 'badge-pending',
    'In Transit': 'badge-pending',
    Late: 'badge-pending', late: 'badge-pending',
    'On Leave': 'badge-pending',
    Proposal: 'badge-pending',
    Maintenance: 'badge-pending',

    Inactive: 'badge-inactive', inactive: 'badge-inactive',
    Overdue: 'badge-inactive', overdue: 'badge-inactive',
    Absent: 'badge-inactive', absent: 'badge-inactive',
    Rejected: 'badge-inactive', rejected: 'badge-inactive',
  };
  return map[status] || 'badge-pending';
};

export const truncate = (str, n = 30) => str && str.length > n ? str.substring(0, n) + '...' : str;

export const generateId = (prefix = 'ID') => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
