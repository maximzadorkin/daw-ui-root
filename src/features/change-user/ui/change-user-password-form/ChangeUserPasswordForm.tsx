/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Button, TextField } from '@quarx-ui/core';
import { ServerError } from '@shared/api/types';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';
import { authStore } from '@shared/stores/auth';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { isNil } from 'lodash';
import { useEffect } from 'react';
import { ChangePasswordSchema } from '../../model';
import { useStyles } from './style';

const initialValues = {
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
};
type Values = typeof initialValues;

// ToDo: Можно добавить глазик для textfield
const ChangeUserPasswordForm = () => {
    const styles = useStyles();

    const onSubmit = async (
        values: Values,
        formikHelpers: FormikHelpers<Values>,
    ): Promise<void> => {
        try {
            formikHelpers.setStatus();
            await authStore.changePassword(values);
            formikHelpers.resetForm();
            eventBus.emit(EVENT_TYPE.pushNotification, {
                color: 'success',
                title: 'Пароль успешно изменен',
            });
        } catch (error) {
            if (!isAxiosError<ServerError>(error)) {
                return;
            }

            formikHelpers.setStatus({ error: error.response?.data });
        }
    };

    const form = useFormik({
        initialValues,
        onSubmit,
        validationSchema: ChangePasswordSchema,
    });

    useEffect(() => {
        form.resetForm();
    }, []);

    const errorWithTouched = (
        prop: keyof typeof initialValues,
    ): string | undefined => {
        if (form.touched[prop]) {
            return form.errors[prop];
        }
    };

    return (
        <form onSubmit={form.handleSubmit} onReset={form.handleReset}>
            <div css={styles.header}>
                <div css={styles.title}>Пароль</div>
            </div>
            <div css={styles.fields}>
                <TextField
                    label="Введите старый пароль"
                    name="password"
                    value={form.values.password}
                    errorText={errorWithTouched('password')}
                    errorIcon={null}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    css={styles.field}
                    disabled={form.isSubmitting}
                    inputProps={{ type: 'password' }}
                />
                <TextField
                    label="Введите новый пароль"
                    name="newPassword"
                    value={form.values.newPassword}
                    errorText={errorWithTouched('newPassword')}
                    errorIcon={null}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    css={styles.field}
                    disabled={form.isSubmitting}
                    inputProps={{ type: 'password' }}
                />
                <TextField
                    label="Подтвердите новый пароль"
                    name="newPasswordConfirm"
                    value={form.values.newPasswordConfirm}
                    errorText={errorWithTouched('newPasswordConfirm')}
                    errorIcon={null}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    css={styles.field}
                    disabled={form.isSubmitting}
                    inputProps={{ type: 'password' }}
                />
            </div>
            {!isNil(form.status?.error) && (
                <div css={styles.error}>
                    {form.status?.error?.message ?? 'Что-то пошло нет так'}
                </div>
            )}
            <Button
                css={styles.button}
                color="danger"
                size="small"
                buttonType="submit"
                loading={form.isSubmitting}
                disabled={form.isSubmitting || !form.isValid}
            >
                Сохранить
            </Button>
        </form>
    );
};

export { ChangeUserPasswordForm };
