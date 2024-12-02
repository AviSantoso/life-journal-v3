export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateJournalEntry = Omit<
  JournalEntry,
  "id" | "email" | "createdAt" | "updatedAt"
>;
