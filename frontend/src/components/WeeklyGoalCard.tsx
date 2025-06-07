import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const WeeklyGoalCard = () => {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="text-sm">Weekly Goal</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-xl">Finish Integrals</p>
      </CardContent>
    </Card>
  );
};

export default WeeklyGoalCard;
