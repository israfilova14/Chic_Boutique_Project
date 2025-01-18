import { createBrowserRouter } from "react-router-dom"
import App from "../App"

// PRIVATE COMPONENT😊
import PrivateRoute from "../components/helpers/private_route/index.js"

// CUSTOMER ROUTES😊
import Home from "../components/pages/home";
import SignIn from '../components/pages/authentication/sign_in/index.js'
import SignUp from '../components/pages/authentication/sign_up/index.js'
import Cart from '../components/pages/cart/index.js'
import Shop from '../components/pages/shop/index.js'
import Order from '../components/pages/orders/order/index.js'
import UserOrders from '../components/pages/user/user_orders/index.js'
import Profile from '../components/pages/user/user_profile/index.js'
import Shipping from "../components/pages/orders/shipping"
import ProductDetails from '../components/pages/products/product_details/index.js'
import PlaceOrder from '../components/pages/orders/place_order/index.js'
import Favorites from '../components/pages/products/favorites/index.js'

// ADMIN ROUTES😊
import OrderList from '../components/pages/admin/order_list/index.js'
import UserList from '../components/pages/admin/user_list/index.js'
import CategoryList from '../components/pages/admin/category_list/index.js'
import ProductUpdate from '../components/pages/admin/product_update/index.js'
import AllProducts from '../components/pages/admin/all_products/index.js'
import AdminDashboard from '../components/pages/admin/admin_dashboard/index.js'
import AdminRoute from '../components/pages/admin/admin_route/index.js'
import ProductUpload from "../components/pages/admin/product_upload/index.js"

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
              element: <ProductUpload/>
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