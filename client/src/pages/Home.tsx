import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import stonksAvatar from "@/assets/stonks.jpg";
import { Video, TrendingUp, MessageSquare, Gamepad2 } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const modes = [
    {
      icon: Video,
      title: "Talk to Stonks",
      description: "Face-to-face alpha advice",
      action: () => navigate("/simli-agent"),
      variant: "primary" as const,
    },
    {
      icon: TrendingUp,
      title: "Market Mood",
      description: "Daily meme chart & vibes",
      action: () => {
        navigate("/markit-mood");
      },
      variant: "secondary" as const,
    },
  ];

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Header */}
      <div className="text-center py-8 px-4">
        {/* Avatar */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-2 border-neon-green shadow-lg shadow-neon-green/20">
          <img
            src={stonksAvatar}
            alt="Stonks Avatar"
            className="w-full h-full object-cover scale-95"
            style={{ objectPosition: "center 20%" }}
          />
        </div>

        {/* Logo */}
        <h1 className="text-stonks text-4xl font-black tracking-tighter text-foreground mb-2">
          STONKS
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-lg font-medium mb-4">
          Your Alpha Companion. No Emotions. Just Stonks.
        </p>

        {/* Status Badge */}
        <Badge className="bg-neon-green/20 text-neon-green border border-neon-green/30 px-4 py-1">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse mr-2"></div>
          Online • Ready to Drop Alpha
        </Badge>
      </div>

      {/* Modes Grid */}
      <div className="flex-1 px-4 pb-8">
        <div className="max-w-md mx-auto space-y-4">
          {modes.map((mode, index) => {
            const IconComponent = mode.icon;
            return (
              <Card
                key={index}
                className="p-4 bg-card/50 backdrop-blur-sm border border-border hover:bg-card/70 transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={mode.action}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{mode.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {mode.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Market Mood Special Card */}
        </div>

        {/* Main CTA */}
        <div className="max-w-md mx-auto mt-4 flex justify-center">
          <Link
            to="/simli-agent"
            className="w-full h-14 flex items-center justify-center text-lg font-black rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-200"
          >
            GET ALPHA
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground/60">
            Stonks is always watching
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
