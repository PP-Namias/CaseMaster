import type { RouteObject } from 'react-router-dom';

import { route as auth0Route } from './auth0';
import { route as cognitoRoute } from './cognito';
import { route as customRoute } from './custom';
import { route as firebaseRoute } from './firebase';
import { route as samplesRoute } from './samples';
import { route as supabaseRoute } from './supabase';

export const route: RouteObject = {
  path: 'auth',
  children: [auth0Route, cognitoRoute, customRoute, firebaseRoute, samplesRoute, supabaseRoute],
};
