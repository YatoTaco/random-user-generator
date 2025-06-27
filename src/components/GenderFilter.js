import React from 'react';

function GenderFilter({ gender, onFilterChange }) {
  return (
    <select value={gender} onChange={(e) => onFilterChange(e.target.value)}>
      <option value="">Все</option>
      <option value="male">Только мужчины</option>
      <option value="female">Только женщины</option>
    </select>
  );
}

export default GenderFilter;