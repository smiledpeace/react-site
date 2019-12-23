import React, { Suspense, lazy } from 'react';
// import SearchMovie from '../../views/serchMovie/App'; // this changed
// import MesusreExample from '../../views/gists/gists'; // this changed
const SearchMovie = React.lazy(() => import('../../views/serchMovie/App'))
const MesusreExample = React.lazy(() => import('../../views/gists/gists'))
const QR = React.lazy(() => import('../../views/qrcode/qr'))
console.log(SearchMovie);

import { HashRouter as Router, Route, Switch } from "react-router-dom";
const NoMatchPage = () => {
    return (
      <h3>404 - Not found</h3>
    );
  };
const Routes = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                <Route exact path="/" component={MesusreExample}></Route>
                <Route path="/movie" component={SearchMovie}></Route>
                <Route path="/qr" component={QR}></Route>
                <Route component={NoMatchPage} />
                </Switch>
            </Suspense>
        </Router>
    )
};

export default Routes;