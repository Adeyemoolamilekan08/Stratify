import ScheduleRow from "./ScheduleRow";
import { ProductionPlan } from "../types/production";

interface Props {
  plans: ProductionPlan[];
}

export default function PlanningTimeline({
  plans,
}: Props) {
  return (
    <div className="bg-white">

      {plans.map((plan) => (

        <ScheduleRow
          key={plan.id}
          plan={plan}
        />

      ))}

    </div>
  );
}