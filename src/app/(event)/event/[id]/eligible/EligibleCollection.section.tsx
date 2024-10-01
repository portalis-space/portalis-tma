import InputWithIcon from "@/components/molecules/InputWithIcon.molecule";
import CollectionCard from "@/components/molecules/CollectionCard.molecule";
import { HiMagnifyingGlass } from "react-icons/hi2";

const EligibleCollection = () => {
  return (
    <section className="flex flex-col gap-3">
      <InputWithIcon headingIcon={<HiMagnifyingGlass className="text-neutral-800 dark:text-neutral-200" />} />
      <div className="flex flex-row w-full flex-wrap">
        <div className="p-1 w-1/2 lg:w-1/3">
          <CollectionCard />
        </div>  
        <div className="p-1 w-1/2 lg:w-1/3">
          <CollectionCard />
        </div> 
        <div className="p-1 w-1/2 lg:w-1/3">
          <CollectionCard />
        </div> 
        <div className="p-1 w-1/2 lg:w-1/3">
          <CollectionCard />
        </div> 
        <div className="p-1 w-1/2 lg:w-1/3">
          <CollectionCard />
        </div>
        <div className="p-1 w-1/2 lg:w-1/3">
          <CollectionCard />
        </div> 
        <div className="p-1 w-1/2 lg:w-1/3">
          <CollectionCard />
        </div> 
        <div className="p-1 w-1/2 lg:w-1/3">
          <CollectionCard />
        </div> 
      </div>
    </section>
  )
}

export default EligibleCollection;