import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/AuthPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SF POPOS — Log in or sign up" },
      { name: "description", content: "Join SF POPOS to explore San Francisco's privately owned public open spaces." },
      { property: "og:title", content: "SF POPOS — Log in or sign up" },
      { property: "og:description", content: "Join SF POPOS to explore San Francisco's privately owned public open spaces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});
