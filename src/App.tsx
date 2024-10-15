// import Login from "./components/Login";
import React from "react";
// import Sidenav from "./components/Sidenav";
import { RootState } from "./store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ModelLayout from "./components/ModelLayout";

const ProtectedRoute: React.FC<{ component: React.FC }> = ({
  component: Component,
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route
          path="/modelviewer/:projectId"
          element={<ProtectedRoute component={ModelLayout} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
