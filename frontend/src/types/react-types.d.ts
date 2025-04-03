// Basic React type definitions without imports
declare namespace React {
  type ReactNode = 
    | string
    | number
    | boolean
    | null
    | undefined
    | React.ReactElement
    | React.ReactFragment
    | React.ReactPortal
    | Array<React.ReactNode>;
  
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
  
  type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    displayName?: string;
  }
  
  interface ComponentClass<P = {}, S = ComponentState> {
    new(props: P, context?: any): Component<P, S>;
    displayName?: string;
  }
  
  type ComponentState = any;
  
  class Component<P = {}, S = {}> {
    constructor(props: P, context?: any);
    props: Readonly<P>;
    state: Readonly<S>;
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
  }
  
  interface CSSProperties {
    [key: string]: any;
  }
  
  type Key = string | number;
  
  interface ReactFragment {
    children?: ReactNode;
  }
  
  interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
  }
  
  type JSXElementConstructor<P> = 
    | ((props: P) => ReactElement<any, any> | null)
    | (new (props: P) => Component<any, any>);
}

// Add global JSX namespace
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {}
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Next.js module declarations
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
  
  export const toast: {
    (message: string | React.ReactNode, options?: any): string;
    success: (message: string | React.ReactNode, options?: any) => string;
    error: (message: string | React.ReactNode, options?: any) => string;
    loading: (message: string | React.ReactNode, options?: any) => string;
    dismiss: (toastId?: string) => void;
  };
}

declare module 'next/link' {
  const Link: React.ComponentType<{
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
    children: React.ReactNode;
    [prop: string]: any;
  }>;
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