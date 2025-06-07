import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Aurora from "./Aurora";

const DailyAffermitiveCard = () => {
  return (
    <>
      <Card className=" h-[100%] w-full  bg-transparent cursor-pointer  overflow-hidden backdrop-blur-xl border-1 relative  rounded-2xl">
        <div className="z-index-9  pointer-events-none ">
          <CardHeader className="">
            <CardTitle className="text-xl">Daily Affirmative</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="py-2">
              "The present is theirs; the future, for which I really worked, is
              mine."
            </p>
          </CardContent>

          <CardFooter>
            <em className="text-sm w-full" style={{ textAlign: "right" }}>
              - Abraham Lincoln
            </em>
          </CardFooter>
        </div>

        <Aurora
          colorStops={["#51d7e0", "#00d8ff", "#c922a4"]}
          blend={0.4}
          amplitude={1.0}
          speed={0.5}
        />
      </Card>
    </>
  );
};

export default DailyAffermitiveCard;
