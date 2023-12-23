import { object, string } from 'yup';

const createRemoveProjectSchema = (projectName: string) =>
    object().shape({
        projectName: string()
            .required('Поле обязательно для заполнения')
            .oneOf([projectName], 'Наименование проекта не совпадает'),
    });

export { createRemoveProjectSchema };
