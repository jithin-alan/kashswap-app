
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const transactions = [
  { id: 1, description: "Survey Completion", coins: 500, date: "2024-07-20", type: "earn" },
  { id: 2, description: "Video Ad Watched", coins: 100, date: "2024-07-20", type: "earn" },
  { id: 3, description: "Redeemed Gift Card", coins: -1000, date: "2024-07-19", type: "redeem" },
  { id: 4, "description": "Daily Login Bonus", "coins": 50, "date": "2024-07-19", type: "earn" },
];

const totalCoins = 125000; // Set to a value >= threshold for testing
const withdrawalThreshold = 100000;

export default function CoinsScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'paypal' | null>(null);
  const [paymentId, setPaymentId] = useState('');
  const { toast } = useToast();

  const canWithdraw = totalCoins >= withdrawalThreshold;

  const handleWithdrawRequest = () => {
    if (step === 1) {
      if (paymentMethod) {
        setStep(2);
      } else {
        toast({
          title: "Selection Required",
          description: "Please select a payment method.",
          variant: "destructive",
        });
      }
    } else if (step === 2) {
      if (paymentId.trim() === '') {
        toast({
          title: "Input Required",
          description: `Please enter your ${paymentMethod === 'upi' ? 'UPI ID' : 'PayPal email'}.`,
          variant: "destructive",
        });
        return;
      }
      // Handle submission logic here
      console.log(`Withdrawal request for ${paymentId} via ${paymentMethod}`);
      toast({
        title: "Withdrawal Request Submitted",
        description: `Your request for ${totalCoins.toLocaleString()} coins has been submitted.`,
      });
      setIsOpen(false);
      // Reset state after submission
      setTimeout(() => {
        setStep(1);
        setPaymentMethod(null);
        setPaymentId('');
      }, 500);
    }
  };

  const resetDialog = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setPaymentMethod(null);
      setPaymentId('');
    }, 300);
  }

  return (
    <div className="p-4 space-y-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Total Coins</CardTitle>
          <CardDescription>Your current balance</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-6xl font-bold font-headline text-primary">
            {totalCoins.toLocaleString()}
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
            You are <span className="font-bold text-foreground">1,250</span> coins away from reaching Level 5!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Withdraw Coins</CardTitle>
          <CardDescription>
            You need at least {withdrawalThreshold.toLocaleString()} coins to make a withdrawal request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" disabled={!canWithdraw} onClick={() => setIsOpen(true)}>
                Withdraw Request
              </Button>
            </DialogTrigger>
            <DialogContent onEscapeKeyDown={resetDialog}>
              <DialogHeader>
                <DialogTitle>Withdrawal Request</DialogTitle>
                <DialogDescription>
                  {step === 1 
                    ? "Select your preferred withdrawal method." 
                    : `Enter your ${paymentMethod === 'upi' ? 'UPI ID' : 'PayPal Email'}.`}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                {step === 1 && (
                  <RadioGroup onValueChange={(value: 'upi' | 'paypal') => setPaymentMethod(value)} value={paymentMethod ?? undefined}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                )}
                {step === 2 && (
                  <div>
                    <Label htmlFor="paymentId" className="sr-only">
                      {paymentMethod === 'upi' ? 'UPI ID' : 'PayPal Email'}
                    </Label>
                    <Input 
                      id="paymentId"
                      value={paymentId}
                      onChange={(e) => setPaymentId(e.target.value)}
                      placeholder={paymentMethod === 'upi' ? 'yourname@bank' : 'your.email@example.com'}
                    />
                  </div>
                )}
              </div>
              
              <DialogFooter>
                {step === 2 && (
                   <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                )}
                <Button onClick={handleWithdrawRequest}>
                  {step === 1 ? 'Next' : 'Submit'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {!canWithdraw && (
             <p className="text-sm text-center text-muted-foreground mt-2">
              You need { (withdrawalThreshold - totalCoins).toLocaleString() } more coins.
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
                <TableHead className="text-right">Coins</TableHead>
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
                      {tx.type === 'earn' ? `+${tx.coins}` : tx.coins}
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
