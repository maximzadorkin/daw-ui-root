/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC, Fragment, useMemo } from 'react';
import {
    Button,
    IconButton,
    OverScreen,
    TextField,
    useBooleanState,
} from '@quarx-ui/core';
import { Project } from '@shared/api/modules/projects/types';
import { userStore } from '@entities/user';
import { TrashBinIcon } from '@quarx-ui/icons/trash-bin/24px/stroke/square';
import { useFormik } from 'formik';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';
import { isAxiosError } from 'axios';
import { projectStore } from '@entities/project/model/projectStore';
import { observer } from 'mobx-react';
import { createRemoveProjectSchema } from './validations';
import { useStyles } from './style';

const initialValues = { projectName: '' };
type Values = typeof initialValues;
const ANIMATION_TIMEOUT = 250;

const DeleteProjectButton: FC<Project> = observer((project) => {
    const styles = useStyles();
    const [open, { setTrue: openModal, setFalse: closeModal }] =
        useBooleanState(false);
    const projectNameSchema = useMemo(
        () => createRemoveProjectSchema(project.name),
        [project.name, open],
    );

    const onSubmitHandler = async (): Promise<void> => {
        try {
            await projectStore.deleteProject({ id: project.id });
            form.resetForm();
            closeModal();
            setTimeout(() => {
                // fixme: Сначала должно закрыться модальное окно, потом начаться обновление
                projectStore.refetch().finally();
            }, ANIMATION_TIMEOUT);
        } catch (error) {
            if (isAxiosError(error)) {
                eventBus.emit(EVENT_TYPE.pushNotification, {
                    color: 'danger',
                    title: error.response?.data.code,
                    description: error.response?.data.message,
                });
            }
        }
    };

    const form = useFormik<Values>({
        initialValues,
        onSubmit: onSubmitHandler,
        validateOnBlur: true,
        validationSchema: projectNameSchema,
    });

    const onOpenModal = (): void => {
        form.resetForm({});
        openModal();
    };

    if (project.owner.id !== userStore.currentUser?.id) {
        return null;
    }

    return (
        <Fragment>
            <IconButton
                size="xSmall"
                color="danger"
                type="text"
                onClick={onOpenModal}
            >
                <TrashBinIcon />
            </IconButton>
            <OverScreen
                open={open}
                onClose={closeModal}
                timeout={ANIMATION_TIMEOUT}
                origin="bottom"
                appearance="slide"
                placement="bottom"
            >
                <form
                    css={styles.modal}
                    onSubmit={form.handleSubmit}
                    onReset={form.handleReset}
                >
                    <div css={styles.title}>
                        Вы уверены, что хотите удалить проект?
                    </div>
                    <div css={styles.subTitle}>
                        Это действие необратимо. Для удаления введите название
                        проекта "{project.name}"
                    </div>
                    <TextField
                        css={{ width: '100%' }}
                        name="projectName"
                        value={form.values.projectName}
                        errorText={form.errors.projectName}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        errorIcon={null}
                    />
                    <Button
                        css={styles.deleteButton}
                        color="danger"
                        size="small"
                        loading={form.isSubmitting}
                        disabled={form.isSubmitting || !form.isValid}
                    >
                        Удалить проект
                    </Button>
                </form>
            </OverScreen>
        </Fragment>
    );
});

export { DeleteProjectButton };
