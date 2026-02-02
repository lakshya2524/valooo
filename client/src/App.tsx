import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Success from "@/pages/Success";
import Gallery from "@/pages/Gallery";
import SecretMessage from "@/pages/SecretMessage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/success" component={Success} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/secret-message" component={SecretMessage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
