import React from 'react';

export class ToolButton extends React.Component {
  render() {
    const {
      image,
      active,
      children,
      ...props
    } = this.props;

    const className = [
      'ToolButton',
      active && 'is-active'
    ].filter(i => i).join(' ');

    return <button
      type="button"
      className={className}
      style={{
        backgroundImage: `url(assets/${image}.png)`
      }}
      {...props}>
      {children}
    </button>;
  }
}
