## 💡 Inspiration

We've all been there: you sign up for a service in seconds, but when you try to leave, it takes a PhD in navigation to find the "Cancel" button.

These "Dark Patterns" (or "Roach Motels") are designed to trap users. We realized that while companies use AI to optimize _retention_, consumers need AI to optimize _freedom_. We built **SubScout** to level the playing field—an autonomous agent that navigates the bureaucratic maze for you.

## 🤖 What it does

SubScout is an **Agentic AI** tool that audits and automates subscription cancellations.

1.  **Audit Mode**: You paste a URL (e.g., `adobe.com/account`). SubScout visits the page and uses **Nova 2 Lite** to analyze the visual hierarchy and text, generating a **"Difficulty Score" (1-10)** based on the presence of hidden links, guilt-tripping copy ("Are you sure you want to abandon us?"), and forced support chats.
2.  **Auto-Pilot**: If you choose to proceed, **Nova Act** takes over. It clicks the buttons, declines the "Pause Membership" offers, navigates the confirmation modals, and finalizes the cancellation, notifying you only when it's done.

## ⚙️ How we built it

The architecture is split into a "Brain" and "Hands" model:

- **The Brain (Reasoning):** We used **Amazon Nova 2 Lite** via Amazon Bedrock. Its low latency and high reasoning capability make it perfect for real-time analysis of DOM elements. It decides _which_ button looks like a cancellation path versus a retention trap.
- **The Hands (Action):** We leveraged **Amazon Nova Act** for the browser interaction. unlike fragile Selenium scripts that break when CSS classes change, Nova Act understands the _intent_ of the UI (e.g., "Click the button that implies exit"), making it incredibly robust against A/B testing changes.
- **Frontend:** Built with **Next.js 14** and **Tailwind CSS** (utilizing Shadcn/UI) to create a clean, trustworthy interface that contrasts with the cluttered sites it navigates.

## 🚧 Challenges we ran into

- **Distinguishing "Pause" from "Cancel":** Many services offer a "Pause for 3 months" button that looks identical to "Cancel". We had to fine-tune our Nova 2 Lite prompts to strictly avoid these "retention offers".
- **Dynamic Loading States:** Single Page Applications (SPAs) often have lag between clicks. We had to implement smart waiting logic so the agent didn't try to hallucinate a next step before the page loaded.
- **Ethical Guardrails:** We had to ensure the agent stops at the final "Confirm" step during testing to avoid accidentally cancelling our own active subscriptions!

## 🏆 Accomplishments that we're proud of

- **The "Dark Pattern Score":** We created a reliable algorithm that consistently rates difficult sites (like gyms or newspapers) higher than simple ones (like Netflix), proving the model understands user hostility in UI design.
- **Visual Logic:** Integrating Nova's multimodal capabilities to "see" tiny, gray-on-white text links that traditional scrapers might miss.

## 🧠 What we learned

- **Nova Act is a game changer:** The difference between writing a script that says `click .btn-primary` (brittle) vs telling Nova `click the confirm button` (robust) is massive for maintenance.
- **The extent of user-hostile design:** analyzing these sites gave us a newfound appreciation for clean, ethical UX.

## 🚀 What's next for SubScout

- **Voice Command:** Integrating **Nova 2 Sonic** so you can just say, "Hey SubScout, cancel my gym membership," and have it handle the phone verification step (if required) synthetically.
- **Bulk Audit:** Connecting to your Gmail/Bank API to identify _all_ recurring charges and audit them in a batch.
- **Community Database:** Crowdsourcing the "Difficulty Scores" to build a public leaderboard of the hardest-to-cancel services.
