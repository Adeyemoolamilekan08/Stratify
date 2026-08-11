export type MachineStatus = "running" | "stopped";

export interface ProductionPlan {
  id: string;
  machine: string;
  status: MachineStatus;

  plan: string;

  part: string;

  color: string;

  equipment: string;

  plannedQty: number;

  startAt: string;
}