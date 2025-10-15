import React, { useEffect, useState } from "react";
import "./ProgressBorder.css"; // Import CSS file for styling

const ProgressBorder = ({ percentage }) => {
  const [progress, setProgress] = useState(0); // Initial progress value (percentage)

  // Function to update progress
  const updateProgress = (newProgress) => {
    // Ensure progress value is within valid range (0 to 100)
    const validProgress = Math.min(Math.max(newProgress, 0), 100);
    setProgress(validProgress);
  };

  // Calculate the radius and circumference of the circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  // Calculate the strokeDashoffset to represent progress
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    updateProgress(percentage);
  }, [percentage]);

  return (
    <svg className="progress-circle" width={150} height={150}>
      <circle
        className="progress-circle-background"
        cx="75"
        cy="75"
        r={radius}
      />
      <circle
        className="progress-circle-progress"
        cx="75"
        cy="75"
        r={radius}
        style={{ strokeDasharray: circumference, strokeDashoffset }}
      />
    </svg>
  );
};

export default ProgressBorder;
