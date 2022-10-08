const initialstate = {
    users: [],
    authUser: false
}


const Reducer = (state = initialstate, action) => {
    switch (action.type) {
        case "ADD_USER":
            // return (state = { ...state, users: [...state.users, action.payload] });
            return { users: action.payload };

        case "AUTH_USER":
            return { authUser: action.payload };
        default:
            return state;
    }
}

export default Reducer;
