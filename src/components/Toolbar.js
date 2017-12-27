import React from 'react';
import { ToolButton } from './ToolButton';

export class Toolbar extends React.Component {
  render() {
    const {
      mode,
      changeMode
    } = this.props;

    return <div className="Toolbar" role="toolbar">
      <ToolButton
        id="pencil-button"
        title="Pencil tool" // TODO: localize
        checked={mode === 'pencil'}
        onSelected={() => changeMode('pencil')}>
        P
      </ToolButton>
      <ToolButton
        id="bucket-button"
         // TODO: localize
        title="Fill bucket tool"
        checked={mode === 'bucket'}
        onSelected={() => changeMode('bucket')}>
        B
      </ToolButton>
    </div>;
  }
}
