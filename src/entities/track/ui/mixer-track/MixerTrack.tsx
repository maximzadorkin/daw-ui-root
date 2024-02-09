/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Button, Dropdown, DropdownItem, IconButton } from '@quarx-ui/core';
import { CrossIcon } from '@quarx-ui/icons/cross/24px/stroke/square';
import { PlusIcon } from '@quarx-ui/icons/plus/16px/stroke/rounded';
import { ButtonSelector } from '@shared/components/button-selector';
import React, { FC } from 'react';
import { useStyles } from './style';

const MixerTrack: FC = () => {
    const styles = useStyles();

    return (
        <div css={styles.root}>
            <ButtonSelector
                selectedPrefix="type: "
                selected={{ value: 'audio', title: 'audio' }}
                options={[
                    { value: 'audio', title: 'audio' },
                    { value: 'midi', title: 'midi' },
                ]}
            />
            <ButtonSelector
                selectedPrefix="input: "
                selected={{ value: 'input1', title: 'input1' }}
                options={[
                    { value: 'input1', title: 'input1' },
                    { value: 'input2', title: 'input2' },
                ]}
            />
            <div css={styles.fx}>
                <div css={styles.fxTitle}>FX</div>
                <Button
                    css={{ width: '100%' }}
                    size="xSmall"
                    type="outlined"
                    color="secondary"
                >
                    FX
                </Button>
                <IconButton
                    css={{ alignSelf: 'flex-end' }}
                    size="xSmall"
                    type="outlined"
                    color="secondary"
                >
                    <PlusIcon />
                </IconButton>
            </div>
            <div>pan</div>
            <div>
                <div>Volume changer</div>
                <div>Volume indicator</div>
            </div>
            <div css={styles.actions}>
                <IconButton
                    css={{ alignSelf: 'flex-end' }}
                    size="xSmall"
                    type="text"
                    color="warning"
                >
                    M
                </IconButton>
                <IconButton
                    css={{ alignSelf: 'flex-end' }}
                    size="xSmall"
                    type="text"
                    color="danger"
                >
                    <CrossIcon />
                </IconButton>
            </div>
        </div>
    );
};

export { MixerTrack };
