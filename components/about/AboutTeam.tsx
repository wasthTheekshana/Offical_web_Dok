import { createClient } from '@/lib/supabase/server';
import TeamCard from './TeamCard';

export default async function AboutTeam() {
  const supabase = await createClient();
  const { data: team } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order');

  return (
    <section className="bg-white py-28 lg:py-40">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-brand-navy/30" />
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-navy/40">The People Behind DOK</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <h2 className="font-serif text-5xl lg:text-6xl text-brand-navy leading-tight">
            Our Leadership<br />
            <span className="text-brand-navy/25">Team</span>
          </h2>
          <p className="max-w-xs text-brand-navy/50 font-light text-sm leading-relaxed">
            Seasoned professionals who turned a bold vision into Sri Lanka's most trusted document management enterprise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {(team ?? []).map((m, i) => <TeamCard key={m.id} member={m} i={i} />)}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-4">
          <div className="relative rounded-[2rem] overflow-hidden h-72">
            <img src="/images/team-group.jpg" alt="DOK Solutions management team" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white font-serif text-lg">Management Team</span>
              <p className="text-white/60 text-xs mt-1">The team driving day-to-day excellence</p>
            </div>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden h-72">
            <img src="/images/team-all.jpg" alt="DOK Solutions full team" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
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
