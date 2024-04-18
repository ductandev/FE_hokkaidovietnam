import { createBrowserRouter } from "react-router-dom";
import {
  ProductDetailPage,
  HomePage,
  ProductListPage,
  // BrandPage,
  // CartPage,
  // ContactPage,
  // LoginPage,
  // ProfilePage,
  // RegisterPage,
  // SearchPage
} from "../Pages";
import HomeTemplate from "../Templates/HomeTemplate";
import Brand from "@/Pages/Brand";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeTemplate,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/products",
        element: <ProductListPage />
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/brand",
        element: <Brand />,
      },
    ]
  },

]);

export default router;