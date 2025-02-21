import * as React from "react"
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