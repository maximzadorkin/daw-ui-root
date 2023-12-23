/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC, useEffect } from 'react';
import { projectStore } from '@entities/project/model/projectStore';
import { Button, OverScreen, TextField } from '@quarx-ui/core';
import { ServerError } from '@shared/api/types';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';
import { isAxiosError } from 'axios';
import { useFormik } from 'formik';
import { CreateProjectValidationSchema } from '../../model';
import { useStyles } from './style';
import { CreateProjectModalProps } from './types';

const ANIMATION_TIMEOUT = 250;
const initialValues = { name: '' };
type Values = typeof initialValues;

const CreateProjectModal: FC<CreateProjectModalProps> = ({ open, onClose }) => {
    const onSubmit = async (values: Values) => {
        try {
            await projectStore.createProject(values);
            eventBus.emit(EVENT_TYPE.pushNotification, {
                color: 'success',
                title: `Проект "${values.name}" добавлен`,
            });
            onClose?.();
            setTimeout(() => {
                projectStore.refetch().finally();
            }, ANIMATION_TIMEOUT);
        } catch (error) {
            if (!isAxiosError<ServerError>(error)) {
                return;
            }
            eventBus.emit(EVENT_TYPE.pushNotification, {
                color: 'danger',
                title: error.response?.data.statusCode,
                description: error.response?.data.message,
            });
        }
    };

    const styles = useStyles();
    const form = useFormik({
        initialValues,
        validationSchema: CreateProjectValidationSchema,
        onSubmit,
    });

    useEffect(() => {
        form.resetForm();
    }, [open]);

    return (
        <OverScreen
            open={open}
            onClose={onClose}
            appearance="slide"
            origin="right"
            placement="top-end"
            margin={[70, 0, 0, 0]}
            timeout={ANIMATION_TIMEOUT}
        >
            <form
                css={styles.form}
                onSubmit={form.handleSubmit}
                onReset={form.handleReset}
            >
                <div css={styles.title}>Создание проекта</div>
                <TextField
                    label="Наименование"
                    name="name"
                    value={form.values.name}
                    errorText={form.errors.name}
                    errorIcon={null}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    css={styles.field}
                />
                <Button
                    css={styles.button}
                    color="info"
                    size="small"
                    buttonType="submit"
                    loading={form.isSubmitting}
                    disabled={form.isSubmitting || !form.isValid}
                >
                    Создать
                </Button>
            </form>
        </OverScreen>
    );
};

export { CreateProjectModal };
