import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import * as R from "ramda";
import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import ax from "packs/axios";
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog";
import EditUserButtonWithModal from "../Modals/EditUserButtonWithModal";
import { userDeleted } from "../../redux/domains/App/AppActions";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const getSortArrowIcon = (direction) => {
  return direction === "ascending" ? <TriangleUpIcon /> : <TriangleDownIcon />;
};

const mapStateToProps = (state) => ({
  users: state.app.users,
  searchQuery: state.app.searchQuery,
});
const mapDispatchToProps = (dispatch) => ({
  deleteUser: (userId) => dispatch(userDeleted(userId)),
});

const UserRow = ({ user, deleteUser }) => {
  const onConfirmDelete = useCallback(async () => {
    try {
      await ax.delete(`/users/${user.id}`);
      deleteUser(user.id);
    } catch (e) {
      console.log("An error occurred while deleting user: ", e);
    }
  }, [user]);

  const { name, email, phone, title, status, updated_at } = user;

  const hoverBgColor = useColorModeValue("gray.200", "gray.700");

  const lastUpdatedString = formatDistance(new Date(updated_at), new Date());
  const recentlyUpdated = lastUpdatedString === "less than a minute";
  return (
    <Tr
      borderLeft={recentlyUpdated ? "4px solid green" : undefined}
      _hover={{ bg: hoverBgColor }}
    >
      <Td>{lastUpdatedString}</Td>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>{title}</Td>
      <Td>{phone}</Td>
      <Td>
        <Badge
          colorScheme={status === "active" ? "green" : "red"}
          p={1}
          borderRadius={5}
        >
          {status}
        </Badge>
      </Td>
      <Td>
        <Flex>
          <EditUserButtonWithModal user={user} />
          <ConfirmDeleteDialog
            dialogHeader={`Delete ${email}`}
            onConfirmDeleteClick={onConfirmDelete}
          />
        </Flex>
      </Td>
    </Tr>
  );
};

const DEFAULT_SORT_CONFIG = {
  key: "updated_at",
  direction: "descending",
};

const UserTable = ({ users, deleteUser, searchQuery }) => {
  const [sortConfig, setSortConfig] = useState(DEFAULT_SORT_CONFIG);
  const [page, setPage] = useState(1);
  const perPage = 25;
  const lastPage = Math.floor(users.length / perPage);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    // Changing the sort will reset the pagination
    setPage(1);
    setSortConfig({ key, direction });
  };

  const filteredUsers = useMemo(() => {
    const loweredQuery = R.toLower(searchQuery);
    return R.filter(
      ({ name, email, phone, title }) =>
        R.toLower(name).includes(loweredQuery) ||
        R.toLower(email).includes(loweredQuery) ||
        R.toLower(phone).includes(loweredQuery) ||
        R.toLower(title).includes(loweredQuery),
      users
    );
  }, [users, searchQuery]);

  const sortedUsers = useMemo(() => {
    let sortedUsers = [...filteredUsers];
    if (sortConfig.key !== null) {
      sortedUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedUsers;
  }, [filteredUsers, sortConfig]);

  const maybeSortIcon = (sortProp) => {
    if (sortProp === sortConfig.key) {
      return getSortArrowIcon(sortConfig.direction);
    }
    return null;
  };

  const paginationControls = (
    <Flex alignItems="center" justifyContent="center" my={2}>
      <HStack spacing={5}>
        <Button
          disabled={page === 1}
          onClick={page > 0 ? () => setPage(page - 1) : undefined}
        >
          Prev
        </Button>
        <Text>Page {page}</Text>
        <Button
          disabled={page === lastPage}
          onClick={page < lastPage ? () => setPage(page + 1) : undefined}
        >
          Next
        </Button>
      </HStack>
    </Flex>
  );

  const startIndex = page === 1 ? 0 : perPage * page;
  const endIndex = startIndex + perPage;

  return (
    <Box pb={20}>
      <Table>
        <Thead>
          <Tr>
            <Th cursor="pointer" onClick={() => requestSort("updated_at")}>
              Last Updated {maybeSortIcon("updated_at")}
            </Th>
            <Th cursor="pointer" onClick={() => requestSort("name")}>
              Name {maybeSortIcon("name")}
            </Th>
            <Th cursor="pointer" onClick={() => requestSort("email")}>
              Email {maybeSortIcon("email")}
            </Th>
            <Th cursor="pointer" onClick={() => requestSort("title")}>
              Title {maybeSortIcon("title")}
            </Th>
            <Th cursor="pointer" onClick={() => requestSort("phone")}>
              Phone {maybeSortIcon("phone")}
            </Th>
            <Th cursor="pointer" onClick={() => requestSort("status")}>
              Status {maybeSortIcon("status")}
            </Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {R.slice(startIndex, endIndex, sortedUsers).map((user) => (
            <UserRow
              key={`${user.id}-${user.email}`}
              user={user}
              deleteUser={deleteUser}
            />
          ))}
        </Tbody>
      </Table>
      {paginationControls}
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
