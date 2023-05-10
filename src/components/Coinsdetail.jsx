import {
  Text,
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import { server } from "..";
import Errorcomp from "./Errorcomp";
import Chart from "./Chart";

const Coinsdetail = () => {
  const [Coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [days,setDays] = useState("24h");
  const [chartArray,setchartArray] = useState([]);
  const params = useParams();
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChart = (key) => {
    switch(key)
    {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;

      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  }

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data:chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        
        setCoin(data);
        setchartArray(chartData.prices);
        setLoading(false);
        // console.log(chartData);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [params.id,currency,days]);

  if (error)
    return <Errorcomp message={"error while fetching data from API"} />;

  return (
    <Container maxW={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box>
            <Chart arr={chartArray} currency={currencySymbol} days={days}/>
          </Box>

          {/* button */}
          <HStack overflowX={"auto"} p={"4"}>
           {
            btns.map((i)=>(
              <Button key={i} onClick={()=> switchChart(i)}>
                {i}
              </Button>
            ))
           }
          </HStack>
          <RadioGroup p={"8"} value={currency} onChange={setCurrency}>
            <HStack spacing={"5"} margin={"4"}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignItems={"center"} opacity={"0.7"}>
              Last Updated on{" "}
              {Date(Coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={Coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{Coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {Coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    Coin.market_data.price_change_percentage_24h > 0
                      ? "in"
                      : "decrease"
                  }
                />
                {Coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${Coin.market_cap_rank}`}
            </Badge>

            <CustomBar
              high={`${currencySymbol}${Coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${Coin.market_data.low_24h[currency]}`}
            ></CustomBar>

            <Box w={"full"} p="4">
              <Item title={"Max Supply"} value={Coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={Coin.market_data.circulating_supply}
              />
              <Item
                title={"Max Cap"}
                value={`${currencySymbol}${Coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${Coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${Coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack w={"full"} my={"8"} justifyContent={"space-between"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);
const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-evenly"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}> 24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);
export default Coinsdetail;
