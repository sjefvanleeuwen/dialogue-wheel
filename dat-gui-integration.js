document.addEventListener('DOMContentLoaded', () => {
  const dialogueWheel = document.getElementById('dialogueWheel'); // Use getElementById

  if (!dialogueWheel) {
    console.error('Dialogue wheel element with id="dialogueWheel" not found.');
    return;
  }

  // Set initial appearance properties unconditionally to apply desired defaults from image
  dialogueWheel.wheelRadius = 90; // Apply default
  dialogueWheel.ringThickness = 40; // Apply default
  dialogueWheel.perspectiveAngleX = 45; // Apply default
  dialogueWheel.fontSizeScale = 1.5; // Apply default
  dialogueWheel.bevelIntensity = 0.5; // Apply default
  dialogueWheel.ringExtrusion = 35; // Apply default
  dialogueWheel.disabledOpacity = 0.5; // Apply default
  dialogueWheel.disabledSaturation = 0.25; // Apply default from image
  dialogueWheel.disableAffectsText = false; // Apply default from image (checkbox unchecked)

  // Keep track of GUI folders to remove them later
  let guiFolders = [];
  let gui = null; // Hold the GUI instance

  // Initial options data - Updated with story dialogue
  let optionsData = [
    { text: "Try to bribe him.", color: "#2ecc71", disabled: false }, // Green - Charm/Money?
    { text: "Intimidate him.", color: "#e74c3c", disabled: false }, // Red - Aggression
    { text: "[Lie] Say you're lost.", color: "#f1c40f", disabled: false }, // Yellow - Deception
    { text: "Ask for directions.", color: "#3498db", disabled: false }, // Blue - Neutral/Inquire
    { text: "Attack!", color: "#c0392b", disabled: true }, // Darker Red - Aggression (Disabled)
    { text: "Remain silent.", color: "#95a5a6", disabled: false } // Grey - Passive
  ];

  // Function to update the dialogue wheel component's options
  function updateDialogueWheelOptions() {
    // Pass a copy to avoid potential direct mutation issues if the component modifies the array
    dialogueWheel.options = [...optionsData];
  }

  // Function to rebuild the GUI based on optionsData
  function rebuildGui() {
    // Destroy existing GUI if it exists
    if (gui) {
      gui.destroy();
    }
    gui = new dat.GUI();
    guiFolders = []; // Reset folders array

    // --- Appearance Folder ---
    const appearanceFolder = gui.addFolder('Appearance');
    // Control wheelRadius - link directly to the element's property
    appearanceFolder.add(dialogueWheel, 'wheelRadius', 50, 500, 5).name('Wheel Radius (px)').onChange(value => {
        // The setter in the component handles re-rendering
    });
    // Control ringThickness - link directly to the element's property
    appearanceFolder.add(dialogueWheel, 'ringThickness', 10, 200, 1).name('Ring Thickness (px)').onChange(value => {
       // Ensure thickness doesn't exceed radius visually in control (optional)
       // This might require more complex logic if you want the slider max to dynamically change
       // For now, the component setter handles the Math.min logic.
    });
    // Control perspectiveAngleX - link directly to the element's property
    appearanceFolder.add(dialogueWheel, 'perspectiveAngleX', -60, 60, 1).name('Perspective Angle').onChange(value => {
        // Setter in component handles re-rendering
    });
    // Control fontSizeScale - link directly to the element's property
    appearanceFolder.add(dialogueWheel, 'fontSizeScale', 0.5, 2.5, 0.1).name('Font Size Scale').onChange(value => {
        // Setter in component handles re-rendering
    });
    // Control bevelIntensity - Adjust range back to 0-1
    appearanceFolder.add(dialogueWheel, 'bevelIntensity', 0, 1, 0.01).name('Bevel Intensity').onChange(value => {
        // Setter in component handles re-rendering
    });
    // Control ringExtrusion - link directly to the element's property
    appearanceFolder.add(dialogueWheel, 'ringExtrusion', 0, 50, 0.1).name('Ring Extrusion (px)').onChange(value => {
        // Setter in component handles re-rendering
    });
    // Add controls for disabled appearance
    appearanceFolder.add(dialogueWheel, 'disabledOpacity', 0, 1, 0.01).name('Disabled Opacity');
    appearanceFolder.add(dialogueWheel, 'disabledSaturation', 0, 1, 0.01).name('Disabled Saturation');
    // Add checkbox for disableAffectsText
    appearanceFolder.add(dialogueWheel, 'disableAffectsText').name('Disable Affects Text');
    appearanceFolder.open();

    // --- Options Folders ---
    optionsData.forEach((option, index) => {
      const folder = gui.addFolder(`Option ${index + 1}`);
      folder.add(option, 'text').name('Text').onChange(updateDialogueWheelOptions);
      folder.addColor(option, 'color').name('Color').onChange(updateDialogueWheelOptions);
      // Add checkbox for disabled state
      folder.add(option, 'disabled').name('Disabled').onChange(updateDialogueWheelOptions);
      folder.add({ remove: () => {
        optionsData.splice(index, 1); // Remove option from data
        rebuildGui(); // Rebuild the GUI entirely
        updateDialogueWheelOptions(); // Update the wheel
      }}, 'remove').name('Remove Option');
      // folder.open(); // Keep option folders closed by default now
      guiFolders.push(folder);
    });

    // Add button to add new options - include disabled property
    gui.add({ add: () => {
      optionsData.push({ text: "New Dialogue", color: "#ffffff", disabled: false }); // Add default option
      rebuildGui(); // Rebuild GUI to include the new option folder
      updateDialogueWheelOptions(); // Update the wheel
    }}, 'add').name('Add Option');
  }

  // Initial setup
  rebuildGui(); // Build the initial GUI
  updateDialogueWheelOptions(); // Render the wheel with initial options

  // Example of listening to the option-selected event
  dialogueWheel.addEventListener('option-selected', (event) => {
    console.log('Option Selected:', event.detail.option);
    const selectionDisplay = document.getElementById('selectionInfo');
    if (selectionDisplay) {
        selectionDisplay.textContent = `Selected: ${event.detail.option.text}`;
        selectionDisplay.style.color = event.detail.option.color || 'white';
    }
  });

});
