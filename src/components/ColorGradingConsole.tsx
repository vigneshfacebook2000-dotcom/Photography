/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  Tv, 
  Upload, 
  RefreshCw, 
  Copy, 
  Check, 
  Download,
  Flame, 
  Focus,
  Volume2,
  FileImage,
  Sparkles
} from 'lucide-react';
import { FilterValues, LUTPreset } from '../types';
import { LUT_PRESETS, PORTFOLIO_ITEMS } from '../data';

export default function ColorGradingConsole() {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(PORTFOLIO_ITEMS[0].url);
  const [activePreset, setActivePreset] = useState<string>('bypass');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const gradingContainerRef = useRef<HTMLDivElement>(null);

  // Initialize filters
  const [filters, setFilters] = useState<FilterValues>({
    exposure: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    tint: 0,
    vignette: 10,
    blur: 0,
    sepia: 0,
    hueRotate: 0
  });

  // Apply a selected LUT preset to our controls
  const handleApplyPreset = (preset: LUTPreset) => {
    setActivePreset(preset.id);
    const newFilters = {
      ...LUT_PRESETS.find(p => p.id === 'bypass')!.filterValues as FilterValues,
      ...preset.filterValues
    };
    setFilters(newFilters);
  };

  // Reset sliders to Rec.709 Standard
  const handleReset = () => {
    handleApplyPreset(LUT_PRESETS.find(p => p.id === 'bypass')!);
  };

  // Drag and drop photo upload
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setSelectedPhoto(event.target.result as string);
            setActivePreset('custom');
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPhoto(event.target.result as string);
          setActivePreset('custom');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Export LUT as parameters
  const handleCopyLUT = () => {
    const settingsText = `// ChromaLens Cinematic LUT Data
export const CustomLUT = {
  exposure: ${filters.exposure},
  contrast: ${filters.contrast},
  saturation: ${filters.saturation},
  temperature: ${filters.temperature},
  tint: ${filters.tint},
  vignette: ${filters.vignette},
  sepia: ${filters.sepia},
  hueRotate: ${filters.hueRotate}
};
// CSS filter applied:
filter: brightness(${100 + filters.exposure}%) contrast(${100 + filters.contrast}%) saturate(${100 + filters.saturation}%) sepia(${filters.sepia}%) hue-rotate(${filters.hueRotate}deg);`;

    navigator.clipboard.writeText(settingsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert grading adjustments to inline style CSS filters
  const getFilterStyle = () => {
    const brightnessVal = 100 + filters.exposure;
    const contrastVal = 100 + filters.contrast;
    const saturateVal = 100 + filters.saturation;
    const sepiaVal = filters.sepia;
    const hueVal = filters.hueRotate;
    const blurVal = filters.blur;

    return {
      filter: `brightness(${brightnessVal}%) contrast(${contrastVal}%) saturate(${saturateVal}%) sepia(${sepiaVal}%) hue-rotate(${hueVal}deg) blur(${blurVal}px)`
    };
  };

  // Build the live interactive SVG Histogram based on actual filter sliders
  // We compute three waves (Red, Green, Blue) that react organically
  const generateHistogramPath = (color: 'red' | 'green' | 'blue') => {
    // Width is 300, Height is 120
    const points: string[] = [];
    const controlOffset = color === 'red' ? 5 : color === 'green' ? 0 : -5;
    
    // Sliders affect skewing, heights, peaks
    const exposureFactor = filters.exposure / 100; // -1 to 1
    const contrastFactor = filters.contrast / 100; // -1 to 1
    const saturationFactor = filters.saturation / 100; // -1 to 1
    const tempFactor = filters.temperature / 50; // -1 to 1
    const tintFactor = filters.tint / 50; // -1 to 1

    // Determine curve behavior based on channel color
    let shiftX = exposureFactor * 50;  // moves overall light right/left
    let heightMultiplier = 1;
    let skew = 0;

    if (color === 'red') {
      shiftX += tempFactor * 30 + tintFactor * 10;
      heightMultiplier += saturationFactor * 0.2 + contrastFactor * 0.1;
      skew = -contrastFactor * 10;
    } else if (color === 'green') {
      shiftX += -tintFactor * 25;
      heightMultiplier += (1 - Math.abs(tempFactor)) * 0.1;
    } else if (color === 'blue') {
      shiftX += -tempFactor * 30 + tintFactor * 15;
      heightMultiplier += saturationFactor * 0.3 - contrastFactor * 0.1;
      skew = contrastFactor * 10;
    }

    // Base control points for bezier curve mimicking professional histogram curves
    const b0_x = 0;
    const b0_y = 120;

    // We can define 5 nodes for a smoother multi-peak spectrum look
    const segments = 4;
    const step = 300 / segments;

    for (let i = 0; i <= segments; i++) {
      const baseX = i * step;
      let y = 120; // zero baseline

      if (i === 0) {
        points.push(`M 0,120`);
      } else if (i === 1) {
        // Shadow/Black point
        const h = Math.max(20, Math.min(100, 60 * heightMultiplier - (exposureFactor * 40)));
        const cx = baseX + shiftX + skew;
        points.push(`Q ${cx - 20},${120 - h} ${cx},${120 - h * 0.8}`);
      } else if (i === 2) {
        // Midtones peak
        const h = Math.max(10, Math.min(115, 85 * heightMultiplier + (contrastFactor * 20)));
        const cx = baseX + shiftX;
        points.push(`T ${cx},${Math.max(5, 120 - h)}`);
      } else if (i === 3) {
        // Highlights peak
        const h = Math.max(15, Math.min(100, 50 * heightMultiplier + (exposureFactor * 50)));
        const cx = baseX + shiftX - skew;
        points.push(`T ${cx},${120 - h}`);
      } else if (i === 4) {
        // White point
        points.push(`T 300,120`);
      }
    }

    points.push(`L 300,120 Z`);
    return points.join(' ');
  };

  return (
    <div id="grading-station" className="w-full max-w-7xl mx-auto py-12 px-4 md:px-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-zinc-800">
        <div>
          <span className="text-pink-500 font-mono text-xs tracking-widest font-semibold uppercase flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" /> Interactive Lab
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight mt-1">
            Studio Color Grading Console
          </h2>
          <p className="text-zinc-400 text-sm mt-1.5 max-w-2xl">
            Experience real-time photographic color science. Select our generated high-fidelity camera shots—or drop in your own photos—and apply cinematic LUT matrix filters. Watch the interactive SVG histogram shift dynamically.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs font-mono transition-all hover:bg-zinc-800 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Rec.709
          </button>
          <button
            onClick={handleCopyLUT}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg text-xs font-mono transition-all shadow-sm shadow-pink-500/25 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-lime-300" /> Settings Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Export LUT Configuration
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Video/Image Canvas viewport */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div 
            ref={gradingContainerRef}
            className={`relative rounded-2xl overflow-hidden aspect-video bg-zinc-950 border-2 transition-all shadow-2xl flex items-center justify-center ${
              dragActive ? 'border-pink-500 scale-[1.01]' : 'border-zinc-800/80 hover:border-zinc-700/80'
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {/* Live Filter Applied Image */}
            <img
              src={selectedPhoto}
              alt="Live Screen"
              style={getFilterStyle()}
              className="w-full h-full object-cover select-none transition-filter duration-75"
              referrerPolicy="no-referrer"
              id="grading-canvas"
            />

            {/* Custom Vignette overlay based on filter slider value */}
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-75"
              style={{
                background: `radial-gradient(circle, transparent ${100 - filters.vignette}%, rgba(0,0,0,0.85) ${100 + (filters.vignette * 0.5)}%)`
              }}
            />

            {/* Cinematic crop overlays option when portrait ratio is selected, standard letterboxes */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-black/80 backdrop-blur-[1px] border-b border-zinc-900 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/80 backdrop-blur-[1px] border-t border-zinc-900 pointer-events-none" />

            {/* Drag & Drop Visual HUD overlay */}
            <AnimatePresence>
              {dragActive && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center border-4 border-dashed border-pink-500 rounded-xl pointer-events-none z-10 p-6 text-center"
                >
                  <Upload className="w-16 h-16 text-pink-500 animate-bounce mb-3" />
                  <p className="text-white text-lg font-display font-medium">Drop picture in color bay!</p>
                  <p className="text-zinc-400 text-xs mt-1">Accepts any raw local image safely</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active LUT Badge */}
            <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur border border-zinc-700/80 text-[10px] font-mono text-zinc-300 rounded px-2 py-1 flex items-center gap-1.5 shadow-lg select-none">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              Active Look: <span className="text-white font-semibold uppercase">{activePreset}</span>
            </div>

            {/* File upload prompt trigger on hover */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-black/75 hover:bg-black/90 backdrop-blur border border-zinc-700/90 hover:border-pink-500 text-white rounded-lg p-2 transition-all shadow-md group hover:scale-105 cursor-pointer"
                title="Upload custom image to color grade"
              >
                <Upload className="w-4 h-4 text-zinc-300 group-hover:text-pink-400" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Source Selection bar */}
          <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/60">
            <h4 className="text-xs font-mono text-zinc-400 mb-2 flex items-center gap-1">
              <Tv className="w-3 h-3 text-pink-500" /> Source Selection: Choose a camera shot to grade
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {PORTFOLIO_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedPhoto(item.url);
                    // Retain current dials but bypass preset highlights
                  }}
                  className={`relative rounded-lg overflow-hidden aspect-video border transition-all cursor-pointer ${
                    selectedPhoto === item.url 
                      ? 'border-pink-500 ring-2 ring-pink-500/25' 
                      : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-700'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-1 flex items-end">
                    <span className="text-[9px] font-mono font-medium text-white line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Direct Upload Prompt */}
            <div className="mt-3 text-center border border-dashed border-zinc-800 rounded-lg p-2.5 bg-zinc-950/20 hover:bg-zinc-950/40 transition-colors pointer-events-auto">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 w-full font-sans cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
                Want to grade your own photo? <span className="text-pink-500 hover:underline">Click here to upload your file</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Creative grading console & histogram */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Real-time Interactive SVG Histogram */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Live RGB Histogram
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Rec.709 Vector Scope [LUT: {activePreset}]</span>
            </div>
            
            {/* Histogram Plot */}
            <div className="relative w-full h-28 bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden px-1 flex items-end">
              {/* Grid backgrounds */}
              <div className="absolute inset-0 grid grid-cols-4 gap-0 pointer-events-none opacity-10">
                <div className="border-r border-dashed border-white" />
                <div className="border-r border-dashed border-white" />
                <div className="border-r border-dashed border-white" />
                <div className="border-r border-dashed border-white" />
              </div>
              <div className="absolute inset-0 grid grid-rows-3 gap-0 pointer-events-none opacity-10">
                <div className="border-b border-dashed border-white" />
                <div className="border-b border-dashed border-white" />
                <div className="border-b border-dashed border-white" />
              </div>

              {/* Channels */}
              <svg className="w-full h-full overflow-visible pointer-events-none absolute bottom-0 inset-x-0" viewBox="0 0 300 120" preserveAspectRatio="none">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Blue Path */}
                <path 
                  d={generateHistogramPath('blue')} 
                  fill="url(#blueGrad)" 
                  stroke="#3b82f6" 
                  strokeWidth="1.5" 
                  className="transition-all duration-300 ease-out" 
                />
                
                {/* Green Path */}
                <path 
                  d={generateHistogramPath('green')} 
                  fill="url(#greenGrad)" 
                  stroke="#10b981" 
                  strokeWidth="1.5" 
                  className="transition-all duration-300 ease-out" 
                />

                {/* Red Path */}
                <path 
                  d={generateHistogramPath('red')} 
                  fill="url(#redGrad)" 
                  stroke="#ef4444" 
                  strokeWidth="1.5" 
                  className="transition-all duration-300 ease-out" 
                />
              </svg>

              {/* Baseline marker text */}
              <div className="absolute bottom-1 left-2 text-[8px] font-mono text-zinc-500">Shadows</div>
              <div className="absolute bottom-1 left-[45%] text-[8px] font-mono text-zinc-500">Midtones</div>
              <div className="absolute bottom-1 right-2 text-[8px] font-mono text-zinc-500">Highlights</div>
            </div>
          </div>

          {/* Hollywood Cinematic Presets (LUT Selection) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl">
            <h3 className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-pink-500" /> Cinematic Look-Up-Tables (LUT Preset Matrix)
            </h3>
            
            <div className="grid grid-cols-2 gap-2.5">
              {LUT_PRESETS.map((preset) => {
                const isSelected = activePreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                      isSelected 
                        ? 'bg-zinc-950 border-pink-500 ring-1 ring-pink-500/20 shadow-lg' 
                        : 'bg-zinc-950/40 border-zinc-800/80 hover:bg-zinc-950 hover:border-zinc-700'
                    }`}
                  >
                    {/* Tiny glowing background for active */}
                    {isSelected && (
                      <span className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${preset.themeColor} opacity-5 blur-xl pointer-events-none`} />
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-sans font-medium text-white group-hover:text-pink-400 transition-colors">
                        {preset.name}
                      </span>
                      <span className="text-[8px] font-mono text-zinc-500 bg-zinc-905 px-1 py-0.5 rounded border border-zinc-800 uppercase">
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Granular Sliders Console */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl">
            <h3 className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-pink-500" /> Granular Analog Dial Corrections
            </h3>

            <div className="space-y-4">
              {/* Exposure Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs text-zinc-300 font-mono">
                  <span>Exposure (ISO Brightness)</span>
                  <span className={filters.exposure > 0 ? "text-pink-400" : filters.exposure < 0 ? "text-cyan-400" : "text-zinc-500"}>
                    {filters.exposure > 0 ? `+${filters.exposure}` : filters.exposure}%
                  </span>
                </div>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  value={filters.exposure}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, exposure: parseInt(e.target.value) }));
                    setActivePreset('custom');
                  }}
                  className="w-full accent-pink-500 h-1 bg-zinc-950 rounded-lg cursor-ew-resize hover:accent-pink-400 transition-colors"
                />
              </div>

              {/* Contrast Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs text-zinc-300 font-mono">
                  <span>Contrast Curve</span>
                  <span className={filters.contrast > 0 ? "text-pink-400" : filters.contrast < 0 ? "text-cyan-400" : "text-zinc-500"}>
                    {filters.contrast > 0 ? `+${filters.contrast}` : filters.contrast}%
                  </span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="70"
                  value={filters.contrast}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, contrast: parseInt(e.target.value) }));
                    setActivePreset('custom');
                  }}
                  className="w-full accent-pink-500 h-1 bg-zinc-950 rounded-lg cursor-ew-resize-horizontal hover:accent-pink-400 transition-colors"
                />
              </div>

              {/* Saturation Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs text-zinc-300 font-mono">
                  <span>Chroma Saturation</span>
                  <span className={filters.saturation > 0 ? "text-pink-400" : filters.saturation < 0 ? "text-cyan-400" : "text-zinc-500"}>
                    {filters.saturation > 0 ? `+${filters.saturation}` : filters.saturation}%
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={filters.saturation}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, saturation: parseInt(e.target.value) }));
                    setActivePreset('custom');
                  }}
                  className="w-full accent-pink-500 h-1 bg-zinc-950 rounded-lg cursor-ew-resize hover:accent-pink-400 transition-colors"
                />
              </div>

              {/* Temperature Slider - custom slider colors */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs text-zinc-300 font-mono">
                  <span>Color Temp (Kelvin shift)</span>
                  <span className={filters.temperature > 0 ? "text-amber-400" : filters.temperature < 0 ? "text-sky-400" : "text-zinc-500"}>
                    {filters.temperature > 0 ? `+${filters.temperature}K (Warm)` : filters.temperature < 0 ? `${filters.temperature}K (Cool)` : '0K (Neutral)'}
                  </span>
                </div>
                {/* Visual gradient track background to represent temp */}
                <div className="relative w-full">
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={filters.temperature}
                    onChange={(e) => {
                      const temp = parseInt(e.target.value);
                      // Update temperature, simulated as custom hue rotate & sepia
                      setFilters(prev => ({ 
                        ...prev, 
                        temperature: temp,
                        // Mix a tiny bit of sepia for warmth or hue rotation for cold
                        sepia: temp > 0 ? Math.min(60, temp) : prev.sepia,
                        hueRotate: temp < 0 ? Math.round(180 + temp) : prev.hueRotate
                      }));
                      setActivePreset('custom');
                    }}
                    className="w-full accent-pink-500 h-1.5 rounded-lg cursor-ew-resize bg-gradient-to-r from-sky-500 via-zinc-800 to-amber-500 appearance-none pointer-events-auto"
                  />
                </div>
              </div>

              {/* Vignette Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs text-zinc-300 font-mono">
                  <span>Anamorphic Vignette (Edge Falloff)</span>
                  <span className="text-zinc-400">{filters.vignette}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={filters.vignette}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, vignette: parseInt(e.target.value) }));
                    setActivePreset('custom');
                  }}
                  className="w-full accent-pink-500 h-1 bg-zinc-950 rounded-lg cursor-ew-resize hover:accent-pink-400 transition-colors"
                />
              </div>

              {/* Focus Blur Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-xs text-zinc-300 font-mono">
                  <span>Bokeh Focus Blur (Optics Depth)</span>
                  <span className={filters.blur > 0 ? "text-pink-400" : "text-zinc-500"}>{filters.blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.blur}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, blur: parseFloat(e.target.value) }));
                    setActivePreset('custom');
                  }}
                  className="w-full accent-pink-500 h-1 bg-zinc-950 rounded-lg cursor-ew-resize hover:accent-pink-400 transition-colors"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-5 p-2 bg-zinc-950 rounded-lg border border-zinc-800/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-1" />
              <span className="text-[10px] font-mono text-zinc-400 leading-normal">
                Using web-hardware filters. Computations run locally on your GPU for zero-latency slider rendering.
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
