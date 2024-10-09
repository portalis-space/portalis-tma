import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, setHours, setMinutes } from 'date-fns';
import { HiCalendar } from 'react-icons/hi2';
import Typography from '../atoms/Typography.atom';

interface CalendarComponentProps {
  calendarId: string;
  initialDate?: Date;
  onDateTimeChange?: (date: Date) => void;
  showTime?: boolean; // Add this prop to make the time field optional
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  calendarId,
  initialDate = new Date(),
  onDateTimeChange,
  showTime = true,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [amPm, setAmPm] = useState<'AM' | 'PM'>('AM');

  const handleDateChange = (date: Date | null) => {
    if (date) {
      let updatedDate = date;
      if (showTime) {
        const [hours24, minutes] = getTime24Format(selectedHour, selectedMinute, amPm);
        updatedDate = setMinutes(setHours(date, hours24), minutes);
      }
      setSelectedDate(updatedDate);
      if (onDateTimeChange) {
        onDateTimeChange(updatedDate);
      }
    }
  };

  const getTime24Format = (hour: number, minute: number, amPm: 'AM' | 'PM'): [number, number] => {
    let adjustedHour = hour;
    if (amPm === 'PM' && hour < 12) adjustedHour += 12;
    if (amPm === 'AM' && hour === 12) adjustedHour = 0;
    return [adjustedHour, minute];
  };

  const handleTimeChange = () => {
    if (selectedDate) {
      const [hours24, minutes] = getTime24Format(selectedHour, selectedMinute, amPm);
      const updatedDate = setMinutes(setHours(selectedDate, hours24), minutes);
      setSelectedDate(updatedDate);
      if (onDateTimeChange) {
        onDateTimeChange(updatedDate);
      }
    }
  };

  const formattedDate = selectedDate ? format(selectedDate, 'EEE, MMM d, yyyy') : 'Select a date';

  const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 0 to 55 in 5-minute increments
  const amPmOptions = ['AM', 'PM'];

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
          onChange={handleDateChange}
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
            value={selectedHour}
            onChange={(e) => {
              setSelectedHour(Number(e.target.value));
              handleTimeChange();
            }}
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
            value={selectedMinute}
            onChange={(e) => {
              setSelectedMinute(Number(e.target.value));
              handleTimeChange();
            }}
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
            value={amPm}
            onChange={(e) => {
              setAmPm(e.target.value as 'AM' | 'PM');
              handleTimeChange();
            }}
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
