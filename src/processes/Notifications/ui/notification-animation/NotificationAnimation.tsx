/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useStyles } from './style';
import { NotificationAnimationProps } from './types';

const NotificationAnimation: FC<NotificationAnimationProps> = ({
    open,
    children,
}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [slideIn, setSlideIn] = useState(false);
    const styles = useStyles({
        params: { slideIn, height, hidden: elementRef.current === null },
    });

    useEffect(() => {
        if (open) {
            setSlideIn(false);
            setHeight(elementRef.current?.clientHeight ?? 0);
            setTimeout(() => {
                setSlideIn(true);
            }, 500);
            return;
        }

        setSlideIn(false);
        setTimeout(() => {
            setHeight(0);
        }, 500);
    }, [open]);

    return (
        <div css={styles.collapse}>
            <div css={styles.element} ref={elementRef}>
                {children}
            </div>
        </div>
    );
};

export { NotificationAnimation };
