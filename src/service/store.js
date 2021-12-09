import {createStore} from 'redux';


const contentId = 'contentid';
const keyword = 'keyword';
const search = 'search';
const userActive ='user';

export const getContentId = id => {
    return {
        type:contentId,
        id
    }
};

export const getKeyword = key => {
    return {
        type:keyword,
        key
    }
};

export const getSearch = key => {
    return {
        type:search,
        key
    }
}

export const getUser = user => {
    return {
        type:userActive,
        user
    }
}


const reducer = (state = [], action) => {
    switch(action.type) {
        case contentId : 
            return {id:action.id};
        case keyword : 
            return [...state,{keyword:action.key}];
        case search :
            return {search:action.key};
        case userActive :
            return {user:action.user}
        default :
            return state;
    }

};


const store = createStore(reducer);



export default store;