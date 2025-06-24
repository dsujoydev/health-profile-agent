import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const assessmentSchema = z.object({
  user_info: z.object({
    age: z.number().min(1, "Age must be greater than 0").max(120, "Age must be less than 120"),
    height: z.number().min(50, "Height must be at least 50cm").max(300, "Height must be less than 300cm"),
    weight: z.number().min(20, "Weight must be at least 20kg").max(500, "Weight must be less than 500kg"),
    activity_level: z.enum(["sedentary", "lightly_active", "moderately_active", "very_active", "extremely_active"]),
    health_concerns: z.string().optional(),
    goals: z.string().min(1, "Please enter your health goals"),
  }),
});

type AssessmentForm = z.infer<typeof assessmentSchema>;

interface ApiResponse {
  response: string;
}

export function HealthAssessment() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<AssessmentForm>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      user_info: {
        age: undefined,
        height: undefined,
        weight: undefined,
        activity_level: "moderately_active",
        health_concerns: "",
        goals: "",
      },
    },
  });

  const onSubmit = async (data: AssessmentForm) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/health/profile/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to get assessment");
      }

      const result: ApiResponse = await response.json();
      setResponse(result.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Sorry, there was an error processing your assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Health Assessment</CardTitle>
        <CardDescription className="text-center">
          Complete your health profile to get personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  {...form.register("user_info.age", { valueAsNumber: true })}
                />
                {form.formState.errors.user_info?.age && (
                  <p className="text-sm text-red-600">{form.formState.errors.user_info.age.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  {...form.register("user_info.height", { valueAsNumber: true })}
                />
                {form.formState.errors.user_info?.height && (
                  <p className="text-sm text-red-600">{form.formState.errors.user_info.height.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  {...form.register("user_info.weight", { valueAsNumber: true })}
                />
                {form.formState.errors.user_info?.weight && (
                  <p className="text-sm text-red-600">{form.formState.errors.user_info.weight.message}</p>
                )}
              </div>
            </div>

            {/* Activity & Goals */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Activity & Goals</h3>

              <div className="space-y-2">
                <Label htmlFor="activity_level">Activity Level</Label>
                <select
                  id="activity_level"
                  {...form.register("user_info.activity_level")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sedentary">Sedentary (little to no exercise)</option>
                  <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
                  <option value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</option>
                  <option value="very_active">Very Active (hard exercise 6-7 days/week)</option>
                  <option value="extremely_active">Extremely Active (very hard exercise, physical job)</option>
                </select>
                {form.formState.errors.user_info?.activity_level && (
                  <p className="text-sm text-red-600">{form.formState.errors.user_info.activity_level.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Health Goals</Label>
                <textarea
                  id="goals"
                  rows={3}
                  placeholder="e.g., lose 10kg, build muscle, improve cardiovascular health..."
                  {...form.register("user_info.goals")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                {form.formState.errors.user_info?.goals && (
                  <p className="text-sm text-red-600">{form.formState.errors.user_info.goals.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="health_concerns">Health Concerns (Optional)</Label>
                <textarea
                  id="health_concerns"
                  rows={3}
                  placeholder="Any health conditions, injuries, or concerns..."
                  {...form.register("user_info.health_concerns")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? "Analyzing Your Profile..." : "Get Health Assessment"}
          </Button>
        </form>

        {response && (
          <div className="mt-6 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-3 text-blue-800 text-lg">Your Health Assessment:</h3>
            <div className="whitespace-pre-wrap text-blue-700 leading-relaxed">{response}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
