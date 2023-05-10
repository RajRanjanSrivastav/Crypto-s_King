import { Text, Image, Heading, VStack } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

const Coinscard = ({ id, name, symbol, price, img, currencySymbol= "₹"}) => (
    <Link to={`/coin/${id}`}>
      <VStack
        w={"56"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"6"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchange"}
        />
        <Heading size={"md"} noOfLines={1}>
          {symbol}
        </Heading>
        <Text size={"md"} noOfLines={1}>
          {name}
        </Text>
        <Text size={"md"} noOfLines={1}>
          {price? `${currencySymbol}${price}`:"NA"}
        </Text>
      </VStack>
    </Link>
  );

export default Coinscard
