import { Routes, Route, useLocation } from "react-router-dom";
import Register from "../views/Register";
import Login from "../views/Login";
import Home from "../views/Home";
import { AnimatePresence } from "framer-motion";
import BookPage from "../views/BookPage";
import NewBooks from "../views/NewBooks";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/NewBooks" element={<NewBooks />} />
        <Route path="/BooksPage/:id" element={<BookPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
