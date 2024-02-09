interface SelectorOption {
    value: string;

    title?: string;
}

interface ButtonSelectorProps {
    selectedPrefix?: string;

    selected?: SelectorOption;

    options: SelectorOption[];

    onChange?(selected: SelectorOption): void;
}

export type { SelectorOption, ButtonSelectorProps };
