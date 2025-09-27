// noop shim for native-only libs
export default {};
export const defaultExport = {};

// Common named exports that might be imported
export const Canvas = () => null;
export const Path = () => null;
export const Skia = {};
export const SkPath = {};
export const enableScreens = () => {};
export const MaterialIcons = {};
export const Icon = () => null;
