import React from 'react';
import styled from 'styled-components';

export const StyledNotifications = styled.div`
  color: ${(props) => (props.alertType === 'success' ? 'green' : 'red')};
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const Notification = ({ message, alertType }) => {
  if (message === null) {
    return null;
  }
  return (
    <StyledNotifications alertType={alertType}>{message}</StyledNotifications>
  );
};
