import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beaker, BrainCircuit } from "lucide-react";

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
      <Card data-testid="inbrain-ai">
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <BrainCircuit className="w-6 h-6" />
                <span>InBrain.ai</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p>Answer surveys from InBrain.ai and get rewarded.</p>
        </CardContent>
      </Card>
    </div>
  );
}
