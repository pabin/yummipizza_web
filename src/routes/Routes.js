import Home from '../pages/home/Home';
import ItemDetail from '../pages/itemDetail/ItemDetail';
import OrderList from '../pages/userOrders/OrderList';
import Cart from '../pages/cart/Cart';

// Authentication Pages
import Login from '../pages/authentication/Login';
import Signup from '../pages/authentication/Signup';


// List of all the routes, for different site pages
const routesList = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/item', exact: true, name: 'Items', component: ItemDetail },
    { path: '/orders', exact: true, name: 'Orders', component: OrderList },
    { path: '/cart', exact: true, name: 'Cart', component: Cart },

    { path: '/login', exact: true, name: 'Orders', component: Login },
    { path: '/signup', exact: true, name: 'Orders', component: Signup },
];

export default routesList;
