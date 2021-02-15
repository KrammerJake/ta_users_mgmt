import * as R from "ramda";

export const initialAppState = {
  users: [],
  sortProp: "updated_at",
};

const AppReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case "USERS_UPDATED":
      return {
        ...state,
        users: action.users,
      };
    case "USER_ADDED":
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case "USER_UPDATED":
      return {
        ...state,
        // TODO: find a more efficient way to update user
        users: R.map(
          (user) => (user.id === action.userId ? action.user : user),
          state.users
        ),
      };
    case "USER_DELETED":
      return {
        ...state,
        users: R.filter(({ id }) => id !== action.userId, state.users),
      };
    case "SORT_PROP_UPDATED":
      return {
        ...state,
        sortProp: action.sortProp,
      };
    default:
      return state;
  }
};

export default AppReducer;
