'use client';

import * as React from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { Tip } from '@/components/core/tip';

function wait(time: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

interface Article {
  id: string;
  description: string;
  title: string;
  category: string;
}

const articles: Record<string, Article[]> = {
  Platform: [
    {
      id: 'ART-1',
      description:
        'Provide your users with the content they need, exactly when they need it, by building a next-level site search experience using our AI-powered search API.',
      title: 'Level up your site search experience with our hosted API',
      category: 'Users / Api-usage',
    },
    {
      id: 'ART-2',
      description:
        'Algolia is a search-as-a-service API that helps marketplaces build performant search experiences at scale while reducing engineering time.',
      title: 'Build performant marketplace search at scale',
      category: 'Users / Api-usage',
    },
  ],
  Resources: [
    {
      id: 'ART-3',
      description: "Algolia's architecture is heavily redundant, hosting every application on …",
      title: "Using NetInfo API to Improve Algolia's JavaScript Client",
      category: 'Resources / Blog posts',
    },
    {
      id: 'ART-4',
      description: 'Explore the intricacies of building high-performance applications with Algolia.',
      title: 'Build performance',
      category: 'Resources / UI libraries',
    },
  ],
};

export interface SearchDialogProps {
  onClose?: () => void;
  open?: boolean;
}

export function SearchDialog({ onClose, open = false }: SearchDialogProps): React.JSX.Element {
  const [value, setValue] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [displayArticles, setDisplayArticles] = React.useState<boolean>(false);

  const handleSubmit = React.useCallback(async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setDisplayArticles(false);
    setIsLoading(true);
    // Do search here
    await wait(1500);
    setIsLoading(false);
    setDisplayArticles(true);
  }, []);

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2 }}>
        <Typography variant="h6">Search</Typography>
        <IconButton onClick={onClose}>
          <XIcon />
        </IconButton>
      </Stack>
      <DialogContent>
        <Stack spacing={3}>
          <Tip message="Search by entering a keyword and pressing Enter" />
          <form onSubmit={handleSubmit}>
            <OutlinedInput
              fullWidth
              label="Search"
              onChange={(event) => {
                setValue(event.target.value);
              }}
              placeholder="Search..."
              startAdornment={
                <InputAdornment position="start">
                  <MagnifyingGlassIcon />
                </InputAdornment>
              }
              value={value}
            />
          </form>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : null}
          {displayArticles ? (
            <Stack spacing={2}>
              {Object.keys(articles).map((group) => (
                <Stack key={group} spacing={2}>
                  <Typography variant="h6">{group}</Typography>
                  <Stack divider={<Divider />} sx={{ border: '1px solid var(--mui-palette-divider)', borderRadius: 1 }}>
                    {articles[group].map((article) => (
                      <Stack key={article.id} spacing={1} sx={{ p: 2 }}>
                        <div>
                          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', pl: 1 }}>
                            <Badge color="primary" variant="dot" />
                            <Typography variant="subtitle1">{article.title}</Typography>
                          </Stack>
                          <Typography color="text.secondary" variant="body2">
                            {article.category}
                          </Typography>
                        </div>
                        <Typography color="text.secondary" variant="body2">
                          {article.description}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          ) : null}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
