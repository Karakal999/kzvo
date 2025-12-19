import { useState, useRef, useEffect, type ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';

interface MenuDropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface MenuDropdownProps {
  items: MenuDropdownItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  showIcons?: boolean;
  showCheckmark?: boolean;
}

const MenuDropdown = ({
  items,
  value,
  onChange,
  placeholder = 'Оберіть опцію',
  label,
  className = '',
  showIcons = true,
  showCheckmark = true,
}: MenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find(item => item.id === value);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleSelect = (itemId: string) => {
    onChange(itemId);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-3">
          {showIcons && selectedItem?.icon && (
            <span className="text-primary flex-shrink-0">
              {selectedItem.icon}
            </span>
          )}
          <span className="text-gray-900 font-medium">
            {selectedItem?.label || placeholder}
          </span>
        </div>
        <ChevronDown 
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn origin-top"
          style={{
            animation: 'menuOpen 0.2s ease-out',
          }}
        >
          <div className="py-2 max-h-80 overflow-y-auto">
            {items.map((item) => {
              const isSelected = item.id === value;
              const isDisabled = item.disabled;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => !isDisabled && handleSelect(item.id)}
                  disabled={isDisabled}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                    isDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {showIcons && item.icon && (
                      <span className={`flex-shrink-0 ${isSelected ? 'text-primary' : 'text-gray-400'}`}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                  </div>
                  {showCheckmark && isSelected && (
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes menuOpen {
          from {
            opacity: 0;
            transform: scaleY(0.95);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default MenuDropdown;

