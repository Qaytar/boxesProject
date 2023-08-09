import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AppPage from "./pages/AppPage";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/authContext';
import { LifeBoardDataProvider } from "./contexts/lifeBoardDataContext";


function App() {
  return (
    <AuthProvider>
      <LifeBoardDataProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/app" element={<AppPage />} />
        </Routes>
      </LifeBoardDataProvider>
    </AuthProvider>
  )
}

export default App;
