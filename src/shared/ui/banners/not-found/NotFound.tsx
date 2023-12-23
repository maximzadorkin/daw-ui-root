/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { FC } from 'react';
import { Banner } from '@shared/ui/banners/banner';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBooleanState } from '@quarx-ui/core';
import { PAGES_PATHS } from '@shared/lib/pages.paths.register';
import { BannerAction } from '@shared/ui/banners/banner/types';

const NotFound: FC = () => {
    const [clicked, { setTrue: setClicked, setFalse: setUnclicked }] =
        useBooleanState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isNotIndexPage = location.pathname !== PAGES_PATHS.index;

    const backToPreviousPage = (): void => {
        setClicked();
        navigate(-1);
        setUnclicked();
    };
    const toIndexPage = (): void => {
        setClicked();
        navigate(PAGES_PATHS.index);
        setUnclicked();
    };

    const actions = [
        {
            title: 'Вернуться назад',
            onClick: backToPreviousPage,
            loading: clicked,
            disabled: clicked,
        },
        isNotIndexPage && {
            title: 'На главную',
            color: 'info',
            onClick: toIndexPage,
            loading: clicked,
            disabled: clicked,
        },
    ];

    return (
        <Banner
            title="Страница не найдена"
            actions={actions.filter(Boolean) as BannerAction[]}
            actionsStackProps={{ direction: 'row' }}
        />
    );
};

export { NotFound };
