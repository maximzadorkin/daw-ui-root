import { ButtonType } from '@quarx-ui/core/src/main/Button/types';

const mapRecordStateToType: Record<string, ButtonType> = {
    true: 'contained',
    false: 'text',
};

export { mapRecordStateToType };
