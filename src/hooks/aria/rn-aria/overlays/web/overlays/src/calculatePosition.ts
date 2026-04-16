// @ts-nocheck


import {
  Axis,
  Placement,
  PlacementAxis,
  SizeAxis,
} from '@react-types/overlays';
import getCss from 'dom-helpers/css';
import getOffset from 'dom-helpers/offset';
import getPosition from 'dom-helpers/position';
import getScrollLeft from 'dom-helpers/scrollLeft';
import getScrollTop from 'dom-helpers/scrollTop';
import ownerDocument from 'dom-helpers/ownerDocument';
import getComputedStyle from 'dom-helpers/getComputedStyle';

interface Position {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface Dimensions {
  width: number;
  height: number;
  top: number;
  left: number;
  scroll: Position;
}

interface ParsedPlacement {
  placement: PlacementAxis;
  crossPlacement: PlacementAxis;
  axis: Axis;
  crossAxis: Axis;
  size: SizeAxis;
  crossSize: SizeAxis;
}

interface Offset {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface PositionOpts {
  placement: Placement;
  targetNode: HTMLElement;
  overlayNode: HTMLElement;
  scrollNode: HTMLElement;
  padding: number;
  shouldFlip: boolean;
  boundaryElement: HTMLElement;
  offset: number;
  crossOffset: number;
  shouldOverlapWithTrigger: boolean;
}

export interface PositionResult {
  position?: Position;
  arrowOffsetLeft?: number;
  arrowOffsetTop?: number;
  maxHeight?: number;
  placement: PlacementAxis;
}

const AXIS = {
  top: 'top',
  bottom: 'top',
  left: 'left',
  right: 'left',
};

const FLIPPED_DIRECTION = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

const CROSS_AXIS = {
  top: 'left',
  left: 'top',
};

const AXIS_SIZE = {
  top: 'height',
  left: 'width',
};

const PARSED_PLACEMENT_CACHE = {};

// @ts-ignore
let visualViewport = typeof window !== 'undefined' && window.visualViewport;

function getContainerDimensions(containerNode: Element): Dimensions {
  let width = 0,
    height = 0,
    top = 0,
    left = 0;
  let scroll: Position = {};

  if (containerNode.tagName === 'BODY') {
    width = visualViewport?.width ?? document.documentElement.clientWidth;
    height = visualViewport?.height ?? document.documentElement.clientHeight;

    scroll.top =
      getScrollTop(ownerDocument(containerNode).documentElement) ||
      getScrollTop(containerNode);
    scroll.left =
      getScrollLeft(ownerDocument(containerNode).documentElement) ||
      getScrollLeft(containerNode);
  } else {
    ({ width, height, top, left } = getOffset(containerNode));
    scroll.top = getScrollTop(containerNode);
    scroll.left = getScrollLeft(containerNode);
  }

  return { width, height, scroll, top, left };
}

function getScroll(node: HTMLElement): Offset {
  return {
    top: node.scrollTop,
    left: node.scrollLeft,
    width: node.scrollWidth,
    height: node.scrollHeight,
  };
}

function getDelta(
  axis: Axis,
  offset: number,
  size: number,
  containerDimensions: Dimensions,
  padding: number
) {
  let containerScroll = containerDimensions.scroll[axis];
  let containerHeight = containerDimensions[AXIS_SIZE[axis]];

  let startEdgeOffset = offset - padding - containerScroll;
  let endEdgeOffset = offset + padding - containerScroll + size;

  if (startEdgeOffset < 0) {
    return -startEdgeOffset;
  } else if (endEdgeOffset > containerHeight) {
    return Math.max(containerHeight - endEdgeOffset, -startEdgeOffset);
  } else {
    return 0;
  }
}

function getMargins(node: HTMLElement): Position {
  let style = window.getComputedStyle(node);
  return {
    top: parseInt(style.marginTop, 10) || 0,
    bottom: parseInt(style.marginBottom, 10) || 0,
    left: parseInt(style.marginLeft, 10) || 0,
    right: parseInt(style.marginRight, 10) || 0,
  };
}

function parsePlacement(input: Placement): ParsedPlacement {
  if (PARSED_PLACEMENT_CACHE[input]) {
    return PARSED_PLACEMENT_CACHE[input];
  }

  let [placement, crossPlacement] = input.split(' ');
  let axis: Axis = AXIS[placement] || 'right';
  let crossAxis: Axis = CROSS_AXIS[axis];

  if (!AXIS[crossPlacement]) {
    crossPlacement = 'center';
  }

  let size = AXIS_SIZE[axis];
  let crossSize = AXIS_SIZE[crossAxis];
  PARSED_PLACEMENT_CACHE[input] = {
    placement,
    crossPlacement,
    axis,
    crossAxis,
    size,
    crossSize,
  };
  return PARSED_PLACEMENT_CACHE[input];
}

function computePosition(
  childOffset: Offset,
  boundaryDimensions: Dimensions,
  overlaySize: Offset,
  placementInfo: ParsedPlacement,
  offset: number,
  crossOffset: number,
  containerOffsetWithBoundary: Offset,
  isContainerPositioned: boolean
) {
  let { placement, crossPlacement, axis, crossAxis, size, crossSize } =
    placementInfo;
  let position: Position = {};
  position[crossAxis] = childOffset[crossAxis];

  if (crossPlacement === 'center') {
    position[crossAxis] +=
      (childOffset[crossSize] - overlaySize[crossSize]) / 2;
  } else if (crossPlacement !== crossAxis) {
    position[crossAxis] += childOffset[crossSize] - overlaySize[crossSize];
  } 
  position[crossAxis] += crossOffset;
  if (placement === axis) {
    const containerHeight = isContainerPositioned
      ? containerOffsetWithBoundary[size]
      : boundaryDimensions[size];
    position[FLIPPED_DIRECTION[axis]] = Math.floor(
      containerHeight - childOffset[axis] + offset
    );
  } else {
    position[axis] = Math.floor(childOffset[axis] + childOffset[size] + offset);
  }

  return position;
}

function getMaxHeight(
  position: Position,
  boundaryDimensions: Dimensions,
  containerOffsetWithBoundary: Offset,
  childOffset: Offset,
  margins: Position,
  padding: number
) {
  return position.top != null
    ? Math.max(
        0,
        boundaryDimensions.height +
          boundaryDimensions.top +
          boundaryDimensions.scroll.top -
          (containerOffsetWithBoundary.top + position.top) -
          (margins.top + margins.bottom + padding)
      )
    : Math.max(
        0,
        childOffset.top +
          containerOffsetWithBoundary.top -
          (boundaryDimensions.top + boundaryDimensions.scroll.top) -
          (margins.top + margins.bottom + padding)
      );
}

function getAvailableSpace(
  boundaryDimensions: Dimensions,
  containerOffsetWithBoundary: Offset,
  childOffset: Offset,
  margins: Position,
  padding: number,
  placementInfo: ParsedPlacement
) {
  let { placement, axis, size } = placementInfo;
  if (placement === axis) {
    return Math.max(
      0,
      childOffset[axis] -
        boundaryDimensions[axis] -
        boundaryDimensions.scroll[axis] +
        containerOffsetWithBoundary[axis] -
        margins[axis] -
        margins[FLIPPED_DIRECTION[axis]] -
        padding
    );
  }

  return Math.max(
    0,
    boundaryDimensions[size] +
      boundaryDimensions[axis] +
      boundaryDimensions.scroll[axis] -
      containerOffsetWithBoundary[axis] -
      childOffset[axis] -
      childOffset[size] -
      margins[axis] -
      margins[FLIPPED_DIRECTION[axis]] -
      padding
  );
}

export function calculatePositionInternal(
  placementInput: Placement,
  childOffset: Offset,
  overlaySize: Offset,
  scrollSize: Offset,
  margins: Position,
  padding: number,
  flip: boolean,
  boundaryDimensions: Dimensions,
  containerOffsetWithBoundary: Offset,
  offset: number,
  crossOffset: number,
  isContainerPositioned: boolean,
  shouldOverlapWithTrigger: boolean
): PositionResult {
  let placementInfo = parsePlacement(placementInput);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { size, crossAxis, crossSize, placement, crossPlacement, axis } =
    placementInfo;
  let position = computePosition(
    childOffset,
    boundaryDimensions,
    overlaySize,
    placementInfo,
    offset,
    crossOffset,
    containerOffsetWithBoundary,
    isContainerPositioned
  );
  let isFlipped = false;
  let normalizedOffset = offset;
  let space = getAvailableSpace(
    boundaryDimensions,
    containerOffsetWithBoundary,
    childOffset,
    margins,
    padding + offset,
    placementInfo
  );
  if (flip && scrollSize[size] > space) {
    let flippedPlacementInfo = parsePlacement(
      `${FLIPPED_DIRECTION[placement]} ${crossPlacement}` as Placement
    );
    let flippedPosition = computePosition(
      childOffset,
      boundaryDimensions,
      overlaySize,
      flippedPlacementInfo,
      offset,
      crossOffset,
      containerOffsetWithBoundary,
      isContainerPositioned
    );
    let flippedSpace = getAvailableSpace(
      boundaryDimensions,
      containerOffsetWithBoundary,
      childOffset,
      margins,
      padding + offset,
      flippedPlacementInfo
    );
    if (flippedSpace > space) {
      isFlipped = true;
      placementInfo = flippedPlacementInfo;
      position = flippedPosition;
      normalizedOffset = offset;
    } else {
      isFlipped = false;
    }
  } else {
    isFlipped = false;
  }

  let delta = getDelta(
    crossAxis,
    position[crossAxis],
    overlaySize[crossSize],
    boundaryDimensions,
    padding
  );
  position[crossAxis] += delta;

  let maxHeight = getMaxHeight(
    position,
    boundaryDimensions,
    containerOffsetWithBoundary,
    childOffset,
    margins,
    padding
  );

  overlaySize.height = Math.min(overlaySize.height, maxHeight);

  position = computePosition(
    childOffset,
    boundaryDimensions,
    overlaySize,
    placementInfo,
    normalizedOffset,
    crossOffset,
    containerOffsetWithBoundary,
    isContainerPositioned
  );
  delta = getDelta(
    crossAxis,
    position[crossAxis],
    overlaySize[crossSize],
    boundaryDimensions,
    padding
  );
  position[crossAxis] += delta;

  let arrowPosition: Position = {};
  arrowPosition[crossAxis] =
    childOffset[crossAxis] - position[crossAxis] + childOffset[crossSize] / 2;

  if (shouldOverlapWithTrigger) {
    position[FLIPPED_DIRECTION[placementInfo.placement]] =
      position[FLIPPED_DIRECTION[placementInfo.placement]] - childOffset[size];
  }

  return {
    position,
    maxHeight: maxHeight,
    arrowOffsetLeft: arrowPosition.left,
    arrowOffsetTop: arrowPosition.top,
    placement: placementInfo.placement,
    isFlipped,
  };
}


export function calculatePosition(opts: PositionOpts): PositionResult {
  let {
    placement,
    targetNode,
    overlayNode,
    scrollNode,
    padding,
    shouldFlip,
    boundaryElement,
    offset,
    crossOffset,
    shouldOverlapWithTrigger,
  } = opts;

  let container = overlayNode.offsetParent || document.body;
  let isBodyContainer = container.tagName === 'BODY';
  const containerPositionStyle = window.getComputedStyle(container).position;
  let isContainerPositioned =
    !!containerPositionStyle && containerPositionStyle !== 'static';
  let childOffset: Offset = isBodyContainer
    ? getOffset(targetNode)
    : getPosition(targetNode, container);

  if (!isBodyContainer) {
    childOffset.top += parseInt(getCss(targetNode, 'marginTop'), 10) || 0;
    childOffset.left += parseInt(getCss(targetNode, 'marginLeft'), 10) || 0;
  }

  let overlaySize: Offset = getOffset(overlayNode);
  const matrix = getComputedStyle(overlayNode).getPropertyValue('transform');
  const transform = matrix;
  const regex =
    /matrix\((-?\d*\.?\d+),\s*(-?\d*\.?\d+),\s*(-?\d*\.?\d+),\s*(-?\d*\.?\d+),\s*(-?\d*\.?\d+),\s*(-?\d*\.?\d+)\)/;
  const matches = transform.match(regex);
  let scaleX = 1;
  let scaleY = 1;

  if (matches) {
    scaleX = parseFloat(matches[1]);
    scaleY = parseFloat(matches[4]);
    if (!scaleX || !Number.isFinite(scaleX)) {
      scaleX = 1;
    }

    if (!scaleY || !Number.isFinite(scaleY)) {
      scaleY = 1;
    }
  }

  let margins = getMargins(overlayNode);
  overlaySize.width += margins.left + margins.right;
  overlaySize.height += margins.top + margins.bottom;

  if (scaleX) {
    overlaySize.width = overlaySize.width / scaleX;
  }
  if (scaleY) {
    overlaySize.height = overlaySize.height / scaleY;
  }

  let scrollSize = getScroll(scrollNode);
  let boundaryDimensions = getContainerDimensions(boundaryElement);
  let containerOffsetWithBoundary: Offset =
    boundaryElement.tagName === 'BODY'
      ? getOffset(container)
      : getPosition(container, boundaryElement);

  return calculatePositionInternal(
    placement,
    childOffset,
    overlaySize,
    scrollSize,
    margins,
    padding,
    shouldFlip,
    boundaryDimensions,
    containerOffsetWithBoundary,
    offset,
    crossOffset,
    isContainerPositioned,
    shouldOverlapWithTrigger
  );
}
