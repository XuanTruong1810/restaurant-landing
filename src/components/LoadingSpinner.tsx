import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="loading-text">
          <span>B</span>
          <span>e</span>
          <span>l</span>
          <span>l</span>
          <span>a</span>
          <span> </span>
          <span>V</span>
          <span>i</span>
          <span>s</span>
          <span>t</span>
          <span>a</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
