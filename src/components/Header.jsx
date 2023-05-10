import { Button, Center, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
   <HStack p={"5"} shadow={"base"} bgColor={"blackAlpha.900"} spacing={"8"}  >

    <Button variant={"unstyled"} color={"whiteAlpha.800"}>
     <Link to='/home'>Home</Link>
    </Button>

    <Button variant={"unstyled"} color={"whiteAlpha.800"}>
     <Link to='/coins'>Coins</Link>
    </Button>

    <Button variant={"unstyled"} color={"whiteAlpha.800"}>
     <Link to='/exchanges'>Exchanges</Link>
    </Button>

   </HStack>
  )
}

export default Header
