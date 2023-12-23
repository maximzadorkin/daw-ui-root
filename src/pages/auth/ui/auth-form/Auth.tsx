/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { FC } from 'react';
import DawLabel from '@shared/icons/daw.svg';
import {
    TextField,
    Button,
    TextFieldRefType,
    Link as LinkKit,
    Collapse,
} from '@quarx-ui/core';
import { AuthProps } from './types';
import { useStyles } from './style';
import { Link, useNavigate } from 'react-router-dom';
import { authStore } from '@shared/stores/auth';
import axios from 'axios';
import { PAGES_PATHS } from '@shared/lib/pages.paths.register';
import { ServerError } from '@shared/api/types';
import { Formik } from 'formik';

const initialValues = {
    username: '',
    password: '',
};

type Values = typeof initialValues;

const Auth: FC<AuthProps> = () => {
    const navigate = useNavigate();
    const styles = useStyles();
    const [commonError, setCommonError] = useState<string | null>(null);

    const onSubmitHandler = async (values: Values): Promise<void> => {
        try {
            await authStore.signIn(values);
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
            <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
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
                            label="Введите логин"
                            name="username"
                            value={values.username}
                            errorText={errors.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            label="Введите пароль"
                            name="password"
                            value={values.password}
                            errorText={errors.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Collapse open={Boolean(commonError)}>
                            <span css={styles.error}>{commonError}</span>
                        </Collapse>
                        <Button
                            buttonType="submit"
                            type="contained"
                            color="info"
                            css={styles.button}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            Войти
                        </Button>
                        <LinkKit
                            css={styles.link}
                            color="info"
                            underline="none"
                            component={Link}
                            to={PAGES_PATHS.signUp}
                        >
                            Зарегистрироваться
                        </LinkKit>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export { Auth };
