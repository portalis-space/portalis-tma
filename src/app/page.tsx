"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import { useGetEventsQuery } from "@/services/event/queries/GetEvents.query";
import { handleChain } from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Slider from "react-slick";
import { useAccount } from "wagmi";

const carouselSetting = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};
const eligibleSetting = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

export default function Home() {
  const router = useRouter();
  const {address, chain} = useAccount();
  const [searchText, setSearchText] = useState("");

  const {isLoading: isEligibleEventsLoading , data: eligibleEventsQuery} = useGetEventsQuery({
    page: address && chain?.name ? 1 : undefined,
    size: 4,
    eligibleEvent: true,
    wallet: address,
    chain: handleChain(chain?.name),
    type: 'evm', // TODO change when TON available
    status: ['ONGOING']
  });
  const eligibleEventData = useMemo(() => eligibleEventsQuery?.data, [eligibleEventsQuery?.data]);
  const {isLoading: isFeaturedEventsLoading, data: featuredEventsQuery} = useGetEventsQuery({page: 1, size: 4, isHighlighted: true});
  const featuredEventData = useMemo(() => featuredEventsQuery?.data, [featuredEventsQuery?.data]);
  const {isLoading: isDiscoverEventsLoading, data: discoverEventsQuery} = useGetEventsQuery({page: 1, size: 4, "sort[schedule]": 'asc', search: searchText, status: ['ONGOING', 'UPCOMING']});
  const discoverEventsData = useMemo(() => discoverEventsQuery?.data, [discoverEventsQuery?.data]);

  return (
      <main className="flex flex-col">
        <Image
          alt="logo"
          src={'/assets/portalis-logo.png'}
          width={100}
          height={100}
          className="w-auto h-1/6 self-center"
        />
        <section className="slider-container px-3 mb-10 mt-2">
          <Slider {...carouselSetting}>
            <Image
              src={'/assets/event-placeholder.jpg'}
              alt="slider1"
              width={1920}
              height={1080}
              className="w-full h-[200px] lg:h-[200px] object-cover rounded-lg"
              priority
            />
            <Image
              src={'/assets/event-placeholder.jpg'}
              alt="slider1"
              width={1920}
              height={1080}
              className="w-full h-[200px] lg:h-[200px] object-cover rounded-lg"
              priority
            />
          </Slider>
        </section>
        <section className="flex flex-col min-h-48">
          <div className="flex flex-row items-center justify-between px-3">
            <Typography
              variant="text-lg"
              weight="bold"
              className="bg-gradient-to-br from-primary-blue-600 to-primary-purple-105 inline-block !text-transparent bg-clip-text"
            >
              Active Eligible Event
            </Typography>
            {
              eligibleEventData && 
              <Button size="small" variant="tinted" className="!text-primary-purple-105" onClick={() => router.push('/active-eligible-event')}>See All</Button>
            }
          </div>
          {isEligibleEventsLoading && <Loader />}
          {
            eligibleEventData && eligibleEventData.length > 0 ?
            <div className="slider-container p-3 mb-10 w-full rounded-lg">
              <Slider {...eligibleSetting}>
                { eligibleEventData.map((event) => <EventCard key={event.id} event={event} />) }
              </Slider>
            </div> : !isEligibleEventsLoading &&
            <div className="flex flex-col items-center py-3 gap-2">
              <Typography variant="text-sm">You don&apos;t have any eligible event.</Typography>
              <Button variant="filled" onClick={() => router.push('/wallet')} className="w-1/2">Go to My Wallet</Button>
            </div>
          }
        </section>
        {
          featuredEventData && featuredEventData.length > 0 && !isFeaturedEventsLoading &&
          <section className="flex flex-col pb-10 border-b-2 border-neutral-500 mb-10 px-3">
            <div className="flex flex-row items-center justify-between">
              <Typography
                variant="text-lg"
                weight="bold"
                className="bg-gradient-to-tr from-primary-purple-104 to-primary-blue-600 inline-block !text-transparent bg-clip-text"
              >
                Featured Event
              </Typography>
              <Button size="small" variant="tinted" className="!text-primary-purple-105" onClick={() => router.push('/featured-event')}>See All</Button>
            </div>
            <div className="flex flex-col w-full gap-2">
              {
                featuredEventData?.map((event) => <EventCard key={event.id} event={event} />)
              }
            </div>
          </section>
        }
        <section className="flex flex-col mb-10">
          <div className="w-full bg-neutral-50 dark:bg-neutral-900 pb-3 z-50 sticky top-0 px-3">
            <div className="flex flex-row items-center justify-between">
              <Typography
                variant="text-lg"
                weight="bold"
                className="bg-gradient-to-b from-primary-purple-105 to-primary-blue-500 inline-block !text-transparent bg-clip-text"
              >
                Discover Event
              </Typography>
              <Button size="small" variant="tinted" className="!text-primary-purple-105" onClick={() => router.push('/discover')}>Discover More</Button>
            </div>
            <SearchWithDebounce setSearchText={setSearchText} />
          </div>
          <div className="flex flex-col w-full gap-2 px-3">
            {isDiscoverEventsLoading && <Loader />}
            {
              discoverEventsData?.map((event) => <EventCard key={event.id} event={event} />)
            }
          </div>
          <Button variant="filled" onClick={() => router.push('/discover')} className="w-1/2 self-center mt-3">Discover More</Button>
        </section>
      </main>
  )
}
