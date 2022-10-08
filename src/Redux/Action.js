export const addUser = (user) => {
    return {
        type: "ADD_USER",
        payload: user,
    };
};

export const authUser = (auth) => {
    return {
        type: "AUTH_USER",
        payload: auth,
    };
};