/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { PersonalBlockProps } from './types';
import { useStyles } from './style';
import { isNil } from 'lodash';
import { Loader } from '@quarx-ui/core';

const PersonalBlock: FC<PersonalBlockProps> = ({
    user,
    loading,
    reload,
    actions,
}) => {
    const styles = useStyles();

    if (loading) {
        return (
            <div css={styles.root}>
                <Loader />
            </div>
        );
    }

    return (
        <div css={styles.root}>
            {!isNil(user) ? (
                <div css={styles.info}>
                    <div css={styles.greeting}>
                        Добро пожаловать,
                        <br />
                        {user?.name}
                    </div>
                    <div css={styles.username}>{user.username}</div>
                </div>
            ) : (
                reload
            )}
            {actions}
        </div>
    );
};

export { PersonalBlock };
