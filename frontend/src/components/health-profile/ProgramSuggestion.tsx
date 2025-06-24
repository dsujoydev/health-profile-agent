import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const programSchema = z.object({
  health_interest: z.string().min(1, "Please enter your health interest"),
});

type ProgramForm = z.infer<typeof programSchema>;

interface ApiResponse {
  response: string;
}

export function ProgramSuggestion() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<ProgramForm>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      health_interest: "",
    },
  });

  const onSubmit = async (data: ProgramForm) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/health/profile/suggest-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to get program suggestion");
      }

      const result: ApiResponse = await response.json();
      setResponse(result.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Sorry, there was an error getting your program suggestion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const healthInterestExamples = [
    "weight loss",
    "muscle gain",
    "stress management",
    "better sleep",
    "cardiovascular health",
    "nutrition improvement",
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Program Suggestion</CardTitle>
        <CardDescription className="text-center">
          Tell us your health interest and get a personalized program recommendation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="health_interest">Health Interest</Label>
            <Input
              id="health_interest"
              placeholder="e.g., weight loss, muscle gain, stress management..."
              {...form.register("health_interest")}
            />
            {form.formState.errors.health_interest && (
              <p className="text-sm text-red-600">{form.formState.errors.health_interest.message}</p>
            )}

            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {healthInterestExamples.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => form.setValue("health_interest", interest)}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Getting Suggestion..." : "Get Program Suggestion"}
          </Button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-green-800">Program Recommendation:</h3>
            <div className="whitespace-pre-wrap text-green-700">{response}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
