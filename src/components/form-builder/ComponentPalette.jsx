// import * as React from "react"
// import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { components,componentCategories} from "@/lib/components";
// import DraggableComponent from "./DraggableComponent";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { 
//   Type, Pilcrow, Hash, Mail, Key, CheckSquare, CircleDot, ChevronsUpDown,
//   Phone, Calendar, Clock, Palette, Upload, ListChecks, Square, CheckCircle,
//   RotateCcw, PenTool, Star, GitCommit, ToggleLeft, Heading, Minus, Text,
//   MoveVertical
// } from "lucide-react";

// export default function ComponentPalette() {
//   // console.log('component',components)

  
//   const iconMap = {
//     'type': Type,
//     'pilcrow': Pilcrow,
//     'hash': Hash,
//     'mail': Mail,
//     'key': Key,
//     'phone': Phone,
//     'calendar': Calendar,
//     'clock': Clock,
//     'palette': Palette,
//     'upload': Upload,
//     'check-square': CheckSquare,
//     'circle-dot': CircleDot,
//     'chevrons-up-down': ChevronsUpDown,
//     'list-checks': ListChecks,
//     'square': Square,
//     'check-circle': CheckCircle,
//     'rotate-ccw': RotateCcw,
//     'pen-tool': PenTool,
//     'star': Star,
//     'git-commit': GitCommit,
//     'toggle-left': ToggleLeft,
//     'heading': Heading,
//     'minus': Minus,
//     'text': Text,
//     'move-vertical': MoveVertical
//   };
  
//   return (
//     <Card className="h-full">
//       <CardContent className="p-4 h-full">
//         <Tabs defaultValue="components">
//           <TabsList className="w-full">
//             <TabsTrigger value="components" className="flex-1">Components</TabsTrigger>
//             <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
//           </TabsList>

//           <TabsContent value="components">
//             <ScrollArea className="h-[calc(100vh-10rem)]">
//               <Accordion type="single" collapsible className="w-full">
             
//                 {Object.entries(componentCategories).map(([categoryId, category]) => {
//                    console.log('component',category)
//                   return (
//                       <AccordionItem key={categoryId} value={categoryId} className="border-b-0">
//                         <AccordionTrigger className="hover:no-underline py-2 px-4 rounded-lg hover:bg-accent">
//                           {category.label}
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           <div className="grid gap-2 pt-2">
//                             {category.components.map((componentType) => {
//                               const component = components[componentType];
//                               if (!component) return null;

//                               const IconComponent = iconMap[component.icon];
//                               return (
//                                 <DraggableComponent
//                                   key={component.type}
//                                   component={component}
//                                   className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent cursor-move"
//                                 >
//                                   {IconComponent && <IconComponent className="h-5 w-5" />}
//                                   <span>{component.label}</span>
//                                 </DraggableComponent>
//                               );
//                             })}
//                           </div>
//                         </AccordionContent>
//                       </AccordionItem>
//                     )})}
//               </Accordion>
//             </ScrollArea>
//           </TabsContent>

//           <TabsContent value="templates">
//             <ScrollArea className="h-[calc(100vh-10rem)]">
//               <div className="flex flex-col gap-2 p-2">
//                 <input
//                   type="file"
//                   accept=".json"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       const reader = new FileReader();
//                       reader.onload = (event) => {
//                         try {
//                           const template = JSON.parse(event.target.result);
//                           const { components, canvasStyle } = useFormBuilder.getState();
//                           useFormBuilder.setState({ 
//                             components: template.components,
//                             canvasStyle: template.style
//                           });
//                           toast({
//                             title: "Success",
//                             description: "Template loaded successfully",
//                           });
//                         } catch (error) {
//                           toast({
//                             title: "Error",
//                             description: "Failed to load template",
//                             variant: "destructive",
//                           });
//                         }
//                       };
//                       reader.readAsText(file);
//                     }
//                   }}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </ScrollArea>
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// }


import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { components, componentCategories } from "@/lib/components";
import DraggableComponent from "./DraggableComponent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormBuilder } from "@/store/form-builder";
import { useToast } from "@/hooks/use-toast";

export default function ComponentPalette() {
  const { setComponents, setCanvasStyle } = useFormBuilder();
  const { toast } = useToast();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        const { components, style } = jsonData;

        // Clear the canvas and render elements from the JSON
        setComponents(components);
        setCanvasStyle(style);

        // toast({
        //   title: "Success",
        //   description: "Form loaded successfully.",
        // });
      } catch (error) {
        // toast({
        //   title: "Error",
        //   description: "Failed to load form.",
        //   variant: "destructive",
        // });
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="h-full">
      <CardContent className="p-4 h-full">
        <Tabs defaultValue="components">
          <TabsList className="w-full">
            <TabsTrigger value="components" className="flex-1">Components</TabsTrigger>
            <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="components">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <Accordion type="single" collapsible className="w-full">
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
                          return (
                            <DraggableComponent
                              key={component.type}
                              component={component}
                              className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent cursor-move"
                            >
                              <span>{component.label}</span>
                            </DraggableComponent>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="templates">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="flex flex-col gap-2 p-2">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="w-full p-2 border rounded"
                />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}