import React from 'react';

export class ToolButton extends React.Component {
  render() {
    const {
      id,
      title,
      children,
      onSelected,
      ...props
    } = this.props;

    return <div className="ToolButton">
      <input
        id={id}
        type="radio"
        className="ToolButton-input"
        name="tool-buttons"
        onChange={evt => evt.target.checked && onSelected()}
        {...props}/>
      <label
        title={title}
        htmlFor={id}
        className="ToolButton-label">
        {children}
      </label>
    </div>;
  }
}
