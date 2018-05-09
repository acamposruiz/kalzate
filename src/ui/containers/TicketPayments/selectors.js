import { createSelector } from 'reselect';

/**
 * Direct selector to the ticketPayments state domain
 */
const selectTicketPaymentsDomain = () => (state) => state.get('ticket');

/**
 * Other specific selectors
 */

/**
 * Default selector used by TicketPayments
 */

const makeSelectTicketPayments = () =>
  createSelector(selectTicketPaymentsDomain(), (substate) =>
    substate.get('payment')
  );

export default makeSelectTicketPayments;
export { selectTicketPaymentsDomain };
