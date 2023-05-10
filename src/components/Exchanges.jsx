import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import Loader from "./Loader";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import Errorcomp from "./Errorcomp";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try
      {
      const { data } = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
      
      }
      catch(error)
      {
        setError(true);
        setLoading(false);
      }

    };

    fetchExchanges();
  }, []);

  if(error) return <Errorcomp message={"error while fetching data from API"}/>
  return (
    <Container maxW={"Container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"} >
            {exchanges.map((i) => (
              <Exchangecard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const Exchangecard = ({ img, name, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"56"}
      shadow={"xl"}
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
        {rank}
      </Heading>
      <Text size={"md"} noOfLines={1}>
        {name}
      </Text>
    </VStack>
  </a>
);

export default Exchanges;
