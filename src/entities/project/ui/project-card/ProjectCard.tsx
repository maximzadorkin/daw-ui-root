/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { FC } from 'react';
import { Badge } from '@quarx-ui/core';
import { useStyles } from './style';
import { ProjectCardProps } from './types';

const ProjectCard: FC<ProjectCardProps> = ({ name, owner, actions }) => {
    const styles = useStyles();

    return (
        <div css={styles.root}>
            <div css={styles.info}>
                <div css={styles.name}>{name}</div>
                <Badge size="small" type="outlined" color="text">
                    @{owner?.username}
                </Badge>
            </div>
            {actions && <div css={styles.actions}>{actions}</div>}
        </div>
    );
};

export { ProjectCard };
