import { ButtonType } from '@quarx-ui/core/src/main/Button/types';

const mapRecordStateToType: Record<'false' | 'true', ButtonType> = {
    true: 'contained',
    false: 'text',
};

export { mapRecordStateToType };
