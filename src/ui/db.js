import kalzateDB from 'kalzate-db';
import { merge } from 'lodash';
import { DEFAULT_SETTINGS, DEFAULT_STOCK_ITEMS_LIMIT, DEFAULT_TICKET_ITEMS_LIMIT, DB_OPTIONS, DEFAULT_SCHEMA_TYPE, STATE_LOADING_START, STATE_LOADING_DONE, STATE_LOADING_FAILED } from 'ui/constants';
import * as themes from 'ui/containers/ThemeProvider/themes';
import { DEFAULT_THEME } from 'ui/containers/ThemeProvider/constants';
import {
  DEFAULT_LOCALE,
} from 'ui/containers/App/constants'; // eslint-disable-line
import { getQueryParams } from 'ui/utils/url';

let db;

const { theme } = getQueryParams(window.location.search);

export const ResetDatabase = async () => {
  db.db.remove();
  db = await kalzateDB(DB_OPTIONS, DEFAULT_SCHEMA_TYPE);
};
export const Stock = () => db.stock;
export const Settings = () => db.settings;
export const Tickets = () => db.tickets;
export const Charts = () => db ? db.charts : db;

const initFromDB = (load) => (store) => {
  store.dispatch({
    type: STATE_LOADING_START,
  });
  load(store).then(
    (state) => {
      store.dispatch({
        type: STATE_LOADING_DONE,
        payload: { state },
      });
    },
    (error) => {
      store.dispatch({
        type: STATE_LOADING_FAILED,
        payload: { error },
      });
    }
  );
  return (next) => (action) => next(action);
};

const loadStoreFromDatabase = (store) =>
  new Promise(async (resolve) => {
    // Get initialState({settings, tickets, stock, ticket, insights})
    db = await kalzateDB(DB_OPTIONS, DEFAULT_SCHEMA_TYPE);
    const state = {
      settings: merge({}, DEFAULT_SETTINGS, await db.settings.init()),
      tickets: await db.tickets.query(db.tickets.queries.dailyTickets(DEFAULT_TICKET_ITEMS_LIMIT, 0)),
      stock: await db.stock.get({ limit: DEFAULT_STOCK_ITEMS_LIMIT, skip: 0 }),
      charts: await db.charts.init(),
    };

    state.theme = {
      theme: theme && themes[theme] ? themes[theme] : themes[state.settings.theme] || themes[DEFAULT_THEME],
      name: theme || state.settings.theme || DEFAULT_THEME,
    };

    state.language = {
      locale: state.settings.lang || DEFAULT_LOCALE,
    };

    const currentState = store.getState();
    resolve({ ...currentState, ...state });
  });

export const databaseAsyncReducer = (reducers) => (state, action) => {
  if (action.type === STATE_LOADING_DONE) {
    return reducers(action.payload.state, action);
  }
  return reducers(state, action);
};

export default initFromDB(loadStoreFromDatabase);
