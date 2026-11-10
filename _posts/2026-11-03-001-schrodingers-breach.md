---
number: 1
title: "Schrödinger's Breach"
date: 2026-11-03 09:00:00
form: essay
dek: >-
  When nobody can say whether there was a breach, the answer that matters was decided months earlier, by the culture.
# Not shown on the page: structured data and llms.txt only.
summary: >-
  Schrödinger's cat was meant as ridicule of a theory that confused the limits
  of its description with the world. Security teams borrowed it for incidents
  they cannot resolve, and repeat the error. Following one composite Tuesday,
  a vendor advisory, an unlisted gateway at an acquired subsidiary, logs
  turned off to meet a budget, the essay traces how each person's incentives
  produced a day of reasonable choices and a lost answer, drawing on Vaughan's
  normalization of deviance and Westrum's typology of organizational cultures.
  A second company, no better resourced, meets the same advisory having
  decided in advance what it can see, what it accepts not seeing, and who may
  act when it cannot know.
# link-preview card; rebuild with: python _tools/og-card.py <this file>
image: /assets/pieces/001/og.png
hero:
  src: /assets/pieces/001/hero-barrels.jpg
  side: right
  position: 72% 88%
  credit: Gonzalo Facello / Unsplash
  credit_url: https://unsplash.com/photos/20F3U-emCbA
---
## The cat

Physicists have had an in-joke for over 90 years about a cat in a box. It's so well-known that it has long outlived the argument it was made for. 

In 1935, Einstein -- unconvinced by a theory that described unmeasured systems as holding all their possibilities at once -- wrote to Erwin Schrödinger about a keg of unstable gunpowder. Left alone for a year, the keg would, according to the arithmetic of this theory, be both exploded and unexploded simultaneously. Einstein found this to be absurd. A keg has either gone off or it hasn't.

Schrödinger agreed with Einstein, and took the example even further: a cat in a sealed box whose survival hinged on a single atom. He meant it as ridicule à la *reductio ad absurdum*. If the theory required a cat to be alive and dead until someone looked, the theory had mistaken the limits of its own description for a property of the world.

Incident responders borrowed the cat long ago to describe a common occurrence in their world. When something ambiguous surfaces, an organization often cannot say whether it has been compromised. It may have missed the evidence. The evidence may never have been recorded. There may be no evidence because nothing happened. Practitioners call this Schrödinger's breach, usually with a laugh, because they have all been the one inside the box.

This borrowed version repeats the error Schrödinger was mocking. An intrusion occurred or it did not. What is genuinely undecided is the organization: what it knows about its own systems, and what its people will do when they cannot find out. Some organizations settle that long before anything happens. Most try to settle it in the middle of an event, under pressure, with whoever happens to be in the room. The difference between the two has little to do with tools or frameworks and a great deal to do with culture, which is a vague word until one watches it operate on an ordinary Tuesday.

## Tuesday

What follows is a composite. No single organization lived it exactly this way, but nearly every organization of a certain size will recognize most of it.

#### 6:40am
A vendor publishes an advisory for its remote access gateway, the appliance that sits at the edge of the network and lets employees connect from home, from hotels, from customer sites. A flaw in the login portal allows an unauthenticated attacker to run commands on the device. The vendor says it is aware of "limited exploitation." It offers an interim mitigation, a configuration change, and a script customers can run to check the device's integrity. A full fix will follow in about two weeks.

<figure class="doc doc-advisory" aria-hidden="true">
  <p class="doc-kicker">Security advisory</p>
  <p class="doc-title">Remote access gateway: unauthenticated command execution in the login portal</p>
  <dl>
    <dt>Severity</dt><dd>Critical</dd>
    <dt>Exploitation</dt><dd>The vendor is aware of limited exploitation</dd>
    <dt>Mitigation</dt><dd>Configuration change; integrity check script available</dd>
    <dt>Fix</dt><dd>In about two weeks</dd>
  </dl>
</figure>

#### 7:05am
The overnight analyst sees the advisory in a feed that carries forty others that morning. This one is different in two respects that matter: the product is internet-facing, and someone is already using the flaw. She opens a ticket, tags it as high severity, and posts a link in the team's channel.

#### 7:18am
The first reply comes, from an engineer on the network team who has seen the same advisory in his own feeds. Those were all upgraded in September, he writes. We're on the new train. He is mostly right. The two gateways in the main data centers were upgraded in September, and he did the work himself, over a weekend, which is part of why he remembers it.

#### 7:40am
Someone from the endpoint team adds that the company's endpoint detection product would catch anything that happened after exploitation. This is a reasonable thing to believe about laptops and servers. It is not true of the gateway, which is a closed appliance that cannot run the agent, a fact everyone in the channel knows and nobody mentions, because the conversation has already moved on.

<figure class="doc doc-chat" aria-hidden="true">
  <p class="doc-kicker"># security-ops</p>
  <div class="msg"><p class="msg-by"><b>overnight analyst</b> <time>7:05</time></p><p>Vendor advisory for the remote access gateway, exploited in the wild. Ticket is open, tagged high.</p></div>
  <div class="msg"><p class="msg-by"><b>network engineer</b> <time>7:18</time></p><p>Those were all upgraded in September. We&rsquo;re on the new train.</p></div>
  <div class="msg"><p class="msg-by"><b>endpoint team</b> <time>7:40</time></p><p>Our endpoint detection would catch anything after exploitation anyway.</p></div>
</figure>

#### 8:30am
By now, the director of security operations is in, and the ticket has acquired a dozen watchers. She asks the analyst to run the vendor's integrity script on every gateway. The analyst asks for the list. The list in the asset inventory has two entries.

The script comes back clean on both.

#### 9:50am
A second analyst, scanning the company's external address space for the vulnerable login page, finds a third gateway. It belongs to a subsidiary acquired eighteen months earlier, run by its own small network team in another time zone. Its software is two versions behind. Central security has never had administrative access to it; the integration plan promised that by the end of the first year, and the first year ended in the spring.

The question changes shape. It is no longer whether the company is exposed. The subsidiary's gateway was exposed, possibly for days, possibly longer, since nobody knows when exploitation began. Now the question is whether the gateway was compromised, and behind that sits the harder question the analysts all understand and none of them wants to say aloud: if it had been, would anyone be able to tell?

The gateway keeps its own logs locally in a rolling buffer that holds a few days of activity, depending on traffic. It used to forward them to the central log platform as well. That stopped the previous year, when the platform's renewal came in priced by volume and the security leadership, looking for cuts, turned off a set of noisy, low-value sources. Appliance logs from a small subsidiary were among them. The decision was defensible at the time. It was made in a budget meeting in March by people who would not be on call in November.

#### 10:30am
At 10:30 the CISO hears about it, not from her own team but from the CIO, who heard about it from the CEO, who was forwarded a trade-press article by a board member with the question "Are we affected?" The CIO wants an answer by noon.

What the CISO can honestly say is that the company has three gateways, two are patched and look clean, and the third is vulnerable, under the control of another team, and missing most of the evidence that would show whether anything happened to it. What she actually sends, after two revisions, says that the company has "identified one potentially affected device in a subsidiary environment," that "there is no indication of compromise at this time," and that "the team is actively investigating." Every word is accurate. The phrase "no indication" carries most of the weight, and it rests on the absence of logs that were turned off.

<figure class="doc doc-mail" aria-hidden="true">
  <dl class="mail-head">
    <dt>From</dt><dd>CISO</dd>
    <dt>To</dt><dd>CIO</dd>
    <dt>Subject</dt><dd>Re: Are we affected?</dd>
  </dl>
  <p>We have identified one potentially affected device in a subsidiary environment. There is <mark>no indication</mark> of compromise at this time. The team is actively investigating.</p>
</figure>

The director of security operations, meanwhile, has to decide whether to call this a high-severity incident. A high-severity declaration opens a standing bridge call, pages the on-call executives, notifies legal, and starts a clock on internal reporting. The last time she declared one, in the spring, it turned out to be a misconfigured scanner, and the vice president who had been pulled out of a family event to join the bridge has mentioned it in two meetings since. She classifies Tuesday as medium severity, pending more information. She tells herself, accurately, that she does not yet know enough to justify more.

#### 11:00am
The subsidiary's network team comes online at 9:00am local time; 2 hours behind. They can apply the vendor's mitigation, they say, but the full upgrade requires a reboot, and the company is in a change freeze for the final two weeks of the quarter. The freeze exists because a botched change at the previous quarter's close took down order processing for six hours. Rebooting the gateway would also disconnect the subsidiary's field sales staff, who are in the middle of their own end-of-quarter push and who connect through that gateway to the systems they need to book deals.

Security wants the device isolated and rebuilt. The subsidiary's network lead wants a maintenance window and written approval for an exception to the freeze. The subsidiary's head of sales wants assurance that neither is necessary. Each has an argument that would carry the room if the others were absent. None of them can overrule the others. The question goes to the CIO, who is in back-to-back meetings until four.

#### 6:00pm
The analyst who opened the ticket at 7:05 is still working at 6:00 in the evening. She has pulled what she can from the gateway's local buffer, which reaches back four days. She finds a login from an unfamiliar address at 02:13 on Saturday and checks it against the vendor's published indicators, which do not include it. She also compares it to the window the vendor described for the earliest known exploitation, decides it falls before that window, and moves on. The gateway records its time in the subsidiary's local zone. The central log platform, and the analyst, think in UTC. The login falls inside the window, not before it. Nobody notices for two days.

#### 11:42pm
That night the subsidiary's network lead, having received a verbal exception from the CIO, reboots the gateway to complete the upgrade. Whatever was resident only in memory is gone.

---

Nobody has called outside counsel, because calling counsel would make it something. Nobody has briefed communications, because there is nothing to communicate. By any formal definition, the company has not had an incident. It has had a fifteen-hour day, three executive summaries, an argument that went to the CIO, a lost piece of evidence, and an analyst who will be back at 7:00 the next morning to start again.

## Two ways of saying "fine"

Go back to 7:18. "Those were all upgraded in September" was not a careless thing to say. Whether the organization runs the vulnerable version is the first question any competent triage asks, and the engineer was answering it from direct knowledge of work he had done. For two of the three devices he was correct.

The trouble lay in how the statement was used. It arrived as a conclusion before anyone had checked it, and the channel accepted it as one, because it made a set of other questions unnecessary. Was the inventory complete? Did anyone own the subsidiary's edge? If something had happened, what evidence would exist? A satisfying answer to the first question relieved everyone of the obligation to ask the rest, and nobody in the channel had any reason to want those questions asked, because nobody knew the answers.

There is another way an organization can decline to chase something, and in the moment it sounds identical. An organization can look at a class of problem before it arrives, establish what it can and cannot observe, decide which residual risks it is prepared to carry, and agree that it will not spend days trying to prove a negative it has already chosen to accept. When an advisory lands inside that decision, declining to pursue it is the decision doing its job.

The words are the same in both cases. What differs is when the answer was reached and by whom. In one organization the position existed before the event, and the people with the authority to accept the risk accepted it. In the other, the position was assembled at 7:18 by whoever happened to be awake, from memory, under a quiet pressure to make the problem small.

<aside class="note pull left" aria-hidden="true">When someone says the organization is fine, ask when that was decided, who decided it, and what exactly was accepted.</aside>

There is a simple way to tell which is happening. When someone says the organization is fine, ask when that was decided, who decided it, and what exactly was accepted. If those questions have answers, the organization is applying a decision. If they produce silence, or a fresh round of argument, it is improvising, and the claim of safety is carrying more weight than it can hold.

Most organizations improvise. The more interesting question is why, because almost everyone involved in Tuesday behaved reasonably by the standards they were held to.

## The people in the room

Culture is easiest to see one person at a time, by asking of each what they wanted, what they feared, what they were rewarded for, and what habits those rewards had produced in them.

<span class="role" aria-hidden="true">Analyst</span>**The analyst** is measured, like most people in her role, on how quickly tickets move. Her team reports how long alerts wait before someone looks at them and how long they stay open afterward. Neither number distinguishes between a ticket closed because the question was answered and one closed because it was answered conveniently. Over two years in the job she has learned something no one taught her directly: the fastest way to close a ticket is to find the reason it does not matter. She is not lazy and she is not careless. She worked fifteen hours on Tuesday. But when she found the 02:13 login and the vendor's indicators did not match it, a lifetime of small rewards nudged her toward the reading that let her move on, and she had no reason to distrust it, because that reading had been right many times before. Her fear, to the extent she has one, is not of missing an attack. It is of raising an alarm that turns out to be nothing, in front of people who will remember.

<span class="role" aria-hidden="true">Network engineer</span>**The network engineer** who wrote "those were all upgraded in September" did the upgrade himself, on a weekend, without being thanked. The September work is part of how he thinks of himself at the company: the person who keeps the edge current. When the advisory appeared, his first instinct was to defend that work, and the defense happened to be mostly true. Admitting in a public channel that the inventory he relied on might be incomplete would have meant admitting a gap in something he considers his. The subsidiary's gateway was never his responsibility, and it did not occur to him to mention it, in the same way that it does not occur to anyone to list the systems they do not think of as theirs.

<span class="role" aria-hidden="true">Director of security operations</span>**The director of security operations** lives in an economy of credibility. Every high-severity declaration spends some of it. Spend it on something real and she gets a little back; spend it on a misconfigured scanner and a vice president remembers. The organization has never told her what it would rather she do in doubtful cases, so she has learned from what happens to her afterward, which is that a false alarm costs her personally and a slow escalation costs her only if something turns out to have happened. That asymmetry is not written anywhere. Everyone on her team can recite it.

<span class="role" aria-hidden="true">CISO</span>**The CISO** has a different problem. She is accountable for an answer she cannot give. Her own chief executive, by way of the CIO, has asked a yes-or-no question, and the honest answer is neither. She also knows, in a way nobody else in the building does, that the logs which would have settled the matter were turned off on her authority, in a budget review she would make the same way again given the same constraints. The summary she sends at noon is the product of all of that. It is accurate, it is reassuring, and it leaves out the one fact that would explain why reassurance is not yet possible.

<span class="role" aria-hidden="true">Head of sales</span>**The subsidiary's head of sales** is not thinking about security at all, which is exactly how the company has asked him to think. His compensation and his team's depend on what closes in the next two weeks. Security, as he has always experienced it, is a function that occasionally takes things away from him, and on Tuesday it proposes to take away the connection his people use to book deals in the last ten days of the quarter. His objection is not irrational. Nobody has ever shown him what the company stands to lose from a compromised gateway, in terms he would recognize, and nobody has ever asked him in advance what he would trade to avoid it.

<aside class="note pull wide" aria-hidden="true">It is a sensible decision, and it destroys evidence.</aside>

<span class="role" aria-hidden="true">CIO</span>**The CIO** has authority over almost everyone involved and time for almost none of it. He resolves the argument the only way it can be resolved in an organization where nobody else holds the authority: by deciding personally, late, between meetings, on the basis of whatever he can absorb in five minutes. He grants the exception. The reboot happens. It is a sensible decision, and it destroys evidence.

Not one of these people did something foolish. Each responded sensibly to the incentives in front of them, and the sum of those sensible responses was a day in which the most important question went unanswered, the evidence that might have answered it was lost, and the organization's account of what happened was written for its executives rather than for the truth. That is what culture means here: not a set of values on a poster, but the accumulated answers to what gets people rewarded, what gets them blamed, and what they have learned to do as a result.

## Decisions made in March

Tuesday's most consequential decision was made eight months earlier.

When the security leadership turned off the subsidiary's appliance logs to bring a renewal under budget, they were doing what organizations ask of leaders all the time: making tradeoffs under constraint. The decision was visible, documented, and approved. What it lacked was any connection to the people who would bear its cost. The cost would not appear in that year's budget. It would appear on a Tuesday, months later, as a question no one could answer, borne by an analyst who had not been in the room and could not have known the decision existed.

Most of Tuesday's ingredients share this structure. The integration plan that promised central access to the subsidiary's network by the end of year one was written to make the acquisition case look tidy. When the deadline passed, nothing happened, because nobody was measured on it after the deal closed. The change freeze was imposed after a bad quarter-end, as a reasonable response to a real failure, with no exception path that anyone had thought through for a security emergency. Each of these was a sensible decision by someone solving the problem in front of them, over a horizon of a few months.

Technology organizations reward exactly that horizon. Work is planned and judged in quarters. People are promoted for launches and landings, for migrations completed and systems deprecated, for visible delivery. Multi-year strategy has largely disappeared; roadmaps survive as a slide at the end of a planning deck, gesturing at a future nobody expects to be held to. Almost nobody tracks whether the organization actually became better at anything over five years, because the people who would be asked have, by then, moved to other roles, or other companies, carrying with them whatever they learned.

The sociologist Diane Vaughan spent years analyzing the decisions that led to the explosion of the space shuttle *Challenger* in 1986. Her background was in corporate misconduct, and she expected to find some. What she found instead was a slow process by which engineers and managers saw the booster rockets' seals behave in ways the design did not anticipate, analyzed the behavior, and accepted it, and every subsequent flight that came home safely legitimized acceptance through lived experience. Over years, a deviation became the normal state of things. Her conclusion was that the disaster grew out of ordinary, large-scale organizational life rather than anyone's wrongdoing.

The subsidiary's gateway sat outside central security's control for eighteen months, and for eighteen months nothing happened. Each month made the arrangement feel more like the way things were. The logging decision produced no visible harm for eight months, and so it was never revisited. "Those were all upgraded in September" had been the right answer to every previous advisory about those devices, which is why it came so easily on Tuesday. An organization without memory cannot see this kind of drift, because seeing it requires someone positioned to compare this year with five years ago, and almost nobody is.

## What the organization didn't know about itself

The bulk of security, by a wide margin, is ordinary technology hygiene. Events like Tuesday are where its absence becomes visible, and they tend to expose four distinct kinds of ignorance.

The first is not knowing what the organization has. The inventory listed two gateways because the inventory was populated from the central network team's records, and the subsidiary had never been folded into those records. This is the normal condition of large organizations, not a peculiar failing of this one. Infrastructure appears whenever a team has a project and a budget, through acquisitions, through cloud accounts opened on a corporate card, through a vendor who sets something up and leaves. "We aren't running that version" is only as good as the list it was checked against.

The second is not knowing what the organization can observe. The gateway's logs were local and short-lived because forwarding them had been deemed too expensive relative to their value. Elsewhere the gap might be logging configured at a level that records connections but not commands, or a collector that has quietly failed and taken a week of events with it. The question "would we have seen it?" is a question about these details, and most organizations cannot answer it for any given system without first spending hours finding out.

The third is not knowing where to look. The investigation on Tuesday centered on the gateway, because that was where the advisory pointed. An attacker who compromised it, though, would have had access to everything passing through it, including the credentials and session tokens of employees logging in from home. The more consequential evidence, if any existed, might sit in the authentication logs of systems three steps removed, which nobody examined, because nobody had thought through in advance what a compromised gateway would reach.

<aside class="note pull" aria-hidden="true">Published indicators are a description of someone else&rsquo;s incident.</aside>

The fourth is the hardest to admit: not knowing what one is looking at. The analyst compared the 02:13 login with the vendor's published indicators, found no match, and treated the absence as reassurance. Indicators describe what was seen at other victims, by other investigators, using whatever infrastructure the attacker happened to use there. They are a description of someone else's incident. Recognizing an attack in one's own environment, when it does not match the published pattern, takes an understanding of what normal looks like there and the experience to see a departure from it. Where that understanding is missing, teams see what their frameworks and feeds have taught them an attack should look like, and activity that does not fit the template goes unread.

None of this is unusual. Every organization has gaps of each kind. What separates mature organizations from immature ones is not the absence of gaps but whether the organization knows where they are and has decided in advance what it will do about them. The immature organization discovers its gaps on a Tuesday, each time as though for the first time, and responds to each discovery by improvising.

## The room above

On Tuesday the requests from leadership looked like an interruption to the real work. They were closer to its center.

Consider what the CISO and the CIO were actually afraid of. Both answer upward, to a chief executive and through the chief executive to a board, and in that chain "we don't know" is heard as a failure of competence rather than as a description of the evidence. Neither can evaluate the technical findings directly. For them the status update is not paperwork; it is the only instrument they have for knowing what is happening and for showing that they are on top of it, which is why it gets requested every two hours and rewritten three times. Both also know that they will be judged afterward on how the event looked as much as on how it went. A careful phrase in a noon summary is how that judgment gets managed early.

Below them, the layer of middle management transmits these pressures and, under strain, amplifies them. The director of security operations was answering the CISO, who was answering the CIO, and each wanted the same information rendered slightly differently for a different audience. On Tuesday the analyst spent an hour and a half of her day producing material for summaries rather than reading logs. Nobody asked her to; the requests simply arrived, and each was reasonable, and she was the person who knew the facts.

The way organizations reward their leaders makes these patterns durable. Tenures are short and outcomes are seldom tracked over years, so the consequences of a decision often arrive after the person who made it has moved on, frequently to a larger role. The leader who turned off the logs will be judged on that year's budget, which came in under target. The leader who pushed the subsidiary deal will be judged on its close. The system rewards people who perform control convincingly in the moment, and those people go on to shape what everyone beneath them learns to do.

The sociologist Ron Westrum, who spent much of his career studying safety in aviation and medicine, proposed classifying organizations by how information moves through them, and above all by what happens to people who bring bad news. In some organizations the messenger is punished. In others the messenger is ignored or routed elsewhere. In the healthiest, people are trained to carry unwelcome information and leaders actively seek it out. Westrum argued that this pattern predicts how an organization will behave when signs of trouble appear, which is a precise description of what Tuesday tested.

<aside class="note pull left" aria-hidden="true">Where leaders demand certainty on a schedule, the organization produces certainty on a schedule, whether or not it has any.</aside>

Seen that way, the room above sets the price of an uncomfortable question, and every person on Tuesday was paying it. The analyst's preference for the reading that let her move on, the engineer's defense of his September work, the director's reluctance to spend credibility on a high-severity call, the CISO's careful noon summary: each was a rational response to an organization that had taught its people, over years and mostly without saying so, that bringing an open question upward costs more than bringing a closed one. Where "we don't know" carries consequences, people explain problems away. Where credit flows to whoever found the problem or forced the fix, people compete for that role, and an argument about a gateway becomes a contest of authority. Where leaders demand certainty on a schedule, the organization produces certainty on a schedule, whether or not it has any.

The leaders worth working for do something harder and much less visible. They absorb pressure from above instead of passing it down. They will tell their own superiors, in advance and in plain language, that some questions will not have answers in the first day and that the organization has decided what it will do in that case. They protect the person who closes a question honestly, including when the honest answer is that the organization accepted a risk and the risk came due. And they track, over years, whether the organization is getting better, because they intend to still be accountable when the answer arrives.

## What it means to have decided

An organization that has decided in advance has answered a set of questions about itself before any event forces them. What can it see, and what has it accepted not seeing? What happens when it discovers a system it did not know it had? What evidence is enough to close a question, and who gets to say so? Who has the authority to stop an investigation that has gone as far as it usefully can, and who can take a system offline over the objections of the people who depend on it, during a freeze, at the end of a quarter? How will leadership hear about an event, from whom, how often, and what will it accept as a status when the honest status is "unknown"? What will be remembered afterward, and where?

None of these questions has a generic answer. They depend on the organization's systems, its tolerances, its people, and the risks its business can actually bear, which is why they cannot be adopted from a framework or downloaded as a template. A generic answer to "what have we accepted not seeing?" is no answer at all, because nobody who would have to live with it accepted it.

A reader who sits on a risk committee will have been waiting to ask where the first company's risk register was in all of this. It had one. Somewhere in it, almost certainly, was an entry about the subsidiary's unfinished integration, rated moderate, assigned to an owner who had since left the company, and marked as in progress at its last quarterly review. Nobody opened it on Tuesday, and it would not have helped if they had. The register suffers from the same condition as the inventory and the frameworks. It is a record that a risk was once named, maintained by people who are not certain what it contains, and consulted mainly when an auditor asks. Naming a risk is a different act from deciding what to do about it, and the entry had nothing to say about the questions that mattered at 7:18: who had accepted the risk, what exactly they had accepted, and what anyone was entitled to do when it came due. A register can record a decision that people with authority have made and intend to honor. Where that culture is missing, it records only that someone once noticed the problem.

They also have to be reached by the right people, and this is where most attempts fail. A position written by the security team alone will be reargued during every event, because the people who own the systems and the revenue never agreed to it. On Tuesday, the subsidiary's head of sales had never been asked what he would trade for safety, so he could only object when the trade was put to him in the middle of a crisis. A decision holds only when it has been made by people with the authority to carry its consequences, which usually means security, technology, the business, and often counsel, together, ahead of time, with enough honesty about the costs that nobody can later claim to have been surprised.

Reaching those decisions is not free. It means arguments, sometimes long ones, between people who would prefer to avoid each other. It means spending money in one place by cutting it somewhere else and writing down what was cut. It means leaders agreeing in advance to accept outcomes they will not like, and then honoring the agreement when the outcome arrives. Organizations that have not done this work tend to show it in recognizable ways. The same argument recurs at every event. The question of who can approve downtime gets answered by escalation. Nobody can say what risk the organization has accepted, because nobody remembers accepting any. Knowing that these decisions ought to exist is common. Arriving at them in a form that survives an actual Tuesday is the difficult part.

## The same Tuesday, elsewhere
{: .calm}

The same advisory reaches a second company at the same hour. It is not a model organization. Its budget is no larger, its staff no more talented, its technology no newer, and it has its own subsidiary, acquired three years ago, that has never been fully integrated.

Two years earlier it had its own version of the first company's Tuesday: a vulnerable file transfer server nobody had listed, missing logs, a week of argument, and a public disclosure that was more painful than it needed to be. In the months afterward the CIO and the CISO had a series of conversations that both of them describe as unpleasant. Several decisions came out of them, and most of them cost something.

---

They decided that logs from internet-facing systems would always be forwarded and retained, whatever the platform's price. To stay within budget, they turned off detailed logging for a large set of internal systems instead, wrote down which ones, and wrote down that they accepted not being able to investigate those systems in depth. The CIO signed it.

They decided that any internet-facing system discovered outside the inventory would be treated as compromised until shown otherwise: isolated, rebuilt, and its credentials rotated. The network team was given the authority to isolate such a system on its own judgment, during a freeze, without a vice president's approval. The heads of the business units agreed to that in writing, after one of them argued against it for a month and lost.

They decided what leadership would receive in the first day of an event: a short note at fixed intervals, saying what is known, what is not, and when the next note will come. The chief executive agreed, in advance, that "unknown" was an acceptable status in that note, and that the security team would not be asked to rewrite it.

Which decisions the second company made matters less than it might appear. Another organization could reasonably have chosen differently, kept different logs, drawn the line for isolation somewhere else, and been as well served. What mattered was what those months of argument changed for the people who would be in the room the next time, and the clearest way to see it is to revisit them one at a time.

<span class="role" aria-hidden="true">Analyst</span>**The analyst** is still measured on how long tickets wait and how long they stay open. But every week a senior analyst reviews a sample of closed tickets and asks how each was closed, not only how quickly. "Unknown, closed under accepted risk" is a disposition the ticketing system offers and the review accepts. Escalations that turned out to be nothing are discussed in the same review, as cases rather than as anyone's mistake. She has absorbed a lesson in the same unspoken way her counterpart did, but it is a different lesson: the reading that lets her move on has to be one she could defend to a colleague the following week.

<span class="role" aria-hidden="true">Network engineer</span>**The network engineer** does not treat the inventory as a monument to his own diligence, because it was never made his alone. Each environment, the subsidiary's included, has a named owner, and finding something missing from the list counts as a contribution rather than an admission. When the fourth gateway turned up on Tuesday, the engineer responsible for that environment added it himself, and nobody asked him to explain why it had not been there.

<span class="role" aria-hidden="true">Director of security operations</span>**The director of security operations** spends less of her own credibility on severity calls, because the criteria for this kind of event were agreed in advance by people above her. Declaring by those criteria is following the agreement. When a declaration turns out to have been unnecessary, the criteria are what get reviewed. The asymmetry her counterpart can recite, in which a false alarm costs her personally and a slow escalation costs her only if something happened, has not disappeared here, but it is much smaller, and she knows that leadership put it in writing.

<span class="role" aria-hidden="true">CISO</span>**The CISO** still answers upward, but the question that comes down to her has changed. Her chief executive does not ask whether the company is affected; he asks when the next note is due, because the two of them agreed, before any of this, what an honest status looks like. The gap in internal logging that she created to pay for edge logging carries the CIO's signature as well as hers, which makes it a known cost to the organization rather than a private exposure she has to manage. With nothing in the note she would prefer leadership not to read closely, she has no reason to spend an hour on its wording.

<aside class="note pull wide" aria-hidden="true">He is allowed to be furious. He is not allowed to reopen the decision in the middle of the event, and he knows it.</aside>

<span class="role" aria-hidden="true">Head of sales</span>**The subsidiary's head of sales** cares about the quarter exactly as much as his counterpart does, and on Tuesday he will be just as angry. The difference is that two years earlier someone sat him down, explained what a compromised gateway would cost his business in terms he recognized, and asked him what he was willing to trade to avoid it. He argued, lost, and signed. The lost afternoon is a cost he agreed to, not one imposed on him by a function he has never understood. He is allowed to be furious. He is not allowed to reopen the decision in the middle of the event, and he knows it.

<span class="role" aria-hidden="true">CIO</span>**The CIO** does not adjudicate between meetings, because the authority he would otherwise have to exercise in five minutes was delegated, in advance, to the people closest to the system. His part in Tuesday is a two-minute conversation reminding the head of sales what he signed.

<span class="role" aria-hidden="true">Cat</span>**The Cat** does or does not sleep contentedly in the box, utterly unbothered by the lack of commotion around it.

---

None of these people is better than their counterparts at the first company. They are paid similarly, ambitious in the same ways, and no less tired at the end of a long day. What differs is what they have learned they will be rewarded for and blamed for, and that difference is what two years of uncomfortable conversations actually bought.

None of this made the company's knowledge complete. On Tuesday its inventory listed three gateways. A scan found a fourth, at the unintegrated subsidiary, two versions behind. The inventory was wrong here too.

What happened next was different. The analyst who found the fourth gateway did not need to argue about what it meant. It was an internet-facing system outside the inventory, and the organization had already decided what that meant. The network team isolated it within the hour. Its logs had never been forwarded, because nobody had known it existed, so the first note to leadership said plainly that the company could not determine whether the device had been compromised, that it would be rebuilt, and that credentials used through it in the past thirty days would be reset. The note went out on schedule and was not rewritten.

<figure class="doc doc-status" aria-hidden="true">
  <p class="doc-kicker">Status note &middot; 1</p>
  <dl class="mail-head">
    <dt>To</dt><dd>Chief executive, CIO</dd>
    <dt>Next note</dt><dd>In two hours</dd>
  </dl>
  <dl>
    <dt>Known</dt><dd>An internet-facing gateway at the subsidiary was found outside the inventory. It was isolated within the hour.</dd>
    <dt>Not known</dt><dd>Whether it was compromised. Its logs were never forwarded, so this cannot be determined.</dd>
    <dt>Doing</dt><dd>Rebuilding the device. Resetting credentials used through it in the past 30 days.</dd>
    <dt>Status</dt><dd><b>Unknown</b></dd>
  </dl>
</figure>

The subsidiary's field sales staff lost remote access for most of an afternoon in the last two weeks of the quarter. Their head of sales was furious, and he said so to the CIO, who reminded him that he had signed the decision and that it applied to this situation exactly. A few hundred employees had to reset their passwords the next morning, and some of them complained about that too.

The company never learned whether the fourth gateway had been compromised. The evidence that might have answered the question had never existed. Nobody spent a week trying to prove a negative they could not prove, because the organization had decided, two years earlier and at some cost, what it would do when it could not.

## The cat, again

Schrödinger built his box to highlight, with absurdism, what happens when an academic theory is mistaken for the real world. Organizations facing an unanswerable question make their own version of the mistake. They treat their uncertainty as though it were a fact about the attack, and then try to resolve it by force, under pressure, with whatever explanation lies closest to hand.

The first company spent Tuesday trying to open the box, and could not, and wrote three summaries implying it had. The second company never opened its box either. The difference was that its course of action had been settled before the box was closed, by people with the authority to settle it, at a cost they had agreed to pay. It did not need to look in order to know what it would do. It had planned for the cat to have a long life, and for what it would do if it didn't.

<div class="piece-end" markdown="1">
_One White Raven_ investigates how people create, interact with, and adapt to complex systems—and how those interactions shape what we believe, how we behave, and what ultimately happens. We draw on research across disciplines to examine these relationships, particularly where technology and artificial intelligence are changing their nature.

_One White Raven_ is published by [Six Ravens](https://sixravens.io).

{% if site.owr.subscribe %}[Subscribe by email](#subscribe) · {% endif %}[RSS]({{ site.owr_path }}/feed.xml)

</div>

<div class="piece-sources" markdown="1">

### Further reading

- Einstein–Schrödinger correspondence and the cat as reductio: [Wikipedia, "Schrödinger's cat"](https://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat); [Kaiser, Nautilus](https://nautil.us/how-einstein-and-schrdinger-conspired-to-kill-a-cat-236140)
- Vaughan: [Aerossurance on Vaughan's research and expectations](https://aerossurance.com/safety-management/challenger-launch-decision-30/); [Flight Safety Australia on normalization of deviance](https://www.flightsafetyaustralia.com/?p=8862); [publisher description via Bookshare](https://www.bookshare.org/browse/book/1133347)
- Westrum: [Westrum, "A typology of organisation cultures," *Quality & Safety in Health Care* (2004)](https://doi.org/10.1136/qshc.2003.009522); typology per [The New Stack](https://thenewstack.io/westrums-organizational-cultures-are-vital-but-misunderstood/) and [InfoQ](https://www.infoq.com/podcasts/hidden-driver-engineering-culture); research focus per [Tom Geraghty](https://tomgeraghty.co.uk/index.php/category/blog/page/8/)

</div>
