import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Mountain } from "lucide-react";

export default function Room1Screen() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Welcome to Room 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the first room. Explore the features and possibilities.</p>
        </CardContent>
      </Card>
      <Card className="flex flex-col items-center justify-center p-8 text-center bg-secondary">
          <Mountain className="w-16 h-16 mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold font-headline">Adventure Awaits</h3>
          <p className="text-sm text-muted-foreground">Discover new challenges and rewards.</p>
      </Card>
       <Card data-testid="cpx-research">
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <ClipboardList className="w-6 h-6" />
                <span>CPX Research</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p>Complete surveys from CPX Research and earn coins!</p>
        </CardContent>
      </Card>
    </div>
  );
}
