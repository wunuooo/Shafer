import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { MapPin, ShieldAlert, Users, MessageCircle, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: MapPin, label: 'Map' },
    { path: '/guardians', icon: Users, label: 'Guardians' },
    { path: '/sos', icon: ShieldAlert, label: 'SOS', isPrimary: true },
    { path: '/community', icon: MessageCircle, label: 'Community' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-xl overflow-hidden relative">
      <main className="flex-1 overflow-hidden relative">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100 px-6 py-3 pb-6 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center transition-all duration-200 ${
                item.isPrimary ? '-mt-8' : ''
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-2 rounded-full transition-all duration-300 ${
                    item.isPrimary
                      ? 'bg-shafer-red text-white shadow-lg shadow-shafer-red/30 p-4 scale-110'
                      : isActive
                      ? 'text-shafer-red'
                      : 'text-shafer-grey hover:text-shafer-pink'
                  }`}
                >
                  <item.icon size={item.isPrimary ? 32 : 24} strokeWidth={item.isPrimary ? 2.5 : 2} />
                </div>
                {!item.isPrimary && (
                  <span
                    className={`text-[10px] font-medium mt-1 transition-colors ${
                      isActive ? 'text-shafer-red' : 'text-shafer-grey'
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
