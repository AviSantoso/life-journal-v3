"use client";

import { format, formatDistanceToNowStrict, parse, parseISO } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { JournalEntry } from "@/types";
import { getHomePageData as fetchHomePageData } from "@/actions/getHomePageData";
import { useDbContext } from "@/DbContextProvider";

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

  function getRelativeDateString(date: string) {
    return formatDistanceToNowStrict(parseISO(date), { addSuffix: true });
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-y-auto p-12 bg-muted-foreground">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          <div className="flex justify-end">
            {canAddEntry && (
              <Button onClick={() => navigate("/add-entry")}>Add Entry</Button>
            )}
          </div>
          {journalEntries.map((entry) => {
            const entryLines = entry.content.split("\n");
            return (
              <Card key={entry.date} className="w-full">
                <CardHeader className="pb-2">
                  <CardTitle>
                    <p className="font-sans text-xl text-primary">
                      {entry.title}
                    </p>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex justify-between">
                      <p className="font-sans text-sm">
                        {getFullDateString(entry.date)}
                      </p>
                      <p className="font-sans text-sm capitalize">
                        {getRelativeDateString(entry.createdAt)}
                      </p>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {entryLines.map((line, index) => (
                      <p key={index} className="mt-2 font-sans text-lg">
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
  const { journalEntryRepository } = useDbContext();
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [canAddEntry, setCanAddEntry] = useState(false);

  useEffect(() => {
    async function init() {
      const { journalEntries, canAddEntry } = await fetchHomePageData({
        journalEntryRepository,
      });
      setJournalEntries(journalEntries);
      setCanAddEntry(canAddEntry);
    }
    init();
  }, [journalEntryRepository]);

  return <HomePage journalEntries={journalEntries} canAddEntry={canAddEntry} />;
}