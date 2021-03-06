/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { DEFAULT_STOCK_ITEMS_LIMIT } from 'ui/constants';
import {
  REFRESH_STOCK_SUCCESS_ACTION,
  UPDATE_STOCK_SUCCESS_ACTION,
} from 'ui/containers/StockItems/constants';

// The initial state of the App
const initialState = {
  items: [],
  total: 0,
  limit: DEFAULT_STOCK_ITEMS_LIMIT,
  skip: 0,
};

function updateStock(state, action) {
  return {
    ...state,
    items: state.items.map((stockItem) =>
      stockItem.reference === action.stock.reference
        ? action.stock
        : stockItem),
  };
}

function refreshStock(state, action) {
  return action.stock;
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STOCK_SUCCESS_ACTION:
      return updateStock(state, action);
    case REFRESH_STOCK_SUCCESS_ACTION:
      return refreshStock(state, action);
    default:
      return state;
  }
}

export default appReducer;
