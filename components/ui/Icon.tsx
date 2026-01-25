import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { CSSProperties } from 'react';

type CSSVariables = { [key: `--fa-font-${string}`]: string };

interface IconProps {
  icon: IconProp;
  size?: SizeProp;
  className?: string;
  style?: (CSSProperties & CSSVariables);
  spin?: boolean;
  pulse?: boolean;
  fixedWidth?: boolean;
  inverse?: boolean;
  rotation?: 90 | 180 | 270;
  flip?: 'horizontal' | 'vertical' | 'both';
}

export function Icon({
  icon,
  size,
  className = '',
  style,
  spin = false,
  pulse = false,
  fixedWidth = false,
  inverse = false,
  rotation,
  flip,
}: IconProps) {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      className={className}
      style={style}
      spin={spin}
      pulse={pulse}
      fixedWidth={fixedWidth}
      inverse={inverse}
      rotation={rotation}
      flip={flip}
    />
  );
}
