import * as React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';

import { Footer } from '@/components/marketing/layout/footer';
import { MainNav } from '@/components/marketing/layout/main-nav';


import Button from '@mui/material/Button';
import { RouterLink } from '@/components/core/link';
import { paths } from '@/paths';


interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '72px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <div>
        <MainNav />







        
        <Button component={RouterLink} href={paths.dashboard.overview} variant="contained">
              Dashboard
        </Button>

        {children}
        <Footer />
      </div>
    </React.Fragment>
  );
}
