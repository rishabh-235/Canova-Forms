import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "./redux/slices/api/user.api";
import { useEffect } from "react";
import {
  setUser,
  signout,
  setInitialized,
} from "./redux/slices/state/user.stateslice";
import ResponseForm from "./pages/ResponsePages/ResponseForm";
import ResponseMainPage from "./pages/ResponsePages/ResponseMainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isPublicRoute =
    location.pathname.startsWith("/response-form") ||
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/forgot-password");
  const { data, error, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: isPublicRoute,
  });
  useEffect(() => {
    if (isPublicRoute) {
      dispatch(setInitialized());
    } else if (data?.success && data?.user) {
      dispatch(setUser(data.user));
    } else if (error) {
      dispatch(signout());
    } else if (!isLoading && !data && !error) {
      dispatch(setInitialized());
    }
  }, [data, error, isLoading, dispatch, isPublicRoute]);
  useEffect(() => {
    if (isPublicRoute) {
      dispatch(setInitialized());
    } else if (data?.success && data?.user) {
      dispatch(setUser(data.user));
    } else if (error) {
      dispatch(signout());
    } else if (!isLoading && !data && !error) {
      dispatch(setInitialized());
    }
  }, [data, error, isLoading, dispatch, isPublicRoute]);
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainPage />}>
          <Route index element={<HomePage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="analysis/projects" element={<ProjectAnalysisPage />} />
          <Route path="analysis/forms" element={<FormAnalysisPage />} />
          <Route path="projects" element={<ProjectPage />} />
          <Route
            path="projects/:projectname/:projectid"
            element={<FormListPage />}
          />
        </Route>
        <Route path="/profile" element={<ProfileMainPage />}>
          <Route index element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/create-form/:id" element={<CreateFormMainPage />}>
          <Route path=":pageNo" element={<CreateFormPage />} />
          <Route path="flow-chart" element={<FormFlowChartPage />} />
          <Route path="preview" element={<FormPreviewPage />} />
        </Route>
      </Route>
      <Route path="/forgot-password" element={<ForgetPasswordPage />}>
        <Route index element={<SendEmailPage />} />
        <Route path="verify-otp" element={<EnterOTPPage />} />
        <Route path="create-password" element={<CreatePasswordPage />} />
      </Route>
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/response-form/:responseFormId"
        element={<ResponseMainPage />}
      >
        <Route path=":pageId" element={<ResponseForm />} />
      </Route>
    </Routes>
  );
}
function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}
export default App;
