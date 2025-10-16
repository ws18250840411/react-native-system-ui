import type { MutableRefObject, Ref, RefCallback } from "react";

/**
 * Merges multiple React refs into a single ref callback.
 * Useful when a component needs to forward a ref while also
 * keeping an internal reference.
 */
export const mergeRefs = <T>(...refs: Array<Ref<T> | undefined | null>): RefCallback<T> => {
    return (node: T) => {
        refs.forEach((ref) => {
            if (typeof ref === "function") {
                ref(node);
            } else if (ref && typeof ref === "object") {
                (ref as MutableRefObject<T | null>).current = node;
            }
        });
    };
};
