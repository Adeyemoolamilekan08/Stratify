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
  Squares2X2Icon
} from '@heroicons/react/24/outline';

// Right Panel Component
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

export default function QualityReport() {
  const [pivotMode, setPivotMode] = useState(false);
  const [showSaveAs, setShowSaveAs] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [reportName, setReportName] = useState('');
  const [showChart, setShowChart] = useState(true);
  const saveAsRef = useRef<HTMLDivElement>(null);
  const reportsRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

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

  return (
    <PageLayout title="Quality reports">
      {/* Toolbar */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-2.5 flex items-center gap-3 flex-shrink-0 h-[60px]">
        <div className="relative" ref={saveAsRef}>
          <button
            onClick={() => setShowSaveAs(!showSaveAs)}
            className="px-4 py-2 bg-[#3F51B5] text-white text-[13px] font-medium rounded-[4px] hover:bg-[#33408F] transition-colors"
          >
            <PencilSquareIcon className="w-4 h-4 mr-1.5 inline" />
            Save As...
          </button>
          {showSaveAs && (
            <div className="absolute top-full left-0 mt-1 w-[280px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-lg p-4 z-50">
              <label className="block text-[13px] font-medium text-[#333] mb-1.5">Report Name</label>
              <input
                type="text"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Enter report name..."
                className="w-full px-3 py-1.5 border border-[#D8D8D8] rounded-[4px] text-[13px] focus:outline-none focus:ring-1 focus:ring-[#3F51B5]"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button onClick={() => setShowSaveAs(false)} className="px-3 py-1 text-[13px] text-[#6B7280] hover:bg-[#F8F9FB] rounded-[4px]">
                  Cancel
                </button>
                <button onClick={() => setShowSaveAs(false)} className="px-3 py-1 text-[13px] bg-[#3F51B5] text-white rounded-[4px] hover:bg-[#33408F]">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

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
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors">
                Production Report
              </button>
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors">
                Downtime Report
              </button>
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors">
                Quality Report
              </button>
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors">
                Performance Report
              </button>
            </div>
          )}
        </div>

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
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors">
                Excel
              </button>
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors">
                CSV
              </button>
              <button className="w-full text-left px-4 py-2 text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors">
                PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Report Name & Controls */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <LockClosedIcon className="w-4 h-4 text-[#6B7280]" />
          <span className="text-[16px] font-medium text-[#222]">Rework By Reason</span>
          <button className="p-1 text-[#6B7280] hover:text-[#222] transition-colors">
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-[#D8D8D8] rounded-[4px] px-3 py-1.5">
            <CalendarIcon className="w-4 h-4 text-[#6B7280]" />
            <input
              type="date"
              defaultValue="2026-07-17"
              className="text-[13px] border-none focus:outline-none bg-transparent w-[100px]"
            />
            <span className="text-[#6B7280]">to</span>
            <input
              type="date"
              defaultValue="2026-07-17"
              className="text-[13px] border-none focus:outline-none bg-transparent w-[100px]"
            />
          </div>
          <select className="px-3 py-1.5 border border-[#D8D8D8] rounded-[4px] text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-[#3F51B5]">
            <option>Shift wise</option>
            <option>Hourly</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <button
            onClick={() => setShowChart(!showChart)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#D8D8D8] rounded-[4px] text-[13px] text-[#333] hover:bg-[#F8F9FB] transition-colors"
          >
            {showChart ? (
              <EyeIcon className="w-4 h-4" />
            ) : (
              <EyeSlashIcon className="w-4 h-4" />
            )}
            Hide chart
          </button>
        </div>
      </div>

      {/* Chart Area - "No data available to be charted." */}
      <div className="bg-white border-b border-[#E5E7EB] px-4 py-8 flex items-center justify-center flex-shrink-0">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 text-[#D1D5DB]">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-[14px] text-[#6B7280]">No data available to be charted.</p>
        </div>
      </div>

      {/* AG Grid Area */}
      <div className="flex-1 flex overflow-hidden bg-white">
        {/* Grid Content */}
        <div className="flex-1 flex flex-col">
          {/* Row Group Panel */}
          <div className="bg-[#F5F5F5] border-b border-[#DDD] px-4 py-1 flex-shrink-0">
            <div className="border-2 border-dashed border-[#D8D8D8] rounded-[2px] px-3 py-0.5 text-center text-[13px] text-[#888]">
              Drag here to set row groups
            </div>
          </div>

          {/* No Rows To Show - Empty State */}
          <div className="flex-1 flex items-center justify-center bg-white">
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
        </div>

        {/* Right Panel - Pivot Mode */}
        <RightPanel pivotMode={pivotMode} setPivotMode={setPivotMode} />
      </div>
    </PageLayout>
  );
}