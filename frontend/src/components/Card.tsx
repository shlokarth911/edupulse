import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DashboardCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* number of chapters */}
      <Card className="@container/card  rounded-3xl ">
        <CardHeader>
          <CardDescription>Chapters Completed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {45}
            <span className="ml-1 text-muted-foreground text-xl">/{100}</span>
          </CardTitle>

          <CardAction>
            <Badge variant="outline">+20%</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            55 more to go
          </div>
          <div className="text-muted-foreground">You are doing pretty good</div>
        </CardFooter>
      </Card>

      {/* number of points */}
      <Card className="@container/card rounded-3xl">
        <CardHeader>
          <CardDescription>Total Points</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {200}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            You are above 20% of your total batchmates
          </div>
          <div className="text-muted-foreground">Keep Working</div>
        </CardFooter>
      </Card>

      {/* study streak*/}
      <Card className="@container/card rounded-3xl">
        <CardHeader>
          <CardDescription>Study Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            223,322
          </CardTitle>
          <CardAction>
            <Badge variant="outline">+12.5%</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            You Consistency {"is Excellent"}
          </div>
          <div className="text-muted-foreground">You clearyour daily goals</div>
        </CardFooter>
      </Card>

      {/* growth rate in studies */}
      <Card className="@container/card rounded-3xl">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">+4.5%</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
