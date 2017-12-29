import React from 'react';
import { ToolButton } from './ToolButton';
import { t } from '../translations';

export class Toolbar extends React.Component {
  render() {
    const {
      mode,
      changeMode,
      onUndo,
      onRedo,
      canUndo,
      canRedo
    } = this.props;

    return <div className="Toolbar" role="toolbar">
      <ToolButton
        image="pencil2"
        title={t('drawToolLabel')}
        active={mode === 'draw'}
        onClick={() => changeMode('draw')}>
        {t('drawButtonText')}
      </ToolButton>

      <ToolButton
        image="bucket3"
        title={t('fillToolLabel')}
        active={mode === 'fill'}
        onClick={() => changeMode('fill')}>
        {t('fillButtonText')}
      </ToolButton>

      <ToolButton
        image="selection2"
        title={t('selectToolLabel')}
        active={mode === 'select'}
        onClick={() => changeMode('select')}>
        {t('selectButtonText')}
      </ToolButton>

      <ToolButton
        image="undo"
        title={t('undoButtonLabel')}
        disabled={!canUndo}
        onClick={onUndo}>
        {t('undoButtonText')}
      </ToolButton>

      <ToolButton
        image="redo"
        title={t('redoButtonLabel')}
        disabled={!canRedo}
        onClick={onRedo}>
        {t('redoButtonText')}
      </ToolButton>
    </div>;
  }
}
