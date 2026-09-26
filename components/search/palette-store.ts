// Tiny global open/close signal for the command palette, so any button can open it.
type Listener = (open: boolean) => void;
const listeners = new Set<Listener>();

export function openPalette() {
  listeners.forEach((l) => l(true));
}

export function onPalette(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
