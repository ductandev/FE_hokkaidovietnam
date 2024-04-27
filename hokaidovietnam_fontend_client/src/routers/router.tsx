import { createBrowserRouter } from "react-router-dom";
import {
  ProductDetailPage,
  HomePage,
  ProductListPage,
  BrandPage,
  ContactPage,
  PaymentPage,
  CartPage,
  MediaPage,
  // LoginPage,
  // ProfilePage,
  // RegisterPage,
  // SearchPage
} from "../Pages";
import HomeTemplate from "../Templates/HomeTemplate";

import { Terms } from "@/Components/Tems/Terms";
import { Shopping } from "@/Components/Shopping/Shopping";
import { PaymentsMethod } from "@/Components/Payments/Payments";
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
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/media",
        element: <MediaPage />,
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
        path: "/payments-method",
        element: <PaymentsMethod />,
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
    ],
  },
]);

export default router;
