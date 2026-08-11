import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ShiftCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const ShiftCalendar = ({ selectedDate, onDateChange }: ShiftCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    onDateChange(new Date(currentYear, currentMonth, day));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
  };

  const isSelected = (day: number) => {
    return selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear;
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-medium text-[#1F2937]">
          {months[currentMonth]} {currentYear}
        </h3>
        <div className="flex gap-1">
          <button 
            onClick={handlePrevMonth}
            className="p-1 rounded hover:bg-[#F6F8FB] transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4 text-[#6B7280]" />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-1 rounded hover:bg-[#F6F8FB] transition-colors"
          >
            <ChevronRightIcon className="w-4 h-4 text-[#6B7280]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-[10px] text-[#6B7280] font-medium py-1">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="text-center py-1" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`text-center py-1 text-[12px] rounded-full transition-colors ${
                isSelected(day) ? 'bg-[#3048A8] text-white' : ''
              } ${
                isToday(day) && !isSelected(day) ? 'border border-[#3048A8] text-[#3048A8]' : ''
              } ${
                !isSelected(day) && !isToday(day) ? 'hover:bg-[#F6F8FB] text-[#1F2937]' : ''
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};