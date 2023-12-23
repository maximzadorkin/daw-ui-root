/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { PageProps } from './types';
import { useStyles } from './style';

const Page: FC<PageProps> = ({ children }) => {
    const styles = useStyles();
    return <div css={styles.root}>{children}</div>;
};

export { Page };
