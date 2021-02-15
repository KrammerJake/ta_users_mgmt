import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ax from "packs/axios";
import * as R from "ramda";
import UserTable from "./User/UserTable";
import CreateUserButtonWithModal from "./Modals/CreateUserButtonWithModal";
import LoadingSpinner from "./LoadingSpinner";

const compareUpdatedAt = (a, b) => {
  if (a.updated_at < b.updated_at) {
    return 1;
  }
  if (a.updated_at > b.updated_at) {
    return -1;
  }
  return 0;
};

export default () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    try {
      const { data: users } = await ax.get("/users");
      setUsers(users.sort(compareUpdatedAt));
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
              <CreateUserButtonWithModal users={users} setUsers={setUsers} />
            </Flex>
            <UserTable users={users} />
          </Box>
        )}
      </Box>
    </Flex>
  );
};
