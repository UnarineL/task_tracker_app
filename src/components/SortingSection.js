import React from 'react';
import './SortingSection.css';

const SortingSection = ({ handleSortChange }) => {
  const handleChange = (event) => {
      const { value } = event.target;
      handleSortChange(value); // Call handleSortChange with the selected value for sorting
  };

  return (
      <div className="sorting-section">
          <h4>Sort by:</h4>
          <select onChange={handleChange} defaultValue="">
              <option value="" disabled hidden>Priority</option>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
          </select>
      </div>
  );
};

export default SortingSection;
