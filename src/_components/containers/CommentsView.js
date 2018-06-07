import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import { compose } from 'redux'
import { Paper } from 'material-ui'
import { fetchSinglePost } from '../../_actions/RedditActions'

import '../../assets/comments.css'

let reddit = require('../../assets/images/reddit.png');

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

function getDateString(timestamp) {
    const date = new Date(timestamp);
    return date.toTimeString();

}


class CommentsView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            comments: props.comments,
            post: props.post
        }
    }

    componentWillMount() {


    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            comments: nextProps.comments
        })
    }


    comments() {
        // <Paper className={classes.paper}>
        //                     <div>
        //                         <div className="comments-container">
        //                             <ul id="comments-list" className="comments-list">
        //                                 {this.state.comments.children.map(comment =>

        //                                     <li key={comment.data.id}>
        //                                         <div className="comment-main-level">

        //                                             <div className="comment-avatar"><img src={reddit} alt="" /></div>

        //                                             <div className="comment-box">
        //                                                 <div className="comment-head">
        //                                                     <h6 className={`comment-name ${comment.data.author === this.state.post.author ? "by-author" : null}`}><a href={`/user/${comment.data.author}`}>u/{comment.data.author}</a></h6>
        //                                                     <span>{comment.data.created}</span>
        //                                                     <i className="fa fa-reply"></i>
        //                                                     <i className="fa fa-heart"></i>
        //                                                 </div>
        //                                                 <div className="comment-content">{comment.data.body}</div>
        //                                             </div>
        //                                         </div>

        //                                         {comment.data.replies === "" || comment.kind === "more" ? null :
        //                                             <ul className="comments-list reply-list">
        //                                                 {comment.data.replies.data.children.map(reply =>
        //                                                     <li>

        //                                                         <div className="comment-avatar"><img src={reddit} alt="" /></div>

        //                                                         <div className="comment-box">
        //                                                             <div className="comment-head">
        //                                                                 <h6 className={`comment-name ${reply.data.author === this.state.post.author ? "by-author" : null}`}><a href={`u/${reply.data.author}`}>{reply.data.author}</a></h6>
        //                                                                 <span>{reply.data.created}</span>
        //                                                                 <i className="fa fa-reply"></i>
        //                                                                 <i className="fa fa-heart"></i>
        //                                                             </div>
        //                                                             <div className="comment-content">{reply.data.body}</div>
        //                                                         </div>

        //                                                         {reply.data.replies === "" || reply.kind === "more" ? null :
        //                                                             <ul className="comments-list reply-list">
        //                                                                 {reply.data.replies.data.children.map(reply =>
        //                                                                     <li>

        //                                                                         <div className="comment-avatar"><img src={reddit} alt="" /></div>

        //                                                                         <div className="comment-box">
        //                                                                             <div className="comment-head">
        //                                                                                 <h6 className={`comment-name ${reply.data.author === this.state.post.author ? "by-author" : null}`}><a href={`u/${reply.data.author}`}>{reply.data.author}</a></h6>
        //                                                                                 <span>{reply.data.created}</span>
        //                                                                                 <i className="fa fa-reply"></i>
        //                                                                                 <i className="fa fa-heart"></i>
        //                                                                             </div>
        //                                                                             <div className="comment-content">{reply.data.body}</div>
        //                                                                         </div>


        //                                                                     </li>
        //                                                                 )}

        //                                                             </ul>}
        //                                                     </li>
        //                                                 )}

        //                                             </ul>}
        //                                     </li>

        //                                 )}

        //                             </ul>
        //                         </div>
        //                     </div>
        //                 </Paper>
    }



    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <div>
                    <div className="comments-container">
                        <ul id="comments-list" className="comments-list">

                            {this.state.comments.children.map(comment => {
                                if (comment.kind === "t1") {
                                    return (
                                        <li key={comment.data.id}>
                                            <div className="comment-main-level">

                                                <div className="comment-avatar"><img src={reddit} alt="" /></div>

                                                <div className="comment-box">
                                                    <div className="comment-head">
                                                        <h6 className={`comment-name ${comment.data.author === this.state.post.author ? "by-author" : null}`}><a href={`/user/${comment.data.author}`}>u/{comment.data.author}</a></h6>
                                                        <span>{getDateString(comment.data.created)}</span>
                                                        <i className="fa fa-reply"></i>
                                                        <i className="fa fa-heart"></i>
                                                    </div>
                                                    <div className="comment-content">{comment.data.body}</div>
                                                </div>
                                            </div>


                                        </li>
                                    )

                                }
                                else {
                                    return (<a key="load" onClick={() => { this.props.fetchMoreComments(comment.data.name, comment.data.parent_id, this.props.match.params.subreddit, comment.data.children, comment.data.count, comment.data.depth) }}>Load {comment.data.count} more comments..</a>);
                                }
                            })}



                        </ul>
                    </div>
                </div>
            </Paper>
        )
    }
}

export default withRouter(compose(
    withStyles(styles, {
        withTheme: true
    }),
    connect(state => {
        return {}
    }),
)(CommentsView));        