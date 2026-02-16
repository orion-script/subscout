"use client";
import { useState } from "react";
import {
  Search,
  ShieldAlert,
  Zap,
  Lock,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { analyzeUrlWithNova } from "@/lib/nova";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);

    try {
      // Simulate API call delay for "human" feel
      await new Promise((r) => setTimeout(r, 1500));
      const analysis = await analyzeUrlWithNova(url);
      setResult(analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2 font-bold" href="/">
              <ShieldAlert className="h-6 w-6" />
              <span>SubScout</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                How it works
              </button>
              <a
                href="https://github.com/orion-script/subscout"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                GitHub
              </a>
            </nav>
            <Button size="sm" variant="outline">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Stop paying for things <br className="hidden md:block" />
            you don&apos;t use.
          </h1>
          <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            SubScout uses <strong>Amazon Nova Act</strong> to navigate complex
            cancellation flows for you. Enter a URL, and our agent will find the
            hidden "Cancel" button.
          </p>

          <div className="w-full max-w-lg mt-8">
            <form onSubmit={handleAudit} className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="https://example.com"
                  className="pl-9"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {loading ? "Analyzing..." : "Audit Site"}
              </Button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="container max-w-[64rem] mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold leading-none tracking-tight">
                    Cancellation Audit: {result.url}
                  </h3>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-bold ${result.score > 7 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                  >
                    Difficulty Score: {result.score}/10
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Analysis by Nova 2 Lite
                </p>
              </div>
              <div className="p-6 pt-0 grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Detailed Steps:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {result.steps.map((step: string, i: number) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dark Patterns Detected:</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.darkPatterns.map((pattern: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      >
                        {pattern}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button className="w-full" size="lg">
                      <Zap className="mr-2 h-4 w-4" />
                      Auto-Cancel with Nova Act
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Requires browser automation permissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 max-w-screen-2xl"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Built for the Amazon Nova AI Hackathon to demonstrate agentic
            capabilities in consumer protection.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 text-center">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <ShieldAlert className="h-12 w-12 text-primary mx-auto" />
              <div className="space-y-2">
                <h3 className="font-bold">Dark Pattern Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Nova 2 Lite analyzes HTML to find hidden "unsubscribe" links.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Zap className="h-12 w-12 text-primary mx-auto" />
              <div className="space-y-2">
                <h3 className="font-bold">Automated Navigation</h3>
                <p className="text-sm text-muted-foreground">
                  Nova Act clicks through the 14 confirmation screens for you.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Lock className="h-12 w-12 text-primary mx-auto" />
              <div className="space-y-2">
                <h3 className="font-bold">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  Your credentials never leave your local browser session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
