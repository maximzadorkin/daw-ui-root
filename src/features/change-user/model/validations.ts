import { object, ObjectShape } from 'yup';

enum VALIDATION_SETTINGS_KEYS {}

const createValidationSettings = (
    excludedProps: VALIDATION_SETTINGS_KEYS[],
) => {
    const shape: ObjectShape = {};
    const keys = Object.keys(shape) as unknown as VALIDATION_SETTINGS_KEYS[];

    const withExcluded = keys.reduce((acc, prop) => {
        if (excludedProps.includes(prop)) {
            return acc;
        }

        return {
            ...acc,
            [prop]: shape[prop],
        };
    }, {} as ObjectShape);

    return object().shape(withExcluded);
};

export { createValidationSettings };
