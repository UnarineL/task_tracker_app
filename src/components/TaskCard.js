import React from 'react';

const TaskCard = ({ task }) => {
  const { title, description, assignee, priority, status } = task;

  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p>Description: {description}</p>
      <p>Assignee: {assignee}</p>
      <p>Priority: {priority}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default TaskCard;
