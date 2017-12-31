import React from 'react';
import { ToolButton } from './ToolButton';
import { t } from '../translations';

export const SelectionBar = ({
}) => {
  return <div className="SelectionBar">
    <ToolButton
      image="pencil2"
      title={t('cutToolLabel')}
      onClick={() => null}>
      {t('cutButtonText')}
    </ToolButton>

    <ToolButton
      image="pencil2"
      title={t('copyToolLabel')}
      onClick={() => null}>
      {t('copyButtonText')}
    </ToolButton>

    <ToolButton
      image="pencil2"
      title={t('pasteToolLabel')}
      onClick={() => null}>
      {t('pasteButtonText')}
    </ToolButton>
  </div>;
}
