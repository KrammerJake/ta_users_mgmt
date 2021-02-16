// TODO: Consider renaming this to usersFetched?
export const usersUpdated = (users) => {
  return {
    type: "USERS_UPDATED",
    users,
  };
};

export const userAdded = (user) => {
  return {
    type: "USER_ADDED",
    user,
  };
};

export const userUpdated = (userId, user) => {
  return {
    type: "USER_UPDATED",
    userId,
    user,
  };
};

export const userDeleted = (userId) => {
  return {
    type: "USER_DELETED",
    userId,
  };
};

export const sortPropUpdated = (sortProp) => {
  return {
    type: "SORT_PROP_UPDATED",
    sortProp,
  };
};

export const searchQueryUpdated = (searchQuery) => {
  return {
    type: "SEARCH_QUERY_UPDATED",
    searchQuery,
  };
};
