import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import Loader from "./Loader";
import {
  Container,
  HStack,
  // VStack,
  // Image,
  // Heading,
  // Text,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Errorcomp from "./Errorcomp";
import Coinscard from "./Coinscard";

const Coins = () => {
  const [Coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const currencySymbol = currency==="inr"?"₹" :currency==="eur"?"€" : "$";
  const btn = new  Array(132).fill(1);
  
  const changePage = (page) =>{
     setPage(page);
     setLoading(true);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try
      {
      const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
      setCoins(data);
      setLoading(false);
      // console.log(data);
      }
      catch(error)
      {
        setError(true);
        setLoading(false);
      }

    };
    fetchCoins();
  }, [currency, page]);

  if(error) return <Errorcomp message={"error while fetching data from API"}/>
  return (

    <Container maxW={"Container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup p={"8"} value={currency} onChange={setCurrency}>
            <HStack spacing={"5"} margin={"4"}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {Coins.map((i) => (
              <Coinscard
                id={i.id}
                key={i.id}
                name={i.name}
                price={i.current_price}
                symbol={i.symbol}
                img={i.image}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
           {
            btn.map((item,index)=>(
            <Button
              key={index}
              onClick={()=> changePage(index+1)}
              bgColor={"blackAlpha.800"}
              color={"white"}
            >
            {index+1}
            </Button>
            ))
           }
          </HStack>
        </>
        
      )}
    </Container>
  );
};


export default Coins
