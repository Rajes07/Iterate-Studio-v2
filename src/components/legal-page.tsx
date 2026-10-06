import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";

/** Placeholder shell for the Privacy and Terms pages. Replace the body with the real text. */
export function LegalPage({ title }: { title: string }) {
  return (
    <main className="legal-page">
      <div className="site-container">
        <Link to="/" className="text-link"><ArrowLeft /> Back to home</Link>
        <p className="eyebrow section-eyebrow mt-12">Legal</p>
        <h1 className="legal-title">{title}</h1>
        <p className="mt-6 max-w-xl text-muted-foreground">This page is a placeholder. The full text will be published here soon. Questions in the meantime? Write to <a className="font-semibold underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
      </div>
    </main>
  );
}
