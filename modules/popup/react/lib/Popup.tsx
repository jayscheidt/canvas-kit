import * as React from 'react';
import styled from 'react-emotion';
import {keyframes} from 'emotion';
import uuid from 'uuid/v4';

import Card from '@workday/canvas-kit-react-card';
import {IconButton, IconButtonSize} from '@workday/canvas-kit-react-button';
import {CanvasDepthValue, spacing} from '@workday/canvas-kit-react-core';
import {TransformOrigin, getTranslateFromOrigin} from '@workday/canvas-kit-react-common';
import {xIcon} from '@workday/canvas-system-icons-web';

export enum PopupPadding {
  zero = '0px',
  s = '16px',
  l = '32px',
}

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  padding: PopupPadding;
  transformOrigin: TransformOrigin;
  closeIconSize: IconButtonSize;
  popupRef?: React.Ref<HTMLDivElement>;
  handleClose?: () => void;
  width?: number | string;
  heading?: React.ReactNode;
  depth?: CanvasDepthValue;
}

const closeIconSpacing = spacing.xs;
const closeIconSpacingSmall = 10;

const popupAnimation = (transformOrigin: TransformOrigin) => {
  const translate = getTranslateFromOrigin(transformOrigin, spacing.xxs);

  return keyframes`
    0% {
      opacity: 0;
      transform: translate(${translate.x}px, ${translate.y}px);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  `;
};

const Container = styled('div')<Pick<PopupProps, 'transformOrigin' | 'width'>>(
  {
    position: 'relative',
  },
  ({width}) => width && {width},
  ({transformOrigin}) => ({
    animation: popupAnimation(transformOrigin),
    animationDuration: '150ms',
    animationTimingFunction: 'ease-out',
    transformOrigin: `${transformOrigin.vertical} ${transformOrigin.horizontal}`,
  })
);

const CloseIconContainer = styled('div')<Pick<PopupProps, 'closeIconSize'>>(
  {
    position: 'absolute',
  },
  ({closeIconSize}) => ({
    right: closeIconSize === IconButton.Size.Small ? closeIconSpacingSmall : closeIconSpacing,
    top: closeIconSize === IconButton.Size.Small ? closeIconSpacingSmall : closeIconSpacing,
  })
);

export default class Popup extends React.Component<PopupProps> {
  static Padding = PopupPadding;

  static defaultProps = {
    padding: Popup.Padding.l,
    closeIconSize: IconButton.Size.Medium,
    transformOrigin: {
      horizontal: 'center',
      vertical: 'top',
    },
  };

  private id = uuid();
  private closeButtonRef = React.createRef<any>();

  public render() {
    const {
      handleClose,
      padding,
      width,
      heading,
      depth,
      closeIconSize,
      transformOrigin,
      popupRef,
      ...elemProps
    } = this.props;

    return (
      <Container
        transformOrigin={transformOrigin}
        width={width}
        role="dialog"
        aria-labelledby={heading ? this.id : undefined}
        innerRef={popupRef}
        {...elemProps}
      >
        {handleClose && (
          <CloseIconContainer closeIconSize={closeIconSize}>
            <IconButton
              ref={this.closeButtonRef}
              variant={IconButton.Variant.Plain}
              size={closeIconSize}
              onClick={handleClose}
              icon={xIcon}
              title="Close"
              aria-label="Close"
            />
          </CloseIconContainer>
        )}
        <Card
          depth={depth}
          heading={heading}
          headingId={heading ? this.id : undefined}
          width={width}
          padding={padding}
        >
          {this.props.children}
        </Card>
      </Container>
    );
  }
}
