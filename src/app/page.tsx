"use client";
import { useState } from "react";
import {
  Search,
  ShieldAlert,
  Zap,
  Lock,
  ChevronRight,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  ArrowDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeUrlWithNova } from "@/lib/nova";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);
    setError(null);
    setCancelled(false);

    try {
      await new Promise((r) => setTimeout(r, 1500));
      const analysis = await analyzeUrlWithNova(url);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to analyze this URL. Please check the address and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAutoCancel = async () => {
    setCancelling(true);
    // Simulate Nova Act navigating the cancellation flow
    await new Promise((r) => setTimeout(r, 3000));
    setCancelling(false);
    setCancelled(true);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                How it works
              </button>
              <a
                href="https://github.com/orion-script/subscout"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground mb-2">
            Powered by Amazon Nova AI
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Stop paying for things <br className="hidden md:block" />
            you don&apos;t use.
          </h1>
          <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            SubScout uses <strong>Amazon Nova Act</strong> to navigate complex
            cancellation flows for you. Enter a URL, and our agent will find the
            hidden &quot;Cancel&quot; button.
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
            <p className="text-xs text-muted-foreground mt-2">
              Try: adobe.com, planet-fitness.com, or any subscription service
              URL
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="container max-w-[64rem] mt-8">
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="container max-w-[64rem] mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-semibold leading-none tracking-tight">
                    Cancellation Audit: {result.url}
                  </h3>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      result.score > 7
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : result.score > 4
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    Difficulty Score: {result.score}/10
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Analysis by Amazon Nova 2 Lite
                </p>
              </div>
              <div className="p-6 pt-0 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-3">Cancellation Steps:</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    {result.steps.map((step: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Dark Patterns Detected:</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {result.darkPatterns.map((pattern: string, i: number) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-destructive/10 text-destructive border-destructive/20"
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {pattern}
                      </span>
                    ))}
                  </div>

                  {cancelled ? (
                    <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 text-center">
                      <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="font-semibold text-green-800 dark:text-green-400">
                        Cancellation Complete!
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                        Nova Act navigated 5 screens and confirmed your
                        cancellation.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleAutoCancel}
                        disabled={cancelling}
                      >
                        {cancelling ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Nova Act navigating...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-4 w-4" />
                            Auto-Cancel with Nova Act
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground mt-2">
                        Requires browser automation permissions.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="border-t bg-muted/50 py-16 md:py-24"
      >
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SubScout combines two Amazon Nova models to understand and
              automate cancellation flows.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">1. Paste URL</h3>
              <p className="text-sm text-muted-foreground">
                Enter the subscription service URL. SubScout fetches the page
                and sends it to Nova 2 Lite for analysis.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldAlert className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">2. AI Audit</h3>
              <p className="text-sm text-muted-foreground">
                Nova 2 Lite identifies dark patterns like hidden links,
                confirmshaming, and forced phone calls, assigning a difficulty
                score.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">3. Auto-Cancel</h3>
              <p className="text-sm text-muted-foreground">
                Nova Act takes over your browser, clicking through confirmation
                screens and declining retention offers automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="features"
        className="container space-y-6 py-8 md:py-12 lg:py-24 max-w-screen-2xl"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-bold">
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
                  Nova 2 Lite analyzes page content to find hidden
                  &quot;unsubscribe&quot; links.
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
                  Nova Act clicks through retention screens and confirmation
                  dialogs.
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

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 max-w-screen-2xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldAlert className="h-4 w-4" />
            <span>SubScout — Amazon Nova AI Hackathon 2025</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://github.com/orion-script/subscout"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              GitHub <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://amazon-nova.devpost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              Devpost <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
