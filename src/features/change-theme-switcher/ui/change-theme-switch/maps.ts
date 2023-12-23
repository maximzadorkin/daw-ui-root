import { THEME_TYPE } from '@shared/styles/types';

const mapStateToThemeType: Record<string, THEME_TYPE> = {
    false: THEME_TYPE.dark,
    true: THEME_TYPE.light,
};

export { mapStateToThemeType };
