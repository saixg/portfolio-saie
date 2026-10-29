import { Cursor, Dock, Navbar, ProgressiveBlur } from './components/chrome';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Quote from './sections/Quote';
import Services from './sections/Services';
import About from './sections/About';
import Principles from './sections/Principles';
import Faq from './sections/Faq';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Quote />
        <Services />
        <About />
        <Principles />
        <Faq />
      </main>
      <Footer />
      <ProgressiveBlur />
      <Dock />
      <Cursor />
    </div>
  );
}
