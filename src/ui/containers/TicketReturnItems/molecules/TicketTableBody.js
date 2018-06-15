/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import TicketTableBodyContainer from '../atoms/TicketTableBodyContainer';
import HeightAdapterContainer from '../atoms/HeightAdapterContainer';
import TicketTableRowContainer from '../atoms/TicketTableRowContainer';
import TicketTableField from './TicketTableField';
import TicketTableAmountField from './TicketTableAmountField';
import TicketTableButton from './TicketTableButton';

export class TicketTableBody extends React.Component {

  abbrv(type, value) {
    switch (type) {
      case 'COLORS':
      case 'GENDER':
      case 'BRAND':
        return value ? value.substring(0, 3) : '';
      default: return value;
    }
  }


  render() {
    return (
      <HeightAdapterContainer>
        <TicketTableBodyContainer>
          {this.props.ticket.items.map((item, i) => (
            <TicketTableRowContainer key={i} even={(i + 1) % 2} highlight={item.amount_return}>
              <TicketTableField placeholder={item.reference} readonly />
              <TicketTableField placeholder={`${this.abbrv('BRAND', item.brand)}-${item.colors.map((c) => this.abbrv('COLORS', c)).join()} (${item.size}-${this.abbrv('BRAND', item.gender)})`} readonly bigger />
              <TicketTableField placeholder={item.price.toFixed(2)} readonly />
              <TicketTableAmountField
                placeholder={item.amount || '0'}
                value={
                  this.props.tmp[item.reference] && this.props.tmp[item.reference].amount
                    ? this.props.tmp[item.reference].amount
                    : ''
                }
                onChange={(amount) =>
                  this.props.updateTmpData(item.reference, {
                    amount: parseInt(amount, 10),
                  })
                }
                onBlur={(e) => {
                  if (this.props.tmp[item.reference] && this.props.tmp[item.reference].amount) {
                    this.props.updateTicketData(item, {
                      amount: this.props.tmp[item.reference].amount,
                    });
                  }
                }}
              />
              <TicketTableField placeholder={(item.price * item.amount).toFixed(2)} readonly />
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
