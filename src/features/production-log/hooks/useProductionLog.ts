import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

export interface ProductionLogRow {
  id: string;
  plan: string;
  part: string;
  productionStart: string;
  productionEnd: string;
  produced: number;
  accepted: number;
  rejected: number;
  rework: number;
  scrap: number;
  machine: string;
  shift: string;
  date: string;
}

const machines = [
  'MI-04-FU-110', 'MI-03-FU-110', 'MI-05-HT-120', 'MI-25-OM-350', 'MI-24-OM-350',
  'MI-20-FU-280', 'LI-46-HT-1000', 'LI-47-HXM-1100', 'LI-42-HT-700', 'LI-44-HXM-830',
  'HT-27-HT-270', 'HT-28-HT-270', 'HT-29-HT-270', 'HT-30-HT-270', 'HT-31-HT-270',
  'HT-32-FERO-275', 'HT-34-FERO-200', 'HT-35-HXH-260', 'HT-37-HXH-260', 'HT-38-HXH-260',
];

const parts = [
  'SFG - Diamond Jug Lid',
  'SFG - Magic Food Flask Lid',
  'SFG - Crystal/Deep Bucket 2ltr Cover',
  'Sfg - 1000 Drum Bottom',
  'Sfg Amore Papilon Cabinet Junior - Middle Frame',
  'SFG - 50cc Cap',
];

const buildMockLogs = (): ProductionLogRow[] => {
  const rows: ProductionLogRow[] = [];
  for (let i = 0; i < 97; i += 1) {
    const machine = machines[i % machines.length];
    const shift = i % 3 === 0 ? 'Shift1' : 'Shift2';
    const produced = [2541, 1320, 2964, 322, 1623, 777, 348, 513][i % 8];
    const rejected = i % 7 === 0 ? 24 : i % 5 === 0 ? 12 : 0;
    const rework = i % 6 === 0 ? 3 : 0;
    const scrap = i % 4 === 0 ? 12.0 : 0;
    const startMinutes = (i * 37) % 1380;
    const endMinutes = Math.min(1439, startMinutes + 40 + (i % 5) * 12);
    rows.push({
      id: String(i + 1),
      plan: `100-${7270 + i}`,
      part: parts[i % parts.length],
      productionStart: dayjs().startOf('day').add(startMinutes, 'minute').format('HH:mm:ss'),
      productionEnd: dayjs().startOf('day').add(endMinutes, 'minute').format('HH:mm:ss'),
      produced,
      accepted: Math.max(0, produced - rejected),
      rejected,
      rework,
      scrap,
      machine,
      shift,
      date: '2026-08-03',
    });
  }
  return rows;
};

const mockLogs = buildMockLogs();

export interface ProductionLogFilters {
  date: string;
  shift: string;
  machine: string;
  order: 'newest' | 'oldest';
}

export const useProductionLog = (filters: ProductionLogFilters) => {
  const [data, setData] = useState<ProductionLogRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    const timer = window.setTimeout(() => {
      setData(mockLogs);
      setLoading(false);
    }, 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => load(), [load]);

  const filteredData = useMemo(() => {
    const next = data.filter((row) => {
      const dateMatch = !filters.date || row.date === filters.date;
      const shiftMatch = filters.shift === 'All Shifts' || row.shift === filters.shift;
      const machineMatch = filters.machine === 'All Machines' || row.machine === filters.machine;
      return dateMatch && shiftMatch && machineMatch;
    });
    next.sort((a, b) => filters.order === 'newest' ? b.id.localeCompare(a.id, undefined, { numeric: true }) : a.id.localeCompare(b.id, undefined, { numeric: true }));
    return next;
  }, [data, filters]);

  const groupedData = useMemo(() => {
    const grouped = new Map<string, ProductionLogRow[]>();
    for (const row of filteredData) {
      if (!grouped.has(row.machine)) grouped.set(row.machine, []);
      grouped.get(row.machine)!.push(row);
    }
    return Array.from(grouped.entries()).map(([machine, logs]) => ({ machine, logs }));
  }, [filteredData]);

  const refresh = useCallback(() => load(), [load]);

  return { data: filteredData, groupedData, loading, refresh, machines };
};
