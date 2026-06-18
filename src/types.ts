/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FilterValues {
  exposure: number;     // -100 to 100
  contrast: number;     // -100 to 100
  saturation: number;   // -100 to 100
  temperature: number;  // -50 to 50 (warm/cool)
  tint: number;         // -50 to 50 (magenta/green)
  vignette: number;     // 0 to 100
  blur: number;         // 0 to 10
  sepia: number;        // 0 to 100
  hueRotate: number;    // 0 to 360
}

export interface LUTPreset {
  id: string;
  name: string;
  description: string;
  badge: string;
  themeColor: string; // Tailwind color class
  filterValues: Partial<FilterValues>;
}

export interface CamSettings {
  camera: string;
  lens: string;
  shutter: string;
  aperture: string;
  iso: string;
  profile: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'nature' | 'urban' | 'fashion' | 'cinematic';
  type: 'photo' | 'video';
  url: string;
  camSettings: CamSettings;
  colorPalette: string[]; // hex codes or tailwind color labels
  accentColor: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  features: string[];
  type: 'photography' | 'videography' | 'hybrid';
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: 'body' | 'lens' | 'drone' | 'stabilizer';
  specs: string[];
  description: string;
  badge: string;
}
