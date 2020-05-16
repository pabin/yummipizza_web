import React from 'react';


const HomePage = React.lazy(() => import('./pages/Home'));


const routes = [
    { path: '/home', exact: true, name: 'Home Page', component: HomePage },
];

export default routes;
