import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const navItems = [
    { path: '/', label: 'Hub', icon: 'hub' },
    { path: '/matrix', label: 'Matrix', icon: 'biotech' },
    { path: '/cases', label: 'Cases', icon: 'folder_shared' },
    { path: '/intel', label: 'Intel', icon: 'menu_book' },
    { path: '/ops', label: 'Ops', icon: 'shield_person' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl border-t border-surface-container-high/60 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-space-xs">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 w-14 h-14 transition-all rounded-lg ${
                isActive
                  ? 'text-primary-container font-semibold bg-surface-container-high/40 shadow-[0_0_10px_rgba(0,210,255,0.2)]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-[10px]">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

