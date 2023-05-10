import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack w={"50"} h="90vh" justifyContent={"center"}>
     <Box transform={"scaler(9)"}>
     <Spinner 
      thickness="5px"
      speed="0.65s"
      emptyColor="gray.200"
      color="black"
      size="xl"/>
     </Box>
    </VStack>
  )
}

export default Loader
