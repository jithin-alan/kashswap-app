
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, HelpCircle, Mail, Shield, Star, UserX } from "lucide-react";

const settingsOptions = [
  {
    icon: Mail,
    label: "Contact Us",
    action: { type: 'mail', value: 'stickadmob@gmail.com' }
  },
  {
    icon: Star,
    label: "Rate Us in Play Store",
    action: { type: 'link', value: '#' } // Placeholder, replace with actual Play Store link
  },
  {
    icon: HelpCircle,
    label: "Request",
    action: { type: 'mail', value: 'stickadmob@gmail.com' }
  },
  {
    icon: Shield,
    label: "Privacy and Policy",
    action: { type: 'link', value: 'https://stickadmob.blogspot.com/2024/09/stickad-privacy-policy.html' }
  },
  {
    icon: UserX,
    label: "Account Deletion",
    action: { type: 'link', value: 'https://stickadmob.blogspot.com/2024/09/data-deletion-request.html' }
  },
];

export default function SettingsScreen() {
    
  const handleItemClick = (action: { type: 'link' | 'mail'; value: string }) => {
    if (action.type === 'link') {
      // For external links, using window.open is a reliable method, especially in a web/hybrid context.
      window.open(action.value, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'mail') {
      window.location.href = `mailto:${action.value}`;
    }
  };

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
                <button 
                  onClick={() => handleItemClick(option.action)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary transition-colors"
                  // A placeholder link for 'Rate Us' should not be clickable if it's just '#'
                  disabled={option.action.value === '#'}
                >
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
