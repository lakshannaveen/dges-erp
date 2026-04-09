# DGE-ERP System

A modern, minimal Enterprise Resource Planning (ERP) web application for DGE (Colombo Dockyard PLC).

## Tech Stack

- **React 18** — UI framework
- **Redux Toolkit** — State management (slices, actions, services separated)
- **React Router v6** — Client-side routing
- **Tailwind CSS v3** — Utility-first styling
- **Recharts** — Data visualisation
- **Lucide React** — Icons

## Theme

| Element      | Color              |
|--------------|--------------------|
| Background   | White `#ffffff`    |
| Primary Accent | Gold `#f59e0b`   |
| Sidebar / Dark surfaces | Black `#0a0a0a` |
| Text         | Dark grey `#141414`|

## Modules

| Module         | Path            | Description                                      |
|----------------|-----------------|--------------------------------------------------|
| Dashboard      | `/dashboard`    | Overview stats, charts, quick access             |
| eAsset         | `/asset`        | Asset register, transfer notes, disposal notes   |
| eCommercial    | `/commercial`   | Sales invoices, project proposals, price lists   |
| eFinancials    | `/finance`      | Accounts, journals, invoices, cash books         |
| eHRM           | `/hrm`          | Employees, attendance, HR data file              |
| eOffice        | `/office`       | Master job control, work management, inquiries   |
| eProcurement   | `/procurement`  | Supplier catalogue, stock balance, MOC tracking  |
| eProduction    | `/production`   | EWO management, material orders, petty cash      |
| eSubcontract   | `/subcontract`  | Contractor registration and employee details     |

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Card, Badge, Table, Modal, etc.)
│   └── layout/          # AppLayout, Sidebar, TopBar
├── pages/               # One page per module
├── routes/              # AppRoutes (protected + public)
├── store/
│   ├── index.js         # Redux store configuration
│   ├── slices/          # One slice per domain (auth, asset, hr, finance, ...)
│   └── actions/         # Thunk action creators per domain
├── services/            # API service layer (apiService, authService, ...)
├── utils/               # helpers.js (formatCurrency, formatDate, etc.)
└── styles/              # index.css (Tailwind + custom component classes)
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Demo Login Credentials

| Username  | Password     | Role              |
|-----------|-------------|-------------------|
| `admin`   | `admin123`  | System Administrator |
| `finance` | `finance123`| Finance Manager   |
| `hr`      | `hr123`     | HR Manager        |

### Production Build

```bash
npm run build
```

## Architecture Notes

- **Redux slices** (`src/store/slices/`) handle state shape and reducers
- **Action creators** (`src/store/actions/`) are thunks that dispatch to slices; mock data is used in place of real API calls
- **Service layer** (`src/services/`) is ready to be connected to a real REST API — just update `BASE_URL` in `apiService.js`
- **Protected routes** automatically redirect unauthenticated users to `/login`
- **Session persistence** via `localStorage` — login survives page refresh

## Connecting to a Real Backend

1. Update `REACT_APP_API_URL` in `.env`:
   ```
   REACT_APP_API_URL=https://your-api.dge.lk/api
   ```
2. Replace mock `setTimeout` blocks in `src/store/actions/` with real `apiService` calls
3. Update auth token handling if your API uses a different auth scheme

## Copyright

© 2024 Colombo Dockyard PLC — ICT Department. All rights reserved.
