import {combineReducers} from 'redux';
import RedditReducers from './RedditReducers';

export default combineReducers({
    Reddit: RedditReducers
});