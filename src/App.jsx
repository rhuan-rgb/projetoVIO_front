import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListUsers from "./pages/listUsers";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ListEventos from "./pages/listEventos";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <ListUsers />
                {/* esse é o children */}
              </ProtectedRoute>
            }
          />

          <Route
            path="eventos"
            element={
              <ProtectedRoute>
                <ListEventos/>
              </ProtectedRoute>
            }
          />
          <Route
          path="/CreateEvent"
          element={
            
              <CreateEvent/>
            
          }
          />
        </Routes> 
          <Route
            path="/dashboard"
            element={<ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>}
          />
      </BrowserRouter>
    </div>
  );
}
export default App;
