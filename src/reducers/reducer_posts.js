import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

// lodash has a method that creates an object out of an array

export default function(state = {}, action) {
  switch (action.type) {
  case DELETE_POST:
    return _.omit(state, action.payload);
  case FETCH_POST:
    // the [] doesn't create an array, it's ES6 key interpolation
    return { ...state, [action.payload.data.id]: action.payload.data };
  case FETCH_POSTS:
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
} 