import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import ax from "packs/axios";

import UserTable from "./User/UserTable";
import CreateUserButtonWithModal from "./Modals/CreateUserButtonWithModal";
import LoadingSpinner from "./LoadingSpinner";

import {
  usersUpdated,
  searchQueryUpdated,
} from "../redux/domains/App/AppActions";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const mapStateToProps = (state) => ({
  searchQuery: state.app.searchQuery,
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchQuery: (searchQuery) => {
    dispatch(searchQueryUpdated(searchQuery));
  },
  updateUsers: (users) => {
    dispatch(usersUpdated(users));
  },
});

const App = ({ searchQuery, updateUsers, updateSearchQuery }) => {
  // TODO: move to redux?
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const { toggleColorMode } = useColorMode();
  const themeIcon = useColorModeValue(<SunIcon />, <MoonIcon />);

  const changeThemeButton = (
    <IconButton
      ml={2}
      variant="ghost"
      size="lg"
      aria-label="Change theme"
      id="toggle-theme-button"
      icon={themeIcon}
      onClick={toggleColorMode}
    />
  );

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
            <Flex justifyContent="space-between" mx={6} mb={6}>
              <Heading as="h1" size="2xl">
                Users {changeThemeButton}
              </Heading>
              <Flex alignItems="center">
                <Input
                  placeholder="Search users"
                  onChange={({ target: { value } }) => {
                    updateSearchQuery(value);
                  }}
                  value={searchQuery}
                />
                <CreateUserButtonWithModal />
              </Flex>
            </Flex>
            <UserTable />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
