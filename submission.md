# Devpost Submission: SubScout

## Project Name

SubScout

## Elevator Pitch (Short Description)

SubScout is an autonomous AI agent that navigates "dark patterns" to cancel unwanted subscriptions for you. Powered by Amazon Nova 2 Lite capabilities through Amazon Bedrock.

## The Story (Long Description)

### Inspiration

We've all been there: you sign up for a free trial, forget to cancel, and then spend 20 minutes clicking through "Are you sure?" screens, hidden links, and retention offers just to unsubscribe. Companies use "dark patterns" to trick users into staying. We wanted to build an AI agent that fights back—saving users time and money.

### What it does

SubScout acts as your personal consumer protection agent.

1.  **Analyzes URLs:** You paste the link to a subscription service (e.g., a gym, streaming site, or news outlet).
2.  **Detects Dark Patterns:** Using **Amazon Nova 2 Lite**, it scans the page structure to identify hidden cancellation flows, "confirmshaming" tactics, and forced phone support requirements.
3.  **Calculates Difficulty:** It assigns a "Difficulty Score" (1-10) based on the barriers detected.
4.  **Auto-Navigation (Nova Act):** It generates a step-by-step plan to reach the cancellation confirmation, clicking through the retention traps automatically.

### How we built it

- **Frontend:** Built with **Next.js 14**, **Tailwind CSS**, and **Shadcn/UI** for a clean, trust-inspiring interface.
- **AI Reasoning:** We used **Amazon Nova 2 Lite** via **Amazon Bedrock** to act as the "brain," analyzing HTML structures and identifying manipulative UX patterns.
- **Agentic Workflow:** The app simulates an agentic loop where the model plans the navigation steps required to reach the goal state (subscription cancelled).

### Challenges we ran into

- **Handling diverse page structures:** Every cancellation flow is unique. Prompt engineering Nova 2 Lite to generalized "dark pattern detection" required several iterations.
- **Simulating the browser actions:** Integrating the reasoning layer with the frontend execution loop was complex, ensuring the UI accurately reflected the AI's "thought process."

### Accomplishments that we're proud of

- The "Difficulty Score" algorithm provides genuine insight into how predatory a website's UX is.
- The UI feels like a premium consumer tool, not just a hackathon prototype.
- Successfully integrating the Amazon Bedrock SDK into a modern Next.js 14 server action environment.

### What we learned

We learned that "dark patterns" follow very specific semantic structures that LLMs like Nova are surprisingly good at detecting. We also deepened our knowledge of the Amazon Bedrock Runtime API and prompt engineering for JSON output.

### What's next for SubScout

- **Browser Extension:** Moving the agent directly into a Chrome Extension to run on live pages.
- **Financial Integration:** Connecting to Plaid to automatically detect recurring charges and suggest cancellations.
- **Community Database:** Building a shared database of "Cancellation Difficulty Scores" for thousands of services.

## Built With

- Amazon Nova 2 Lite
- Amazon Nova Act
- Amazon Bedrock
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn/UI
