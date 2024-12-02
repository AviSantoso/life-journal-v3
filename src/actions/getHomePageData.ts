"use server";

import { subMonths, subWeeks, subYears } from "date-fns";
import { uniqBy } from "lodash";
import { getDateStr } from "../lib/getDateStr";
import { HomePageData } from "@/components/pages/Home.page";
import { JournalEntry, JournalEntryRepository } from "@/types";

export async function getHomePageData({
  journalEntryRepository,
}: {
  journalEntryRepository: JournalEntryRepository;
}): Promise<HomePageData> {
  const today = new Date();
  const todayStr = getDateStr(today);

  const latestEntries = await journalEntryRepository
    .search()
    .sortDescending("createdAt")
    .return.page(0, 2);

  const dates = [
    subWeeks(today, 1), // 1 week ago
    subMonths(today, 1), // 1 month ago
    subMonths(today, 3), // 3 months ago
    subYears(today, 1), // 1 year ago
    subYears(today, 3), // 3 years ago
    subYears(today, 5), // 5 years ago
    subYears(today, 10), // 10 years ago
  ];

  const olderEntries = await Promise.all(
    dates.map(async (d) =>
      journalEntryRepository
        .search()
        .where("createdAt")
        .lte(d.toISOString())
        .sortDescending("createdAt")
        .return.first()
    )
  );

  const uniqueEntries = uniqBy(
    [...latestEntries, ...olderEntries.filter((x) => x != null)],
    (x: JournalEntry) => x.date
  );

  const canAddEntry =
    uniqueEntries.findIndex((x) => x.date === todayStr) === -1;

  return {
    journalEntries: uniqueEntries,
    canAddEntry,
  };
}
