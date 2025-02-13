import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string; // Ensures `property` is a string
}

const BarcodeGenerator: React.FC<BarcodeProps> = ({
  value = "123456789012" 
}) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null); // Explicitly define ref type

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: "upc", // Change format if needed
        lineColor: "#fff",
        width: 2,
        height: 50,
        displayValue: true,
        background: "none",
      });
    }
  }, [value]); // Re-run when value changes

  return <svg ref={barcodeRef}></svg>;
};

export default BarcodeGenerator;
