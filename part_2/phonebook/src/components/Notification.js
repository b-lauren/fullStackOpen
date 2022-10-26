import React from 'react';

export const Notification = ({ message }) => {
  const notificationStyling = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  }
  return <div style={notificationStyling}>{message}</div>;
};
