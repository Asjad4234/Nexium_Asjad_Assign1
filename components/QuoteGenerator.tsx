import React, { useState } from 'react';
import { Search, RefreshCw, Quote } from 'lucide-react';
import quotesDatabase from '@/data/quotes';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const QuoteGenerator = () => {
    const [topic, setTopic] = useState('');
    const [quotes, setQuotes] = useState<{ text: string; author: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Function to get 3 random quotes from a given list
    const getRandomQuotes = (list: { text: string; author: string }[]) => {
        return [...list].sort(() => 0.5 - Math.random()).slice(0, 3);
    };
    // Map of keywords to topics for better search flexibility

    const findTopic = (search: string) => {
        const lower = search.toLowerCase().trim();
        const topics = Object.keys(quotesDatabase);

        if (topics.includes(lower)) return lower;
        return topics.find(t => t.includes(lower) || lower.includes(t)) || null;
    };


    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setHasSearched(true);
        await new Promise(res => setTimeout(res, 500));

        const selected = findTopic(topic);

        if (!selected) {
            setQuotes([]);
        } else {
            setQuotes(getRandomQuotes(quotesDatabase[selected]));
        }

        setLoading(false);
    };


    const handleNewQuotes = () => {
        const selected = findTopic(topic);
        setQuotes(getRandomQuotes(quotesDatabase[selected]));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center mb-4">
                        <Quote className="h-8 w-8 text-blue-600 mr-2 transform -scale-x-100" />
                        <h1 className="text-4xl font-bold text-gray-800">Daily Quotes</h1>
                        <Quote className="h-8 w-8 text-blue-600 ml-2" />
                    </div>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                        Enter a topic and get 3 motivational quotes instantly.
                    </p>
                </div>

                {/* Search Box */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mb-8 space-y-4">
                    <div>
                        <label htmlFor="topic" className="text-sm font-medium text-gray-700 mb-2 block">
                            Enter topic:
                        </label>
                        <div className="relative">
                            <Input
                                id="topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g. motivation, success, life..."
                                className="pr-12"
                                autoFocus
                            />

                            <Search className="absolute right-4 top-2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button className='className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium'>Get Quotes</Button>


                        {quotes.length > 0 && (
                            <Button
                                onClick={handleNewQuotes}
                                className='flex items-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200'
                            >
                                <RefreshCw className="h-4 w-4" />
                                New Quotes
                            </Button>
                        )}
                    </div>
                </form>

                {/* Suggested Topics */}
                <div className="text-center mb-8">
                    <p className="text-2xl text-gray-500 mb-2">Suggested For You</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {Object.keys(quotesDatabase).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTopic(t)}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 capitalize"
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quote Display */}
                {!loading && quotes.length > 0 && (
                    <div className="space-y-6 max-w-2xl mx-auto">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Here are some Quotes about "{topic}"</h2>
                            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
                        </div>

                        {quotes.map((quote, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500"
                            >
                                <div className="flex items-start">
                                    <Quote className="h-6 w-6 text-blue-500 mt-1 mr-3" />
                                    <div>
                                        <p className="text-lg text-gray-800 mb-3">"{quote.text}"</p>
                                        <p className="text-blue-600 font-medium">— {quote.author}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Show no quote message */}
                {!loading && hasSearched && quotes.length === 0 && (
                    <div className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                        Sorry, We do not have quotes on this topic yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteGenerator;
