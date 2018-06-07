/**
 * This component shows a list of all the posts in the seleceted subreddit 
 * The selected subreddit would appear at the top in the app bar as /reactjs
 * 
 */

import React from 'react'
import PostView from './PostView'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import { fetchPosts } from '../../_actions/RedditActions'
import { CircularProgress } from 'material-ui'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    subredditBlur: {
        filter: 'blur(5px)'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'absolute',
        width: drawerWidth,

    },
    loading: {
        marginLeft: '30%',
        marginTop: '10%',
        display: 'flow-root',
        position: 'fixed',
        zIndex: theme.zIndex.drawer,
        width: '100px',
        height: '100px'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0,
    },
    toolbar: theme.mixins.toolbar,
});

class SubredditView extends React.Component {



    constructor(props) {
        super(props);
        this.state = {

            posts: [],
            loading: false
        }

        this.dispatch = props.dispatch;
        this.onScroll = this.onScroll.bind(this);
    }


    componentWillMount() {

        this.dispatch(fetchPosts(`r/${this.props.match.params.subreddit}`));

    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }


    onScroll() {
        // if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50)) {
        //     this.dispatch(fetchPosts(`r/${this.props.match.params.subreddit}`, true))
        // }
    }




    componentWillReceiveProps(nextProps, nextState) {

        this.setState({
            posts: nextProps.posts
        });
    }




    render() {
        const subreddt_id = 'subreddit_' + this.props.match.params.subreddit;
        const { classes } = this.props;

        return (

            <div onScroll={() => { this.onScroll() }}>
                {this.props.fetchingPosts ?
                    <CircularProgress
                        mode="indeterminate"
                        thickness={4}
                        className={classes.loading}
                        size={120}
                    /> : null}

                <div id={subreddt_id} className={this.props.fetchingPosts ? classes.subredditBlur : null}>
                    {this.state.posts.map(post =>
                        <PostView key={post.data.id} post={post} />
                    )}


                </div>
            </div>
        );
    }
}


export default withRouter(compose(
    withStyles(styles, {
        withTheme: true,
    }),
    connect(state => {
        return {
            posts: state.Reddit.posts,
            fetchingPosts: state.Reddit.fetchingPosts
        }
    }),
)(SubredditView));
