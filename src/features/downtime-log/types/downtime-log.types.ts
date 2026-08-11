export interface DowntimeLog {
  id: string;

  shift: string;

  machine: string;

  downtimeStart: string;

  downtimeEnd: string;

  duration: string;

  reason: string;

  explanation: string;

  hasRemark: boolean;
}

export type DowntimeReason =
  | "Select Reason"
  | "Machine Breakdown"
  | "Material Shortage"
  | "Power Failure"
  | "Quality Issue"
  | "Tool Change"
  | "Preventive Maintenance"
  | "Planned Stop"
  | "Operator Break";

export const downtimeReasons: DowntimeReason[] = [
  "Select Reason",
  "Machine Breakdown",
  "Material Shortage",
  "Power Failure",
  "Quality Issue",
  "Tool Change",
  "Preventive Maintenance",
  "Planned Stop",
  "Operator Break",
];