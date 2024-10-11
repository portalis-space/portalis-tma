"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import CollectionCard from "@/components/molecules/CollectionCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import { EventType } from "@/services/event/Event.types";
import { useGetOwnedNFTsQuery } from "@/services/web3/queries/GetOwnedNFTs.query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useAccount } from "wagmi";

type Props = {
  eventData?: EventType;
}

const OwnedEligibleCollection = ({eventData}: Props) => {
  const router = useRouter();
  const { address, chain } = useAccount();

  const [page, setPage] = useState(1);

  const {isLoading: isGetOwnedNFTLoading, data: getOwnedNFTsQuery} = useGetOwnedNFTsQuery({
    page,
    size: 10,
    walletAddress: eventData?.attributes?.contractAddresses && eventData.attributes.contractAddresses.length > 0 && address ? address : undefined,
    chain: chain?.name === 'Ethereum' ? chain?.name?.substring(0,3)?.toLowerCase() : chain?.name?.toLowerCase(),
    type: 'evm', // TODO: Change when TON available
    contractAddress: eventData?.attributes?.contractAddresses && eventData.attributes.contractAddresses.length > 0 ?
      eventData.attributes.contractAddresses.map((address) => address.contract_address || '') : undefined
  });
  const ownedNFtsData = useMemo(() => getOwnedNFTsQuery?.data, [getOwnedNFTsQuery?.data]);
  const ownedNFtsMeta = useMemo(() => getOwnedNFTsQuery?.meta, [getOwnedNFTsQuery?.meta]);

  const handleUseNFTToGenerate = useCallback((address: string) => {
    router.push(`/generate-ticket?id=${eventData?.id}&address=${address}`)
  }, [eventData?.id, router])

  return (
    <section className="flex flex-col gap-3">
      {
        isGetOwnedNFTLoading && <div className="flex items-center justify-center h-1/3 w-full"><Loader /></div>
      }
      {
        ownedNFtsData && ownedNFtsData.length > 0 && 
        <>
          <div className="flex flex-row w-full flex-wrap">
            {
              ownedNFtsData.map((collection) =>
                <div className="p-1 w-1/2 lg:w-1/3" key={collection.attributes.contract_address}>
                  <CollectionCard collection={collection} owned withModal onClickOnGeneration={handleUseNFTToGenerate} />
                </div> 
              )
            }
          </div>
          <Pagination page={page} setPage={setPage} meta={ownedNFtsMeta} />
        </>
      }
      {
        !isGetOwnedNFTLoading && ((ownedNFtsData && ownedNFtsData.length === 0) ||  !ownedNFtsData) &&
        <div className="flex flex-col items-center py-3 gap-2">
          <Typography variant="text-sm">You don&apos;t have any eligible NFT.</Typography>
          <Typography variant="text-sm">Connect or change your wallet.</Typography>
          <Button variant="filled" onClick={() => router.push('/wallet')} className="w-1/2">Go to My Wallet</Button>
        </div>
      }
    </section>
  )
}

export default OwnedEligibleCollection;