import { cachedQuery } from '@/lib/db';
import { getSiteImages } from '@/lib/site-images';
import TeamCarousel from './TeamCarousel';
import { type TeamMember } from './TeamCard';

export default async function AboutTeam({ imgs }: { imgs?: Record<string, string> } = {}) {
  const [team, resolvedImgs] = await Promise.all([
    cachedQuery<TeamMember>('SELECT * FROM team_members ORDER BY display_order, created_at', [], ['team_members']),
    imgs ? Promise.resolve(imgs) : getSiteImages(),
  ]);

  return (
    <section className="bg-[#080C1A] py-28 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-white/20" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/30">The People Behind DOK</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2 className="font-serif text-5xl lg:text-6xl text-white leading-tight">
            Our Leadership<br />
            <span className="text-white/20">Team</span>
          </h2>
          <p className="max-w-xs text-white/40 font-light text-sm leading-relaxed">
            Seasoned professionals who turned a bold vision into Sri Lanka's most trusted document management enterprise.
          </p>
        </div>

        <TeamCarousel members={team ?? []} />

        <div className="mt-16 grid md:grid-cols-2 gap-4">
          <div className="relative rounded-[2rem] overflow-hidden h-72">
            <img src={resolvedImgs['team-group'] || '/images/team-group.jpg'} alt="DOK Solutions management team" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white font-serif text-lg">Management Team</span>
              <p className="text-white/60 text-xs mt-1">The team driving day-to-day excellence</p>
            </div>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden h-72">
            <img src={resolvedImgs['team-all'] || '/images/team-all.jpg'} alt="DOK Solutions full team" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white font-serif text-lg">200+ Professionals</span>
              <p className="text-white/60 text-xs mt-1">Our full team — Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
