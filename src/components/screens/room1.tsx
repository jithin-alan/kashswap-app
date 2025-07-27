
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, Sparkles } from "lucide-react";
import Image from "next/image";

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
      <Card className="relative overflow-hidden text-white shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Adventurous landscape"
            fill
            className="object-cover"
            data-ai-hint="adventure landscape"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <CardContent className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
            <Mountain className="w-16 h-16 mb-4" />
            <h3 className="text-lg font-semibold font-headline">Adventure Awaits</h3>
            <p className="text-sm text-white/80">Discover new challenges and rewards.</p>
        </CardContent>
      </Card>
       <Card className="flex flex-col items-center justify-center p-8 text-center bg-secondary/50 border-dashed">
        <Sparkles className="w-16 h-16 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold font-headline">More Offers Coming Soon!</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            We're working hard to bring you new and exciting survey opportunities. Check back later!
        </p>
      </Card>
    </div>
  );
}
