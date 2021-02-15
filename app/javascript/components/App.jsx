import { Box, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ax from "packs/axios";
import UserTable from "./User/UserTable";
import CreateUserButtonWithModal from "./Modals/CreateUserButtonWithModal";
import LoadingSpinner from "./LoadingSpinner";

export default () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    try {
      const { data: users } = await ax.get("/users");
      setUsers(users);
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
          <Box m={5}>
            <Flex justifyContent="space-between" mx={6}>
              <Heading>Users</Heading>
              <CreateUserButtonWithModal />
            </Flex>
            <UserTable users={users} />
          </Box>
        )}
      </Box>
    </Flex>
  );
};
