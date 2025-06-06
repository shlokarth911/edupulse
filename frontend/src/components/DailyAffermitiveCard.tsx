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

const DailyAffermitiveCard = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Daily Affirmative</CardTitle>
        </CardHeader>

        <CardContent>
          <p>
            The important thing is not to stop questioning. Curiosity has its
            own reason for existence.
          </p>
        </CardContent>

        <CardFooter>
          <em>Albert Einstein</em>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DailyAffermitiveCard;
