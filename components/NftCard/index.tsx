import {
  Box,
  Button,
  Flex,
  Skeleton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import Image from "@components/Image";
import { OwnedNft } from "alchemy-sdk";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import blurLogo from "public/images/blur_logo.jpg";
import mintableLogo from "public/images/mintable_logo.jpeg";
import openSeaLogo from "public/images/opensea_logo.png";
import x2y2Logo from "public/images/x2y2_logo.png";
import React, { useMemo } from "react";
import { FaEthereum } from "react-icons/fa";

const logos: { [key: number]: StaticImageData } = {
  1: mintableLogo,
  2: openSeaLogo,
  3: x2y2Logo,
  4: blurLogo,
};

// Math.floor(Math.random() * 4) + 1

interface NftCardProps {
  nft: OwnedNft;
  isLoading?: boolean;
}

const NftCard: React.FC<NftCardProps> = ({ nft, isLoading }) => {
  const router = useRouter();
  const [showSelectIcon, setShowSelectIcon] = React.useState<boolean>(false);
  const { colorMode } = useColorMode();
  const imgUrl = nft?.media?.[0]?.gateway ?? null;
  const marketImgSrc = useMemo(() => {
    const randomNo = Math.floor(Math.random() * 4) + 1;
    return logos[randomNo];
  }, []);
  const title = `${nft?.title}`;
  const priceInEth = null;

  // const getCardBoxShadow = () => {
  //   return !isSelected
  //     ? `0 0 0 3px transparent, 0 2px 8px ${
  //         theme.colors.gray[colorMode === "light" ? 300 : 700]
  //       }`
  //     : `0 0 0 3px ${theme.colors.pink[colorMode === "light" ? 400 : 600]}`;
  // };

  // const getOnHoverCardBoxShadow = () => {
  //   return !isSelected
  //     ? `0 0 0 3px transparent, 0 2px 8px ${
  //         theme.colors.gray[colorMode === "light" ? 400 : 600]
  //       }`
  //     : ``;
  // };

  // const handleRedirect = (event: any) => {
  //   event.stopPropagation();
  //   router.push(`/assets/${nft?.address}/${nft?.token_id}`);
  // };

  return (
    <Box
      as={motion.div}
      whileHover={{ scale: 1.02 }}
      overflow="hidden"
      // onClick={onClick}
      borderRadius="12px"
      w="full"
      // h="full"
      // boxShadow={getCardBoxShadow()}
      css={{
        "&:hover": {
          // boxShadow: getOnHoverCardBoxShadow(),
          cursor: "pointer",
        },
      }}
      onMouseEnter={() => setShowSelectIcon(true)}
      onMouseLeave={() => setShowSelectIcon(false)}
    >
      <Box w="full" position="relative">
        <Skeleton isLoaded={!isLoading}>
          {/* brand logo */}
          <Box
            position="absolute"
            top="0.5rem"
            left="0.5rem"
            rounded="full"
            overflow="hidden"
            height="32px"
            width="32px"
            zIndex={1}
          >
            <Image fill src={marketImgSrc.src} alt="adas" />
          </Box>
          {/* select icon */}
          {/* {!isSelected && showSelectIcon && (
            <Box
              position="absolute"
              top="0.5rem"
              right="0.5rem"
              borderRadius="full"
              height="32px"
              width="32px"
              bgColor="white"
              opacity="0.5"
              display="flex"
              justifyContent="center"
              alignItems="center"
              zIndex="1"
            >
              <FaPlus size="1.5rem" fill={theme.colors.pink[300]} />
            </Box>
          )} */}
          {/* {isSelected && (
            <Box
              position="absolute"
              top="0.5rem"
              right="0.5rem"
              borderRadius="full"
              boxSize="2rem"
              bgColor="white"
              zIndex="1"
            >
              <FaCheckCircle size="2rem" fill={theme.colors.pink[400]} />
            </Box>
          )} */}
          {/* main image */}

          <Box height="250px" width="100%" maxW="100%">
            <Image fill src={imgUrl} alt={title || ""} />
          </Box>
        </Skeleton>
      </Box>
      <Box p="0.5rem">
        <Flex w="full" mb="0.5rem" alignItems="center">
          <Skeleton borderRadius="md" isLoaded={!isLoading}>
            <Text fontSize="14px">{isLoading ? "mocktext" : title}</Text>
          </Skeleton>
        </Flex>
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Skeleton borderRadius="md" isLoaded={!isLoading}>
            <Text
              display="flex"
              alignItems="center"
              fontSize="14px"
              lineHeight="14px"
            >
              {isLoading ? "mocktext" : priceInEth} <FaEthereum size={12} />
            </Text>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Button
              colorScheme="pink"
              size="xs"
              // onClick={handleRedirect}
            >
              View more
            </Button>
          </Skeleton>
        </Flex>
      </Box>
    </Box>
  );
};

export default NftCard;
