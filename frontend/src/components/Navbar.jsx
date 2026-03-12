import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { Link } from "react-router-dom";

import { FaPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container
      maxW={"1140px"}
      px={4}
      pt={5}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
        gap={3}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          // Use the 'gradient' prop or 'bg' with the 'to-r' utility
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip="text"
          color="transparent"
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack
          spacing={2}
          alignItems={"center"}
        >
          <Link to={"/create"}>
            <Button
              variant="ghost"
              bg={{ base: "gray.200", _dark: "whiteAlpha.200" }}
              color={{ base: "black", _dark: "white" }}
              _hover={{
                bg: "gray.700",
                borderColor: "gray.600",
              }}
            >
              <FaPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button
            variant="ghost"
            bg={{ base: "gray.200", _dark: "whiteAlpha.200" }}
            color={{ base: "black", _dark: "white" }}
            _hover={{
              bg: "gray.700",
              borderColor: "gray.600",
            }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;
