import React from 'react';

export const ToolButton = ({
  image,
  active,
  children,
  ...props
}) => {
  return <button {...{
    type: 'button',
    className: 'ToolButton' + (active ? ' is-active' : ''),
    style: { backgroundImage: `url(assets/${image}.png)` },
    ...props
  }}>
    {children}
  </button>;
}
