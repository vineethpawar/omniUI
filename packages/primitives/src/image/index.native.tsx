/**
 * Image (native). RN <Image> with the same prop shape as web.
 */
import { forwardRef, useState } from "react";
import { Image as RNImage, View, type ImageProps as RNImageProps, type ImageStyle, type ViewStyle } from "react-native";
import { useTheme } from "@plyxui/styles";
import { radius as radiusTokens, type RadiusKey } from "@plyxui/core";

export type ImageFit = "cover" | "contain" | "stretch" | "center";

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  fit?: ImageFit;
  radius?: RadiusKey | number;
  placeholder?: React.ReactNode;
  fallback?: React.ReactNode;
  style?: ImageStyle;
}

export const Image = forwardRef<RNImage, ImageProps>(function Image(
  { src, alt, width, height, aspectRatio, fit = "cover", radius, fallback, style },
  ref,
) {
  const { colors } = useTheme();
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  const radiusValue =
    typeof radius === "number" ? radius : radius ? radiusTokens[radius] : undefined;

  const containerStyle: ViewStyle = {
    width,
    height,
    aspectRatio,
    borderRadius: radiusValue,
    overflow: "hidden",
    backgroundColor: state === "loading" ? colors.containerFill : undefined,
  };

  if (state === "error" && fallback) {
    return <View style={containerStyle}>{fallback}</View>;
  }

  return (
    <View style={containerStyle}>
      <RNImage
        ref={ref}
        source={{ uri: src }}
        accessibilityLabel={alt}
        resizeMode={fit as RNImageProps["resizeMode"]}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
        style={{ width: "100%", height: "100%", opacity: state === "loaded" ? 1 : 0, ...style }}
      />
    </View>
  );
});
