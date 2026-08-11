import { ProductionPlan } from "../types/production";

export const mockProduction: ProductionPlan[] = [
  {
    id: "1",
    machine: "HT-28-HT-270",
    status: "running",
    plan: "100-6976",
    part: "Darvinks Vislita Flip Cap",
    color: "NA",
    equipment: "Darvinks Vislita Flip Cap",
    plannedQty: 300000,
    startAt: "Jul 6, 20:31",
  },

  {
    id: "2",
    machine: "HT-29-HT-270",
    status: "running",
    plan: "100-6982",
    part: "SFG Crystal Deep Bucket",
    color: "NA",
    equipment: "SFG Crystal Deep Bucket",
    plannedQty: 20000,
    startAt: "Jul 7, 17:07",
  },

  {
    id: "3",
    machine: "HT-30-HT-270",
    status: "running",
    plan: "100-6996",
    part: "Crystal Spoon",
    color: "NA",
    equipment: "Crystal Spoon",
    plannedQty: 300000,
    startAt: "Jul 8, 21:53",
  },

  {
    id: "4",
    machine: "HT-37-HXH-260",
    status: "stopped",
    plan: "100-6820",
    part: "Round Container Cover",
    color: "NA",
    equipment: "Round Container Cover",
    plannedQty: 300000,
    startAt: "Jun 19, 19:29",
  },

  {
    id: "5",
    machine: "LI-44-HXM-830",
    status: "running",
    plan: "100-7002",
    part: "King Basin",
    color: "NA",
    equipment: "King Basin",
    plannedQty: 10100,
    startAt: "Jul 10, 02:28",
  },

  {
  id: "6",
  machine: "LI-44-HXM-830",
  status: "running",
  plan: "100-6942",
  part: "King Basin",
  color: "NA",
  equipment: "King Basin",
  plannedQty: 10100,
  startAt: "Jul 2, 18:43",
},
];