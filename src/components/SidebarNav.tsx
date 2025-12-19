import type { ReactNode } from 'react';
import MenuDropdown from './MenuDropdown';

interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface SidebarNavProps {
  items: NavItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}

const SidebarNav = ({ items, activeId, onItemClick }: SidebarNavProps) => {
  // Convert items to MenuDropdown format
  const dropdownItems = items.map(item => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
  }));

  return (
    <div>
      {/* Mobile Dropdown Navigation */}
      <div className="lg:hidden mb-6">
        <MenuDropdown
          items={dropdownItems}
          value={activeId}
          onChange={onItemClick}
          label="Оберіть розділ"
          showIcons={true}
          showCheckmark={true}
        />
      </div>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:block sticky top-24">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-bold text-primary mb-4 px-2">Розділи</h3>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 ${
                    activeId === item.id
                      ? 'bg-primary text-white font-semibold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  {item.icon && (
                    <span className={activeId === item.id ? 'text-accent' : 'text-gray-400'}>
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Info */}
        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-bold text-primary mb-2">Контакти</h4>
          <p className="text-sm text-gray-700 mb-2">
            📞 +380 (44) 123-45-67
          </p>
          <p className="text-sm text-gray-700">
            ✉️ info@academy.ua
          </p>
        </div>
      </nav>
    </div>
  );
};

export default SidebarNav;

