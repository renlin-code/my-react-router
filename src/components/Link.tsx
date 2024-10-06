import { BUTTONS, NAVIGATION_EVENTS } from "../consts";
import { ReactNode } from "react";

function navigate(path: string) {
    window.history.pushState({}, "", path)
    const navEvent = new Event(NAVIGATION_EVENTS.PUSHSTATE)
    window.dispatchEvent(navEvent)
}


export function Link({to, target, children, ...props }: { to: string, target?: string, children: ReactNode }) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const isMainEvent = e.button === BUTTONS.LEFT
        const isModifiedEvent = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
        const isManageableEvent = target === "_self" || target === undefined

        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            e.preventDefault()
            navigate(to)
        }
    }

    return (
        <a href={to} target={target} {...props} onClick={handleClick}>
            {children}
        </a>
    )
}