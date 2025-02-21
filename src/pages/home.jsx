import React, {useState} from 'react'
import FormBuilder from "@/components/form-builder/FormBuilder";

import Header from '@/components/Navigation/Header';
import Footer from '@/components/Navigation/Footer';

export default function Home() {
  return (
    // <div className="min-h-screen bg-background">
    //   <FormBuilder />
    // </div>

    // <div style={{display: 'flex',flexDirection: "column","min-height": "100vh"}}>
    //     <Header />
        <main style={{flex: 1, marginTop: '2%', padding: '20px'}}>
          <div class="min-h-screen bg-background">
            <FormBuilder />
          </div>
        </main>
  //       <Footer />
  //   </div>
   );
}
