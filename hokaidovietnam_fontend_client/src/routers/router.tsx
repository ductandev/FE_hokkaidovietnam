import { createBrowserRouter } from "react-router-dom";
import {
  ProductDetailPage,
  HomePage,
  ProductListPage,
  BrandPage,
  ContactPage,
  PaymentPage,
  // CartPage,
  // LoginPage,
  // ProfilePage,
  // RegisterPage,
  // SearchPage
} from "../Pages";
import HomeTemplate from "../Templates/HomeTemplate";

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
        element: <BrandPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
    ]
  },

]);

export default router;