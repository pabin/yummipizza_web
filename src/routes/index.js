import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import routesList from './Routes';
import PageNotFound from '../components/PageNotFound';
import ScrollToTop from '../components/ScrollToTop';


// Routes component to create react-router routes for navigation
class Routes extends React.Component {

  render() {

    const menu = routesList.map((route, index) => {
      return (route.component) ? (
          <Route
              key={index}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={props => (
                  <route.component
                    {...props}
                    userAuthenticated={this.props.userAuthenticated}
                    onLoginPress={this.props.onLoginPress} />
              )} />
      ) : (null);
    });

    return (
      <Fragment>
        <ScrollToTop />
        <Switch>
          {menu}
          <PageNotFound />
        </Switch>
      </Fragment>
    );
  }
}

export default Routes
