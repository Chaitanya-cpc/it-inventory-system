// This file provides the necessary type declarations for React JSX

import * as React from 'react';

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}

// Add Next.js module declarations
declare module 'next' {
  export type Metadata = {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

declare module 'next/font/google' {
  export interface FontOptions {
    subsets?: string[];
    weight?: string | string[];
    style?: string | string[];
    display?: string;
  }

  export function Inter(options: FontOptions): {
    className: string;
    style: React.CSSProperties;
  };
}

declare module 'react-hot-toast' {
  export interface ToasterProps {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    toastOptions?: Record<string, any>;
    reverseOrder?: boolean;
    gutter?: number;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
  }
  
  export function Toaster(props: ToasterProps): JSX.Element;
  
  const toast: {
    (message: string | React.ReactNode, options?: any): string;
    success: (message: string | React.ReactNode, options?: any) => string;
    error: (message: string | React.ReactNode, options?: any) => string;
    loading: (message: string | React.ReactNode, options?: any) => string;
    dismiss: (toastId?: string) => void;
  };
  
  export { toast };
}

declare module 'next/link' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    legacyBehavior?: boolean;
    className?: string;
    children: ReactNode;
  }
  
  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/navigation' {
  export function useRouter(): {
    push: (url: string, options?: any) => Promise<boolean>;
    replace: (url: string, options?: any) => Promise<boolean>;
    prefetch: (url: string) => Promise<void>;
    back: () => void;
    forward: () => void;
  };
  
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
} 