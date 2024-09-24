//font
import localFont from "next/font/local";
import { Open_Sans, Manrope } from "next/font/google";

const AventaBlack = localFont({ src: "Aventa_Black.ttf" });
const OpenSans = Open_Sans({
  subsets: ["latin"],
  display: "swap"
});
const ManropeFont = Manrope({
  subsets: ["latin"],
  display: "swap"
});

export { AventaBlack, OpenSans, ManropeFont };
