"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Sparkle } from "lucide-react";
import Link from "next/link";

const LimitTrial = () => {
  const documents = useQuery(api.documents.getAllDocuments);
  const maxDocuments = 3;
  const documentsCount = documents?.length || 0;
  const limitDocuments = documentsCount >= maxDocuments;
  const progressPercentage = Math.min(
    (documentsCount / maxDocuments) * 100,
    100
  );

  return (
    <Card className="border-white/15 border mx-4 mb-4 bg-inherit text-white">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2 text-base font-semibold">
          <Sparkle className="text-white size-4" />
          Trial free {maxDocuments} times limit
        </CardTitle>
        <CardDescription className="text-gray9">
          {limitDocuments
            ? "You've reached the limit. Please upgrade to Premium to create more documents."
            : `You can create ${maxDocuments - documentsCount} more document(s) for free.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {limitDocuments && (
          <Link
            href="/pricing"
            className="bg-white text-black  px-4 py-1 rounded-md text-base font-medium"
          >
            Go to Premium
          </Link>
        )}
        <Progress value={progressPercentage} className="mt-3" />
      </CardContent>
    </Card>
  );
};

export default LimitTrial;
