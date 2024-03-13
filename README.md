# @chaocore/ripple

The very easy, performance and flexible to use JavaScript/TypeScript library for creating a ripple effect.

## Installing

Using npm:

```bash
npm i @chaocore/ripple
```

Using yarn:

```bash
yarn add @chaocore/ripple
```

Using pnpm:

```bash
pnpm add @chaocore/ripple
```

Using CDN:

```html
<script src="https://unpkg.com/@chaocore/ripple"></script>
```

or

```html
<script defer src="https://unpkg.com/@chaocore/ripple"></script>
```

## Usage
- - -

**React**

```jsx
import { useRipple } from "@chaocore/ripple";

function MyComponent() {
    const ripple = useRipple(options);

    return <div ref={ripple} className="btn">Click Here</div>
}
```

**Native js**

```js
const btn = document.querySelector(".btn");

btn.addEventListener("pointerdown", (event) => {
    createEffectRipple(event, btn, options)
})
```

## Options

| Name                 |     Default      | Type      | 
|----------------------|:----------------:|-----------|
| color                | `"currentColor"` | `string`  |
| easing               |    `ease-out`    | `string`  |
| duration             |     `400ms`      | `number`  |
| dissolveDuration     |     `300ms`      | `number`  |
| delay                |      `75ms`      | `number`  |
| initialOpacity       |      `0.2`       | `number`  |
| finalOpacity         |      `0.1`       | `number`  |
| considerDisabledAttr |      `true`      | `boolean` |
| turnOff              |     `false`      | `boolean` |

## Description of options

| Name                 | Description                                                                                                                                                                                                                                                                                                   | 
|----------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| color                | Defines the color of the ripple.                                                                                                                                                                                                                                                                              |
| easing               | Any valid CSS [<transition-timing-function>](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function).                                                                                                                                                                                    |
| duration             | The duration of the ripple in milliseconds.                                                                                                                                                                                                                                                                   |
| dissolveDuration     | The dissolve duration of the ripple in milliseconds.<br/>Starts after the end of the main duration.                                                                                                                                                                                                           |
| delay                | The animation delay in milliseconds during which the animation maybe canceled if the current pointer action is interrupted for some reason and pointer events are no longer generated.<br/>[Read about the pointercancel event](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointercancel_event) |
| initialOpacity       | The opacity of the ripple at the beginning of the animation.                                                                                                                                                                                                                                                  |
| finalOpacity         | The opacity of the ripple at the end of the animation.                                                                                                                                                                                                                                                        |
| considerDisabledAttr | Don't display a ripple effect if the element has the disable attribute.                                                                                                                                                                                                                                       |
| turnOff              | Don't display a ripple effect.                                                                                                                                                                                                                                                                                |

### License
Copyright © 2024, [Alexey Kipichenko](https://github.com/Kipicenko).
Released under the [MIT License](LICENSE).