"use client"
import Input from "@/components/atoms/Input.atom";
import Typography from "@/components/atoms/Typography.atom";
import Uploader from "@/components/molecules/Uploader.molecule";
import { UploaderAttributesType } from "@/services/uploader/Uploader.types";
import { useState } from "react";

const CreateEvent = () => {
  const [eventImage, setEventImage] = useState<UploaderAttributesType | undefined>(undefined)
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
        <Input placeholder="Event Name"/>
      </section>
    </main>
  )
}

export default CreateEvent;