/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC, useEffect } from 'react';
import {
    Button,
    Collapse,
    Divider,
    OverScreen,
    useBooleanState,
} from '@quarx-ui/core';
import { ChangeUserPasswordForm } from '../change-user-password-form';
import { ChangeUserSettingsForm } from '../change-user-settings-form';
import { ChangeUserSettingsModalProps } from './types';
import { useStyles } from './style';

const OVER_SCREEN_TIMEOUT = 250;

const ChangeUserSettingsModal: FC<ChangeUserSettingsModalProps> = ({
    open,
    onClose,
}) => {
    const styles = useStyles();
    const [
        changePasswordFormVisible,
        {
            setTrue: openChangePasswordForm,
            setState: setChangePasswordFormVisible,
        },
    ] = useBooleanState(false);

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setChangePasswordFormVisible(false);
            }, OVER_SCREEN_TIMEOUT);
        }
    }, [open]);

    return (
        <OverScreen
            open={open}
            onClose={onClose}
            timeout={OVER_SCREEN_TIMEOUT}
            origin="bottom"
            appearance="slide"
            placement="bottom-start"
        >
            <div css={styles.modal}>
                <ChangeUserSettingsForm />
                <Divider css={styles.divider} />
                {!changePasswordFormVisible && (
                    <Button
                        type="text"
                        color="warning"
                        size="xSmall"
                        onClick={openChangePasswordForm}
                    >
                        Изменить пароль
                    </Button>
                )}
                {/*<Collapse open={}>*/}
                {/*</Collapse>*/}
                {changePasswordFormVisible && <ChangeUserPasswordForm />}
                {/*<Collapse open={changePasswordFormVisible} >*/}
                {/*</Collapse>*/}
            </div>
        </OverScreen>
    );
};
export { ChangeUserSettingsModal };
