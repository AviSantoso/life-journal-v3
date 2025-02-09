export type GratitudeItem = {
  id: string;
  content: string;
}

export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  gratitudeItems?: GratitudeItem[];
  date: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateJournalEntry = Omit<
  JournalEntry,
  "id" | "email" | "createdAt" | "updatedAt"
>;
