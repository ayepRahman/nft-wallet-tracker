import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import NftCard from "@components/NftCard";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetUsersNfts from "@hooks/useGetUsersNfts";
import { ethers } from "ethers";
import { useFieldArray, useForm } from "react-hook-form";

import * as z from "zod";

const SearchNftsSchema = z.object({
  addresses: z.array(
    z.object({
      address: z.string().refine(
        async (val) => {
          console.log("is Valid", ethers.utils.isAddress(val));
          return ethers.utils.isAddress(val);
        },
        {
          message: "Not a valid wallet address!",
        }
      ),
    })
  ),
});

export const SearchNftsEnum = SearchNftsSchema.keyof().Enum;

export type SearchNftsType = z.infer<typeof SearchNftsSchema>;

export default function Home() {
  const addresses = [
    "0x6C848c17342A45B2468dED67130f0349508a4EeA",
    "0x16F8E25a7Ce07033410D6C2bd3181529055C05DF",
  ];

  const { data: nfts, mutate, isLoading } = useGetUsersNfts({});

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SearchNftsSchema),
    defaultValues: {
      addresses: [{ address: "" }],
    },
  });

  console.log("NFTS", nfts?.length);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: SearchNftsEnum.addresses, // unique name for your Field Array
    }
  );

  const handleOnSubmit = (values: SearchNftsType) => {
    const addresses = !!values?.addresses?.length
      ? values?.addresses?.map((v) => v.address)
      : [];
    console.log("VALUES", values);
    mutate({ addresses });
  };

  return (
    <Container maxW="container.lg">
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading size="md">Search by multiple wallet address</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {!!fields?.length ? (
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                {fields?.map((field, index) => {
                  return (
                    <>
                      <Flex
                        key={field.id} // important to include key with field's id
                        alignItems="center"
                        gap="1rem"
                        mb="0.5rem"
                      >
                        <Input
                          placeholder="Add wallet address here"
                          width="full"
                          {...register(
                            `${SearchNftsEnum.addresses}.${index}.address`
                          )}
                        />
                        <Button onClick={() => insert(1, { address: "" })}>
                          <AddIcon />
                        </Button>
                        <Button onClick={() => remove(index)}>
                          <CloseIcon />
                        </Button>
                      </Flex>
                      {!!errors?.addresses?.[index]?.address?.message && (
                        <Text fontSize="sm" mb="0.5rem" color="red.300">
                          {errors?.addresses?.[index]?.address?.message}
                        </Text>
                      )}
                    </>
                  );
                })}
                <Button type="submit" isLoading={isLoading} w="full">
                  Search
                </Button>
              </form>
            ) : (
              <Flex w="full" justifyContent="flex-end">
                <Button onClick={() => insert(1, { address: "" })}>Add</Button>
              </Flex>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* pagination */}

      <Box height="calc(100vh - 156px)" overflowY="auto">
        {/* <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchNextPage()}
            hasMore={hasMore}
            useWindow={false}
          > */}
        <Grid
          p="1rem"
          alignItems="flex-start"
          templateColumns="repeat(auto-fill, minmax(242px, 1fr))"
          templateRows="auto 1fr"
          gap="1rem"
        >
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <>
              {!!nfts?.length &&
                nfts?.length > 0 &&
                nfts.map((t, i) => {
                  if (!t) return;
                  return (
                    <GridItem key={t?.title || i} w="100%">
                      <NftCard
                        nft={t}
                        // onClick={() =>
                        //   !selectedTokenIds.includes(t?.id || "")
                        //     ? handleSelected(t?.id || "")
                        //     : handleUnSelected(t?.id || "")
                        // }
                        // isSelected={selectedTokenIds.includes(t?.id || "")}
                      />
                    </GridItem>
                  );
                })}
              {/* {isFetching && loader(12)} */}
            </>
          )}
        </Grid>
        {/* </InfiniteScroll> */}
      </Box>
    </Container>
  );
}
