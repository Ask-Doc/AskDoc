import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import GetStarted from "./components/GetStarted";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="min-h-screen w-full font-montserrat">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/chat" element={<PrivateRoute />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/getstarted" element={<PrivateRoute />}>
              <Route path="/getstarted" element={<GetStarted />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
