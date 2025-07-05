import Workouts from "@/modules/workouts/workouts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workouts")({
  component: Workouts,
});
