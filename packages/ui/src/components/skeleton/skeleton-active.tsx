import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing } from "react-native";

import Theme from "../../theme";

import type { SkeletonTheme } from "./style";
import { varCreator } from "./style";

const OUTPUT_RANGE = [0.55, 1];
const DURATION = 900;

export const useSkeletonPulse = (theme?: Partial<SkeletonTheme>) => {
    const [CV] = Theme.useStyle({
        varCreator,
        theme,
    });

    const animated = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: DURATION,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(animated, {
                    toValue: 0,
                    duration: DURATION,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        );

        loop.start();
        return () => {
            loop.stop();
        };
    }, [animated]);

    const animatedStyle = useMemo(
        () => ({
            opacity: animated.interpolate({
                inputRange: [0, 1],
                outputRange: OUTPUT_RANGE,
            }),
        }),
        [animated],
    );

    return {
        animatedStyle,
        baseColor: CV.skeleton_color,
        activeColor: CV.skeleton_color_active,
        vars: CV,
    };
};
