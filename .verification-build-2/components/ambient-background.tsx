export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(77,231,255,0.12),transparent_34%),linear-gradient(180deg,#03070d_0%,#07111d_48%,#03070d_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="absolute left-[-10%] top-[12%] h-80 w-80 rounded-full bg-radial-cyan blur-3xl" />
      <div className="absolute right-[-10%] top-[24%] h-96 w-96 rounded-full bg-radial-magenta blur-3xl" />
      <div className="absolute bottom-[-14%] left-[18%] h-[28rem] w-[28rem] rounded-full bg-radial-cyan opacity-50 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,13,0.44)_72%,#03070d_100%)]" />
    </div>
  );
}
