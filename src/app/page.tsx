"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import InputWithIcon from "@/components/molecules/InputWithIcon.molecule";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Slider from "react-slick";

export default function Home() {
  const router = useRouter();
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
  
  return (
      <main className="flex flex-col justify-between">
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
        <section className="flex flex-col">
          <div className="flex flex-row items-center justify-between px-3">
            <Typography
              variant="text-lg"
              weight="bold"
              className="bg-gradient-to-br from-primary-blue-600 to-primary-purple-105 inline-block !text-transparent bg-clip-text"
            >
              Active Eligible Event
            </Typography>
            <Button size="small" variant="tinted" className="!text-primary-purple-105" onClick={() => router.push('/active-eligible-event')}>See All</Button>
          </div>
          <div className="slider-container p-3 mb-10 w-full rounded-lg">
            <Slider {...eligibleSetting}>
              <EventCard className="mx-1"/>
              <EventCard className="mx-1"/>
              <EventCard className="mx-1"/>
              <EventCard className="mx-1"/>
              <EventCard className="mx-1"/>
            </Slider>
          </div>
        </section>
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
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </section>
        <section className="flex flex-col mb-10">
          <div className="w-full bg-neutral-50 dark:bg-neutral-900 pb-3 z-50 sticky top-0 px-3">
            <div className="flex flex-row items-center justify-between">
              <Typography
                variant="text-lg"
                weight="bold"
                className="bg-gradient-to-b from-primary-purple-105 to-primary-blue-500 inline-block !text-transparent bg-clip-text"
              >
                Discover More Event
              </Typography>
              <Button size="small" variant="tinted" className="!text-primary-purple-105" onClick={() => router.push('/discover')}>See All</Button>
            </div>
            <InputWithIcon headingIcon={<HiMagnifyingGlass className="text-neutral-800 dark:text-neutral-200" />} />
          </div>
          <div className="flex flex-col w-full gap-2 px-3">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </section>
      </main>
  )
}
