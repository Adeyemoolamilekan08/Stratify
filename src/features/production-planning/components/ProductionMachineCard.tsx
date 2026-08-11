import { MachineStatus } from './MachineStatus';
import { PartInfo } from './PartInfo';
import { QuantityMetrics } from './QuantityMetrics';
import { ActionsMenu } from './ActionsMenu';
import { motion } from 'framer-motion';

interface ProductionMachineCardProps {
  data: {
    id: string;
    machineName: string;
    status: 'running' | 'stopped' | 'idle' | 'maintenance' | 'setup';
    part: string;
    partDescription: string;
    cavity: number;
    cycleTime: number;
    equipment: string;
    mould: string;
    plannedQty: number;
    actualQty: number;
    efficiency: number;
  };
  onSelect?: () => void;
}

const ProductionMachineCard = ({ data, onSelect }: ProductionMachineCardProps) => {
  return (
    <motion.div 
      className="bg-white border border-[#ECECEC] hover:border-[#3048A8] transition-colors p-4 cursor-pointer"
      onClick={onSelect}
      whileHover={{ backgroundColor: '#F8FAFF' }}
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6 flex-1">
          {/* Machine Name & Status */}
          <div className="min-w-[150px]">
            <div className="text-[18px] font-medium text-[#3048A8]">
              {data.machineName}
            </div>
            <MachineStatus status={data.status} />
          </div>

          {/* Part Info */}
          <div className="flex-1">
            <PartInfo 
              part={data.part}
              description={data.partDescription}
              cavity={data.cavity}
              cycleTime={data.cycleTime}
              equipment={data.equipment}
              mould={data.mould}
            />
          </div>

          {/* Quantity Metrics */}
          <div className="min-w-[180px]">
            <QuantityMetrics 
              planned={data.plannedQty}
              actual={data.actualQty}
              efficiency={data.efficiency}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="ml-4">
          <ActionsMenu />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductionMachineCard;