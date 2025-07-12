import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PostPage from "./pages/PostPage";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import { Footer } from "./components/Footer";
import { queryClient } from "./lib/axios";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Navbar />
      <div className="pt-16 overflow-x-hidden">
        {" "}
        {/* Add padding to account for fixed navbar */}
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
