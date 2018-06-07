import * as Actions from '../constants'

export default function (state = {
    selectedSubReddit: 'all',
    subreddits: [],
    posts: [],
    post: {},
    comments: [],
    moreComments: [],
    fetchingSubreddits: false,
    fetchingPosts: false,
    fetchingComments: false,
    fetchingSinglePost: false,
    fetchingMoreComments: false,
    postBefore: null,
    postAfter: null,
    subredditBefore: null,
    subredditAfter: null,
    error: ''
}, action) {
    switch (action.type) {

        case Actions.FETCH_SUBREDDITS:
            return { ...state, fetchingSubreddits: true }
            break;

        case Actions.SELECT_SUBREDDIT:
            return {
                ...state, selectedSubReddit: action.subreddit, fetchingPosts: true
            }
            break;

        case Actions.RECIEVE_SUBREDDITS:

            return { ...state, subreddits: state.subreddits.concat(action.subreddits), fetchingSubreddit: false }
            break;

        case Actions.FETCH_POSTS:

            return {
                ...state, fetchingPosts: true
            }
            break;

        case Actions.RECIEVE_POSTS:
            return {
                ...state, posts: action.posts, fetchingPosts: false, postBefore: action.before, postAfter: action.after
            }
            break;

        case Actions.FETCH_SINGLE_POST:

            return {
                ...state, fetchingSinglePost: true
            }
            break;

        case Actions.RECIEVE_SINGLE_POST:

            return {

                ...state, post: action.post, comments: action.comments, fetchingSinglePost: false
            }
            break;

        case Actions.RECIEVE_MORE_COMMENTS:
            
            
            return {
                ...state, moreComments: action.comments
            }
            break;
        case Actions.ERROR:

            return {
                ...state, error: action.message
            }

            break;


        default:
            return state
    }
}