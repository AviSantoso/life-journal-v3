import { Repository } from "redis-om";

export type JournalEntry = {
  title: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type JournalEntryRepository = Repository<JournalEntry>;
