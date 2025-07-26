import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, Sparkles } from "lucide-react";

export default function Room2Screen() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">This is Room 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Here you can find more advanced features and content.</p>
        </CardContent>
      </Card>
      <Card className="flex flex-col items-center justify-center p-8 text-center bg-secondary">
          <Beaker className="w-16 h-16 mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold font-headline">Experiments</h3>
          <p className="text-sm text-muted-foreground">Try out new and exciting things.</p>
      </Card>
      <Card className="flex flex-col items-center justify-center p-8 text-center bg-secondary/50 border-dashed">
        <Sparkles className="w-16 h-16 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold font-headline">More Surveys Coming Soon!</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            New ways to earn are just around the corner. We're busy setting things up for you!
        </p>
      </Card>
    </div>
  );
}
