import { Badge, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import * as R from "ramda";
import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import ax from "packs/axios";
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog";
import EditUserButtonWithModal from "../Modals/EditUserButtonWithModal";
import { getUsers } from "../../redux/domains/App/AppSelectors";
import { userDeleted } from "../../redux/domains/App/AppActions";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const getSortArrowIcon = (direction) => {
  return direction === "ascending" ? <TriangleUpIcon /> : <TriangleDownIcon />;
};

const mapStateToProps = (state) => ({
  users: getUsers(state),
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

  const lastUpdatedString = formatDistance(new Date(updated_at), new Date());
  const recentlyUpdated = lastUpdatedString === "less than a minute";
  return (
    <Tr boxShadow={recentlyUpdated ? "0px 1px 5px 1px blue" : undefined}>
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

const UserTable = ({ users, deleteUser }) => {
  const [sortConfig, setSortConfig] = useState(DEFAULT_SORT_CONFIG);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = useMemo(() => {
    let sortedUsers = [...users];
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
  }, [users, sortConfig]);

  const maybeSortIcon = (sortProp) => {
    if (sortProp === sortConfig.key) {
      return getSortArrowIcon(sortConfig.direction);
    }
    return null;
  };

  return (
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
        {R.take(25, sortedUsers).map((user) => (
          <UserRow
            key={`${user.id}-${user.email}`}
            user={user}
            deleteUser={deleteUser}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
