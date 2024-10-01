"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
      <main className="flex flex-col justify-between pt-10 pb-20">
        <section className="slider-container px-3 mb-10">
          <Slider {...carouselSetting}>
            <Image
              src={'/assets/event-placeholder.jpg'}
              alt="slider1"
              width={1920}
              height={1080}
              className="w-full h-[200px] lg:h-[200px] object-cover rounded-lg"
            />
            <Image
              src={'/assets/event-placeholder.jpg'}
              alt="slider1"
              width={1920}
              height={1080}
              className="w-full h-[200px] lg:h-[200px] object-cover rounded-lg"
            />
          </Slider>
        </section>
        <section className="flex flex-col">
          <div className="flex flex-row items-center justify-between px-3">
            <Typography
              variant="text-lg"
              weight="bold"
              className="bg-primary-purple-105 text-white px-2 rounded"
            >
              Active Eligible Event
            </Typography>
            <Button size="small" variant="tinted" className="!text-primary-purple-105" onClick={() => router.push('/active-eligible-event')}>See All</Button>
          </div>
          <div className="slider-container p-3 mb-10 bg-primary-purple-102 min-h-[160px] lg:min-h-[240px] w-full rounded-lg">
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
          <div className="flex flex-row items-center justify-between px-3">
            <Typography
              variant="text-lg"
              weight="bold"
              className="bg-primary-green-500 !text-primary-purple-105 px-2 rounded"
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
        <section className="flex flex-col mb-10 px-3">
          <div className="flex flex-row items-center justify-between px-3">
            <Typography
              variant="text-lg"
              weight="bold"
            >
              Discover More Event
            </Typography>
            <Button size="small" variant="tinted" className="!text-primary-purple-105" onClick={() => router.push('/discover')}>See All</Button>
          </div>
          <div className="flex flex-col w-full gap-2">
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
