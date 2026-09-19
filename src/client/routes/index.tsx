import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage/index.tsx";
import NotFoundPage from "../pages/NotFound/index.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
