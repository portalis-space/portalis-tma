import React from "react";
import Typography from "../atoms/Typography.atom";

export interface CheckboxItem {
  id: string;
  label: string;
}

interface MultipleCheckboxProps {
  items: CheckboxItem[];
  selectedItems?: string[]; // Controlled value
  onChange: (checkedItems?: string[]) => void;
}

export const MultipleCheckbox: React.FC<MultipleCheckboxProps> = ({ items, selectedItems, onChange }) => {
  const handleCheckboxChange = (id: string) => {
    const updatedCheckedItems = selectedItems?.includes(id)
      ? selectedItems?.filter(item => item !== id)
      : !!selectedItems ? [...selectedItems, id] : [id];

    onChange(updatedCheckedItems); // Notify the parent of the change
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map(item => (
        <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            id={item.id}
            value={item.id}
            checked={!!selectedItems && selectedItems.includes(item.id)} // Controlled checked state
            onChange={() => handleCheckboxChange(item.id)}
            className="hidden"
          />
          <div
            className={`w-6 h-6 rounded border-2 ${
              !!selectedItems && selectedItems.includes(item.id)
                ? "bg-primary-blue-600 border-primary-blue-600"
                : "bg-transparent border-primary-blue-600"
            } flex items-center justify-center`}
          >
            {!!selectedItems && selectedItems.includes(item.id) && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <Typography variant="text-xs">{item.label}</Typography>
        </label>
      ))}
    </div>
  );
};