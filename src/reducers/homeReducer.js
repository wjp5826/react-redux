import * as at from 'constants';
import Immutable from 'immutable';

const Map = Immutable.Map;

const map = Map({
	'name': '吴建平',
  'isLogin': true
})

export function home(state = map, action){
    switch(action.type){
        case at.NAME :
            return state.set('name', action.value);
        case at.ISLOGIN :
            return state.set('isLogin', action.value);
        default:
            return state;
    }
}