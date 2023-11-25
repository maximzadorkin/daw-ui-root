import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { BUTTON_COLOR } from './constant';
import { ButtonProps } from './types';
import classes from './style/Button.sass';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            type = 'button',
            color = BUTTON_COLOR.default,
            loading,
            disabled,
            className,
            ...props
        },
        ref,
    ) => (
        <button
            {...props}
            ref={ref}
            disabled={disabled}
            className={clsx({
                [classes.root]: true,
                [classes[color]]: true,
                [className ?? '']: true,
            })}
        >
            {loading && (
                <div className={classes.circleWrapper}>
                    <div className={classes.circle} />
                </div>
            )}
            <div
                className={clsx({
                    [classes.hidden]: loading,
                })}
            >
                {children}
            </div>
        </button>
    ),
);

export { Button };
