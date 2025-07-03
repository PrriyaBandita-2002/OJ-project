import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/home';
import Dashboard from './pages/Dashboard';
import Compiler from './pages/Compiler'
import ProblemsList from './pages/ProblemsList'
import ProblemDetail from "./pages/ProblemDetail"
import AddProblem from './pages/AddProblem';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/add-problem" element={<AddProblem />} />
          <Route path="/ProblemsList" element={<ProblemsList />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
      </Routes>
    </div>
  );
}

export default App;
