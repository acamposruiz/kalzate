/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import Center from 'ui/components/Center';
import NotFound from 'ui/components/NotFound';
import TicketBodyContainer from '../atoms/TicketBodyContainer';
import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';
import TicketTable from './TicketTable';
import messages from '../messages';

export class TicketBody extends React.Component {

  render() {
    return (
      <TicketBodyContainer>
        {isEmpty(this.props.ticket.items) &&
          <Center>
            <NotFound icon="thumbsdown">
              <Title>
              <FormattedMessage {...messages.notFound} />
          </Title>
              <Subtitle>
              <FormattedMessage {...messages.notFoundHelp} />
          </Subtitle>
            </NotFound>
          </Center>}

        {!isEmpty(this.props.ticket.items) && (
          <TicketTable {...this.props} />
        )}
      </TicketBodyContainer>
    );
  }
}

TicketBody.propTypes = {};

export default TicketBody;
