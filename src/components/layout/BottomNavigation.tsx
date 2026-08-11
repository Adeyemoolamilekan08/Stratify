import { HomeIcon, ChartBarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@components/ui/Tooltip/Tooltip';

const items = [
  { label: 'Home', path: '/dashboard', icon: HomeIcon, tooltip: 'Go to dashboard' },
  { label: 'Insights', path: '/reports/production', icon: ChartBarIcon, tooltip: 'Open reports and insights' },
  { label: 'Account', path: '/profile', icon: UserCircleIcon, tooltip: 'Open your account' },
];

export const BottomNavigation = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-[70] border-t border-[#DDE3EC] bg-white/95 backdrop-blur-md shadow-[0_-4px_18px_rgba(15,23,42,0.08)] lg:hidden">
    <div className="mx-auto flex h-[58px] max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
      {items.map(({ label, path, icon: Icon, tooltip }) => (
        <Tooltip key={path} content={tooltip} side="top">
          <NavLink
            to={path}
            className={({ isActive }) => `flex min-w-[78px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${isActive ? 'text-[#F97316]' : 'text-[#64748B] hover:text-[#F97316]'}`}
          >
            {({ isActive }) => (<>
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2]' : 'stroke-[1.6]'}`} />
              <span>{label}</span>
            </>)}
          </NavLink>
        </Tooltip>
      ))}
    </div>
  </nav>
);
