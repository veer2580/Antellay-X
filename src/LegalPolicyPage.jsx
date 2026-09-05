import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Check,
  FileText,
  Mail,
  Scale,
} from "lucide-react";
import policies from "../data/legalPolicies.json";

const agreementSlugs = new Set(["employee-nda", "mutual-client-nda"]);

function PolicyBlock({ block }) {
  if (block.type === "list") {
    return (
      <ul className="!list-none !pl-0 space-y-2.5">
        {block.items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex gap-3">
            <Check className="mt-1 h-4 w-4 shrink-0 text-[#087F6B] dark:text-[#00F5D4]" strokeWidth={2.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <p>{block.text}</p>;
}

export default function LegalPolicyPage({ policy }) {
  const isAgreement = agreementSlugs.has(policy.slug);

  return (
    <main className="min-h-screen bg-[#F6F7F4] text-[#14213D] dark:bg-[#071126] dark:text-white">
      <header className="border-b border-[#14213D]/10 bg-[#14213D] text-white dark:border-white/10">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/legal" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white">
            <ArrowLeft size={17} />
            Legal centre
          </Link>
          <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#D7A84A] sm:flex">
            <Scale size={16} />
            Antellay Legal
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#14213D]/10 bg-[#F2EEE5] dark:border-white/10 dark:bg-[#0C1933]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(215,168,74,0.18),transparent_30%),radial-gradient(circle_at_5%_95%,rgba(0,245,212,0.08),transparent_28%)]" />
        <div className="relative mx-auto max-w-[1240px] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9B6B16] dark:text-[#D7A84A]">
            <FileText size={16} />
            {policy.category}
          </div>
          <h1 className="mt-5 max-w-5xl font-[family-name:var(--font-heading)] text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            {policy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#14213D]/65 dark:text-white/65 sm:text-lg sm:leading-8">
            {policy.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5 text-xs font-semibold sm:text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#14213D]/10 bg-white/70 px-3.5 py-2 dark:border-white/10 dark:bg-white/5">
              <CalendarDays size={15} /> Effective {policy.effectiveDate}
            </span>
            <span className="rounded-full border border-[#14213D]/10 bg-white/70 px-3.5 py-2 dark:border-white/10 dark:bg-white/5">
              Version {policy.version}
            </span>
            <span className="rounded-full border border-[#14213D]/10 bg-white/70 px-3.5 py-2 dark:border-white/10 dark:bg-white/5">
              Master document pages {policy.sourcePages}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:px-10 lg:py-16">
        <aside className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto lg:pr-4">
          <details className="rounded-2xl border border-[#14213D]/10 bg-white p-4 open:pb-5 dark:border-white/10 dark:bg-white/[0.04] lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-bold uppercase tracking-[0.17em] text-[#14213D]/55 dark:text-white/50">
              In this document
              <BookOpenText size={17} />
            </summary>
            <nav aria-label={`${policy.title} sections`} className="mt-4 border-l border-[#14213D]/15 dark:border-white/15">
              {policy.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="block border-l-2 border-transparent py-2 pl-4 text-sm leading-5 text-[#14213D]/58 transition hover:border-[#B57C1B] hover:text-[#14213D] dark:text-white/50 dark:hover:border-[#00F5D4] dark:hover:text-white">
                  <span className="mr-1.5 font-semibold text-[#9B6B16] dark:text-[#D7A84A]">{section.number}.</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </details>
          <div className="hidden lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#14213D]/55 dark:text-white/50">In this document</p>
            <nav aria-label={`${policy.title} desktop sections`} className="mt-4 border-l border-[#14213D]/15 dark:border-white/15">
              {policy.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="block border-l-2 border-transparent py-2 pl-4 text-sm leading-5 text-[#14213D]/58 transition hover:border-[#B57C1B] hover:text-[#14213D] dark:text-white/50 dark:hover:border-[#00F5D4] dark:hover:text-white">
                  <span className="mr-1.5 font-semibold text-[#9B6B16] dark:text-[#D7A84A]">{section.number}.</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          <div className="rounded-2xl border border-[#B57C1B]/25 bg-[#FFF9EB] p-5 text-sm leading-7 text-[#493814] dark:border-[#D7A84A]/20 dark:bg-[#D7A84A]/10 dark:text-[#F7E8C5] sm:p-6">
            {isAgreement
              ? "This is the agreement text included in Antellay's Master Legal & Policy Document. Complete all party, date, and signature fields and obtain appropriate review before execution."
              : "This policy forms part of Antellay's Master Legal & Policy Document and should be read together with the Terms & Conditions and any applicable quotation, Statement of Work, invoice, or signed agreement."}
          </div>

          <div className="mt-11 space-y-12">
            {policy.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-8 border-b border-[#14213D]/10 pb-12 last:border-0 dark:border-white/10">
                <div className="flex items-start gap-4">
                  <span className="flex min-h-9 min-w-9 items-center justify-center rounded-lg bg-[#14213D] px-2 text-xs font-bold text-white dark:bg-[#00F5D4] dark:text-[#071126]">
                    {section.number}
                  </span>
                  <h2 className="pt-0.5 font-[family-name:var(--font-heading)] text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl">
                    {section.title}
                  </h2>
                </div>
                <div className="legal-copy mt-5 sm:ml-[52px]">
                  {section.blocks.map((block, index) => <PolicyBlock key={index} block={block} />)}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-4 rounded-3xl bg-[#14213D] p-7 text-white sm:flex sm:items-center sm:justify-between sm:p-9 dark:bg-[#10203F]">
            <div>
              <Mail className="mb-3 text-[#00F5D4]" size={24} />
              <h2 className="text-2xl font-semibold">Questions about this document?</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">Mention the policy name in your subject line so your query reaches the right team.</p>
            </div>
            <a href="mailto:info@antellay.com" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00F5D4] px-5 py-3 font-semibold text-[#071126] transition hover:bg-white sm:mt-0">
              info@antellay.com <ArrowUpRight size={18} />
            </a>
          </div>
        </article>
      </div>

      <section className="border-t border-[#14213D]/10 bg-white dark:border-white/10 dark:bg-white/[0.025]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 lg:px-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em]">Other legal documents</h2>
            <Link href="/legal" className="text-sm font-semibold text-[#9B6B16] hover:underline dark:text-[#00F5D4]">View all</Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {policies.filter((item) => item.slug !== policy.slug).slice(0, 6).map((item) => (
              <Link key={item.slug} href={`/legal/${item.slug}`} className="flex items-center justify-between gap-4 rounded-xl border border-[#14213D]/10 p-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[#B57C1B]/60 hover:shadow-sm dark:border-white/10 dark:hover:border-[#00F5D4]/50">
                {item.title}<ArrowUpRight size={16} className="shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
