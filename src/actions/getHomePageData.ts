"use server";

import { HomePageData } from "@/components/pages/Home.page";
import { JournalEntry } from "@/types";
import { TJournalEntryService } from "@/hooks/useJournalEntryService";
import { getDateStr } from "../lib/getDateStr";
import { parseISO } from "date-fns";
import { uniqBy } from "lodash";

export async function getHomePageData({
  journalEntryService,
}: {
  journalEntryService: TJournalEntryService;
}): Promise<HomePageData> {
  const today = new Date();
  const todayStr = getDateStr(today);

  const allEntries = await journalEntryService.getJournalEntries();

  // Get entries at fibonacci positions from the end (1st, 2nd, 3rd, 5th, 8th, etc)
  const sortedEntries = allEntries.sort(
    (a, b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime()
  );

  let a = 3;
  let b = 5;
  const fibIndices = [];
  while (b < sortedEntries.length) {
    fibIndices.push(b - 1);
    const temp = a + b;
    a = b;
    b = temp;
  }

  const olderEntries = fibIndices.map((index) => sortedEntries[index]);

  const uniqueEntries = uniqBy(
    [...olderEntries.filter((x) => x != null)],
    (x: JournalEntry) => x.date
  );

  const canAddEntry =
    uniqueEntries.findIndex((x) => x.date === todayStr) === -1;

  return {
    journalEntries: uniqueEntries,
    canAddEntry,
  };
}
