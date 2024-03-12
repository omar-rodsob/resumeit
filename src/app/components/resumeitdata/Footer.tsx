import { useState } from "react";

export default function Footer() {
  const [dateFooter, setDate] = useState<number>(new Date().getFullYear());
  return (
    <footer className="bg-main p-5 rounded border-borderColor m-2 min-h-05 text-center"> 
         <p>{dateFooter} Created By Omar Rodriguez Soberanes</p>
    </footer>
  );
}
