import React from "react";
import {
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<PressableProps, "children" | "style"> & {
    /**
     * 按钮文本。传入 children 时可留空。
     */
    title?: string;
    /**
     * 按钮内容。若未提供 children，会回退到 title。
     */
    children?: React.ReactNode;
    /**
     * 样式变体，默认 primary。
     */
    variant?: ButtonVariant;
    /**
     * 尺寸，默认中号。
     */
    size?: ButtonSize;
    /**
     * 左侧图标。
     */
    leftIcon?: React.ReactNode;
    /**
     * 右侧图标。
     */
    rightIcon?: React.ReactNode;
    /**
     * 外层样式。
     */
    style?: StyleProp<ViewStyle>;
    /**
     * 文本样式。
     */
    textStyle?: StyleProp<TextStyle>;
};

const variantStyles: Record<ButtonVariant, { container: ViewStyle; label: TextStyle }> =
{
    primary: {
        container: {
            backgroundColor: "#2563EB",
            borderColor: "#2563EB",
        },
        label: {
            color: "#FFFFFF",
        },
    },
    secondary: {
        container: {
            backgroundColor: "#1F2937",
            borderColor: "#1F2937",
        },
        label: {
            color: "#FFFFFF",
        },
    },
    ghost: {
        container: {
            backgroundColor: "transparent",
            borderColor: "#D1D5DB",
        },
        label: {
            color: "#111827",
        },
    },
};

const sizeStyles: Record<ButtonSize, { container: ViewStyle; label: TextStyle }> = {
    sm: {
        container: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            minHeight: 36,
        },
        label: {
            fontSize: 14,
        },
    },
    md: {
        container: {
            paddingHorizontal: 16,
            paddingVertical: 10,
            minHeight: 44,
        },
        label: {
            fontSize: 16,
        },
    },
    lg: {
        container: {
            paddingHorizontal: 20,
            paddingVertical: 12,
            minHeight: 52,
        },
        label: {
            fontSize: 18,
        },
    },
};

export const Button: React.FC<ButtonProps> = ({
    title,
    children,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    style,
    textStyle,
    disabled,
    ...rest
}) => {
    const labelContent = children ?? title;

    return (
        <Pressable
            {...rest}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityState={disabled ? { disabled: true } : undefined}
            style={({ pressed }) => [
                styles.base,
                variantStyles[variant].container,
                sizeStyles[size].container,
                disabled && styles.disabled,
                pressed && !disabled && styles.pressed,
                style,
            ]}
        >
            <View style={styles.content}>
                {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
                {typeof labelContent === "string" ? (
                    <Text
                        style={[
                            styles.label,
                            variantStyles[variant].label,
                            sizeStyles[size].label,
                            disabled && styles.labelDisabled,
                            textStyle,
                        ]}
                    >
                        {labelContent}
                    </Text>
                ) : (
                    labelContent
                )}
                {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 999,
        overflow: "hidden",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    label: {
        fontWeight: "600",
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
    },
    pressed: {
        opacity: 0.88,
    },
    disabled: {
        opacity: 0.5,
    },
    labelDisabled: {
        color: "#E5E7EB",
    },
});
