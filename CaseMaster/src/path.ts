export const paths = {
    home: '/',
    dashboard: {
        overview: '/dashboard',
        settings: {
          account: '/dashboard/settings/account',
          billing: '/dashboard/settings/billing',
          integrations: '/dashboard/settings/integrations',
          notifications: '/dashboard/settings/notifications',
          security: '/dashboard/settings/security',
          team: '/dashboard/settings/team',
        },
        mail: {
          list: (label: string) => `/dashboard/mail/${label}`,
          details: (label: string, emailId: string) => `/dashboard/mail/${label}/${emailId}`,
        },
      },
    } as const;
