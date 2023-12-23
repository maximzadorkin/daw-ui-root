import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Banner } from '@shared/ui/banners/banner';

// ToDo: Проверить работоспособность
const ErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    const onClickReload = (): void => {
        setHasError(false);
    };

    useEffect(() => {
        const handleError = () => {
            setHasError(true);
        };

        document.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    if (hasError) {
        return (
            <Banner
                title="Что-то пошло не так"
                actions={[
                    {
                        title: 'Обновить',
                        onClick: onClickReload,
                    },
                ]}
            />
        );
    }

    return children;
};

export { ErrorBoundary };
