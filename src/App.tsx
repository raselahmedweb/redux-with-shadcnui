import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="mx-40">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
