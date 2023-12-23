/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner } from '@shared/ui/banners/banner';
import { useBooleanState } from '@quarx-ui/core';

const SomethingWentWrong: FC = () => {
    const [clicked, { setTrue: setClicked }] = useBooleanState(false);
    const navigate = useNavigate();

    const reload = (): void => {
        navigate(0);
        setClicked();
    };

    return (
        <Banner
            title="Что-то пошло не так"
            actions={[
                {
                    title: 'Обновить',
                    onClick: reload,
                    loading: clicked,
                    disabled: clicked,
                },
            ]}
        />
    );
};

export { SomethingWentWrong };
