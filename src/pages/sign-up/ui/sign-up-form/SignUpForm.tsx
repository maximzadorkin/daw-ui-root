/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC, useEffect, useState } from 'react';
import { Button, Collapse, TextField } from '@quarx-ui/core';
import { useStyles } from './style';
import DawLabel from '@shared/icons/daw.svg';
import { authStore } from '@shared/stores/auth';
import { PAGES_PATHS } from '@shared/lib/pages.paths.register';
import axios from 'axios';
import { ServerError } from '@shared/api/types';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

const initialValues = {
    name: '',
    surname: '',
    username: '',
    password: '',
    passwordConfirm: '',
};

type Values = typeof initialValues;

const SignUpForm: FC = () => {
    const navigate = useNavigate();
    const styles = useStyles();
    const [commonError, setCommonError] = useState<string | null>(null);

    const onSubmitHandler = async (values: Values) => {
        try {
            await authStore.signUp(values);
            setCommonError(null);
            navigate(PAGES_PATHS.index);
        } catch (error) {
            if (axios.isAxiosError<ServerError>(error)) {
                setCommonError(error.response?.data?.message ?? null);
            }
        }
    };

    useEffect(() => {
        if (authStore.isAuth) {
            navigate(PAGES_PATHS.index);
        }
    }, []);

    return (
        <div css={styles.wrapper}>
            <Formik onSubmit={onSubmitHandler} initialValues={initialValues}>
                {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form css={styles.root} onSubmit={handleSubmit}>
                        <DawLabel width={207} height={48} css={styles.label} />
                        <TextField
                            label="Имя"
                            name="name"
                            value={values.name}
                            errorText={errors.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            label="Фамилия"
                            name="surname"
                            value={values.surname}
                            errorText={errors.surname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            label="Логин"
                            name="username"
                            value={values.username}
                            errorText={errors.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            label="Пароль"
                            name="password"
                            value={values.password}
                            errorText={errors.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            label="Подтверждение пароля"
                            name="passwordConfirm"
                            value={values.passwordConfirm}
                            errorText={errors.passwordConfirm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Collapse open={Boolean(commonError)}>
                            <span css={styles.error}>{commonError}</span>
                        </Collapse>
                        <Button
                            buttonType="submit"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            color="info"
                        >
                            Регистрация
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export { SignUpForm };
