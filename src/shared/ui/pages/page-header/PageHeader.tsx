/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { FC } from 'react';
import { PageHeaderProps } from './types';
import { useStyles } from './style';

const PageHeader: FC<PageHeaderProps> = ({ title, actions }) => {
    const styles = useStyles();
    return (
        <div css={styles.root}>
            <h3 css={styles.title}>{title}</h3>
            <div>{actions}</div>
        </div>
    );
};

export { PageHeader };
