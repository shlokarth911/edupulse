import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import CountUp from "./CountUp";
import { Badge } from "./ui/badge";

const MHQCard = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Meantal Health Quotient</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>
            <Badge>Good</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <CountUp
              from={0}
              to={100}
              separator=","
              direction="up"
              duration={1}
              className="font-bold text-7xl bg-gradient-to-r from-lime-500 to-blue-500 bg-clip-text text-transparent"
            />{" "}
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MHQCard;
