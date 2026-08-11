import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProductionPlans } from '../hooks/useProductionPlanning';
import { ProductionPlan } from '../types/productionPlanning';
import {
  ArrowLeft, ArrowRight, ArrowDownUp, CalendarDays, Check, ChevronDown, ChevronLeft,
  ChevronRight, Copy, Download, Filter, GripVertical, Info, Pencil, Plus, RefreshCw,
  Search, Settings, SlidersHorizontal, Star, Trash2, Wrench, X, Clock3, Upload,
} from 'lucide-react';

const GREEN = '#18C979';
const BLUE = '#273CBA';
const CYAN = '#22C7D6';
const RED = '#F0445E';
const TEXT = '#26334A';
const MUTED = '#6B7280';
const BORDER = '#E1E4EA';

const machines = [
  'HT-28-HT-270','HT-29-HT-270','HT-30-HT-270','HT-31-HT-270','HT-32-FERO-275',
  'HT-34-FERO-200','HT-35-HXH-260','HT-37-HXH-260','HT-38-HXH-260','HT-48A-IBM-110',
  'MI-01-HT-86','MI-02-HT-86','MI-03-FU-110','MI-04-FU-110','MI-05-HT-120','MI-06-HT-120','MI-07-HT-120'
];
const parts = [
  '15ML MEASURING CUP','10ML MEASURING CUP','SFG - Diamond Jug','SFG - Crystal/Deep Bucket 9ltr Body',
  'SFG - Darvinks NeoSkin Flip Cap','Darvinks Visita Flip Cap','Crystal Spoon','DELUXE FLOWER POT','Dinner Plate','Disposable Plastic Fork','DUST PAN PACKER'
];
const statuses = ['Operational','New','Complete','Aborted'];

const demoPlans: ProductionPlan[] = [
  ['100-7321','HT-28-HT-270','15ML MEASURING CUP',900000,'2026-08-08T07:59:00','planned'],
  ['100-7303','HT-28-HT-270','15ML MEASURING CUP',300000,'2026-08-06T10:32:00','planned'],
  ['100-7272','HT-28-HT-270','15ML MEASURING CUP',300000,'2026-08-04T07:07:00','planned'],
  ['100-7248','HT-28-HT-270','15ML MEASURING CUP',300000,'2026-07-31T17:29:00','planned'],
  ['100-7318','HT-29-HT-270','10ML MEASURING CUP',1200000,'2026-08-07T18:49:00','planned'],
  ['100-7298','HT-29-HT-270','SFG - Diamond Jug',15000,'2026-08-05T14:37:00','in-progress'],
  ['100-7262','HT-29-HT-270','SFG - Diamond Jug',15000,'2026-08-02T01:28:00','planned'],
  ['100-7340','HT-30-HT-270','SFG - Crystal/Deep Bucket 9ltr Body',15000,'2026-08-10T17:27:00','planned'],
  ['100-7330','HT-30-HT-270','SFG - Darvinks NeoSkin Flip Cap',300000,'2026-08-09T01:18:00','in-progress'],
  ['100-7249','HT-30-HT-270','SFG - Darvinks NeoSkin Flip Cap',300000,'2026-08-01T10:32:00','planned'],
  ['100-7254','HT-31-HT-270','MI-10-HT-160 Sfg Twister Medium Cover',1500000,'2026-08-06T12:30:00','planned'],
  ['100-7256','HT-31-HT-270','SFG - 100ltr Drum Bottom',300000,'2026-08-04T09:15:00','planned'],
  ['100-7215','HT-34-FERO-200','Sfg Amore Papilon Cabinet Junior - Side Frame',0,'2026-08-01T12:00:00','planned'],
  ['100-7274','HT-35-HXH-260','Crystal Spoon',57729,'2026-08-07T11:20:00','planned'],
  ['100-7263','HT-37-HXH-260','Sfg - Pap 1 Ltr Round Container Bottom',2130,'2026-08-03T08:17:00','planned'],
  ['100-6977','HT-38-HXH-260','Sfg Twister Medium Container',1300,'2026-08-02T07:00:00','planned'],
].map(([id,machine,part,qty,start,status], i) => ({
  id: String(id), planNumber: String(id),
  part: { id: `p${i}`, name: String(part), code: String(id) },
  color: { id: 'na', name: 'NA', code: 'NA' },
  equipment: { id: String(machine), name: String(machine), code: String(machine), department: 'Molding' },
  plannedQuantity: Number(qty), producedQuantity: 0, rejectedQuantity: 0,
  startDate: String(start), endDate: String(start), status: status as any, priority: 'medium', isFavorite: false,
  createdAt: '2026-07-01T00:00:00', updatedAt: '2026-08-10T00:00:00', createdBy: 'Planner',
}));

function fmtDate(d: Date) { return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }); }
function startOfDay(d: Date) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
function endOfDay(d: Date) { const x = new Date(d); x.setHours(23,59,59,999); return x; }

export default function ProductionPlanning() {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = location.pathname.endsWith('/plan') ? 'add' : location.pathname.endsWith('/reorder') ? 'reorder' : 'list';

  const [selectedDate, setSelectedDate] = useState(new Date('2026-08-10T00:00:00'));
  const [view, setView] = useState<'List'|'Day'|'Week'|'Month'>('List');
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [viewMenu, setViewMenu] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState('All Machines');
  const [selectedPart, setSelectedPart] = useState('All Parts');
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState('Machine');
  const [plans, setPlans] = useState<ProductionPlan[]>(demoPlans);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dense, setDense] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ProductionPlan | null>(null);


  const period = useMemo(() => {
    const s = new Date(selectedDate);
    const e = new Date(selectedDate);
    if (view === 'Month' || view === 'List') { s.setDate(1); e.setMonth(e.getMonth()+1,0); }
    if (view === 'Week') { const day = s.getDay(); s.setDate(s.getDate() - day); e.setDate(s.getDate()+6); }
    return { start: s, end: e };
  }, [selectedDate, view]);

  const visiblePlans = useMemo(() => {
    const q = search.trim().toLowerCase();
    return plans.filter(p => {
      const matchesSearch = !q || [p.planNumber,p.part.name,p.equipment.name].some(v => v.toLowerCase().includes(q));
      const matchesMachine = selectedMachine === 'All Machines' || p.equipment.name === selectedMachine;
      const matchesPart = selectedPart === 'All Parts' || p.part.name === selectedPart;
      const matchesStatus = !selectedStatus.length || selectedStatus.includes(statusLabel(p.status));
      return matchesSearch && matchesMachine && matchesPart && matchesStatus;
    });
  }, [plans, search, selectedMachine, selectedPart, selectedStatus]);

  const grouped = useMemo(() => {
    const map: Record<string, ProductionPlan[]> = {};
    visiblePlans.forEach(p => { const key = groupBy === 'Machine' ? p.equipment.name : p.part.name; (map[key] ||= []).push(p); });
    return Object.entries(map);
  }, [visiblePlans, groupBy]);

  const goPeriod = (direction: number) => {
    const d = new Date(selectedDate);
    if (view === 'Month' || view === 'List') d.setMonth(d.getMonth()+direction);
    else if (view === 'Week') d.setDate(d.getDate()+direction*7);
    else d.setDate(d.getDate()+direction);
    setSelectedDate(d);
  };

  const toggleFavorite = (id: string) => setPlans(ps => ps.map(p => p.id === id ? {...p, isFavorite: !p.isFavorite} : p));
  const copyPlan = (id: string) => { const p = plans.find(x => x.id===id); if (!p) return; setPlans(ps => [{...p, id:`${Date.now()}`, planNumber:`${p.planNumber}-copy`, isFavorite:false},...ps]); };
  const deletePlan = (id: string) => setPlans(ps => ps.filter(p => p.id!==id));

  if (mode === 'add') return <AddPlanPage onBack={() => navigate('/production-planning')} onSave={(p, addNew) => { const item = makeNewPlan(p, plans.length); setPlans(ps => [item,...ps]); if (!addNew) navigate('/production-planning'); }} />;
  if (mode === 'reorder') return <ReorderPage plans={plans} onBack={() => navigate('/production-planning')} onSave={(next) => { setPlans(next); navigate('/production-planning'); }} onFavorite={toggleFavorite} onCopy={copyPlan} onDelete={deletePlan} />;

  const toolbarDate = view === 'List' ? `${fmtDate(period.start)} - ${fmtDate(period.end)}` : view === 'Month' ? period.start.toLocaleDateString('en-US',{month:'long',year:'numeric'}) : `${fmtDate(period.start)} - ${fmtDate(period.end)}`;

  return (
    <div className="min-h-full bg-white text-[#26334A]">
      <PlanningTopHeader search={search} setSearch={setSearch} settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} dense={dense} setDense={setDense} />
      <div className="sticky top-0 z-20 bg-white border-b border-[#E4E6EA]">
        <div className="flex items-center justify-between px-7 py-2.5 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button className="h-8 px-3 border border-[#D9DDE5] rounded text-[12px] hover:bg-[#F6F8FB]" onClick={() => setSelectedDate(new Date())}>Today</button>
            <button className="p-1.5 text-[#6B7280] hover:bg-[#F3F4F6] rounded" onClick={() => goPeriod(-1)}><ChevronLeft size={16}/></button>
            <button className="p-1.5 text-[#6B7280] hover:bg-[#F3F4F6] rounded" onClick={() => goPeriod(1)}><ChevronRight size={16}/></button>
            <span className="text-[13px] font-medium whitespace-nowrap">{toolbarDate}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setEquipmentOpen(true)} className="h-8 px-3 rounded bg-[#27D27D] text-white text-[12px] font-semibold flex items-center gap-1.5 hover:bg-[#19BF6B]"><Wrench size={14}/> Equipment Change</button>
            <button onClick={() => navigate('/production-planning/plan')} className="h-8 px-3 rounded bg-[#2D3DB8] text-white text-[12px] font-semibold flex items-center gap-1.5 hover:bg-[#24339F]"><Plus size={15}/> Add new plan</button>
            <button onClick={() => navigate('/production-planning/reorder')} className="h-8 px-3 rounded border border-[#5B6380] text-[#3E4764] text-[12px] font-medium flex items-center gap-1.5 hover:bg-[#F7F8FA]"><ArrowDownUp size={14}/> Re-order plans</button>
            <div className="relative">
              <button onClick={() => setViewMenu(v=>!v)} className="h-8 px-3 rounded border border-[#BFC4CE] text-[12px] flex items-center gap-2">{view}<ChevronDown size={14}/></button>
              {viewMenu && <div className="absolute right-0 top-9 z-50 w-28 bg-white border border-[#D9DDE5] shadow-lg rounded overflow-hidden">
                {(['List','Day','Week','Month'] as const).map(v => <button key={v} onClick={()=>{setView(v);setViewMenu(false)}} className={`block w-full px-3 py-2 text-left text-[12px] hover:bg-[#F3F4F6] ${view===v?'bg-[#EEF1FF] text-[#273CBA]':''}`}>{v}</button>)}
              </div>}
            </div>
            <button onClick={() => setFiltersOpen(v=>!v)} className={`h-8 px-3 rounded border text-[12px] flex items-center gap-2 ${filtersOpen?'border-[#273CBA] text-[#273CBA]':'border-[#BFC4CE]'}`}><Filter size={14}/> Filters</button>
          </div>
        </div>
      </div>

      <div className={`px-7 ${dense ? 'py-1' : 'py-2'} ${filtersOpen ? 'pr-[310px]' : ''}`}>
        {view === 'Month' ? <MonthTimeline plans={visiblePlans} selectedDate={selectedDate} /> : visiblePlans.length ? (
          <div className="space-y-5">
            {grouped.map(([group, rows]) => <PlanGroup key={group} title={group} plans={rows} dense={dense} onPlan={(p)=>setSelectedPlan(p)} onFavorite={toggleFavorite} onCopy={copyPlan} onDelete={deletePlan} />)}
          </div>
        ) : <EmptyPlans onAdd={() => navigate('/production-planning/plan')} />}
      </div>

      {filtersOpen && <FiltersPanel selectedDate={selectedDate} setSelectedDate={setSelectedDate} machine={selectedMachine} setMachine={setSelectedMachine} part={selectedPart} setPart={setSelectedPart} statuses={selectedStatus} setStatuses={setSelectedStatus} groupBy={groupBy} setGroupBy={setGroupBy} onClose={()=>setFiltersOpen(false)} />}
      {equipmentOpen && <EquipmentChangeModal onClose={()=>setEquipmentOpen(false)} />}
      {selectedPlan && <PlanDetail plan={selectedPlan} onClose={()=>setSelectedPlan(null)} />}
    </div>
  );
}

function PlanningTopHeader({search,setSearch,settingsOpen,setSettingsOpen,dense,setDense}:{search:string;setSearch:(v:string)=>void;settingsOpen:boolean;setSettingsOpen:(v:boolean)=>void;dense:boolean;setDense:(v:boolean)=>void}) {
  return <header className="h-[54px] flex items-center justify-between px-7 bg-white border-b border-[#E4E6EA]">
    <div className="flex items-center gap-3"><h1 className="text-[22px] font-medium">Production Planning</h1><Info size={18} className="text-[#6B7280]"/><div className="relative"><button onClick={()=>setSettingsOpen(!settingsOpen)} className="p-1.5 rounded hover:bg-[#F3F4F6]"><Settings size={18}/></button>{settingsOpen&&<div className="absolute left-0 top-9 z-50 w-44 bg-white border border-[#D9DDE5] shadow-lg rounded p-3 text-[12px]"><label className="flex items-center justify-between gap-3"><span>Compact rows</span><input type="checkbox" checked={dense} onChange={e=>setDense(e.target.checked)}/></label><p className="mt-2 text-[10px] text-[#8A8F99]">Adjust planning table density.</p></div>}</div><button title="Refresh" onClick={()=>window.location.reload()}><RefreshCw size={18} className="text-[#6B7280] cursor-pointer"/></button></div>
    <div className="flex items-center gap-5"><div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F99]"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search reports & insights" className="w-[350px] h-10 rounded-full border border-[#D4D8E0] pl-10 pr-4 text-[13px] outline-none focus:border-[#273CBA]"/></div><span className="text-[#6B7280]">◌</span><span className="text-[#6B7280]">?</span><span className="w-8 h-8 rounded-full bg-[#3548C4] text-white flex items-center justify-center">⌣</span></div>
  </header>
}

function PlanGroup({title,plans,dense,onPlan,onFavorite,onCopy,onDelete}:{title:string;plans:ProductionPlan[];dense:boolean;onPlan:(p:ProductionPlan)=>void;onFavorite:(id:string)=>void;onCopy:(id:string)=>void;onDelete:(id:string)=>void}) {
  return <section><h2 className="text-[20px] font-medium text-[#293C7C] mb-2">{title}</h2><div className="grid grid-cols-[72px_1.2fr_1.2fr_1fr_1fr_150px_105px] items-center border-b border-[#E0E2E6] text-[11px] text-[#5E6470] px-3 h-8"><span></span><span>Plan</span><span>Part</span><span>Equipment</span><span>Planned qty</span><span>Start at</span><span>Action</span></div>{plans.map(p=><div key={p.id} className={`grid grid-cols-[72px_1.2fr_1.2fr_1fr_1fr_150px_105px] items-center border-b border-[#E4E6EA] px-3 ${dense?'min-h-[42px]':'min-h-[56px]'} text-[12px] hover:bg-[#FBFCFD]`}>
    <span className="w-4 h-4 rounded-full" style={{background:p.status==='in-progress'?RED:'#4BC15F'}}></span>
    <button onClick={()=>onPlan(p)} className="text-left text-[#2F477C] underline underline-offset-2 hover:text-[#273CBA]">{p.planNumber}</button>
    <span className="pr-3">{p.part.name}</span><span className="pr-3">{p.equipment.name}</span><span>{p.plannedQuantity.toLocaleString()}</span><span>{new Date(p.startDate).toLocaleDateString('en-US',{month:'short',day:'numeric'})}, {new Date(p.startDate).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false})}</span>
    <span className="flex items-center gap-2"><button title="Favorite" onClick={()=>onFavorite(p.id)} className={`${p.isFavorite?'text-[#F2C64D]':'text-[#F2C64D]'} hover:scale-110`}><Star size={20} fill={p.isFavorite?'currentColor':'none'}/></button><button title="Edit" onClick={()=>onPlan(p)} className="text-[#646B75] hover:text-[#273CBA]"><Pencil size={18}/></button><button title="Copy" onClick={()=>onCopy(p.id)} className="text-[#646B75] hover:text-[#273CBA]"><Copy size={18}/></button><button title="Delete" onClick={()=>onDelete(p.id)} className="text-[#E7475A] hover:text-[#C7253C]"><Trash2 size={18}/></button></span>
  </div>)}</section>
}

function MonthTimeline({plans,selectedDate}:{plans:ProductionPlan[];selectedDate:Date}) {
  const days = Array.from({length:31},(_,i)=>i+1); return <div className="overflow-x-auto"><div className="min-w-[1100px]"><div className="grid grid-cols-[300px_repeat(31,1fr)] border-b border-[#DDE1E8] text-[10px] text-[#6B7280]"><div className="p-2">Production plan</div>{days.map(d=><div key={d} className="text-center p-2 border-l border-[#EEF0F3]">{d}</div>)}</div>{plans.map((p,i)=>{const day=new Date(p.startDate).getDate();const width=Math.max(2,Math.min(31-day+1,Math.round((new Date(p.endDate).getTime()-new Date(p.startDate).getTime())/86400000)+1));return <div key={p.id} className="grid grid-cols-[300px_1fr] h-7 border-b border-[#EEF0F3]"><div className="px-2 flex items-center text-[10px] truncate">{p.planNumber} {p.equipment.name} {p.part.name}</div><div className="relative"><div className="absolute inset-y-1 rounded text-[9px] text-white px-2 flex items-center" style={{left:`${((day-1)/31)*100}%`,width:`${(width/31)*100}%`,background:i%4===0?GREEN:i%4===1?CYAN: i%4===2?RED:'#4BBF59'}}>{p.planNumber} {p.part.name}</div></div></div>})}</div></div>
}

function FiltersPanel({selectedDate,setSelectedDate,machine,setMachine,part,setPart,statuses,setStatuses,groupBy,setGroupBy,onClose}:{selectedDate:Date;setSelectedDate:(d:Date)=>void;machine:string;setMachine:(v:string)=>void;part:string;setPart:(v:string)=>void;statuses:string[];setStatuses:(v:string[])=>void;groupBy:string;setGroupBy:(v:string)=>void;onClose:()=>void}) {
  const [open,setOpen]=useState<'machine'|'part'|'status'|null>(null); const [month,setMonth]=useState(new Date(selectedDate));
  const toggleStatus=(s:string)=>setStatuses(statuses.includes(s)?statuses.filter(x=>x!==s):[...statuses,s]);
  const days=new Date(month.getFullYear(),month.getMonth()+1,0).getDate(); const first=new Date(month.getFullYear(),month.getMonth(),1).getDay();
  return <aside className="fixed top-[54px] right-0 bottom-0 z-40 w-[285px] bg-white border-l border-[#DDE1E8] shadow-xl overflow-y-auto"><div className="flex items-center justify-between px-4 py-3 border-b"><h3 className="font-medium">Filters</h3><button onClick={onClose}><X size={18}/></button></div><div className="p-3"><div className="flex items-center justify-between mb-3"><button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}><ChevronLeft size={16}/></button><b className="text-[13px]">{month.toLocaleDateString('en-US',{month:'long',year:'numeric'})}</b><button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}><ChevronRight size={16}/></button></div><div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#8A8F99]">{['S','M','T','W','T','F','S'].map((d,i)=><span key={i}>{d}</span>)}{Array.from({length:first}).map((_,i)=><span key={'e'+i}/>) }{Array.from({length:days},(_,i)=>i+1).map(d=><button key={d} onClick={()=>setSelectedDate(new Date(month.getFullYear(),month.getMonth(),d))} className={`h-7 rounded-full text-[11px] ${selectedDate.getDate()===d&&selectedDate.getMonth()===month.getMonth()?'bg-[#2EC8D3] text-white':''}`}>{d}</button>)}</div>
  <FilterSelect label="Machine" value={machine} open={open==='machine'} onOpen={()=>setOpen(open==='machine'?null:'machine')} options={['All Machines',...machines]} onSelect={v=>{setMachine(v);setOpen(null)}} />
  <FilterSelect label="Part" value={part} open={open==='part'} onOpen={()=>setOpen(open==='part'?null:'part')} options={['All Parts',...parts]} onSelect={v=>{setPart(v);setOpen(null)}} />
  <div className="mt-3"><label className="text-[11px] text-[#737986]">Status</label><div className="border border-[#D6DAE1] rounded mt-1 p-2 flex flex-wrap gap-1"><button onClick={()=>setOpen(open==='status'?null:'status')} className="w-full text-left text-[12px] flex justify-between">{statuses.length?statuses.join(', '):'Select status'}<ChevronDown size={14}/></button>{statuses.map(s=><span key={s} className={`px-2 py-1 rounded-full text-[10px] ${s==='Operational'?'bg-[#70D88E] text-white':s==='New'?'bg-[#8FA2AF] text-white':s==='Complete'?'bg-[#26C8D6] text-white':'bg-[#F04B65] text-white'}`}>{s}</span>)}{open==='status'&&<div className="w-full mt-1">{statusesList().map(s=><button key={s} onClick={()=>toggleStatus(s)} className="block w-full text-left px-2 py-1 text-[11px] hover:bg-[#F3F4F6]">{statuses.includes(s)?'✓ ':''}{s}</button>)}</div>}</div></div>
  <FilterSelect label="Group by" value={groupBy} open={false} onOpen={()=>{}} options={['Machine','Part']} onSelect={setGroupBy} />
  </div></aside>
}
function FilterSelect({label,value,open,onOpen,options,onSelect}:{label:string;value:string;open:boolean;onOpen:()=>void;options:string[];onSelect:(v:string)=>void}){return <div className="mt-3 relative"><label className="text-[11px] text-[#737986]">{label}</label><button onClick={onOpen} className="mt-1 w-full h-9 border border-[#D6DAE1] rounded px-2 text-[12px] flex items-center justify-between bg-white"><span className="truncate">{value}</span><ChevronDown size={14}/></button>{open&&<div className="absolute left-0 right-0 top-[54px] z-50 max-h-48 overflow-auto bg-white border border-[#D6DAE1] shadow-lg rounded">{options.map(o=><button key={o} onClick={()=>onSelect(o)} className="w-full px-2.5 py-2 text-left text-[11px] hover:bg-[#EEF1FF]">{o}</button>)}</div>}</div>}
function statusesList(){return statuses}

function EquipmentChangeModal({onClose}:{onClose:()=>void}){const rows=machines.slice(1,10).map((m,i)=>({machine:m,equipment:parts[i%parts.length],part:parts[(i+1)%parts.length],time:`0${7+i}-08-2026 ${18+i}:49`,qty:(i+1)*50000,status:i%3===0?'Open':'Complete'}));return <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5"><div className="bg-white w-full max-w-[1100px] rounded shadow-2xl"><div className="flex items-center justify-between px-5 py-4 border-b"><h2 className="text-[18px] font-medium">Equipment Change</h2><div className="flex items-center gap-4"><Download size={18} className="text-[#273CBA] cursor-pointer"/><button onClick={onClose}><X size={20}/></button></div></div><div className="p-4"><div className="max-h-[370px] overflow-auto border border-[#D8DDE4]"><table className="min-w-[980px] w-full text-[11px]"><thead className="sticky top-0 bg-[#F8F9FB]"><tr>{['Machine','Equipment','Part','Change Time','Planned qty','Status'].map(h=><th key={h} className="text-left px-3 py-2 border-b">{h}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.machine} className="border-b"><td className="px-3 py-2">{r.machine}</td><td className="px-3 py-2">{r.equipment}</td><td className="px-3 py-2">{r.part}</td><td className="px-3 py-2">{r.time}</td><td className="px-3 py-2">{r.qty.toLocaleString()}</td><td className="px-3 py-2">{r.status}</td></tr>)}</tbody></table></div></div></div></div>}

function AddPlanPage({onBack,onSave}:{onBack:()=>void;onSave:(p:any,addNew:boolean)=>void}){const [part,setPart]=useState('');const [machine,setMachine]=useState('');const [equipment,setEquipment]=useState('');const [qty,setQty]=useState('');const [start,setStart]=useState('2026-08-10T18:30');const [star,setStar]=useState(false);const [trial,setTrial]=useState(false);const fileRef=useRef<HTMLInputElement>(null);const [file,setFile]=useState('');const submit=(addNew:boolean)=>{if(!part||!machine)return;onSave({part,machine,equipment,qty,start,star,trial},addNew)};return <div className="min-h-full bg-white"><div className="h-[54px] border-b flex items-center justify-between px-7"><div className="flex items-center gap-3"><button onClick={onBack}><ArrowLeft size={20}/></button><h1 className="text-[22px] font-medium">Add new plan</h1><button onClick={()=>fileRef.current?.click()} className="h-8 px-3 border border-[#6A7190] rounded text-[12px]">... or import instead</button><input ref={fileRef} type="file" className="hidden" onChange={e=>setFile(e.target.files?.[0]?.name||'')}/>{file&&<span className="text-[10px] text-[#6B7280]">{file}</span>}</div><div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F99]"/><input placeholder="Search reports & insights" className="w-[350px] h-10 rounded-full border pl-10 text-[13px]"/></div></div><div className="px-7 py-5"><div className="grid grid-cols-3 gap-5"><SelectBox label="Part" value={part} setValue={setPart} options={parts}/><SelectBox label="Machine" value={machine} setValue={setMachine} options={machines}/><SelectBox label="Equipment" value={equipment} setValue={setEquipment} options={parts}/></div><h2 className="mt-6 mb-3 text-[18px]">Operational parameters <button className="ml-2 px-2 py-1 border rounded text-[11px] text-[#A0A5AD]">✎ Edit</button></h2><div className="grid grid-cols-3 gap-5"><InfoField icon={<Clock3 size={18}/>} label="Cycle time" value="secs"/><InfoField icon={<ArrowDownUp size={18}/>} label="Delay time" value="secs"/><InfoField icon={<SlidersHorizontal size={18}/>} label="Active cavity" value=""/></div><h2 className="mt-7 mb-3 text-[18px]">Plan details</h2><div className="grid grid-cols-[1fr_1fr_auto_auto] gap-5 items-end"><label className="border rounded px-3 py-2 h-[54px]"><span className="block text-[11px] text-[#777]">Quantity</span><input value={qty} onChange={e=>setQty(e.target.value)} className="w-full outline-none text-[13px]" placeholder="pcs"/></label><label className="border rounded px-3 py-2 h-[54px]"><span className="block text-[11px] text-[#777]">Scheduled start time*</span><input type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} className="w-full outline-none text-[13px]"/></label><label className="flex items-center gap-2 h-[54px] text-[12px]"><input type="checkbox" checked={star} onChange={e=>setStar(e.target.checked)}/> Mark as star</label><label className="flex items-center gap-2 h-[54px] text-[12px]"><input type="checkbox" checked={trial} onChange={e=>setTrial(e.target.checked)}/> Mark as trial</label></div><div className="flex items-center justify-between mt-5"><button onClick={onBack} className="text-[13px] text-[#273CBA]">Exit</button><div className="flex gap-2"><button onClick={()=>submit(false)} className="h-9 px-4 border border-[#596180] rounded text-[12px]">Save & Exit</button><button onClick={()=>submit(true)} className="h-9 px-4 bg-[#273CBA] text-white rounded text-[12px]">Save & Add new</button></div></div></div></div>}
function SelectBox({label,value,setValue,options}:{label:string;value:string;setValue:(v:string)=>void;options:string[]}){return <label className="h-[54px] bg-[#F1F1F2] border-b-2 border-[#4D5CC2] rounded-t px-3 py-2"><span className="block text-[11px] text-[#777]">{label}</span><select value={value} onChange={e=>setValue(e.target.value)} className="w-full bg-transparent outline-none text-[13px]"><option value="">{label}</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>}
function InfoField({icon,label,value}:{icon:any;label:string;value:string}){return <div className="h-[54px] border rounded px-3 flex items-center gap-3"><span className="text-[#8A8F99]">{icon}</span><span className="text-[13px] text-[#777] flex-1">{label}</span><span className="text-[12px]">{value}</span></div>}

function ReorderPage({plans,onBack,onSave,onFavorite,onCopy,onDelete}:{plans:ProductionPlan[];onBack:()=>void;onSave:(p:ProductionPlan[])=>void;onFavorite:(id:string)=>void;onCopy:(id:string)=>void;onDelete:(id:string)=>void}){const [items,setItems]=useState(plans);const [drag,setDrag]=useState<number|null>(null);const move=(from:number,to:number)=>{if(to<0||to>=items.length)return;const next=[...items];const [x]=next.splice(from,1);next.splice(to,0,x);setItems(next)};const grouped=Object.entries(items.reduce<Record<string,ProductionPlan[]>>((a,p)=>{(a[p.equipment.name] ||= []).push(p);return a},{}));return <div className="min-h-full bg-white"><div className="h-[54px] border-b flex items-center justify-between px-7"><div className="flex items-center gap-3"><button onClick={onBack}><ArrowLeft size={20}/></button><h1 className="text-[22px] font-medium">Re-order plans</h1><Info size={18} className="text-[#6B7280]"/><RefreshCw size={18} className="text-[#6B7280]"/></div><div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F99]"/><input placeholder="Search reports & insights" className="w-[350px] h-10 rounded-full border pl-10 text-[13px]"/></div></div><div className="px-7">{grouped.map(([machine,rows])=><section key={machine}><h2 className="text-[20px] text-[#293C7C] font-medium py-4">{machine}</h2><div className="grid grid-cols-[55px_50px_100px_1fr_1fr_130px_120px_100px] text-[11px] text-[#5E6470] border-b px-2 py-2"><span></span><span>Execution order</span><span>Plan</span><span>Part</span><span>Equipment</span><span>Planned qty</span><span>Start</span><span>Action</span></div>{rows.map((p,i)=>{const globalIndex=items.findIndex(x=>x.id===p.id);return <div key={p.id} draggable onDragStart={()=>setDrag(globalIndex)} onDragOver={e=>e.preventDefault()} onDrop={()=>{if(drag!==null)move(drag,globalIndex);setDrag(null)}} className="grid grid-cols-[55px_50px_100px_1fr_1fr_130px_120px_100px] items-center min-h-[60px] border-b px-2 text-[12px]"><button className="text-[#7A808A] cursor-grab"><GripVertical size={18}/></button><span>{i+1}</span><button className="text-[#2F477C] underline text-left">{p.planNumber}</button><span>{p.part.name}</span><span>{p.equipment.name}</span><span>{p.plannedQuantity.toLocaleString()}</span><span>{new Date(p.startDate).toLocaleDateString('en-US',{month:'short',day:'numeric'})}<br/>{new Date(p.startDate).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false})}</span><span className="flex gap-2"><button onClick={()=>onFavorite(p.id)} className="text-[#F2C64D]"><Star size={18}/></button><button onClick={()=>move(globalIndex,globalIndex-1)}><Pencil size={17}/></button><button onClick={()=>onCopy(p.id)}><Copy size={17}/></button><button onClick={()=>onDelete(p.id)} className="text-[#E7475A]"><Trash2 size={17}/></button></span></div>})}</section>)}</div></div>}

function EmptyPlans({onAdd}:{onAdd:()=>void}){return <div className="min-h-[520px] flex flex-col items-center justify-center"><div className="text-[#B8C0CC] text-7xl">◔</div><h3 className="mt-5 text-[20px]">No production plan for selected filters</h3><button onClick={onAdd} className="mt-5 h-9 px-4 rounded bg-[#273CBA] text-white text-[12px] flex items-center gap-2"><Plus size={15}/> Add new plan</button></div>}
function PlanDetail({plan,onClose}:{plan:ProductionPlan;onClose:()=>void}){return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-5"><div className="bg-white w-full max-w-xl rounded shadow-xl"><div className="flex justify-between items-center border-b px-5 py-4"><h2 className="text-[18px]">Plan {plan.planNumber}</h2><button onClick={onClose}><X size={18}/></button></div><div className="p-5 grid grid-cols-2 gap-4 text-[13px]"><div><span className="text-[#7B818B]">Part</span><p>{plan.part.name}</p></div><div><span className="text-[#7B818B]">Equipment</span><p>{plan.equipment.name}</p></div><div><span className="text-[#7B818B]">Planned qty</span><p>{plan.plannedQuantity.toLocaleString()}</p></div><div><span className="text-[#7B818B]">Start at</span><p>{new Date(plan.startDate).toLocaleString()}</p></div></div></div></div>}
function statusLabel(s:string){return s==='planned'?'Operational':s==='in-progress'?'New':s==='completed'?'Complete':'Aborted'}
function makeNewPlan(p:any,i:number):ProductionPlan{return {id:`new-${Date.now()}`,planNumber:`100-${7400+i}`,part:{id:p.part,name:p.part,code:p.part},color:{id:'na',name:'NA',code:'NA'},equipment:{id:p.machine,name:p.machine,code:p.machine,department:'Molding'},plannedQuantity:Number(p.qty)||0,producedQuantity:0,rejectedQuantity:0,startDate:p.start,endDate:p.start,status:'planned',priority:'medium',isFavorite:!!p.star,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:'Planner'}}
