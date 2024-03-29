import './ParentComponent.css'
import React, { useState, useEffect } from 'react';
import TaskCategorySection from './TaskCategorySection';
import FilterSection from './FilterSection';
import SortingSection from './SortingSection';

const sortTasks = (tasks, sortOption) => {
  const sortedTasks = {};
  for (const category in tasks) {
    sortedTasks[category] = [...tasks[category]].sort((a, b) => {
      if (sortOption === 'P0') {
        return a.priority === 'P0' ? -1 : 1;
      } else if (sortOption === 'P1') {
        if (a.priority === 'P0' && b.priority !== 'P0') return -1;
        if (a.priority === 'P1' && b.priority === 'P2') return -1;
        return a.priority === 'P1' && b.priority !== 'P1' ? -1 : 1;
      } else if (sortOption === 'P2') {
        return a.priority === 'P2' ? -1 : 1;
      }
      return 0;
    });
  }
  return sortedTasks;
};

const ParentComponent = () => {
  const [tasks, setTasks] = useState({});
  const [filterCriteria, setFilterCriteria] = useState({ assignee: '', priority: '', startDate: null, endDate: null });
  const [sortOption, setSortOption] = useState('');
  const [filteredAndSortedTasks, setFilteredAndSortedTasks] = useState({});

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    const filteredTasks = filterTasks(tasks, filterCriteria);
    const sortedTasks = sortTasks(filteredTasks, sortOption);
    setFilteredAndSortedTasks(sortedTasks);
  }, [tasks, filterCriteria, sortOption]);

  const handleFilterChange = (newFilterCriteria) => {
    setFilterCriteria(newFilterCriteria);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  return (
    <div className='ParentComponent'>
      <FilterSection 
        onFilterChange={handleFilterChange} 
      />
      <SortingSection handleSortChange={handleSortChange} />
      <TaskCategorySection tasks={filteredAndSortedTasks} />
    </div>
  );
};

// Function to filter tasks based on criteria
function filterTasks(tasks, filterCriteria) {
  const { assignee, priority, startDate, endDate } = filterCriteria;
  let filteredTasks = { ...tasks };

  if (assignee) {
    filteredTasks = filterByAssignee(filteredTasks, assignee);
  }

  if (priority) {
    filteredTasks = filterByPriority(filteredTasks, priority);
  }

  if (startDate && endDate) {
    filteredTasks = filterByDateRange(filteredTasks, startDate, endDate);
  }

  return filteredTasks;
}

// Functions to filter tasks by assignee, priority, and date range
const filterByAssignee = (tasks, assignee) => {
  const filteredTasks = {};
  for (const category in tasks) {
    filteredTasks[category] = tasks[category].filter(task => task.assignee.toLowerCase().includes(assignee.toLowerCase()));
  }
  return filteredTasks;
};

const filterByPriority = (tasks, priority) => {
  const filteredTasks = {};
  for (const category in tasks) {
    filteredTasks[category] = tasks[category].filter(task => task.priority === priority);
  }
  return filteredTasks;
};

const filterByDateRange = (tasks, startDate, endDate) => {
  const filteredTasks = {};
  for (const category in tasks) {
    filteredTasks[category] = tasks[category].filter(task => {
      const taskDate = new Date(task.date); // Assuming task date is stored as a property named 'date'
      return taskDate >= startDate && taskDate <= endDate;
    });
  }
  return filteredTasks;
};

export default ParentComponent;
