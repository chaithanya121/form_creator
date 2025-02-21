import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import ComponentPalette from "./ComponentPalette";
import Canvas from "./Canvas";
import PropertiesEditor from "./PropertiesEditor";
import { useFormBuilder } from "@/store/form-builder";

export default function FormBuilder() {
  const { isPreviewMode, togglePreviewMode } = useFormBuilder();

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="h-12 border-b flex items-center justify-end px-4 bg-background">
        <Button
          variant="outline"
          size="sm"
          onClick={togglePreviewMode}
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Exit Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Preview Form
            </>
          )}
        </Button>
      </div>

      <div className="h-[calc(100vh-3rem)]">
        <ResizablePanelGroup direction="horizontal">
          {!isPreviewMode && (
            <>
              <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
                <ComponentPalette />
              </ResizablePanel>

              <ResizableHandle />
            </>
          )}

          <ResizablePanel defaultSize={isPreviewMode ? 100 : 55}>
            <Canvas />
          </ResizablePanel>

          {!isPreviewMode && (
            <>
              <ResizableHandle />

              <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
                <PropertiesEditor />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
```

### 2. ComponentPalette.jsx
```jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { components, componentCategories } from "@/lib/components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DraggableComponent from "./DraggableComponent";
import { 
  Type, Pilcrow, Hash, Mail, Key, CheckSquare, CircleDot, ChevronsUpDown,
  Phone, Calendar, Clock, Palette, Upload, ListChecks, Square, CheckCircle,
  RotateCcw, PenTool, Star, GitCommit, ToggleLeft, Heading, Minus, Text,
  MoveVertical
} from "lucide-react";

const iconMap = {
  'type': Type,
  'pilcrow': Pilcrow,
  'hash': Hash,
  'mail': Mail,
  'key': Key,
  'phone': Phone,
  'calendar': Calendar,
  'clock': Clock,
  'palette': Palette,
  'upload': Upload,
  'check-square': CheckSquare,
  'circle-dot': CircleDot,
  'chevrons-up-down': ChevronsUpDown,
  'list-checks': ListChecks,
  'square': Square,
  'check-circle': CheckCircle,
  'rotate-ccw': RotateCcw,
  'pen-tool': PenTool,
  'star': Star,
  'git-commit': GitCommit,
  'toggle-left': ToggleLeft,
  'heading': Heading,
  'minus': Minus,
  'text': Text,
  'move-vertical': MoveVertical
};

export default function ComponentPalette() {
  return (
    <Card className="h-full rounded-none border-0 border-r">
      <CardHeader className="border-b">
        <CardTitle>Components</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <CardContent className="p-4">
          <Accordion type="multiple" className="space-y-4">
            {Object.entries(componentCategories).map(([categoryId, category]) => (
              <AccordionItem key={categoryId} value={categoryId} className="border-b-0">
                <AccordionTrigger className="hover:no-underline py-2 px-4 rounded-lg hover:bg-accent">
                  {category.label}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pt-2">
                    {category.components.map((componentType) => {
                      const component = components[componentType];
                      if (!component) return null;

                      const IconComponent = iconMap[component.icon];
                      return (
                        <DraggableComponent
                          key={component.type}
                          component={component}
                          className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent cursor-move"
                        >
                          {IconComponent && <IconComponent className="h-5 w-5" />}
                          <span>{component.label}</span>
                        </DraggableComponent>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
```

### 3. DraggableComponent.jsx
```jsx
import { useDrag } from 'react-dnd';
import { cn } from '@/lib/utils';

export default function DraggableComponent({ component, children, className }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'form-component',
    item: { type: component.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      className={cn(
        className,
        isDragging && 'opacity-50',
        'transition-opacity duration-200'
      )}
    >
      {children}
    </div>
  );
}
```

### 4. Canvas.jsx
```jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormBuilder } from "@/store/form-builder";
import { useDrop } from "react-dnd";
import { components } from "@/lib/components";
import FormComponent from "./FormComponent";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";

export default function Canvas() {
  const { 
    components: formComponents, 
    addComponent, 
    isPreviewMode,
    canvasStyle 
  } = useFormBuilder();

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'form-component',
    drop: (item) => {
      const component = components[item.type];
      if (component) {
        addComponent({
          id: nanoid(),
          type: item.type,
          props: { ...component.defaultProps }
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const canvasStyles = {
    backgroundColor: canvasStyle.backgroundColor,
    backgroundImage: canvasStyle.backgroundImage ? `url(${canvasStyle.backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <Card className="h-full rounded-none border-0">
      <CardHeader className="border-b">
        <CardTitle>{isPreviewMode ? "Form Preview" : "Form Canvas"}</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <CardContent
          ref={!isPreviewMode ? dropRef : undefined}
          className={cn(
            "min-h-[calc(100vh-8rem)] p-4 grid gap-2",
            !isPreviewMode && isOver && canDrop && "bg-accent/50",
            isPreviewMode && "max-w-2xl mx-auto"
          )}
          style={canvasStyles}
        >
          {formComponents.map((component, index) => (
            <FormComponent
              key={component.id}
              component={component}
              index={index}
              isPreview={isPreviewMode}
            />
          ))}
          {formComponents.length === 0 && !isPreviewMode && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Drag components here
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
```

### 5. PropertiesEditor.jsx
```jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormBuilder } from "@/store/form-builder";
import { components } from "@/lib/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PropertiesEditor() {
  const { selectedComponent, updateComponent, removeComponent, canvasStyle, updateCanvasStyle } = useFormBuilder();

  if (!selectedComponent) {
    return (
      <Card className="h-full rounded-none border-0 border-l">
        <CardHeader className="border-b">
          <CardTitle>Canvas Settings</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <CardContent className="space-y-6 p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <Input
                  type="color"
                  value={canvasStyle.backgroundColor}
                  onChange={(e) => updateCanvasStyle({ backgroundColor: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Background Image URL</Label>
                <Input
                  type="text"
                  value={canvasStyle.backgroundImage}
                  onChange={(e) => updateCanvasStyle({ backgroundImage: e.target.value })}
                  placeholder="Enter image URL..."
                />
              </div>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    );
  }

  const componentDef = components[selectedComponent.type];
  const hasValidation = selectedComponent.props.validation !== undefined;
  const hasOptions = ['select', 'multiSelect', 'radio'].includes(selectedComponent.type);
  const hasStyles = !['divider', 'spacer'].includes(selectedComponent.type);

  const renderPropertyField = (prop) => {
    const isValidationProp = prop.name.startsWith('validation.');
    const isStyleProp = prop.name.startsWith('style.');
    if (isValidationProp && !hasValidation) return null;
    if (prop.name === 'options') return null;
    if (isStyleProp) return null;

    const value = isValidationProp
      ? selectedComponent.props.validation[prop.name.split('.')[1]]
      : selectedComponent.props[prop.name];

    const handleChange = (newValue) => {
      if (isValidationProp) {
        const validationKey = prop.name.split('.')[1];
        updateComponent(selectedComponent.id, {
          validation: {
            ...selectedComponent.props.validation,
            [validationKey]: newValue
          }
        });
      } else {
        updateComponent(selectedComponent.id, { [prop.name]: newValue });
      }
    };

    if (prop.type === 'boolean') {
      return (
        <div key={prop.name} className="flex items-center justify-between">
          <Label htmlFor={prop.name}>{prop.label}</Label>
          <Switch
            id={prop.name}
            checked={value}
            onCheckedChange={handleChange}
          />
        </div>
      );
    }

    return (
      <div key={prop.name} className="space-y-2">
        <Label htmlFor={prop.name}>{prop.label}</Label>
        <Input
          id={prop.name}
          value={value || ''}
          onChange={(e) => handleChange(
            prop.type === 'number' ? Number(e.target.value) : e.target.value
          )}
          type={prop.type === 'number' ? 'number' : 'text'}
        />
      </div>
    );
  };

  const renderOptionsEditor = () => {
    if (!hasOptions) return null;

    const addOption = () => {
      const options = [...selectedComponent.props.options];
      options.push(`Option ${options.length + 1}`);
      updateComponent(selectedComponent.id, { options });
    };

    const removeOption = (index) => {
      const options = [...selectedComponent.props.options];
      options.splice(index, 1);
      updateComponent(selectedComponent.id, { options });

      // If the current value is the removed option, reset it
      if (selectedComponent.props.value === selectedComponent.props.options[index]) {
        updateComponent(selectedComponent.id, { value: options[0] || '' });
      }
    };

    const updateOption = (index, value) => {
      const options = [...selectedComponent.props.options];
      options[index] = value;
      updateComponent(selectedComponent.id, { options });

      // Update the value if it matches the old option
      if (selectedComponent.props.value === selectedComponent.props.options[index]) {
        updateComponent(selectedComponent.id, { value });
      }
    };

    return (
      <AccordionItem value="options">
        <AccordionTrigger>Options</AccordionTrigger>
        <AccordionContent className="space-y-4 pt-2">
          {selectedComponent.props.options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeOption(index)}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full"
            onClick={addOption}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </AccordionContent>
      </AccordionItem>
    );
  };

  const renderStylesEditor = () => {
    if (!hasStyles) return null;

    const style = selectedComponent.props.style || {};

    const updateStyle = (key, value) => {
      updateComponent(selectedComponent.id, {
        style: { ...style, [key]: value }
      });
    };

    return (
      <AccordionItem value="styles">
        <AccordionTrigger>Styles</AccordionTrigger>
        <AccordionContent className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Input
              type="number"
              value={style.fontSize || '16'}
              onChange={(e) => updateStyle('fontSize', e.target.value)}
              min="8"
              max="72"
            />
          </div>
          <div className="space-y-2">
            <Label>Font Weight</Label>
            <Input
              type="number"
              value={style.fontWeight || '400'}
              onChange={(e) => updateStyle('fontWeight', e.target.value)}
              min="100"
              max="900"
              step="100"
            />
          </div>
          <div className="space-y-2">
            <Label>Text Color</Label>
            <Input
              type="color"
              value={style.color || '#000000'}
              onChange={(e) => updateStyle('color', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Input
              type="color"
              value={style.backgroundColor || '#ffffff'}
              onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Border Color</Label>
            <Input
              type="color"
              value={style.borderColor || '#000000'}
              onChange={(e) => updateStyle('borderColor', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Border Width</Label>
            <Input
              type="number"
              value={style.borderWidth || '1'}
              onChange={(e) => updateStyle('borderWidth', e.target.value)}
              min="0"
              max="10"
            />
          </div>
          <div className="space-y-2">
            <Label>Border Radius</Label>
            <Input
              type="number"
              value={style.borderRadius || '4'}
              onChange={(e) => updateStyle('borderRadius', e.target.value)}
              min="0"
              max="50"
            />
          </div>
          <div className="space-y-2">
            <Label>Padding</Label>
            <Input
              type="number"
              value={style.padding || '8'}
              onChange={(e) => updateStyle('padding', e.target.value)}
              min="0"
              max="100"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  const basicProps = componentDef.properties.filter(p => !p.name.startsWith('validation.') && p.name !== 'options');
  const validationProps = componentDef.properties.filter(p => p.name.startsWith('validation.'));

  return (
    <Card className="h-full rounded-none border-0 border-l">
      <CardHeader className="border-b">
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <CardContent className="space-y-6 p-4">
          <Accordion type="multiple" collapsible defaultValue={["basic"]}>
            <AccordionItem value="basic">
              <AccordionTrigger>Basic Properties</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                {basicProps.map(renderPropertyField)}
              </AccordionContent>
            </AccordionItem>

            {renderOptionsEditor()}
            {renderStylesEditor()}

            {hasValidation && validationProps.length > 0 && (
              <AccordionItem value="validation">
                <AccordionTrigger>Validation Rules</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  {validationProps.map(renderPropertyField)}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <Button
            variant="destructive"
            className="w-full"
            onClick={() => removeComponent(selectedComponent.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Component
          </Button>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
```

### 6. store/form-builder.js
```js
import { create } from 'zustand';

export const useFormBuilder = create((set) => ({
  components: [],
  selectedComponent: null,
  isPreviewMode: false,
  canvasStyle: {
    backgroundColor: '#ffffff',
    backgroundImage: '',
  },
  addComponent: (component) => 
    set((state) => ({ components: [...state.components, component] })),
  removeComponent: (id) =>
    set((state) => ({ 
      components: state.components.filter((c) => c.id !== id),
      selectedComponent: state.selectedComponent?.id === id ? null : state.selectedComponent
    })),
  updateComponent: (id, props) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, props: { ...c.props, ...props } } : c
      ),
      selectedComponent: state.selectedComponent?.id === id 
        ? { ...state.selectedComponent, props: { ...state.selectedComponent.props, ...props } }
        : state.selectedComponent
    })),
  selectComponent: (component) =>
    set({ selectedComponent: component }),
  moveComponent: (dragIndex, hoverIndex) =>
    set((state) => {
      const newComponents = [...state.components];
      const dragComponent = newComponents[dragIndex];
      newComponents.splice(dragIndex, 1);
      newComponents.splice(hoverIndex, 0, dragComponent);
      return { components: newComponents };
    }),
  togglePreviewMode: () =>
    set((state) => ({ 
      isPreviewMode: !state.isPreviewMode,
      selectedComponent: null 
    })),
  updateCanvasStyle: (style) =>
    set((state) => ({
      canvasStyle: { ...state.canvasStyle, ...style }
    })),
}));
```

## Features Overview

1. **Interactive Form Building**
   - Drag and drop components from palette
   - Real-time component editing
   - Component reordering
   - Component styling

2. **Component Properties**
   - Basic properties (label, placeholder, etc.)
   - Validation rules
   - Styling options
   - Option management for select/radio components

3. **Canvas Features**
   - Background customization (color and image)
   - Preview mode
   - Responsive layout
   - Component alignment

4. **Validation Rules**
   - Required field validation
   - Min/max length
   - Pattern matching
   - Custom error messages
   - Number range validation

## Technical Stack

- React with TypeScript
- Zustand for state management
- React DnD for drag and drop
- Shadcn UI components
- Tailwind CSS for styling
- Lucide React icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev