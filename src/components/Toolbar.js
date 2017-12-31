import React from 'react';
import { ToolButton } from './ToolButton';
import { t } from '../translations';

export const ToolBar = ({
  mode,
  changeMode,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onSave,
  onExport
}) => {
  return <div className="ToolBar" role="toolbar">
    <ToolButton
      image="pencil"
      title={t('drawToolLabel')}
      active={mode === 'draw'}
      onClick={() => changeMode('draw')}>
      {t('drawButtonText')}
    </ToolButton>

    <ToolButton
      image="bucket"
      title={t('fillToolLabel')}
      active={mode === 'fill'}
      onClick={() => changeMode('fill')}>
      {t('fillButtonText')}
    </ToolButton>

    <ToolButton
      image="selection"
      title={t('selectToolLabel')}
      active={mode === 'select'}
      onClick={() => changeMode('select')}>
      {t('selectButtonText')}
    </ToolButton>

    <ToolButton
      image="recolor"
      title={t('recolorToolLabel')}
      active={mode === 'recolor'}
      onClick={() => changeMode('recolor')}>
      {t('recolorButtonText')}
    </ToolButton>

    <div style={{flexGrow: 1}}/>

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

    <ToolButton
      image="save"
      title={t('saveButtonLabel')}
      onClick={onSave}>
      {t('saveButtonText')}
    </ToolButton>

    <ToolButton
      image="export"
      title={t('exportButtonLabel')}
      onClick={onExport}>
      {t('exportButtonText')}
    </ToolButton>
  </div>;
}
