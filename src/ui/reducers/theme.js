/*
 *
 * ThemeProvider reducer
 *
 */

import { getQueryParams } from 'ui/utils/url';
import * as themes from 'ui/containers/ThemeProvider/themes';
import { DEFAULT_THEME, CHANGE_THEME } from 'ui/containers/ThemeProvider/constants';

// Check 'theme' query param to use as default theme
const { theme } = getQueryParams(window.location.search);

const initialState = {
  // If no query param 'theme', fallback to light theme by default
  theme: theme && themes[theme] ? themes[theme] : themes[DEFAULT_THEME],
  name: theme || DEFAULT_THEME,
};

function themeProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      // If not theme found, do nothing, just keep current theme
      if (themes[action.theme]) {
        return {
          theme: themes[action.theme],
          name: action.theme,
        };
      }
      return state;
    default:
      return state;
  }
}

export default themeProviderReducer;
