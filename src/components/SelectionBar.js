import React from 'react';
import { ToolButton } from './ToolButton';
import { t } from '../translations';

export const SelectionBar = ({
  onCut,
  onCopy,
  onPaste,
  onDelete
}) => {
  return <div className="SelectionBar">
    <ToolButton
      image="cut"
      title={t('cutToolLabel')}
      onClick={onCut}>
      {t('cutButtonText')}
    </ToolButton>

    <ToolButton
      image="copy"
      title={t('copyToolLabel')}
      onClick={onCopy}>
      {t('copyButtonText')}
    </ToolButton>

    <ToolButton
      image="paste"
      title={t('pasteToolLabel')}
      onClick={onPaste}>
      {t('pasteButtonText')}
    </ToolButton>

    <ToolButton
      image="delete"
      title={t('deleteToolLabel')}
      onClick={onDelete}>
      {t('deleteButtonText')}
    </ToolButton>
  </div>;
}
