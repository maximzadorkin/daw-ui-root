/** @jsx jsx */
import { jsx } from '@emotion/react';
import { FC, ReactNode } from 'react';
import { useStyles } from './style';

const Container: FC<{ children: ReactNode }> = ({ children }) => {
    const styles = useStyles();
    return <div css={styles.root}>{children}</div>;
};

export { Container };
