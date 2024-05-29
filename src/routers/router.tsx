import { createBrowserRouter } from "react-router-dom";

import {
  ProductDetailPage,
  HomePage,
  ProductListPage,
  BrandPage,
  ContactPage,
  CartPage,
  MediaPage,
  ForgotPasswordPage,
  CheckoutPage,
  HistoryOrderPage
  // ProfilePage,
  // SearchPage
} from "../Pages";

import { HomeTemplate, AdminTemplate } from "@/Templates";

import Login from "@/Pages/Login";
import Register from "@/Pages/Register";

import { Terms } from "@/Components/Tems/Terms";
import { Shopping } from "@/Components/Shopping/Shopping";
import { PaymentsMethod } from "@/Components/Payments/Payments";
import { Shipping } from "@/Components/Shipping/Shipping";
import { Return } from "@/Components/Return/Return";
import { Privacy } from "@/Components/Privacy/Privacy";

// ! Admin Pages
import { AdminContact, AdminCustomer, AdminNews, AdminOrder, AdminProduct } from "@/Pages/Admin";
import Search from "@/Pages/Search";

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
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/history",
        element: <HistoryOrderPage />,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminTemplate,
    children: [
      {
        path: "order",
        element: <AdminOrder />
      },
      {
        path: "order/:id",
        element: <AdminOrder />
      },
      {
        path: "customer",
        element: <AdminCustomer />
      },
      {
        path: "product",
        element: <AdminProduct />
      },
      {
        path: "contact",
        element: <AdminContact />
      },
      {
        path: "news",
        element: <AdminNews />
      }
    ]
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/register",
    Component: Register
  },
  {
    path: "/search",
    Component: Search,
  },
]);

export default router;
