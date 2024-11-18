import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import FromEmail from "./pages/Logbook/FromEmail";
import ManualInput from "./pages/Logbook/ManualInput";
import Mails from "./pages/Mails/Mails";
import CaseTracker from "./pages/CaseTracker";
import Task from "./pages/Task";
import AllAttachments from "./pages/Attachments/AllAttachments";
import MyAttachments from "./pages/Attachments/MyAttachments";
import ArchiveAttachments from "./pages/Attachments/Archive";
import SharedWithMe from "./pages/Attachments/SharedWithMe";
import StarredAttachments from "./pages/Attachments/Starred";
import Settings from "./pages/Settings/Settings";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-7 h-screen overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/from-email" element={<FromEmail />} />
            <Route path="/manual-input" element={<ManualInput />} />
            <Route path="/mails" element={<Mails />} />
            <Route path="/all-attachments" element={<AllAttachments />} />
            <Route path="/my-attachments" element={<MyAttachments />} />
            <Route
              path="/archive-attachments"
              element={<ArchiveAttachments />}
            />
            <Route path="/shared-with-me" element={<SharedWithMe />} />
            <Route
              path="/starred-attachments"
              element={<StarredAttachments />}
            />
            <Route path="/case-tracker" element={<CaseTracker />} />
            <Route path="/task" element={<Task />} />
            <Route path="/settings" element={<Settings />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
