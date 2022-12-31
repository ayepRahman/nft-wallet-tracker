import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
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
      addresses: [{ address: "Add wallet address here" }],
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
    <>
      <div>Nft Wallet Tracker</div>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {!!fields?.length &&
          fields?.map((field, index) => {
            return (
              <>
                <Flex
                  key={field.id} // important to include key with field's id
                  alignItems="center"
                  gap="1rem"
                  mb="0.5rem"
                >
                  <Input
                    placeholder="address"
                    width="full"
                    {...register(
                      `${SearchNftsEnum.addresses}.${index}.address`
                    )}
                  />
                  <Button
                    onClick={() =>
                      insert(1, { address: "Add wallet address here" })
                    }
                  >
                    ADD
                  </Button>
                  <Button onClick={() => remove(index)}>DELETE</Button>
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

      {/* pagination */}

      {nfts?.length &&
        nfts.map((nft) => {
          return (
            <Box border="1px" p="1rem" key={nft.tokenId}>
              {JSON.stringify(nft)}
            </Box>
          );
        })}
    </>
  );
}
