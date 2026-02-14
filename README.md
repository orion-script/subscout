# SubScout 🕵️‍♂️ (Subscription Auditor)

> "Cancelling a gym membership shouldn't require a law degree."

**SubScout** is an **Agentic AI** tool built for the **Amazon Nova AI Hackathon**. It uses **Amazon Nova Act** to navigate complex cancellation flows and fight "dark patterns" designed to trap users in unwanted subscriptions.

## 🚀 Features

- **URL Analysis**: Enter a service URL (e.g. `adobe.com`) to analyze its cancellation flow complexity.
- **Cancelability Score**: Generates a complexity score (1-10) based on dark patterns found.
- **Auto-pilot**: Uses **Nova Act** to navigate the UI for you, finding the hidden "Cancel Membership" buttons.
- **Documentation Generation**: Creates a step-by-step PDF/Guide if full automation is blocked.

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS, Shadcn/UI
- **Backend API**: Next.js API Routes, AWS Bedrock Runtime
- **AI Models**:
  - **Amazon Nova 2 Lite**: Fast reasoning to identify "dark patterns" in UI text.
  - **Amazon Nova Act**: The core engine that performs the "click through" actions to reach the cancellation confirmation page.

## 📦 Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/subscout.git
   cd subscout
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your AWS credentials:

   ```env
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=us-east-1
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🎥 Demo

(Add demo video link or gif here)

---

_Built with ❤️ for the Amazon Nova AI Hackathon_
