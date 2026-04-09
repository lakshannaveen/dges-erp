import { fetchStart, fetchSuppliersSuccess, fetchStockSuccess, fetchOrdersSuccess, fetchFailure, addSupplier, addOrder } from '../slices/procurementSlice';

const mockSuppliers = [
  { id: 'SUP-001', name: 'Lanka Steel Industries', category: 'Raw Materials', contact: 'Mr. K. Nanda', phone: '0112345678', email: 'orders@lankasteel.lk', status: 'Active', rating: 4.5 },
  { id: 'SUP-002', name: 'Marine Paint Supplies Co.', category: 'Paint & Coatings', contact: 'Ms. D. Ranasinghe', phone: '0113456789', email: 'supply@marinepaint.lk', status: 'Active', rating: 4.2 },
  { id: 'SUP-003', name: 'Ceylon Welding Rods Ltd', category: 'Consumables', contact: 'Mr. T. Peiris', phone: '0114567890', email: 'sales@cwr.lk', status: 'Active', rating: 3.8 },
  { id: 'SUP-004', name: 'Hydraulic Tech Solutions', category: 'Equipment Parts', contact: 'Mr. S. Mendis', phone: '0115678901', email: 'parts@htsolutions.lk', status: 'Inactive', rating: 3.5 },
];

const mockStock = [
  { id: 'STK-001', itemCode: 'RM-ST-001', description: 'MS Plate 10mm', unit: 'KG', qtyOnHand: 12500, reorderLevel: 5000, unitCost: 285, store: 'Store 1' },
  { id: 'STK-002', itemCode: 'RM-ST-002', description: 'Angle Iron 50x50', unit: 'KG', qtyOnHand: 3200, reorderLevel: 2000, unitCost: 290, store: 'Store 1' },
  { id: 'STK-003', itemCode: 'PT-MP-001', description: 'Anti-Corrosion Primer', unit: 'LTR', qtyOnHand: 850, reorderLevel: 500, unitCost: 1200, store: 'Store 2' },
  { id: 'STK-004', itemCode: 'WE-RD-001', description: 'Welding Rod 3.15mm', unit: 'KG', qtyOnHand: 2400, reorderLevel: 1000, unitCost: 480, store: 'Store 3' },
  { id: 'STK-005', itemCode: 'PT-MF-001', description: 'Marine Finish Paint', unit: 'LTR', qtyOnHand: 320, reorderLevel: 400, unitCost: 1850, store: 'Store 2' },
];

const mockOrders = [
  { id: 'MOC-001', supplier: 'Lanka Steel Industries', items: 3, totalAmount: 1420000, orderDate: '2024-03-10', deliveryDate: '2024-03-20', status: 'In Transit' },
  { id: 'MOC-002', supplier: 'Marine Paint Supplies Co.', items: 2, totalAmount: 680000, orderDate: '2024-03-12', deliveryDate: '2024-03-22', status: 'Pending' },
  { id: 'MOC-003', supplier: 'Ceylon Welding Rods Ltd', items: 1, totalAmount: 192000, orderDate: '2024-03-15', deliveryDate: '2024-03-18', status: 'Delivered' },
];

export const fetchSuppliers = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchSuppliersSuccess(mockSuppliers)), 500);
};

export const fetchStock = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchStockSuccess(mockStock)), 500);
};

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchOrdersSuccess(mockOrders)), 500);
};

export const createSupplier = (data) => (dispatch) => {
  const s = { id: `SUP-${Date.now()}`, ...data, status: 'Active', rating: 0 };
  dispatch(addSupplier(s));
  return Promise.resolve(s);
};
