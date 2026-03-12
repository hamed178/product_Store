import { Container, Text, VStack, SimpleGrid, Box } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
function HomePage() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <Container mt={"3rem"}>
      <VStack spacing={8}>
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
          Current Product 🚀
        </Text>
        <SimpleGrid
          mt="10"
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={10}
          w={"full"}
        >
          {products.map((product) => {
            return (
              <ProductCard
                key={product._id}
                product={product}
              />
            );
          })}
        </SimpleGrid>
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
