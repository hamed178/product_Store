import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";
function CreatePage() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();
  const handelAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (success) {
      toaster.create({
        type: "success",
        title: message,
      });
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
      navigate("/");
    } else {
      toaster.create({
        type: "error",
        title: message,
      });
    }
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={8}
        >
          Creat New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "#181922")}
          p={8}
          rounded={"kg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              borderColor={{ base: "black", _dark: "gray.600" }}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              borderColor={{ base: "black", _dark: "gray.600" }}
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              borderColor={{ base: "black", _dark: "gray.600" }}
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              colorPalette={"blue"}
              outline={"none"}
              onClick={handelAddProduct}
              w="full"
            >
              {loading ? "Creating product" : "Add Product"}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
