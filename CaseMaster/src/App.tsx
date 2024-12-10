import * as React from 'react';
import type { RouteObject } from 'react-router-dom';


import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import SignIn from "./pages/login/SignIn";
import DashboardPage from "./pages/dashboard/Dashboard";
import FromEmail from "./pages/caselogs/FromEmail";
import ManualInput from "./pages/caselogs/ManualInput";
import InboxMails from "./pages/mails/Inbox";
import SentMails from "./pages/mails/Sent";
import StarredMails from "./pages/mails/Starred";
import ArchiveMails from "./pages/mails/Archive";
import AllAttachments from "./pages/attachments/AllAttachments";
import MyAttachments from "./pages/attachments/MyAttachments";
import SharedWithMe from "./pages/attachments/SharedWithMe";
import StarredAttachments from "./pages/attachments/Starred";
import ArchiveAttachments from "./pages/attachments/Archive";
import CaseTracker from "./pages/casetracker/CaseTracker";
import MainLayout from "./MainLayout";
import ProfileSetup from "./pages/login/ProfileSetup";
import PINSetup from "./pages/login/PINSetup";
import Profiles from "./pages/login/Profiles";
import LoginExistingProfile from "./pages/login/ExistingProfile/LoginExistingProfile";
import ExistingProfilePin from "./pages/login/ExistingProfile/ExistingProfilePin";
import AddExistingProfile from "./pages/login/ExistingProfile/AddExistingProfile";
import ConfirmExistingProfile from "./pages/login/ExistingProfile/ConfirmExistingProfile";



import { Layout as MailLayout } from './components/dashboard/mail/layout';

import { Layout as SettingsLayout } from './components/dashboard/settings/layout';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/pin-setup" element={<PINSetup />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/login-existing-profile" element={<LoginExistingProfile/>}/>
        <Route path="/add-existing-profile" element={<AddExistingProfile/>}/>
        <Route path="/existing-profile-pin" element={<ExistingProfilePin/>}/>
        <Route path="/confirm-existing-profile" element={<ConfirmExistingProfile/>}/>

        {/* Protected Routes (with Sidebar and Header) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/caselogs/FromEmail" element={<FromEmail />} />
          <Route path="/caselogs/ManualInput" element={<ManualInput />} />
          <Route path="/mails/Inbox" element={<InboxMails />} />
          <Route path="/mails/Sent" element={<SentMails />} />
          <Route path="/mails/Starred" element={<StarredMails />} />
          <Route path="/mails/Archive" element={<ArchiveMails />} />
          <Route
            path="/attachments/AllAttachments"
            element={<AllAttachments />}
          />
          <Route
            path="/attachments/MyAttachments"
            element={<MyAttachments />}
          />
          <Route path="/attachments/SharedWithMe" element={<SharedWithMe />} />
          <Route path="/attachments/Starred" element={<StarredAttachments />} />
          <Route path="/attachments/Archive" element={<ArchiveAttachments />} />
          <Route path="/casetracker/CaseTracker" element={<CaseTracker />} />


          <Route
            path="mail"
            element={
              <MailLayout>
                <Outlet />
              </MailLayout>
            }
          >
            <Route
              path=":labelId"
              element={<Outlet />}
            >
              <Route
                index
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {React.createElement(React.lazy(() => import('./pages/mail/threads').then(module => ({ default: module.Page }))))}
                  </React.Suspense>
                }
              />
              <Route
                path=":threadId"
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {React.createElement(React.lazy(() => import('./pages/mail/thread').then(module => ({ default: module.Page }))))}
                  </React.Suspense>
                }
              />
            </Route>



        <Route
          path="settings"
          element={
            <SettingsLayout>
              <Outlet />
            </SettingsLayout>
          }
        >
          <Route path="account" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {React.createElement(React.lazy(() => import('./pages/settings/account').then(module => ({ default: module.Page }))))}
            </React.Suspense>
          } />
          <Route path="billing" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {React.createElement(React.lazy(() => import('./pages/settings/billing').then(module => ({ default: module.Page }))))}
            </React.Suspense>
          } />
          <Route path="notifications" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {React.createElement(React.lazy(() => import('./pages/settings/notifications').then(module => ({ default: module.Page }))))}
            </React.Suspense>
          } />
          <Route path="security" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {React.createElement(React.lazy(() => import('./pages/settings/security').then(module => ({ default: module.Page }))))}
            </React.Suspense>
          } />
          <Route path="team" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {React.createElement(React.lazy(() => import('./pages/settings/team').then(module => ({ default: module.Page }))))}
            </React.Suspense>
          } />
          <Route path="integrations" element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {React.createElement(React.lazy(() => import('./pages/settings/integrations').then(module => ({ default: module.Page }))))}
            </React.Suspense>
          } />
        </Route>
            
          </Route>


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
