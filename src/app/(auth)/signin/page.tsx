"use client"
import Typography from "@/components/atoms/Typography.atom";
import { ClipboardButton } from "@/components/molecules/ClipboardButton.molecule";
import { useSearchParams } from "next/navigation";

const FeaturedEvent = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token');
  return (
    <main className="flex flex-col pt-10 pb-20 px-3 gap-2 min-h-screen">
      <div className="flex flex-row items-center justify-center pt-10">
        <Typography variant="text-sm" weight="bold" className="text-center truncate">{token}</Typography>
        <ClipboardButton textToCopy={token || '-'} />
      </div>
    </main>
  )
}

export default FeaturedEvent;