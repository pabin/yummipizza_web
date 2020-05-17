import React from 'react';


import Home from '../pages/home/Home';
import ItemDetail from '../pages/itemDetail/ItemDetail';
import UserOrders from '../pages/userOrders/UserOrders';

// Authentication Pages
import Login from '../pages/authentication/Login';
import Signup from '../pages/authentication/Signup';


const routesList = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/items', exact: true, name: 'Items', component: ItemDetail },
    { path: '/orders', exact: true, name: 'Orders', component: UserOrders },

    { path: '/login', exact: true, name: 'Orders', component: Login },
    { path: '/signup', exact: true, name: 'Orders', component: Signup },
];

export default routesList;
