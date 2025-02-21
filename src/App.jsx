// import React, {useState} from 'react'
// import { Switch, Route } from "wouter";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// // import { Toaster } from "@/components/ui/toaster";
// // import NotFound from "@/pages/not-found";
// import Home from "@/pages/home";
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import Layouts from './Layout';


// function Router() {
//   return (
//     <Switch>
//       <Route path="/" component={Home} />
//     </Switch>
//   );
// }

// function App() {
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <QueryClientProvider client={queryClient}>
//         <Router />
//         {/* <Toaster /> */}
//       </QueryClientProvider>
//     </DndProvider>
//   );
// }

// export default App;


import React from 'react';
import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layouts from '@/pages/Layout'; // Import the Layouts component
import Home from '@/pages/home';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        {/* Wrap the Router with Layouts */}
        <Layouts>
          <Router />
        </Layouts>
      </QueryClientProvider>
    </DndProvider>
  );
}

export default App;