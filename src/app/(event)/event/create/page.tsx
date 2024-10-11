"use client"
import Button from "@/components/atoms/Button.atom";
import Input from "@/components/atoms/Input.atom";
import Typography from "@/components/atoms/Typography.atom";
import Calendar from "@/components/molecules/Calendar.molecule";
import CollectionCard from "@/components/molecules/CollectionCard.molecule";
import { Dropdown, DropdownOption } from "@/components/molecules/Dropdown.molecule";
import InputWithIcon from "@/components/molecules/InputWithIcon.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Modal from "@/components/molecules/Modal.molecule";
import { CheckboxItem, MultipleCheckbox } from "@/components/molecules/MultipleCheckbox.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import Uploader from "@/components/molecules/Uploader.molecule";
import { useAuthContext } from "@/contexts/Auth.context";
import { DayType } from "@/services/common/Common.types";
import { EventScheduleTypeType } from "@/services/event/Event.types";
import useCreateEvent from "@/services/event/mutations/CreateEvent.query";
import { useGetEventsKey } from "@/services/event/queries/GetEvents.query";
import { useGetSearchGeocodingQuery } from "@/services/map/queries/useSearchGeocoding.query";
import { UploaderAttributesType } from "@/services/uploader/Uploader.types";
import { useGetChainsQuery } from "@/services/web3/queries/GetChains.query";
import { useGetOwnedNFTsQuery } from "@/services/web3/queries/GetOwnedNFTs.query";
import { ContractType, EligibleContractType } from "@/services/web3/Web3.types";
import { shortenAddress } from "@/utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { format, isAfter } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { HiCalendar, HiChevronRight, HiMapPin, HiOutlineArrowPath, HiOutlineArrowPathRoundedSquare, HiOutlineClock, HiPlus, HiUserGroup, HiXMark } from "react-icons/hi2";
import { useAccount } from "wagmi";

// dynamic maps
const Maps = dynamic(() => import("@/components/organisms/Maps.organism"));

const CreateEvent = () => {
  const queryClient = useQueryClient();
  const { address, chain: accountChain } = useAccount();
  const router = useRouter();
  const {currentUserData} = useAuthContext();

  const [eventImage, setEventImage] = useState<UploaderAttributesType | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [scheduleType, setScheduleType] = useState<EventScheduleTypeType>('ONE_TIME');
  const [scheduleInterval, setScheduleInterval] = useState<DayType[] | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [long, setLong] = useState<number | undefined>(undefined);
  const [location, setLocation] = useState("");
  const [locationDetail, setLocationDetail] = useState("");
  const [openSuggestLocation, setOpenSuggestLocation] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [contractType, setContractType] = useState<ContractType>('evm');
  const [chain, setChain] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [eligibleContracts, setEligibleContracts] = useState<EligibleContractType[]>([]);
  const [eligibleErr, setEligibleErr] = useState<string | undefined>(undefined);
  const [NFTsPage, setNFTsPage] = useState(1);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [scannerField, setScannerField] = useState('');
  const [additionalScanner, setAdditionalScanner] = useState<string[]>([]);
  const [scannerErr, setScannerErr] = useState<string | undefined>(undefined);
  const [capacity, setCapacity] = useState(1);
  const [description, setDescription] = useState("");
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [createErrMessage, setCreateErrMessage] = useState<string | undefined>(undefined);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// ######################################################################################################### QUERIES & MUTATIONS
  const {isLoading: isSearchGeoLoading, ...searchGeocodingQuery } = useGetSearchGeocodingQuery({
    q: location
  });
  const searchMapResult = useMemo(
    () => searchGeocodingQuery.data,
    [searchGeocodingQuery]
  );

  const {data: chainsQuery} = useGetChainsQuery({contractType});
  const chainsData = useMemo(() => chainsQuery?.data, [chainsQuery?.data]);

  const {isLoading: isOwnedNFTsLoading, data: getOwnedNFTsQuery} = useGetOwnedNFTsQuery({
    page: NFTsPage,
    size: 10,
    walletAddress: address,
    chain: accountChain?.name === 'Ethereum' ? accountChain?.name?.substring(0,3)?.toLowerCase() : accountChain?.name?.toLowerCase(),
    type: 'evm'
  });
  const ownedNFtsData = useMemo(() => getOwnedNFTsQuery?.data, [getOwnedNFTsQuery?.data]);
  const ownedNFtsMeta= useMemo(() => getOwnedNFTsQuery?.meta, [getOwnedNFTsQuery?.meta]);

  const createEvent = useCreateEvent({
    onSuccess: (res) => {
      queryClient.invalidateQueries({queryKey: [useGetEventsKey]});
      router.push(`/event/${res.data.id}`);
    },
    onError: (e) => {
      setCreateErrMessage(e.errors[0].detail)
    },
    onMutate: () => {
      setIsCreateLoading(true);
      setCreateErrMessage(undefined);
    },
    onSettled: () => {
      setIsCreateLoading(false);
    }
  });

// ######################################################################################################### END OF QUERIES & MUTATIONS

  const scheduleTypeOptions: DropdownOption[] = [
    {
      id: 'ONE_TIME',
      element: (
        <div className="flex flex-row items-center justify-start gap-2">
          <HiOutlineClock className="text-primary-purple-105" />
          <Typography variant='text-base'>One Time</Typography>
        </div>
      ),
    },
    {
      id: 'DAILY',
      element: (
        <div className="flex flex-row items-center justify-start gap-2">
          <HiOutlineArrowPath className="text-primary-purple-105" />
          <Typography variant='text-base'>Daily</Typography>
        </div>
      ),
    },
    {
      id: 'WEEKLY',
      element: (
        <div className="flex flex-row items-center justify-start gap-2">
          <HiOutlineArrowPathRoundedSquare className="text-primary-purple-105" />
          <Typography variant='text-base'>Weekly</Typography>
        </div>
      ),
    },
  ];

  const intervalItems: CheckboxItem[] = [
    { id: "SUNDAY", label: "Sunday" },
    { id: "MONDAY", label: "Monday" },
    { id: "TUESDAY", label: "Tuesday" },
    { id: "WEDNESDAY", label: "Wednesday" },
    { id: "THURSDAY", label: "Thursday" },
    { id: "FRIDAY", label: "Friday" },
    { id: "SATURDAY", label: "Saturday" },
  ];

  const contractTypeOptions: DropdownOption[] = [
    {
      id: 'evm',
      element: (<Typography variant='text-base'>EVM</Typography>)
    },
    {
      id: 'ton',
      element: (<Typography variant='text-base'>TON</Typography>)
    }
  ]

  const chainOptions: DropdownOption[] = chainsData?.attributes ? Object.keys(chainsData.attributes).map((chain) => ({
    id: chain.toLowerCase(),
    element: (<Typography variant='text-base'>{chain}</Typography>)
  })) : [];

  const isStartAfterEnd = startDate && endDate && isAfter(startDate, endDate);
  const isIntervalError = scheduleType === 'WEEKLY' && !(scheduleInterval && scheduleInterval.length > 0);

  const handleSelectScheduleType = useCallback((optionId: string) => {
    setScheduleType(optionId as EventScheduleTypeType);
  }, []);

  const handleSelectContractType = useCallback((optionId: string) => {
    setContractType(optionId as ContractType);
    setChain('');
    setContractAddress('');
  }, []);

  const handleSelectChain = useCallback((optionId: string) => {
    setChain(optionId);
    setContractAddress('');
  }, []);

  const handleAddEligibleContractAddress = useCallback((isFromOwnedList?: boolean, ownedAddress?: string) => {
    setEligibleErr(undefined);
    const newEligibleContract = isFromOwnedList && ownedAddress ? {
      type: 'evm' as ContractType, // TODO: change when TON available
      chain: accountChain?.name?.toLowerCase() || '',
      contractAddress: ownedAddress || ''
    } : {
      type: contractType,
      chain,
      contractAddress
    };
    if (!eligibleContracts.some((contract) => contract.contractAddress === (isFromOwnedList ? ownedAddress : contractAddress) )) {
      setEligibleContracts([...eligibleContracts, newEligibleContract]);
      setContractType('evm');
      setChain('');
      setContractAddress('');
      setIsContractModalOpen(false);
    } else {
      setEligibleErr('contract address already exists');
    }
  }, [contractType, chain, contractAddress, eligibleContracts, accountChain]);

  const handleRemoveEligibleContractAddress = useCallback((address: string) => {
    const newEligibleContract = eligibleContracts.filter(item => item.contractAddress !== address);;
    setEligibleContracts(newEligibleContract);
  }, [eligibleContracts]);

  const handleAddScanner = useCallback(() => {
    setScannerErr(undefined);
    if (!additionalScanner.some((scanner) => scanner === scannerField)) {
      setAdditionalScanner([...additionalScanner, scannerField]);
      setScannerField('');
      setIsScannerModalOpen(false);
    } else {
      setScannerErr('scanner already exists')
    }
  }, [additionalScanner, scannerField]);

  const handleRemoveScanner = useCallback((username: string) => {
    const newScanner = additionalScanner.filter(item => item !== username);;
    setAdditionalScanner(newScanner);
  }, [additionalScanner]);

  const handleCheckboxChange = useCallback((checkedItems?: string[]) => {
    setScheduleInterval(checkedItems as DayType[]); // Update the state when the selection changes
  }, []);

  const handleRemoveDate = useCallback(() => {
    setScheduleType('ONE_TIME');
    setStartDate(null);
    setEndDate(null);
    setScheduleInterval(undefined);
  }, []);

  const handleSearchLocation = useCallback((value: string) => {
    setOpenSuggestLocation(true);
    setSearchLocation(value);
    setTimeout(() => {
      setLocation(value)
    }, 1000);
  }, []);

  const handleRemoveLocation = useCallback(() => {
    setSearchLocation("");
    setLocation("");
    setLocationDetail("");
    setLat(undefined);
    setLong(undefined);
  }, []);

  const handleCreate = useCallback(() => {
    createEvent.mutate({
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      startTime: startDate ? format(startDate, 'HH:mm:ss') : undefined,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
      endTime: endDate ? format(endDate, 'HH:mm:ss') : undefined,
      scheduleType,
      timezone,
      scheduleInterval,
      title,
      description,
      location: {
        latitude: lat || 0,
        longitude: long || 0,
        address: locationDetail
      },
      banner: eventImage?.fileUrl,
      capacity,
      contractAddresses: eligibleContracts,
      scanners: currentUserData?.attributes.username ? [...additionalScanner, currentUserData?.attributes.username] : additionalScanner
    })
  }, [additionalScanner, capacity, createEvent, currentUserData?.attributes.username, description, eligibleContracts, endDate, eventImage?.fileUrl, lat, locationDetail, long, scheduleInterval, scheduleType, startDate, timezone, title]);

  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">Create New Event</Typography>
      <section className="flex flex-col w-full gap-4">
        <Uploader
          fileKey={eventImage?.fileUrl}
          id="event-image"
          name="eventImage"
          handleChange={(param) =>
            setEventImage(param)
          }
        />
        <Input placeholder="Event Name" onChange={(e) => setTitle(e.target.value)}/>      
        <div
          className="w-full flex flex-row items-center justify-between bg-neutral-200 dark:bg-neutral-800 py-3 px-2 rounded-xl"
          role="button"
          onClick={() => startDate && endDate ? {} : setIsDateModalOpen(true)}
        >
          <div className="flex flex-row items-start gap-2">
            <HiCalendar className="w-4 h-4 text-primary-purple-105" />
            {
              startDate && endDate ?
              <div className="flex flex-col flex-1">
                <Typography variant="text-xs" weight="bold">{scheduleType.replaceAll('_', ' ')}</Typography>
                <Typography variant="text-xs">{format(startDate, 'LLL dd, y hh:mmaaa')} to</Typography>
                <Typography variant="text-xs">{format(endDate, 'LLL dd, y hh:mmaaa')}</Typography>
                {
                  scheduleType === 'WEEKLY' && scheduleInterval &&
                  <Typography variant="text-xs">
                    {
                      scheduleInterval ? scheduleInterval.map((interval) => interval.substring(0,3) + ' ') : '-'
                    }
                  </Typography>
                }
              </div> :
              <Typography variant="text-lg" className="pl-3 !text-neutral-400">Event Date</Typography>
            }
          </div>
          {
            startDate && endDate ?
            <Button variant="tinted" onClick={handleRemoveDate} className="w-5 h-5"><HiXMark /></Button> :
            <Button variant="tinted" className="w-5 h-5"><HiChevronRight /></Button>
          }
        </div>
        {
          lat && long &&
          <>
            <Maps
              className="!h-[160px] rounded-xl relative z-[1]"
              lat={lat}
              lng={long}
              onDblClick={(e) => {
                // setSearchLocation(e?.name);
                setLat(Number(e?.lat));
                setLong(Number(e?.lon));
                // setLocation(e?.name);
                // setLocationDetail(e?.display_name);
              }}
            />
            {
              locationDetail &&
              <div className="flex flex-row items-center justify-center bg-neutral-200 dark:bg-neutral-800 py-2 px-1 rounded-xl">
                <div className="flex flex-row items-start gap-2">
                  <HiMapPin className="w-4 h-4 text-primary-purple-105" />
                  <Typography variant="text-xs" className="flex-1">{locationDetail}</Typography>
                </div>
                <Button variant="tinted" onClick={handleRemoveLocation} className="w-5 h-5"><HiXMark /></Button>
              </div>
            }
          </>
        }
        {
          !lat && !long &&
          <div className="relative w-full">
            <SearchWithDebounce
              setSearchText={handleSearchLocation}
              defaultValue={searchLocation}
              onBlur={() =>
                setTimeout(() => setOpenSuggestLocation(false), 200)
              }
              onFocus={() => setOpenSuggestLocation(true)}
              placeholder="Search for location"
              isLoading={isSearchGeoLoading}
            />
            {
              searchMapResult &&
              searchMapResult.length > 0 &&
              openSuggestLocation && (
                <div className="bg-neutral-50 dark:bg-neutral-950 left-0 p-3 rounded-xl border-2 w-full absolute z-50">
                  {searchMapResult?.map((item, index) => (
                    <div
                      role="button"
                      className="text-[10px] text-neutral-800 dark:text-neutral-200  my-2 rounded-[8px] hover:!text-primary-blue-500 p-2 cursor-pointer"
                      key={index}
                      onClick={() => {
                        setLat(Number(item.lat));
                        setLong(Number(item.lon));
                        setLocationDetail(item.display_name);
                        setOpenSuggestLocation(false);
                      }}
                    >
                      {item.display_name}
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        }
        <InputWithIcon
          headingIcon={<HiUserGroup className="text-primary-purple-105" />}
          onChange={(e) => setCapacity(Number(e.target.value))}
          onKeyDown={(event) => {
            if (!(/[0-9]/.test(event.key) || event.key === 'Backspace')) {
              event.preventDefault();
            }
          }}
          placeholder="Event Capacity"
        />
        <textarea
          className="resize-none w-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-5 py-3 rounded-xl border-transparent outline-none focus:border-transparent focus:ring-0 focus:outline-none"
          rows={4}
          placeholder="Event Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-800 py-2 px-1 rounded-xl gap-2">
          <Typography variant="text-base" className="text-neutral-400 text-center">Eligible Contract Addresses</Typography>
          {
            eligibleContracts.map((contract) => 
              <div className="w-full flex flex-row items-center justify-between bg-neutral-50 dark:bg-neutral-950 p-2 rounded-xl" key={contract.contractAddress}>
                <div className="flex flex-row items-center gap-2">
                  <Typography variant="text-sm" weight="bold">{contract.type.toUpperCase()}</Typography>
                  <div className="flex flex-col">
                    <Typography variant="text-xs" weight="bold">{contract.chain.toUpperCase()}</Typography>
                    <Typography variant="text-xs">{shortenAddress(contract.contractAddress)}</Typography>
                  </div>
                </div>
                <Button variant="tinted" onClick={() => handleRemoveEligibleContractAddress(contract.contractAddress)} className="w-5 h-5"><HiXMark /></Button>
              </div>
            )
          }
          <Button variant="outlined" onClick={() => setIsContractModalOpen(true)}><HiPlus /></Button>
        </div>
        <div className="flex flex-col items-center justify-center bg-neutral-200 dark:bg-neutral-800 py-2 px-1 rounded-xl gap-2">
          <Typography variant="text-base" className="text-neutral-400 text-center">Additional Scanner</Typography>
          {
            additionalScanner.map((scanner) => 
              <div className="w-full flex flex-row items-center justify-between bg-neutral-50 dark:bg-neutral-950 p-2 rounded-xl" key={scanner}>
                <Typography variant="text-sm" weight="bold">@{scanner}</Typography>
                <Button variant="tinted" onClick={() => handleRemoveScanner(scanner)} className="w-5 h-5"><HiXMark /></Button>
              </div>
            )
          }
          <Button variant="outlined" onClick={() => setIsScannerModalOpen(true)}><HiPlus /></Button>
        </div>
        <Button
          variant="filled"
          disabled={isCreateLoading || !title || !startDate || !endDate || !lat || !long || !capacity}
          onClick={handleCreate}
        >
          {isCreateLoading ? <Loader /> : 'Create Event'}
        </Button>
        { createErrMessage && <Typography variant="text-xs" className="!text-red-500 text-center">{createErrMessage}</Typography> }
      </section>
      <Modal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
      >
        <div className="flex flex-col gap-2 py-4">
          <Typography variant="text-base" weight="bold" className="text-center">Set Your Event Date</Typography>
          <Typography variant="text-xs" className="text-center">Your Timezone : {timezone || '-'}</Typography>
          <Dropdown options={scheduleTypeOptions} label="Schedule Type" onSelect={handleSelectScheduleType} selectedOption={scheduleType} />
          <div className="flex flex-col gap-0.5 w-full">
            <Typography variant="text-xs">Start</Typography>
            <Calendar calendarId="create-datepicker-start" selectedDate={startDate} onDateTimeChange={(date) => setStartDate(date)} showTime={true} />
            { !startDate && <Typography variant="text-xs" className="!text-red-500">please choose start date</Typography> }
          </div>
          <div className="flex flex-col gap-0.5 w-full">
            <Typography variant="text-xs">End</Typography>
            <Calendar calendarId="create-datepicker-end" selectedDate={endDate} onDateTimeChange={(date) => setEndDate(date)} showTime={true} />
            { !endDate && <Typography variant="text-xs" className="!text-red-500">please choose end date</Typography> }
          </div>
          { isStartAfterEnd && <Typography variant="text-xs" className="!text-red-500">end date must after start date</Typography> }
          {
            scheduleType === 'WEEKLY' &&
            <div className="flex flex-col gap-0.5 w-full">
              <Typography variant="text-xs">Intervals</Typography>
              <MultipleCheckbox
                items={intervalItems}
                selectedItems={scheduleInterval as string[]} // Controlled state
                onChange={handleCheckboxChange} // Handler to update state
              />
            </div>
          }
          { isIntervalError && <Typography variant="text-xs" className="!text-red-500">choose at least 1 day interval</Typography> }
        </div>
      </Modal>
      <Modal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
      >
        <div className="flex flex-col gap-2 py-4">
          <Typography variant="text-base" weight="bold" className="text-center">Set Your Eligible Contract</Typography>
          <Dropdown options={contractTypeOptions} label="Contract Type" onSelect={handleSelectContractType} selectedOption={contractType} />
          <Dropdown options={chainOptions} label="Chain" onSelect={handleSelectChain} selectedOption={chain} />
          <Input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder="Input Your Contract Address" />
          <Button variant="outlined" onClick={handleAddEligibleContractAddress} disabled={!contractType || !chain || !contractAddress}>Add</Button>
          {eligibleErr && <Typography variant="text-xs" className="!text-red-500">{eligibleErr}</Typography>}
        </div>
        {
          ownedNFtsData && ownedNFtsData.length > 0 ?
          <div className="flex flex-col gap-2 py-4">
            <Typography variant="text-base" weight="bold" className="text-center">- or -</Typography>
            <Typography variant="text-base" weight="bold" className="text-center">Owned NFT</Typography>
            <div className="flex flex-row flex-wrap">
              {
                ownedNFtsData.map((collection) => 
                  <div className="p-1 w-1/2 lg:w-1/3" key={collection.attributes.contract_address}>
                    <CollectionCard
                      collection={collection}
                      withModal={true}
                      owned={true}
                      onClickUseOnCreation={handleAddEligibleContractAddress}
                    />
                  </div>
                )
              }
            </div>
            {eligibleErr && <Typography variant="text-xs" className="!text-red-500">{eligibleErr}</Typography>} 
            <Pagination page={NFTsPage} setPage={setNFTsPage} meta={ownedNFtsMeta} />
          </div> :
          <div className="flex flex-col gap-2 py-4">
            <Typography variant="text-base" weight="bold" className="text-center">- or -</Typography>
            <Button variant="outlined" onClick={() => router.push('/wallet')}>Connect / Switch Your Wallet</Button>
          </div>
        }
        {
          isOwnedNFTsLoading && <div className="flex items-center justify-center h-1/3 w-full"><Loader /></div>
        }
      </Modal>
      <Modal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
      >
        <div className="flex flex-col gap-2 py-4">
          <Typography variant="text-base" weight="bold" className="text-center">Set Additional Scanner</Typography>
          <Input value={scannerField} onChange={(e) => setScannerField(e.target.value)} placeholder="Input Scanner Username" />
          <Button variant="outlined" onClick={handleAddScanner} disabled={!scannerField}>Add</Button>
          {scannerErr && <Typography variant="text-xs" className="!text-red-500">{scannerErr}</Typography>}
        </div>
      </Modal>
    </main>
  )
}

export default CreateEvent;