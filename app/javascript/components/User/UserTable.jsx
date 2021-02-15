import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React from "react";

const UserRow = ({ user }) => {
  const { name, email, phone, title, status, updated_at } = user;
  return (
    <Tr>
      <Td>{formatDistance(new Date(updated_at), new Date())}</Td>
      <Td>{name}</Td>
      <Td>{email}</Td>
      <Td>{title}</Td>
      <Td>{phone}</Td>
      <Td color={status === "active" ? "green.500" : "red.500"}>{status}</Td>
      <Td>
        <Flex>
          <IconButton
            colorScheme="teal"
            aria-label="Edit user"
            size="md"
            icon={<EditIcon />}
          />
          <IconButton
            ml={2}
            colorScheme="red"
            aria-label="Delete user"
            size="md"
            icon={<DeleteIcon />}
          />
        </Flex>
      </Td>
    </Tr>
  );
};

const UserTable = ({ users }) => {
  return (
    <Table variant="simple">
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
