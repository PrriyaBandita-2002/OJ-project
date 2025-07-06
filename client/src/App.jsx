import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/home";
import Dashboard from "./pages/Dashboard";
import Compiler from "./pages/Compiler";
import ProblemsList from "./pages/ProblemsList";
import ProblemDetail from "./pages/ProblemDetail";
import AddProblem from "./pages/adminacess/AddProblem";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/adminacess/AdminDashboard";
import Contest from "./pages/Contest";
import ContestDetail from "./pages/ContestDetail";
import CreateContest from "./pages/adminacess/CreateContest";
import EditProblem from "./pages/adminacess/EditProblem";
import Submission from "./pages/submission";
function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/problemslist" element={<ProblemsList />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path="/compiler" element={<Compiler />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-contest"
          element={
            <AdminRoute>
              <CreateContest />
            </AdminRoute>
          }
        />

        <Route
          path="/contests"
          element={
            <ProtectedRoute>
              <Contest />
            </ProtectedRoute>
          }
        />
 <Route
          path="/submission"
          element={
            <ProtectedRoute>
              <Submission/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contests/:id"
          element={
            <ProtectedRoute>
              <ContestDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
     <Route
  path="/edit-problem/:id"
  element={
    <AdminRoute>
      <EditProblem />
    </AdminRoute>
  }
/>
        <Route
          path="/add-problem"
          element={
            <AdminRoute>
              <AddProblem />
            </AdminRoute>
          }
        />
        {/* <Route
          path="/problems/:id"
          element={
            <ProtectedRoute>
              <ProblemDetail />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
