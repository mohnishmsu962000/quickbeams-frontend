interface Window {
    fcWidget: {
      open: () => void;
      close: () => void;
      show: () => void;
      hide: () => void; 
      isOpen: () => boolean;
    };
  }