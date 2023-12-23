import { object, string } from 'yup';

const CreateProjectValidationSchema = object().shape({
    name: string().required('Поле обязательно для заполнения'),
});

export { CreateProjectValidationSchema };
