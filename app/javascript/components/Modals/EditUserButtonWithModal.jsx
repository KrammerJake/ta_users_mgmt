import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ax from "packs/axios";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import validator from "validator";
import { userUpdated } from "../../redux/domains/App/AppActions";

const mapDispatchToProps = (dispatch) => ({
  updateUser: (userId, user) => {
    dispatch(userUpdated(userId, user));
  },
});

const STATUSES = {
  active: 0,
  inactive: 1,
};

const EditUserButtonWithModal = ({ user, updateUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [title, setTitle] = useState(user.title);
  const [status, setStatus] = useState(STATUSES[user.status]);

  const errorHelperTextColor = useColorModeValue("red.500", "red.300");
  const [showEmailHelperText, setShowEmailHelperText] = useState(false);

  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const { data: updatedUser } = await ax.put(`/users/${user.id}`, {
        name,
        email,
        phone,
        title,
        status,
      });
      updateUser(user.id, updatedUser);
      setIsSubmitting(false);
      onClose();
    } catch (e) {
      // TODO: Detect submission failure due to duplicate email, respond accordingly
      console.log("An error occurred while creating new user: ", e);
      setIsSubmitting(false);
    }
  }, [name, email, phone, title, status, updateUser]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasChanges =
    name !== user.name ||
    email !== user.email ||
    phone !== user.phone ||
    title !== user.title ||
    status !== STATUSES[user.status];
  const canSubmit = !isSubmitting && hasChanges && validator.isEmail(email);

  const editUserForm = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      onKeyDown={({ key }) => {
        if (key === "Enter" && canSubmit) {
          onSubmit();
        }
      }}
    >
      <FormControl isRequired>
        <FormLabel htmlFor="name-input">Name</FormLabel>
        <Input
          id="name-input"
          aria-label="Name"
          onChange={({ target: { value } }) => setName(value)}
          type="text"
          value={name}
        />
      </FormControl>
      <FormControl mt={2} isRequired>
        <FormLabel htmlFor="email-input">Email</FormLabel>
        <Input
          onBlur={() => {
            setShowEmailHelperText(Boolean(email) && !validator.isEmail(email));
          }}
          id="email-input"
          aria-label="Email address"
          onChange={({ target: { value } }) => setEmail(value)}
          type="email"
          value={email}
        />
        {showEmailHelperText && (
          <FormHelperText color={errorHelperTextColor}>
            Must be a valid email
          </FormHelperText>
        )}
      </FormControl>
      <FormControl mt={2} isRequired>
        <FormLabel htmlFor="phone-input">Phone</FormLabel>
        <Input
          id="phone-input"
          aria-label="Phone"
          onChange={({ target: { value } }) => setPhone(value)}
          type="text"
          value={phone}
        />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel htmlFor="title-input">Title</FormLabel>
        <Input
          id="title-input"
          aria-label="Title"
          onChange={({ target: { value } }) => setTitle(value)}
          type="text"
          value={title}
        />
      </FormControl>
      <FormControl mt={2} isRequired>
        <FormLabel htmlFor="user-status-select">Status</FormLabel>
        <Select
          onChange={({ target: { value } }) => setStatus(parseInt(value, 10))}
          bg={status === STATUSES.active ? "green.600" : "red.800"}
          color="white"
          value={status}
        >
          <option value={0}>Active</option>
          <option value={1}>Inactive</option>
        </Select>
      </FormControl>
    </Box>
  );

  const editIconHoverBgColor = useColorModeValue("blue.300", "blue.600");

  return (
    <Box mr={2}>
      <IconButton
        icon={<EditIcon />}
        onClick={onOpen}
        border="1px solid"
        _hover={{ bg: editIconHoverBgColor }}
      >
        Edit User
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{editUserForm}</ModalBody>

          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              disabled={!canSubmit}
              loadingText="Updating user"
              colorScheme="green"
              mr={3}
              onClick={onSubmit}
            >
              Update User
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default connect(null, mapDispatchToProps)(EditUserButtonWithModal);
