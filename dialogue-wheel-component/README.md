# Dialogue Wheel Component

A configurable 3D-style dialogue wheel web component.

## Installation

```bash
npm install dialogue-wheel-component 
# or your chosen package name
```

## Usage

```html
<!-- Include the script in your HTML -->
<script type="module" src="node_modules/dialogue-wheel-component/dialogue-wheel.js"></script>

<!-- Use the component -->
<dialogue-wheel id="myWheel"></dialogue-wheel>

<script>
  const wheel = document.getElementById('myWheel');
  
  // Set options via property
  wheel.options = [
    { text: "Attack", color: "#e74c3c" },
    { text: "Defend", color: "#3498db" },
    { text: "Magic", color: "#9b59b6", disabled: true }, // Example disabled option
    { text: "Items", color: "#2ecc71" },
    { text: "Flee", color: "#f1c40f" },
    { text: "Talk", color: "#e67e22" }
  ];

  // Set appearance properties
  wheel.wheelRadius = 90;
  wheel.ringThickness = 40;
  wheel.perspectiveAngleX = 45;
  wheel.fontSizeScale = 1.5;
  wheel.bevelIntensity = 0.5;
  wheel.ringExtrusion = 35;
  wheel.disabledOpacity = 0.5;
  wheel.disabledSaturation = 0.25;
  wheel.disableAffectsText = false;

  // Listen for selection events
  wheel.addEventListener('option-selected', (event) => {
    console.log('Selected:', event.detail.option);
    // Example: Update some UI element
    // const selectionDisplay = document.getElementById('selectionInfo');
    // if (selectionDisplay) {
    //     selectionDisplay.textContent = `Selected: ${event.detail.option.text}`;
    // }
  });
</script>
```

## Attributes / Properties

Properties can be set directly on the element instance (e.g., `wheel.wheelRadius = 100;`). Corresponding kebab-case attributes can be set in HTML (e.g., `<dialogue-wheel wheel-radius="100">`).

*   **`options`**: (Array) Array of option objects `{ text: string, color?: string, disabled?: boolean }`. Must be set via property.
*   **`wheel-radius` / `wheelRadius`**: (Number) Outer radius of the wheel ring in pixels. Default: `150`.
*   **`ring-thickness` / `ringThickness`**: (Number) Thickness of the wheel ring in pixels. Default: `60`.
*   **`perspective-angle-x` / `perspectiveAngleX`**: (Number) Angle in degrees for the 3D perspective tilt along the X-axis. Default: `0`.
*   **`font-size-scale` / `fontSizeScale`**: (Number) Multiplier for the base font size (14px) of the labels. Default: `1`.
*   **`bevel-intensity` / `bevelIntensity`**: (Number, 0-1) Intensity of the bevel/lighting effect on the segments. Default: `0`.
*   **`ring-extrusion` / `ringExtrusion`**: (Number) Apparent depth of the ring extrusion effect in pixels (controls number/offset of layers). Default: `0`. Clamped 0-50.
*   **`disabled-opacity` / `disabledOpacity`**: (Number, 0-1) Opacity applied to disabled items. Default: `0.5`.
*   **`disabled-saturation` / `disabledSaturation`**: (Number, 0-1) Saturation filter (`saturate()`) applied to disabled items. Default: `0.3`.
*   **`disable-affects-text` / `disableAffectsText`**: (Boolean) If `true`, disabled styles (opacity/saturation) also apply to text labels and connector lines. Default: `true`.

## Events

*   **`option-selected`**: Fired when an enabled option segment is clicked. The event `detail` object contains:
    *   `index`: (Number) The index of the selected option in the `options` array.
    *   `option`: (Object) The full option object that was selected.
