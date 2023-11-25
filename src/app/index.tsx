import React from 'react';
import { FC } from 'react';
import '@shared/styles/reset.sass';
import classes from './style/App.sass';

const App: FC = () => {
    return <div className={classes.root}></div>;
};

export { App };
