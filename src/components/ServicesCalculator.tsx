/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Sparkles, 
  Clock, 
  Video, 
  MapPin, 
  DollarSign, 
  Sliders, 
  Package, 
  FileText, 
  Image, 
  UserCheck,
  Send,
  CheckCircle2
} from 'lucide-react';
import { SERVICE_PACKAGES } from '../data';

export default function ServicesCalculator() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(SERVICE_PACKAGES[1].id);
  const [hours, setHours] = useState<number>(8);
  const [selectedStyle, setSelectedStyle] = useState<string>('teal-orange');
  
  // Custom deliverables checkboxes
  const [deliverables, setDeliverables] = useState({
    drone: true,
    socialClips: false,
    rawBypass: false,
    rushProcess: false
  });

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Selected package details helper
  const selectedPackage = useMemo(() => {
    return SERVICE_PACKAGES.find(p => p.id === selectedPackageId) || SERVICE_PACKAGES[0];
  }, [selectedPackageId]);

  // Adjust default hours based on selected package
  React.useEffect(() => {
    if (selectedPackageId === 'premium-advertising') {
      setHours(12);
    } else if (selectedPackageId === 'fashion-editorial') {
      setHours(8);
    } else {
      setHours(4);
    }
  }, [selectedPackageId]);

  // Pricing formula computation
  const finalPrice = useMemo(() => {
    let price = selectedPackage.basePrice;
    
    // Scale with extra hours
    const baseHoursForPackage = selectedPackageId === 'premium-advertising' ? 10 : selectedPackageId === 'fashion-editorial' ? 8 : 4;
    const hourDff = hours - baseHoursForPackage;
    if (hourDff > 0) {
      price += hourDff * 175; // $175 per additional hour of shoot
    }

    // Extra deliverables additions
    if (deliverables.drone) price += 450;
    if (deliverables.socialClips) price += 250;
    if (deliverables.rushProcess) price += 350;
    
    return price;
  }, [selectedPackage, hours, selectedPackageId, deliverables]);

  // Color profiling options affecting UI colors
  const moodGrades = [
    { id: 'teal-orange', label: 'Teal & Orange', color: 'from-orange-400 to-cyan-500', desc: 'Saturated warm skin & icy cyan contrast' },
    { id: 'cyber-neon', label: 'Chroma Neon', color: 'from-fuchsia-400 to-indigo-500', desc: 'Vaporwave purple tones & neon electric accents' },
    { id: 'vintage-sepia', label: 'Ektachrome 70s', color: 'from-amber-600 to-yellow-500', desc: 'Nostalgic film curves & golden light grains' },
    { id: 'nordic-cool', label: 'Nordic Crisp', color: 'from-sky-400 to-zinc-400', desc: 'Desaturated, high exposure, winter breeze' },
    { id: 'noir-mono', label: 'Sartorial Noir', color: 'from-zinc-100 to-zinc-800', desc: 'True dynamic monochrome, silver luster shadows' }
  ];

  const activeMoodColor = useMemo(() => {
    return moodGrades.find(m => m.id === selectedStyle) || moodGrades[0];
  }, [selectedStyle]);

  const toggleDeliverable = (key: keyof typeof deliverables) => {
    setDeliverables(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormName('');
      setFormEmail('');
    }, 4000);
  };

  return (
    <div id="booking-lab" className="w-full max-w-7xl mx-auto py-16 px-4 md:px-8 border-t border-zinc-900 bg-zinc-950/40 relative">
      
      {/* Background ambient circular overlay which shifts color when selectedStyle changes! */}
      <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br ${activeMoodColor.color} opacity-[0.025] blur-3xl pointer-events-none rounded-full transition-all duration-700`} />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-zinc-900">
        <div>
          <span className="text-pink-500 font-mono text-xs tracking-widest font-semibold uppercase flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" /> Shoot Configurator
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mt-1">
            Shoot Quote Estimator
          </h2>
          <p className="text-zinc-400 text-sm mt-1.5 max-w-2xl">
            Choose a baseline artistic campaign, modify shooting intervals, choose drone/post deliverables, and configure your preferred color grading blueprint to calculate your dynamic project invoice.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Parameters adjustments (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Pick Baseline Package */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl">
            <h3 className="text-sm font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-pink-500" /> 1. Select baseline package
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SERVICE_PACKAGES.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected 
                        ? 'bg-zinc-950 border-white ring-1 ring-white/10 shadow-lg shadow-black/80' 
                        : 'bg-zinc-950/30 border-zinc-800/60 hover:bg-zinc-950 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 uppercase mb-2 inline-block">
                        {pkg.type}
                      </span>
                      <h4 className="text-xs font-sans font-bold text-white leading-snug line-clamp-2">
                        {pkg.name}
                      </h4>
                    </div>
                    <div className="mt-4 pt-2 border-t border-zinc-900 flex items-baseline gap-1">
                      <span className="text-[10px] text-zinc-500 font-mono">From</span>
                      <span className="text-sm text-white font-mono font-semibold">${pkg.basePrice}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Display active package details */}
            <div className="mt-4 p-4 rounded-xl bg-zinc-950/80 border border-zinc-900">
              <h5 className="text-[11px] font-mono text-zinc-400 mb-2">Package Baseline Inclusions:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedPackage.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dials & Hours */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl">
            <h3 className="text-sm font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-pink-500" /> 2. Shooting hours calibration
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs text-zinc-300 font-mono">
                <span>Capture Interval Duration</span>
                <span className="text-white bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded font-bold">
                  {hours} Hours Shoot
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full accent-pink-500 h-1 bg-zinc-950 rounded-lg cursor-ew-resize hover:accent-pink-400"
              />
              <p className="text-[10px] font-mono text-zinc-500">
                * baseline includes first {selectedPackageId === 'premium-advertising' ? '10' : selectedPackageId === 'fashion-editorial' ? '8' : '4'} hours. Additional session rates calculated at $175/hr. Includes multi-cam setups.
              </p>
            </div>
          </div>

          {/* Visual grading color code styling pick */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl">
            <h3 className="text-sm font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-pink-500" /> 3. Select look LUT styling mapping
            </h3>
            <p className="text-zinc-500 text-xs mb-4">
              Apply this aesthetic look profile to all video dailies, lookbook files, and prints.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {moodGrades.map((grade) => {
                const isActive = selectedStyle === grade.id;
                return (
                  <button
                    key={grade.id}
                    onClick={() => setSelectedStyle(grade.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-24 cursor-pointer ${
                      isActive 
                        ? 'bg-zinc-950 border-pink-500 shadow-md ring-1 ring-pink-500/10' 
                        : 'bg-zinc-950/30 border-zinc-805 hover:bg-zinc-950 hover:border-zinc-700'
                    }`}
                  >
                    {/* Visual gradient accent box */}
                    <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${grade.color} mb-2`} />
                    <div>
                      <h4 className="text-[11px] font-bold text-white font-sans">{grade.label}</h4>
                      <p className="text-[9px] text-zinc-500 line-clamp-2 leading-relaxed mt-0.5">{grade.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extra Addons checkboxes */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-2xl">
            <h3 className="text-sm font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-500" /> 4. Deliverable Expansion Addons
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-900 cursor-pointer hover:bg-zinc-900/50 transition-colors select-none">
                <input
                  type="checkbox"
                  checked={deliverables.drone}
                  onChange={() => toggleDeliverable('drone')}
                  className="mt-1 accent-pink-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">8K Drone & Aerial Operator (+$450)</h4>
                  <p className="text-[10px] text-zinc-500">Includes complete dynamic fly-overs and scenic 8K RAW frames</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-900 cursor-pointer hover:bg-zinc-900/50 transition-colors select-none">
                <input
                  type="checkbox"
                  checked={deliverables.socialClips}
                  onChange={() => toggleDeliverable('socialClips')}
                  className="mt-1 accent-pink-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">9:16 Mobile Social-Cuts (+$250)</h4>
                  <p className="text-[10px] text-zinc-500">Tailored portrait edits for fast social network publishing</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-900 cursor-pointer hover:bg-zinc-900/50 transition-colors select-none">
                <input
                  type="checkbox"
                  checked={deliverables.rushProcess}
                  onChange={() => toggleDeliverable('rushProcess')}
                  className="mt-1 accent-pink-500"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">72h Express Post-Rush (+$350)</h4>
                  <p className="text-[10px] text-zinc-500">Accelerated assembly, sound design, color mastering, and uploads</p>
                </div>
              </label>

              <div className="p-3 rounded-xl bg-zinc-950/20 border border-dashed border-zinc-900 flex items-center justify-center text-center">
                <p className="text-[10px] font-mono text-zinc-500 leading-normal">
                  All contracts include standard high-fidelity prints and clean digital drive links at zero extra cost.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Price Card & Contact Form (5 Columns) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          
          {/* Animated Billing Card */}
          <div className="bg-zinc-900 border border-zinc-805 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Sliding colorful top bar */}
            <div className={`h-2.5 bg-gradient-to-r ${activeMoodColor.color} transition-all duration-700`} />

            <div className="p-6">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-950 border border-zinc-800 rounded px-2 py-0.5 inline-block mb-3 select-none">
                Campaign Quote Summary
              </span>
              
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">
                Estimated Invoice Amount
              </h3>
              
              <div className="flex items-baseline gap-1 text-white mb-6">
                <span className="text-3xl font-mono font-extrabold">$</span>
                <span className="text-5xl font-mono font-black tracking-tight">{finalPrice.toLocaleString()}</span>
                <span className="text-xs font-mono text-zinc-500 ml-2">USD total</span>
              </div>

              {/* Itemized list */}
              <div className="space-y-3 font-mono text-xs border-t border-b border-zinc-800/80 py-5 my-5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Base Pack:</span>
                  <span className="text-white line-clamp-1 max-w-[180px]">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Session Hours ({hours}h):</span>
                  <span className="text-white">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Color Grading Lookup:</span>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeMoodColor.color} font-bold`}>
                    {activeMoodColor.label}
                  </span>
                </div>

                {deliverables.drone && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">+ Aerial Drone Shoot:</span>
                    <span className="text-emerald-400">+$450</span>
                  </div>
                )}
                {deliverables.socialClips && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">+ Social reels Cuts:</span>
                    <span className="text-emerald-400">+$250</span>
                  </div>
                )}
                {deliverables.rushProcess && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">+ 72h Priority Rush:</span>
                    <span className="text-emerald-400">+$350</span>
                  </div>
                )}
              </div>

              {/* Form trigger submission */}
              <form onSubmit={handleSubmitBooking} className="space-y-3">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-pink-500" /> Lock this look & book
                </h4>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Identify yourself / Brand name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Contact Email Address"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-bounce" /> Shoot Draft Secured!
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Book Session & Finalize LUT
                    </>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center"
                  >
                    <p className="text-xs text-emerald-400 font-sans leading-relaxed">
                      Thank you! Our director has secured your <strong>{activeMoodColor.label}</strong> parameters configuration and will contact you via email within 12 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Quick FAQ info item */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl font-sans">
            <h5 className="text-xs font-bold text-white mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-pink-500" /> Intellectual Rights & Ownership
            </h5>
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              Upon final settlement, clients acquire unlimited, forever non-exclusive global exhibition rights for commercials, web, and prints. Complete RAW camera file archives can be secured upon separate licensing briefs.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
