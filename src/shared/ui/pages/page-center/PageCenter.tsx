/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { FC, ReactNode } from 'react';
import { useStyles } from './style';

const PageCenter: FC<{ children: ReactNode }> = ({ children }) => {
    const styles = useStyles();

    return <div css={styles.root}>{children}</div>;
};

export { PageCenter };
