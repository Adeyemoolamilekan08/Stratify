import { useState, useRef, useEffect } from 'react';
import { PageLayout } from '@components/layout/PageLayout';
import { 
  LockClosedIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  CalendarIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  Squares2X2Icon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';

// ============================================
// CHART DATA
// ============================================
const chartData = [
  { name: 'HT-28', efficiency: 92, target: 85 },
  { name: 'HT-29', efficiency: 88, target: 85 },
  { name: 'HT-30', efficiency: 76, target: 85 },
  { name: 'HT-31', efficiency: 94, target: 85 },
  { name: 'HT-32', efficiency: 70, target: 85 },
  { name: 'HT-33', efficiency: 85, target: 85 },
  { name: 'HT-34', efficiency: 82, target: 85 },
  { name: 'HT-35', efficiency: 91, target: 85 },
  { name: 'HT-36', efficiency: 78, target: 85 },
  { name: 'HT-37', efficiency: 95, target: 85 },
  { name: 'HT-38', efficiency: 73, target: 85 },
];

// ============================================
// MOCK GRID DATA
// ============================================
const mockGridData = [
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-28-HT-270', operator: 'Mike Johnson', operatorCode: 'OP-001', plan: 'PLN-001', part: 'Widget A', rejection: '2.5%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-29-HT-270', operator: 'Sarah Smith', operatorCode: 'OP-002', plan: 'PLN-002', part: 'Widget B', rejection: '1.8%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-30-HT-270', operator: 'Tom Wilson', operatorCode: 'OP-003', plan: 'PLN-003', part: 'Widget C', rejection: '4.2%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-31-HT-270', operator: 'Emma Davis', operatorCode: 'OP-004', plan: 'PLN-004', part: 'Widget D', rejection: '0.9%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-32-HT-270', operator: 'James Brown', operatorCode: 'OP-005', plan: 'PLN-005', part: 'Widget E', rejection: '5.3%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-33-HT-270', operator: 'Lisa Anderson', operatorCode: 'OP-006', plan: 'PLN-006', part: 'Widget F', rejection: '1.2%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-34-HT-270', operator: 'Robert Taylor', operatorCode: 'OP-007', plan: 'PLN-007', part: 'Widget G', rejection: '3.7%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-35-HT-270', operator: 'Maria Garcia', operatorCode: 'OP-008', plan: 'PLN-008', part: 'Widget H', rejection: '0.5%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-36-HT-270', operator: 'David Lee', operatorCode: 'OP-009', plan: 'PLN-009', part: 'Widget I', rejection: '2.9%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-37-HT-270', operator: 'Jennifer Park', operatorCode: 'OP-010', plan: 'PLN-010', part: 'Widget J', rejection: '1.6%' },
  { date: '17-7-2026', shift: 'Shift1', machine: 'HT-38-HT-270', operator: 'Chris Miller', operatorCode: 'OP-011', plan: 'PLN-011', part: 'Widget K', rejection: '4.8%' },
];

const columns = ['Date', 'Shift', 'Machine', 'Operator', 'Operator code', 'Plan', 'Part', 'Rejection(%)'];

// ============================================
// RIGHT PANEL COMPONENT
// ============================================
function RightPanel({ pivotMode, setPivotMode }: any) {
  return (
    <div className="w-[220px] bg-white border-l border-[#E5E7EB] flex flex-col flex-shrink-0 h-full">
      {/* Pivot Mode */}
      <div className="px-4 py-3 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#333]">Pivot Mode</span>
          <button
            onClick={() => setPivotMode(!pivotMode)}
            className={`w-10 h-5 rounded-full transition-colors relative ${
              pivotMode ? 'bg-[#3F51B5]' : 'bg-[#D1D5DB]'
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                pivotMode ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-[#E5E7EB]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 pr-3 py-1.5 text-[13px] border border-[#D8D8D8] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
          />
          <MagnifyingGlassIcon className="absolute left-2.5 top-2 w-4 h-4 text-[#9CA3AF]" />
        </div>
      </div>

      {/* Vertical Tabs */}
      <div className="border-b border-[#E5E7EB]">
        <div className="flex">
          <button className="flex-1 text-center py-2.5 text-[13px] font-medium text-[#3F51B5] border-r border-[#E5E7EB] bg-[#F0F2FF]">
            Columns
          </button>
          <button className="flex-1 text-center py-2.5 text-[13px] text-[#6B7280] hover:text-[#3F51B5] transition-colors">
            Filters
          </button>
        </div>
      </div>

      {/* Row Groups */}
      <div className="p-3 border-b border-[#E5E7EB]">
        <h4 className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wider mb-2">Row Groups</h4>
        <div className="border-2 border-dashed border-[#D8D8D8] rounded-[4px] p-2 text-center text-[13px] text-[#9CA3AF] min-h-[60px] flex items-center justify-center">
          Drag here to set row groups
        </div>
      </div>

      {/* Values */}
      <div className="p-3">
        <h4 className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wider mb-2">Values</h4>
        <div className="border-2 border-dashed border-[#D8D8D8] rounded-[4px] p-2 text-center text-[13px] text-[#9CA3AF] min-h-[60px] flex items-center justify-center">
          Drag here to aggregate
        </div>
      </div>
    </div>
  );
}

// ============================================
// SAVE AS MODAL
// ============================================
function SaveAsModal({ isOpen, onClose, onSave }: any) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name.trim()) {
      setError('Report name is required');
      return;
    }
    onSave(name);
    setName('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[400px] p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-semibold text-[#222]">Save Report As</h3>
          <button onClick={onClose} className="p-1 hover:bg-[#F6F8FB] rounded-[4px]">
            <XMarkIcon className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#333] mb-1.5">Report Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="Enter report name..."
            className="w-full px-3 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
          />
          {error && <p className="text-[12px] text-[#EF5350] mt-1">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-[13px] text-[#6B7280] hover:bg-[#F6F8FB] rounded-[4px] transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-[13px] bg-[#3F51B5] text-white rounded-[4px] hover:bg-[#33408F] transition-colors">
            <CheckIcon className="w-4 h-4 mr-1.5 inline" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function PerformanceReport() {
  const [pivotMode, setPivotMode] = useState(false);
  const [showSaveAs, setShowSaveAs] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: '2026-07-17', to: '2026-07-17' });
  const [interval, setInterval] = useState('Shift wise');
  const [reportName, setReportName] = useState('');
  const [gridData, setGridData] = useState(mockGridData);
  const saveAsRef = useRef<HTMLDivElement>(null);
  const reportsRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // ============================================
  // HANDLERS
  // ============================================
  const handleSaveReport = (name: string) => {
    console.log('Saving report:', name);
    // API call will go here
  };

  const handleExport = (format: string) => {
    console.log('Exporting as:', format);
    setShowExport(false);
    // API call will go here
  };

  const handleSwitchReport = (report: string) => {
    console.log('Switching to:', report);
    setShowReports(false);
    // Navigation will go here
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Filter grid data
    const filtered = mockGridData.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setGridData(filtered);
  };

  const filteredData = gridData.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ============================================
  // CLICK OUTSIDE HANDLERS
  // ============================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (saveAsRef.current && !saveAsRef.current.contains(event.target as Node)) {
        setShowSaveAs(false);
      }
      if (reportsRef.current && !reportsRef.current.contains(event.target as Node)) {
        setShowReports(false);
      }
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setShowExport(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ============================================
  // RENDER
  // ============================================
  return (
    <PageLayout title="Performance reports">
      {/* ===== TOOLBAR ===== */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-2.5 flex items-center gap-3 flex-shrink-0 h-[60px]">
        {/* Save As */}
        <div className="relative" ref={saveAsRef}>
          <button
            onClick={() => setShowSaveAs(!showSaveAs)}
            className="px-4 py-2 bg-[#3F51B5] text-white text-[13px] font-medium rounded-[4px] hover:bg-[#33408F] transition-colors flex items-center"
          >
            <PencilSquareIcon className="w-4 h-4 mr-1.5" />
            Save As...
          </button>
          <SaveAsModal
            isOpen={showSaveAs}
            onClose={() => setShowSaveAs(false)}
            onSave={handleSaveReport}
          />
        </div>

        {/* Reports Dropdown */}
        <div className="relative" ref={reportsRef}>
          <button
            onClick={() => setShowReports(!showReports)}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors"
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
            Reports
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          {showReports && (
            <div className="absolute top-full left-0 mt-1 w-[200px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-lg py-1 z-50">
              {['Production', 'Downtime', 'Quality', 'Performance'].map((report) => (
                <button
                  key={report}
                  onClick={() => handleSwitchReport(report)}
                  className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors"
                >
                  {report} Report
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setShowExport(!showExport)}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#D8D8D8] rounded-[4px] text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          {showExport && (
            <div className="absolute top-full left-0 mt-1 w-[180px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-lg py-1 z-50">
              {['Excel', 'CSV', 'PDF'].map((format) => (
                <button
                  key={format}
                  onClick={() => handleExport(format)}
                  className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors"
                >
                  {format}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== REPORT NAME & CONTROLS ===== */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <LockClosedIcon className="w-4 h-4 text-[#6B7280]" />
          <span className="text-[16px] font-medium text-[#222]">Operator Efficiency</span>
          <button
            onClick={handleRefresh}
            className="p-1 text-[#6B7280] hover:text-[#222] transition-colors"
          >
            <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          {/* Date Range */}
          <div className="flex items-center gap-2 border border-[#D8D8D8] rounded-[4px] px-3 py-1.5">
            <CalendarIcon className="w-4 h-4 text-[#6B7280]" />
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="text-[13px] border-none focus:outline-none bg-transparent w-[100px]"
            />
            <span className="text-[#6B7280]">to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="text-[13px] border-none focus:outline-none bg-transparent w-[100px]"
            />
          </div>

          {/* Interval Dropdown */}
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="px-3 py-1.5 border border-[#D8D8D8] rounded-[4px] text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
          >
            {['Shift wise', 'Hourly', 'Daily', 'Weekly', 'Monthly'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          {/* Hide/Show Chart Button */}
          <button
            onClick={() => setShowChart(!showChart)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#D8D8D8] rounded-[4px] text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors"
          >
            {showChart ? (
              <EyeIcon className="w-4 h-4" />
            ) : (
              <EyeSlashIcon className="w-4 h-4" />
            )}
            {showChart ? 'Hide chart' : 'Show chart'}
          </button>
        </div>
      </div>

      {/* ===== CHART ===== */}
      {showChart && (
        <div className="bg-white border-b border-[#E5E7EB] p-4 flex-shrink-0">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} domain={[0, 100]} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="efficiency" name="Efficiency" fill="#3F51B5" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#EF5350" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ===== AG GRID AREA ===== */}
      <div className="flex-1 flex overflow-hidden bg-white">
        {/* Grid Content */}
        <div className="flex-1 flex flex-col">
          {/* Row Group Panel */}
          <div className="bg-[#F5F5F5] border-b border-[#DDD] px-4 py-1 flex-shrink-0">
            <div className="border-2 border-dashed border-[#D8D8D8] rounded-[2px] px-3 py-0.5 text-center text-[13px] text-[#888]">
              Drag here to set row groups
            </div>
          </div>

          {/* Grid with Data */}
          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#3F51B5] border-t-transparent" />
                  <span className="text-[13px] text-[#6B7280]">Loading...</span>
                </div>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-[#D1D5DB]">
                    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <p className="text-[16px] font-medium text-[#888]">No Rows To Show</p>
                  <p className="text-[13px] text-[#9CA3AF] mt-1">Adjust filters or search to see data</p>
                </div>
              </div>
            ) : (
              <table className="w-full text-[13px] border-collapse">
                <thead className="bg-[#F8F9FB] sticky top-0 z-10">
                  <tr className="border-b border-[#E5E7EB]">
                    {columns.map((col) => (
                      <th key={col} className="text-left py-2 px-3 text-[#6B7280] font-medium whitespace-nowrap border-r border-[#E5E7EB] last:border-r-0">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index} className="border-b border-[#F6F8FB] hover:bg-[#F8F9FB] transition-colors">
                      <td className="py-2 px-3 text-[#333] whitespace-nowrap border-r border-[#F6F8FB]">{row.date}</td>
                      <td className="py-2 px-3 text-[#333] whitespace-nowrap border-r border-[#F6F8FB]">{row.shift}</td>
                      <td className="py-2 px-3 text-[#333] whitespace-nowrap border-r border-[#F6F8FB]">{row.machine}</td>
                      <td className="py-2 px-3 text-[#333] whitespace-nowrap border-r border-[#F6F8FB]">{row.operator}</td>
                      <td className="py-2 px-3 text-[#333] whitespace-nowrap border-r border-[#F6F8FB]">{row.operatorCode}</td>
                      <td className="py-2 px-3 text-[#333] whitespace-nowrap border-r border-[#F6F8FB]">{row.plan}</td>
                      <td className="py-2 px-3 text-[#333] whitespace-nowrap border-r border-[#F6F8FB]">{row.part}</td>
                      <td className="py-2 px-3 text-[#333] whitespace-nowrap border-r border-[#F6F8FB]">{row.rejection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Panel - Pivot Mode */}
        <RightPanel pivotMode={pivotMode} setPivotMode={setPivotMode} />
      </div>
    </PageLayout>
  );
}