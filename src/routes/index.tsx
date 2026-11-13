import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/AuthPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Robotaxi Tracker — Log in" },
      { name: "description", content: "Log in to Robotaxi Tracker. Track autonomous fleets in real time." },
      { property: "og:title", content: "Robotaxi Tracker — Log in" },
      { property: "og:description", content: "Log in to Robotaxi Tracker. Track autonomous fleets in real time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});
