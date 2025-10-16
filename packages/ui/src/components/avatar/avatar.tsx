import React from "react";
import {
    Image,
    ImageProps,
    ImageStyle,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";
import { getInitials } from "react-native-system-utils";

export type AvatarProps = {
    /**
     * 图片地址。提供后会优先展示图片。
     */
    uri?: string;
    /**
     * 头像尺寸（宽高相同），默认为 48。
     */
    size?: number;
    /**
     * 用户名称，用于生成首字母占位符以及无障碍文本。
     */
    name?: string;
    /**
     * 额外样式。
     */
    style?: StyleProp<ViewStyle>;
    /**
     * 图片样式。
     */
    imageStyle?: StyleProp<ImageStyle>;
    /**
     * 文本样式，应用在首字母占位符上。
     */
    textStyle?: StyleProp<TextStyle>;
    /**
     * 自定义无障碍描述。默认会回退到 name。
     */
    accessibilityLabel?: string;
} & Omit<ImageProps, "source" | "style">;

const DEFAULT_SIZE = 48;

export const Avatar: React.FC<AvatarProps> = ({
    uri,
    size = DEFAULT_SIZE,
    name,
    style,
    imageStyle,
    textStyle,
    accessibilityLabel,
    ...imageProps
}) => {
    const dimensionStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
    };

    const label = accessibilityLabel ?? name ?? "Avatar";
    const initials = getInitials(name);

    return (
        <View
            accessibilityRole="image"
            accessibilityLabel={label}
            style={[styles.container, dimensionStyle, style]}
        >
            {uri ? (
                <Image
                    {...imageProps}
                    source={{ uri }}
                    style={[styles.image, dimensionStyle, imageStyle]}
                />
            ) : (
                <View style={[styles.fallback, dimensionStyle]}>
                    <Text style={[styles.fallbackText, textStyle]}>{initials}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D4D4D8",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    fallback: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9CA3AF",
    },
    fallbackText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
    },
});
