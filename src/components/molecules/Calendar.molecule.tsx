import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, getHours, setHours, setMinutes } from 'date-fns';
import { HiCalendar } from 'react-icons/hi2';
import Typography from '../atoms/Typography.atom';

interface CalendarComponentProps {
  calendarId: string;
  selectedDate: Date | null;
  onDateTimeChange: (date: Date | null) => void;
  showTime?: boolean; // Add this prop to make the time field optional
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  calendarId,
  selectedDate,
  onDateTimeChange,
  showTime = true,
}) => {
  const formattedDate = selectedDate ? format(selectedDate, 'EEE, MMM d, yyyy') : 'Select a date';

  const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 0 to 55 in 5-minute increments
  const amPmOptions = ['am', 'pm'];
  const now = new Date();

  const setAmPm = (date: Date, period: 'am' | 'pm'): Date => {
    let hours = getHours(date); // Get the current hour in 24-hour format
  
    // If the selected period is AM and the current time is PM, subtract 12 to convert
    if (period === 'am' && hours >= 12) {
      hours -= 12;
    }
  
    // If the selected period is PM and the current time is AM, add 12 to convert
    if (period === 'pm' && hours < 12) {
      hours += 12;
    }
  
    // Return the updated date with the new hour (AM/PM adjusted)
    return setHours(date, hours);
  };

  return (
    <div className="flex flex-row items-center bg-neutral-200 dark:bg-neutral-800 shadow-md rounded-xl relative p-2 gap-2">
      {/* Date Picker Button */}
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={() => document.getElementById(calendarId)?.click()}
          className='flex flex-row items-center justify-center bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border rounded-lg p-2 text-xs gap-2'
        >
          <HiCalendar className="w-4 h-4" />
          <Typography variant='text-xs'>{formattedDate}</Typography>
        </button>
        {/* Hidden DatePicker for Pop-up */}
        <DatePicker
          id={calendarId}
          selected={selectedDate}
          onChange={onDateTimeChange}
          className="absolute z-50 opacity-0 pointer-events-none"
          popperClassName="react-datepicker-popper"
          calendarClassName="bg-gradient-to-br from-primary-purple-101 via-primary-blue-200 to-primary-purple-103 dark:from-primary-purple-109 dark:via-primary-blue-800 dark:to-primary-purple-107"
          dayClassName={() => 'hover:!bg-neutral-500 !text-neutral-800 dark:!text-neutral-200'}
        />
      </div>
      {/* Time Picker - Optional */}
      {showTime && (
        <div className="flex flex-row items-center ">
          {/* Hours Dropdown */}
          <select
            value={Number(format(selectedDate || now, 'h'))} // h because am pm 12 hour
            onChange={(e) => selectedDate && onDateTimeChange(setHours(selectedDate, Number(e.target.value)))}
            className="bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-y border-l rounded-l-lg p-2 text-[11px] appearance-none"
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          <div className='bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-y h-[34.5px] flex items-center'>
            <Typography variant='text-xs' className='pb-1'>:</Typography>
          </div>
          {/* Minutes Dropdown */}
          <select
            value={Number(format(selectedDate || now, 'mm'))}
            onChange={(e) => selectedDate && onDateTimeChange(setMinutes(selectedDate, Number(e.target.value)))}
            className="bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-y p-2 text-[11px] appearance-none"
          >
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          {/* AM/PM Dropdown */}
          <select
            value={format(selectedDate || now, 'aaa')}
            onChange={(e) => selectedDate && onDateTimeChange(setAmPm(selectedDate, e.target.value as "am" | "pm"))}
            className="bg-neutral-300 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-y border-r rounded-r-lg p-2 text-[11px] appearance-none"
          >
            {amPmOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
