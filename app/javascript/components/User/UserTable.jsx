import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const UserRow = ({ name, email, phone, title, status, updated_at }) => {
  return (
    <Tr>
      <Td>{new Date(updated_at)}</Td>
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
            size="lg"
            icon={<EditIcon />}
          />
          <IconButton
            ml={2}
            colorScheme="red"
            aria-label="Delete user"
            size="lg"
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
      <TableCaption>Imperial to metric conversion factors</TableCaption>
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
          <UserRow user={user} />
        ))}
      </Tbody>
    </Table>
  );
};

export default UserTable;
