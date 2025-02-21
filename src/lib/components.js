// export const componentCategories = {
//   basic: {
//     label: 'Basic Inputs',
//     components: ['text', 'number', 'password', 'email', 'phone', 'date', 'time', 'color', 'file']
//   },
//   selection: {
//     label: 'Selection Inputs',
//     components: ['checkbox', 'radio', 'select', 'multiSelect']
//   },
//   textArea: {
//     label: 'Text Areas',
//     components: ['textarea']
//   },
//   buttons: {
//     label: 'Buttons',
//     components: ['button', 'submit', 'reset']
//   },
//   special: {
//     label: 'Special Inputs',
//     components: ['signature', 'rating', 'slider', 'toggle']
//   },
//   layout: {
//     label: 'Layout Elements',
//     components: ['heading', 'divider', 'label', 'spacer']
//   }
// };

// export const components = {
//   // Basic Inputs
//   text: {
//     type: 'text',
//     category: 'basic',
//     label: 'Text Input',
//     icon: 'type',
//     defaultProps: {
//       label: 'Text Input',
//       placeholder: 'Enter text...',
//       required: false,
//       validation: {
//         minLength: 0,
//         maxLength: 100,
//         pattern: '',
//         customMessage: ''
//       }
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'placeholder', type: 'text', label: 'Placeholder' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//       { name: 'validation.minLength', type: 'number', label: 'Min Length' },
//       { name: 'validation.maxLength', type: 'number', label: 'Max Length' },
//       { name: 'validation.pattern', type: 'text', label: 'Pattern (Regex)' },
//       { name: 'validation.customMessage', type: 'text', label: 'Custom Error Message' },
//     ],
//   },
//   number: {
//     type: 'number',
//     category: 'basic',
//     label: 'Number Input',
//     icon: 'hash',
//     defaultProps: {
//       label: 'Number',
//       placeholder: 'Enter number...',
//       required: false,
//       validation: {
//         min: null,
//         max: null,
//         step: 1,
//         customMessage: ''
//       }
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'placeholder', type: 'text', label: 'Placeholder' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//       { name: 'validation.min', type: 'number', label: 'Minimum Value' },
//       { name: 'validation.max', type: 'number', label: 'Maximum Value' },
//       { name: 'validation.step', type: 'number', label: 'Step' },
//       { name: 'validation.customMessage', type: 'text', label: 'Custom Error Message' },
//     ],
//   },
//   password: {
//     type: 'password',
//     category: 'basic',
//     label: 'Password Input',
//     icon: 'key',
//     defaultProps: {
//       label: 'Password',
//       placeholder: 'Enter password...',
//       required: false,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'placeholder', type: 'text', label: 'Placeholder' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//     ],
//   },
//   email: {
//     type: 'email',
//     category: 'basic',
//     label: 'Email Input',
//     icon: 'mail',
//     defaultProps: {
//       label: 'Email',
//       placeholder: 'Enter email...',
//       required: false,
//       validation: {
//         pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
//         customMessage: 'Please enter a valid email address'
//       }
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'placeholder', type: 'text', label: 'Placeholder' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//       { name: 'validation.pattern', type: 'text', label: 'Pattern (Regex)' },
//       { name: 'validation.customMessage', type: 'text', label: 'Custom Error Message' },
//     ],
//   },
//   phone: {
//     type: 'tel',
//     category: 'basic',
//     label: 'Phone Input',
//     icon: 'phone',
//     defaultProps: {
//       label: 'Phone',
//       placeholder: 'Enter phone number...',
//       required: false,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'placeholder', type: 'text', label: 'Placeholder' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//     ],
//   },
//   date: {
//     type: 'date',
//     category: 'basic',
//     label: 'Date Input',
//     icon: 'calendar',
//     defaultProps: {
//       label: 'Date',
//       required: false,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//     ],
//   },
//   time: {
//     type: 'time',
//     category: 'basic',
//     label: 'Time Input',
//     icon: 'clock',
//     defaultProps: {
//       label: 'Time',
//       required: false,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//     ],
//   },
//   color: {
//     type: 'color',
//     category: 'basic',
//     label: 'Color Picker',
//     icon: 'palette',
//     defaultProps: {
//       label: 'Color',
//       required: false,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//     ],
//   },
//   file: {
//     type: 'file',
//     category: 'basic',
//     label: 'File Upload',
//     icon: 'upload',
//     defaultProps: {
//       label: 'File Upload',
//       accept: '*/*',
//       required: false,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'accept', type: 'text', label: 'Accepted File Types' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//     ],
//   },
//   // Selection Inputs
//   checkbox: {
//     type: 'checkbox',
//     category: 'selection',
//     label: 'Checkbox',
//     icon: 'check-square',
//     defaultProps: {
//       label: 'Checkbox',
//       checked: false,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'checked', type: 'boolean', label: 'Checked' },
//     ],
//   },
//   radio: {
//     type: 'radio',
//     category: 'selection',
//     label: 'Radio Group',
//     icon: 'circle-dot',
//     defaultProps: {
//       label: 'Radio Group',
//       options: ['Option 1', 'Option 2', 'Option 3'],
//       value: 'Option 1',
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'options', type: 'text', label: 'Options (comma-separated)' },
//       { name: 'value', type: 'options', label: 'Default Value' },
//     ],
//   },
//   select: {
//     type: 'select',
//     category: 'selection',
//     label: 'Select',
//     icon: 'chevrons-up-down',
//     defaultProps: {
//       label: 'Select',
//       options: ['Option 1', 'Option 2', 'Option 3'],
//       value: 'Option 1',
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'options', type: 'text', label: 'Options (comma-separated)' },
//       { name: 'value', type: 'options', label: 'Default Value' },
//     ],
//   },
//   multiSelect: {
//     type: 'multiSelect',
//     category: 'selection',
//     label: 'Multi-select',
//     icon: 'list-checks',
//     defaultProps: {
//       label: 'Multi-select',
//       options: ['Option 1', 'Option 2', 'Option 3'],
//       values: [],
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'options', type: 'text', label: 'Options (comma-separated)' },
//     ],
//   },
//   // Text Areas
//   textarea: {
//     type: 'textarea',
//     category: 'textArea',
//     label: 'Text Area',
//     icon: 'pilcrow',
//     defaultProps: {
//       label: 'Text Area',
//       placeholder: 'Enter text...',
//       required: false,
//       rows: 4,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'placeholder', type: 'text', label: 'Placeholder' },
//       { name: 'required', type: 'boolean', label: 'Required' },
//       { name: 'rows', type: 'number', label: 'Rows' },
//     ],
//   },
//   // Buttons
//   button: {
//     type: 'button',
//     category: 'buttons',
//     label: 'Button',
//     icon: 'square',
//     defaultProps: {
//       text: 'Button',
//       variant: 'default',
//     },
//     properties: [
//       { name: 'text', type: 'text', label: 'Button Text' },
//       { name: 'variant', type: 'options', label: 'Variant', options: ['default', 'outline', 'secondary', 'ghost', 'link'] },
//     ],
//   },
//   submit: {
//     type: 'submit',
//     category: 'buttons',
//     label: 'Submit Button',
//     icon: 'check-circle',
//     defaultProps: {
//       text: 'Submit',
//       variant: 'default',
//     },
//     properties: [
//       { name: 'text', type: 'text', label: 'Button Text' },
//       { name: 'variant', type: 'options', label: 'Variant', options: ['default', 'outline', 'secondary', 'ghost', 'link'] },
//     ],
//   },
//   reset: {
//     type: 'reset',
//     category: 'buttons',
//     label: 'Reset Button',
//     icon: 'rotate-ccw',
//     defaultProps: {
//       text: 'Reset',
//       variant: 'outline',
//     },
//     properties: [
//       { name: 'text', type: 'text', label: 'Button Text' },
//       { name: 'variant', type: 'options', label: 'Variant', options: ['default', 'outline', 'secondary', 'ghost', 'link'] },
//     ],
//   },
//   // Special Inputs
//   signature: {
//     type: 'signature',
//     category: 'special',
//     label: 'Signature Pad',
//     icon: 'pen-tool',
//     defaultProps: {
//       label: 'Signature',
//       width: 300,
//       height: 150,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'width', type: 'number', label: 'Width' },
//       { name: 'height', type: 'number', label: 'Height' },
//     ],
//   },
//   rating: {
//     type: 'rating',
//     category: 'special',
//     label: 'Star Rating',
//     icon: 'star',
//     defaultProps: {
//       label: 'Rating',
//       maxStars: 5,
//       value: 0,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'maxStars', type: 'number', label: 'Maximum Stars' },
//       { name: 'value', type: 'number', label: 'Default Value' },
//     ],
//   },
//   slider: {
//     type: 'slider',
//     category: 'special',
//     label: 'Slider',
//     icon: 'git-commit',
//     defaultProps: {
//       label: 'Slider',
//       min: 0,
//       max: 100,
//       step: 1,
//       value: 50,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'min', type: 'number', label: 'Minimum' },
//       { name: 'max', type: 'number', label: 'Maximum' },
//       { name: 'step', type: 'number', label: 'Step' },
//       { name: 'value', type: 'number', label: 'Default Value' },
//     ],
//   },
//   toggle: {
//     type: 'toggle',
//     category: 'special',
//     label: 'Toggle Switch',
//     icon: 'toggle-left',
//     defaultProps: {
//       label: 'Toggle',
//       checked: false,
//     },
//     properties: [
//       { name: 'label', type: 'text', label: 'Label' },
//       { name: 'checked', type: 'boolean', label: 'Checked' },
//     ],
//   },
//   // Layout Elements
//   heading: {
//     type: 'heading',
//     category: 'layout',
//     label: 'Heading',
//     icon: 'heading',
//     defaultProps: {
//       text: 'Heading',
//       level: 'h2',
//     },
//     properties: [
//       { name: 'text', type: 'text', label: 'Text' },
//       { name: 'level', type: 'options', label: 'Level', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
//     ],
//   },
//   divider: {
//     type: 'divider',
//     category: 'layout',
//     label: 'Divider',
//     icon: 'minus',
//     defaultProps: {
//       style: 'solid',
//     },
//     properties: [
//       { name: 'style', type: 'options', label: 'Style', options: ['solid', 'dashed', 'dotted'] },
//     ],
//   },
//   label: {
//     type: 'label',
//     category: 'layout',
//     label: 'Label',
//     icon: 'text',
//     defaultProps: {
//       text: 'Label',
//     },
//     properties: [
//       { name: 'text', type: 'text', label: 'Text' },
//     ],
//   },
//   spacer: {
//     type: 'spacer',
//     category: 'layout',
//     label: 'Spacer',
//     icon: 'move-vertical',
//     defaultProps: {
//       height: 20,
//     },
//     properties: [
//       { name: 'height', type: 'number', label: 'Height (px)' },
//     ],
//   },
// };

export const componentCategories = {
  basic: {
    label: 'Basic Inputs',
    components: ['text', 'number', 'password', 'email', 'phone', 'date', 'time', 'color', 'file']
  },
  selection: {
    label: 'Selection Inputs',
    components: ['checkbox', 'radio', 'select', 'multiSelect']
  },
  textArea: {
    label: 'Text Areas',
    components: ['textarea']
  },
  buttons: {
    label: 'Buttons',
    components: ['button', 'submit', 'reset']
  },
  special: {
    label: 'Special Inputs',
    components: ['signature', 'rating', 'slider', 'toggle']
  },
  layout: {
    label: 'Layout Elements',
    components: ['heading', 'divider', 'label', 'spacer']
  }
};

export const components = {
  // Basic Inputs
  text: {
    type: 'text',
    category: 'basic',
    label: 'Text Input',
    icon: 'type',
    defaultProps: {
      label: 'Text Input',
      placeholder: 'Enter text...',
      required: false,
      validation: {
        minLength: 0,
        maxLength: 100,
        pattern: '',
        customMessage: ''
      }
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'placeholder', type: 'text', label: 'Placeholder' },
      { name: 'required', type: 'boolean', label: 'Required' },
      { name: 'validation.minLength', type: 'number', label: 'Min Length' },
      { name: 'validation.maxLength', type: 'number', label: 'Max Length' },
      { name: 'validation.pattern', type: 'text', label: 'Pattern (Regex)' },
      { name: 'validation.customMessage', type: 'text', label: 'Custom Error Message' },
    ],
  },
  number: {
    type: 'number',
    category: 'basic',
    label: 'Number Input',
    icon: 'hash',
    defaultProps: {
      label: 'Number',
      placeholder: 'Enter number...',
      required: false,
      validation: {
        min: null,
        max: null,
        step: 1,
        customMessage: ''
      }
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'placeholder', type: 'text', label: 'Placeholder' },
      { name: 'required', type: 'boolean', label: 'Required' },
      { name: 'validation.min', type: 'number', label: 'Minimum Value' },
      { name: 'validation.max', type: 'number', label: 'Maximum Value' },
      { name: 'validation.step', type: 'number', label: 'Step' },
      { name: 'validation.customMessage', type: 'text', label: 'Custom Error Message' },
    ],
  },
  password: {
    type: 'password',
    category: 'basic',
    label: 'Password Input',
    icon: 'key',
    defaultProps: {
      label: 'Password',
      placeholder: 'Enter password...',
      required: false,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'placeholder', type: 'text', label: 'Placeholder' },
      { name: 'required', type: 'boolean', label: 'Required' },
    ],
  },
  email: {
    type: 'email',
    category: 'basic',
    label: 'Email Input',
    icon: 'mail',
    defaultProps: {
      label: 'Email',
      placeholder: 'Enter email...',
      required: false,
      validation: {
        pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
        customMessage: 'Please enter a valid email address'
      }
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'placeholder', type: 'text', label: 'Placeholder' },
      { name: 'required', type: 'boolean', label: 'Required' },
      { name: 'validation.pattern', type: 'text', label: 'Pattern (Regex)' },
      { name: 'validation.customMessage', type: 'text', label: 'Custom Error Message' },
    ],
  },
  phone: {
    type: 'tel',
    category: 'basic',
    label: 'Phone Input',
    icon: 'phone',
    defaultProps: {
      label: 'Phone',
      placeholder: 'Enter phone number...',
      required: false,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'placeholder', type: 'text', label: 'Placeholder' },
      { name: 'required', type: 'boolean', label: 'Required' },
    ],
  },
  date: {
    type: 'date',
    category: 'basic',
    label: 'Date Input',
    icon: 'calendar',
    defaultProps: {
      label: 'Date',
      required: false,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'required', type: 'boolean', label: 'Required' },
    ],
  },
  time: {
    type: 'time',
    category: 'basic',
    label: 'Time Input',
    icon: 'clock',
    defaultProps: {
      label: 'Time',
      required: false,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'required', type: 'boolean', label: 'Required' },
    ],
  },
  color: {
    type: 'color',
    category: 'basic',
    label: 'Color Picker',
    icon: 'palette',
    defaultProps: {
      label: 'Color',
      required: false,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'required', type: 'boolean', label: 'Required' },
    ],
  },
  file: {
    type: 'file',
    category: 'basic',
    label: 'File Upload',
    icon: 'upload',
    defaultProps: {
      label: 'File Upload',
      accept: '*/*',
      required: false,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'accept', type: 'text', label: 'Accepted File Types' },
      { name: 'required', type: 'boolean', label: 'Required' },
    ],
  },
  // Selection Inputs
  checkbox: {
    type: 'checkbox',
    category: 'selection',
    label: 'Checkbox',
    icon: 'check-square',
    defaultProps: {
      label: 'Checkbox',
      checked: false,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'checked', type: 'boolean', label: 'Checked' },
    ],
  },
  radio: {
    type: 'radio',
    category: 'selection',
    label: 'Radio Group',
    icon: 'circle-dot',
    defaultProps: {
      label: 'Radio Group',
      options: ['Option 1', 'Option 2', 'Option 3'],
      value: 'Option 1',
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'options', type: 'text', label: 'Options (comma-separated)' },
      { name: 'value', type: 'options', label: 'Default Value' },
    ],
  },
  select: {
    type: 'select',
    category: 'selection',
    label: 'Select',
    icon: 'chevrons-up-down',
    defaultProps: {
      label: 'Select',
      options: ['Option 1', 'Option 2', 'Option 3'],
      value: 'Option 1',
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'options', type: 'text', label: 'Options (comma-separated)' },
      { name: 'value', type: 'options', label: 'Default Value' },
    ],
  },
  multiSelect: {
    type: 'multiSelect',
    category: 'selection',
    label: 'Multi-select',
    icon: 'list-checks',
    defaultProps: {
      label: 'Multi-select',
      options: ['Option 1', 'Option 2', 'Option 3'],
      values: [],
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'options', type: 'text', label: 'Options (comma-separated)' },
    ],
  },
  // Text Areas
  textarea: {
    type: 'textarea',
    category: 'textArea',
    label: 'Text Area',
    icon: 'pilcrow',
    defaultProps: {
      label: 'Text Area',
      placeholder: 'Enter text...',
      required: false,
      rows: 4,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'placeholder', type: 'text', label: 'Placeholder' },
      { name: 'required', type: 'boolean', label: 'Required' },
      { name: 'rows', type: 'number', label: 'Rows' },
    ],
  },
  // Buttons
  button: {
    type: 'button',
    category: 'buttons',
    label: 'Button',
    icon: 'square',
    defaultProps: {
      text: 'Button',
      variant: 'default',
    },
    properties: [
      { name: 'text', type: 'text', label: 'Button Text' },
      { name: 'variant', type: 'options', label: 'Variant', options: ['default', 'outline', 'secondary', 'ghost', 'link'] },
    ],
  },
  submit: {
    type: 'submit',
    category: 'buttons',
    label: 'Submit Button',
    icon: 'check-circle',
    defaultProps: {
      text: 'Submit',
      variant: 'default',
    },
    properties: [
      { name: 'text', type: 'text', label: 'Button Text' },
      { name: 'variant', type: 'options', label: 'Variant', options: ['default', 'outline', 'secondary', 'ghost', 'link'] },
    ],
  },
  reset: {
    type: 'reset',
    category: 'buttons',
    label: 'Reset Button',
    icon: 'rotate-ccw',
    defaultProps: {
      text: 'Reset',
      variant: 'outline',
    },
    properties: [
      { name: 'text', type: 'text', label: 'Button Text' },
      { name: 'variant', type: 'options', label: 'Variant', options: ['default', 'outline', 'secondary', 'ghost', 'link'] },
    ],
  },
  // Special Inputs
  signature: {
    type: 'signature',
    category: 'special',
    label: 'Signature Pad',
    icon: 'pen-tool',
    defaultProps: {
      label: 'Signature',
      width: 300,
      height: 150,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'width', type: 'number', label: 'Width' },
      { name: 'height', type: 'number', label: 'Height' },
    ],
  },
  rating: {
    type: 'rating',
    category: 'special',
    label: 'Star Rating',
    icon: 'star',
    defaultProps: {
      label: 'Rating',
      maxStars: 5,
      value: 0,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'maxStars', type: 'number', label: 'Maximum Stars' },
      { name: 'value', type: 'number', label: 'Default Value' },
    ],
  },
  slider: {
    type: 'slider',
    category: 'special',
    label: 'Slider',
    icon: 'git-commit',
    defaultProps: {
      label: 'Slider',
      min: 0,
      max: 100,
      step: 1,
      value: 50,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'min', type: 'number', label: 'Minimum' },
      { name: 'max', type: 'number', label: 'Maximum' },
      { name: 'step', type: 'number', label: 'Step' },
      { name: 'value', type: 'number', label: 'Default Value' },
    ],
  },
  toggle: {
    type: 'toggle',
    category: 'special',
    label: 'Toggle Switch',
    icon: 'toggle-left',
    defaultProps: {
      label: 'Toggle',
      checked: false,
    },
    properties: [
      { name: 'label', type: 'text', label: 'Label' },
      { name: 'checked', type: 'boolean', label: 'Checked' },
    ],
  },
  // Layout Elements
  heading: {
    type: 'heading',
    category: 'layout',
    label: 'Heading',
    icon: 'heading',
    defaultProps: {
      text: 'Heading',
      level: 'h2',
    },
    properties: [
      { name: 'text', type: 'text', label: 'Text' },
      { name: 'level', type: 'options', label: 'Level', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    ],
  },
  divider: {
    type: 'divider',
    category: 'layout',
    label: 'Divider',
    icon: 'minus',
    defaultProps: {
      style: 'solid',
    },
    properties: [
      { name: 'style', type: 'options', label: 'Style', options: ['solid', 'dashed', 'dotted'] },
    ],
  },
  label: {
    type: 'label',
    category: 'layout',
    label: 'Label',
    icon: 'text',
    defaultProps: {
      text: 'Label',
    },
    properties: [
      { name: 'text', type: 'text', label: 'Text' },
    ],
  },
  spacer: {
    type: 'spacer',
    category: 'layout',
    label: 'Spacer',
    icon: 'move-vertical',
    defaultProps: {
      height: 20,
    },
    properties: [
      { name: 'height', type: 'number', label: 'Height (px)' },
    ],
  },
};