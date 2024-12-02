import { nanoid } from "nanoid";
import { get, getDatabase, ref, set } from "firebase/database";
import { auth } from "@/lib/firebase";
import { CreateJournalEntry, JournalEntry } from "@/types";

const db = getDatabase();

async function createJournalEntry({
  title,
  content,
  date,
}: CreateJournalEntry): Promise<JournalEntry> {
  const user = auth.currentUser;

  if (!user?.email) {
    throw new Error("User not found");
  }

  const id = nanoid();
  const createdAt = new Date();
  const updatedAt = createdAt;

  const journalEntry: JournalEntry = {
    id,
    email: user.email,
    title,
    content,
    date,
    createdAt,
    updatedAt,
  };

  const journalEntryRef = ref(db, `journalEntries/${id}`);

  await set(journalEntryRef, journalEntry);

  return (await get(journalEntryRef)).val();
}

async function getJournalEntries(): Promise<JournalEntry[]> {
  const user = auth.currentUser;

  if (!user?.email) {
    throw new Error("User not found");
  }

  const journalEntries = await get(ref(db, `journalEntries`));

  return journalEntries.val();
}

export type TJournalEntryService = {
  createJournalEntry: typeof createJournalEntry;
  getJournalEntries: typeof getJournalEntries;
};

export function useJournalEntryService(): TJournalEntryService {
  return {
    createJournalEntry,
    getJournalEntries,
  };
}
