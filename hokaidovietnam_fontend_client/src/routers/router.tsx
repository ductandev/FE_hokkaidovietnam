import { createBrowserRouter } from "react-router-dom";
import {
  ProductDetailPage,
  HomePage,
  ProductListPage,
  BrandPage,
  ContactPage,
  CartPage,
  // LoginPage,
  // ProfilePage,
  // RegisterPage,
  // SearchPage
} from "../Pages";
import HomeTemplate from "../Templates/HomeTemplate";
import Media from "@/Pages/Media";
import { Terms } from "@/Components/Tems/Terms";
import { Shopping } from "@/Components/Shopping/Shopping";
import { Payments } from "@/Components/Payments/Payments";
import { Shipping } from "@/Components/Shipping/Shipping";
import { Return } from "@/Components/Return/Return";
import { Privacy } from "@/Components/Privacy/Privacy";

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
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/shopping",
        element: <Shopping />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/shipping",
        element: <Shipping />,
      },
      {
        path: "/return",
        element: <Return />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
