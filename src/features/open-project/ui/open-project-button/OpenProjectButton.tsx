import React, { FC } from 'react';
import { IconButton } from '@quarx-ui/core';
import { FourSquaresIcon } from '@quarx-ui/icons/four-squares/16px/fill/rounded';
import { useNavigate } from 'react-router-dom';
import { OpenProjectButtonProps } from './types';

const OpenProjectButton: FC<OpenProjectButtonProps> = ({ project }) => {
    const navigate = useNavigate();
    const onClick = (): void => {
        navigate(`/project/${project.id}`);
    };

    return (
        <IconButton
            size="small"
            color="secondary"
            type="text"
            onClick={onClick}
        >
            <FourSquaresIcon />
        </IconButton>
    );
};

export { OpenProjectButton };
