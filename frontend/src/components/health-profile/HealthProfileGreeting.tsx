import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const greetingSchema = z.object({
  user_type: z.enum(["new_user", "returning_user", "fitness_focused", "general"], {
    required_error: "Please select a user type",
  }),
});

type GreetingForm = z.infer<typeof greetingSchema>;

interface ApiResponse {
  response: string;
}

export function HealthProfileGreeting() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<GreetingForm>({
    resolver: zodResolver(greetingSchema),
    defaultValues: {
      user_type: "general",
    },
  });

  const onSubmit = async (data: GreetingForm) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/health/profile/greet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to get greeting");
      }

      const result: ApiResponse = await response.json();
      setResponse(result.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Sorry, there was an error getting your greeting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Health Profile Greeting</CardTitle>
        <CardDescription className="text-center">Get a personalized greeting based on your user type</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user_type">User Type</Label>
            <select
              id="user_type"
              {...form.register("user_type")}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="new_user">New User</option>
              <option value="returning_user">Returning User</option>
              <option value="fitness_focused">Fitness Focused</option>
            </select>
            {form.formState.errors.user_type && (
              <p className="text-sm text-red-600">{form.formState.errors.user_type.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Getting Greeting..." : "Get Greeting"}
          </Button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">AI Response:</h3>
            <div className="whitespace-pre-wrap text-gray-700">{response}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
