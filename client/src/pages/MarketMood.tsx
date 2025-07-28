"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, BarChart2, RefreshCw, AlertCircle } from "lucide-react";
import { ReverseButton } from "@/components/ui/ReverseButton";
const CurrentSentimentCard = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="p-6 mb-6 bg-gray-900 rounded-xl">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mb-6 bg-gray-900 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span
            className={`w-3 h-3 mr-2 rounded-full ${
              data.status === "Bullish" ||
              data.status === "Greed" ||
              data.status === "Extreme Greed"
                ? "bg-green-500"
                : data.status === "Bearish" ||
                  data.status === "Fear" ||
                  data.status === "Extreme Fear"
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          ></span>
          <h2 className="text-lg font-semibold text-white">
            Current Sentiment
          </h2>
        </div>
        <p className="text-sm text-gray-500">{data.lastUpdated}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
        <div>
          <p
            className={`text-4xl font-bold ${
              data.status === "Bullish" ||
              data.status === "Greed" ||
              data.status === "Extreme Greed"
                ? "text-green-500"
                : data.status === "Bearish" ||
                  data.status === "Fear" ||
                  data.status === "Extreme Fear"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            {data.status}
          </p>
          <p className="text-sm text-gray-400">Market Sentiment</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-white">
            {data.confidenceScore}
          </p>
          <p className="text-sm text-gray-400">VIX Level</p>
        </div>
        <div>
          <p
            className={`text-4xl font-bold ${
              parseFloat(data.change24h) > 0
                ? "text-green-500"
                : parseFloat(data.change24h) < 0
                ? "text-red-500"
                : "text-gray-400"
            }`}
          >
            {data.change24h}
          </p>
          <p className="text-sm text-gray-400">24h Change</p>
        </div>
      </div>
    </div>
  );
};

const TimeframeSelector = ({ activeTimeframe, onTimeframeChange }) => {
  const timeframes = ["1D", "1W", "1M", "3M"];

  return (
    <div className="flex mb-6 space-x-2">
      {timeframes.map((frame) => (
        <button
          key={frame}
          onClick={() => onTimeframeChange(frame)}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
            activeTimeframe === frame
              ? "bg-green-500 text-gray-900"
              : "bg-gray-900 text-gray-300 hover:bg-gray-800"
          }`}
        >
          {frame}
        </button>
      ))}
    </div>
  );
};

const MetricCard = ({ name, value, trend, loading, error, changePercent }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl">
        <div className="animate-pulse flex-1">
          <div className="h-3 bg-gray-700 rounded w-2/3 mb-2"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
        </div>
        <BarChart2 className="text-gray-600" size={28} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl">
        <div>
          <p className="text-sm text-gray-400">{name}</p>
          <p className="text-lg text-red-400 flex items-center">
            <AlertCircle size={16} className="mr-1" />
            Error
          </p>
        </div>
        <BarChart2 className="text-gray-600" size={28} />
      </div>
    );
  }

  const trendIndicator = trend === "up" ? "↗" : trend === "down" ? "↘" : "–";
  const trendColor =
    trend === "up"
      ? "text-green-500"
      : trend === "down"
      ? "text-red-500"
      : "text-gray-400";

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl">
      <div>
        <p className="text-sm text-gray-400">{name}</p>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-semibold text-white">{value}</p>
          <span className={`text-sm ${trendColor}`}>
            {trendIndicator}
            {changePercent && (
              <span className="ml-1">
                {changePercent > 0 ? "+" : ""}
                {changePercent}%
              </span>
            )}
          </span>
        </div>
      </div>
      <BarChart2 className="text-gray-600" size={28} />
    </div>
  );
};

const VIXChart = ({ vixData, loading }) => {
  if (loading) {
    return (
      <div className="mt-6 p-6 bg-gray-900 rounded-xl">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!vixData || vixData.length === 0) {
    return (
      <div className="mt-6 p-6 bg-gray-900 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">
          Market Volatility Trend
        </h3>
        <div className="h-32 flex items-center justify-center">
          <p className="text-gray-500">No volatility data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...vixData, 20);

  return (
    <div className="mt-6 p-6 bg-gray-900 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">
        Market Volatility Trend
      </h3>
      <div className="h-32 flex items-end justify-between space-x-1">
        {vixData.map((point, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-green-500 to-green-300 rounded-t flex-1"
            style={{ height: `${(point / maxValue) * 100}%` }}
            title={`Value: ${point?.toFixed ? point.toFixed(1) : point}`}
          ></div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
};

export default function MarketMood() {
  const [marketData, setMarketData] = useState({
    currentSentiment: {
      status: "Loading...",
      confidenceScore: "0",
      change24h: "0",
      lastUpdated: "Loading...",
    },
    indices: [],
  });
  const [vixData, setVixData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  // Fetch data from your local API
  const fetchMarketData = async () => {
    try {
      setApiError(null);
      const response = await fetch("http://localhost:4000/api/market/overview");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Process the API response based on your market data structure
      if (data) {
        // Extract current sentiment from fear_greed data
        const fearGreedData = data.fear_greed;
        let sentimentStatus = "Neutral";
        let confidenceScore = "N/A";
        let change24h = "0";

        if (fearGreedData && !fearGreedData.error) {
          sentimentStatus = fearGreedData.sentiment || "Neutral";
          confidenceScore =
            fearGreedData.score?.toString() ||
            fearGreedData.vix_level?.toFixed(1) ||
            "N/A";
          change24h = fearGreedData.changePercent
            ? fearGreedData.changePercent > 0
              ? `+${fearGreedData.changePercent.toFixed(1)}`
              : fearGreedData.changePercent.toFixed(1)
            : fearGreedData.change
            ? fearGreedData.change > 0
              ? `+${fearGreedData.change.toFixed(1)}`
              : fearGreedData.change.toFixed(1)
            : "0";
        }

        // Extract VIX data
        const vixInfo = data.vix;
        if (vixInfo && !vixInfo.error) {
          confidenceScore = vixInfo.currentPrice?.toFixed(1) || confidenceScore;
          if (!change24h || change24h === "0") {
            change24h = vixInfo.changePercent
              ? vixInfo.changePercent > 0
                ? `+${vixInfo.changePercent.toFixed(1)}%`
                : `${vixInfo.changePercent.toFixed(1)}%`
              : "0%";
          }
        }

        // Create indices array from the data
        const indices = [];

        // Add VIX as first metric
        if (vixInfo && !vixInfo.error) {
          indices.push({
            name: "VIX",
            value: vixInfo.currentPrice?.toFixed(1) || "N/A",
            trend:
              vixInfo.change > 0
                ? "up"
                : vixInfo.change < 0
                ? "down"
                : "neutral",
            changePercent: vixInfo.changePercent?.toFixed(2),
            error: false,
          });
        }

        // Add S&P 500 if available
        if (data.indices && data.indices.sp500) {
          const sp500 = data.indices.sp500;
          indices.push({
            name: "S&P 500",
            value: sp500.price?.toFixed(0) || "N/A",
            trend:
              sp500.change > 0 ? "up" : sp500.change < 0 ? "down" : "neutral",
            changePercent: sp500.changePercent?.toFixed(2),
            error: false,
          });
        }

        // Add Dow Jones if available
        if (data.indices && data.indices.dow) {
          const dow = data.indices.dow;
          indices.push({
            name: "Dow Jones",
            value: dow.price?.toFixed(0) || "N/A",
            trend: dow.change > 0 ? "up" : dow.change < 0 ? "down" : "neutral",
            changePercent: dow.changePercent?.toFixed(2),
            error: false,
          });
        }

        // Add NASDAQ if available
        if (data.indices && data.indices.nasdaq) {
          const nasdaq = data.indices.nasdaq;
          indices.push({
            name: "NASDAQ",
            value: nasdaq.price?.toFixed(0) || "N/A",
            trend:
              nasdaq.change > 0 ? "up" : nasdaq.change < 0 ? "down" : "neutral",
            changePercent: nasdaq.changePercent?.toFixed(2),
            error: false,
          });
        }

        // Add Fear & Greed Index
        if (fearGreedData && !fearGreedData.error) {
          indices.push({
            name: "Fear & Greed",
            value: fearGreedData.score?.toString() || "N/A",
            trend:
              fearGreedData.score > 50
                ? "up"
                : fearGreedData.score < 50
                ? "down"
                : "neutral",
            changePercent: null,
            error: false,
          });
        }

        // If no indices data available, add placeholders
        if (indices.length === 0) {
          indices.push(
            {
              name: "VIX",
              value: "N/A",
              trend: "neutral",
              error: true,
            },
            {
              name: "S&P 500",
              value: "N/A",
              trend: "neutral",
              error: true,
            },
            {
              name: "Fear & Greed",
              value: "N/A",
              trend: "neutral",
              error: true,
            }
          );
        }

        // Generate VIX chart data (you might want to fetch historical data separately)
        const chartData = Array.from({ length: 30 }, (_, i) => {
          const baseVix = vixInfo?.currentPrice || 20;
          const variation = Math.sin(i * 0.2) * 3 + (Math.random() - 0.5) * 2;
          return Math.max(10, Math.min(50, baseVix + variation));
        });

        setMarketData({
          currentSentiment: {
            status: sentimentStatus,
            confidenceScore: confidenceScore,
            change24h: change24h,
            lastUpdated: new Date().toLocaleTimeString(),
          },
          indices: indices,
        });

        setVixData(chartData);
      }
    } catch (error) {
      console.error("Error fetching market data:", error);
      setApiError(error.message);

      // Set error state for all components
      setMarketData({
        currentSentiment: {
          status: "Error",
          confidenceScore: "N/A",
          change24h: "N/A",
          lastUpdated: new Date().toLocaleTimeString(),
        },
        indices: [
          { name: "VIX", value: "Error", trend: "neutral", error: true },
          { name: "S&P 500", value: "Error", trend: "neutral", error: true },
          {
            name: "Fear & Greed",
            value: "Error",
            trend: "neutral",
            error: true,
          },
          { name: "Market Cap", value: "Error", trend: "neutral", error: true },
        ],
      });
      setVixData([]);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    setErrors({});

    try {
      await fetchMarketData();
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Error refreshing data:", error);
      setErrors({ general: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Refresh data when timeframe changes
  useEffect(() => {
    if (!loading) {
      refreshData();
    }
  }, [activeTimeframe]);

  return (
    <div className="min-h-screen font-sans text-white bg-black">
      <div className="max-w-2xl p-4 mx-auto">
        <ReverseButton />
        <div className="text-center mt-4 w-full">
          <h1 className="text-2xl font-bold text-white">Market Mood</h1>
          <p className="text-sm text-gray-400">Real-time sentiment analysis</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-400">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
            {apiError && (
              <p className="text-xs text-red-400 mt-1">API Error: {apiError}</p>
            )}
          </div>
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>

        <main>
          <CurrentSentimentCard
            data={marketData.currentSentiment}
            loading={loading}
          />

          <TimeframeSelector
            activeTimeframe={activeTimeframe}
            onTimeframeChange={setActiveTimeframe}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {marketData.indices.map((item, index) => (
              <MetricCard
                key={`${item.name}-${index}`}
                name={item.name}
                value={item.value}
                trend={item.trend}
                changePercent={item.changePercent}
                loading={loading}
                error={item.error}
              />
            ))}
          </div>

          <VIXChart vixData={vixData} loading={loading} />
        </main>
      </div>
    </div>
  );
}
