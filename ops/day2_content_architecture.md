# Day 2 Content Architecture

## Market And Positioning

Brand: Plumbing Hands

Primary market: Dallas-Fort Worth, Texas

Primary niche: emergency plumbing and emergency drain cleaning lead generation.

Positioning: emergency plumbing help across Dallas-Fort Worth.

Disclosure: Plumbing Hands connects visitors with plumbing service providers or partners where available. It does not claim to be a licensed plumbing contractor unless verified proof is supplied.

## A. Main Service Pages

Main service pages are the primary money pages. Each page uses one service record from `src/data/services.ts` and includes:
- unique metadata
- one H1
- direct answer
- emergency steps
- call-prep checklist
- when-to-call symptoms
- common causes
- mistakes to avoid
- cost discussion
- FAQs
- Service, WebPage, Breadcrumb, and FAQ schema
- links to controlled city-service pages, problem pages, and cost guides

## B. City Pages

City pages are service-area pages for 30 Dallas-Fort Worth cities and suburbs. They do not claim offices, fake addresses, fake GBP listings, local licenses, or guaranteed arrival.

Each city page includes:
- unique H1 and metadata
- direct answer
- local emergency relevance
- main service links
- controlled city-service links when applicable
- nearby city links
- FAQs and schema

## C. City Plus Service Pages

City plus service pages use a controlled set of 16 priority combinations:
- Dallas emergency plumber
- Dallas emergency drain cleaning
- Fort Worth emergency plumber
- Fort Worth emergency drain cleaning
- Arlington emergency plumber
- Arlington emergency drain cleaning
- Plano emergency plumber
- Plano emergency drain cleaning
- Irving emergency plumber
- Irving emergency drain cleaning
- Garland emergency plumber
- Garland emergency drain cleaning
- Frisco emergency plumber
- Frisco emergency drain cleaning
- McKinney emergency plumber
- McKinney emergency drain cleaning

The route is restricted to these combinations so the site does not create unlimited doorway pages.

## D. Problem Pages

Problem pages answer homeowner symptom questions. Each page includes:
- what it means
- immediate safe steps
- what not to do
- when urgent
- recommended service page
- related cost guide where relevant
- FAQs and internal links

## E. Cost Guide Pages

Cost guide pages discuss cost factors without guaranteeing exact pricing. Each guide includes:
- direct answer
- general range guidance
- factors that affect price
- questions to ask the provider
- related service and problem links
- FAQs and CTA

## F. FAQ Pages

The FAQ hub combines emergency questions, platform disclosure questions, pricing safety questions, and indexing-timing guidance for owner workflows.

## G. Blog And Help Articles

Blog/help articles remain available as supporting content. Day 2 did not start external outreach, copied competitor content, or citation work.

## H. Internal Linking Hubs

Internal links connect:
- homepage to services, priority cities, cost guides, and problems
- service pages to priority city-service pages, problem pages, and cost guides
- city pages to main services, nearby cities, and controlled city-service pages
- problem pages to service and cost pages
- cost guides to service pages, problem pages, and contact

Exact-match anchors are varied and used sparingly.
