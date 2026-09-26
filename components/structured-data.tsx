import { entries, profile } from "@/content/cv";

const SITE = "https://nesenaz.com";

// schema.org Person and ScholarlyArticle markup so search engines can tie the
// name, affiliations and both papers together.
export function StructuredData() {
  const pubs = entries.filter((e) => e.section === "publications");
  const person = {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: profile.name,
    url: SITE,
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Istanbul", addressCountry: "TR" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Sabancı University" },
      { "@type": "CollegeOrUniversity", name: "Alma Mater Studiorum Università di Bologna" },
      { "@type": "CollegeOrUniversity", name: "Sungkyunkwan University" }
    ],
    knowsAbout: ["Information retrieval", "Rank fusion", "Edge AI", "Small language models", "Humanitarian logistics", "Simulation"],
    knowsLanguage: ["tr", "en"]
  };
  const articles = pubs.map((p) => ({
    "@type": "ScholarlyArticle",
    headline: p.title,
    name: p.title,
    author: (p.authors ?? "").split(", ").map((a) =>
      a === "N. Yalçın" ? { "@id": `${SITE}/#person` } : { "@type": "Person", name: a }
    ),
    datePublished: "2026",
    description: p.venue,
    publisher: { "@type": "Organization", name: "IEEE" },
    url: p.links?.[0]?.href.startsWith("/") ? `${SITE}${p.links[0].href}` : p.links?.[0]?.href
  }));
  const data = { "@context": "https://schema.org", "@graph": [person, ...articles] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
