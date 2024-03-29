import './FilterSection.css';
import TaskPopup from './TaskPopup';
import React, { useState } from 'react';

const FilterSection = ({ onFilterChange }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'P0',
    status: '',
    startDate: null,
    endDate: null
  });
  const [filterCriteria, setFilterCriteria] = useState({ assignee: '', priority: '', startDate: null, endDate: null });

  const handleToggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleFilterChange = () => {
    onFilterChange(filterCriteria);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      assignee: taskData.assignee,
      priority: taskData.priority,
      status: taskData.status === 'Assign' ? 'Pending' : taskData.status,
      startDate: new Date(),
      endDate: null
    };
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const updatedTasks = { ...storedTasks, [newTask.status]: [...(storedTasks[newTask.status] || []), newTask] };
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    // Notify TaskCategorySection component about the change
    window.dispatchEvent(new Event('storage'));
  
    setTaskData({
      title: '',
      description: '',
      assignee: '',
      priority: 'P0',
      status: '',
      startDate: null,
      endDate: null
    });
    setShowTaskForm(false);
  };
  

  const handleFilterInputChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value,
    });
  };

  return (
    <div className="filter-section">
        <div className='Filter-content'>
            <span>Filter By:</span>
            <input type="text" placeholder="Assignee name" name="assignee" value={filterCriteria.assignee} onChange={handleFilterInputChange} />
            <select name="priority" value={filterCriteria.priority} onChange={handleFilterInputChange}>
                <option value="">Select Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
            </select>
            <input type="date" name="startDate" value={filterCriteria.startDate} onChange={handleFilterInputChange} />
              <button className='filter-button' onClick={handleFilterChange}>Apply Filters</button>
        </div>
        <div className='add-task-button'>
            <button className='new-task-button' onClick={handleToggleTaskForm}>Add New Task</button>
        </div>
      {showTaskForm && (
        <TaskPopup
          taskData={taskData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleToggleTaskForm={handleToggleTaskForm}
        />
      )}
    </div>
  );
};

export default FilterSection;
