/// <reference types="vite/client" />

declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  export type LucideIcon = React.FC<LucideProps>;
  export const Heart: LucideIcon;
  export const Settings: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const User: LucideIcon;
  export const Compass: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Calendar: LucideIcon;
  export const History: LucideIcon;
  export const Info: LucideIcon;
  export const Scale: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const X: LucideIcon;
  export const Check: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Utensils: LucideIcon;
  export const UtensilsCrossed: LucideIcon;
  export const ChefHat: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Eye: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const Lock: LucideIcon;
  export const Mail: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const Search: LucideIcon;
  export const Filter: LucideIcon;
  export const XCircle: LucideIcon;
  export const Edit3: LucideIcon;
  export const Plus: LucideIcon;
  export const Trash2: LucideIcon;
  export const Clock: LucideIcon;
  export const Slash: LucideIcon;
  export const Download: LucideIcon;
  export const Monitor: LucideIcon;
  export const Smartphone: LucideIcon;
  export const Shield: LucideIcon;
  export const LogOut: LucideIcon;
  const icons: { [key: string]: LucideIcon };
  export default icons;
}

declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function doc(firestore: any, path: string, ...pathSegments: string[]): any;
  export function getDoc(reference: any): Promise<any>;
  export function setDoc(reference: any, data: any, options?: any): Promise<void>;
  export function updateDoc(reference: any, data: any): Promise<void>;
  export function collection(firestore: any, path: string, ...pathSegments: string[]): any;
  export function query(collection: any, ...queryConstraints: any[]): any;
  export function where(fieldPath: string, opStr: string, value: any): any;
  export function getDocs(query: any): Promise<any>;
}
