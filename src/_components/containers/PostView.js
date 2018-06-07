import React from 'react'
import classnames from 'classnames'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import red from 'material-ui/colors/red'
import FavoriteIcon from 'material-ui-icons/Favorite'
import ShareIcon from 'material-ui-icons/Share'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import { withStyles } from 'material-ui/styles'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {fetchSinglePost} from '../../_actions/RedditActions'
import '../../assets/comments.css'


const styles = theme => ({
    card: {
        maxWidth: '100%',
        minWidth: 500,
        marginBottom: 50
    },
    header:{
        cursor: 'pointer' 

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
        backgroundColor: red[500],
    },
});

class PostView extends React.Component {

    constructor(props) {
        super(props);

        this.state = Object.assign({}, props.post.data, { expanded: false });
        this.dispatch = props.dispatch;
     

    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    fetchPost(post, id){
        this.props.history.push(`/subreddit/${this.props.match.params.subreddit}/${id}`);
    }


    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <div className={classes.header} onClick={() => {this.fetchPost(this.state.permalink, this.state.id)}}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {String(this.state.author).charAt(0).toUpperCase()}
                </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={this.state.title}
                    subheader={`u/${this.state.author}`}

                />
               
                {this.state.preview ? <CardMedia
                    className={classes.media}
                    image={this.state.preview.images[0].variants.gif ? this.state.preview.images[0].variants.gif.source.url : this.state.preview.images[0].source.url}
                /> : null}
                </div>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    {this.state.selftext !== '' ?   <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton> : null }
                  
                </CardActions>

                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph variant="body2">
                            {this.state.selftext}
                        </Typography>

                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default withRouter(compose(
    withStyles(styles, {
        withTheme: true
    }),
    connect(state => {
        return {
            comments: state.Reddit.comments
        }
    }),

)(PostView));