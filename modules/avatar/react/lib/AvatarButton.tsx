import * as React from 'react';
import styled from 'react-emotion';
import {AvatarStyledComponent, AvatarVariant, AvatarLocalProps} from './Avatar';
import {colors} from '@workday/canvas-kit-react-core';
import {focusRing, hideMouseFocus} from '@workday/canvas-kit-react-common';
import {SystemIconCircle, SystemIconCircleSize} from '@workday/canvas-kit-react-icon';
import {userIcon} from '@workday/canvas-system-icons-web';

export interface AvatarButtonProps
  extends AvatarLocalProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * An event handler function that gets called when the avatar is clicked
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Ref of button that the styled component renders.
   */
  buttonRef?: React.Ref<HTMLButtonElement>;
}

const AvatarAsButton = styled(AvatarStyledComponent)<AvatarButtonProps>(({variant, onClick}) => ({
  cursor: onClick ? 'pointer' : 'default',
  '&:not([disabled])': {
    '&:focus': {
      outline: 'none',
      ...(variant === AvatarVariant.Dark ? focusRing(2, 2) : focusRing(2)),
    },
  },
  ...hideMouseFocus,
})).withComponent('button');

export default class AvatarButton extends React.Component<AvatarButtonProps> {
  static Variant = AvatarVariant;
  static Size = SystemIconCircleSize;

  static defaultProps = {
    variant: AvatarVariant.Light,
    size: SystemIconCircleSize.m,
    altText: 'Avatar',
  };

  render() {
    const {buttonRef, variant, altText, size, url, onClick, ...elemProps} = this.props;

    const background = variant === AvatarVariant.Dark ? colors.blueberry400 : colors.soap300;

    return (
      <AvatarAsButton
        variant={variant}
        size={size}
        url={url}
        altText={altText}
        onClick={onClick}
        disabled={onClick ? false : true}
        innerRef={buttonRef}
        aria-label={altText}
        {...elemProps}
      >
        {url ? (
          <img src={url} alt={altText} />
        ) : (
          <SystemIconCircle icon={userIcon} background={background} size={size} />
        )}
      </AvatarAsButton>
    );
  }
}
