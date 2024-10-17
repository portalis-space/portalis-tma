"use client"
import Typography from "@/components/atoms/Typography.atom";
import Loader from "@/components/molecules/Loader.molecule";
import NFTCard from "@/components/molecules/NFTCard.molecule";
import { useContractContext } from "@/contexts/Contract.context";
import { useGetNFTsByContractQuery } from "@/services/web3/queries/GetNFTsByContract.query";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronDoubleRight } from "react-icons/hi2";

type Props = {
  contractAddress?: string;
  name?: string;
}

const AllEligibleCollection = ({contractAddress, name}: Props) => {
  const {contract, activeChain} = useContractContext();
  
  const {isLoading: isGetNFTsByContractLoading, data: getNFTsByContractQuery} = useGetNFTsByContractQuery({
    page: 1,
    size: 5,
    chain: activeChain,
    type: contract,
    contractAddress
  });
  const NFtsData = useMemo(() => getNFTsByContractQuery?.data, [getNFTsByContractQuery?.data]);

  return (
    <section className="flex flex-col gap-3 my-4">
      {
        isGetNFTsByContractLoading && <div className="flex items-center justify-center h-1/3 w-full"><Loader /></div>
      }
      {
        NFtsData && NFtsData.length > 0 && 
        <>
          <Link href={`/collection/${contractAddress}`} className="flex items-center justify-between bg-neutral-300 dark:bg-neutral-700 rounded-lg p-3">
            <Typography variant="text-sm" weight="bold" className="truncate">{name}</Typography>
            <HiChevronDoubleRight className="text-primary-blue-600" />
          </Link>
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
    </section>
  )
}

export default AllEligibleCollection;