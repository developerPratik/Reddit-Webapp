import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { withStyles } from 'material-ui/styles'
import { fetchSinglePost, fetchMoreChildren } from '../../_actions/RedditActions'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import classnames from 'classnames'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import red from 'material-ui/colors/red'
import FavoriteIcon from 'material-ui-icons/Favorite'
import ShareIcon from 'material-ui-icons/Share'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Paper from 'material-ui/Paper'

let reddit = require('../../assets/images/reddit.png')
import CommentsView from './CommentsView';

const styles = theme => ({

    paper: {
        maxWidth: '100%',
        minWidth: 800,
        padding: 10,
        minHeight: 700
    },
    card: {
        maxWidth: '100%',
        minWidth: 500,
        marginBottom: 15
    },
    media: {
        height: 400,
        backgroundSize: 'contain'
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'red',
    },

});



class SinglePostView extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            post: props.post.data,
            comments: props.comments.data,
            expanded: false
        }


        this.dispatch = this.props.dispatch;


    }

    componentWillMount() {

        this.dispatch(fetchSinglePost(this.props.match.params.subreddit, this.props.match.params.postId));

    }

    componentWillReceiveProps(nextProps, nextState) {

        if (nextProps.post.data) {
            this.setState({
                post: nextProps.post.data.children[0].data,
                comments: nextProps.comments.data
            })
        }



    }

    loadMoreComments(id, link_id, subreddit, children, count, depth){
        this.dispatch(fetchMoreChildren(id, link_id, subreddit, children, count, depth));
    }

    render() {

        const { classes } = this.props;
    
        return (

            <div>

                {!this.props.fetchingSinglePost && this.state.comments && this.state.post ?

                    <div>
                        <Card className={classes.card}>
                            <div className={classes.header}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe" className={classes.avatar}>
                                            {String(this.state.post.author).charAt(0).toUpperCase()}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={this.state.post.title}
                                    subheader={`u/${this.state.post.author}`}

                                />

                                {this.state.post.preview ? <CardMedia
                                    className={classes.media}
                                    image={this.state.post.preview.images[0].variants.gif ? this.state.post.preview.images[0].variants.gif.source.url : this.state.post.preview.images[0].source.url}
                                /> : null}
                            </div>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton aria-label="Add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>


                            <CardContent>
                                <Typography paragraph variant="body2">
                                    {this.state.post.selftext}
                                </Typography>

                            </CardContent>

                        </Card>
                        <CommentsView comments={this.state.comments} post={this.state.post} fetchMoreComments = {this.loadMoreComments}/>
                        
                    </div> : 'loading'}
            </div>
        )
    }
}


export default withRouter(compose(
    withStyles(styles, {
        withTheme: true
    }),
    connect(state => {
        return {
            post: state.Reddit.post,
            comments: state.Reddit.comments,
            fetchingSinglePost: state.Reddit.fetchingSinglePost
        }
    }),
)(SinglePostView));        