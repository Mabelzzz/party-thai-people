import "leaflet";

declare module "leaflet" {
  interface Map {
    _fullscreenControlAdded?: boolean;
  }

  // ประกาศ type ของ options สำหรับ fullscreen
  interface FullscreenOptions {
    position?: string;
    title?: {
      false?: string;
      true?: string;
    };
    titleCancel?: string;
    titleFullscreen?: string;
    forceSeparateButton?: boolean;
    forcePseudoFullscreen?: boolean;
  }

  // ประกาศ type ของ control.fullscreen
  namespace control {
    function fullscreen(options?: FullscreenOptions): Control;
  }
}
