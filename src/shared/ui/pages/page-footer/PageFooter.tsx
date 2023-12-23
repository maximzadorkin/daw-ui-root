/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { PageFooterProps } from './types';
import { useStyles } from './style';

const PageFooter: FC<PageFooterProps> = ({ children }) => {
    const styles = useStyles();
    return <div css={styles.root}>{children}</div>;
};

export { PageFooter };
