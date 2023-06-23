import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Application from "./pages/Application";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './context';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Auth />} />
        <Route path="/app" element={<Application />} />
      </Routes>
    </AuthProvider>

  )
}

export default App;
