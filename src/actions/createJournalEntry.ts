"use server";

import { TJournalEntryService } from "@/hooks/useJournalEntryService";
import { getDateStr } from "@/lib/getDateStr";
import { nanoid } from "nanoid";

export async function createJournalEntry(args: {
  journalEntryService: TJournalEntryService;
  title: string;
  content: string;
  gratitudeItems: string[];
}) {
  const { journalEntryService, title, content, gratitudeItems } = args;

  const todaysDate = getDateStr(new Date());

  await journalEntryService.createJournalEntry({
    title,
    content,
    gratitudeItems: gratitudeItems.map((content) => ({
      id: nanoid(),
      content })),
    date: todaysDate,
  });
}
