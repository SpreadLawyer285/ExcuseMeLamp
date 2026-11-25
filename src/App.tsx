import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Backdrop from "./components/Backdrop";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LampProvider from "./components/LampProvider";
import Welcome from "./components/Welcome";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [welcome, setWelcome] = useState(true);
  const done = useCallback(() => setWelcome(false), []);

  return (
    <BrowserRouter>
      <LampProvider>
        <ScrollToTop />
        <Backdrop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {welcome && <Welcome onDone={done} />}
      </LampProvider>
    </BrowserRouter>
  );
}
