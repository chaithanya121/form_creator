// import { create } from 'zustand';

// export const useFormBuilder = create((set) => ({
//   components: [],
//   selectedComponent: null,
//   isPreviewMode: false,
//   canvasStyle: {
//     backgroundColor: '#ffffff',
//     backgroundImage: '',
//   },
//   addComponent: (component) => 
//     set((state) => ({ components: [...state.components, component] })),
//   removeComponent: (id) =>
//     set((state) => ({ 
//       components: state.components.filter((c) => c.id !== id),
//       selectedComponent: state.selectedComponent?.id === id ? null : state.selectedComponent
//     })),
//   updateComponent: (id, props) =>
//     set((state) => ({
//       components: state.components.map((c) =>
//         c.id === id ? { ...c, props: { ...c.props, ...props } } : c
//       ),
//       selectedComponent: state.selectedComponent?.id === id 
//         ? { ...state.selectedComponent, props: { ...state.selectedComponent.props, ...props } }
//         : state.selectedComponent
//     })),
//   selectComponent: (component) =>
//     set({ selectedComponent: component }),
//   moveComponent: (dragIndex, hoverIndex) =>
//     set((state) => {
//       const newComponents = [...state.components];
//       const dragComponent = newComponents[dragIndex];
//       newComponents.splice(dragIndex, 1);
//       newComponents.splice(hoverIndex, 0, dragComponent);
//       return { components: newComponents };
//     }),
//   togglePreviewMode: () =>
//     set((state) => ({ 
//       isPreviewMode: !state.isPreviewMode,
//       selectedComponent: null 
//     })),
//   updateCanvasStyle: (style) =>
//     set((state) => ({
//       canvasStyle: { ...state.canvasStyle, ...style }
//     })),
// }));


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
  // Add these actions
  setComponents: (components) => set({ components }),
  setCanvasStyle: (style) => set({ canvasStyle: style }),
}));