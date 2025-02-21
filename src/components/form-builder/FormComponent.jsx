import * as React from "react"
import { useFormBuilder } from "@/store/form-builder";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useDrag, useDrop } from "react-dnd";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Star from "@/components/ui/star";

function validateField(value, validation) {
  if (!validation) return { isValid: true, message: '' };

  if (validation.required && !value) {
    return { isValid: false, message: validation.customMessage || 'This field is required' };
  }

  if (validation.minLength && value.length < validation.minLength) {
    return { 
      isValid: false, 
      message: validation.customMessage || `Minimum length is ${validation.minLength} characters`
    };
  }

  if (validation.maxLength && value.length > validation.maxLength) {
    return {
      isValid: false,
      message: validation.customMessage || `Maximum length is ${validation.maxLength} characters`
    };
  }

  if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
    return {
      isValid: false,
      message: validation.customMessage || 'Invalid format'
    };
  }

  if (validation.min !== null && value < validation.min) {
    return {
      isValid: false,
      message: validation.customMessage || `Value must be at least ${validation.min}`
    };
  }

  if (validation.max !== null && value > validation.max) {
    return {
      isValid: false,
      message: validation.customMessage || `Value must be at most ${validation.max}`
    };
  }

  return { isValid: true, message: '' };
}

export default function FormComponent({ component, index }) {
  const ref = useRef(null);
  const { selectComponent, selectedComponent, moveComponent } = useFormBuilder();
  const [value, setValue] = useState('');
  const [error, setError] = useState({ isValid: true, message: '' });

  const handleChange = (newValue) => {
    setValue(newValue);
    if (component.props.validation) {
      setError(validateField(newValue, component.props.validation));
    }
  };

  const [{ isDragging }, drag] = useDrag({
    type: "form-component-sort",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "form-component-sort",
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const renderComponent = () => {
    const style = component.props.style || {};
    const commonStyles = {
      fontSize: `${style.fontSize || 16}px`,
      fontWeight: style.fontWeight || 400,
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      borderWidth: `${style.borderWidth || 1}px`,
      borderRadius: `${style.borderRadius || 4}px`,
      padding: `${style.padding || 8}px`,
    };

    const commonProps = {
      'aria-invalid': !error.isValid,
      className: cn(
        !error.isValid && 'border-destructive'
      ),
      style: commonStyles
    };

    switch (component.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "tel":
      case "date":
      case "time":
      case "color":
      case "file":
        return (
          <div className="space-y-2" style={commonStyles}>
            <Label>{component.props.label}</Label>
            <Input
              {...commonProps}
              type={component.type}
              placeholder={component.props.placeholder}
              min={component.props.min}
              max={component.props.max}
              accept={component.type === 'file' ? component.props.accept : undefined}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
            />
            {!error.isValid && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2" style={commonStyles}>
            <Label>{component.props.label}</Label>
            <Textarea
              {...commonProps}
              placeholder={component.props.placeholder}
              rows={component.props.rows}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
            />
            {!error.isValid && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2" style={commonStyles}>
            <Checkbox checked={component.props.checked} />
            <Label>{component.props.label}</Label>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2" style={commonStyles}>
            <Label>{component.props.label}</Label>
            <RadioGroup value={component.props.value}>
              {component.props.options.map((option) => (
                <div key={option} className="flex items-center space-x-2" style={commonStyles}>
                  <RadioGroupItem value={option} />
                  <Label>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case "select":
      case "multiSelect":
        return (
          <div className="space-y-2" style={commonStyles}>
            <Label>{component.props.label}</Label>
            <Select
              {...commonProps}
              value={component.props.value}
              multiple={component.type === 'multiSelect'}
              onChange={(e) => handleChange(e.target.value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {component.props.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!error.isValid && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </div>
        );

      case "button":
      case "submit":
      case "reset":
        return (
          <Button
            type={component.type}
            variant={component.props.variant}
            style={commonStyles}
          >
            {component.props.text}
          </Button>
        );

      case "signature":
        return (
          <div className="space-y-2" style={commonStyles}>
            <Label>{component.props.label}</Label>
            <div
              className="border rounded-md bg-background"
              style={{
                width: component.props.width,
                height: component.props.height,
                ...commonStyles
              }}
            />
          </div>
        );

      case "rating":
        return (
          <div className="space-y-2" style={commonStyles}>
            <Label>{component.props.label}</Label>
            <div className="flex gap-1">
              {Array.from({ length: component.props.maxStars }).map((_, i) => (
                <Star
                  key={i}
                  filled={i < component.props.value}
                  className="h-5 w-5"
                />
              ))}
            </div>
          </div>
        );

      case "slider":
        return (
          <div className="space-y-2" style={commonStyles}>
            <Label>{component.props.label}</Label>
            <Slider
              {...commonProps}
              min={component.props.min}
              max={component.props.max}
              step={component.props.step}
              value={[component.props.value]}
              onChange={(e) => handleChange(e)}
            />
            {!error.isValid && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </div>
        );

      case "toggle":
        return (
          <div className="flex items-center space-x-2" style={commonStyles}>
            <Switch checked={component.props.checked} />
            <Label>{component.props.label}</Label>
          </div>
        );

      case "heading":
        return (
          <div className="py-2" style={commonStyles}>
            {React.createElement(
              component.props.level,
              { className: "font-bold", style: commonStyles },
              component.props.text
            )}
          </div>
        );

      case "divider":
        return (
          <Separator
            className={cn(
              "my-4",
              component.props.style === "dashed" && "border-dashed",
              component.props.style === "dotted" && "border-dotted"
            )}
            style={commonStyles}
          />
        );

      case "label":
        return (
          <Label className="block" style={commonStyles}>
            {component.props.text}
          </Label>
        );

      case "spacer":
        return (
          <div style={{ height: `${component.props.height}px`, ...commonStyles }} />
        );

      default:
        return null;
    }
  };

  return (
    <Card
      ref={ref}
      className={cn(
        "p-2 cursor-move transition-colors border-0",
        selectedComponent?.id === component.id && "ring-2 ring-primary",
        isDragging && "opacity-50",
        isOver && "bg-accent"
      )}
      onClick={() => selectComponent(component)}
    >
      {renderComponent()}
    </Card>
  );
}