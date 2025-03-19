import { CircleDashed } from "lucide-react";

export default function Loader() {
  return (
    <div className="bg-blackOpacity w-screen h-screen top-0 left-0 absolute">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CircleDashed className="text-sageGreen animate-spin h-12 w-12" />
      </div>
    </div>
  );
}
