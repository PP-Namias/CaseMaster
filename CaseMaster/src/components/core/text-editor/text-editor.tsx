'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import type { EditorOptions, Extension } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import { TextEditorToolbar } from './text-editor-toolbar';

export interface TextEditorProps {
  content: EditorOptions['content'];
  editable?: EditorOptions['editable'];
  hideToolbar?: boolean;
  onUpdate?: EditorOptions['onUpdate'];
  placeholder?: string;
}

/**
 * A thin wrapper around tiptap.
 *
 * How to get the updated content:
 * ```ts
 * <TextEditor
 *   onUpdate={({ editor }) => {
 *     console.log(editor.getHTML());
 *   }}
 * />
 * ```
 */
export function TextEditor({
  content,
  editable = true,
  hideToolbar,
  onUpdate = () => {
    // noop
  },
  placeholder,
}: TextEditorProps): React.JSX.Element {
  const extensions = [
    StarterKit,
    Placeholder.configure({ emptyEditorClass: 'is-editor-empty', placeholder }),
    Link.configure({ openOnClick: false, autolink: true }),
  ] as Extension[];

  const editor = useEditor({ extensions, content, editable, onUpdate });

  return (
    <Box
      className="tiptap-root"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ...(editable && {
          border: '1px solid var(--mui-palette-divider)',
          borderRadius: 1,
          boxShadow: 'var(--mui-shadows-1)',
        }),
        '& .tiptap-container': { display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 },
        '& .tiptap': {
          color: 'var(--mui-palette-text-primary)',
          flex: '1 1 auto',
          overflow: 'auto',
          p: '8px 16px',
          '&:focus-visible': { outline: 'none' },
          '&.resize-cursor': { cursor: 'ew-resize', '& table': { cursor: 'col-resize' } },
          '& .is-editor-empty:before': {
            color: 'var(--mui-palette-text-secondary)',
            content: 'attr(data-placeholder)',
            float: 'left',
            height: 0,
            pointerEvents: 'none',
          },
        },
      }}
    >
      {!hideToolbar ? <TextEditorToolbar editor={editor} /> : <div />}
      <EditorContent className="tiptap-container" editor={editor} />
    </Box>
  );
}
