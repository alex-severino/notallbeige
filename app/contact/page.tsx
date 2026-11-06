import type { Metadata } from "next";
import { Coat } from "@/components/Coat";
import { PageHero } from "@/components/PageHero";
import styles from "@/components/pages.module.css";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Not All Beige about your home, press or paint.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Coat>
      <div>
        <PageHero color="hague" ink="aulait" title={contact.title} lead={contact.lead}>
          <a href={`mailto:${site.email}`} className={styles.contactEmail}>
            {site.email}
          </a>
        </PageHero>
        <section className={`gutter ${styles.contactGrid}`}>
          <div>
            <h2 className={styles.contactLabel}>where</h2>
            <p>{contact.place}</p>
          </div>
          <div>
            <h2 className={styles.contactLabel}>what for</h2>
            <p>Interior design, press and anything to do with paint.</p>
          </div>
          <div>
            <h2 className={styles.contactLabel}>elsewhere</h2>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              LinkedIn ↗
            </a>
            <a href={site.founderUrl} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              angelinaseverino.com ↗
            </a>
          </div>
        </section>
      </div>
    </Coat>
  );
}
