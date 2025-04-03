// Type declarations for modules without TypeScript definitions

declare module 'axios' {
  export interface AxiosRequestConfig {
    headers?: Record<string, string>;
    [key: string]: any;
  }
  
  export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig;
    request?: any;
  }
  
  export interface AxiosError<T = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
  }
  
  export interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<AxiosResponse>;
    (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    defaults: AxiosRequestConfig;
    interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>;
      response: AxiosInterceptorManager<AxiosResponse>;
    };
    getUri(config?: AxiosRequestConfig): string;
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>;
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  }
  
  export interface AxiosInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
  }
  
  export function create(config?: AxiosRequestConfig): AxiosInstance;
  export function isCancel(value: any): boolean;
  export function all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
  export function spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
  
  const axios: AxiosInstance & {
    create: typeof create;
    isCancel: typeof isCancel;
    all: typeof all;
    spread: typeof spread;
  };
  
  export default axios;
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

declare module 'react-hot-toast' {
  import { ReactNode } from 'react';
  
  export interface ToasterProps {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    toastOptions?: Record<string, any>;
    reverseOrder?: boolean;
    gutter?: number;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
  }
  
  export function Toaster(props: ToasterProps): JSX.Element;
  
  export type ToastFunction = (message: string | ReactNode, options?: Record<string, any>) => string;
  export type DismissFunction = (toastId?: string) => void;

  export const toast: {
    (message: string | ReactNode, options?: Record<string, any>): string;
    success: ToastFunction;
    error: ToastFunction;
    loading: ToastFunction;
    dismiss: DismissFunction;
  };
}

declare namespace React {
  interface ReactNode {
    // Basic types that ReactNode accepts
    string: string;
    number: number;
    boolean: boolean;
  }
  
  interface FormEvent<T = Element> extends SyntheticEvent<T> {
    // Add anything needed for form events
  }
  
  interface JSX {
    IntrinsicElements: Record<string, any>;
  }
}

declare module '@heroicons/react/*' {
  import { ComponentType, SVGProps } from 'react';
  const Icon: ComponentType<SVGProps<SVGSVGElement>>;
  export default Icon;
}

// Add process.env type definition for Next.js
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
    [key: string]: string | undefined;
  }
} 