import React, { memo, useMemo } from "react";
import { Animated, View } from "react-native";

import Space from "../space";

import type { SkeletonParagraphProps } from "./interface";
import { useSkeletonPulse } from "./skeleton-active";

const LINE_HEIGHT = 12;
const LINE_RADIUS = 6;

const SkeletonParagraph: React.FC<SkeletonParagraphProps> = ({
    theme,
    active = true,
    rows,
    widths,
    testID,
}) => {
    const { animatedStyle, baseColor, activeColor } = useSkeletonPulse(theme);

    const baseLineStyle = useMemo(
        () => ({
            height: LINE_HEIGHT,
            borderRadius: LINE_RADIUS,
            backgroundColor: baseColor,
        }),
        [baseColor],
    );

    const indices = useMemo(() => new Array(rows).fill(0).map((_, i) => i), [rows]);

    return (
        <Space testID={testID}>
            {indices.map(index => {
                const width = widths?.[index];
                const widthStyle = width ? { width: `${width}%` } : { width: "100%" };

                if (active) {
                    return (
                        <Animated.View
                            key={index}
                            style={[baseLineStyle, widthStyle, { backgroundColor: activeColor }, animatedStyle]}
                        />
                    );
                }

                return <View key={index} style={[baseLineStyle, widthStyle]} />;
            })}
        </Space>
    );
};

export default memo(SkeletonParagraph);
