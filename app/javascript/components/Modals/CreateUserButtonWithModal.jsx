import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useState } from "react";
import validator from "validator";

const CreateUserButtonWithModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("active");

  const errorHelperTextColor = useColorModeValue("red.500", "red.300");
  const [showEmailHelperText, setShowEmailHelperText] = useState(false);

  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await axios.post("/users", { name, email, title, phone, status });
    } catch (e) {
      console.log("An error occurred while creating new user: ", e);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit =
    !isSubmitting &&
    name &&
    email &&
    validator.isEmail(email) &&
    phone &&
    status;

  const createUserForm = (
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
      <FormControl>
        <FormLabel htmlFor="name-input">Name</FormLabel>
        <Input
          autoFocus
          id="name-input"
          aria-label="Name"
          onChange={({ target: { value } }) => setName(value)}
          type="text"
          value={name}
        />
      </FormControl>
      <FormControl mt={2}>
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
      <FormControl mt={2}>
        <FormLabel htmlFor="phone-input">Phone</FormLabel>
        <Input
          id="phone-input"
          aria-label="Phone"
          onChange={({ target: { value } }) => setPhone(value)}
          type="text"
          value={phone}
        />
      </FormControl>
    </Box>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Create User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{createUserForm}</ModalBody>

          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              disabled={!canSubmit}
              loadingText="Creating user"
              colorScheme="green"
              mr={3}
              onClick={onSubmit}
            >
              Create User
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUserButtonWithModal;
