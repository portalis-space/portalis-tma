"use client"
import Typography from "@/components/atoms/Typography.atom";
import Loader from "@/components/molecules/Loader.molecule";
import NFTCard from "@/components/molecules/NFTCard.molecule";
import { useGetNFTsByContractQuery } from "@/services/web3/queries/GetNFTsByContract.query";
import { useMemo } from "react";
import { useAccount } from "wagmi";

type Props = {
  contractAddress?: string;
  name?: string;
}

const AllEligibleCollection = ({contractAddress, name}: Props) => {
  const { chain } = useAccount();

  const {isLoading: isGetOwnedNFTLoading, data: getNFTsByContractQuery} = useGetNFTsByContractQuery({
    page: 1,
    size: 5,
    chain: chain?.name ? (chain.name === 'Ethereum' ? chain.name?.substring(0,3)?.toLowerCase() : chain.name?.toLowerCase()) : undefined,
    type: 'evm', // TODO: Change when TON available
    contractAddress
  });
  const NFtsData = useMemo(() => getNFTsByContractQuery?.data, [getNFTsByContractQuery?.data]);

  return (
    <section className="flex flex-col gap-3 my-4">
      <Typography variant="text-sm" weight="bold">{name}</Typography>
      {
        isGetOwnedNFTLoading && <div className="flex items-center justify-center h-1/3 w-full"><Loader /></div>
      }
      {
        NFtsData && NFtsData.length > 0 && 
        <>
          <div className="flex flex-row w-full overflow-x-auto">
            {
              NFtsData.map((nft,index) =>
                <div className="p-1 w-1/2 lg:w-1/3" key={index}>
                  <NFTCard nft={nft.attributes} />
                </div> 
              )
            }
          </div>
        </>
      }
      {
        !isGetOwnedNFTLoading && NFtsData && NFtsData.length === 0 && <Typography variant="text-xs" className="text-center">No item found.</Typography>
      }
    </section>
  )
}

export default AllEligibleCollection;