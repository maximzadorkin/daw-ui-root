import { HTMLProps, ReactNode } from 'react';
import { BUTTON_COLOR } from './constant';

type ButtonColor = keyof typeof BUTTON_COLOR;

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    /** Дочерние элементы кнопки */
    children?: ReactNode;

    /** Цветовая схема кнопки
     * @default default */
    color?: ButtonColor;

    /** Состояние загрузки
     * @default false */
    loading?: boolean;

    /** Состояние отключения
     * @default false */
    disabled?: boolean;
}

export type { ButtonProps };
