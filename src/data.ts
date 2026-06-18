/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, LUTPreset, EquipmentItem, ServicePackage } from './types';

// Let's reference our generated images. We'll use robust fallback URLs just in case.
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'tokyo-neon',
    title: 'Neon Pulse of Tokyo',
    category: 'urban',
    type: 'video',
    url: '/src/assets/images/neon_tokyo_street_1781757711299.jpg',
    camSettings: {
      camera: 'Sony FX3 Cinema Line',
      lens: 'Sony FE 35mm f/1.4 GM',
      shutter: '1/48s (180° Shutter)',
      aperture: 'f/1.6',
      iso: '12800 (Dual Base ISO)',
      profile: 'S-Log3 / S-Cinetone'
    },
    colorPalette: ['#06b6d4', '#ec4899', '#3b82f6', '#0f172a'],
    accentColor: 'from-cyan-400 to-pink-500'
  },
  {
    id: 'golden-waterfalls',
    title: 'Emerald Cascade at Golden Hour',
    category: 'nature',
    type: 'photo',
    url: '/src/assets/images/golden_waterfall_1781757728471.jpg',
    camSettings: {
      camera: 'Hasselblad X2D 100C Medium Format',
      lens: 'XCD 28mm f/4 Lightweight',
      shutter: '1.2s (Long Exposure)',
      aperture: 'f/11',
      iso: '64',
      profile: 'Hasselblad Natural Color Solution (HNCS)'
    },
    colorPalette: ['#10b981', '#f59e0b', '#047857', '#78350f'],
    accentColor: 'from-emerald-400 to-amber-500'
  },
  {
    id: 'powder-movement',
    title: 'Chromatic Velocity Portrait',
    category: 'fashion',
    type: 'photo',
    url: '/src/assets/images/powder_portrait_1781757745426.jpg',
    camSettings: {
      camera: 'Canon EOS R5',
      lens: 'RF 85mm f/1.2L USM',
      shutter: '1/1600s (High Speed Sync)',
      aperture: 'f/1.2',
      iso: '100',
      profile: 'Canon Log 3 / Neutral'
    },
    colorPalette: ['#f43f5e', '#a855f7', '#eab308', '#1e1b4b'],
    accentColor: 'from-rose-500 to-violet-500'
  },
  {
    id: 'highway-trails',
    title: 'Streams of Kinetic Energy',
    category: 'cinematic',
    type: 'video',
    url: '/src/assets/images/light_trails_1781757761809.jpg',
    camSettings: {
      camera: 'RED V-Raptor 8K VV',
      lens: 'Cooke S7/i 50mm Full Frame Cine',
      shutter: '1/24s (Slow Shutter Blur)',
      aperture: 'f/5.6',
      iso: '800 (Native)',
      profile: 'REDCODE RAW (R3D) / RC1 RG4'
    },
    colorPalette: ['#3b82f6', '#8b5cf6', '#ef4444', '#111827'],
    accentColor: 'from-blue-500 to-purple-600'
  },
  {
    id: 'sunset-coast',
    title: 'Cyan Horizon Breakwater',
    category: 'nature',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1200&q=80',
    camSettings: {
      camera: 'Sony A7R V',
      lens: 'FE 16-35mm f/2.8 GM II',
      shutter: '1/250s',
      aperture: 'f/4',
      iso: '100',
      profile: 'S-Gamut3.Cine'
    },
    colorPalette: ['#0891b2', '#0369a1', '#f97316', '#0f172a'],
    accentColor: 'from-cyan-500 to-orange-400'
  },
  {
    id: 'cyberpunk-alleyway',
    title: 'Electric Rain Reflection',
    category: 'urban',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
    camSettings: {
      camera: 'ARRI Alexa Mini LF',
      lens: 'Signature Prime 40mm T1.8',
      shutter: '1/48s (180°)',
      aperture: 'T2.0',
      iso: '1600',
      profile: 'ARRIRAW / LogC4'
    },
    colorPalette: ['#d946ef', '#6366f1', '#06b6d4', '#111827'],
    accentColor: 'from-fuchsia-500 to-indigo-500'
  }
];

export const LUT_PRESETS: LUTPreset[] = [
  {
    id: 'bypass',
    name: 'Rec.709 Standard',
    description: 'Zero correction. Dynamic and crisp native exposure curve.',
    badge: 'RAW Bypass',
    themeColor: 'from-slate-400 to-slate-200',
    filterValues: {
      exposure: 0,
      contrast: 0,
      saturation: 0,
      temperature: 0,
      tint: 0,
      vignette: 10,
      blur: 0,
      sepia: 0,
      hueRotate: 0
    }
  },
  {
    id: 'teal-orange',
    name: 'Teal & Orange',
    description: 'Complementary skin tones paired with cold cyan shadows, popular in cinema.',
    badge: 'Hollywood Look',
    themeColor: 'from-orange-400 to-cyan-500',
    filterValues: {
      exposure: 5,
      contrast: 20,
      saturation: 15,
      temperature: 15,  // warm
      tint: -15,         // greenish-cyan tint
      vignette: 25,
      blur: 0,
      sepia: 5,
      hueRotate: 0
    }
  },
  {
    id: 'cyber-neon',
    name: 'Chroma Neon & Acid',
    description: 'Vibrant cyberpunk violet tones and glowing neon-soaked acid color matrix.',
    badge: 'Retro-Futurism',
    themeColor: 'from-fuchsia-400 to-emerald-400',
    filterValues: {
      exposure: 0,
      contrast: 30,
      saturation: 45,
      temperature: -20, // cool
      tint: 25,          // magentas
      vignette: 15,
      blur: 0,
      sepia: 0,
      hueRotate: 280
    }
  },
  {
    id: 'vintage-warm',
    name: 'Ektachrome 1974',
    description: 'Fade highlights, heavy sepia tone, rich saturation, reminiscent of vintage grain film.',
    badge: 'Analogue Nostalgia',
    themeColor: 'from-amber-600 to-amber-400',
    filterValues: {
      exposure: 8,
      contrast: -10,
      saturation: -15,
      temperature: 25,
      tint: 10,
      vignette: 40,
      blur: 0,
      sepia: 40,
      hueRotate: 15
    }
  },
  {
    id: 'nordic-crisp',
    name: 'Nordic Crisp',
    description: 'Desaturated warm tones, heavy emerald focus and ice cold blue water aesthetics.',
    badge: 'Scandi Minimalist',
    themeColor: 'from-sky-400 to-zinc-400',
    filterValues: {
      exposure: 15,
      contrast: 10,
      saturation: -20,
      temperature: -25, // deep cold
      tint: -20,         // greener
      vignette: 30,
      blur: 0,
      sepia: 0,
      hueRotate: 180
    }
  },
  {
    id: 'noir-dramatic',
    name: 'High-Contrast Noir',
    description: 'Dramatic black & white with crushing dark shadows, silver highlights, and moody vignetting.',
    badge: 'Sartorial Monochrome',
    themeColor: 'from-neutral-800 to-neutral-400',
    filterValues: {
      exposure: -5,
      contrast: 60,
      saturation: -100, // True black and white
      temperature: 0,
      tint: 0,
      vignette: 55,
      blur: 0,
      sepia: 10,  // slight silver warmth
      hueRotate: 0
    }
  }
];

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: 'arri-alexa',
    name: 'ARRI Alexa Mini LF',
    type: 'body',
    specs: ['Large Format 4.5K Sensor', '15+ Stops Dynamic Range', 'ARRIRAW Recording', 'LPL Mount'],
    description: 'The golden standard of cinematic storytelling. Its color science captures human skin tones with legendary nuance and smoothness.',
    badge: 'Primary Cinema'
  },
  {
    id: 'hasselblad-x2d',
    name: 'Hasselblad X2D 100C',
    type: 'body',
    specs: ['100 Megapixel Back-Illuminated Medium Format', '5-Axis 7-Stop IBIS', '1TB Internal SSD', '16-bit Color Depth'],
    description: 'A masterpiece of precision. Captures images with rich, deep medium format contrast, providing unprecedented depth and realism.',
    badge: 'Ultra-High Resolution'
  },
  {
    id: 'sony-fx3',
    name: 'Sony FX3',
    type: 'body',
    specs: ['Full Frame 12.1 MP Exmor R', 'Dual Base ISO 800/12800', '4K 120p Recording', 'Fast Hybrid AF'],
    description: 'The ultimate compact run-and-gun camera. Outstanding low-light performance lets us shoot under absolute dark conditions with stunning clarity.',
    badge: 'Low-Light Specialist'
  },
  {
    id: 'lens-chef',
    name: 'Cooke S7/i Primes Set',
    type: 'lens',
    specs: ['Cinematic "Cooke Look"', 'T2.0 Aperture', 'Outstanding Flare Control', '9-Blade Iris'],
    description: 'Lenses that capture organic portraits with gentle warmth, cinematic spherical falloff, and unparalleled micro-contrast.',
    badge: 'Anamorphic/Spherical'
  },
  {
    id: 'drone-inspire',
    name: 'DJI Inspire 3 Drone',
    type: 'drone',
    specs: ['Full-Frame 8K ProRes RAW / CinemaDND', 'Dual-Native ISO', 'Centimeter-Level RTK GPS', '80km/h Top Speed'],
    description: 'Full frame aerial cinema. Allows us to shoot epic cinematic establishing runs, high tracking shots, and raw scenic motion in 8K.',
    badge: 'Aerial Cinema Rig'
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'premium-advertising',
    name: 'Cinematic Brand Campaign',
    description: 'High-production value commercial campaign consisting of 4K native storytelling reels, aerial captures, and pristine product captures.',
    basePrice: 4200,
    features: [
      'Full 4K commercial output (60s and 30s cut)',
      'Dual operators (Director + Assistant Cam)',
      '8K Drone establishment footage included',
      'Advanced Hollywood grading setup matched to brand logo',
      'Full custom soundtrack & licensing included'
    ],
    type: 'videography'
  },
  {
    id: 'fashion-editorial',
    name: 'Editorial & High Fashion Lookbook',
    description: 'Prismatic, color-focused high-contrast studio and outdoor portrait shoot tailored for avant-garde brands, lookbooks, and high-quality prints.',
    basePrice: 1800,
    features: [
      '8-hour interactive session in studio or on-location',
      'Hasselblad 100MP medium-format camera body',
      '30 fully graded & retouched select images',
      'Live color workspace preview & customer rating',
      'Commercial printing & publishing format releases'
    ],
    type: 'photography'
  },
  {
    id: 'architectural-nature',
    name: 'Scenic & Architectural Showcase',
    description: 'Crisp, high-fidelity HDR architectural photography and smooth real-estate walk-throughs capturing fine lighting, shadows, and physical spatial flow.',
    basePrice: 1200,
    features: [
      'Interior & exterior wide-angle custom coverage',
      'Ambient + flash dynamic brackets rendering',
      'Twilight / Golden Hour specialty setups',
      '15 high-res print files + HD interactive video tour',
      'Distortion correct workflow'
    ],
    type: 'hybrid'
  }
];
