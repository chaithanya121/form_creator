// import * as React from "react"
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
// import { Button } from "@/components/ui/button";
// import { Eye, EyeOff } from "lucide-react";
// import ComponentPalette from "./ComponentPalette";
// import Canvas from "./Canvas";
// import PropertiesEditor from "./PropertiesEditor";
// import { useFormBuilder } from "@/store/form-builder";

// export default function FormBuilder() {
//   const { isPreviewMode, togglePreviewMode } = useFormBuilder();

//   const handleSubmit = () => {
//     const formData = {
//       components: components,
//       style: canvasStyle,
//       timestamp: new Date().toISOString()
//     };
    
//     const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `form-${formData.timestamp}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
    
//     toast({
//       title: "Success",
//       description: "Form saved successfully",
//     });
//   };

//   return (
//     <div className="h-screen w-full overflow-hidden">
//       <div className="h-12 border-b flex items-center justify-between px-4 bg-background">
//         <Button
//           variant="default"
//           size="sm"
//           onClick={handleSubmit}
//         >
//           Save Form
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={togglePreviewMode}
//         >
//           {isPreviewMode ? (
//             <>
//               <EyeOff className="h-4 w-4 mr-2" />
//               Exit Preview
//             </>
//           ) : (
//             <>
//               <Eye className="h-4 w-4 mr-2" />
//               Preview Form
//             </>
//           )}
//         </Button>
//       </div>

//       <div className="h-[calc(100vh-3rem)]">
//         <ResizablePanelGroup direction="horizontal">
//           {!isPreviewMode && (
//             <>
//               <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
//                 <ComponentPalette />
//               </ResizablePanel>

//               <ResizableHandle />
//             </>
//           )}

//           <ResizablePanel defaultSize={isPreviewMode ? 100 : 55}>
//             <Canvas />
//           </ResizablePanel>

//           {!isPreviewMode && (
//             <>
//               <ResizableHandle />

//               <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
//                 <PropertiesEditor />
//               </ResizablePanel>
//             </>
//           )}
//         </ResizablePanelGroup>
//       </div>
//     </div>
//   );
// }

import * as React from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import ComponentPalette from "./ComponentPalette";
import Canvas from "./Canvas";
import PropertiesEditor from "./PropertiesEditor";
import { useFormBuilder } from "@/store/form-builder";
import { useToast } from "@/hooks/use-toast"; // Import the toast hook

export default function FormBuilder() {
  const { isPreviewMode, togglePreviewMode, components, canvasStyle } = useFormBuilder();
  const { toast } = useToast(); // Initialize the toast function

  const handleSubmit = () => {
    // Ensure there are components and styles to save
    if (!components || !canvasStyle) {
      toast({
        title: "Error",
        description: "No components or styles to save.",
        variant: "destructive",
      });
      return;
    }

    // Prepare the data to be saved
    const formData = {
      components: components,
      style: canvasStyle,
      timestamp: new Date().toISOString(),
    };

    // Convert the data to a JSON string
    const jsonString = JSON.stringify(formData, null, 2);

    // Create a Blob with the JSON data
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `form-${formData.timestamp}.json`; // Set the file name
    document.body.appendChild(a);
    a.click(); // Trigger the download

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show a success toast
    toast({
      title: "Success",
      description: "Form saved successfully.",
    });
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      {/* Header with Save and Preview buttons */}
      <div className="h-12 border-b flex items-center justify-between px-4 bg-background">
        <Button
          variant="default"
          size="sm"
          onClick={handleSubmit}
          aria-label="Save Form"
        >
          Save Form
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={togglePreviewMode}
          aria-label={isPreviewMode ? "Exit Preview" : "Preview Form"}
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

      {/* Resizable panels for the form builder */}
      <div className="h-[calc(100vh-3rem)]">
        <ResizablePanelGroup direction="horizontal">
          {/* Left panel (Component Palette) */}
          {!isPreviewMode && (
            <>
              <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
                <ComponentPalette />
              </ResizablePanel>
              <ResizableHandle />
            </>
          )}

          {/* Middle panel (Canvas) */}
          <ResizablePanel defaultSize={isPreviewMode ? 100 : 55}>
            <Canvas />
          </ResizablePanel>

          {/* Right panel (Properties Editor) */}
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