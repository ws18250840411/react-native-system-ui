import React from "react";
import Svg, { G } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

export type IconProps = SvgProps & {
    size?: number;
    color?: string;
    secondaryColor?: string;
};

type RenderFn = (options: {
    color: string;
    secondaryColor: string;
}) => React.ReactNode;

export function createIcon(render: RenderFn, viewBox: string = "0 0 24 24") {
    const Icon: React.FC<IconProps> = ({
        size = 24,
        color = "#111827",
    secondaryColor = "#FFFFFF",
        children,
        ...rest
    }) => {
        return (
            <Svg
                width={size}
                height={size}
                viewBox={viewBox}
                fill="none"
                accessibilityRole="image"
                {...rest}
            >
                <G>{render({ color, secondaryColor })}</G>
                {children}
            </Svg>
        );
    };

    Icon.displayName = "SystemIcon";

    return React.memo(Icon);
}
