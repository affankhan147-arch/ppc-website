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
      }
    ]
  }
};
