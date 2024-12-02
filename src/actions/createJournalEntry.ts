"use server";

import { TJournalEntryService } from "@/hooks/useJournalEntryService";
import { getDateStr } from "@/lib/getDateStr";

export async function createJournalEntry(args: {
  journalEntryService: TJournalEntryService;
  isPublic: boolean;
  title: string;
  content: string;
  imageUrl: string;
}) {
  const { journalEntryService } = args;

  const todaysDate = getDateStr(new Date());

  await journalEntryService.createJournalEntry({
    title: args.title,
    content: args.content,
    date: todaysDate,
  });
}
