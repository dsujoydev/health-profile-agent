import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navigation from "@/components/layout/navigation";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      <Outlet />
    </div>
  );
}
