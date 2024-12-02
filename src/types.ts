export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  date: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateJournalEntry = Omit<
  JournalEntry,
  "id" | "email" | "createdAt" | "updatedAt"
>;
