import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btc from "../asset/btc.png";
import {motion} from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"86vh"}>
      <motion.div
      style={{
        height:"80vh",
      }}
      animate={{
        translateY:"18px"
      }}
      transition={{
        duration:1.6,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      >
      <Image
        w={"full"}
        h={"470"}
        objectFit={"contain"}
        src={btc}
        filter={"grayscale(1)"} 
      />
      </motion.div>
     

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        mt={"-14"}
        color={"whiteAlpha.800"}
      >
        Crypto's King
      </Text>
    </Box>
  );
};

export default Home;
