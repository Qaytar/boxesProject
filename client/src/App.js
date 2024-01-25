import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AppPage from "./pages/AppPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import OAuth2Callback from '.pages/OAuth2Callback';
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contextsAndHooks/authContext';
import { LifeBoardDataProvider } from "./contextsAndHooks/lifeBoardDataContext";


function App() {
  return (
    <AuthProvider>
      <LifeBoardDataProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
          <Route path="/oauth2callback" element={<OAuth2Callback />} />
        </Routes>
      </LifeBoardDataProvider>
    </AuthProvider>
  )
}

export default App;
