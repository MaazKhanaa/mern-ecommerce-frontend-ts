import React, { PropsWithChildren } from 'react';
import '../styles/common.css';

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="main-card h-100">
      {children}
    </div>
  );
};
