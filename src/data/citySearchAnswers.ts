// Answers to the exact searches each city page already gets impressions for in Search Console
// (3 months to 2026-10-28) but did not answer directly. Pages ranked 9-20 for these phrases with
// almost no clicks. Rendered on /cities/[citySlug] as "Questions <city> homeowners search".
// Keep every answer specific to the city and to facts the site can stand behind.

export type CitySearchAnswer = {
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

export type CitySearchAnswerSet = {
  title: string;
  intro: string;
  items: CitySearchAnswer[];
};

export const citySearchAnswers: Record<string, CitySearchAnswerSet> = {
  richardson: {
    title: "Questions Richardson homeowners search before they call",
    intro:
      "These are the plumbing questions people in Richardson type into Google most often, answered the way a plumber would answer them on the phone.",
    items: [
      {
        question: "My toilet won't stop overflowing in Richardson. Is that an emergency plumbing call?",
        answer:
          "First turn the oval valve on the wall behind the toilet clockwise until it stops. If the bowl stops rising, it's a single clog and it can usually wait for daytime. It becomes an emergency when water keeps coming after the valve is shut, when the tub or shower fills at the same time, or when the water is sewage rather than clean tank water. Those point to the main drain line, not the toilet.",
        link: { label: "Toilet overflow help in Richardson", href: "/cities/richardson/toilet-overflow-emergency" }
      },
      {
        question: "Can I get a 24 hour plumber in Richardson, TX at night or on a weekend?",
        answer:
          "Yes. Calls from Richardson are routed to available providers at any hour, including nights, weekends and holidays. What changes after hours is the price and the wait, so ask for the after-hours dispatch fee and a realistic arrival window before you agree to a visit. Have your address, the fixture involved and whether you've shut the water off ready when you call.",
        link: { label: "24 hour plumber in Richardson", href: "/cities/richardson/24-hour-emergency-plumber" }
      },
      {
        question: "Clogged drain in Richardson: when is it more than a plunger job?",
        answer:
          "One slow sink is usually a local clog a plunger or hand snake can clear. Call for drain cleaning when two or more fixtures back up together, when you hear gurgling from another drain as one empties, or when the washing machine pushes water up into a tub. That pattern means the blockage is further down the shared line where household tools don't reach.",
        link: { label: "Emergency drain cleaning in Richardson", href: "/cities/richardson/emergency-drain-cleaning" }
      },
      {
        question: "Shower drain clog in Richardson: hair clog or something deeper?",
        answer:
          "Most shower clogs are hair and soap scum sitting just under the strainer, and pulling the cover with a plastic drain tool clears them in minutes. If the shower fills when a nearby toilet flushes, or the water smells like sewage, the problem is past the trap in the line those fixtures share, and plunging harder won't fix it.",
        link: { label: "Sink and shower backup help in Richardson", href: "/cities/richardson/sink-and-shower-drain-backup" }
      }
    ]
  },

  plano: {
    title: "Questions Plano homeowners search before they call",
    intro:
      "Plano searches lean toward broken pipes and sewer lines, which fits a city whose median home was built in 1993, right inside the 1978-1995 polybutylene pipe era (U.S. Census ACS 2019-2023).",
    items: [
      {
        question: "A pipe broke in my Plano home. What do I do first?",
        answer:
          "Shut off the main water valve before anything else. In many Plano homes it's in the garage, a utility closet, or the meter box near the curb. Then open the lowest faucet in the house to drain the lines, switch off the water heater if it's on the same side as the leak, and photograph the damage before you move anything. Homes built between 1978 and 1995 may have gray polybutylene supply pipe, which tends to fail at fittings, so mention the age of the house when you call.",
        link: { label: "Burst pipe help in Plano", href: "/cities/plano/burst-pipe-emergency" }
      },
      {
        question: "How do I know if it's a broken sewer line in Plano?",
        answer:
          "Signs of a broken or collapsed sewer line are several drains backing up at once, sewage at the lowest drain or the outdoor cleanout, a sewer smell in the yard, or a patch of lawn that stays soggy when it hasn't rained. North Texas clay soil shrinks and swells with the weather and can shift older sewer pipe, and tree roots find any crack. A camera inspection confirms where the break is before anyone digs.",
        link: { label: "Main sewer line help in Plano", href: "/cities/plano/main-sewer-line-clog" }
      },
      {
        question: "Is there an on-call plumber in Plano for a water emergency at night?",
        answer:
          "Yes, calls are routed around the clock. One check first: if water is pouring from the street, the curb or the meter box, that's usually a city water main or service line, and the City of Plano's utility department handles it, not a private plumber. Anything on your side of the meter, from a burst pipe to a failed water heater, is a plumber's job.",
        link: { label: "24 hour plumbing in Plano", href: "/cities/plano/24-hour-emergency-plumber" }
      },
      {
        question: "How much more does 24 hour plumbing in Plano cost?",
        answer:
          "After-hours work costs more almost everywhere in DFW. Our emergency cost guide found after-hours rates commonly running 1.5 to 3 times the daytime rate, plus a call-out fee. Ask for the dispatch fee and the hourly or flat rate before the plumber drives out, and ask whether a temporary fix tonight and the full repair tomorrow would cost less.",
        link: { label: "DFW emergency plumber cost guide", href: "/guides/dfw-emergency-plumbing-costs" }
      }
    ]
  },

  "fort-worth": {
    title: "Questions Fort Worth homeowners search before they call",
    intro:
      "Fort Worth searches are mostly about drains and 24-hour help. The city's median home was built in 1994 (U.S. Census ACS 2019-2023), so a large share of houses have pipes that are 30 years old or more.",
    items: [
      {
        question: "Emergency drain cleaning in Fort Worth: when can't it wait until morning?",
        answer:
          "Call tonight if sewage is coming up into a tub, shower or floor drain, if the only toilet in the house is backed up, or if the washing machine is flooding the floor every time it drains. If you can simply stop using that one sink until morning without water reaching the floor, a daytime visit will cost less and do the same job.",
        link: { label: "Emergency drain cleaning in Fort Worth", href: "/cities/fort-worth/emergency-drain-cleaning" }
      },
      {
        question: "Is 24 hour drain cleaning in Fort Worth worth the after-hours price?",
        answer:
          "It's worth it when waiting means damage: wastewater on the floor, a backup that keeps rising, or a household that can't use any toilet. It usually isn't worth it for a single slow drain. A quick test is to stop all water use for ten minutes. If the level drops and stays down, the problem can likely wait for regular hours.",
        link: { label: "Sewer backup help in Fort Worth", href: "/cities/fort-worth/sewer-backup-help" }
      },
      {
        question: "What should I tell a 24 hour plumber in Fort Worth when I call?",
        answer:
          "Give the address and nearest cross street, which fixtures are affected, when it started, whether water is still running, and whether you've found and closed the main shutoff. Mention if the house is on a slab, which most Fort Worth homes are, and whether you've seen warm spots on the floor or heard water running with everything off, since those point to a slab leak rather than a drain.",
        link: { label: "24 hour plumber in Fort Worth", href: "/cities/fort-worth/24-hour-emergency-plumber" }
      },
      {
        question: "Why do older Fort Worth homes get more burst pipes and slab leaks?",
        answer:
          "Two reasons. Homes built around the city's 1994 median fall inside the polybutylene era, and that gray plastic supply pipe is known to fail at its fittings. And Fort Worth sits on expansive clay that swells when wet and shrinks in drought, which stresses pipes running under the slab. A repipe isn't always needed, but knowing what's in your walls helps you decide.",
        link: { label: "Burst pipe help in Fort Worth", href: "/cities/fort-worth/burst-pipe-emergency" }
      }
    ]
  },

  denton: {
    title: "Questions Denton homeowners and renters search before they call",
    intro:
      "Denton has two universities (UNT and Texas Woman's University) and a lot of rental housing, so the questions here cover renters as well as owners.",
    items: [
      {
        question: "Drain cleaning in Denton, TX: which clogs need a plumber tonight?",
        answer:
          "A clog needs urgent help when wastewater is reaching the floor, when every toilet in the home is affected, or when water rises in one fixture while another drains. A single slow bathroom sink can wait. Stop using water in the affected area, and don't pour chemical drain cleaner into standing water, since it can splash and makes the plumber's job more dangerous.",
        link: { label: "Emergency drain cleaning in Denton", href: "/cities/denton/emergency-drain-cleaning" }
      },
      {
        question: "I rent in Denton and my drain is clogged. Who do I call?",
        answer:
          "Call your landlord or property manager first. Repairs in a rental are usually theirs to arrange, and many leases say so. If you can't reach anyone and water or sewage is spreading, shut off the water at the fixture or the main, take photos, and then call for emergency help, keeping a record of when you tried to reach the landlord.",
        link: { label: "Sink and shower backup help in Denton", href: "/cities/denton/sink-and-shower-drain-backup" }
      },
      {
        question: "Is there a 24 hour plumber in Denton, TX?",
        answer:
          "Yes. Requests from Denton and the surrounding Denton County area are routed at any hour. Coverage is thinner in the rural edges of the county than in town, so give your exact address up front and ask for an honest arrival time before you commit.",
        link: { label: "24 hour plumber in Denton", href: "/cities/denton/24-hour-emergency-plumber" }
      },
      {
        question: "What should I do while I wait for an after-hours plumber in Denton?",
        answer:
          "Close the shutoff for the fixture or the whole house, move anything valuable off the floor, put towels down to keep water away from carpet and walls, and switch off any outlets or appliances near the water at the breaker if you can do it safely. Take photos as you go; they help with both the plumber and any insurance claim.",
        link: { label: "Same-day plumber connection in Denton", href: "/cities/denton/same-day-plumber-connection" }
      }
    ]
  },

  mckinney: {
    title: "Questions McKinney homeowners search before they call",
    intro:
      "McKinney is one of DFW's newest big cities, with a median home built in 2007 (U.S. Census ACS 2019-2023), alongside a historic downtown with much older houses. That mix shapes the answers below.",
    items: [
      {
        question: "Which plumbers in McKinney, TX answer emergency calls after midnight?",
        answer:
          "Calls through this page go to providers covering McKinney who take after-hours work, so you aren't left dialing companies that don't pick up at 2 a.m. Before you agree to a visit, ask for the after-hours fee, how long until someone arrives, and whether they can stop the problem tonight even if the full repair waits until morning.",
        link: { label: "24 hour plumber in McKinney", href: "/cities/mckinney/24-hour-emergency-plumber" }
      },
      {
        question: "Can I get same-day plumbing service in McKinney?",
        answer:
          "For urgent problems, usually yes: a leak you can't stop, a sewer backup, no hot water with a leaking tank, or no working toilet. Calling early in the day gives you the best chance of a same-day slot. For smaller jobs, like a dripping faucet or a slow sink, a next-day appointment is often cheaper than paying for urgency.",
        link: { label: "Same-day plumber connection in McKinney", href: "/cities/mckinney/same-day-plumber-connection" }
      },
      {
        question: "Does a McKinney sewer clog need hydro jetting?",
        answer:
          "Not always. A snake clears most single blockages. Hydro jetting, which scours the pipe walls with high-pressure water, makes sense for grease buildup, recurring clogs or root intrusion. Most McKinney homes are new enough to have PVC sewer lines that handle jetting well. In an older downtown home, ask for a camera inspection first, because jetting a cracked older pipe can make the damage worse.",
        link: { label: "Hydro jetting vs drain snaking in DFW", href: "/blog/hydro-jetting-vs-drain-snaking-dfw" }
      },
      {
        question: "What affects the price of a 24 hour plumber in McKinney?",
        answer:
          "The time of the call, the trip fee, how hard the problem is to reach, and parts. A clog cleared from an accessible cleanout costs far less than one that needs a toilet pulled or a camera run. Ask whether the fee you're quoted includes the diagnosis, and get the repair price in writing before work starts.",
        link: { label: "Main sewer line help in McKinney", href: "/cities/mckinney/main-sewer-line-clog" }
      }
    ]
  },

  carrollton: {
    title: "Questions Carrollton homeowners search before they call",
    intro:
      "Carrollton straddles Dallas, Denton and Collin counties. The questions people there search most are about when a problem is really an emergency and how drains get cleared.",
    items: [
      {
        question: "When should you call an emergency plumber in Carrollton?",
        answer:
          "Call right away for water you can't shut off, a burst or leaking supply pipe, sewage coming up through a drain, a leaking water heater, or a home with no working toilet. Gas smells are different: leave the house and call your gas company or 911 from outside. A slow drain or a running toilet is not an emergency and costs less to fix in regular hours.",
        link: { label: "Same-day plumber connection in Carrollton", href: "/cities/carrollton/same-day-plumber-connection" }
      },
      {
        question: "Drain cleaning in Carrollton, TX: snake, hydro jet or camera?",
        answer:
          "A cable snake is the standard first step and clears most clogs. A camera inspection is worth it when the same drain keeps clogging, when more than one fixture backs up, or before anyone recommends digging. Hydro jetting is for grease and roots that a snake only punches through. A good provider will tell you which one they plan to use, and why, before they start.",
        link: { label: "Emergency drain cleaning in Carrollton", href: "/cities/carrollton/emergency-drain-cleaning" }
      },
      {
        question: "Clogged drain in Carrollton: one fixture or the main line?",
        answer:
          "Run water in a different part of the house. If only one sink or tub is slow, the clog is in that fixture's branch. If the lowest drains, usually a tub or a floor drain, fill up when you use something else, or the outdoor cleanout is overflowing, the main line is blocked and every drain in the house will be affected until it's cleared.",
        link: { label: "Main sewer line help in Carrollton", href: "/cities/carrollton/main-sewer-line-clog" }
      },
      {
        question: "Can a 24 hour plumber issue in Carrollton wait until business hours?",
        answer:
          "It can wait if you can stop the water, nothing is spreading and you still have a working toilet. It can't wait if water or sewage keeps coming, the leak is near electrical outlets or the panel, or a burst pipe is soaking a ceiling. When in doubt, shut the main off. That buys you time to decide.",
        link: { label: "24 hour plumber in Carrollton", href: "/cities/carrollton/24-hour-emergency-plumber" }
      },
      // Task245 (2026-11-14): Semrush "slab leak repair carrollton" 590/mo, KD 4.
      {
        question: "Slab leak repair in Carrollton: what are the signs, and what does it cost?",
        answer:
          "Watch for a warm patch on a tile or concrete floor, the sound of running water when every tap is off, a water meter that keeps turning, or a bill that jumps for no reason. A lot of Carrollton was built in the 1970s and early 80s on slab foundations, so many supply lines under those floors are now 40+ years old. Expect to pay about $150-$400 for leak detection first; the repair itself usually runs $630-$4,400 (HomeAdvisor 2026 data) depending on whether the pipe is rerouted or relined.",
        link: { label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" }
      }
    ]
  },

  // Task245 (2026-11-14): Dallas had no "Common searches" block. Questions below map to
  // low-difficulty Semrush keywords: emergency plumber/plumbing dallas tx (KD 14-18),
  // water heater repair in dallas tx + tankless water heater repair dallas tx (KD 10-14),
  // slab leak detection dallas (KD 11), sewer line repair dallas tx + no dig sewer line
  // repair dallas (KD 7-8), drain cleaning dallas tx (KD 7-19). Every price below is the
  // same sourced figure already used on the site's calculators and cost guide.
  dallas: {
    title: "What Dallas homeowners search before they call a plumber",
    intro:
      "Dallas sits on Blackland Prairie clay that swells when it's wet and shrinks when it's dry, and most homes here are built slab-on-grade. Older neighborhoods like Lakewood, the M Streets and Oak Cliff still have original cast iron or galvanized lines. Those two facts explain most of the questions below.",
    items: [
      {
        question: "Is there an emergency plumber in Dallas, TX who answers at night?",
        answer:
          "Yes. Calls from this page go to providers covering Dallas who take after-hours and weekend work, so you aren't dialing down a list of offices that went home at 5. Before you agree to a visit, ask three things: the after-hours fee, how soon someone can get there, and whether they can stop the water tonight even if the full repair waits until morning.",
        link: { label: "24 hour emergency plumber in Dallas", href: "/cities/dallas/24-hour-emergency-plumber" }
      },
      {
        question: "Water heater repair in Dallas, TX: fix it or replace it?",
        answer:
          "Fix it if the tank itself is dry. A thermostat runs about $150-$200 installed, a heating element $200-$300, and a gas control valve around $350 (Angi 2026 data). Replace it if water is coming from the tank body, because a corroded tank can't be patched. Tankless water heater repair in Dallas is usually a descaling, igniter or sensor fix; Dallas water tests hard to very hard (7-11 grains per gallon), so scale is the most common cause of a tankless unit that cuts out mid-shower.",
        link: { label: "Emergency water heater repair in Dallas", href: "/cities/dallas/water-heater-emergency" }
      },
      {
        question: "How does slab leak detection work in Dallas, and what does it cost?",
        answer:
          "A technician listens through the slab with acoustic gear, uses thermal imaging to find the warm line, or pushes tracer gas through the pipe, so nobody breaks concrete on a guess. Detection typically costs $150-$400. Dallas clay soil shifts the slab every wet-dry cycle, which is why slab leaks are so common here. Once the leak is found, most repairs fall between $630 and $4,400 (HomeAdvisor 2026 data).",
        link: { label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" }
      },
      {
        question: "Sewer line repair in Dallas, TX: is no-dig (trenchless) repair an option?",
        answer:
          "Often, yes. Trenchless lining (CIPP) runs about $135-$150 per foot and pipe bursting about $150-$190 per foot, against $50-$250 per foot for digging a trench across the yard (Angi 2026 data). Lining won't work if the pipe has fully collapsed or sags, so a camera inspection ($175-$350) comes first. Old cast iron in Lakewood or Oak Cliff homes is a common candidate for lining.",
        link: { label: "Sewer line repair help in Dallas", href: "/cities/dallas/main-sewer-line-clog" }
      },
      {
        question: "How much does drain cleaning cost in Dallas, TX?",
        answer:
          "A simple single-fixture clog cleared with a snake usually costs $100-$300. Clearing the main sewer line runs about $200-$500, and hydro jetting $350-$1,500 or more. Nights, weekends and holidays can push any of those 1.5 to 3 times higher. If every drain in the house is slow, ask for a main-line price up front so the quote doesn't jump once they start.",
        link: { label: "Emergency drain cleaning in Dallas", href: "/cities/dallas/emergency-drain-cleaning" }
      }
    ]
  },

  // Keyword overhaul 03 (2026-11-15), PH-004 scope: the questions below are the real queries each hub got in
  // Search Console (3 months to 2026-11-11). Local facts are the ones already established on the site
  // (Census median build year from /guides/dfw-housing-age-by-city, and each city's existing enhancement entries).
  arlington: {
    title: "Questions Arlington homeowners search before they call",
    intro:
      "Arlington's median home was built in 1986 (U.S. Census ACS 2019-2023), and much of the city went up during the 1970s-90s slab-construction boom. Aging copper lines and older sewer laterals are behind most of these searches.",
    items: [
      {
        question: "Which emergency plumbers in Arlington, TX can come out today for a sewer backup?",
        answer:
          "Providers covering Arlington treat a sewer backup as a same-day call, because it can't wait: sewage rising in a tub or floor drain, or every toilet gurgling at once. Stop all water use until someone arrives. If the cleanout cap in the yard is overflowing, the blockage is in the main line, and that's the first thing to tell the dispatcher.",
        link: { label: "Sewer backup help in Arlington", href: "/cities/arlington/sewer-backup-help" }
      },
      {
        question: "Are there 24 hour plumbers in Arlington for nights and weekends?",
        answer:
          "Yes. Calls from Arlington are routed to available providers around the clock, Sunday nights and holidays included. The dispatch fee is higher after hours, so ask for it before anyone drives out. If the leak is stopped at the shutoff and nothing is spreading, a morning appointment usually costs less for the same repair.",
        link: { label: "24 hour plumber in Arlington", href: "/cities/arlington/24-hour-emergency-plumber" }
      },
      {
        question: "Why do older Arlington homes get pinhole leaks?",
        answer:
          "Original copper supply lines from the 1970s-90s building boom are now 40 to 50 years old, the age when pinhole leaks start: a hiss inside a wall, a damp patch on drywall, or a water bill that creeps up. Homes built between 1978 and 1995 may also have gray polybutylene pipe, which tends to fail at its fittings.",
        link: { label: "Burst pipe repair in Arlington", href: "/cities/arlington/burst-pipe-emergency" }
      },
      {
        question: "Clogged drains in Arlington, TX: one sink or the main drain?",
        answer:
          "If only one sink is slow, the clog is in that fixture's branch and a plunger or hand snake may clear it. If the tub fills when the washer drains, toilets gurgle when a sink runs, or the lowest drain in the house backs up, the main drain is blocked and household tools won't reach it.",
        link: { label: "Emergency drain cleaning in Arlington", href: "/cities/arlington/emergency-drain-cleaning" }
      },
      {
        question: "Emergency toilet replacement in Arlington: does the toilet really need replacing?",
        answer:
          "Most overflowing toilets need a clog cleared, not a new toilet. Replacement makes sense when the bowl or tank is cracked and leaking onto the floor, or the base keeps leaking after a new wax ring. Until it's fixed, turn the valve behind the toilet clockwise and use another bathroom if you have one.",
        link: { label: "Toilet overflow help in Arlington", href: "/cities/arlington/toilet-overflow-emergency" }
      }
    ]
  },

  garland: {
    title: "Questions Garland homeowners search before they call",
    intro:
      "Garland's housing is mostly 1960s-80s construction in northeast Dallas County, with newer homes near Lake Ray Hubbard. Older copper and galvanized supply lines, and clay or cast iron sewer laterals under mature trees, drive what people here search for.",
    items: [
      {
        question: "Broken sewer line in Garland: what are the signs?",
        answer:
          "Watch for toilets that gurgle when the washer drains, a tub that fills with dirty water, wet ground or a sunken spot over the sewer line, and drains that clog again a few weeks after being cleared. In older central Garland, tree roots working into clay and cast iron joints are a common cause. A camera inspection tells you whether the pipe is cracked or only blocked before anyone digs.",
        link: { label: "Sewer line repair help in Garland", href: "/cities/garland/main-sewer-line-clog" }
      },
      {
        question: "Garland sewer cleanout: where is it, and what does it tell me?",
        answer:
          "Look outside near the foundation, usually on the side facing the street or near a bathroom wall, for a 3 or 4 inch capped pipe a few inches above the ground. If sewage is coming out of it, the main line is blocked: stop running water inside and don't take the cap off. It's also the easiest way in for the plumber clearing the line.",
        link: { label: "Sewer backup help in Garland", href: "/cities/garland/sewer-backup-help" }
      },
      {
        question: "Pipe break in Garland, TX: what do I do first?",
        answer:
          "Shut off the main water valve, then open a low faucet to drain the pressure and switch off power to any outlets the water is reaching. Many Garland homes still have their original 1960s-80s copper or galvanized supply lines, so tell the plumber the age of the house. It decides whether a patch will hold or the run needs replacing.",
        link: { label: "Burst pipe repair in Garland", href: "/cities/garland/burst-pipe-emergency" }
      },
      {
        question: "Drain cleaning in Garland, TX: can I get same-day service?",
        answer:
          "For a backup that's spreading or a home with no working toilet, usually yes. Call early and say how many drains are affected, since one slow sink and a main-line backup need different equipment. If the same drain clogs every few months, ask for a camera inspection instead of another snaking.",
        link: { label: "Emergency drain cleaning in Garland", href: "/cities/garland/emergency-drain-cleaning" }
      }
    ]
  },

  frisco: {
    title: "Questions Frisco homeowners search before they call",
    intro:
      "Frisco's median home was built in 2009 (U.S. Census ACS 2019-2023). Most houses here have PEX plumbing and newer water heaters, so the emergencies people search for look different from older DFW cities.",
    items: [
      {
        question: "Emergency plumber in Frisco, TX: what goes wrong in newer homes?",
        answer:
          "In homes built since the 2000s the usual calls are a failed PEX fitting or manifold connection, a burst supply line under a sink or behind the washer, and tankless water heaters that stop heating. The copper pinhole leaks common in older cities are rare here. New homes also settle in their first few years, which can stress fittings and drain joints.",
        link: { label: "24 hour plumber in Frisco", href: "/cities/frisco/24-hour-emergency-plumber" }
      },
      {
        question: "Emergency drain cleaning in Frisco: what should I expect?",
        answer:
          "Most visits start with a cable snake through the nearest cleanout. In a newer Frisco home, a main-line backup in the first few years can come from a settling or sagging joint rather than tree roots, so a camera inspection is worth asking for. Have the age of the house and the list of affected drains ready when you call.",
        link: { label: "What to expect from emergency drain cleaning in Frisco", href: "/blog/emergency-drain-cleaning-in-frisco-what-to-expect" }
      },
      {
        question: "Pipe break repair in Frisco, TX: is a PEX leak easy to fix?",
        answer:
          "Usually easier than copper. A plumber can cut out the damaged section and fit a new coupling, often without opening much drywall when the leak is near an access point. The bigger cost is usually the water damage, so shut the main off fast and photograph everything before cleanup for your insurer.",
        link: { label: "Burst pipe repair in Frisco", href: "/cities/frisco/burst-pipe-emergency" }
      },
      {
        question: "My tankless water heater stopped working in Frisco. Is that an emergency?",
        answer:
          "No hot water on its own usually isn't, unless it's freezing out or someone at home needs it for medical reasons. Check the breaker and the gas, then look for an error code on the unit. Water leaking from the unit is more urgent: close its water valves and call. Hard DFW water also means tankless units need regular descaling.",
        link: { label: "Water heater repair in Frisco", href: "/cities/frisco/water-heater-emergency" }
      }
    ]
  },

  irving: {
    title: "Questions Irving residents search before they call",
    intro:
      "Irving mixes older homes near the original Las Colinas development, many with aging copper lines, with newer apartments and townhomes near DFW Airport that share lines between units. Who to call first depends on which one you live in.",
    items: [
      {
        question: "Which plumbers in Irving, TX respond to no-water emergencies the same day?",
        answer:
          "Calls from Irving go to providers who take same-day work. First check whether the outage is only yours: if the neighbors have no water either, it's likely a city main break, which the City of Irving handles. If only your home is dry, make sure the main valve and the valve at the meter are fully open before you call.",
        link: { label: "Same-day plumber in Irving", href: "/cities/irving/same-day-plumber-connection" }
      },
      {
        question: "My water heater burst and is leaking all over the garage in Irving. What now?",
        answer:
          "Close the cold water valve on top of the heater, then turn off the gas valve or the breaker. Open a hot water faucet in the house to relieve pressure, and keep the water away from anything electrical. A tank leaking from its body can't be repaired, so ask for a replacement price and whether they haul the old tank away.",
        link: { label: "Emergency water heater repair in Irving", href: "/cities/irving/water-heater-emergency" }
      },
      {
        question: "Sewage is coming up through my drains in Irving. Who handles it as an emergency?",
        answer:
          "Treat it as an emergency: stop all water use and keep people away from it. In a house the blockage is usually in your main line, and a plumber clears it. In an apartment or townhome, tell the manager or HOA right away, because a shared line can back up into more than one unit and they may have a plumber under contract.",
        link: { label: "Sewer backup help in Irving", href: "/cities/irving/sewer-backup-help" }
      },
      {
        question: "How do I pick the best emergency plumber in Irving at night?",
        answer:
          "Ask three things before anyone drives out: the after-hours dispatch fee, whether the plumber is licensed by the Texas State Board of Plumbing Examiners, and how soon they can arrive. You can check a Texas plumbing license yourself in about a minute. A company that won't state its dispatch fee on the phone is a red flag.",
        link: { label: "How to verify a Texas plumber's license", href: "/blog/how-to-verify-a-texas-plumbers-license" }
      }
    ]
  },

  lewisville: {
    title: "Questions Lewisville homeowners search before they call",
    intro:
      "Lewisville homes range from the 1970s to today. Many built from the late 1970s to the mid-1990s have polybutylene supply pipe, while newer areas like Castle Hills have PEX, and that difference matters when a pipe breaks.",
    items: [
      {
        question: "Burst pipe repair in Lewisville, TX: how do I know if I have polybutylene?",
        answer:
          "Look where the pipe comes out of the wall at the water heater or under a sink. Polybutylene is flexible gray plastic, often stamped PB2110. It was common in homes built from the late 1970s to the mid-1990s, including older neighborhoods like Valley Ridge and Vista Ridge, and it tends to fail at fittings. Tell the plumber, because a patch may not last.",
        link: { label: "Burst pipe repair in Lewisville", href: "/cities/lewisville/burst-pipe-emergency" }
      },
      {
        question: "Is there a 24 hour plumber in Lewisville, TX?",
        answer:
          "Yes. Calls from Lewisville, Castle Hills and nearby Denton County are routed at any hour. Give your full address and nearest cross street up front, and ask for an arrival window and the after-hours fee before you commit. If you've already stopped the water, say so; it can change whether the visit needs to happen tonight.",
        link: { label: "24 hour plumber in Lewisville", href: "/cities/lewisville/24-hour-emergency-plumber" }
      },
      {
        question: "Why do drains keep clogging in older Lewisville neighborhoods?",
        answer:
          "Root intrusion, in most neighborhoods with mature trees: roots find the joints in older sewer lines and catch everything that goes down the drain. Snaking clears it for a while, then it comes back. A camera inspection shows whether the line needs lining or a section replaced, and the calculator below gives a rough price first.",
        link: { label: "Sewer line repair cost calculator", href: "/tools/sewer-line-repair-cost-calculator" }
      },
      {
        question: "Emergency plumbing in Lewisville: does a slab leak count?",
        answer:
          "It can. Denton County's expansive clay soil moves slab foundations, and a leak under the slab shows up as a warm spot on the floor, new cracks, or running water you can hear with every tap off. If the water meter keeps moving with everything off, call that day: a slab leak runs around the clock until it's found.",
        link: { label: "Slab leak repair cost calculator", href: "/tools/slab-leak-repair-cost-calculator" }
      }
    ]
  },

  "the-colony": {
    title: "Questions The Colony homeowners search before they call",
    intro:
      "The Colony sits on the southern shore of Lewisville Lake, with older lakeside neighborhoods and newer subdivisions on its edges. Plumbing in those two parts of town ages differently.",
    items: [
      {
        question: "Is there an emergency plumber in The Colony, TX after hours?",
        answer:
          "Yes, requests from The Colony are routed at night and on weekends. When you call, say whether you're on one of the older lakeside streets or in a newer subdivision. Older homes are more likely to have aging supply lines and cast iron drains, newer ones PEX and plastic, and the plumber will bring different parts.",
        link: { label: "24 hour plumber in The Colony", href: "/cities/the-colony/24-hour-emergency-plumber" }
      },
      {
        question: "A pipe broke in The Colony. What should I do while I wait?",
        answer:
          "Close the main water valve, open the lowest faucet to drain the lines, and turn off the water heater. Move rugs and electronics out of the water, and photograph the damage before cleanup. Most Texas homeowners policies cover sudden pipe bursts but not slow leaks or flooding from outside, so note when you first saw the water.",
        link: { label: "Burst pipe repair in The Colony", href: "/cities/the-colony/burst-pipe-emergency" }
      },
      {
        question: "Do lakeside homes in The Colony have different plumbing problems?",
        answer:
          "Often, yes. Lakeside streets tend to be older, so supply lines and drains are closer to the end of their life, and mature trees mean more roots in sewer lines. Newer subdivisions see fewer of those and more fitting or fixture failures. North Texas clay soil moves slabs everywhere in town, so slab leaks turn up in both.",
        link: { label: "Sewer line help in The Colony", href: "/cities/the-colony/main-sewer-line-clog" }
      }
    ]
  }
};
