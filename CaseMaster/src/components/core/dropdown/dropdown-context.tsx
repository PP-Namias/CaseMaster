import * as React from 'react';

function noop(..._: unknown[]): void {
  // Do nothing
}

export interface ContextValue {
  anchorEl: HTMLElement | null;
  onPopoverMouseEnter: (event: React.MouseEvent<HTMLElement>) => void;
  onPopoverMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
  onPopoverEscapePressed: () => void;
  onTriggerMouseEnter: (event: React.MouseEvent<HTMLElement>) => void;
  onTriggerMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
  onTriggerKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void;
  open: boolean;
}

export const DropdownContext = React.createContext<ContextValue>({
  anchorEl: null,
  onPopoverMouseEnter: noop,
  onPopoverMouseLeave: noop,
  onPopoverEscapePressed: noop,
  onTriggerMouseEnter: noop,
  onTriggerMouseLeave: noop,
  onTriggerKeyUp: noop,
  open: false,
});
