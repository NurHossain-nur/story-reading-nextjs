'use client';
import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./PrintDocument.css"; // optional extra styles

export default function PrintDocument() {
  const handlePrint = () => {
    window.print();
  };

  // Example watermark settings
  const watermarkSettings = {
    text: "CONFIDENTIAL",
    position: "Center",
    orientation: "Diagonal", // Diagonal | Horizontal | Vertical
    fontSize: 40,
    fontFamily: "Arial",
    opacity: 20, // percentage
  };

  // Rotation helper
  const getWatermarkRotation = (orientation) => {
    switch (orientation) {
      case "Diagonal":
        return "rotate(-30deg)";
      case "Vertical":
        return "rotate(-90deg)";
      case "Horizontal":
      default:
        return "rotate(0deg)";
    }
  };

  // Position helper
  const getWatermarkPositionStyles = (position) => {
    const map = {
      "Top-Left": { top: "5%", left: "5%" },
      Top: { top: "5%", left: "50%", transform: "translateX(-50%)" },
      "Top-Right": { top: "5%", right: "5%" },
      Left: { top: "50%", left: "5%", transform: "translateY(-50%)" },
      Center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
      Right: { top: "50%", right: "5%", transform: "translateY(-50%)" },
      "Bottom-Left": { bottom: "5%", left: "5%" },
      Bottom: { bottom: "5%", left: "50%", transform: "translateX(-50%)" },
      "Bottom-Right": { bottom: "5%", right: "5%" },
    };
    return map[position] || map["Center"];
  };

  return (
    <MathJaxContext>
      <div className="print-container">
        <button onClick={handlePrint} className="print-btn">
          Print Document
        </button>

        {/* Inject print-only styles */}
        <style>
          {`
            /* Hide everything except .print-content during print */
            @media print {
              body * {
                visibility: hidden !important;
              }
              .print-container,
              .print-container * {
                visibility: visible !important;
              }
              .print-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              .print-btn {
                display: none !important; /* don't print the button */
              }

              body::before {
                content: "${watermarkSettings.text}";
                position: fixed;
                ${Object.entries(getWatermarkPositionStyles(watermarkSettings.position))
                  .map(([k, v]) => `${k}: ${v};`)
                  .join("\n")}
                transform: ${
                  getWatermarkPositionStyles(watermarkSettings.position).transform || ""
                } ${getWatermarkRotation(watermarkSettings.orientation)};
                font-size: ${watermarkSettings.fontSize}px;
                font-family: '${watermarkSettings.fontFamily}', sans-serif;
                opacity: ${watermarkSettings.opacity / 100};
                color: #000;
                white-space: nowrap;
                z-index: 9999;
                pointer-events: none;
                user-select: none;
              }
            }

            @media screen {
              body::before {
                display: none;
              }
            }
          `}
        </style>

        {/* Printable content */}
        <div className="print-content">
          <h1>Dummy Document with MathJax</h1>
          <p>
            Example inline formula: <MathJax inline>{"\\(E = mc^2\\)"}</MathJax>
          </p>
          <p>
            Example block formula:
            <MathJax>{"\\[ \\frac{a}{b} + \\sqrt{x^2 + y^2} \\]"}</MathJax>
          </p>

          {Array.from({ length: 40 }).map((_, i) => (
            <p key={i}>
              Page filler paragraph {i + 1}: Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nulla facilisi.
            </p>
          ))}
        </div>
      </div>
    </MathJaxContext>
  );
}
