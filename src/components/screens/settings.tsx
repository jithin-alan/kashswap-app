
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, HelpCircle, Mail, MessageSquare, Shield, Star, Trash2, UserX } from "lucide-react";

const settingsOptions = [
  {
    icon: Mail,
    label: "Contact Us",
  },
  {
    icon: Star,
    label: "Rate Us in Play Store",
  },
  {
    icon: HelpCircle,
    label: "Request",
  },
  {
    icon: Shield,
    label: "Privacy and Policy",
  },
  {
    icon: UserX,
    label: "Account Deletion",
  },
];

export default function SettingsScreen() {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {settingsOptions.map((option, index) => (
              <li key={index}>
                <button className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-4">
                    <option.icon className="w-6 h-6 text-muted-foreground" />
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
