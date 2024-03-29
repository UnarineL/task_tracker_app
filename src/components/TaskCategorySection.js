import React, { useEffect, useState } from 'react';
import EditTaskPopup from './EditTaskPopup';
import './TaskCategorySection.css'; // Import CSS file

const TaskCategorySection = ({ sortTasksHandler }) => {
  const categories = ['Pending', 'In Progress', 'Completed', 'Deployed', 'Deferred'];
  const [tasks, setTasks] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Track the selected task for edit or delete
  const [sortedTasks, setSortedTasks] = useState({});
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateTasks = () => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
      setTasks(storedTasks);
      setSortedTasks(storedTasks); // Initialize sortedTasks with storedTasks
    };
  
    updateTasks();
    window.addEventListener('storage', updateTasks);
    return () => {
      window.removeEventListener('storage', updateTasks);
    };
  }, []);
  

  const handleOpenEditPopup = (task) => {
    setTaskToEdit(task);
    setShowEditPopup(true);
    setSelectedTaskId(null); // Close the popup
  };

  const handleToggleTaskForm = () => {
    setShowEditPopup(false);
  };

  const handleTaskOptionToggle = (taskId, event) => {
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();
    setPopupPosition({ x: rect.left, y: rect.bottom });
    setSelectedTaskId((prevId) => (prevId === taskId ? null : taskId)); // Toggle the selected task
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = { ...tasks };
    const taskToDelete = Object.values(updatedTasks).flat().find((task) => task.id === taskId);
    if (taskToDelete) {
      const category = taskToDelete.status;
      updatedTasks[category] = updatedTasks[category].filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setSortedTasks(updatedTasks); // Update sortedTasks after deletion
      setSelectedTaskId(null); // Close the popup
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskToEdit((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const updatedTasks = { ...storedTasks };
    const oldStatus = taskToEdit.status;
    const newStatus = taskToEdit.newStatus;
    const newPriority = taskToEdit.priority; // get the new priority
  
    if (updatedTasks[oldStatus]) {
      updatedTasks[oldStatus] = updatedTasks[oldStatus].filter((task) => task.id !== taskToEdit.id);
    }
  
    updatedTasks[newStatus] = updatedTasks[newStatus] || [];
    updatedTasks[newStatus].push(taskToEdit);
    taskToEdit.status = newStatus;
    taskToEdit.priority = newPriority;
  
    const currentTask = updatedTasks[newStatus].find(t => t.id === taskToEdit.id);
    if (currentTask) {
      currentTask.priority = taskToEdit.priority;
    }
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setSortedTasks(updatedTasks);
    setShowEditPopup(false);
    setSelectedTaskId(null);
  };
  


 
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Pending':
        return 'red';
      case 'In Progress':
        return 'orange';
      case 'Completed':
        return 'yellow';
      case 'Deployed':
        return 'green';
      case 'Deferred':
        return 'blue';
      default:
        return 'indigo';
    }
  };
  
  return (
    <div className="task-category-container">
      {/* Render task table */}
      {categories.map((category) => (
        <div key={category} className="task-category-header">
          <div className='task-header-name' style={{ background: getCategoryColor(category)}}>
            <h3>{category}</h3>
          </div>
          {sortedTasks[category]?.map((task) => (
            <div key={task.id} className="task-card">
              {/* Display toggle button */}
              <div className="task-details">
                <div task-header>
                  <p className='task-title'>{task.title}</p>
                  <p className='task-priority'>{task.priority}</p>
                </div>
                <div className='task-body'>
                  <br></br>
                  <div>
                    <p className='task-description'>{task.description}</p>
                    <p className='task-assignee'>@{task.assignee}</p>
                  </div>
                  <div className="task-options">
                    <button onClick={(event) => handleTaskOptionToggle(task.id, event)}>⋮</button>
                    {selectedTaskId === task.id && (
                      <div className="popup" style={{ top: popupPosition.y, left: popupPosition.x }}>
                        <h2>Edit Task</h2>
                        <button onClick={() => handleOpenEditPopup(task)}>Edit</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                  <div className='task-status-border' >
                    <p className='task-status'>{task.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* Render edit popup */}
      {showEditPopup && (
        <EditTaskPopup
          taskData={taskToEdit}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleToggleTaskForm={handleToggleTaskForm}
        />
      )}
    </div>
  );
};

export default TaskCategorySection;
