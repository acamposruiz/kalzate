/*
 *
 * WorkSpacePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import TicketItems from 'ui/containers/TicketItems';
import TicketReturnItems from 'ui/containers/TicketReturnItems';
import TicketTotal from 'ui/containers/TicketTotalContainer';
import TicketPayments from 'ui/containers/TicketPaymentsContainer';
import StockItems from 'ui/containers/StockItems';
import { Grid, Row2, Column } from 'ui/components/Grid';
import {
  makeSelectTicketTotalVisibility,
  makeSelectTicketPaymentsVisibility,
  makeSelectTicketState,
} from 'ui/containers/TicketsPage/selectors';
import { TICKET_SOLD_STATE } from 'ui/constants';

export class TicketsPage extends React.Component {
  componentDidMount() { }

  render() {
    return (
      <Grid>
        <Helmet
          title="Kalzate Ticket"
          meta={[{ name: 'description', content: 'Ticket' }]}
        />
        <Row2>
          <Column>
            {this.props.ticketState === TICKET_SOLD_STATE ? <TicketReturnItems /> : <TicketItems />}
          </Column>
          <Column w={this.props.ticketTotalVisibility ? '300px' : '25px'}>
            <TicketTotal />
          </Column>
        </Row2>
        <Row2>
          <Column>
            <StockItems />
          </Column>
          <Column w={this.props.ticketPaymentsVisibility ? '300px' : '25px'}>
            <TicketPayments />
          </Column>
        </Row2>
      </Grid>
    );
  }
}

TicketsPage.propTypes = {
  ticketTotalVisibility: PropTypes.bool,
  ticketPaymentsVisibility: PropTypes.bool,
  ticketState: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  ticketTotalVisibility: makeSelectTicketTotalVisibility(),
  ticketPaymentsVisibility: makeSelectTicketPaymentsVisibility(),
  ticketState: makeSelectTicketState(),
});

export default connect(mapStateToProps)(TicketsPage);
