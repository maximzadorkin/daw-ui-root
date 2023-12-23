import { object, string } from 'yup';

const requiredFieldText = 'Поле обязательно для заполнения';
const ChangePasswordSchema = object().shape({
    password: string().required(requiredFieldText),
    newPassword: string().required(requiredFieldText),
    newPasswordConfirm: string().required(requiredFieldText),
});

export { ChangePasswordSchema };
