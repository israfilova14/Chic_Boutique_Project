const backendDomen = process.env.REACT_APP_BACKEND_URL 

const SummaryApi = {
   //USERS ROUTES
   signUp: {
      url: `${backendDomen}/api/sign-up`,
      method: "post"
   },
   signIn: {
      url: `${backendDomen}/api/sign-in`,
      method: "post"
   },
   logout: {
      url: `${backendDomen}/api/logout-user`,
      method: "get"
   },
   profile: {
       url: `${backendDomen}/api/profile`,
       method: "get"
   },
   userUpdateProfile: {
      url: `${backendDomen}/api/profile`,
      method: "put"
   },
   allUsers: {
      url: `${backendDomen}/api/all-users`,
      method: "get"
   },
   deleteUser: {
      url: `${backendDomen}/api/admin`,
      method: "delete"
   },
   userDetails: {
      url: `${backendDomen}/api/profile`,
      method: "get"
   },
   updateUser:{
      url: `${backendDomen}/api/admin`,
      method: "put"
   },
   // CATEGORIES ROUTES
   createCategory: {
      url: `${backendDomen}/category/create-category`,
      method: "post"
   },
   updateCategory: {
      url: `${backendDomen}/category/update-category`,
      method: "put"
   },
   deleteCategory: {
      url: `${backendDomen}/category/delete-category`,
      method: "delete"
   },
   allCategories: {
      url: `${backendDomen}/category/all-categories`,
      method: "get"
   },
   currentCategory: {
      url: `${backendDomen}/category/get-category`,
      method: "get"
   },
   // PRODUCTS ROUTES
   uploadProduct: {
      url: `${backendDomen}/products/add-product`,
      method: "post"
   },
   updateProduct: {
      url: `${backendDomen}/products/update-product`,
      method: "put"
   },
   deleteProduct: {
      url: `${backendDomen}/products/delete-product`,
      method: "delete"
   },
   getProducts: {
      url: `${backendDomen}/products/get-products`,
      method: "get"
   },
   getProductById: {
      url: `${backendDomen}/products/get-product`,
      method: "get"
   },
   allProducts: {
      url: `${backendDomen}/products/all-products`,
      method: "get"
   },
   productReview: {
      url: `${backendDomen}/products/reviews`,
      method: "post"
   },
   topProducts: {
      url: `${backendDomen}/products/top-products`,
      method: "get"
   },
   newProduct: {
      url: `${backendDomen}/products/new-product`,
      method: "get"
   },
   filterProducts: {
      url: `${backendDomen}/products/filter-products`,
      method: "post"
   },
   // ORDER ROUTES
   createOrder: {
       url: `${backendDomen}/orders/create-order`,
       method: 'post'
   },
   allOrders: {
      url: `${backendDomen}/orders/all-orders`,
      method: 'get'
   },
   userOrders: {
      url: `${backendDomen}/orders/user-orders`,
      method: 'get'
   },
   countTotalOrders: {
      url: `${backendDomen}/orders/total-orders`,
      method: "get"
   },
   calculateTotalSales: {
      url: `${backendDomen}/orders/total-sales`,
      method: "get"
   },
   calculateTotalSalesByDate: {
      url: `${backendDomen}/orders/total-sales-by-date`,
      method: 'get'
   },
   findOrder: {
      url: `${backendDomen}/orders/find-order`,
      method: 'get'
   },
   markOrderAsPaid: {
      url: `${backendDomen}/orders/order-paid`,
      method: 'put'
   },
   markOrderAsDelivered: {
      url: `${backendDomen}/orders/deliver`,
      method: "put"
   },
   getPayPalClientId: {
      url: `${backendDomen}/api/config/paypal`
   }
}

export default SummaryApi