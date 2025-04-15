"use client";
import React from 'react';
import { GlowingEffect } from './glowing-effect';
import { cn } from '@/lib/utils';

const PricingCard = ({
  title,
  price,
  period,
  features,
  isPopular = false,
  ctaText = "Get Started",
  onClick,
}: {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  onClick?: () => void;
}) => {
  return (
    <div className="relative">
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r  px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </div>
      )}
      <div className={cn(
        "relative flex h-full flex-col rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-md transition-all",
        isPopular && "border-blue-800 shadow-blue-900/20"
      )}>
        <GlowingEffect disabled={false} glow={isPopular} />
        
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        
        <div className="mb-6">
          <p className="flex items-baseline">
            <span className="text-4xl font-bold text-white">{price}</span>
            <span className="ml-1 text-sm text-slate-400">/{period}</span>
          </p>
        </div>
        
        <ul className="mb-6 space-y-3 text-sm text-slate-300">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <svg 
                className="mr-2 h-4 w-4 text-green-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <button
            onClick={onClick}
            className={cn(
              "w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors",
              isPopular 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600" 
                : "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700"
            )}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  )
}

function Pricing() {
  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    console.log(`Subscribing to ${plan} plan`);
    // Add your subscription logic here
  };

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-3 text-xl text-slate-400">
          Choose the plan that fits your fitness journey
        </p>
      </div>
      
      <div className="grid gap-6 mx-auto lg:grid-cols-2 lg:max-w-4xl">
        <PricingCard
          title="Monthly"
          price="$4.99"
          period="month"
          features={[
            "Voice Workout Logging",
            "AI Workout Suggestions",
            "Progress Tracking & Stats",
            "Custom Exercise Library",
            "Unlimited Workouts",
          ]}
          onClick={() => handleSubscribe('monthly')}
        />
        
        <PricingCard
          title="Yearly"
          price="$49.99"
          period="year"
          features={[
            "All Monthly Features",
            "Save over 15% vs monthly",
            "Priority Support",
            "Early Access to New Features",
            "Progress Insights & Analysis",
          ]}
          isPopular={true}
          ctaText="Get Annual Plan"
          onClick={() => handleSubscribe('yearly')}
        />
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-sm text-slate-400">
          All plans include a 7-day free trial. No credit card required to start.
        </p>
      </div>
    </div>
  );
}

export default Pricing;