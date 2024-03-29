import React from 'react';

const EditTaskPopup = ({ taskData, handleInputChange, handleSubmit, handleToggleTaskForm }) => {
    // Add a new state to hold the new status
    const [newStatus, setNewStatus] = React.useState(taskData.status);
    // Update the handleInputChange to also set the new status
    const handleStatusChange = (event) => {
      setNewStatus(event.target.value);
      handleInputChange(event);
    };
  
    return (
      <div className="popup">
        <div className="popup-inner">
          <h2>Edit Task:</h2>
          <p>Title: <input type="text" name="title" value={taskData.title} onChange={handleInputChange} disabled/></p>
          <p>Description: <textarea name="description" value={taskData.description} onChange={handleInputChange} disabled/></p>
          <p>Assignee: <input type="text" name="assignee" value={taskData.assignee} onChange={handleInputChange} disabled/></p>
          <p>Priority: <select name="priority" value={taskData.priority} onChange={handleInputChange}>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select></p>

          <p>Status: <select name="newStatus" value={newStatus} onChange={handleStatusChange} disabled={taskData.status === 'Completed'}>
            <option value="">Task Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deployed">Deployed</option>
            <option value="Deferred">Deferred</option>
          </select></p>

          <button onClick={() => handleSubmit(newStatus)}>Save Changes</button>
          <button onClick={handleToggleTaskForm}>Cancel</button>
        </div>
      </div>
    );
  };
  
  export default EditTaskPopup;
  