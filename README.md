
# Legal Workflow Manager [CaseMaster]

## Overview
Legal Workflow Manager (CaseMaster) is a comprehensive case management system tailored to streamline and optimize the workflows of in-house legal departments. The platform integrates legal matter management, case tracking, staff profile management, and email handling in a unified interface. With Microsoft Office integration, automated case imports, and a dashboard that highlights case statuses, it aims to enhance the efficiency of legal professionals.

## Features

### 1. Sign-in and User Profiles
- **Microsoft Office Login**: Users sign in using their Microsoft Office accounts.
- **Staff Profiles**: The admin can create staff profiles with PIN protection, ensuring all actions are logged and tracked.
- **PIN Recovery**: Forgot PIN functionality sends a recovery code to personal emails.
  
### 2. Dashboard
- **Summary of Legal Matters**: Displays open, closed, overdue, and archived cases.
- **Upcoming Deadlines**: Notifications and calendar views for deadlines and alerts.
- **Recent Activities Feed**: Shows the latest case updates, file changes, and emails.
- **Audit Logs**: Tracks changes made to cases by the admin and staff.
- **To-Do List**: Shared tasks list to assist collaboration.

### 3. Email Management
- **Integrated Email System**: Compose, send, and manage emails without leaving the application.
- **Attachment Handling**: Upload from computer or OneDrive, attach files directly to logbooks and case trackers.
- **Case Import**: Import cases from emails into the logbook manually.

### 4. Logbook
- **Email & Manual Input**: Cases are organized by either email imports or manual inputs.
- **Case Details**: Track case number, title, filer, date/time, and status.
- **Attachments**: Email attachments are easily imported into the system.
  
### 5. Case Tracker
- **Notion-style Table View**: Provides an easy-to-navigate table for managing case details such as incident, status, deadlines, and notes.

### 6. Profile Management
- **Profile Editing**: Users and admins can update profile details, including profile pictures, names, emails, and PINs.
- **Staff Management**: Admins can add/delete staff profiles and view audit logs.

### 7. Archive
- **Unified Repository**: All archived items are stored in one place, allowing users to easily restore them.

### 8. Notification System
- **Case Alerts**: Notifications for upcoming deadlines, missed deadlines, and case updates.

## Tech Stack

### Front-End
- **React**: User interface development.
- **Redux / Redux-Saga**: State management.
- **Material-UI**: UI components and icons.
- **Styled-components**: CSS-in-JS for styling.

### Back-End
- **Electron**: For desktop application functionality.
- **MySQL & Sequelize**: Database and ORM.
- **Express**: Back-end services.

### Dev Tools & Utilities
- **Webpack**: Bundling JavaScript.
- **Electron-builder**: Packaging the Electron app.
- **UUID, Shorthash**: For unique identifiers.
- **Moment.js**: Date handling.
- **Formik & Yup**: Form handling and validation.
- **Rimraf, mkdirp**: File system operations.
- **Concurrently, Wait-on**: For running multiple processes.

### Testing
- **ESLint & Prettier**: Code linting and formatting.
- **Jest**: Testing framework for JavaScript.

## Installation and Setup
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the development server using `npm start`.
4. Build the application using `npm run build`.

## Contributions
Feel free to submit issues or pull requests to improve the system.

## License
This project is licensed under the MIT License.

