import React from 'react';


const ProgressBar = ({ progress, color = 'bg-pink-500', height = 'h-3', className = '' }) => {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full bg-gray-100 dark:bg-dark-bg rounded-full overflow-hidden border border-pink-50 dark:border-dark-border ${height} ${className}`}>
      <div
        className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
