import { NavLink, useLocation } from 'react-router-dom';
import { PageLayout } from '@components/layout/PageLayout';

const tabs = [
  { label: 'Profile', path: '/profile' },
  { label: 'Preferences', path: '/profile/preferences' },
  { label: 'Password', path: '/profile/password' },
];

export default function ProfileSettings() {
  const location = useLocation();
  const tab = location.pathname.split('/').pop() || 'profile';

  return (
    <PageLayout title="My Profile Settings">
      <div className="flex min-h-[520px] bg-white">
        <aside className="w-[160px] shrink-0 border-r border-[#E5E7EB] px-3 py-4">
          <div className="mb-3 text-[8px] font-semibold uppercase tracking-wide text-[#9CA3AF]">General</div>
          <div className="space-y-1">
            {tabs.slice(0, 2).map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `block rounded-[3px] px-3 py-2 text-[10px] ${isActive ? 'bg-[#ECEAF5] text-[#33479A]' : 'text-[#444] hover:bg-[#F5F6F8]'}`}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="mb-2 mt-5 text-[8px] font-semibold uppercase tracking-wide text-[#9CA3AF]">Security</div>
          <NavLink to="/profile/password" className={({ isActive }) => `block rounded-[3px] px-3 py-2 text-[10px] ${isActive ? 'bg-[#ECEAF5] text-[#33479A]' : 'text-[#444] hover:bg-[#F5F6F8]'}`}>
            Password
          </NavLink>
        </aside>

        <div className="flex-1 px-6 py-5">
          {tab === 'profile' && <ProfileTab />}
          {tab === 'preferences' && <PreferencesTab />}
          {tab === 'password' && <PasswordTab />}
        </div>
      </div>
    </PageLayout>
  );
}

function ProfileTab() {
  return (
    <div>
      <h2 className="mb-4 text-[16px] font-medium text-[#333]">Profile</h2>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#33479A] text-lg text-white">☺</div>
        <div><div className="text-[18px] text-[#222]">Isaac Ayomide</div><div className="text-[10px] text-[#555]">PPCL Nigeria, Ota</div></div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input className="h-9 rounded-[2px] bg-[#F0F0F0] px-3 text-[10px]" defaultValue="Isaac" aria-label="First name" />
        <input className="h-9 rounded-[2px] bg-[#F0F0F0] px-3 text-[10px]" defaultValue="Ayomide" aria-label="Last name" />
        <input className="col-span-2 h-9 rounded-[2px] bg-[#F0F0F0] px-3 text-[10px]" defaultValue="ppc@papilong.com" aria-label="Email" />
        <input className="col-span-2 h-9 rounded-[2px] bg-[#F0F0F0] px-3 text-[10px]" placeholder="+234 Phone" aria-label="Phone" />
      </div>
      <button className="mt-5 float-right rounded-[3px] bg-[#33479A] px-3 py-2 text-[10px] text-white">Update profile</button>
    </div>
  );
}

function PreferencesTab() {
  return (
    <div>
      <h2 className="mb-4 text-[16px] font-medium text-[#333]">Preferences</h2>
      <div className="mb-4 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#33479A] text-lg text-white">☺</div><div><div className="text-[18px] text-[#222]">Isaac Ayomide</div><div className="text-[10px] text-[#555]">PPCL Nigeria, Ota</div></div></div>
      <label className="block text-[9px] text-[#666]">Language<select className="mt-1 h-9 w-full rounded-[2px] bg-[#F0F0F0] px-2 text-[10px]"><option>English</option><option>Arabic</option></select></label>
      <div className="mt-5 text-[12px] text-[#333]">Display settings</div>
      <label className="mt-3 flex items-center gap-2 text-[10px] text-[#555]"><input type="checkbox" /> Dark mode</label>
      <div className="mt-5 text-[12px] text-[#333]">Avatar display</div>
      <div className="mt-2 flex gap-3"><button className="h-6 w-6 rounded-full bg-[#33479A] ring-2 ring-[#33479A] ring-offset-1" /><button className="h-6 w-6 rounded-full bg-[#25D6A0]" /><button className="h-6 w-6 rounded-full bg-[#26A6D1]" /></div>
    </div>
  );
}

function PasswordTab() {
  return <div><h2 className="mb-4 text-[16px] font-medium text-[#333]">Password</h2><div className="space-y-2 max-w-[420px]"><input type="password" placeholder="Current password" className="h-9 w-full rounded-[2px] border border-[#E1E4E8] px-3 text-[10px]" /><input type="password" placeholder="New password" className="h-9 w-full rounded-[2px] border border-[#E1E4E8] px-3 text-[10px]" /><input type="password" placeholder="Confirm password" className="h-9 w-full rounded-[2px] border border-[#E1E4E8] px-3 text-[10px]" /><button className="rounded-[3px] bg-[#33479A] px-3 py-2 text-[10px] text-white">Update password</button></div></div>;
}
