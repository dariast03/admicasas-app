import React from "react";
import { View } from "react-native";

const Separator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, children, ...props }, ref) => {
  return (
    <View ref={ref} className="h-1 bg-border" role="separator" {...props} />
  );
});

Separator.displayName = "Separator";

export { Separator };
