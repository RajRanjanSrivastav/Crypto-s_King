import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const Errorcomp = ({message}) => {
  return (
    <Alert
    status={"error"}
    position={"fixed"}
    left={"50%"}
    bottom={"4"}
    w={"container.lg"}
    transform={"translate(-50%)"}
    >
      <AlertIcon/>
      {message}
    </Alert>
  )
}

export default Errorcomp
