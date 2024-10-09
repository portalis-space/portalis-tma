"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import BottomArea from "@/components/molecules/BottomArea.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Modal from "@/components/molecules/Modal.molecule";
import { useGetEventQuery } from "@/services/event/queries/GetEvent.query";
import { compareDesc, format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { HiCalendar, HiChevronRight, HiMapPin, HiMiniGlobeAlt, HiOutlineGlobeAlt, HiQrCode, HiStar, HiUserCircle, HiUserGroup } from "react-icons/hi2";

const EventDetail = ({ params: {id} }: { params: { id: string } }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {isLoading, data: eventQuery} = useGetEventQuery({id});
  const eventData = useMemo(() => eventQuery?.data, [eventQuery?.data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="flex flex-col pb-16 gap-2 min-h-screen">
      <section className="px-3 w-full relative">
        <Image
          alt="eventImage"
          src={eventData?.attributes?.banner && (eventData.attributes.banner.startsWith('https://') || eventData.attributes.banner.startsWith('ipfs')) ? eventData?.attributes.banner : '/assets/event-placeholder.jpg'}
          width={960}
          height={540}
          className="w-full h-auto object-cover rounded-lg"
        />
        {
          eventQuery?.data.attributes.isHighlighted &&
          <div className="absolute top-1 right-4 flex flex-row p-2 gap-1 items-center rounded bg-gradient-to-br from-primary-blue-500 via-primary-blue-800 to-primary-blue-500">
            <HiStar className="text-neutral-50" />
            <Typography variant="text-xs" weight="bold" className="!text-neutral-50">Featured</Typography>
          </div>
        }
      </section>
      <section className="flex flex-col gap-3 px-3">
        <Typography variant="text-2xl" weight="extra-bold" className="text-primary-purple-108">{eventData?.attributes.title}</Typography>
        <div className="flex flex-row items-center justify-between p-4 gap-1 rounded-lg bg-white bg-opacity-30 dark:bg-neutral-800 flex-auto">
          <div className="flex flex-row items-center gap-2">
            {
              eventData?.attributes?.owner?.profilePics ?
              <Image
                alt="userImage"
                src={'/assets/nft-placeholder.jpg'}
                width={640}
                height={640}
                className="w-6 h-6 object-cover rounded-full"
              /> :
              <HiUserCircle className="!text-primary-purple-105 w-6 h-6" />
            }
            <Typography variant="text-xs" weight="bold" className="!text-primary-purple-105">Portalis Team</Typography>
          </div>
          <HiChevronRight className="text-primary-purple-105" />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-start gap-2">
            <div className="w-10 h-10 flex flex-col items-center bg-primary-purple-107 rounded-lg">
              <Typography weight="bold" className="text-neutral-50 text-[10px]">{eventData?.attributes?.startAt ? format(eventData.attributes.startAt, 'LLL') : '-'}</Typography>
              <Typography variant="text-xs" weight="bold" className="text-neutral-50 bg-primary-purple-105 rounded px-2.5 py-0.5">{eventData?.attributes?.startAt ? format(eventData.attributes.startAt, 'dd') : '-'}</Typography>
            </div>
            <div className="flex flex-col">
              <Typography weight="bold" className="text-sm lg:text-base">{eventData?.attributes?.startAt ? format(eventData.attributes.startAt, 'LLL dd, y hh:mmaaa') : '-'} -</Typography>
              <Typography weight="bold" className="text-sm lg:text-base">{eventData?.attributes?.endAt ? format(eventData.attributes.endAt, 'LLL dd, y hh:mmaaa') : '-'}</Typography>
            </div>
          </div>
          <Button variant="tinted" className="w-auto p-1 flex flex-col border border-primary-purple-105" onClick={() => setIsModalOpen(true)}>
            <HiCalendar className="text-primary-purple-105" />
            <Typography className="text-[10px] !text-primary-purple-105">Schedule</Typography>
          </Button>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="w-10 h-10 flex flex-col items-center justify-center bg-primary-purple-107 text-primary-purple-105 rounded-lg">
            <HiUserGroup className="w-6 h-6 mx-2 text-primary-purple-101" />
          </div>
          <div className="flex flex-col">
            <Typography weight="bold" className="text-neutral-800 text-sm lg:text-base">{eventData?.attributes.capacity} Seats</Typography>
          </div>
        </div>
        <div className="flex flex-row items-start gap-2">
          <div className="w-10 h-10 flex flex-col items-center justify-center bg-primary-purple-107 text-primary-purple-105 rounded-lg">
            <HiMapPin className="w-6 h-6 mx-2 text-primary-purple-101" />
          </div>
          <div className="flex flex-col">
            <Typography className="text-sm lg:text-base">{eventData?.attributes.location.address}</Typography>
          </div>
        </div>
        <div className="flex flex-col">
          <Typography weight="bold" className="text-base">Event Description</Typography>
          <Typography className="text-base">{eventData?.attributes.description}</Typography>
        </div>
        <Button size="small" variant="outlined" className="rounded-lg" onClick={() => router.push('https://portalis.fun')}>
          <span className="flex flex-row items-center gap-2">
            <HiMiniGlobeAlt className="w-4 h-4 text-neutral-800 dark:text-neutral-200"/>
            <Typography variant="text-sm">Visit Website</Typography>
          </span>
        </Button>
        <Button size="small" variant="outlined" className="rounded-lg" onClick={() => router.push('/event/1/visitor')}>
          <span className="flex flex-row items-center gap-2">
            <HiUserGroup className="w-4 h-4 text-neutral-800 dark:text-neutral-200"/>
            <Typography variant="text-sm">See Visitor Data</Typography>
          </span>
        </Button>
        <Button size="small" variant="outlined" className="rounded-lg" onClick={() => router.push('/camera')}>
          <span className="flex flex-row items-center gap-2">
            <HiQrCode className="w-4 h-4 text-neutral-800 dark:text-neutral-200"/>
            <Typography variant="text-sm">Scan Now</Typography>
          </span>
        </Button>
      </section>
      <BottomArea>
        <Button size="large" variant="filled" className="rounded-full bg-primary-purple-106" onClick={() => router.push('/event/1/eligible')}>Check Eligible Asset</Button>
      </BottomArea>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col max-h-screen overflow-y-auto pb-16">
          <Typography variant="text-base" weight="light" className="rounded-lg p-2 max-w-min border-2 border-primary-purple-105 flex flex-row items-center gap-2"><HiOutlineGlobeAlt />{eventData?.attributes.timezone}</Typography>
          {
            eventData?.attributes?.schedules && eventData.attributes.schedules.sort((a, b) => compareDesc(b.startAt, a.startAt)).map((schedule, index) => 
              <div className="flex flex-col" key={index}>
                <div className="w-5 h-[50px] border-r-2 border-primary-purple-105" />
                <div className="flex flex-row items-center gap-2">
                  <div className="w-10 h-10 flex flex-col items-center bg-primary-purple-107 rounded-lg">
                    <Typography weight="bold" className="text-neutral-50 text-[10px]">{schedule?.startAt ? format(schedule.startAt, 'LLL') : '-'}</Typography>
                    <Typography variant="text-xs" weight="bold" className="text-neutral-50 bg-primary-purple-105 rounded px-2.5 py-0.5">{schedule?.startAt ? format(schedule.startAt, 'dd') : '-'}</Typography>
                  </div>
                  <div className="flex flex-col">
                    <Typography variant="text-xs">{schedule?.startAt ? format(schedule.startAt, 'LLL dd, y hh:mmaaa'):'-'}</Typography>
                    <Typography variant="text-xs">{schedule?.endAt ? format(schedule.endAt, 'LLL dd, y hh:mmaaa'):'-'}</Typography>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </Modal>
    </main>
  )
}

export default EventDetail;