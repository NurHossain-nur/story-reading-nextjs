'use client';
import React from "react";
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
    <div className="print-container">
      <button onClick={handlePrint} className="print-btn">
        Print Document
      </button>

      {/* Inject watermark styles */}
      <style>
        {`
          @media print {
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
        <h1>Dummy Document</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget egestas
          nunc nisl eget nunc. Praesent euismod, nisl eget consectetur
          consectetur, nunc nisl aliquam nunc, eget egestas nunc nisl eget nunc.
        </p>
        <p>
          (Repeat this text many times to make sure it covers 2–3 pages when
          printed)...
        </p>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i}>
            Page filler paragraph {i + 1}: Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nulla facilisi.
          </p>
        ))}
      </div>
    </div>
  );
};
