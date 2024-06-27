import React, { useState } from 'react';
import './Select.css';

const Select = ({ options, defaultValue }) => {

  return (
    <select className="select">
      <option>{defaultValue}</option>
      {options.map(option => 
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      )}
    </select>
  );
};

export default Select;
