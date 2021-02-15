import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

export default ({ message = "Loading" }) => {
  return (
    <Flex alignItems="center">
      <Text fontSize="4xl">{message}</Text>
      <Spinner
        ml={2}
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};
