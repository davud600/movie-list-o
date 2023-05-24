import { type RefObject, useEffect } from "react";

/**
 * Hook that takes callback and element ref to do something when clicked outside that element
 */
export function useOutsideClickDetector(
    ref: RefObject<HTMLDivElement>,
    callback: () => void
) {
    useEffect(() => {
        /**
         * Check if clicked on outside of element
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function handleClickOutside(event: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [callback, ref]);
}
