import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AppPage from "./pages/AppPage";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/authContext';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
