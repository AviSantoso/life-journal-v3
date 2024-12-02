"use server";

import { getDateStr } from "@/lib/getDateStr";
import { JournalEntryRepository } from "@/types";

export async function createJournalEntry(args: {
  journalEntryRepository: JournalEntryRepository;
  isPublic: boolean;
  title: string;
  content: string;
  imageUrl: string;
}) {
  const { journalEntryRepository } = args;

  const todaysDate = getDateStr(new Date());

  await journalEntryRepository.save({
    title: args.title,
    content: args.content,
    date: todaysDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}
