"use client"
import Typography from "@/components/atoms/Typography.atom";
import { useGetQuestQuery } from "@/services/quest/queries/GetQuests.query";
import { useMemo } from "react";
import { HiCheck } from "react-icons/hi2";

const Quest = () => {
  // const {data: questsQuery} = useGetQuestQuery();
  // const questsData = useMemo(() => questsQuery?.data, [questsQuery?.data]);
  
  // return (
  //   <main className="flex flex-col px-3 gap-5 min-h-screen">
  //     <div className="flex flex-col gap-2">
  //       <Typography variant="text-lg" weight="bold" className="text-center">Quest</Typography>
  //       <Typography variant="text-xs" weight="bold" className="text-center">Complete these quests to earn points and significantly boost your chances of receiving airdrop.</Typography>
  //       <div className="flex flex-row justify-between items-center bg-primary-purple-105 p-4 rounded-lg">
  //         <Typography variant="text-lg" weight="bold" className="text-center !text-neutral-200">Your Point</Typography>
  //         <Typography variant="text-lg" weight="bold" className="text-center !text-neutral-200">100pts</Typography>
  //       </div>
  //     </div>
  //     <section className="flex flex-col w-full gap-3">
  //       {
  //         questsData?.map((quest) => 
  //           <div className="w-full flex flex-row items-start justify-between bg-white bg-opacity-30 dark:bg-neutral-800 p-3 gap-2 rounded-lg shadow" key={quest.id}>
  //             <div className="flex flex-col">
  //               <Typography variant="text-sm" weight="bold">{quest.attributes.task}</Typography>
  //               <Typography variant="text-sm">{quest.attributes.description}</Typography>
  //             </div>
  //             <div className="flex flex-row items-center gap-2">
  //               <Typography variant="text-sm" weight="bold">{quest.attributes.reqAmount}</Typography>
  //               <HiCheck className="text-primary-purple-105" />
  //             </div>
  //           </div>
  //         )
  //       }
  //     </section>
  //   </main>
  // )
  return (
    <main className="flex flex-col px-3 gap-5 h-screen items-center justify-center">
      <Typography variant="text-lg" weight="bold" className="!text-primary-purple-105">Quest</Typography>
      <Typography
        variant="text-5xl"
        weight="extra-bold"
        className="text-center bg-gradient-to-br from-primary-blue-600 to-primary-purple-105 inline-block !text-transparent bg-clip-text shadow-inner shadow-primary-purple-105 p-5 rounded-xl"
      >
        COMING SOON
      </Typography>
    </main>
  )
}

export default Quest;