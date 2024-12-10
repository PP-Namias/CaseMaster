import { Amplify } from 'aws-amplify';

import { config } from '@/config';

Amplify.configure({
  Auth: {
    Cognito: {
      identityPoolId: config.cognito.identityPoolId!,
      userPoolClientId: config.cognito.userPoolClientId!,
      userPoolId: config.cognito.userPoolId!,
    },
  },
});
