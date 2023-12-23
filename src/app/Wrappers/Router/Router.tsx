import React, { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

const Router: FC<{ children: ReactNode }> = ({ children }) => (
    <BrowserRouter basename="/">{children}</BrowserRouter>
);

export { Router };
