import { ReactChild } from 'react';
import { CssComponent } from '@shared/styles/types';

interface SelectorOption<T extends string = string> {
    value: T;

    title?: string;

    children?: ReactChild;
}

interface ButtonSelectorProps<T extends string = string> extends CssComponent {
    selectedPrefix?: string;

    selected?: SelectorOption<T>;

    options: SelectorOption<T>[];

    onChange?(selected: SelectorOption<T>): void;

    loading?: boolean;

    disabled?: boolean;
}

export type { SelectorOption, ButtonSelectorProps };
