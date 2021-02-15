import * as R from "ramda";
import { createSelector } from "reselect";

export const getUsers = (state) => state.app.users;
export const getSortProp = (state) => state.app.sortProp;

export const getUsersById = createSelector(getUsers, (users) => {
  return R.indexBy(R.prop("id"), users);
});

// Simple function to support sorting users by table column
const compareProp = (prop = "updated_at") => (a, b) => {
  if (a[prop] < b[prop]) {
    return 1;
  }
  if (a[prop] > b[prop]) {
    return -1;
  }
  return 0;
};

export const getSortedUsers = createSelector(
  getUsers,
  getSortProp,
  (users, sortProp) => {
    console.log("Recalculating sorted users!");
    const sortedUsers = users.sort(compareProp(sortProp));
    console.log({ users, sortProp, sortedUsers });
    return sortedUsers;
  }
);
