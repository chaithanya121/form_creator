
import * as React from "react";
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
      if (isPreviewMode) return; // Disable drop in preview mode
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
          ref={!isPreviewMode ? dropRef : undefined} // Disable drop ref in preview mode
          className={cn(
            "min-h-[calc(100vh-8rem)] p-4 grid gap-2",
            !isPreviewMode && isOver && canDrop && "bg-accent/50",
            isPreviewMode && "max-w-2xl mx-auto"
          )}
          style={canvasStyles}
        >
          {/* {isPreviewMode && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
                pointerEvents: "none", // Prevent interaction with the overlay
              }}
            >
              Preview Mode
            </div>
          )} */}
          {formComponents.map((component, index) => (
            <FormComponent
              key={component.id}
              component={component}
              index={index}
              isPreview={isPreviewMode} // Pass isPreviewMode to FormComponent
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