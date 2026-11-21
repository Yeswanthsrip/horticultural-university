import { About } from '@/components/About'
import { BrandBar } from '@/components/BrandBar'
import { ContactFooter } from '@/components/ContactFooter'
import { Gallery } from '@/components/Gallery'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Notifications } from '@/components/Notifications'
import { QuickLinks } from '@/components/QuickLinks'
import { ResearchHighlights } from '@/components/ResearchHighlights'
import { SkipLink } from '@/components/SkipLink'
import { Stats } from '@/components/Stats'
import { TopBar } from '@/components/TopBar'
import { ViceChancellor } from '@/components/ViceChancellor'

/* Homepage — section order follows the brief. All content comes from data/site.ts. */
export default function HomePage() {
  return (
    <>
      <div id="top" />
      <SkipLink />
      <TopBar />
      <BrandBar />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />

        {/* Notifications + quick links overlap the bottom of the hero */}
        <section aria-labelledby="notifications-heading" className="relative z-10 -mt-24 lg:-mt-32">
          <div className="container-page grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 xl:col-span-8">
              <Notifications />
            </div>
            <div className="lg:col-span-5 xl:col-span-4">
              <QuickLinks />
            </div>
          </div>
        </section>

        <About />
        <ViceChancellor />
        <Stats />
        <ResearchHighlights />
        <Gallery />
      </main>

      <ContactFooter />
    </>
  )
}
