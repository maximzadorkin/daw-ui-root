import React, { FC, Fragment, useMemo } from 'react';
import { IconButton, Modal, TextField, useBooleanState } from '@quarx-ui/core';
import { Project } from '@shared/api/modules/projects/types';
import { userStore } from '@entities/user';
import { TrashBinIcon } from '@quarx-ui/icons/trash-bin/16px/stroke/square';
import { useFormik } from 'formik';
import { eventBus } from '@shared/lib/event-bus';
import { EVENT_TYPE } from '@shared/lib/event-bus/types.register';
import { isAxiosError } from 'axios';
import { projectStore } from '@entities/project/model/projectStore';
import { observer } from 'mobx-react';
import { createRemoveProjectSchema } from './validations';

const initialValues = { projectName: '' };
type Values = typeof initialValues;

const DeleteProjectButton: FC<Project> = observer((project) => {
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
            // fixme: Сначала должно закрыться модальное окно, потом начаться обновление
            await projectStore.refetch();
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
            <Modal
                open={open}
                onClose={closeModal}
                size="small"
                title="Вы уверены, что хотите удалить проект?"
                subTitle="Это действие необратимо"
                footerButtons={{
                    danger: {
                        loading: form.isSubmitting,
                        disabled: form.isSubmitting || !form.isValid,
                        children: 'Удалить проект',
                        onClick: () => form.submitForm(),
                    },
                }}
            >
                <TextField
                    css={{ width: '100%' }}
                    name="projectName"
                    value={form.values.projectName}
                    errorText={form.errors.projectName}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                />
            </Modal>
        </Fragment>
    );
});

export { DeleteProjectButton };
