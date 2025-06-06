import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const WeeklyGoalCard = () => {
  return (
    <Card
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
      }}
    >
      <CardHeader>
        <CardTitle>Weekly Goal</CardTitle>
      </CardHeader>

      <CardContent>
        <p>Finish Chapter 3</p>
        <p>Finish Chapter 3</p>
      </CardContent>
    </Card>
  );
};

export default WeeklyGoalCard;
