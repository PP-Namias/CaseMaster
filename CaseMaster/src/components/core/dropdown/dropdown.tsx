import * as React from 'react';

import { DropdownContext } from './dropdown-context';

export interface DropdownProps {
  children: React.ReactNode[];
  delay?: number;
}

export function Dropdown({ children, delay = 50 }: DropdownProps): React.JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const cleanupRef = React.useRef<number>();

  const handleTriggerMouseEnter = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    clearTimeout(cleanupRef.current);
    setAnchorEl(event.currentTarget);
  }, []);

  const handleTriggerMouseLeave = React.useCallback(
    (_: React.MouseEvent<HTMLElement>) => {
      cleanupRef.current = setTimeout(() => {
        setAnchorEl(null);
      }, delay) as unknown as number;
    },
    [delay]
  );

  const handleTriggerKeyUp = React.useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setAnchorEl(event.currentTarget as unknown as HTMLElement);
    }
  }, []);

  const handlePopoverMouseEnter = React.useCallback((_: React.MouseEvent<HTMLElement>) => {
    clearTimeout(cleanupRef.current);
  }, []);

  const handlePopoverMouseLeave = React.useCallback(
    (_: React.MouseEvent<HTMLElement>) => {
      cleanupRef.current = setTimeout(() => {
        setAnchorEl(null);
      }, delay) as unknown as number;
    },
    [delay]
  );

  const handlePopoverEscapePressed = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);

  return (
    <DropdownContext.Provider
      value={{
        anchorEl,
        onPopoverMouseEnter: handlePopoverMouseEnter,
        onPopoverMouseLeave: handlePopoverMouseLeave,
        onPopoverEscapePressed: handlePopoverEscapePressed,
        onTriggerMouseEnter: handleTriggerMouseEnter,
        onTriggerMouseLeave: handleTriggerMouseLeave,
        onTriggerKeyUp: handleTriggerKeyUp,
        open,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
}
