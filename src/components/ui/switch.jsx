import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
      ${props.checked ? "bg-violet-900" : "bg-gray-300"} ${className}`}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={`block h-5 w-5 rounded-full bg-white shadow-lg transition-transform
        ${props.checked ? "translate-x-6" : "translate-x-1"}`}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
