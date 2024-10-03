import { useState, useRef, useEffect, ReactNode } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

export interface DropdownOption {
  id: string; // Unique identifier for the option
  element: ReactNode; // JSX element for the option
}

interface DropdownProps {
  label: string;
  defaultOptionId: string; // Initial selected option ID
  options: DropdownOption[]; // Array of options with id and element
  onSelect: (optionId: string) => void; // Callback when an option is selected
  className?: string; // Optional class for wrapper styling
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  defaultOptionId,
  options,
  onSelect,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string>(defaultOptionId); // Track selected option by ID
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptionId(optionId); // Update the selected option's ID
    onSelect(optionId); // Trigger parent callback
    setIsOpen(false); // Close dropdown
  };

  const selectedOption = options.find(option => option.id === selectedOptionId); // Find the selected option based on ID

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="w-full bg-primary-blue-100 dark:bg-neutral-950 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-primary-purple-105 focus:border-primary-purple-105"
        onClick={toggleDropdown}
      >
        {selectedOption?.element || label} {/* Show selected element or label */}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          {isOpen ? <HiChevronUp className="text-neutral-800 dark:text-neutral-200" /> : <HiChevronDown className="text-neutral-800 dark:text-neutral-200" />}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-primary-blue-100 dark:bg-neutral-950 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
          {options.map((option) => (
            <li
              key={option.id}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-purple-105 hover:text-white text-gray-900"
              onClick={() => handleOptionSelect(option.id)}
            >
              <span className="block truncate">{option.element}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
