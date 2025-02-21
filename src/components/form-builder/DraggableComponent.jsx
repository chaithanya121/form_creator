import * as React from "react"
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