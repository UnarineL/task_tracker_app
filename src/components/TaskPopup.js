import './TaskPopup.css';
import React from 'react';


const TaskPopup = ({ taskData, handleInputChange, handleSubmit, handleToggleTaskForm }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>New Task Details:</h2>
        <p>Title: <input type="text" name="title" value={taskData.title} onChange={handleInputChange} /></p>
        <p>Description: <textarea name="description" value={taskData.description} onChange={handleInputChange} /></p>
        <p>Assignee: <input type="text" name="assignee" value={taskData.assignee} onChange={handleInputChange} /></p>
        <p>Priority: <select name="priority" value={taskData.priority} onChange={handleInputChange}>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select></p>
        <p>Status: <select name="status" value={taskData.status} onChange={handleInputChange}>
          <option value="">Task Status</option>
          <option value="Assign">Assign</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Deployed">Deployed</option>
          <option value="Deferred">Deferred</option>
        </select></p>
        <button onClick={handleSubmit}>Add Task</button>
        <button onClick={handleToggleTaskForm}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskPopup;
