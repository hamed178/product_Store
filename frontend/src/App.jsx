import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "./components/ui/color-mode";
function App() {
  const bgColor = useColorModeValue("gray.200", "#090a18");
  return (
    <Box
      minH={"100vh"}
      bg={bgColor}
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/create"
          element={<CreatePage />}
        />
      </Routes>
    </Box>
  );
}

export default App;
