/**
 * Image (web). Thin wrapper around <img> with theme-aware skeleton, fit,
 * and an optional fallback when the URL fails.
 *
 *   <Image src={user.avatar} alt={user.name} width={32} height={32} radius="pill" />
 *
 * Aspect ratio takes precedence over width/height when both are set;
 * useful for responsive cards where you want a 16/9 slot regardless of
 * the actual image size.
 */
import { forwardRef, useState, type CSSProperties, type ImgHTMLAttributes, type ReactNode } from "react";
import { useTheme } from "@plyxui/styles";
import { radius as radiusTokens, type RadiusKey } from "@plyxui/core";

export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";

export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  /** Aspect ratio in CSS form, e.g. "16 / 9" or 1.5. Wins over width+height when both are set. */
  aspectRatio?: string | number;
  /** object-fit. Default "cover". */
  fit?: ImageFit;
  /** Radius token from @plyxui/core, or a raw pixel value. */
  radius?: RadiusKey | number;
  /** Rendered while the image is loading. Defaults to a theme-colored skeleton. */
  placeholder?: ReactNode;
  /** Rendered when the image fails to load. */
  fallback?: ReactNode;
  style?: CSSProperties;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    src,
    alt,
    width,
    height,
    aspectRatio,
    fit = "cover",
    radius,
    placeholder,
    fallback,
    style,
    ...rest
  },
  ref,
) {
  const { colors } = useTheme();
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  const radiusValue =
    typeof radius === "number" ? radius : radius ? radiusTokens[radius] : undefined;

  const containerStyle: CSSProperties = {
    position: "relative",
    display: "inline-block",
    width,
    height,
    aspectRatio: aspectRatio as CSSProperties["aspectRatio"],
    borderRadius: radiusValue,
    overflow: radiusValue ? "hidden" : undefined,
    background: state === "loading" ? colors.containerFill : undefined,
    lineHeight: 0,
  };

  if (state === "error" && fallback) {
    return (
      <span style={containerStyle} aria-label={alt} role="img">
        {fallback}
      </span>
    );
  }

  return (
    <span style={containerStyle}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit,
          display: "block",
          borderRadius: radiusValue,
          opacity: state === "loaded" ? 1 : 0,
          transition: "opacity 0.18s ease",
          ...style,
        }}
        {...rest}
      />
      {state === "loading" && !placeholder ? null : null}
      {state === "loading" && placeholder ? (
        <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          {placeholder}
        </span>
      ) : null}
    </span>
  );
});
