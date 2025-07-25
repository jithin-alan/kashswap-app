
'use client';

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const initialTransactions = [
  { id: 1, description: "Survey Completion", coins: 500, date: "2024-07-20", type: "earn" },
  { id: 2, description: "Video Ad Watched", coins: 100, date: "2024-07-20", type: "earn" },
  { id: 3, description: "Redeemed Gift Card", coins: -1000, date: "2024-07-19", type: "redeem" },
  { id: 4, "description": "Daily Login Bonus", "coins": 50, "date": "2024-07-19", type: "earn" },
];

const withdrawalThreshold = 100000;

const levels = [
    { level: 1, coins: 0 },
    { level: 2, coins: 10000 },
    { level: 3, coins: 50000 },
    { level: 4, coins: 250000 },
    { level: 5, coins: 1000000 },
    { level: 6, coins: 5000000 },
];

export default function CoinsScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'paypal' | null>(null);
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState('');
  const [isWithdrawalPending, setIsWithdrawalPending] = useState(false);
  const { toast } = useToast();
  
  const [totalCoins, setTotalCoins] = useState(1000000);
  const [transactions, setTransactions] = useState(initialTransactions);

  const canWithdraw = totalCoins >= withdrawalThreshold;

  const levelInfo = useMemo(() => {
    let currentLevelInfo = levels[0];
    for (let i = levels.length - 1; i >= 0; i--) {
        if (totalCoins >= levels[i].coins) {
            currentLevelInfo = levels[i];
            break;
        }
    }

    const currentLevelIndex = levels.findIndex(l => l.level === currentLevelInfo.level);
    
    if (currentLevelIndex >= levels.length - 1) {
        return { currentLevel: currentLevelInfo.level, progress: 100, nextLevel: null, coinsToNextLevel: 0 };
    }

    const nextLevelInfo = levels[currentLevelIndex + 1];
    const coinsInCurrentLevel = totalCoins - currentLevelInfo.coins;
    const coinsForNextLevel = nextLevelInfo.coins - currentLevelInfo.coins;
    const progress = Math.min(Math.floor((coinsInCurrentLevel / coinsForNextLevel) * 100), 100);
    const coinsToNextLevel = nextLevelInfo.coins - totalCoins;

    return {
        currentLevel: currentLevelInfo.level,
        progress,
        nextLevel: nextLevelInfo.level,
        coinsToNextLevel
    };
  }, [totalCoins]);

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
      const withdrawalAmount = parseInt(amount, 10);
      if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
        toast({
          title: "Invalid Amount",
          description: "Please enter a valid number of coins to withdraw.",
          variant: "destructive",
        });
        return;
      }
      
      if (withdrawalAmount > totalCoins) {
        toast({
          title: "Insufficient Balance",
          description: "You cannot withdraw more coins than you have.",
          variant: "destructive",
        });
        return;
      }

      if (withdrawalAmount < withdrawalThreshold) {
        toast({
          title: "Minimum Withdrawal Amount",
          description: `You must withdraw at least ${withdrawalThreshold.toLocaleString()} coins.`,
          variant: "destructive",
        });
        return;
      }

      if (paymentId.trim() === '') {
        toast({
          title: "Input Required",
          description: `Please enter your ${paymentMethod === 'upi' ? 'UPI ID' : 'PayPal Email'}.`,
          variant: "destructive",
        });
        return;
      }
      
      console.log(`Withdrawal request for ${withdrawalAmount} coins to ${paymentId} via ${paymentMethod}`);
      
      const newTransaction = {
        id: transactions.length + 1,
        description: `Withdrawal via ${paymentMethod}`,
        coins: -withdrawalAmount,
        date: new Date().toISOString().split('T')[0],
        type: 'redeem' as const
      };
      
      setTransactions([newTransaction, ...transactions]);
      setTotalCoins(currentCoins => currentCoins - withdrawalAmount);
      setIsWithdrawalPending(true);

      toast({
        title: "Withdrawal Request Submitted",
        description: `Your request for ${withdrawalAmount.toLocaleString()} coins will be processed within 14 days and you will be updated via your registered email address.`,
      });
      
      resetDialog();
    }
  };

  const resetDialog = () => {
    setIsOpen(false);
    // Use a short timeout to prevent visual glitch while dialog closes
    setTimeout(() => {
      setStep(1);
      setPaymentMethod(null);
      setPaymentId('');
      setAmount('');
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
          <CardTitle className="font-headline text-xl">Level {levelInfo.currentLevel}</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={levelInfo.progress} className="h-3 [&>div]:bg-progress" />
           {levelInfo.nextLevel ? (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              You are <span className="font-bold text-foreground">{levelInfo.coinsToNextLevel.toLocaleString()}</span> coins away from Level {levelInfo.nextLevel}!
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mt-2 text-center font-semibold">
              You have reached the maximum level!
            </p>
          )}
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
          <Dialog open={isOpen} onOpenChange={(open) => !open && resetDialog()}>
            <DialogTrigger asChild>
              <Button className="w-full bg-cta hover:bg-cta/90" disabled={!canWithdraw || isWithdrawalPending} onClick={() => setIsOpen(true)}>
                {isWithdrawalPending ? 'Request Pending' : 'Withdraw Request'}
              </Button>
            </DialogTrigger>
            <DialogContent onEscapeKeyDown={resetDialog}>
              <DialogHeader>
                <DialogTitle className="font-headline text-center text-2xl">
                   {step === 1 ? "Withdrawal Method" : "Enter Details"}
                </DialogTitle>
                <DialogDescription className="text-center">
                  {step === 1 
                    ? "Select your preferred payment method." 
                    : `Enter the amount and your ${paymentMethod === 'upi' ? 'UPI ID' : 'PayPal Email'}.`}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                {step === 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      className={cn(
                        "p-4 border rounded-lg text-center font-semibold transition-all duration-200",
                        paymentMethod === 'upi' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary hover:bg-secondary/80'
                      )}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      UPI
                    </button>
                    <button 
                      className={cn(
                        "p-4 border rounded-lg text-center font-semibold transition-all duration-200",
                        paymentMethod === 'paypal' ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary hover:bg-secondary/80'
                      )}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      PayPal
                    </button>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Amount (Coins)</Label>
                      <Input 
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g., 100000"
                        className="text-lg h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="paymentId">
                        {paymentMethod === 'upi' ? 'UPI ID' : 'PayPal Email'}
                      </Label>
                      <Input 
                        id="paymentId"
                        value={paymentId}
                        onChange={(e) => setPaymentId(e.target.value)}
                        placeholder={paymentMethod === 'upi' ? 'yourname@bank' : 'your.email@example.com'}
                        className="text-lg h-12"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                {step === 2 && (
                   <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                )}
                <Button onClick={handleWithdrawRequest} className="w-full sm:w-auto bg-cta hover:bg-cta/90">
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
                    <Badge variant={tx.type === 'earn' ? 'default' : 'destructive'} className={cn(tx.type === 'earn' ? 'bg-progress hover:bg-progress/90' : '', 'font-mono')}>
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
