import { Route, Routes } from "react-router";
import MoviePlayer from "./MoviePlayer";

export default function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-bodyBg overflow-hidden">
        <Routes>
          <Route path="/:id" element={<MoviePlayer />} />
        </Routes>
      </div>
    </>
  );
}
