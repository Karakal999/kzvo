import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: 'default' | 'primary' | 'bordered';
}

const Accordion = ({ title, children, defaultOpen = false, variant = 'default' }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary/5 border-primary/20 hover:bg-primary/10';
      case 'bordered':
        return 'bg-white border-2 border-gray-200 hover:border-primary/30';
      default:
        return 'bg-gray-50 border border-gray-200 hover:bg-gray-100';
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden transition-all ${getVariantStyles()}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between transition-colors"
      >
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 pb-6 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

