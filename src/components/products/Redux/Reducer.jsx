const initialState=[1,2]
export const Reducer=(state=initialState,action)=>{
    switch(action.type){
        case 'addId':return [...state,action.payload]
        default: return state
    }
}