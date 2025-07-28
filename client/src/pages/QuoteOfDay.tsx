"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Quote, RefreshCw, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const tradingQuotes = [
  {
    quote: "Blood in the streets? Perfect.",
    author: "Baron Rothschild (adapted)",
    category: "Contrarian",
  },
  {
    quote: "The market can stay irrational longer than you can stay solvent.",
    author: "John Maynard Keynes",
    category: "Risk Management",
  },
  {
    quote: "Bulls make money, bears make money, but pigs get slaughtered.",
    author: "Wall Street Proverb",
    category: "Greed Control",
  },
  {
    quote: "Time in the market beats timing the market.",
    author: "Ken Fisher",
    category: "Long-term Thinking",
  },
  {
    quote:
      "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett",
    category: "Patience",
  },
  {
    quote: "Risk comes from not knowing what you're doing.",
    author: "Warren Buffett",
    category: "Education",
  },
  {
    quote: "Markets are never wrong, opinions often are.",
    author: "Jesse Livermore",
    category: "Humility",
  },
  {
    quote: "Cut your losses and let your profits run.",
    author: "David Ricardo",
    category: "Trading Rules",
  },
];

const QuoteOfTheDay = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const currentQuote = tradingQuotes[currentQuoteIndex];

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * tradingQuotes.length);
    setCurrentQuoteIndex(randomIndex);
  };

  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: "STONKS Quote of the Day",
        text: `"${currentQuote.quote}" - ${currentQuote.author}`,
      });
    } else {
      navigator.clipboard.writeText(
        `"${currentQuote.quote}" - ${currentQuote.author}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Quote of the Day
            </h1>
            <p className="text-muted-foreground">
              Alpha wisdom for the streets
            </p>
          </div>
        </div>

        {/* Main Quote Card */}
        <Card className="bg-stonks-card border-stonks-border mb-6">
          <CardContent className="p-8">
            <div className="text-center">
              <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-50" />
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-6">
                "{currentQuote.quote}"
              </blockquote>
              <div className="flex flex-col items-center gap-2">
                <cite className="text-lg text-muted-foreground not-italic">
                  — {currentQuote.author}
                </cite>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
                  {currentQuote.category}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            onClick={getNewQuote}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Quote
          </Button>

          <Button
            onClick={shareQuote}
            variant="outline"
            className="border-stonks-border hover:bg-stonks-card"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Wisdom Section */}
        <Card className="bg-stonks-card border-stonks-border">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              📈 Market Wisdom
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-sm text-muted-foreground">
                  Daily dose of alpha mindset to keep emotions in check
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-sm text-muted-foreground">
                  Learn from legends who've conquered the markets
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-sm text-muted-foreground">
                  No emotions, just cold hard trading truths
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
