declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  type ConfettiFunction = (options?: ConfettiOptions) => Promise<null>;

  const confetti: ConfettiFunction & {
    create: (
      canvas: HTMLCanvasElement,
      options?: { resize?: boolean; useWorker?: boolean }
    ) => ConfettiFunction;
    reset: () => void;
  };

  export default confetti;
}

declare module 'react-share' {
  import { ComponentType, ReactNode } from 'react';

  interface ShareButtonProps {
    children: ReactNode;
    url: string;
    quote?: string;
    title?: string;
    summary?: string;
    hashtag?: string;
    hashtags?: string[];
    via?: string;
    media?: string;
    [key: string]: any;
  }

  export const FacebookShareButton: ComponentType<ShareButtonProps>;
  export const TwitterShareButton: ComponentType<ShareButtonProps>;
  export const LinkedinShareButton: ComponentType<ShareButtonProps>;
  export const PinterestShareButton: ComponentType<ShareButtonProps>;
  export const WhatsappShareButton: ComponentType<ShareButtonProps>;
  export const EmailShareButton: ComponentType<ShareButtonProps>;

  interface ShareIconProps {
    size?: number;
    round?: boolean;
    borderRadius?: number;
    bgStyle?: object;
    iconFillColor?: string;
  }

  export const FacebookIcon: ComponentType<ShareIconProps>;
  export const TwitterIcon: ComponentType<ShareIconProps>;
  export const LinkedinIcon: ComponentType<ShareIconProps>;
  export const PinterestIcon: ComponentType<ShareIconProps>;
  export const WhatsappIcon: ComponentType<ShareIconProps>;
  export const EmailIcon: ComponentType<ShareIconProps>;
}
