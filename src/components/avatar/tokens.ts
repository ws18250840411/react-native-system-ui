import { createComponentTokensHook } from "../../design-system";
import type { Foundations } from "../../design-system/tokens";
import type { AvatarTokens } from "./types";

export const createAvatarTokens = (foundations: Foundations): AvatarTokens => ({
    defaults: {
        size: "medium",
        shape: "circle",
    },
    layout: {
        container: {
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
        },
        text: {
            includeFontPadding: false,
            textAlignVertical: "center",
        },
        image: {
            width: "100%",
            height: "100%",
        },
        iconWrapper: {
            alignItems: "center",
            justifyContent: "center",
        },
    },
    colors: {
        background: foundations.palette.default[100],
        text: foundations.palette.default[800],
    },
    typography: {
        fontWeight: "600",
        fallbackTextScale: 0.5,
    },
    sizing: {
        sizes: {
            small: 24,
            medium: 32,
            large: 40,
        },
        iconMaxSize: 32,
        loadingSize: 12,
    },
    radii: {
        squareMin: 6,
        squareDivisor: 6,
    },
});

export const useAvatarTokens = createComponentTokensHook("avatar", createAvatarTokens);
