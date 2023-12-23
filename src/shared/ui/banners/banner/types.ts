import { ButtonProps, StackProps } from '@quarx-ui/core';

interface BannerAction extends Partial<Omit<ButtonProps, 'children'>> {
    title?: string;
}

interface BannerProps {
    title?: string;

    description?: string;

    actions?: BannerAction[];

    actionsStackProps?: Partial<StackProps>;
}

export type { BannerAction, BannerProps };
