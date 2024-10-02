"use client"
import Typography from "@/components/atoms/Typography.atom";
import { ClipboardButton } from "@/components/molecules/ClipboardButton.molecule";
import { useSearchParams } from "next/navigation";

const FeaturedEvent = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token');
  return (
    <main className="flex flex-col pt-10 pb-20 px-3 gap-2 min-h-screen">
      <Typography variant="text-sm" weight="bold" className="text-center pt-10 truncate w-1/3">{token}</Typography>
      <ClipboardButton textToCopy={token || '-'} />
    </main>
  )
}

export default FeaturedEvent;