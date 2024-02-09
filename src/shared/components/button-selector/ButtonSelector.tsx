import React, { FC, Fragment, useRef, useState } from 'react';
import { Button, Dropdown, DropdownItem } from '@quarx-ui/core';
import { ButtonSelectorProps, SelectorOption } from './types';

const ButtonSelector: FC<ButtonSelectorProps> = ({
    selectedPrefix,
    selected,
    onChange,
    options,
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLButtonElement>(null);

    const toggleDropdown = (): void => setOpen((state) => !state);

    const onClose = (): void => {
        setOpen(false);
    };

    const createOnChangeHandler = (option: SelectorOption) => (): void => {
        onChange?.(option);
    };

    return (
        <Fragment>
            <Button
                ref={ref}
                onClick={toggleDropdown}
                size="xSmall"
                type="outlined"
                color="secondary"
                css={{ justifyContent: 'flex-start' }}
            >
                {[selectedPrefix, selected?.title].filter(Boolean).join(' ')}
            </Button>
            <Dropdown
                anchor={ref}
                open={open}
                onClickAway={onClose}
                searchable={false}
                buttonManagement={false}
                size="small"
            >
                {options.map((option) => (
                    <DropdownItem
                        key={option.value}
                        title={option.title}
                        value={option.value}
                        state={selected?.value === option.value}
                        onClick={createOnChangeHandler(option)}
                    />
                ))}
            </Dropdown>
        </Fragment>
    );
};

export { ButtonSelector };
