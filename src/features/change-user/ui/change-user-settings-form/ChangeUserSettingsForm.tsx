/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ServerError } from '@shared/api/types';
import React, { FC, useEffect, useMemo } from 'react';
import { userStore } from '@entities/user';
import { Button, TextField } from '@quarx-ui/core';
import { User } from '@shared/api/modules/users/types';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
// fixme: добавить поддержку esm
import { isEqual } from 'lodash';
import { observer } from 'mobx-react';
import { useStyles } from './style';
import { ChangeUserSettingsFormProps } from './types';

const getInitialValues = (user: User | null) => {
    return {
        username: user?.username,
        name: user?.name,
        surname: user?.surname,
    };
};

const ChangeUserSettingsForm: FC<ChangeUserSettingsFormProps> = observer(() => {
    const styles = useStyles();
    const initialValues = useMemo(
        () => getInitialValues(userStore.currentUser),
        [userStore.currentUser],
    );
    const form = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                await userStore.changeSettings(values);
                eventBus.emit(EVENT_TYPE.pushNotification, {
                    color: 'success',
                    title: 'Данные изменены',
                });
            } catch (error) {
                if (isAxiosError<ServerError>(error)) {
                    eventBus.emit(EVENT_TYPE.pushNotification, {
                        color: 'danger',
                        title: error.response?.data.statusCode,
                        description: error.response?.data.message,
                    });
                }
            }
        },
    });

    const canNotSave = useMemo(
        () => isEqual(form.values, initialValues),
        [form.values],
    );

    useEffect(() => {
        form.resetForm({ values: initialValues });
    }, [open, initialValues]);

    return (
        <form onSubmit={form.handleSubmit} onReset={form.handleReset}>
            <div css={styles.header}>
                <div css={styles.title}>Настройки пользователя</div>
                <Button
                    size="small"
                    color="info"
                    buttonType="submit"
                    loading={form.isSubmitting}
                    disabled={form.isSubmitting || !form.isValid || canNotSave}
                >
                    Сохранить изменения
                </Button>
            </div>
            <div css={styles.form}>
                <TextField
                    name="name"
                    label="Имя пользователя"
                    value={form.values.name}
                    errorText={form.errors.name}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    css={styles.textfield}
                    errorIcon={null}
                />
                <TextField
                    name="surname"
                    label="Фамилия пользователя"
                    value={form.values.surname}
                    errorText={form.errors.surname}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    css={styles.textfield}
                    errorIcon={null}
                />
                <TextField
                    name="username"
                    label="Login пользователя"
                    value={form.values.username}
                    errorText={form.errors.username}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    css={styles.textfield}
                    errorIcon={null}
                />
            </div>
        </form>
    );
});

export { ChangeUserSettingsForm };
