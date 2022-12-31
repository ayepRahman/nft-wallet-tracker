import { alchemy } from "@config/alchemy";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { OwnedNft, OwnedNftsResponse } from "alchemy-sdk";

interface UseGetUsersNftsProps {
  options?: UseMutationOptions<OwnedNft[], Error, { addresses: string[] }>;
}

const useGetUsersNfts = ({ options }: UseGetUsersNftsProps) => {
  return useMutation({
    mutationKey: ["GetUsersNfts"],
    mutationFn: async ({ addresses }) => {
      const promises = addresses.map((addr) =>
        alchemy.nft.getNftsForOwner(addr)
      );

      const res: OwnedNftsResponse[] = await Promise.all(promises);
      const mappedNfts = res.map((data) => data.ownedNfts).flat();

      return mappedNfts;
    },
    ...options,
  });
};

export default useGetUsersNfts;
