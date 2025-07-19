import Assessment from "@/modules/assesment";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/assessment")({
  component: Assessment,
});
