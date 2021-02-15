import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserStatsHeader from "./User/UserStatsHeader";
import UserTable from "./User/UserTable";

export default () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get("/api/v1/users");
      console.log("response = ", response);
      // setUsers(users);
    } catch (e) {
      console.log("An error occurred while fetching users: ", e);
    }
  }, []);

  return (
    <Flex flexDir="column">
      <UserStatsHeader totalUsers={1000} />
      <Box display="grid" placeItems="center" h="100%">
        <Heading>Users</Heading>
        <Box m={5}>
          <UserTable users={users} />
        </Box>
      </Box>
    </Flex>
  );
};
