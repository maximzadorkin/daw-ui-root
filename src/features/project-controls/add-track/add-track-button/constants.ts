import { PALETTE_COLORS } from '@quarx-ui/core';
import { mixed, object, string } from 'yup';
import { Values } from './types';

const REQUIRED_TEXT = 'Поле обязательно для заполнения';
const COLORS = Object.values(PALETTE_COLORS).filter(
    (color): color is Values['color'] => color !== PALETTE_COLORS.danger,
);
const AddTrackSchema = object().shape({
    name: string().required(REQUIRED_TEXT),
    // type: string().required(REQUIRED_TEXT),
    color: mixed().oneOf(COLORS).required(REQUIRED_TEXT),
});

export { REQUIRED_TEXT, COLORS, AddTrackSchema };
