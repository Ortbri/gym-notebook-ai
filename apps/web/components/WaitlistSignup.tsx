"use client"

import { addToWaitlist } from '@/actions/waitlist';
import { LucidePlaneTakeoff } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function WaitlistSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("email", email);
      const result = await addToWaitlist(formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
      console.error('Error adding to waitlist:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {submitted ? (
        <div className="text-center p-4 rounded-lg">
          <h3 className="text-xl font-bold text-green-700">You&apos;re on the list!</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-8">
            <div className="flex w-full items-center gap-2">
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-grow px-4 py-2 border-none focus:border-none rounded-l-lg focus:outline-none focus:ring-none shadow-none"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              className="rounded-full bg-background shadow-inner hover:bg-background/80 hover:scale-105 transition-all duration-300" 
              size={"icon"}
              disabled={isSubmitting}
            >
              <LucidePlaneTakeoff className="text-foreground" />
            </Button>
          </div>
          {error && (
            <div className="text-red-600 text-sm mt-2">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
} 