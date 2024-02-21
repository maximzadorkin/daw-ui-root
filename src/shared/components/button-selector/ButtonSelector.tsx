/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { Button, Dropdown, DropdownItem } from '@quarx-ui/core';
import { ButtonSelectorProps, SelectorOption } from './types';
import { useStyles } from './style';

const ButtonSelector: FC<ButtonSelectorProps> = ({
    selectedPrefix,
    selected,
    onChange,
    options,
    className,
    disabled,
    loading,
}) => {
    const [width, setWidth] = useState<string | number>('100%');
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLButtonElement>(null);
    const styles = useStyles({ params: { width } });

    const toggleDropdown = (): void => setOpen((state) => !state);

    const onClose = (): void => {
        setOpen(false);
    };

    const createOnChangeHandler = (option: SelectorOption) => (): void => {
        onChange?.(option);
        setOpen(false);
    };

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const styles = window.getComputedStyle(ref.current);
        const left = parseFloat(styles.paddingLeft);
        const right = parseFloat(styles.paddingRight);
        const padding = left + right;
        setWidth(ref.current.clientWidth - padding);
    }, [ref.current]);

    return (
        <Fragment>
            <Button
                ref={ref}
                onClick={toggleDropdown}
                size="xSmall"
                type="outlined"
                color="secondary"
                className={className}
                disabled={disabled || loading}
                loading={loading}
                classes={{ root: css(styles.buttonRoot) }}
            >
                <div css={styles.buttonTextWrapper}>
                    {selected?.children ??
                        [selectedPrefix, selected?.title]
                            .filter(Boolean)
                            .join(' ')}
                </div>
            </Button>
            <Dropdown
                anchor={ref}
                open={open}
                onClickAway={onClose}
                searchable={false}
                buttonManagement={false}
                size="small"
                maxWidth={320}
                PopupProps={{ className: css(styles.popup) }}
            >
                {options.map((option) => (
                    <DropdownItem
                        key={option.value}
                        size="small"
                        ellipsis
                        title={option.title}
                        value={option.value}
                        state={selected?.value === option.value}
                        onClick={createOnChangeHandler(option)}
                    >
                        {option.children}
                    </DropdownItem>
                ))}
            </Dropdown>
        </Fragment>
    );
};

export { ButtonSelector };
