/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const TableRowContainer = styled.div`
width: 100%;
height: 44px;
display: flex;
flex: 0 1 auto;
flex-direction: row;
background-color: ${(props) =>
        props.even ? 'rgba(163,168,174,0.2)' : 'rgba(163, 168, 174, 0.1)'};
color: ${(props) => (props.even ? 'white' : 'rgba(187, 183, 183, 1)')};
`;
export default TableRowContainer;
