import { createBrowserRouter } from "react-router-dom";
import {
  ProductDetailPage,
  HomePage,
  ProductListPage,
  BrandPage,
  ContactPage,
  // CartPage,
  // LoginPage,
  // ProfilePage,
  // RegisterPage,
  // SearchPage
} from "../Pages";
import HomeTemplate from "../Templates/HomeTemplate";
import Media from "@/Pages/Media";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeTemplate,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductListPage />,
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
        path: "/media",
        element: <Media />,
      },
    ],
  },
]);

export default router;
