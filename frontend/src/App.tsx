import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position="bottom-left" />
    </BrowserRouter>
  );
}

export default App;
