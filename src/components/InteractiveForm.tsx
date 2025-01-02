'use client';

import { useState } from 'react';
import { BsArrowRightCircle } from "react-icons/bs";
import { Toaster, toast } from 'react-hot-toast';

export default function InteractiveForm() {
  const [tweet, setTweet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const description = (e.target as HTMLFormElement).description.value.trim();

    if (!description) {
      toast.error("Please enter some text!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      const result = await response.json();

      if (response.ok) {
        setTweet(result.tweet);
        toast.success("Tweet generated successfully!");
      } else {
        toast.error(result.error || "Failed to generate tweet.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (tweet) {
      navigator.clipboard.writeText(tweet);
      toast.success("Tweet copied to clipboard!");
    }
  };

  const handleRegenerate = async () => {
    if (!tweet) return;

    setLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: tweet }),
      });

      const result = await response.json();

      if (response.ok) {
        setTweet(result.tweet);
        toast.success("Tweet regenerated successfully!");
      } else {
        toast.error(result.error || "Failed to regenerate tweet.");
      }
    } catch (error) {
      console.error('Error regenerating tweet:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <Toaster position="top-center" />

      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <textarea
            id="description"
            name="description"
            rows={10}
            placeholder="Write your thoughts here..."
            className="block w-full px-4 py-3 mt-4 bg-gray-800 text-white text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute bottom-2 right-2 p-2 text-white bg-transparent hover:bg-gray-700 rounded-full disabled:opacity-50"
          >
            <BsArrowRightCircle size={30} />
          </button>
        </div>
      </form>

      {tweet && (
        <div className="mt-6 text-white">
          <p className="text-lg">{tweet}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-400"
            >
              Copy
            </button>
            <button
              onClick={handleRegenerate}
              className="px-4 py-2 bg-green-500 rounded-full text-white hover:bg-green-400"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white text-lg animate-pulse">Generating tweet...</span>
        </div>
      )}
    </div>
  );
}
