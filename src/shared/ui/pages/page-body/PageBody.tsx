/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { useStyles } from './style';
import type { PageBodyProps } from './types';

const PageBody: FC<PageBodyProps> = ({ children }) => {
    const styles = useStyles();
    return <div css={styles.root}>{children}</div>;
};

export { PageBody };
