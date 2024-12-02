import { nanoid } from "nanoid";
import { get, ref, set } from "firebase/database";
import { auth, realtimeDb } from "@/lib/firebase";
import { CreateJournalEntry, JournalEntry } from "@/types";

const db = realtimeDb;

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
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };

  const journalEntryRef = ref(db, `JournalEntries/${id}`);

  await set(journalEntryRef, journalEntry);

  return (await get(journalEntryRef)).val();
}

async function getJournalEntries(): Promise<JournalEntry[]> {
  const user = auth.currentUser;

  if (!user?.email) {
    throw new Error("User not found");
  }

  const journalEntries = await get(ref(db, `JournalEntries`));

  const journalEntriesObj = journalEntries.val();

  // Check if journalEntriesObj is null
  if (journalEntriesObj === null) {
    return [];
  }

  return Object.values(journalEntriesObj);
}

export type TJournalEntryService = {
  createJournalEntry: typeof createJournalEntry;
  getJournalEntries: typeof getJournalEntries;
};

const journalEntryService: TJournalEntryService = {
  createJournalEntry,
  getJournalEntries,
};

export default journalEntryService;
