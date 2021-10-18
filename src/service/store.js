import {createStore} from 'redux';


const contentId = 'contentid';
const keyword = 'keyword';

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


const reducer = (state = [], action) => {
    switch(action.type) {
        case contentId : 
            return {id:action.id};
        case keyword : 
            return [...state,{keyword:action.key}];
        default :
            return state;
    }

};


const store = createStore(reducer);



export default store;