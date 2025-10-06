'use client';
import React from "react";
import "./PrintDocument.css"; // we'll add CSS for print styles

const PrintDocument = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-container">
      <button onClick={handlePrint} className="print-btn">
        Print Document
      </button>

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

export default PrintDocument;
