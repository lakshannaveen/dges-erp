import { fetchStart, fetchAssetsSuccess, fetchTransfersSuccess, fetchDisposalsSuccess, fetchFailure, addAsset } from '../slices/assetSlice';

const mockAssets = [
  { id: 'AST-001', name: 'Tower Crane #1', category: 'Heavy Equipment', location: 'Dock A', value: 12500000, status: 'Active', purchaseDate: '2021-03-15' },
  { id: 'AST-002', name: 'Welding Machine Set', category: 'Tools & Equipment', location: 'Workshop 2', value: 480000, status: 'Active', purchaseDate: '2022-07-20' },
  { id: 'AST-003', name: 'Forklift Unit F-03', category: 'Vehicles', location: 'Yard B', value: 3200000, status: 'Maintenance', purchaseDate: '2020-11-10' },
  { id: 'AST-004', name: 'Generator Set G-07', category: 'Power Equipment', location: 'Dock C', value: 1800000, status: 'Active', purchaseDate: '2023-01-05' },
  { id: 'AST-005', name: 'Compressor Unit #2', category: 'Tools & Equipment', location: 'Workshop 1', value: 650000, status: 'Active', purchaseDate: '2022-09-18' },
  { id: 'AST-006', name: 'Service Truck ST-12', category: 'Vehicles', location: 'Motor Pool', value: 5600000, status: 'Active', purchaseDate: '2023-04-22' },
];

const mockTransfers = [
  { id: 'ATN-001', assetId: 'AST-003', fromLocation: 'Yard A', toLocation: 'Yard B', transferDate: '2024-02-10', approvedBy: 'J. Perera', status: 'Approved' },
  { id: 'ATN-002', assetId: 'AST-005', fromLocation: 'Workshop 2', toLocation: 'Workshop 1', transferDate: '2024-03-01', approvedBy: 'K. Silva', status: 'Pending' },
];

const mockDisposals = [
  { id: 'ADN-001', assetId: 'AST-OL-009', assetName: 'Old Lathe Machine', disposalDate: '2024-01-15', method: 'Auction', amount: 120000, status: 'Completed' },
];

export const fetchAssets = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchAssetsSuccess(mockAssets)), 500);
};

export const fetchTransfers = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchTransfersSuccess(mockTransfers)), 500);
};

export const fetchDisposals = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchDisposalsSuccess(mockDisposals)), 500);
};

export const createAsset = (assetData) => (dispatch) => {
  const newAsset = { id: `AST-${Date.now()}`, ...assetData, status: 'Active' };
  dispatch(addAsset(newAsset));
  return Promise.resolve(newAsset);
};
