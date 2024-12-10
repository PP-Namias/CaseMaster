import * as React from 'react';

interface DialogController<T> {
  data?: T;
  handleClose: () => void;
  handleOpen: (data?: T) => void;
  open: boolean;
}

export function useDialog<T = unknown>(): DialogController<T> {
  const [state, setState] = React.useState<{ open: boolean; data?: T }>({ open: false, data: undefined });

  const handleOpen = React.useCallback((data?: T) => {
    setState({ open: true, data });
  }, []);

  const handleClose = React.useCallback(() => {
    setState({ open: false });
  }, []);

  return { data: state.data, handleClose, handleOpen, open: state.open };
}
