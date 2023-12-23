/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { FC } from 'react';
import { Button, Stack } from '@quarx-ui/core';
import { Lamp } from '@shared/ui/Lamp';
import { useStyles } from './style';
import { BannerProps } from './types';
import { v4 } from 'uuid';

const Banner: FC<BannerProps> = ({
    title,
    description,
    actions,
    actionsStackProps,
}) => {
    const styles = useStyles();

    return (
        <div css={styles.card}>
            <Lamp />
            <div css={styles.content}>
                {title && <span css={styles.title}>{title}</span>}
                {description && (
                    <span css={styles.description}>{description}</span>
                )}
                {actions && actions.length > 0 && (
                    <Stack
                        css={styles.stack}
                        spacing="6px"
                        alignItems="center"
                        {...actionsStackProps}
                    >
                        {actions.map((action) => (
                            <Button
                                key={v4()}
                                size="small"
                                color="secondary"
                                css={styles.button}
                                {...action}
                            >
                                {action.title}
                            </Button>
                        ))}
                    </Stack>
                )}
            </div>
        </div>
    );
};

export { Banner };
