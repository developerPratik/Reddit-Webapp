import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import themeDefault from '../theme-default'
import { createMuiTheme } from 'material-ui/styles'
import { Switch, Route } from 'react-router-dom'
import SubredditView from './containers/SubredditView'
import PostView from './containers/PostView'
import Header from './Header'
import LeftDrawer from './LeftDrawer'
import { ChevronLeft } from 'material-ui-icons'

import * as RedditAction from '../_actions/RedditActions';
import SinglePostView from './containers/SinglePostView';




function mapStateToProps(state) {

  return {
    auth: state.Auth,
    drawerWidth: 240
  };

}

const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
  subreddit: {
    marginLeft: 240,
    margin: '80, 0, 0, -21%'

  }
});
class App extends Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {
      open: false,
      anchor: 'left'
    }
  }
  componentDidMount() {

  }


  handleLeftDrawer() {

  }


  render() {


    const { classes, theme, drawerWidth } = this.props;
    const { anchor, open } = this.state;



    return (

      <MuiThemeProvider theme={themeDefault}>

        <Header />
        <LeftDrawer />

        <div style={{
          margin: '80px 1% 0 20%'
        }}>
          <Switch>
            <Route path="/subreddit/:subreddit/:postId/" exact component={SinglePostView} />
            <Route path="/subreddit/:subreddit" exact component={SubredditView} />
          </Switch>
        </div>
      </MuiThemeProvider >
    )
  }
}

export default withRouter(compose(
  withStyles(styles, {
    withTheme: true,
  }),
  connect(state => {
    return state
  }),
)(App));
