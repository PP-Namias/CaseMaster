import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

import type { Column } from './types';

export interface ColumnModalProps {
  column: Column;
  onClose?: () => void;
  onColumnUpdate?: (columnId: string, params: { name?: string }) => void;
  open: boolean;
}

export function ColumnModal({ column, onClose, onColumnUpdate, open }: ColumnModalProps): React.JSX.Element {
  const { id, name: initialName } = column;
  const [name, setName] = React.useState<string>('');

  React.useEffect((): void => {
    setName(initialName);
  }, [initialName]);

  const handleSave = React.useCallback((): void => {
    if (!name) {
      return;
    }

    if (name === initialName) {
      return;
    }

    onColumnUpdate?.(id, { name });
    onClose?.();
  }, [name, initialName, id, onClose, onColumnUpdate]);

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <DialogContent>
        <Stack spacing={3}>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <OutlinedInput
              name="name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                setName(event.target.value);
              }}
              value={name}
            />
          </FormControl>
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Button color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
