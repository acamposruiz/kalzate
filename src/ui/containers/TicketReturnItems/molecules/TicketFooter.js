/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import {
  TICKET_SAVE_STATE,
} from 'ui/constants';
import Button from 'ui/components/Button';
import TicketSectionContainer from '../atoms/TicketSectionContainer';
import Section50 from '../atoms/Section50';
import SectionLeft from '../atoms/SectionLeft';
import SectionRight from '../atoms/SectionRight';
import TicketDiscountField from './TicketDiscountField';
import TicketVatField from './TicketVatField';
export class TicketFooter extends React.Component {

  render() {
    return (
      <TicketSectionContainer>
        <Section50>
          <SectionLeft>
            <TicketVatField
              tax={this.props.ticket.tax}
              updateTax={(tax) => this.props.updateTicketTax(tax)}
            />
          </SectionLeft>
          <SectionLeft>
            <TicketDiscountField
              discount={this.props.ticket.discount}
              updateDiscount={(discount) => this.props.updateTicketDiscount(discount)}
            />
          </SectionLeft>
        </Section50>
        <Section50>
          <SectionRight>
            <Button inactive={isEmpty(this.props.ticket.items)} primary icon="trashcan" title="New Ticket" onClick={() => this.props.removeTicket()} />
            {/* Full ticket displays a modal where user can edit the final content of the ticket, useful in same cases */}
            {/* <Button icon="checklist" title="Full Ticket" /> */}
          </SectionRight>
        </Section50>
      </TicketSectionContainer>
    );
  }
}

TicketFooter.propTypes = {};

export default TicketFooter;
