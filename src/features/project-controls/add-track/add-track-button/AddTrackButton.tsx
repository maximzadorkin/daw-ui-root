/** @jsx jsx */
import { jsx } from '@emotion/react';
import { css } from '@emotion/css';
import { projectClient } from '@shared/api/modules/project/client';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { action } from 'mobx';
import { useFormik } from 'formik';
import { PlusIcon } from '@quarx-ui/icons/plus/24px/stroke/rounded';
import {
    Button,
    createID,
    IconButton,
    OverScreen,
    PALETTE_COLORS,
    Stack,
    TextField,
} from '@quarx-ui/core';
import { Track } from '@shared/lib/audio-api/Track';
import { useProject } from '@shared/contexts/project-context';
import {
    ButtonSelector,
    SelectorOption,
} from '@shared/components/button-selector';
import { useStyles } from './styles';
import { Values } from './types';
import { AddTrackSchema, COLORS } from './constants';

const AddTrackButton: FC = () => {
    const project = useProject();
    const [openOverScreen, setOpenOverScreen] = useState<boolean>(false);
    const styles = useStyles();
    const form = useFormik<Values>({
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema: AddTrackSchema,
        initialValues: { name: '', color: PALETTE_COLORS.info },
        onSubmit: action((values): void => {
            project.addTrack(
                new Track({
                    id: createID(),
                    name: values.name,
                    color: values.color,
                    context: project.context,
                }),
            );
            setOpenOverScreen(false);
        }),
    });

    const colorOptions = COLORS.map(
        (color: Values['color']): SelectorOption<Values['color']> => ({
            value: color,
            children: <div css={styles[color]} />,
        }),
    );

    const onCloseOverScreen = (): void => {
        setOpenOverScreen(false);
    };

    const onPlusButtonClickHandler = (): void => {
        setOpenOverScreen(true);
    };

    useEffect(() => {
        form.resetForm();
    }, [openOverScreen]);

    return (
        <Fragment>
            <IconButton
                color="secondary"
                size="small"
                type="contained"
                onClick={onPlusButtonClickHandler}
            >
                <PlusIcon />
            </IconButton>
            <OverScreen
                open={openOverScreen}
                onClose={onCloseOverScreen}
                origin="top"
                placement="center"
                appearance="slide"
            >
                <Stack spacing="16px" css={styles.root}>
                    <div css={styles.title}>Новый трек</div>
                    <form
                        onSubmit={form.handleSubmit}
                        onReset={form.handleReset}
                        autoComplete="off"
                    >
                        <Stack spacing="16px">
                            <Stack spacing="8px">
                                <TextField
                                    name="name"
                                    label="Наименование"
                                    placeholder="Введите наименование"
                                    value={form.values.name}
                                    onChange={form.handleChange}
                                    errorText={form.errors.name}
                                    errorIcon={null}
                                    css={styles.textField}
                                />
                                <ButtonSelector
                                    className={css(styles.colorTextField)}
                                    options={colorOptions}
                                    selected={{
                                        value: form.values.color,
                                        children: (
                                            <div
                                                css={styles[form.values.color]}
                                            />
                                        ),
                                    }}
                                    onChange={(option) => {
                                        form.handleChange({
                                            target: {
                                                name: 'color',
                                                value: option.value,
                                            },
                                        });
                                    }}
                                />
                            </Stack>
                            <Button
                                type="text"
                                color="info"
                                size="small"
                                buttonType="submit"
                                css={{ justifySelf: 'flex-end' }}
                            >
                                Добавить
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </OverScreen>
        </Fragment>
    );
};

export { AddTrackButton };
