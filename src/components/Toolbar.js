import React from 'react';
import { ToolButton } from './ToolButton';
import { t } from '../translations';

export const ToolBar = ({
  mode,
  movingGhost,
  changeMode,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onSave,
  selectionActive,
  canPaste,
  onCut,
  onCopy,
  onPaste
}) => {
  return <div className="ToolBar" role="toolbar">
    <ToolButton
      image="pencil"
      title={t('drawToolLabel')}
      active={mode === 'draw'}
      disabled={movingGhost}
      onClick={() => changeMode('draw')}>
      {t('drawButtonText')}
    </ToolButton>

    <ToolButton
      image="bucket"
      title={t('fillToolLabel')}
      active={mode === 'fill'}
      disabled={movingGhost}
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
      disabled={movingGhost}
      onClick={() => changeMode('recolor')}>
      {t('recolorButtonText')}
    </ToolButton>

    <div style={{flexGrow: 1}}/>

    <ToolButton
      image="cut"
      title={t('cutToolLabel')}
      disabled={!selectionActive || movingGhost}
      onClick={onCut}>
      {t('cutButtonText')}
    </ToolButton>

    <ToolButton
      image="copy"
      title={t('copyToolLabel')}
      disabled={!selectionActive || movingGhost}
      onClick={onCopy}>
      {t('copyButtonText')}
    </ToolButton>

    <ToolButton
      image="paste"
      title={t('pasteToolLabel')}
      disabled={!canPaste || movingGhost}
      onClick={onPaste}>
      {t('pasteButtonText')}
    </ToolButton>

    <div style={{flexGrow: 1}}/>

    <ToolButton
      image="undo"
      title={t('undoButtonLabel')}
      disabled={!canUndo || movingGhost}
      onClick={onUndo}>
      {t('undoButtonText')}
    </ToolButton>

    <ToolButton
      image="redo"
      title={t('redoButtonLabel')}
      disabled={!canRedo || movingGhost}
      onClick={onRedo}>
      {t('redoButtonText')}
    </ToolButton>

    <ToolButton
      image="save"
      title={t('saveButtonLabel')}
      disabled={movingGhost}
      onClick={onSave}>
      {t('saveButtonText')}
    </ToolButton>
  </div>;
}
