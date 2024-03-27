import { defaultOptions, OptionsRippleType } from "./options";

/**
 * The core function for create ripple effect.
 * @example
 *   const btn = document.querySelector(".btn");
 *
 *   btn.addEventListener("pointerdown", (event) => {
 *       createRippleEffect(event, btn, options)
 *   }
 */
export function createRippleEffect(
    event: PointerEvent,
    el: HTMLElement,
    userOptions: Partial<OptionsRippleType> = {},
): void {
    const finalOptions: OptionsRippleType = {
        ...defaultOptions,
        ...userOptions,
    };
    if ((el.hasAttribute("disabled") && finalOptions.considerDisabledAttr) || finalOptions.turnOff) return;

    const computedStyles: CSSStyleDeclaration = window.getComputedStyle(el);
    const rect: DOMRect = el.getBoundingClientRect();

    const { x, y } = getClickCoordinates(event, rect);

    const maxX: number = Math.max(x, rect.width - x);
    const maxY: number = Math.max(y, rect.height - y);
    const size: number = 2.05 * Math.sqrt(maxX * maxX + maxY * maxY);

    const rippleContainer = createRippleContainer(computedStyles);
    const rippleElement = createRippleElement(x, y, size, finalOptions.color);

    incrementRippleCount(el);

    if (computedStyles.position === "static") {
        el.style.position = "relative";
        el.setAttribute("data-temporary-relative", "");
    }

    rippleContainer.appendChild(rippleElement);
    el.appendChild(rippleContainer);

    const animateStart: Animation = rippleElement.animate(
        {
            opacity: [finalOptions.initialOpacity, finalOptions.finalOpacity],
            transform: ["translate(-50%,-50%) scale(0)", "translate(-50%,-50%) scale(1)"],
        },
        {
            duration: finalOptions.duration,
            easing: finalOptions.easing,
            fill: "forwards",
            delay: finalOptions.delay,
        },
    );

    let shouldDissolveRipple: boolean = false;

    function dissolveRipple(): void {
        if (shouldDissolveRipple) {
            const animateEnd: Animation = rippleElement.animate(
                {
                    opacity: [finalOptions.finalOpacity, 0],
                },
                { duration: finalOptions.dissolveDuration, fill: "forwards" },
            );

            animateEnd.onfinish = () => {
                clear();
            };
        } else {
            shouldDissolveRipple = true;
        }
    }

    function clear(): void {
        rippleContainer.remove();

        decrementRippleCount(el);
        const count = getRippleCount(el);

        if (count === 0 && el.hasAttribute("data-temporary-relative")) {
            el.style.position = "";
            el.removeAttribute("data-temporary-relative");
        }

        if (count === 0) deleteRippleCount(el);
    }

    function pointerEventUp(): void {
        document.removeEventListener("pointerup", pointerEventUp);
        document.removeEventListener("pointercancel", pointerEventCancel);
        dissolveRipple();
    }

    function pointerEventCancel(): void {
        document.removeEventListener("pointerup", pointerEventUp);
        document.removeEventListener("pointercancel", pointerEventCancel);
        if ((animateStart.currentTime as number) < finalOptions.delay) {
            animateStart.cancel();
            clear();
        } else {
            dissolveRipple();
        }
    }

    document.addEventListener("pointerup", pointerEventUp);
    document.addEventListener("pointercancel", pointerEventCancel);

    animateStart.onfinish = () => {
        dissolveRipple();
    };
}

function getClickCoordinates({ clientX, clientY }: PointerEvent, { left, top }: DOMRect): { x: number; y: number } {
    return {
        x: clientX - left,
        y: clientY - top,
    };
}

function createRippleContainer({
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
}: CSSStyleDeclaration): HTMLDivElement {
    const rippleContainer = document.createElement("div");
    rippleContainer.style.top = "0";
    rippleContainer.style.left = "0";
    rippleContainer.style.width = "100%";
    rippleContainer.style.height = "100%";
    rippleContainer.style.display = "block";
    rippleContainer.style.position = "absolute";
    rippleContainer.style.borderRadius = `${borderTopLeftRadius} ${borderTopRightRadius} ${borderBottomRightRadius} ${borderBottomLeftRadius}`;
    rippleContainer.style.overflow = "hidden";
    rippleContainer.style.pointerEvents = "none";

    return rippleContainer;
}

function createRippleElement(x: number, y: number, size: number, color: string): HTMLDivElement {
    const rippleElement = document.createElement("div");

    rippleElement.style.position = "absolute";
    rippleElement.style.width = `${size}px`;
    rippleElement.style.height = `${size}px`;
    rippleElement.style.top = `${y}px`;
    rippleElement.style.left = `${x}px`;
    rippleElement.style.background = color;
    rippleElement.style.borderRadius = "50%";
    rippleElement.style.transform = "translate(-50%,-50%) scale(0)";

    return rippleElement;
}

function incrementRippleCount(el: HTMLElement): void {
    const count = getRippleCount(el);
    setRippleCount(el, count + 1);
}

function decrementRippleCount(el: HTMLElement): void {
    const count = getRippleCount(el);
    setRippleCount(el, count - 1);
}

function setRippleCount(el: HTMLElement, count: number): void {
    el.setAttribute("data-ripple-count", count.toString());
}

function getRippleCount(el: HTMLElement): number {
    return parseInt(el.getAttribute("data-ripple-count") ?? "0", 10);
}

function deleteRippleCount(el: HTMLElement): void {
    el.removeAttribute("data-ripple-count");
}
