/*
 *
 * LanguageProvider reducer
 *
 */


import {
  CHANGE_LOCALE,
} from 'ui/containers/LanguageProvider/constants';
import {
  DEFAULT_LOCALE,
} from 'ui/containers/App/constants'; // eslint-disable-line

const initialState = {
  locale: DEFAULT_LOCALE,
};

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return { locale: action.locale };
    default:
      return state;
  }
}

export default languageProviderReducer;
