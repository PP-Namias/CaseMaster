import * as React from 'react';

import { DropdownContext } from './dropdown-context';

export interface DropdownButtonProps {
  children: React.ReactElement;
}

export function DropdownTrigger({ children }: DropdownButtonProps): React.JSX.Element {
  const { onTriggerMouseEnter, onTriggerMouseLeave, onTriggerKeyUp } = React.useContext(DropdownContext);

  return React.cloneElement(children, {
    onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => {
      (children.props as { onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void }).onKeyUp?.(event);
      onTriggerKeyUp(event);
    },
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      (children.props as { onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void }).onMouseEnter?.(event);
      onTriggerMouseEnter(event);
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      (children.props as { onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void }).onMouseLeave?.(event);
      onTriggerMouseLeave(event);
    },
  });
}
