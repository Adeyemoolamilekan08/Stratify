import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowPathIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  FunnelIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';
import { SplitDowntimeModal, DowntimeSegment } from '../components/SplitDowntimeModal';

const reasons = ['Select Reason', '5 | Nozzle blockage', 'Machine Breakdown', 'Power Failure', 'Material Shortage', 'No reason'];
const machines = ['All Machines', 'HT-34-FERO-200', 'MI-24-OM-350', 'MI-23-HT-300', 'LI-47-HXM-1100', 'LI-46-HT-1000', 'LI-41-HXM-630'];
const shifts = ['All Shifts', 'Shift1', 'Shift2'];

const baseRows = [
  ['HT-34-FERO-200','06:51:17','07:00:00','00:08:42','Select Reason','-'],
  ['MI-24-OM-350','06:47:36','07:00:00','00:12:23','5 | Nozzle blockage','clock'],
  ['HT-34-FERO-200','06:44:43','06:50:33','00:05:50','Select Reason','-'],
  ['MI-23-HT-300','06:44:09','07:00:00','00:15:50','5 | Nozzle blockage','clock'],
  ['LI-47-HXM-1100','06:41:06','06:50:29','00:09:22','Select Reason','-'],
  ['LI-46-HT-1000','06:38:49','06:56:22','00:17:32','Select Reason','-'],
  ['LI-47-HXM-1100','06:36:10','06:40:06','00:03:55','Select Reason','-'],
  ['MI-24-OM-350','06:34:34','06:45:54','00:11:19','5 | Nozzle blockage','clock'],
  ['MI-26-OM-450','06:29:36','06:33:41','00:04:05','5 | Nozzle blockage','clock'],
  ['LI-41-HXM-630','06:25:54','06:32:46','00:06:51','Select Reason','-'],
  ['LI-40-HT-600','06:24:16','06:28:35','00:04:19','Select Reason','-'],
  ['LI-42-HT-700','06:19:46','06:21:47','00:02:01','Select Reason','-'],
  ['LI-46-HT-1000','06:16:30','06:34:59','00:18:29','Select Reason','-'],
  ['LI-47-HXM-1100','06:14:42','06:32:40','00:17:58','Select Reason','-'],
];

const rows = Array.from({ length: 4 }, (_, block) => baseRows.map((r, i) => ({
  id: `${block}-${i}`,
  machine: r[0], start: r[1], end: r[2], duration: r[3], reason: r[4], planned: r[5], shift: block % 2 ? 'Shift1' : 'Shift2',
})) ).flat();

function IconButton({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return <Tooltip content={label}><button onClick={onClick} aria-label={label} className="h-8 w-8 rounded-full flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#334155] transition-colors">{children}</button></Tooltip>;
}

function FilterDrawer({ open, onClose, date, setDate, shift, setShift, machine, setMachine }: any) {
  const d = new Date(date);
  const [month, setMonth] = useState(d.getMonth());
  const [year, setYear] = useState(d.getFullYear());
  const days = new Date(year, month + 1, 0).getDate();
  const first = new Date(year, month, 1).getDay();
  if (!open) return null;
  return <>
    <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose}/>
    <aside className="fixed right-0 top-0 bottom-0 z-50 w-[330px] max-w-[92vw] bg-white shadow-2xl border-l border-[#E2E8F0] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-5 py-4 flex items-center justify-between">
        <div><h2 className="text-[16px] font-medium text-[#1F2937]">Filters</h2><p className="text-[11px] text-[#94A3B8] mt-0.5">Refine downtime records</p></div>
        <IconButton label="Close filters" onClick={onClose}><XMarkIcon className="w-5 h-5"/></IconButton>
      </div>
      <div className="p-5 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3"><span className="text-[12px] font-medium text-[#475569]">Date</span><div className="flex gap-1"><IconButton label="Previous month" onClick={()=>month===0?(setMonth(11),setYear(year-1)):setMonth(month-1)}><ChevronLeftIcon className="w-4 h-4"/></IconButton><IconButton label="Next month" onClick={()=>month===11?(setMonth(0),setYear(year+1)):setMonth(month+1)}><ChevronRightIcon className="w-4 h-4"/></IconButton></div></div>
          <div className="text-center text-[13px] font-medium text-[#334155] mb-2">{new Date(year,month).toLocaleString('en',{month:'long',year:'numeric'})}</div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#94A3B8]">{['Su','Mo','Tu','We','Th','Fr','Sa'].map(x=><span key={x} className="py-1">{x}</span>)}
            {Array.from({length:first}).map((_,i)=><span key={'e'+i}/>) }
            {Array.from({length:days},(_,i)=>i+1).map(day=><button key={day} onClick={()=>setDate(new Date(year,month,day))} className={`h-8 rounded-full text-[11px] ${date.getDate()===day&&date.getMonth()===month&&date.getFullYear()===year?'bg-[#3348A8] text-white':'hover:bg-[#F1F5F9] text-[#334155]'}`}>{day}</button>)}
          </div>
        </div>
        {[['Shift',shift,setShift,shifts],['Machine',machine,setMachine,machines]].map(([label,value,setter,options]: any)=><label key={label} className="block"><span className="block text-[11px] font-medium text-[#64748B] mb-1.5">{label}</span><div className="relative"><select value={value} onChange={e=>setter(e.target.value)} className="w-full appearance-none border border-[#CBD5E1] rounded-[4px] h-10 px-3 pr-8 text-[12px] text-[#334155] bg-white outline-none focus:border-[#3348A8]">{options.map((o:string)=><option key={o}>{o}</option>)}</select><ChevronDownIcon className="w-4 h-4 absolute right-2 top-3 text-[#94A3B8] pointer-events-none"/></div></label>)}
        <button onClick={()=>{setShift('All Shifts');setMachine('All Machines')}} className="w-full h-10 rounded-[4px] border border-[#CBD5E1] text-[12px] text-[#475569] hover:bg-[#F8FAFC]">Reset filters</button>
      </div>
    </aside>
  </>;
}

export default function DowntimeLog() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date(2026,7,3));
  const [shift, setShift] = useState('All Shifts');
  const [machine, setMachine] = useState('All Machines');
  const [query, setQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [split, setSplit] = useState<any>(null);
  const [remarks, setRemarks] = useState<Record<string,string>>({});
  const [reasonMap, setReasonMap] = useState<Record<string,string>>({});
  const [refresh, setRefresh] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const filtered = useMemo(()=>rows.filter(r => (shift==='All Shifts'||r.shift===shift) && (machine==='All Machines'||r.machine===machine) && `${r.machine} ${r.reason}`.toLowerCase().includes(query.toLowerCase())),[shift,machine,query,refresh]);

  const splitHandler = (segments: DowntimeSegment[]) => { setRefresh(x=>x+1); console.info('Split downtime', segments); };

  return <div className="min-h-full bg-white text-[#1F2937]">
    <header className="h-[72px] border-b border-[#E2E8F0] bg-white flex items-center justify-between px-5 lg:px-7 sticky top-0 z-30">
      <div className="flex items-center gap-3"><h1 className="text-[24px] font-normal tracking-[-0.02em]">Downtime Log</h1><IconButton label="About Downtime Log" onClick={()=>setInfoOpen(v=>!v)}><InformationCircleIcon className="w-5 h-5"/></IconButton><IconButton label="Downtime log settings" onClick={()=>setSettingsOpen(v=>!v)}><Cog6ToothIcon className="w-5 h-5"/></IconButton><IconButton label="Refresh downtime log" onClick={()=>setRefresh(x=>x+1)}><ArrowPathIcon className="w-5 h-5"/></IconButton></div>
      <div className="flex items-center gap-3"><div className="hidden sm:flex items-center w-[350px] lg:w-[430px] h-10 rounded-full border border-[#CBD5E1] px-4 text-[#64748B]"><MagnifyingGlassIcon className="w-4 h-4 mr-2"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search reports & insights" className="w-full outline-none text-[12px] bg-transparent"/></div><IconButton label="Sync data" onClick={()=>setRefresh(x=>x+1)}><ArrowPathIcon className="w-5 h-5"/></IconButton><IconButton label="Open help"><InformationCircleIcon className="w-5 h-5"/></IconButton><Tooltip content="Signed in user"><button className="w-9 h-9 rounded-full bg-[#3348A8] text-white text-[12px]">NU</button></Tooltip></div>
    </header>
    <main className="px-4 lg:px-5 py-4">
      {infoOpen && <div className="mb-3 rounded-[6px] border border-[#D8DDE6] bg-[#F8FAFC] p-3 text-[12px] text-[#475569]">Downtime records capture machine stops, durations, reasons, planned status and operator remarks.</div>}
      {settingsOpen && <div className="mb-3 rounded-[6px] border border-[#D8DDE6] bg-white p-4 shadow-sm text-[12px]">Columns are configured from the settings action. The reference view keeps Machine, start/end, Duration, Reason, Is planned, Action and Remark visible.</div>}
      <div className="flex items-center justify-end gap-2 mb-1"><div className="text-[18px] text-[#334155] mr-auto">{filtered.length} of 16447 records <span className="text-[#94A3B8]">|</span> {machine} <span className="text-[#94A3B8]">|</span> {shift} <span className="text-[#94A3B8]">-</span> {date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</div><Tooltip content="Open filters"><button onClick={()=>setFilterOpen(true)} className="w-9 h-9 rounded-full border border-[#CBD5E1] flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC]"><FunnelIcon className="w-4 h-4"/></button></Tooltip></div>
      <div className="text-[20px] text-[#3348A8] mb-3">Shift2</div>
      <div className="overflow-x-auto rounded-[2px] border-t border-[#E2E8F0]">
        <table className="min-w-[980px] w-full border-collapse text-[12px]"><thead><tr className="h-[42px] text-left text-[#475569]">{['Machine','Downtime start','Downtime end','Duration','Reason','Is planned','Action','Remark'].map(h=><th key={h} className="font-normal px-3 border-b border-[#E2E8F0] whitespace-nowrap">{h}</th>)}</tr></thead>
          <tbody>{filtered.map(row=><tr key={row.id} className="h-[54px] hover:bg-[#FAFBFC] border-b border-[#E2E8F0]">
            <td className="px-3 font-normal text-[#334155] w-[145px]">{row.machine}</td><td className="px-3 whitespace-nowrap">{row.start}</td><td className="px-3 whitespace-nowrap">{row.end}</td><td className="px-3 whitespace-nowrap">{row.duration}</td>
            <td className="px-3"><select value={reasonMap[row.id] ?? row.reason} onChange={e=>setReasonMap(m=>({...m,[row.id]:e.target.value}))} className="appearance-none bg-transparent border-b border-dashed border-[#94A3B8] h-8 min-w-[170px] outline-none text-[12px] text-[#475569]"><option value="Select Reason">Select Reason</option>{reasons.slice(1).map(r=><option key={r}>{r}</option>)}</select></td>
            <td className="px-3 text-center">{row.planned==='clock'?<span className="text-[#2FB6CC]" title="Planned downtime"><CalendarDaysIcon className="w-5 h-5 inline"/></span>:'-'}</td>
            <td className="px-3"><Tooltip content="Split downtime"><button onClick={()=>setSplit({machine:row.machine,shift:row.shift,duration:row.duration,startTime:row.start,endTime:row.end})} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-[4px] border border-[#3348A8] text-[#3348A8] hover:bg-[#EEF2FF]"><PlusIcon className="w-3.5 h-3.5"/>Split</button></Tooltip></td>
            <td className="px-3"><button onClick={()=>{const current=remarks[row.id]??''; const value=window.prompt('Remark',current); if(value!==null)setRemarks(m=>({...m,[row.id]:value}))}} className="text-[#475569] hover:text-[#3348A8] text-left"><span className="block">{remarks[row.id]||'Remark'}</span><PencilIcon className="w-4 h-4 mt-0.5 text-[#64748B]"/></button></td>
          </tr>)}</tbody>
        </table>
      </div>
    </main>
    <FilterDrawer open={filterOpen} onClose={()=>setFilterOpen(false)} date={date} setDate={setDate} shift={shift} setShift={setShift} machine={machine} setMachine={setMachine}/>
    {split && <SplitDowntimeModal isOpen={true} onClose={()=>setSplit(null)} {...split} reasonOptions={reasons.slice(1)} onSplit={splitHandler}/>} 
  </div>;
}
