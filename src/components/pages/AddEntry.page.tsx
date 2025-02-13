"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createJournalEntry } from "@/actions/createJournalEntry";
import journalEntryService from "@/hooks/useJournalEntryService";
import { useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useImmer } from "use-immer";
import { MinusIcon, PlusIcon } from "lucide-react";

function AddEntryPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("Dear Future Avi,\n\n");
  const [gratitudeItems, mutateGratitudeItems] = useImmer<string[]>(["", "", ""]);

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
        journalEntryService,
        title,
        content,
        gratitudeItems,
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

  const contentWithoutWhitespace = content.replace(/\s/g, "");
  const contentLength = contentWithoutWhitespace.length;
  const isLengthValid = contentLength <= 2048 && contentLength >= 512;
  const hasEmptyGratitudeItems = gratitudeItems.some((item) => item === "");

  const canSubmit = !isLoading && isLengthValid && title !== "" && !hasEmptyGratitudeItems;

  return (
    <div className="flex flex-col w-screen h-screen overflow-y-auto items-center sm:justify-center p-2 pt-4 justify-start bg-muted-foreground">
      <div className="container max-w-4xl mx-auto px-2 sm:px-4">
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-xl border border-secondary">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase text-primary">
            Daily Journal
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-3 sm:gap-4">
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
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-80 font-sans text-gray-800"
                style={{ lineHeight: "1.5rem" }}
                autoComplete="off"
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="text-muted-foreground text-xs">
                  {contentLength < 512
                    ? "Minimum 512 characters required (excluding spaces)"
                    : ""}
                  {contentLength > 1024
                    ? "Maximum 1024 characters (excluding spaces)"
                    : ""}
                </div>
                <div className="text-xs sm:text-sm text-right text-gray-500">
                  {contentLength}/1024 characters
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-sm font-medium">Gratitude Items</Label>
                </div>
                <div className="flex gap-2">

                  <Button
                    disabled={gratitudeItems.length >= 7}
                    type="button"
                    onClick={() =>
                      mutateGratitudeItems((draft) => {
                        draft.push("");
                      })
                    }
                    className="w-full"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    disabled={gratitudeItems.length <= 3}
                    type="button"
                    onClick={() =>
                      mutateGratitudeItems((draft) => {
                        draft.pop();
                      })
                    }
                    className="w-full"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {gratitudeItems.map((item, index) => (
                <Input
                  key={index}
                  value={item}
                  onChange={(e) =>
                    mutateGratitudeItems((draft) => {
                      draft[index] = e.target.value;
                    })
                  }
                  placeholder={`What is one thing you are grateful for that happened in the last 24 hours?`}
                  className="w-full font-sans text-gray-800"
                  autoComplete="off"
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!canSubmit}
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
