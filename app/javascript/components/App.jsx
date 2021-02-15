import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ax from "packs/axios";

import UserTable from "./User/UserTable";
import CreateUserButtonWithModal from "./Modals/CreateUserButtonWithModal";
import LoadingSpinner from "./LoadingSpinner";

import { usersUpdated } from "../redux/domains/App/AppActions";

const mapDispatchToProps = (dispatch) => ({
  updateUsers: (users) => {
    dispatch(usersUpdated(users));
  },
});

const App = ({ updateUsers }) => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(async () => {
    try {
      const { data: users } = await ax.get("/users");
      updateUsers(users);
    } catch (e) {
      console.log("An error occurred while fetching users: ", e);
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  return (
    <Flex flexDir="column">
      <Box display="grid" placeItems="center" h="100vh">
        {isLoadingUsers ? (
          <LoadingSpinner message="Loading users" />
        ) : (
          <Box m={5} pt={50}>
            <Flex justifyContent="space-between" mx={6} mb={2}>
              <Heading>Users</Heading>
              <CreateUserButtonWithModal />
            </Flex>
            <UserTable />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default connect(null, mapDispatchToProps)(App);
