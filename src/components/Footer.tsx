import { MessageSquare } from 'lucide-react';
import appStoreBadgeAsset from '@/assets/app-store-badge.svg.asset.json';
const appStoreBadge = appStoreBadgeAsset.url;
import googlePlayBadgeAsset from '@/assets/google-play-badge.png.asset.json';
const googlePlayBadge = googlePlayBadgeAsset.url;
import { RobotaxiTrackerMark } from './BrandIcons';

const FOOTER_COLUMNS = [
  {
    title: 'Tracking',
    links: [
      { label: 'US fleet', href: 'https://robotaxitracker.com/us-fleet' },
      { label: 'Robotaxi miles', href: 'https://robotaxitracker.com/miles' },
      { label: 'Cities', href: 'https://robotaxitracker.com/cities' },
      { label: 'Just spotted', href: 'https://robotaxitracker.com/just-spotted' },
      { label: 'Wait times', href: 'https://robotaxitracker.com/wait-times' },
    ],
  },
  {
    title: 'Intelligence',
    links: [
      { label: 'Camera watch', href: 'https://robotaxitracker.com/camera-watch' },
      { label: 'X sentiment', href: 'https://robotaxitracker.com/x-sentiment' },
      { label: 'Government data', href: 'https://robotaxitracker.com/government-data' },
      { label: 'Compare', href: 'https://robotaxitracker.com/compare' },
      { label: 'Pricing', href: 'https://robotaxitracker.com/pricing' },
    ],
  },
  {
    title: 'Coverage',
    links: [
      { label: 'Leaderboards', href: 'https://robotaxitracker.com/leaderboards' },
      { label: 'Cybercab', href: 'https://robotaxitracker.com/cybercab' },
      { label: 'News', href: 'https://robotaxitracker.com/news' },
      { label: 'Robotaxi Weekly', href: 'https://robotaxitracker.com/weekly' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'About', href: 'https://robotaxitracker.com/about' },
      { label: 'Methodology', href: 'https://robotaxitracker.com/methodology' },
      { label: 'Privacy', href: 'https://robotaxitracker.com/privacy' },
      { label: 'Terms', href: 'https://robotaxitracker.com/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/[0.08] text-white">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 py-10">
        {/* Stacked Compact Rows Divided by Hairline Borders */}
        <div className="divide-y divide-white/[0.08]">
          {/* Row 1: App Download */}
          <div className="pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <RobotaxiTrackerMark className="w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-[14px] font-medium text-white leading-snug">
                  Robotaxi Tracker for iPhone and Android
                </h2>
                <p className="mt-0.5 text-[12.5px] text-white/50">
                  Free. Sync your rides, get a weekly recap, and share what you spot.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <a
                href="https://robotaxitracker.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="rounded-lg transition-all duration-150 hover:opacity-85 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto block select-none"
                />
              </a>

              <a
                href="https://robotaxitracker.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                className="rounded-lg transition-all duration-150 hover:opacity-85 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto block select-none"
                />
              </a>
            </div>
          </div>

          {/* Row 2: Community Feedback */}
          <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-brand-gray border border-white/[0.08] flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-white/70" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-[14px] font-medium text-white leading-snug">
                  Help decide what we build next
                </h2>
                <p className="mt-0.5 text-[12.5px] text-white/50">
                  Report a bug, missing data, or a city you want covered.
                </p>
              </div>
            </div>

            <a
              href="mailto:ethan@robotaxitracker.com?subject=Robotaxi%20Tracker%20Feedback"
              className="h-9 px-3.5 rounded-lg bg-black border border-white/12 hover:bg-white/[0.06] hover:border-white/25 text-[12.5px] font-medium text-white inline-flex items-center justify-center whitespace-nowrap shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 self-start sm:self-auto"
            >
              Send feedback
            </a>
          </div>
        </div>

        {/* Organized 4-Column Site Directory */}
        <nav
          aria-label="Footer navigation"
          className="border-t border-white/[0.08] pt-8 pb-8 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-[12.5px] font-semibold text-white/90 tracking-tight mb-3">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12.5px] text-white/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Legal Disclaimers & Creator Attribution */}
        <div className="border-t border-white/[0.08] pt-6 space-y-3.5">
          <div className="space-y-2 text-[11.5px] leading-relaxed text-white/40 max-w-4xl">
            <p>
              This project is an independent platform and is not affiliated with, authorized by,
              endorsed by, or in any way officially connected with Tesla, Inc., Waymo LLC,
              Alphabet Inc., Zoox, Inc., Amazon.com, Inc., Avride, or any of their subsidiaries or
              affiliates.
            </p>
            <p>
              Provider names and related marks, emblems, and images are trademarks of their
              respective owners. All trademarks referenced herein are the property of their
              respective owners and are used for identification purposes only.
            </p>
          </div>

          <p className="pt-1 text-[12px] text-white/45 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              A project by <span className="text-white/75">Ethan McKanna</span>
            </span>
            <span aria-hidden="true">·</span>
            <a
              href="https://x.com/ethanmckanna"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @ethanmckanna
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="mailto:ethan@robotaxitracker.com"
              className="hover:text-white transition-colors"
            >
              ethan@robotaxitracker.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
