import {
    BIRTH_DATA
} from './Constants'
import { combineReducers, createStore } from "redux"
const initialAuthState = {
    BirthsData: {},
};

const reducer = (state = initialAuthState, action) => {
    if (action.type === BIRTH_DATA) {
        return { ...state, BirthsData: action.data };
    }
    return state;
};

const reducers = combineReducers({ reducer })
const store = createStore(reducers)
export default store
