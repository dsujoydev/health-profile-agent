import Assessment from "@/modules/assesment/Assesment";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/assessment")({
  component: Assessment,
});
