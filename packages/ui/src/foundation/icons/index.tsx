import React from "react";
import { Circle, Line, Path, Polygon, Polyline } from "react-native-svg";

import { createIcon } from "./create-icon";
import type { IconProps } from "./create-icon";

const strokeCommon = {
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

export const ArrowLeftOutline = createIcon(({ color }) => (
    <>
        <Line x1="19" y1="12" x2="5" y2="12" stroke={color} {...strokeCommon} />
        <Polyline points="12 5 5 12 12 19" fill="none" stroke={color} {...strokeCommon} />
    </>
));

export const ArrowRightOutline = createIcon(({ color }) => (
    <>
        <Line x1="5" y1="12" x2="19" y2="12" stroke={color} {...strokeCommon} />
        <Polyline points="12 5 19 12 12 19" fill="none" stroke={color} {...strokeCommon} />
    </>
));

export const ArrowUpOutline = createIcon(({ color }) => (
    <>
        <Line x1="12" y1="19" x2="12" y2="5" stroke={color} {...strokeCommon} />
        <Polyline points="5 12 12 5 19 12" fill="none" stroke={color} {...strokeCommon} />
    </>
));

export const ArrowDownOutline = createIcon(({ color }) => (
    <>
        <Line x1="12" y1="5" x2="12" y2="19" stroke={color} {...strokeCommon} />
        <Polyline points="5 12 12 19 19 12" fill="none" stroke={color} {...strokeCommon} />
    </>
));

const triangle = (points: string, color: string) => (
    <Polygon points={points} fill={color} />
);

export const ArrowLeftFill = createIcon(({ color }) =>
    triangle("16,5 8,12 16,19", color),
);

export const ArrowRightFill = createIcon(({ color }) =>
    triangle("8,5 16,12 8,19", color),
);

export const ArrowUpFill = createIcon(({ color }) =>
    triangle("5,16 12,8 19,16", color),
);

export const ArrowDownFill = createIcon(({ color }) =>
    triangle("5,8 12,16 19,8", color),
);

export const CircleOutline = createIcon(({ color }) => (
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} fill="none" />
));

export const CrossOutline = createIcon(({ color }) => (
    <>
        <Line x1="6" y1="6" x2="18" y2="18" stroke={color} {...strokeCommon} />
        <Line x1="6" y1="18" x2="18" y2="6" stroke={color} {...strokeCommon} />
    </>
));

export const CrossCircleOutline = createIcon(({ color }) => (
    <>
        <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} fill="none" />
        <Line x1="8.5" y1="8.5" x2="15.5" y2="15.5" stroke={color} {...strokeCommon} />
        <Line x1="8.5" y1="15.5" x2="15.5" y2="8.5" stroke={color} {...strokeCommon} />
    </>
));

export const SuccessOutline = createIcon(({ color }) => (
    <Path
        d="M6 12l4 4 8-8"
        stroke={color}
        {...strokeCommon}
        fill="none"
    />
));

export const SuccessFill = createIcon(({ color, secondaryColor }) => (
    <>
        <Circle cx="12" cy="12" r="10" fill={color} />
        <Path
            d="M8.5 12.5L11 15l4.5-4.5"
            stroke={secondaryColor || "#fff"}
            {...strokeCommon}
            fill="none"
        />
    </>
));

export const SuccessCircleOutline = createIcon(({ color }) => (
    <>
        <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} fill="none" />
        <Path
            d="M8.5 12.5L11 15l4.5-4.5"
            stroke={color}
            {...strokeCommon}
            fill="none"
        />
    </>
));

export const WarningOutline = createIcon(({ color }) => (
    <>
        <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} fill="none" />
        <Line x1="12" y1="8" x2="12" y2="13" stroke={color} {...strokeCommon} />
        <Circle cx="12" cy="16" r="1.5" fill={color} />
    </>
));

export const SearchOutline = createIcon(({ color }) => (
    <>
        <Circle cx="11" cy="11" r="6" stroke={color} strokeWidth={2} fill="none" />
        <Line x1="16" y1="16" x2="20" y2="20" stroke={color} {...strokeCommon} />
    </>
));

export const SwapRightOutline = createIcon(({ color }) => (
    <>
        <Polyline points="7 9 12 4 17 9" fill="none" stroke={color} {...strokeCommon} />
        <Polyline points="7 15 12 20 17 15" fill="none" stroke={color} {...strokeCommon} />
        <Line x1="5" y1="12" x2="19" y2="12" stroke={color} {...strokeCommon} />
    </>
));

export const PlusOutline = createIcon(({ color }) => (
    <>
        <Line x1="12" y1="5" x2="12" y2="19" stroke={color} {...strokeCommon} />
        <Line x1="5" y1="12" x2="19" y2="12" stroke={color} {...strokeCommon} />
    </>
));

export const EyeOutline = createIcon(({ color }) => (
    <>
        <Path
            d="M2.5 12c2.1-4 5.5-6 9.5-6s7.4 2 9.5 6c-2.1 4-5.5 6-9.5 6s-7.4-2-9.5-6z"
            stroke={color}
            {...strokeCommon}
            fill="none"
        />
        <Circle cx="12" cy="12" r="2.5" stroke={color} strokeWidth={2} fill="none" />
    </>
));

export const EyeCloseOutline = createIcon(({ color }) => (
    <>
        <Path
            d="M2.5 12c2.1-4 5.5-6 9.5-6 1.9 0 3.7.4 5.2 1.3"
            stroke={color}
            {...strokeCommon}
            fill="none"
        />
        <Path
            d="M21.5 12c-2.1 4-5.5 6-9.5 6-1.9 0-3.7-.4-5.2-1.3"
            stroke={color}
            {...strokeCommon}
            fill="none"
        />
        <Line x1="4" y1="4" x2="20" y2="20" stroke={color} {...strokeCommon} />
    </>
));

export const ArrowIcons = {
    ArrowLeftOutline,
    ArrowRightOutline,
    ArrowUpOutline,
    ArrowDownOutline,
    ArrowLeftFill,
    ArrowRightFill,
    ArrowUpFill,
    ArrowDownFill,
};

export type { IconProps };
