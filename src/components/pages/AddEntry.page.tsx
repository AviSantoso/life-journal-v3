"use client";

import { useState } from "react";
import { createJournalEntry } from "@/actions/createJournalEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useDbContext } from "@/DbContextProvider";

function AddEntryPage() {
  const [, navigate] = useLocation();
  const { journalEntryRepository } = useDbContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("Dear Future Avi,\n\n");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      if (title === "") {
        toast({
          title: "Title is required",
          variant: "destructive",
        });
        return;
      }
      e.preventDefault();
      setIsLoading(true);
      await createJournalEntry({
        journalEntryRepository,
        isPublic: false,
        title,
        content,
        imageUrl: "",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast({
        title: `Error submitting entry`,
        description: `${error}`,
        variant: "destructive",
      });
    }
  }

  function validateLength(text: string) {
    return text.length <= 1000 && text.length >= 500;
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-y-auto p-12 bg-muted-foreground">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="p-6 bg-white rounded-xl shadow-xl border-2 border-secondary">
          <h2 className="text-2xl font-bold mb-6 uppercase text-primary">
            Daily Journal
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your journal title"
                  className="w-full font-sans text-gray-800"
                  autoComplete="off"
                />
              </div>
              <div className="text-sm font-medium space-y-2">
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>What have I done since my last journal entry?</li>
                  <li>
                    What am I planning to do before my next journal entry?
                  </li>
                  <li>Did anything interesting happen since my last entry?</li>
                  <li>What ideas have I been pondering recently?</li>
                  <li>Is there anything I need to remember?</li>
                </ul>
              </div>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-64 font-sans text-gray-800"
                style={{ lineHeight: "1.5rem" }}
                maxLength={1000}
                autoComplete="off"
              />
              <div className="flex items-center justify-between gap-2">
                <div className="text-muted-foreground text-xs">
                  {content.length < 500
                    ? "Minimum 500 characters required"
                    : ""}
                </div>
                <div className="text-sm text-right text-gray-500">
                  {content.length}/1000 characters
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !validateLength(content) || title === ""}
            >
              {isLoading ? "Submitting..." : "Submit Entry"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEntryPage;
