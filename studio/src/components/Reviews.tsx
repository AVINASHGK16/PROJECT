"use client";

import { useState } from 'react';
import Image from 'next/image';
import type { ServiceProvider } from '@/types';
import { summarizeReviews, type SummarizeReviewsOutput } from '@/ai/flows/summarize-reviews';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Star, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewsProps {
  provider: ServiceProvider;
}

export default function Reviews({ provider }: ReviewsProps) {
  const [summary, setSummary] = useState<SummarizeReviewsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary(null);
    try {
      const reviewTexts = provider.reviews.map(r => r.text);
      const result = await summarizeReviews({ reviews: reviewTexts });
      setSummary(result);
    } catch (error) {
      console.error('AI summary failed:', error);
      toast({
        variant: "destructive",
        title: "AI Summary Failed",
        description: "Could not generate the AI summary at this time. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Client Reviews</CardTitle>
          <Button onClick={handleSummarize} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Summarize with AI
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {summary && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-semibold">AI-Powered Summary & Suggestions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <Alert>
                  <AlertTitle className="font-semibold">Review Summary for Customers</AlertTitle>
                  <AlertDescription>{summary.summary}</AlertDescription>
                </Alert>
                <Alert variant="default" className="bg-secondary">
                  <Lightbulb className="h-4 w-4"/>
                  <AlertTitle className="font-semibold">Suggestions for the Provider</AlertTitle>
                  <AlertDescription>{summary.suggestions}</AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <div className="space-y-6">
          {provider.reviews.map(review => (
            <div key={review.id} className="flex gap-4 border-t pt-6 first:border-t-0 first:pt-0">
              <Image
                src={review.avatarUrl}
                alt={review.author}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
                data-ai-hint="portrait person"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
