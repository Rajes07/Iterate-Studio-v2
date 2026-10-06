import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Iterate Studio" }, { name: "robots", content: "noindex" }] }),
  component: () => <LegalPage title="Privacy Policy" />,
});
