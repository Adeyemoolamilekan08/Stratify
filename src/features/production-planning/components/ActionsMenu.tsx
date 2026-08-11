import { 
  PencilIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

export const ActionsMenu = () => {
  const actions = [
    { icon: PencilIcon, color: '#3048A8', label: 'Edit' },
    { icon: ExclamationTriangleIcon, color: '#F5A623', label: 'Warning' },
    { icon: InformationCircleIcon, color: '#29B6F6', label: 'Info' },
    { icon: ClockIcon, color: '#6B7280', label: 'History' },
  ];

  return (
    <div className="flex items-center gap-2">
      {actions.map((action, index) => (
        <button
          key={index}
          className="p-1 rounded hover:bg-[#F6F8FB] transition-colors"
          style={{ color: action.color }}
          title={action.label}
        >
          <action.icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};