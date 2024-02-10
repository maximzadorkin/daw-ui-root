import { CssComponent } from '@shared/styles/types';

interface SelectorOption<T extends string = string> {
    value: T;

    title?: string;
}

interface ButtonSelectorProps<T extends string = string> extends CssComponent {
    selectedPrefix?: string;

    selected?: SelectorOption<T>;

    options: SelectorOption<T>[];

    onChange?(selected: SelectorOption<T>): void;
}

export type { SelectorOption, ButtonSelectorProps };
