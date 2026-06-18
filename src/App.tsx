/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Aperture, 
  Film, 
  Camera, 
  Settings, 
  Mail, 
  Compass, 
  Layers, 
  Menu, 
  X, 
  Cpu, 
  MapPin, 
  Phone, 
  Tv, 
  Clock, 
  MessageSquare,
  Instagram,
  Youtube,
  Dribbble,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Info
} from 'lucide-react';

import ColorGradingConsole from './components/ColorGradingConsole';
import PortfolioGrid from './components/PortfolioGrid';
import ServicesCalculator from './components/ServicesCalculator';
import { EQUIPMENT_ITEMS } from './data';

export default function App() {
  const [selectedGearId, setSelectedGearId] = useState<string>(EQUIPMENT_ITEMS[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('grading');

  // Contact form simple local state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const activeGear = EQUIPMENT_ITEMS.find(g => g.id === selectedGearId) || EQUIPMENT_ITEMS[0];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 4500);
  };

  return (
    <div id="chroma-app" className="bg-zinc-950 text-white font-sans antialiased selection:bg-pink-500 selection:text-white min-h-screen overflow-x-hidden relative">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none z-0 animate-grid" />

      {/* Global Alert Header */}
      <div className="w-full bg-zinc-900 border-b border-zinc-800 py-2 px-4 flex items-center justify-between text-[11px] font-mono text-zinc-400 z-50 relative select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
          <span>BROADCAST PROFILE: P3 WIDE COLOR GAMUT ACTIVE (10-BIT PIPELINE)</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span>LATENCY: 4ms (COMPUTING VIA GPU)</span>
          <span className="text-zinc-600">|</span>
          <span>LOCATION: TOKYO / GLOBAL OPERATOR</span>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/60 transition-all select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand with rotating aperture icon on hover */}
          <a href="#hero-banner" className="flex items-center gap-2.5 group cursor-pointer">
            <span className="relative flex items-center justify-center p-2 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-pink-500 transition-all group-hover:scale-105">
              <Aperture className="w-5.5 h-5.5 text-zinc-100 group-hover:text-pink-500 group-hover:rotate-180 transition-all duration-700" />
              <span className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 blur-md rounded-xl transition-opacity" />
            </span>
            <div className="flex flex-col">
              <span className="text-md font-display font-bold tracking-widest text-white leading-none">
                CHROMA<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">LENS</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">
                Cine-Photography Studio
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider font-medium text-zinc-400">
            <a href="#grading-station" className="hover:text-white transition-colors flex items-center gap-1 hover:border-b hover:border-pink-500 py-1">
              <Settings className="w-3.5 h-3.5" /> Grading Block
            </a>
            <a href="#creative-portfolio" className="hover:text-white transition-colors flex items-center gap-1 hover:border-b hover:border-pink-500 py-1">
              <Camera className="w-3.5 h-3.5" /> Portfolio
            </a>
            <a href="#camera-rigs" className="hover:text-white transition-colors flex items-center gap-1 hover:border-b hover:border-pink-500 py-1">
              <Cpu className="w-3.5 h-3.5" /> Specs Rig
            </a>
            <a href="#booking-lab" className="hover:text-white transition-colors flex items-center gap-1 hover:border-b hover:border-pink-500 py-1">
              <Calendar className="w-3.5 h-3.5" /> Calculator
            </a>
          </div>

          {/* Connect Button */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="#contact-desk"
              className="px-4 py-2 text-xs font-mono rounded-lg border border-zinc-800 text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              Inquire Project
            </a>
            <a 
              href="#booking-lab"
              className="px-4 py-2 text-xs font-mono rounded-lg bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Secure Session
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Flyout Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-zinc-900 bg-zinc-950 px-4 pt-2 pb-6 space-y-4 font-mono text-xs text-zinc-400"
            >
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                href="#grading-station" 
                className="block hover:text-white py-2 border-b border-zinc-900"
              >
                Grading Console Lab
              </a>
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                href="#creative-portfolio" 
                className="block hover:text-white py-2 border-b border-zinc-900"
              >
                Photography Portfolio
              </a>
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                href="#camera-rigs" 
                className="block hover:text-white py-2 border-b border-zinc-900"
              >
                Specifications & Rigs
              </a>
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                href="#booking-lab" 
                className="block hover:text-white py-2 border-b border-zinc-900"
              >
                Estimator & Booking
              </a>
              <div className="flex gap-2 pt-2">
                <a 
                  onClick={() => setMobileMenuOpen(false)} 
                  href="#contact-desk"
                  className="flex-1 text-center py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                >
                  Message
                </a>
                <a 
                  onClick={() => setMobileMenuOpen(false)} 
                  href="#booking-lab"
                  className="flex-1 text-center py-2.5 bg-white text-zinc-950 font-bold rounded-lg"
                >
                  Book Session
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Parallax Hero Spotlight Display Section */}
      <section id="hero-banner" className="relative w-full min-h-[85vh] flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden z-10 select-none">
        
        {/* Widescreen image acting as blurred/glowing backlight */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/neon_tokyo_street_1781757711299.jpg"
            alt="Tokyo street backlight"
            className="w-full h-full object-cover blur-3xl opacity-20 scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Linear crushing filters */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Widescreen Hero Container Grid */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Block (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="px-3 py-1 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 text-pink-400 font-mono text-[10px] tracking-widest font-semibold uppercase rounded-full inline-flex items-center gap-1.5 shadow-sm leading-none">
              <Sparkles className="w-3 h-3 text-pink-400 animate-spin" /> High Definition Anamorphic Optics
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-medium text-white tracking-tight leading-[0.95]">
              We capture <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 font-bold">humanity</span> in prism chromence.
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base md:text-md max-w-xl font-sans leading-relaxed">
              CHROMA LENS is an award-winning creative collective focusing on saturated high-contrast photography and large-format cinematic videography. We build physical atmospheres out of light, shadows, and 100-megapixel raw focal matrices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#grading-station" 
                className="px-6 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-pink-500/15 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01]"
              >
                Live Color Grading Room <ArrowUpRight className="w-4 h-4" />
              </a>
              <a 
                href="#creative-portfolio" 
                className="px-6 py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Browse Photographics <Camera className="w-4 h-4" />
              </a>
            </div>

            {/* Micro Camera Specs list */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-zinc-900 max-w-lg">
              <div className="flex flex-col text-left">
                <span className="text-white font-mono text-lg font-bold">100MP</span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Dynamic depth</span>
              </div>
              <div className="flex flex-col text-left border-l border-zinc-900 pl-4">
                <span className="text-white font-mono text-lg font-bold">15+ Stop</span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Dynamic Range</span>
              </div>
              <div className="flex flex-col text-left border-l border-zinc-900 pl-4">
                <span className="text-white font-mono text-lg font-bold">8K RAW</span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Master Dailies</span>
              </div>
            </div>
          </div>

          {/* Right Widescreen Interactive Frame View (5 Columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950 group">
              {/* Main Tokyo background */}
              <img
                src="/src/assets/images/neon_tokyo_street_1781757711299.jpg"
                alt="Tokyo neon portrait shot"
                className="w-full h-full object-cover select-none transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Viewfinder crosshairs overlays */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none text-[8px] font-mono text-white/50">
                <div className="flex justify-between items-center bg-black/40 px-2 py-1 rounded">
                  <span>SHUTTER: 1/48s</span>
                  <span>AV AUTO</span>
                </div>
                {/* Crosshairs center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border border-white/20 rounded flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-pink-500" />
                  </div>
                </div>
                <div className="flex justify-between items-center bg-black/40 px-2 py-1 rounded">
                  <span>ISO 12800</span>
                  <span className="text-emerald-400">REC ●</span>
                </div>
              </div>

              {/* Float specs overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur border border-zinc-808/80 rounded-xl p-3 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded bg-black border border-zinc-800 select-none">
                    <Film className="w-4 h-4 text-pink-500" />
                  </span>
                  <div className="text-left">
                    <h5 className="font-sans text-[11px] font-bold text-white">Neon Pulse of Tokyo</h5>
                    <p className="text-[9px] font-mono text-zinc-400">ARRI Alexa Mini / Cooke S7 Prime</p>
                  </div>
                </div>
                <a
                  href="#grading-station"
                  className="p-1.5 rounded bg-pink-500 hover:bg-pink-600 text-white text-[10px] font-mono font-bold tracking-wider transition-colors inline-block text-center cursor-pointer"
                >
                  Grade Live
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Live Color Grading Console */}
      <section id="grading-station" className="relative z-20 border-t border-zinc-900 bg-zinc-900/10">
        <ColorGradingConsole />
      </section>

      {/* Portfolio Grid Section */}
      <section id="creative-portfolio" className="relative z-20 bg-zinc-950">
        <PortfolioGrid />
      </section>

      {/* Professional Specs & Gear Rigs Deck */}
      <section id="camera-rigs" className="relative z-20 w-full max-w-7xl mx-auto py-16 px-4 md:px-8 border-t border-zinc-900">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-pink-500 font-mono text-xs tracking-widest font-semibold uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Optics Inventory
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mt-1">
              Active Cinema Rigs
            </h2>
            <p className="text-zinc-400 text-sm mt-1.5 max-w-2xl">
              We own and operate state-of-the-art cinematic hardware. Every sensor format is calibrated in-house to render precise, multi-chromatic lookups with absolute pixel integrity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Gear selector (5 columns) */}
          <div className="lg:col-span-5 space-y-2.5">
            {EQUIPMENT_ITEMS.map((gear) => {
              const isSelected = selectedGearId === gear.id;
              return (
                <button
                  key={gear.id}
                  onClick={() => setSelectedGearId(gear.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected 
                      ? 'bg-zinc-900 border-pink-500 ring-1 ring-pink-500/10 shadow-lg' 
                      : 'bg-zinc-950 border-zinc-808 hover:bg-zinc-950/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`p-2.5 rounded-lg border text-zinc-300 transition-colors ${isSelected ? 'bg-zinc-950 border-pink-500/20 text-pink-400' : 'bg-zinc-900 border-zinc-800'}`}>
                      <Aperture className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white font-sans">{gear.name}</h4>
                      <span className="text-[9px] font-mono text-zinc-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 uppercase mt-0.5 inline-block">
                        {gear.type} specs
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">
                    {gear.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed readout screen mimicking cinema diagnostics (7 columns) */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Top Diagnostics HUD row */}
            <div className="bg-zinc-950 px-5 py-3 border-b border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> CORE ENGINE: CONNECTED</span>
              <span>DEV PORTAL RIGS DECK: v2.4</span>
            </div>

            {/* Specs read board */}
            <div className="p-6 md:p-8 space-y-6">
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-pink-500 font-mono text-xs font-semibold tracking-wider uppercase">
                    Rig Specification readout
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight mt-1">
                    {activeGear.name}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-850 font-mono text-[9px] text-zinc-400 uppercase">
                  {activeGear.type} catalog
                </span>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {activeGear.description}
              </p>

              {/* Tech Spec matrix */}
              <div>
                <h5 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-3">
                  Technical Hardware Profile
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeGear.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-950 border border-zinc-900 font-mono text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      <span className="text-zinc-300">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cinema Profile Warning banner */}
              <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/10 flex gap-3 text-left">
                <Info className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-zinc-400 leading-normal">
                  All equipment operates with redundant backup setups in duplicate storage slots (dual-cards sync) ensuring absolutely zero loss on and off high-risk sets. Fully licensed for drone flight.
                </p>
              </div>

            </div>

            {/* Bottom Deck buttons */}
            <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">STATUS: CALIBRATED WEEKLY</span>
              <button 
                onClick={() => {
                  alert(`Cinematographer details locked for ${activeGear.name}! Let's specify this rig on your next booking session.`);
                }}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                Require Rig
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Shoot custom package booking Estimator */}
      <section id="services-estimator" className="relative z-20">
        <ServicesCalculator />
      </section>

      {/* General Contact Desk Inquire Section */}
      <section id="contact-desk" className="relative z-20 w-full max-w-4xl mx-auto py-16 px-4 md:px-8 border-t border-zinc-900">
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-3xl text-center relative overflow-hidden">
          {/* Subtle color highlight */}
          <span className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl pointer-events-none rounded-full" />
          <span className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

          <span className="text-pink-500 font-mono text-xs tracking-widest font-semibold uppercase flex items-center justify-center gap-1.5 mb-2">
            <Mail className="w-3.5 h-3.5" /> Direct Workspace
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-medium text-white tracking-tight">
            Have a custom script or layout?
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm mt-3 max-w-xl mx-auto">
            Our director coordinates with directors, brands, and creative houses. Send your shoot locations, storyboards, or format requests directly to our Tokyo hub desk.
          </p>

          <form onSubmit={handleContactSubmit} className="mt-8 max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Sender / Representative Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Booking Workspace Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <div>
              <textarea
                required
                rows={4}
                placeholder="Outline your shoot format: location criteria, budget outlines, desired look LUT properties... "
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={msgSent}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs font-mono font-bold rounded-xl tracking-wider uppercase transition-all shadow-md shadow-pink-500/10 cursor-pointer disabled:opacity-50"
            >
              {msgSent ? "Message Log Sent Safely!" : "Transmit Desk Message"}
            </button>
          </form>

          <AnimatePresence>
            {msgSent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 max-w-md mx-auto p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
              >
                <span className="text-xs text-emerald-400 font-sans">
                  📡 Transmitted! ChromaLens directors verified your dispatch. Check your inbox under the registered address shortly.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick numbers list */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t border-zinc-800/80 font-mono text-[10px] text-zinc-500">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-pink-500" /> desk@chromalens.visuals
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-pink-500" /> Shibuya, Tokyo, Japan
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-pink-500" /> +81 (3) 5456-XXXX
            </span>
          </div>

        </div>

      </section>

      {/* Production Footer block */}
      <footer className="relative z-20 w-full bg-zinc-950 border-t border-zinc-900 py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo brand and desc col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                <Aperture className="w-5 h-5 text-pink-500" />
              </span>
              <span className="text-sm font-display font-bold tracking-widest text-white uppercase">
                CHROMA<span className="text-pink-500">LENS</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              Crafting fine-art photography landscapes, immersive high-contrast studio lookbooks, and widescreen 8K anamorphic cinemagraph elements. Broadcasted globally under standardized Rec.2020 matrices.
            </p>
            <div className="flex gap-3 pt-1">
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"><Dribbble className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Links col */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-zinc-400 font-bold uppercase tracking-wider">Navigation</h4>
            <div className="flex flex-col gap-2 text-zinc-500">
              <a href="#grading-station" className="hover:text-white transition-colors">LUT Grading Station</a>
              <a href="#creative-portfolio" className="hover:text-white transition-colors">Portfolio Artifacts</a>
              <a href="#camera-rigs" className="hover:text-white transition-colors">Cinema Gear Specs</a>
              <a href="#booking-lab" className="hover:text-white transition-colors">Rates Estimator</a>
            </div>
          </div>

          {/* License specifications col */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-zinc-400 font-bold uppercase tracking-wider">Tech License</h4>
            <div className="text-zinc-500 space-y-1 bg-zinc-900/40 p-3 rounded-lg border border-zinc-900 leading-relaxed">
              <p>Apple ProRes & ProRes RAW licensed compatible encoder curves.</p>
              <p className="mt-1">REDCODE RAW standard lookup. Hasselblad HNCS precision calibrated profiles.</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-zinc-900/60 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-zinc-505 gap-4 select-none">
          <p className="text-zinc-600">
            © {new Date().getFullYear()} ChromaLens Studio. All physical and digital rights reserved. Crafted for wide P3 color-gamuts.
          </p>
          <div className="flex gap-4 text-zinc-500">
            <a href="#" className="hover:underline">Legal Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">RAW Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Co-branding</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
