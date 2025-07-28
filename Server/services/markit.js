const axios = require('axios');
const yahooFinance = require('yahoo-finance2').default;

class MarketDataFetcher {
    constructor(apiKeys = {}) {
        /**
         * Initialize with API keys
         * Get free keys from:
         * - Alpha Vantage: https://www.alphavantage.co/support/#api-key
         * - Finnhub: https://finnhub.io/register
         * - Polygon: https://polygon.io/
         */
        this.alphaVantageKey = apiKeys.alphaVantage;
        this.finnhubKey = apiKeys.finnhub;
        this.polygonKey = apiKeys.polygon;
        
        this.alphaVantageBase = 'https://www.alphavantage.co/query';
        this.finnhubBase = 'https://finnhub.io/api/v1';
        this.polygonBase = 'https://api.polygon.io';
    }

    /**
     * Fetch current VIX data using Yahoo Finance (free, no API key needed)
     */
    async getVixDataYahoo() {
        try {
            const quote = await yahooFinance.quote('^VIX');
            
            return {
                symbol: '^VIX',
                currentPrice: quote.regularMarketPrice,
                previousClose: quote.regularMarketPreviousClose,
                change: quote.regularMarketChange,
                changePercent: quote.regularMarketChangePercent,
                dayLow: quote.regularMarketDayLow,
                dayHigh: quote.regularMarketDayHigh,
                volume: quote.regularMarketVolume,
                timestamp: new Date().toISOString(),
                marketState: quote.marketState
            };
        } catch (error) {
            return { 
                error: `Yahoo Finance error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Fetch VIX historical data using Yahoo Finance
     */
    async getVixHistoricalYahoo(period = '1mo') {
        try {
            const historical = await yahooFinance.historical('^VIX', {
                period1: this.getPeriodDate(period),
                period2: new Date(),
                interval: '1d'
            });

            return {
                symbol: '^VIX',
                data: historical.map(item => ({
                    date: item.date.toISOString().split('T')[0],
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    close: item.close,
                    volume: item.volume
                })),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return { 
                error: `Yahoo Finance historical error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Fetch VIX data using Alpha Vantage
     */
    async getVixDataAlphaVantage() {
        if (!this.alphaVantageKey) {
            return { error: 'Alpha Vantage API key required' };
        }

        try {
            const response = await axios.get(this.alphaVantageBase, {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol: 'VIX',
                    apikey: this.alphaVantageKey
                }
            });

            const data = response.data;
            
            if (data['Global Quote']) {
                const quote = data['Global Quote'];
                return {
                    symbol: quote['01. symbol'],
                    currentPrice: parseFloat(quote['05. price']),
                    change: parseFloat(quote['09. change']),
                    changePercent: quote['10. change percent'],
                    previousClose: parseFloat(quote['08. previous close']),
                    timestamp: quote['07. latest trading day']
                };
            } else {
                return { 
                    error: 'No VIX data found in Alpha Vantage response',
                    response: data 
                };
            }
        } catch (error) {
            return { 
                error: `Alpha Vantage error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Fetch market sentiment using Alpha Vantage News Sentiment
     */
    async getMarketSentimentAlphaVantage(tickers = null, limit = 50) {
        if (!this.alphaVantageKey) {
            return { error: 'Alpha Vantage API key required' };
        }

        try {
            const params = {
                function: 'NEWS_SENTIMENT',
                apikey: this.alphaVantageKey,
                limit: limit
            };

            if (tickers && Array.isArray(tickers)) {
                params.tickers = tickers.join(',');
            }

            const response = await axios.get(this.alphaVantageBase, { params });
            const data = response.data;

            if (data.feed) {
                const articles = data.feed.map(article => ({
                    title: article.title,
                    summary: article.summary,
                    sentiment_score: parseFloat(article.overall_sentiment_score),
                    sentiment_label: article.overall_sentiment_label,
                    source: article.source,
                    time_published: article.time_published,
                    ticker_sentiment: article.ticker_sentiment
                }));

                return {
                    overall_sentiment_score: parseFloat(data.overall_sentiment_score),
                    overall_sentiment_label: data.overall_sentiment_label,
                    articles_count: articles.length,
                    articles: articles,
                    timestamp: new Date().toISOString()
                };
            } else {
                return { 
                    error: 'No sentiment data found',
                    response: data 
                };
            }
        } catch (error) {
            return { 
                error: `Alpha Vantage sentiment error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Fetch market sentiment using Finnhub
     */
    async getMarketSentimentFinnhub(symbol = 'AAPL') {
        if (!this.finnhubKey) {
            return { error: 'Finnhub API key required' };
        }

        try {
            // Get social sentiment
            const socialResponse = await axios.get(`${this.finnhubBase}/stock/social-sentiment`, {
                params: {
                    symbol: symbol,
                    token: this.finnhubKey
                }
            });

            // Get news sentiment
            const newsResponse = await axios.get(`${this.finnhubBase}/news-sentiment`, {
                params: {
                    symbol: symbol,
                    token: this.finnhubKey
                }
            });

            return {
                symbol: symbol,
                social_sentiment: socialResponse.data,
                news_sentiment: newsResponse.data,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return { 
                error: `Finnhub error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Get market news from Finnhub
     */
    async getMarketNews(category = 'general', minId = 0) {
        if (!this.finnhubKey) {
            return { error: 'Finnhub API key required' };
        }

        try {
            const response = await axios.get(`${this.finnhubBase}/news`, {
                params: {
                    category: category,
                    minId: minId,
                    token: this.finnhubKey
                }
            });

            return {
                category: category,
                news: response.data.map(article => ({
                    id: article.id,
                    headline: article.headline,
                    summary: article.summary,
                    source: article.source,
                    url: article.url,
                    datetime: new Date(article.datetime * 1000).toISOString(),
                    image: article.image
                })),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return { 
                error: `Finnhub news error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Calculate Fear & Greed Index based on VIX levels
     */
    async getFearGreedIndex() {
        try {
            const vixData = await this.getVixDataYahoo();
            
            if (vixData.error || !vixData.currentPrice) {
                return { error: 'Could not fetch VIX data for Fear & Greed calculation' };
            }

            const vixPrice = vixData.currentPrice;
            let sentiment, score;

            // Calculate sentiment based on VIX levels
            if (vixPrice < 12) {
                sentiment = "Extreme Greed";
                score = 85;
            } else if (vixPrice < 17) {
                sentiment = "Greed";
                score = 70;
            } else if (vixPrice < 20) {
                sentiment = "Neutral";
                score = 50;
            } else if (vixPrice < 30) {
                sentiment = "Fear";
                score = 30;
            } else {
                sentiment = "Extreme Fear";
                score = 15;
            }

            return {
                vix_level: vixPrice,
                sentiment: sentiment,
                score: score,
                change: vixData.change,
                changePercent: vixData.changePercent,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return { 
                error: `Fear/Greed calculation error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Get comprehensive market overview
     */
    async getMarketOverview() {
        try {
            const [vixData, fearGreed] = await Promise.all([
                this.getVixDataYahoo(),
                this.getFearGreedIndex()
            ]);

            // Get major indices
            const indices = await Promise.all([
                yahooFinance.quote('^GSPC'), // S&P 500
                yahooFinance.quote('^DJI'),  // Dow Jones
                yahooFinance.quote('^IXIC'), // NASDAQ
            ]);

            return {
                vix: vixData,
                fear_greed: fearGreed,
                indices: {
                    sp500: {
                        symbol: '^GSPC',
                        price: indices[0].regularMarketPrice,
                        change: indices[0].regularMarketChange,
                        changePercent: indices[0].regularMarketChangePercent
                    },
                    dow: {
                        symbol: '^DJI',
                        price: indices[1].regularMarketPrice,
                        change: indices[1].regularMarketChange,
                        changePercent: indices[1].regularMarketChangePercent
                    },
                    nasdaq: {
                        symbol: '^IXIC',
                        price: indices[2].regularMarketPrice,
                        change: indices[2].regularMarketChange,
                        changePercent: indices[2].regularMarketChangePercent
                    }
                },
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return { 
                error: `Market overview error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Helper function to get period date
     */
    getPeriodDate(period) {
        const now = new Date();
        switch (period) {
            case '1d':
                return new Date(now.getTime() - 24 * 60 * 60 * 1000);
            case '1w':
                return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            case '1mo':
                return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            case '3mo':
                return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            case '1y':
                return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            default:
                return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }
    }
}

// Example usage
async function main() {
    // Initialize fetcher with API keys (optional for basic functionality)
    const fetcher = new MarketDataFetcher({
        alphaVantage: 'YOUR_ALPHA_VANTAGE_KEY',  // Get from https://www.alphavantage.co/support/#api-key
        finnhub: 'YOUR_FINNHUB_KEY',             // Get from https://finnhub.io/register
        polygon: 'YOUR_POLYGON_KEY'              // Get from https://polygon.io/
    });

    try {
        console.log('=== VIX Data (Yahoo Finance - Free) ===');
        const vixYahoo = await fetcher.getVixDataYahoo();
        console.log(JSON.stringify(vixYahoo, null, 2));

        console.log('\n=== Fear & Greed Indicator ===');
        const fearGreed = await fetcher.getFearGreedIndex();
        console.log(JSON.stringify(fearGreed, null, 2));

        console.log('\n=== Market Overview ===');
        const overview = await fetcher.getMarketOverview();
        console.log(JSON.stringify(overview, null, 2));

        // Uncomment if you have API keys:
        // console.log('\n=== VIX Data (Alpha Vantage) ===');
        // const vixAlpha = await fetcher.getVixDataAlphaVantage();
        // console.log(JSON.stringify(vixAlpha, null, 2));

        // console.log('\n=== Market Sentiment (Alpha Vantage) ===');
        // const sentimentAlpha = await fetcher.getMarketSentimentAlphaVantage(['AAPL', 'MSFT', 'GOOGL']);
        // console.log(JSON.stringify(sentimentAlpha, null, 2));

        // console.log('\n=== Market Sentiment (Finnhub) ===');
        // const sentimentFinnhub = await fetcher.getMarketSentimentFinnhub('AAPL');
        // console.log(JSON.stringify(sentimentFinnhub, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Export for use as module
module.exports = MarketDataFetcher;

// Run if called directly
if (require.main === module) {
    main();
}