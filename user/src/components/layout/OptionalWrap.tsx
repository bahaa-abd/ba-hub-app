import { ComponentType, ReactNode, forwardRef } from "react";

export type OptionalWrapProps<T> = {
  Element: ComponentType<T>;
  ElementProps: T;
  wrap: boolean;
  children: ReactNode;
};

const OptionalWrap = forwardRef<HTMLDivElement, OptionalWrapProps<any>>(
  ({ Element, wrap, children, ElementProps }, ref) => {
    return wrap ? (
      <Element {...ElementProps}>{children}</Element>
    ) : (
      <div ref={ref}>{children}</div>
    );
  }
);

OptionalWrap.displayName = "OptionalWrap";

export default OptionalWrap;
