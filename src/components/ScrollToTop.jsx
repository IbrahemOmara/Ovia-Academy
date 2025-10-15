// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // كل مرة يتغير فيها المسار (الرابط) هينزل لفوق الصفحة smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // المكون لا يعرض أي شيء
}
