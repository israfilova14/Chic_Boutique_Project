import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// PRIVATE COMPONENT
import PrivateRoute from "../components/pages/authentication/private_route"; 

// COMPONENTS
import SignIn from "../components/pages/authentication/sign_in";
import SignUp from "../components/pages/authentication/sign_up";
import Profile from "../components/pages/user_profile"; 
import Cart from "../components/pages/cart";
import Shop from "../components/pages/shop";
import Shipping from "../components/pages/orders";
import UserOrders from "../components/pages/user_orders";

// ADMIN ROUTE
import AdminRoute from "../components/pages/admin/admin_route";
import UserList from "../components/pages/admin/user_list";
import CategoryList from "../components/pages/admin/category_list";
import ProductList from "../components/pages/admin/product_list";
import ProductUpdate from "../components/pages/admin/product_update";
import AllProducts from "../components/pages/admin/all_products";
import Home from "../components/pages/home";
import Favorites from "../components/pages/favorites";
import ProductDetails from "../components/pages/product_details";
import PlaceOrder from "../components/pages/orders/place_order";
import Order from "../components/pages/orders/order";
import OrderList from "../components/pages/admin/order_list";
import AdminDashboard from "../components/pages/admin_dashboard";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/signin",
          element: <SignIn/>
        },
        {
          path: "/signup",
          element: <SignUp/>
        },
        {
          path: "/cart",
          element: <Cart/>
        },
        {
          path: "/shop",
          element: <Shop/>
        },
        {
          path: '/order/:id',
          element: <Order/>
        },
        {
          path: '/admin/order-list',
          element: <OrderList/>
        },
        {
          path: "/place-order",
          element: <PlaceOrder/>
        },
        {
          path: "/user-orders",
          element: <UserOrders/>
        },
        {
          path: "/",
          element: <PrivateRoute/>,
          children: [
            {
              path: "/profile",
              element: <Profile/>
            }
          ]
        },
        {
           path: '/favorite',
           element: <Favorites/>
        },
        {
          path: '/product/:id',
          element: <ProductDetails/>
        },
        {
          path: '/shipping',
          element: <Shipping/>
        },
        {
          path: "/admin",
          element: <AdminRoute/>,
          children: [
            {
              path: "/admin/users",
              element: <UserList/>
            },
            {
              path: "/admin/category-list",
              element: <CategoryList/>
            },
            {
              path: "/admin/upload-product",
              element: <ProductList/>
            },
            {
              path: "/admin/update-product/:_id",
              element: <ProductUpdate/>
            },
            {
              path: "/admin/all-products-list/:pageNumber",
              element: <AllProducts/>
            }, 
            {
              path: "/admin/dashboard",
              element: <AdminDashboard/>
            },
          ]
        },
    
      ]
    }
  ]
)

export default router