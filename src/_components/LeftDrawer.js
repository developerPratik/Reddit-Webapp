import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Toolbar from 'material-ui/Toolbar'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import { ChevronLeft } from 'material-ui-icons'
import { fetchSubreddits, fetchPosts } from '../_actions/RedditActions'
import {withRouter} from 'react-router-dom';



const drawerWidth = 350;

function matchStateToProps(state) {

    return {
        subreddits: state.Reddit.subreddits
    }

}

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        position: 'fixed'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'fixed',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});
class LeftDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            anchor: 'left'
        }
        this.dispatch = props.dispatch;
      

    }

    componentWillMount() {
        this.dispatch(fetchSubreddits(null, null));

    }

    fetchSubreddits(before, after) {

        this.dispatch(fetchSubreddits(before, after));
    }

    componentWillReceiveProps(nextProps, nextState) {
     
    
  
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    fetchPosts(subreddit, name) {
        this.dispatch(fetchPosts(subreddit));
        this.props.history.push(`/subreddit/${name}`);
    }


    handleChangeAnchor = event => {
        this.setState({
            anchor: event.target.value,
        });
    };

    render() {
        const { classes, theme, dispatch } = this.props;
        const { open, anchor } = this.state;
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                docked="true"
            >

                <div className={classes.toolbar} />
                <List>
                    {this.props.subreddits.map(subreddit =>
                        <ListItem key={subreddit.data.id} button onClick={() => { this.fetchPosts(subreddit.data.url, subreddit.data.display_name) }}>
                            <ListItemText primary={subreddit.data.url} />
                        </ListItem>
                    )}
                </List>
            </Drawer>
        )
    }



}

LeftDrawer.propTypes = {
    navDrawerOpen: PropTypes.bool,
    menus: PropTypes.array,
    username: PropTypes.string,
    displayName: PropTypes.string
}

export default withRouter(compose(
    withStyles(styles, {
        withTheme: true,
    }),
    connect(matchStateToProps),
)(LeftDrawer));
