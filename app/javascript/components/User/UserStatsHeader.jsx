import {
  Box,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React from "react";

const UserStatsHeader = ({ totalUsers }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      height="10%"
      minHeight="100px"
      p={5}
    >
      <Stat border="1px solid" p={2} maxW={100}>
        <StatLabel>Total Users</StatLabel>
        <StatNumber>{totalUsers}</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" /> 1
        </StatHelpText>
      </Stat>
      <Stat border="1px solid" p={2} maxW={100} ml={2}>
        <StatLabel>Total Users</StatLabel>
        <StatNumber>{totalUsers}</StatNumber>
        <StatHelpText>
          <StatArrow type="increase" /> 1
        </StatHelpText>
      </Stat>
    </Box>
  );
};

export default UserStatsHeader;
