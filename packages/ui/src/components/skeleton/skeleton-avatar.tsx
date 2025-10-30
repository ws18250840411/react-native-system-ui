import React, { memo, useMemo } from "react";
import { Animated, View } from "react-native";

import type { SkeletonAvatarProps } from "./interface";
import { useSkeletonPulse } from "./skeleton-active";
const AnimatedView = Animated.createAnimatedComponent(View);

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
    theme,
    active = true,
    size = 40,
    shape = "circle",
    testID,
}) => {
    const { animatedStyle, baseColor, activeColor, vars } = useSkeletonPulse(theme);

    const baseStyle = useMemo(
        () => ({
            height: size,
            width: size,
            backgroundColor: baseColor,
            borderRadius:
                shape === "circle" ? size / 2 : vars.skeleton_avatar_border_radius,
        }),
        [baseColor, vars.skeleton_avatar_border_radius, shape, size],
    );

    if (active) {
        return (
            <AnimatedView
                testID={testID}
                style={[baseStyle, { backgroundColor: activeColor }, animatedStyle]}
            />
        );
    }

    return <View testID={testID} style={baseStyle} />;
};

export default memo(SkeletonAvatar);
