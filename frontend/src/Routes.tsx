import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import LoginLayout from "./Login/LoginLayout";
import ProductVariantManager from "./Product/Products";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <LoginLayout>
            <Login />
          </LoginLayout>
        }
      />
      <Route path="products" element={<ProductVariantManager />} />
    </Routes>
  );
};

export default AppRoutes;
