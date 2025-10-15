import React, { useEffect } from "react";
import HeroSection from "../../HeroSection/HeroSection";
import WhatWeOffer from "../../WhatWeOffer/WhatWeOffer";
import WhyIncomes from "../../WhyIncomes/WhyIncomes";
import HowItWorks from "../../HowItWorks/HowItWorks";
import Quotes from "../../Quotes/Quotes";
import Banner from "../../Banner/Banner";
import CallToAction from "../../CallToAction/CallToAction";
// import "../../Banner/Banner.css";

const LazyLoadingServices = React.lazy(() =>
  import("../../HomeServices/HomeServices")
);

export default function Home() {
  // // تخلي الصفحة تظهر من الاعلي
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);
  return (
    <>
      <div className="mx-auto">
        {/* <video className='w-100 h-100 p-5 mx-auto d-flex align-items-center' controls autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
        <Banner />
        <HeroSection />
        <WhatWeOffer />
        <WhyIncomes />
        <HowItWorks />
        <Quotes />
        <CallToAction />
      </div>
    </>
  );
}

// export default function Home() {
//   return (
//     <div className="home-page">
//       <HeroSection />
//       <WhatWeOffer />
//       <WhyIncomes />
//       <HowItWorks />
//       <Quotes />
//       <CallToAction />
//     </div>
//   );
// }
