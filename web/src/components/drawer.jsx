import React from "react";
import "./styles.css"; // You should have your own styles

const CustomDrawer = ({ visible, onClose, title, children }) => {
  if (!visible) return null;

  return (
    <div className="custom-drawer">
      <div className="drawer-header">
        <h2>{title}</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="drawer-content">{children}</div>
    </div>
  );
};

export default CustomDrawer;
