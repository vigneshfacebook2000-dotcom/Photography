/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Eye, 
  Maximize2, 
  X, 
  Layers, 
  Film, 
  Activity, 
  Compass, 
  Cpu, 
  SlidersHorizontal,
  Bookmark,
  Share2,
  Calendar,
  Grid
} from 'lucide-react';
import { PortfolioItem } from '../types';
import { PORTFOLIO_ITEMS } from '../data';

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [showMetadataTab, setShowMetadataTab] = useState<boolean>(true);

  const categories = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'urban', label: 'Urban & Neon' },
    { id: 'nature', label: 'Emerald Nature' },
    { id: 'fashion', label: 'Chroma Fashion' },
    { id: 'cinematic', label: 'Cinematic Cinema' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div id="creative-portfolio" className="w-full max-w-7xl mx-auto py-16 px-4 md:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-pink-500 font-mono text-xs tracking-widest font-semibold uppercase flex items-center justify-center gap-1.5">
          <Grid className="w-3.5 h-3.5 animate-pulse" /> Showcase
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mt-1">
          Chromance Artifacts
        </h2>
        <p className="text-zinc-400 mt-3 text-sm md:text-base">
          Browse our compiled works of fine-art photography and anamorphic cinematics. Click any thumbnail to expand the master scope and read deep technical metadata tags.
        </p>
      </div>

      {/* Categories Buttons Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-mono transition-all relative cursor-pointer border ${
                isActive 
                  ? 'bg-white text-zinc-950 border-white font-semibold' 
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border-zinc-800/80 hover:bg-zinc-800/60'
              }`}
            >
              {isActive && (
                <motion.span 
                  layoutId="activeCategoryDot"
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Portfolio Grid Layout */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className="group relative bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden aspect-[4/3] flex flex-col shadow-lg hover:shadow-2xl hover:shadow-pink-500/5 transition-all"
            >
              {/* Image box */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Gradient top-bottom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-900/40 to-transparent opacity-90 transition-opacity" />

                {/* Corner Type Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 text-[9px] font-mono font-medium text-zinc-300 rounded-full px-2.5 py-1 flex items-center gap-1">
                    {item.type === 'video' ? (
                      <>
                        <Film className="w-2.5 h-2.5 text-pink-400" /> CINE RAW
                      </>
                    ) : (
                      <>
                        <Camera className="w-2.5 h-2.5 text-emerald-400" /> PHOTO RAW
                      </>
                    )}
                  </span>
                </div>

                {/* Info Overlay (Visible always in subtle form, shifts up on hover) */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-10 transition-transform duration-300">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.accentColor}`} />
                    <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase">{item.category}</span>
                  </div>
                  
                  <h3 className="text-base font-display font-medium text-white group-hover:text-pink-400 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Shorter specs line */}
                  <p className="text-[11px] font-mono text-zinc-500 mt-1 flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-zinc-600" /> {item.camSettings.camera} · {item.camSettings.aperture}
                  </p>

                  {/* Palette Dots */}
                  <div className="flex gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0">
                    {item.colorPalette.map((color, idx) => (
                      <span 
                        key={idx} 
                        className="w-3 h-3 rounded-full border border-black/35 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={`Color Node: ${color}`}
                      />
                    ))}
                    <span className="text-[9px] font-mono text-zinc-400 ml-1">Color Grade palette</span>
                  </div>
                </div>

                {/* Eye Hover Zoom icon */}
                <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none">
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="p-3 rounded-full bg-white/95 text-zinc-950 pointer-events-auto transform scale-75 group-hover:scale-100 transition-all hover:bg-white flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer hover:shadow-xl shadow-pink-500/20"
                  >
                    <Maximize2 className="w-3.5 h-3.5" /> Scope Lens
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Immersive Camera Viewfinder Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4 md:p-6 backdrop-blur-md"
          >
            {/* Click outer region closes */}
            <div className="absolute inset-0" onClick={() => setSelectedItem(null)} />

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-6xl aspect-[16/9] lg:aspect-auto lg:h-[85vh] bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden flex flex-col lg:flex-row z-10 shadow-2xl shadow-pink-500/5"
            >
              
              {/* Left Column (8/12 equivalent): Viewfinder screen with lens grid, battery icons */}
              <div className="relative flex-1 bg-black flex items-center justify-center p-2 border-r border-zinc-800 overflow-hidden">
                
                {/* Live Image in center */}
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="max-w-full max-h-full object-contain rounded select-none shadow-2xl"
                  referrerPolicy="no-referrer"
                />

                {/* Simulated Camera Viewfinder Grid Layer */}
                <div className="absolute inset-4 border border-zinc-700/20 pointer-events-none flex flex-col justify-between p-4 font-mono text-[9px] text-zinc-400 select-none">
                  {/* Top viewfinder row */}
                  <div className="flex justify-between items-center bg-black/20 px-2 py-0.5 rounded">
                    <div className="flex items-center gap-3">
                      <span className="text-red-500 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> REC
                      </span>
                      <span>8K WIDE</span>
                      <span className="text-zinc-600">|</span>
                      <span>LT 4:2:2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">HNCS ENGAGED</span>
                      <span className="text-zinc-600">|</span>
                      <span>BATT: 98% [2h45m]</span>
                    </div>
                  </div>

                  {/* Corner brackets */}
                  <div className="absolute inset-20 border-l border-t border-zinc-500/20 w-8 h-8 pointer-events-none" />
                  <div className="absolute inset-20 top-auto border-l border-b border-zinc-500/20 w-8 h-8 pointer-events-none" />
                  <div className="absolute inset-20 left-auto border-r border-t border-zinc-500/20 w-8 h-8 pointer-events-none" />
                  <div className="absolute inset-20 left-auto top-auto border-r border-b border-zinc-500/20 w-8 h-8 pointer-events-none" />

                  {/* Center focus spot */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 border border-dashed border-pink-500/30 rounded flex items-center justify-center bg-pink-500/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500/50" />
                    </div>
                    <span className="text-[8px] font-mono text-pink-500/40 absolute mt-18">AUTOFOCUS LOCK</span>
                  </div>

                  {/* Bottom viewfinder details */}
                  <div className="flex justify-between items-center bg-black/20 px-2 py-0.5 rounded mt-auto">
                    <div className="flex gap-4">
                      <span>FPS: <strong className="text-white">23.976</strong></span>
                      <span>SHUTTER: <strong className="text-white">{selectedItem.camSettings.shutter}</strong></span>
                      <span>APERTURE: <strong className="text-white">{selectedItem.camSettings.aperture}</strong></span>
                    </div>
                    <div>
                      <span>ISO: <strong className="text-emerald-400">{selectedItem.camSettings.iso}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Close Button on Image Screen */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur border border-zinc-700/80 text-white rounded-full p-2.5 hover:bg-black/90 hover:border-pink-500 transition-all shadow-md cursor-pointer z-20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Right Column (4/12 equivalent): Technical spec readout deck */}
              <div className="w-full lg:w-96 bg-zinc-900 flex flex-col text-white">
                {/* Title & Stats Meta */}
                <div className="p-6 border-b border-zinc-800">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${selectedItem.accentColor}`} />
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest leading-none">{selectedItem.category} Artifact</span>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white tracking-tight leading-snug">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 italic leading-relaxed">
                    Custom graded capture utilizing deep-exposure anamorphic profiles and customized mechanical shutter indices.
                  </p>
                </div>

                {/* Tab layout inside inspector */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Camera EXIF read container */}
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-pink-500" /> Sensor & Optics Readout
                    </h4>
                    
                    <div className="space-y-2.5 font-mono text-xs">
                      <div className="flex justify-between items-center p-2.5 bg-zinc-950/60 rounded border border-zinc-800/80">
                        <span className="text-zinc-500 text-[11px]">CAMERA BODY</span>
                        <span className="text-white font-medium text-right">{selectedItem.camSettings.camera}</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-zinc-950/60 rounded border border-zinc-800/80">
                        <span className="text-zinc-500 text-[11px]">OPTICAL LENS</span>
                        <span className="text-white font-medium text-right">{selectedItem.camSettings.lens}</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-zinc-950/60 rounded border border-zinc-800/80">
                        <span className="text-zinc-500 text-[11px]">APERTURE</span>
                        <span className="text-emerald-400 font-medium">{selectedItem.camSettings.aperture}</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-zinc-950/60 rounded border border-zinc-800/80">
                        <span className="text-zinc-500 text-[11px]">SHUTTER SPEED</span>
                        <span className="text-white font-medium">{selectedItem.camSettings.shutter}</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-zinc-950/60 rounded border border-zinc-800/80">
                        <span className="text-zinc-500 text-[11px]">ISO SENSITIVITY</span>
                        <span className="text-amber-400 font-medium">{selectedItem.camSettings.iso}</span>
                      </div>
                      <div className="flex justify-between items-center p-2.5 bg-zinc-950/60 rounded border border-zinc-800/80">
                        <span className="text-zinc-500 text-[11px]">LOG PROFILE</span>
                        <span className="text-cyan-400 font-medium">{selectedItem.camSettings.profile}</span>
                      </div>
                    </div>
                  </div>

                  {/* Chroma balance palette */}
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-pink-500" /> Color Profile Palettes
                    </h4>
                    <p className="text-[11px] text-zinc-400 mb-3">
                      Extracted color temperature nodes from raw pixel matrices:
                    </p>
                    <div className="flex flex-col gap-2">
                      {selectedItem.colorPalette.map((color, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded bg-zinc-950/30 border border-zinc-800/50">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-4 h-4 rounded-full border border-black/30" 
                              style={{ backgroundColor: color }} 
                            />
                            <span className="font-mono text-xs text-white uppercase">{color}</span>
                          </div>
                          <span className="text-[9px] font-mono text-zinc-500">NODE {idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Creative Notes */}
                  <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
                    <h5 className="text-xs font-sans font-medium text-orange-400 flex items-center gap-1.5 mb-1">
                      <Activity className="w-3.5 h-3.5" /> High-Contrast Warning
                    </h5>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      This digital asset has been formatted for P3 wide color gamuts and 10-bit cinema-level screens. Color balance may shift depending on standard Rec.709 configurations.
                    </p>
                  </div>

                </div>

                {/* Footer close button */}
                <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      alert("Successfully locked portfolio asset!");
                    }}
                    className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-805 border border-zinc-800 hover:border-zinc-700 text-xs font-mono rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Bookmark Clip
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-6 py-2 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Close Log
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
