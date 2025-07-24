import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const transactions = [
  { id: 1, description: "Survey Completion", points: 500, date: "2024-07-20", type: "earn" },
  { id: 2, description: "Video Ad Watched", points: 100, date: "2024-07-20", type: "earn" },
  { id: 3, description: "Redeemed Gift Card", points: -1000, date: "2024-07-19", type: "redeem" },
  { id: 4, "description": "Daily Login Bonus", "points": 50, "date": "2024-07-19", type: "earn" },
];

const totalPoints = 1250;
const withdrawalThreshold = 100000;

export default function PointsScreen() {
  const canWithdraw = totalPoints >= withdrawalThreshold;

  return (
    <div className="p-4 space-y-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Total Points</CardTitle>
          <CardDescription>Your current balance</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-6xl font-bold font-headline text-primary">
            {totalPoints.toLocaleString()}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Next Level</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={50} className="h-3 [&>div]:bg-progress" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            You are <span className="font-bold text-foreground">1,250</span> points away from reaching Level 5!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Withdraw Points</CardTitle>
          <CardDescription>
            You need at least {withdrawalThreshold.toLocaleString()} points to make a withdrawal request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" disabled={!canWithdraw}>
            Withdraw Request
          </Button>
          {!canWithdraw && (
             <p className="text-sm text-center text-muted-foreground mt-2">
              You need { (withdrawalThreshold - totalPoints).toLocaleString() } more points.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={tx.type === 'earn' ? 'default' : 'destructive'} className={tx.type === 'earn' ? 'bg-progress hover:bg-progress/90' : ''}>
                      {tx.type === 'earn' ? `+${tx.points}` : tx.points}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
