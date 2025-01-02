import { RiTwitterXLine } from "react-icons/ri";
import InteractiveForm from "@/components/InteractiveForm";
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-[#1a1a1a]">
      <RiTwitterXLine size={50} className="text-white" />
      <div className="flex flex-col justify-center items-center mt-7 w-full max-w-4xl py-3">
        <p className="text-white text-4xl font-extrabold">
          Idea to tweet in seconds.
        </p>
        <p className="text-white text-2xl">
          Tweet Craft is your superhuman tweet-writing expert.
        </p>
        <InteractiveForm />
      </div>
    </div>
  );
}
