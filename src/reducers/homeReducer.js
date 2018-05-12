import * as at from 'constants';
import Immutable from 'immutable';

const Map = Immutable.Map;

const map = Map({'name': '吴建平'})

export function home(state = map, action){
    switch(action.type){
        case at.NAME :
            return {
                ...state,
                name: action.value
            };
        default:
            return state;
    }
}