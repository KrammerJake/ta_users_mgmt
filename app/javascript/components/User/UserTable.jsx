import { Badge, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React, { useCallback } from "react";
import ax from "packs/axios";
import ConfirmDeleteDialog from "../Dialogs/ConfirmDeleteDialog";
import EditUserButtonWithModal from "../Modals/EditUserButtonWithModal";

const UserRow = ({ user }) => {
  const onConfirmDelete = useCallback(async () => {
    try {
      await ax.delete(`/users/${user.id}`);
      // TODO: dispatch message to delete user in redux
    } catch (e) {
      console.log("An error occurred while deleting user: ", e);
    }
  }, [user]);

  const { name, email, phone, title, status, updated_at } = user;
  return (
    <Tr>
      <Td>{formatDistance(new Date(updated_at), new Date())}</Td>
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

const UserTable = ({ users }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Last Updated</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Title</Th>
          <Th>Phone</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </Tbody>
    </Table>
  );
};

export default UserTable;
