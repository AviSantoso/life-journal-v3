"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, formatDistanceToNowStrict, parse, parseISO } from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { JournalEntry } from "@/types";
import { getHomePageData as fetchHomePageData } from "@/actions/getHomePageData";
import journalEntryService from "@/hooks/useJournalEntryService";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export type HomePageData = {
  journalEntries: JournalEntry[];
  canAddEntry: boolean;
};

function HomePage({ journalEntries, canAddEntry }: HomePageData) {
  const [, navigate] = useLocation();

  function getFullDateString(date: string) {
    const dateObj = parse(date, "yyyy-MM-dd", new Date());
    return format(dateObj, `EEEE, MMMM do, yyyy`);
  }

  function getRelativeDateString(date: Date) {
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-y-auto p-4 sm:p-6 md:p-12 bg-muted-foreground">
      <div className="container max-w-4xl mx-auto px-2 sm:px-4">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center gap-4">
            <p className="font-sans text-xl sm:text-2xl text-muted-foreground p-2 font-bold">
              Life Journal v3
            </p>
            {canAddEntry && (
              <Button
                className="w-full sm:w-auto hover:bg-gray-200"
                onClick={() => navigate("/add-entry")}
              >
                Add Entry
              </Button>
            )}
          </div>
          {journalEntries.map((entry) => {
            const entryLines = entry.content.split("\n");
            return (
              <Card key={entry.date} className="w-full">
                <CardHeader className="pb-2">
                  <CardTitle>
                    <p className="font-sans text-lg sm:text-xl font-semibold">
                      {entry.title}
                    </p>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex flex-col sm:flex-row justify-between text-base sm:text-lg font-sans gap-2">
                      <p>{getFullDateString(entry.date)}</p>
                      <p className="capitalize">
                        {getRelativeDateString(parseISO(entry.createdAt))}
                      </p>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col pb-2 pt-4 opacity-90">
                    {entryLines.map((line, index) => (
                      <p
                        key={index}
                        className="mt-2 font-sans text-base sm:text-lg"
                        style={{ lineHeight: 1.5 }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const { toast } = useToast();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [canAddEntry, setCanAddEntry] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const { journalEntries, canAddEntry } = await fetchHomePageData({
          journalEntryService,
        });
        setJournalEntries(journalEntries);
        setCanAddEntry(canAddEntry);
      } catch (error) {
        toast({
          title: "Failed to fetch journal entries",
          description: "" + error,
          variant: "destructive",
        });
      }
    }
    init();
  }, [toast]);

  return <HomePage journalEntries={journalEntries} canAddEntry={canAddEntry} />;
}
