import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Pages/Users/Users'));
const User = React.lazy(() => import('./views/Pages/Users/User'));

const Products = React.lazy(() => import('./views/Pages/Products/Products'));
const Product = React.lazy(() => import('./views/Pages/Products/Product'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/products', exact: true,  name: 'Products', component: Products },
  { path: '/products/:id', exact: true, name: 'Product Details', component: Product },
];

export default routes;
