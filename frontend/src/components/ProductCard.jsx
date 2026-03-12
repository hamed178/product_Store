import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Dialog,
  VStack,
  Input,
  Portal,
  Button,
} from "@chakra-ui/react";
import { TiEdit } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";
import { useState } from "react";

function ProductCard({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [open, setOpen] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();
  const handelUpdated = async (id, updatedProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct);
    if (!success) {
      toaster.create({
        type: "error",
        title: message,
      });
    } else {
      toaster.create({
        type: "success",
        title: message,
      });
    }
  };
  const handelDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toaster.create({
        type: "error",
        title: message,
      });
    } else {
      toaster.create({
        type: "success",
        title: message,
      });
    }
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px", shadow: "xl" }}
      bg={{ base: "white", _dark: "#101725" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h="48"
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading
          as="h3"
          size="md"
          mb="2"
        >
          {product.name}
        </Heading>
        <Text
          fontWeight="bold"
          fontSize="xl"
          color=""
        >
          {product.price}
        </Text>
        <HStack>
          <IconButton
            bgColor="blue.500"
            onClick={() => setOpen(true)}
          >
            <TiEdit color="blue" />
          </IconButton>
          <IconButton
            bgColor="red.300"
            onClick={() => handelDeleteProduct(product._id)}
          >
            <MdDeleteForever color="blue" />
          </IconButton>
        </HStack>
      </Box>
      <Dialog.Root
        open={open}
        // onOpenChange={onOpenChange}
        placement="center" // ✅ Perfect center
        preventScroll={true}
        closeOnEscape={true}
        closeOnInteractOutside={true}
      >
        <Portal>
          {/* ✨ Styled Backdrop */}
          <Dialog.Backdrop
            bg="blackAlpha.600"
            backdropFilter="blur(4px)"
            animation={{
              in: { opacity: 1 },
              out: { opacity: 0 },
            }}
          />

          <Dialog.Positioner>
            {/* 🎨 Styled Content Card */}
            <Dialog.Content
              // Background & visual styling
              bg="white"
              bgGradient="linear(to-br, white, gray.50)"
              color="gray.800"
              borderRadius="2xl"
              boxShadow="0 20px 50px rgba(0, 0, 0, 0.15)"
              border="1px solid"
              borderColor="gray.200"
              // Layout & spacing
              w="full"
              maxW="md"
              mx={4}
              p={6}
              // Animation
              animation={{
                in: { opacity: 1, scale: 1, translateY: 0 },
                out: { opacity: 0, scale: 0.98, translateY: -8 },
              }}
            >
              {/* Header Section */}
              <Dialog.Header
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
                borderBottom="1px solid"
                borderColor="gray.200"
              >
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                >
                  ✏️ Update Product
                </Text>

                {/* Styled Close Button */}
                <Dialog.CloseTrigger
                  asChild
                  onClick={(e) => setOpen(e.open)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    color="gray.500"
                    _hover={{
                      bg: "gray.100",
                      color: "gray.700",
                      transform: "scale(1.1)",
                    }}
                    _active={{ bg: "gray.200" }}
                    borderRadius="full"
                    w={8}
                    h={8}
                    p={0}
                    fontSize="sm"
                  >
                    ❌
                  </Button>
                </Dialog.CloseTrigger>
              </Dialog.Header>

              {/* Body - Form Inputs */}
              <Dialog.Body py={6}>
                <VStack
                  spacing="5"
                  align="stretch"
                >
                  {/* Product Name Input */}
                  <Box>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      mb={2}
                      color="gray.700"
                    >
                      Product Name
                    </Text>
                    <Input
                      placeholder="e.g., Wireless Headphones"
                      name="name"
                      size="lg"
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="gray.200"
                      bg="white"
                      _hover={{ borderColor: "gray.300" }}
                      _focus={{
                        borderColor: "cyan.400",
                        boxShadow: "0 0 0 4px rgba(34, 211, 238, 0.15)",
                        outline: "none",
                      }}
                      _placeholder={{ color: "gray.400" }}
                      value={updatedProduct.name}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  </Box>

                  {/* Price Input */}
                  <Box>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      mb={2}
                      color="gray.700"
                    >
                      Price ($)
                    </Text>
                    <Input
                      placeholder="0.00"
                      name="price"
                      type="number"
                      size="lg"
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="gray.200"
                      bg="white"
                      _hover={{ borderColor: "gray.300" }}
                      _focus={{
                        borderColor: "cyan.400",
                        boxShadow: "0 0 0 4px rgba(34, 211, 238, 0.15)",
                        outline: "none",
                      }}
                      _placeholder={{ color: "gray.400" }}
                      value={updatedProduct.price}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  </Box>

                  {/* Image URL Input */}
                  <Box>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      mb={2}
                      color="gray.700"
                    >
                      Image URL
                    </Text>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      name="image"
                      size="lg"
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="gray.200"
                      bg="white"
                      _hover={{ borderColor: "gray.300" }}
                      _focus={{
                        borderColor: "cyan.400",
                        boxShadow: "0 0 0 4px rgba(34, 211, 238, 0.15)",
                        outline: "none",
                      }}
                      _placeholder={{ color: "gray.400" }}
                      value={updatedProduct.image}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          image: e.target.value,
                        })
                      }
                    />
                  </Box>
                </VStack>
              </Dialog.Body>

              {/* Footer - Action Buttons */}
              <Dialog.Footer
                pt={4}
                borderTop="1px solid"
                borderColor="gray.200"
                display="flex"
                gap={3}
                justifyContent="flex-end"
              >
                <Button
                  variant="outline"
                  size="lg"
                  borderRadius="xl"
                  px={6}
                  onClick={() => setOpen(false)}
                  _hover={{
                    bg: "gray.50",
                    borderColor: "gray.400",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  size="lg"
                  borderRadius="xl"
                  px={6}
                  colorPalette="cyan" // ✅ Uses your brand gradient theme
                  bgGradient="linear(to-r, cyan.400, blue.500)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(to-r, cyan.500, blue.600)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  onClick={() => {
                    //   // Call your update logic here
                    handelUpdated(product._id, updatedProduct);
                    setOpen(false);
                  }}
                >
                  Save Changes ✨
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}

export default ProductCard;
