import React from 'react';
import '../styles/common.css';
import { MainHeadingProps } from 'src/interfaces';

export const MainHeading: React.FC<MainHeadingProps> = React.memo(({ text, className }) => {
    return (
        <h1 className={`main-heading mb-3 ${className}`}>
            {text}
        </h1>
    );
});