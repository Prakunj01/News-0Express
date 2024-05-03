import Hero from "./hero/Hero"
import Popular from "./popular/Popular"
import Side from "./sideContent/side/Side"
import "./style.css"
import React from 'react';

function HomePage() {
  return (
 <>
     <Hero />
      <main>
    
        <div className='container'>

          <section className='leftSideContent'>
           
         
          </section>
          <section className='mainContent'>
           
            <Popular />
          </section>

          <section className='sideContent'>
            <Side />
          </section>
        </div>
      </main>
  
 </>
  );
}
export default HomePage;