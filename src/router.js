import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './_components/App';

function mapStateToProps(state) {
    return state;
}

const Router = ({store}) => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

Router.prototype = {
    store: PropTypes.object.isRequired
}


export default connect(mapStateToProps)(Router);

