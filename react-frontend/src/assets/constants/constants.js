import colors from '../styles/_colors.scss';

// Summaries for the html metadata (i.e. Search Engines may display this text)
// myappSummary also goes, by default, on the home page.
export const myappSummary = 'Short, compelling description of what this website does';
export const myappSummaryLong = 'TODO';

const REACT_SELECT_THEME_COLORS = {
    'primary': colors.themeTerciaryColor,
    'primary75': colors.themeTerciaryColorFaint,
    'primary50': colors.themeTerciaryColorFaint50,
    'primary25': colors.themeTerciaryColorFaint25,
    // 'danger': colors.failureColor,
    // 'dangerLight': colors.badColor,
    'neutral0': colors.themeSecondaryColor0,
    'neutral5': colors.themeSecondaryColor5,
    'neutral10': colors.themeSecondaryColor10,
    'neutral20': colors.themeSecondaryColor20,
    'neutral30': colors.themeSecondaryColor30,
    'neutral40': colors.themeSecondaryColor40,
    'neutral50': colors.themeSecondaryColor50,
    'neutral60': colors.themeSecondaryColor60,
    'neutral70': colors.themeSecondaryColor70,
    'neutral80': colors.themeSecondaryColor80,
    'neutral90': colors.themeSecondaryColor90,
}

export const getReactSelectTheme = theme => ({
    ...theme,
    borderRadius: 4,
    colors: {
        ...theme.colors,
        ...REACT_SELECT_THEME_COLORS
    },
});
