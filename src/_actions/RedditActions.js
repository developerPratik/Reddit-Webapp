import * as Actions from '../constants'
import Axios from 'axios'


export function selectSubreddit(subreddit) {


    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }

}


export function fetchSubreddits(before, after) {

    return (dispatch => {


        Axios.get(`https://www.reddit.com/reddits.json?before=${before}&after=${after}`, {})
            .then(res => {

                dispatch({
                    type: Actions.RECIEVE_SUBREDDITS, subreddits: res.data.data.children, after: res.data.data.after, before: res.data.data.before
                })
            }).catch(error => {
                dispatch({
                    type: Actions.ERROR,
                    error: 'An error has occurred when fetching subreddits'
                });
            });
    })
}

export function fetchPosts(subreddit, append, before, after) {
    return (dispatch => {

        dispatch({
            type: Actions.FETCH_POSTS
        })

        Axios.get(`https://www.reddit.com/${subreddit}.json?before=${before}&after=${after}`)
            .then(data => {

                dispatch({
                    type: Actions.RECIEVE_POSTS,
                    posts: data.data.data.children,
                    before: data.data.before,
                    after: data.data.after
                })
            })
            .catch(error => {
                dispatch({
                    type: Actions.ERROR,
                    error: 'An error occurred when fetching the posts'
                })

            })

    });
}

export function fetchSinglePost(subreddit, postId) {

    return (dispatch => {

        dispatch({
            type: Actions.FETCH_SINGLE_POST
        });

        Axios.get(`https://www.reddit.com/r/${subreddit}/${postId}.json`)
            .then(response => {

                dispatch({
                    type: Actions.RECIEVE_SINGLE_POST,
                    post: response.data[0],
                    comments: response.data[1]
                })
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Actions.ERROR,
                    error: 'An error occurred when fetching the posr'
                })

            })

    });
}

export function fetchMoreChildren(id, link_id, subreddit, children, count, depth, sort) {


    return (dispatch => {

        Axios.get(`https://www.reddit.com/api/morechildren.json?api_type=json&link_id=${link_id}&sort=${sort}&children=${children.join(',')}&depth=${depth}&utm_name=${subreddit}`)
            .then(response => {
                console.log(response);
                dispatch({
                    type: Actions.RECIEVE_MORE_COMMENTS,
                    id,
                    comments: response.data.json.data.things
                })

            })
            .catch(error => {
                dispatch({
                    type: Actions.ERROR,
                    message: error.message
                })

            })
    })
}





