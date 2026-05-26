import { cva, type VariantProps } from "class-variance-authority";

/**
 * Box variants. Kept deliberately small for the foundation commit.
 * Stack, Flex, and Center will land later as either Box variants
 * or as siblings; not sure which I prefer yet.
 */
export const boxConfig = cva("omni-box", {
  variants: {
    surface: {
      none: "",
      primary: "omni-box--surface-primary",
      raised:  "omni-box--surface-raised",
      sunken:  "omni-box--surface-sunken",
    },
    padding: {
      none: "",
      sm: "omni-box--pad-sm",
      md: "omni-box--pad-md",
      lg: "omni-box--pad-lg",
    },
    radius: {
      none: "",
      sm: "omni-box--radius-sm",
      md: "omni-box--radius-md",
      lg: "omni-box--radius-lg",
      pill: "omni-box--radius-pill",
    },
  },
  defaultVariants: {
    surface: "none",
    padding: "none",
    radius: "none",
  },
});

export type BoxVariants = VariantProps<typeof boxConfig>;
