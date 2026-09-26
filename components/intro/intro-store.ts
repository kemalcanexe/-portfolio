// Lets the hero wait for the preloader. Resolves immediately when the
// preloader is skipped (returning visitor or reduced motion).
let done = false;
const waiting: (() => void)[] = [];

export function whenIntroDone(cb: () => void) {
  if (done) cb();
  else waiting.push(cb);
}

export function finishIntro() {
  if (done) return;
  done = true;
  waiting.splice(0).forEach((cb) => cb());
}

export const INTRO_KEY = "ny-intro-seen";
