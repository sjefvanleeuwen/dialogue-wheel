class DialogueWheel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._options = [];
    this._selectedIndex = -1;
    // Default values for new properties
    this._wheelRadius = 150; // Default outer radius
    this._ringThickness = 60; // Default thickness
    this._perspectiveAngleX = 0; // Default perspective angle (degrees)
    this._fontSizeScale = 1; // Default font size scale
    this._bevelIntensity = 0; // Default bevel intensity (0 to 1)
    this._ringExtrusion = 0; // Default extrusion amount (e.g., pixels)
    this._disabledOpacity = 0.5; // Default opacity for disabled items
    this._disabledSaturation = 0.3; // Default saturation for disabled items
    this._disableAffectsText = true; // Default: disabled state affects text/lines
  }

  static get observedAttributes() {
    // Add new attributes to observe
    return ['options', 'wheel-radius', 'ring-thickness', 'perspective-angle-x', 'font-size-scale', 'bevel-intensity', 'ring-extrusion', 'disabled-opacity', 'disabled-saturation', 'disable-affects-text'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'options' && newValue) {
      try {
        this._options = JSON.parse(newValue);
        this._render();
      } catch (e) {
        console.error('Invalid options format', e);
      }
    } else if (name === 'wheel-radius') {
      const radius = parseFloat(newValue);
      if (!isNaN(radius) && radius > 0) {
        this._wheelRadius = radius;
        this._render();
      } else {
        console.error('Invalid wheel-radius value', newValue);
      }
    } else if (name === 'ring-thickness') {
      const thickness = parseFloat(newValue);
      if (!isNaN(thickness) && thickness > 0) {
        this._ringThickness = thickness;
        this._render();
      } else {
        console.error('Invalid ring-thickness value', newValue);
      }
    } else if (name === 'perspective-angle-x') { // Handle new attribute
        const angle = parseFloat(newValue);
        if (!isNaN(angle)) {
            this._perspectiveAngleX = angle;
            this._render();
        } else {
            console.error('Invalid perspective-angle-x value', newValue);
        }
    } else if (name === 'font-size-scale') { // Handle font size scale
        const scale = parseFloat(newValue);
        if (!isNaN(scale) && scale > 0) {
            this._fontSizeScale = scale;
            this._render();
        } else {
            console.error('Invalid font-size-scale value', newValue);
        }
    } else if (name === 'bevel-intensity') { // Handle bevel intensity
        let intensity = parseFloat(newValue);
        if (!isNaN(intensity)) {
            // Clamp value between 0 and 1
            this._bevelIntensity = Math.max(0, Math.min(1, intensity));
            this._render();
        } else {
            console.error('Invalid bevel-intensity value', newValue);
        }
    } else if (name === 'ring-extrusion') { // Handle ring extrusion
        let extrusion = parseFloat(newValue);
        if (!isNaN(extrusion)) {
            this._ringExtrusion = Math.max(0, Math.min(50, extrusion)); // Clamp 0-50
            this._render();
        } else {
            console.error('Invalid ring-extrusion value', newValue);
        }
    } else if (name === 'disabled-opacity') {
        let opacity = parseFloat(newValue);
        if (!isNaN(opacity)) {
            this._disabledOpacity = Math.max(0, Math.min(1, opacity)); // Clamp 0-1
            this._render();
        } else {
            console.error('Invalid disabled-opacity value', newValue);
        }
    } else if (name === 'disabled-saturation') {
        let saturation = parseFloat(newValue);
        if (!isNaN(saturation)) {
            this._disabledSaturation = Math.max(0, Math.min(1, saturation)); // Clamp 0-1
            this._render();
        } else {
            console.error('Invalid disabled-saturation value', newValue);
        }
    } else if (name === 'disable-affects-text') {
        // Convert attribute string ('true'/'false') to boolean
        this._disableAffectsText = newValue !== null && newValue !== 'false';
        this._render();
    }
  }

  set options(value) {
    this._options = value;
    this.setAttribute('options', JSON.stringify(value)); // Keep attribute in sync if needed
    this._render();
  }

  get options() {
    return this._options;
  }

  // Getter/Setter for wheelRadius
  set wheelRadius(value) {
    const radius = parseFloat(value);
    if (!isNaN(radius) && radius > 0) {
      this._wheelRadius = radius;
      this.setAttribute('wheel-radius', radius); // Keep attribute in sync
      this._render();
    }
  }

  get wheelRadius() {
    return this._wheelRadius;
  }

  // Getter/Setter for ringThickness
  set ringThickness(value) {
    const thickness = parseFloat(value);
    if (!isNaN(thickness) && thickness > 0) {
      this._ringThickness = thickness;
      this.setAttribute('ring-thickness', thickness); // Keep attribute in sync
      this._render();
    }
  }

  get ringThickness() {
    return this._ringThickness;
  }

  // Getter/Setter for perspectiveAngleX
  set perspectiveAngleX(value) {
      const angle = parseFloat(value);
      if (!isNaN(angle)) {
          this._perspectiveAngleX = angle;
          this.setAttribute('perspective-angle-x', angle); // Keep attribute in sync
          this._render();
      }
  }

  get perspectiveAngleX() {
      return this._perspectiveAngleX;
  }

  // Getter/Setter for fontSizeScale
  set fontSizeScale(value) {
      const scale = parseFloat(value);
      if (!isNaN(scale) && scale > 0) {
          this._fontSizeScale = scale;
          this.setAttribute('font-size-scale', scale); // Keep attribute in sync
          this._render();
      }
  }

  get fontSizeScale() {
      return this._fontSizeScale;
  }

  // Getter/Setter for bevelIntensity
  set bevelIntensity(value) {
      let intensity = parseFloat(value);
      if (!isNaN(intensity)) {
          this._bevelIntensity = Math.max(0, Math.min(1, intensity)); // Clamp
          this.setAttribute('bevel-intensity', this._bevelIntensity); // Keep attribute in sync
          this._render();
      }
  }

  get bevelIntensity() {
      return this._bevelIntensity;
  }

  // Getter/Setter for ringExtrusion
  set ringExtrusion(value) {
      let extrusion = parseFloat(value);
      if (!isNaN(extrusion)) {
          this._ringExtrusion = Math.max(0, Math.min(50, extrusion)); // Clamp 0-50
          this.setAttribute('ring-extrusion', this._ringExtrusion); // Keep attribute in sync
          this._render();
      }
  }

  get ringExtrusion() {
      return this._ringExtrusion;
  }

  // Getter/Setter for disabledOpacity
  set disabledOpacity(value) {
      let opacity = parseFloat(value);
      if (!isNaN(opacity)) {
          this._disabledOpacity = Math.max(0, Math.min(1, opacity)); // Clamp 0-1
          this.setAttribute('disabled-opacity', this._disabledOpacity);
          this._render();
      }
  }

  get disabledOpacity() {
      return this._disabledOpacity;
  }

  // Getter/Setter for disabledSaturation
  set disabledSaturation(value) {
      let saturation = parseFloat(value);
      if (!isNaN(saturation)) {
          this._disabledSaturation = Math.max(0, Math.min(1, saturation)); // Clamp 0-1
          this.setAttribute('disabled-saturation', this._disabledSaturation);
          this._render();
      }
  }

  get disabledSaturation() {
      return this._disabledSaturation;
  }

  // Getter/Setter for disableAffectsText
  set disableAffectsText(value) {
      const boolValue = Boolean(value);
      if (this._disableAffectsText !== boolValue) {
          this._disableAffectsText = boolValue;
          this.setAttribute('disable-affects-text', boolValue);
          this._render();
      }
  }

  get disableAffectsText() {
      return this._disableAffectsText;
  }

  get selectedOption() {
    return this._selectedIndex >= 0 ? this._options[this._selectedIndex] : null;
  }

  connectedCallback() {
    // Ensure initial render uses property values if attributes not set
    if (!this.hasAttribute('wheel-radius')) {
        this.setAttribute('wheel-radius', this._wheelRadius);
    }
     if (!this.hasAttribute('ring-thickness')) {
        this.setAttribute('ring-thickness', this._ringThickness);
    }
    // Ensure initial render uses property value if attribute not set
    if (!this.hasAttribute('perspective-angle-x')) {
        this.setAttribute('perspective-angle-x', this._perspectiveAngleX);
    }
    // Ensure initial render uses property value if attribute not set
    if (!this.hasAttribute('font-size-scale')) {
        this.setAttribute('font-size-scale', this._fontSizeScale);
    }
    // Ensure initial render uses property value if attribute not set
    if (!this.hasAttribute('bevel-intensity')) {
        this.setAttribute('bevel-intensity', this._bevelIntensity);
    }
    // Ensure initial render uses property value if attribute not set
    if (!this.hasAttribute('ring-extrusion')) {
        this.setAttribute('ring-extrusion', this._ringExtrusion);
    }
    // Ensure initial render uses property value if attribute not set
    if (!this.hasAttribute('disabled-opacity')) {
        this.setAttribute('disabled-opacity', this._disabledOpacity);
    }
    if (!this.hasAttribute('disabled-saturation')) {
        this.setAttribute('disabled-saturation', this._disabledSaturation);
    }
    // Ensure initial render uses property value if attribute not set
    if (!this.hasAttribute('disable-affects-text')) {
        this.setAttribute('disable-affects-text', this._disableAffectsText);
    }
    // Initial render if options already set via property before connection
    if (this._options.length > 0 && !this.hasAttribute('options')) {
         this.setAttribute('options', JSON.stringify(this._options));
    } else if (!this.shadowRoot.innerHTML) { // Avoid re-render if already done by attributeChangedCallback
        this._render();
    }
  }

  _render() {
    if (!this.shadowRoot) return;

    // Use properties for calculations
    const outerRadius = this._wheelRadius;
    // Ensure thickness doesn't exceed radius
    const ringThickness = Math.min(this._ringThickness, outerRadius); 
    const innerRadius = outerRadius - ringThickness;
    const wheelDrawSize = outerRadius * 2; // Diameter of the wheel drawing area
    const centerX = outerRadius; // Center X within the drawing area
    const centerY = outerRadius; // Center Y within the drawing area

    // Constants for label positioning (could also be made configurable)
    const labelLineStartPadding = 15;
    const horizontalLineLength = 50;
    const labelPadding = 10;

    // Calculate required host width based on wheel size and label extensions
    const labelLineStartDistance = outerRadius + labelLineStartPadding;
    const requiredWidth = wheelDrawSize + 2 * (labelLineStartPadding + horizontalLineLength + labelPadding);
    const requiredHeight = wheelDrawSize; // Height primarily determined by wheel diameter

    const options = this._options || [];
    const optionCount = options.length;

    // --- Bevel Filter Calculations ---
    // Intensity now controls lighting parameters
    const specularConstant = 0.75 * this._bevelIntensity; // Controls brightness of highlight
    const surfaceScale = 5 * this._bevelIntensity; // Controls height/depth of bevel effect
    const specularExponent = 20; // Controls shininess (higher = sharper highlight)
    const lightX = centerX * 0.5; // Light source position (adjust as needed)
    const lightY = centerY * 0.5;
    const lightZ = 150; // Height of light source

    // Determine filter based ONLY on bevel intensity now
    const useBevelFilter = this._bevelIntensity > 0;
    const filterId = "shinyBevelFilter"; // Keep bevel filter ID consistent
    const filterAttribute = useBevelFilter ? `url(#${filterId})` : '';

    // Extrusion settings
    const extrusionDepth = this._ringExtrusion; // Max layers/offset
    const extrusionLayerOffset = 0.5; // Vertical offset per layer
    const extrusionDarkenFactor = 0.7; // How much to darken each layer

    // Label Z offset depends on effects - REMOVE extrusion dependency
    let labelZOffset = 2;
    if (this._bevelIntensity > 0) labelZOffset = 5;


    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
          /* Dynamically set host size */
          width: ${requiredWidth}px;
          height: ${requiredHeight}px;
          font-family: 'Arial', sans-serif;
          /* Add perspective for 3D effect */
          perspective: 1000px; /* Adjust value for intensity */
          /* Define CSS variables for disabled state */
          --disabled-opacity: ${this._disabledOpacity};
          --disabled-saturation: ${this._disabledSaturation};
        }
        .wheel-container {
          position: absolute;
          /* Center the drawing area within the host element */
          left: 50%;
          top: 50%;
          /* Apply perspective rotation along with centering */
          transform: translate(-50%, -50%) rotateX(${this._perspectiveAngleX}deg);
          /* Preserve 3D transformations for children */
          transform-style: preserve-3d;
          width: ${wheelDrawSize}px;
          height: ${wheelDrawSize}px;
        }
        /* ... existing styles for segment, segment-line, segment-label etc. ... */
        .segment {
          cursor: pointer;
          transition: filter 0.2s ease; /* Changed transition property */
        }
        .segment:hover {
          filter: brightness(1.2);
        }
        .segment-line {
          stroke: #fff; /* Default line color */
          stroke-width: 3px; /* Increased thickness */
          pointer-events: none;
          fill: none; /* Ensure path is not filled */
          transition: opacity 0.2s ease, filter 0.2s ease; /* Add transitions */
        }
        .segment-label {
          position: absolute;
          color: white; /* Default label color */
          /* Dynamically calculate font size */
          font-size: calc(14px * ${this._fontSizeScale});
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
          pointer-events: none;
          white-space: nowrap; /* Prevent labels from wrapping */
          /* Vertical centering and slight Z offset */
          transform: translateY(-50%) translateZ(${labelZOffset}px); /* Dynamic Z offset */
          transition: opacity 0.2s ease, filter 0.2s ease; /* Add transitions */
        }
        .left-label {
          text-align: right;
        }
        .right-label {
          text-align: left;
        }
        .segment.selected {
          filter: brightness(1.4); /* Slightly increased brightness for selection */
        }
        .disabled {
          opacity: var(--disabled-opacity) !important; /* Use important to override potential hover effects */
          filter: saturate(var(--disabled-saturation)) !important;
          cursor: not-allowed;
          pointer-events: none; /* Prevent clicks on SVG/HTML elements with this class */
        }
        /* Ensure hover doesn't override disabled state visually */
        .segment.disabled:hover {
           filter: saturate(var(--disabled-saturation)) !important; /* Keep saturation */
           /* Brightness filter on hover is removed by !important on filter above */
        }
        svg {
            position: absolute;
            top: 0;
            left: 0;
            /* SVG size matches the drawing area */
            width: ${wheelDrawSize}px;
            height: ${wheelDrawSize}px;
            overflow: visible; /* Allow lines/labels outside the SVG bounds */
        }
      </style>
      <div class="wheel-container">
         <svg viewBox="0 0 ${wheelDrawSize} ${wheelDrawSize}">
            <defs>
              ${useBevelFilter ? `
              <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <!-- Filter now only handles bevel/lighting, no morphology -->
                <feGaussianBlur in="SourceAlpha" stdDeviation="0.1" result="sourceAlphaForEffects"/>

                <!-- Calculate Lighting -->
                <feGaussianBlur in="sourceAlphaForEffects" stdDeviation="2" result="alphaBlurLight"/>
                <feSpecularLighting in="alphaBlurLight" surfaceScale="${surfaceScale}" specularConstant="${specularConstant}" specularExponent="${specularExponent}" lighting-color="#ffffff" result="specOut">
                  <fePointLight x="${lightX}" y="${lightY}" z="${lightZ}" />
                </feSpecularLighting>
                <feComposite in="specOut" in2="sourceAlphaForEffects" operator="in" result="specOutCut"/>

                <!-- Calculate Shadow -->
                <feGaussianBlur in="sourceAlphaForEffects" stdDeviation="2.5" result="shadowBlur"/>
                <feOffset dx="1.5" dy="1.5" in="shadowBlur" result="shadowOffset"/>
                <feFlood flood-color="#000000" flood-opacity="0.5" result="shadowColor"/>
                <feComposite in="shadowColor" in2="shadowOffset" operator="in" result="shadowShape"/>
                <feComposite in="shadowShape" in2="sourceAlphaForEffects" operator="out" result="innerShadow"/>

                <!-- Merge Layers -->
                <feMerge>
                    <feMergeNode in="innerShadow"/>
                    <feMergeNode in="SourceGraphic"/>
                    <feMergeNode in="specOutCut"/>
                </feMerge>
              </filter>
              ` : ''}
            </defs>
          <!-- Segments and lines will be added here -->
        </svg>
        <!-- Labels will be added directly to the container for easier positioning -->
      </div>
    `;

    const svg = this.shadowRoot.querySelector('svg');
    const container = this.shadowRoot.querySelector('.wheel-container');

    if (optionCount === 0) {
      return;
    }

    // Helper function to darken hex color
    function darkenColor(hex, factor) {
        if (!hex) return '#222'; // Fallback
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        r = Math.floor(r * factor);
        g = Math.floor(g * factor);
        b = Math.floor(b * factor);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // --- Draw Segments Layer by Layer (Bottom Up) ---
    for (let i = Math.floor(extrusionDepth); i >= 0; i--) { // Loop from bottom layer (i=depth) to top layer (i=0)
        const offsetY = i * extrusionLayerOffset;
        const isTopLayer = (i === 0);
        const layerColorFactor = isTopLayer ? 1 : extrusionDarkenFactor; // Use original color for top layer

        options.forEach((option, index) => {
            // Calculate segment points for this layer
            const startAngle = (index / optionCount) * 2 * Math.PI;
            const endAngle = ((index + 1) / optionCount) * 2 * Math.PI;
            const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

            const layerStartX1 = centerX + innerRadius * Math.sin(startAngle);
            const layerStartY1 = centerY - innerRadius * Math.cos(startAngle) + offsetY;
            const layerEndX1 = centerX + outerRadius * Math.sin(startAngle);
            const layerEndY1 = centerY - outerRadius * Math.cos(startAngle) + offsetY;
            const layerStartX2 = centerX + innerRadius * Math.sin(endAngle);
            const layerStartY2 = centerY - innerRadius * Math.cos(endAngle) + offsetY;
            const layerEndX2 = centerX + outerRadius * Math.sin(endAngle);
            const layerEndY2 = centerY - outerRadius * Math.cos(endAngle) + offsetY;

            // Determine color for this layer
            const segmentBaseColor = option.color || '#3498db';
            const currentLayerColor = isTopLayer ? segmentBaseColor : darkenColor(segmentBaseColor, layerColorFactor);

            // Create path element for this layer segment
            const layerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            layerPath.setAttribute('d', `
              M ${layerStartX1} ${layerStartY1}
              L ${layerEndX1} ${layerEndY1}
              A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${layerEndX2} ${layerEndY2}
              L ${layerStartX2} ${layerStartY2}
              A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${layerStartX1} ${layerStartY1}
              Z
            `);
            layerPath.setAttribute('fill', currentLayerColor);

            // Add segment-specific attributes ONLY to the top layer (i=0)
            if (isTopLayer) {
                layerPath.setAttribute('class', 'segment'); // Base class
                layerPath.dataset.index = index;
                // Add click listener ONLY if not disabled
                if (!option.disabled) {
                    layerPath.addEventListener('click', () => this._selectOption(index));
                }
                // Apply bevel/lighting filter only to the top segment
                if (filterAttribute) {
                    layerPath.setAttribute('filter', filterAttribute);
                }
            }
            // Add disabled class if option is disabled (applies to all layers)
            if (option.disabled) {
                layerPath.classList.add('disabled');
            }

            svg.appendChild(layerPath);
        });
    }


    // --- Draw Lines and Labels (After all segment layers) ---
    options.forEach((option, index) => {
        const startAngle = (index / optionCount) * 2 * Math.PI;
        const endAngle = ((index + 1) / optionCount) * 2 * Math.PI;
        const midAngle = (startAngle + endAngle) / 2;

        // Calculate line points based on the TOP layer (offsetY = 0)
        const lineTurnX = centerX + labelLineStartDistance * Math.sin(midAngle);
        const lineTurnY = centerY - labelLineStartDistance * Math.cos(midAngle); // No offsetY here

        const tolerance = 0.01;
        const sinMidAngle = Math.sin(midAngle);
        const isRightSide = sinMidAngle > tolerance;
        const isLeftSide = sinMidAngle < -tolerance;
        const isVertical = !isRightSide && !isLeftSide;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let lineEndX, lineEndY;

        // Line start point on the outer edge of the TOP segment
        const lineStartX = centerX + outerRadius * Math.sin(midAngle);
        const lineStartY = centerY - outerRadius * Math.cos(midAngle); // No offsetY

        if (isRightSide || isVertical) {
            lineEndX = lineTurnX + horizontalLineLength;
            lineEndY = lineTurnY;
            path.setAttribute('d', `M ${lineStartX} ${lineStartY} L ${lineTurnX} ${lineTurnY} L ${lineEndX} ${lineEndY}`);
        } else {
            lineEndX = lineTurnX - horizontalLineLength;
            lineEndY = lineTurnY;
            path.setAttribute('d', `M ${lineStartX} ${lineStartY} L ${lineTurnX} ${lineTurnY} L ${lineEndX} ${lineEndY}`);
        }

        path.setAttribute('class', 'segment-line');
        path.setAttribute('stroke', option.color || '#ffffff');
        // Conditionally add disabled class to line
        if (option.disabled && this._disableAffectsText) {
            path.classList.add('disabled');
        }
        svg.appendChild(path);

        const label = document.createElement('div');
        label.textContent = option.text;
        label.className = 'segment-label';
        label.style.color = option.color || '#ffffff';
        label.style.top = `${lineEndY}px`; // Position label based on line end Y

        // Conditionally add disabled class to label
        if (option.disabled && this._disableAffectsText) {
            label.classList.add('disabled');
        }

        if (isRightSide || isVertical) {
            label.classList.add('right-label');
            label.style.left = `${lineEndX + labelPadding}px`;
        } else {
            label.classList.add('left-label');
            label.style.right = `${wheelDrawSize - (lineEndX - labelPadding)}px`;
        }
        container.appendChild(label);
    });
  }

  _selectOption(index) {
    // Prevent selection if the option is disabled
    if (index < 0 || index >= this._options.length || this._options[index].disabled) {
        return;
    }

    if (index >= 0 && index < this._options.length) {
      this._selectedIndex = index;

      // Remove selected class from all segments
      const segments = this.shadowRoot.querySelectorAll('.segment');
      segments.forEach(segment => segment.classList.remove('selected'));

      // Add selected class to the chosen segment
      if (segments[index]) { // Check if segment exists
          segments[index].classList.add('selected');
      }

      // Dispatch custom event
      this.dispatchEvent(new CustomEvent('option-selected', {
        detail: {
          index: index,
          option: this._options[index]
        },
        bubbles: true,
        composed: true
      }));
    }
  }
}

customElements.define('dialogue-wheel', DialogueWheel);
