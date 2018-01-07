import React from 'react';

export const ToolButton = ({
  image,
  active,
  children,
  className,
  ...props
}) => {
  return <button {...{
    type: 'button',
    className: 'ToolButton' + (active ? ' is-active' : '') + ' ' + className,
    style: { backgroundImage: `url(assets/${image}.png)` },
    ...props
  }}>
    {children}
  </button>;
}
