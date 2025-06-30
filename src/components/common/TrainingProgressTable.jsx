import React, { useState, useMemo } from 'react';
import Dropdown from './dropdown';

const CompletedLessonsTable = ({ lessons = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  // Get unique categories and units from lessons
  const categoryOptions = useMemo(() => {
    const categories = [...new Set(lessons.map(lesson => lesson.category || 'uncategorized'))];
    return [
      { label: 'All Categories', value: 'all' },
      ...categories.map(cat => ({ label: cat.charAt(0).toUpperCase() + cat.slice(1), value: cat }))
    ];
  }, [lessons]);

  const unitOptions = useMemo(() => {
    const units = [...new Set(lessons.map(lesson => lesson.unit || 0))];
    return [
      { label: 'All Units', value: 'all' },
      ...units.map(unit => ({ label: `Unit ${unit}`, value: unit }))
    ];
  }, [lessons]);

  const dateOptions = [
    { label: 'All Time', value: 'all' },
    { label: 'Last 7 Days', value: '7days' },
    { label: 'Last 30 Days', value: '30days' },
  ];

  // Filter lessons based on selected options
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const categoryMatch = selectedCategory === 'all' || lesson.category === selectedCategory;
      const unitMatch = selectedUnit === 'all' || lesson.unit === parseInt(selectedUnit);
      
      let dateMatch = true;
      if (selectedDate !== 'all' && lesson.completionDate !== 'Not completed') {
        const lessonDate = new Date(lesson.completionDate);
        const now = new Date();
        const daysAgo = selectedDate === '7days' ? 7 : 30;
        dateMatch = (now - lessonDate) <= (daysAgo * 24 * 60 * 60 * 1000);
      }

      return categoryMatch && unitMatch && dateMatch;
    });
  }, [lessons, selectedCategory, selectedUnit, selectedDate]);

  return (
    <div className="w-full text-left">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-6 pb-2">
        <h2 className="text-lg font-semibold text-black mb-2 md:mb-0">Completed Lessons</h2>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <Dropdown 
            label="Category" 
            options={categoryOptions} 
            selectedOption={categoryOptions.find(opt => opt.value === selectedCategory)?.label} 
            onSelect={(option) => setSelectedCategory(option.value)} 
            className="min-w-[140px] text-sm" 
          />
          <Dropdown 
            label="Unit" 
            options={unitOptions} 
            selectedOption={unitOptions.find(opt => opt.value === selectedUnit)?.label} 
            onSelect={(option) => setSelectedUnit(option.value)} 
            className="min-w-[120px] text-sm" 
          />
          <Dropdown 
            label="Date Range" 
            options={dateOptions} 
            selectedOption={dateOptions.find(opt => opt.value === selectedDate)?.label} 
            onSelect={(option) => setSelectedDate(option.value)} 
            className="min-w-[120px] text-sm" 
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="bg-[#FFA944] text-black text-sm font-bold px-6 py-4 text-left border-t border-l border-r border-[#FFA944] rounded-tl-lg">Lesson Title</th>
              <th className="bg-[#FFA944] text-black text-sm font-bold px-6 py-4 text-left border-t border-r border-[#FFA944]">Completion Date</th>
              <th className="bg-[#FFA944] text-black text-sm font-bold px-6 py-4 text-left border-t border-r border-[#FFA944]">Score</th>
              <th className="bg-[#FFA944] text-black text-sm font-bold px-6 py-4 text-left border-t border-r border-[#FFA944] rounded-tr-lg">Attempts</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson, idx) => (
              <tr key={idx} className="border-b border-gray-200 last:border-b-0">
                <td className="px-6 py-4 text-base text-black whitespace-nowrap">{lesson.title}</td>
                <td className="px-6 py-4 text-base text-gray-700 whitespace-nowrap">
                  {lesson.completionDate ? `Completed ${lesson.completionDate}` : 'Not completed'}
                </td>
                <td className="px-6 py-4 text-base font-bold whitespace-nowrap" style={{ color: parseInt(lesson.score) >= 90 ? '#C1121F' : '#E65100' }}>{lesson.score}</td>
                <td className="px-6 py-4 text-base text-gray-700 whitespace-nowrap">{lesson.attempts} {lesson.attempts === 1 ? 'Attempt' : 'Attempts'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedLessonsTable;