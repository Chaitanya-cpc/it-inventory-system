/// <reference types="react-scripts" />

interface SyntheticEvent<T = Element> {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget & T;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget & T;
  timeStamp: number;
  type: string;
}

interface FormEvent<T = Element> extends SyntheticEvent<T> {
  target: EventTarget & T;
}

// Add this to help with the FormEvent import issue
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 