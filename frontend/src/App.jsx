import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPages/AnalysisPage";
import ProjectPage from "./pages/ProjectPages/ProjectPage";
import ProfilePage from "./pages/ProfilePages/ProfilePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPages/ForgetPasswordPage";
import SendEmailPage from "./pages/ForgetPasswordPages/SendEmailPage";
import EnterOTPPage from "./pages/ForgetPasswordPages/EnterOTPPage";
import CreatePasswordPage from "./pages/ForgetPasswordPages/CreatePasswordPage";
import ProjectAnalysisPage from "./pages/AnalysisPages/ProjectAnalysisPage";
import FormAnalysisPage from "./pages/AnalysisPages/FormAnalysisPage";
import FormListPage from "./pages/ProjectPages/FormListPage";
import ProfileMainPage from "./pages/ProfilePages/ProfileMainPage";
import SettingsPage from "./pages/ProfilePages/SettingsPage";
import CreateFormPage from "./pages/CreateFormPages/CreateFormPage";
import CreateFormMainPage from "./pages/CreateFormPages/CreateFormMainPage";
import FormFlowChartPage from "./pages/CreateFormPages/FormFlowChartPage";
import FormPreviewPage from "./pages/CreateFormPages/FormPreviewPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={true} />}>
          <Route path="/" element={<MainPage />}>
            <Route index element={<HomePage />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="analysis/projects" element={<ProjectAnalysisPage />} />
            <Route path="analysis/forms" element={<FormAnalysisPage />} />
            <Route path="projects" element={<ProjectPage />} />
            <Route path="projects/forms" element={<FormListPage />} />
          </Route>
          <Route path="/profile" element={<ProfileMainPage />}>
            <Route index element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="/create-form" element={<CreateFormMainPage />}>
            <Route path=":id" element={<CreateFormPage />} />
            <Route path="flow-chart" element={<FormFlowChartPage />} />
          </Route>
        </Route>
        <Route path="/forget-password" element={<ForgetPasswordPage />}>
          <Route index element={<SendEmailPage />} />
          <Route path="verify-otp" element={<EnterOTPPage />} />
          <Route path="create-password" element={<CreatePasswordPage />} />
        </Route>
        <Route path="/preview" element={<FormPreviewPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
