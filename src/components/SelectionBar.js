import React from 'react';
import { ToolButton } from './ToolButton';
import { t } from '../translations';

export const SelectionBar = ({
  selectionActive,
  canPaste,
  onCut,
  onCopy,
  onPaste
}) => {
  return <div className="SelectionBar">
    <ToolButton
      image="cut"
      title={t('cutToolLabel')}
      disabled={!selectionActive}
      onClick={onCut}>
      {t('cutButtonText')}
    </ToolButton>

    <ToolButton
      image="copy"
      title={t('copyToolLabel')}
      disabled={!selectionActive}
      onClick={onCopy}>
      {t('copyButtonText')}
    </ToolButton>

    <ToolButton
      image="paste"
      title={t('pasteToolLabel')}
      disabled={!canPaste}
      onClick={onPaste}>
      {t('pasteButtonText')}
    </ToolButton>
  </div>;
}
