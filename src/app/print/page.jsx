/*
PrintDocument.mobile-friendly.jsx

Mobile-friendly React print component.
- Opens a new window containing printable HTML and calls print() from that window (works more reliably on mobile than printing the main page).
- Creates 2-3 pages of dummy content by default.
- Each page contains its own watermark and footer (per-page elements are more consistent across mobile browsers than "fixed" elements).
- Graceful fallback if popups are blocked.

Usage:
  import PrintDocument from './PrintDocument.mobile-friendly.jsx'
  <PrintDocument watermarkText="CONFIDENTIAL" footerText="Company Confidential" pages={3} />

Notes:
- The printable HTML uses absolute/inside-page watermark + footer so they appear on each printed page.
- Some mobile browsers still have quirks; the component tries to be robust (new-window + delayed print). If the popup is blocked we offer a fallback and brief instructions.
*/

'use client';


import React from 'react';

export default function PrintDocument({
  watermarkText = 'CONFIDENTIAL',
  footerText = 'Company Confidential - Do not distribute',
  pages = 3,
}) {
  // Build the HTML for one page (with its own watermark & footer)
  const buildPage = (pageNum) => {
    const paragraphs = Array.from({ length: 18 })
      .map(
        (_, i) =>
          `<p>Page ${pageNum} — filler paragraph ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Donec vel sem et urna accumsan efficitur.</p>`
      )
      .join('');

    return `
      <div class="page">
        <div class="page-watermark">${watermarkText}</div>
        <div class="page-content">
          <h1>Dummy Document — Page ${pageNum}</h1>
          ${paragraphs}
        </div>
        <div class="page-footer">${footerText} • Page ${pageNum}</div>
      </div>
    `;
  };

  // Create full printable HTML string with styles tuned for printing
  const makePrintableHtml = () => {
    const pagesHtml = Array.from({ length: pages })
      .map((_, i) => buildPage(i + 1))
      .join('');

    return `<!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Print Preview</title>
        <style>
          /* Print-friendly styles */
          @page { size: auto; margin: 15mm; }
          html, body { height: 100%; margin: 0; padding: 0; -webkit-print-color-adjust: exact; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #111; }

          /* Each .page is treated as a printed page. Using mm units helps with real-world print sizes. */
          .page { position: relative; page-break-after: always; min-height: 260mm; box-sizing: border-box; padding: 20mm; }

          .page h1 { margin-top: 0; font-size: 22px; }
          .page p { margin: 0 0 10px; line-height: 1.45; font-size: 14px; }

          /* Per-page watermark placed inside the .page to ensure it repeats on every printed page */
          .page-watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-30deg); font-size: 80px; opacity: 0.06; white-space: nowrap; pointer-events: none; z-index: 0; }

          /* Content sits above the watermark */
          .page-content { position: relative; z-index: 1; }

          /* Per-page footer located at the bottom of each .page */
          .page-footer { position: absolute; bottom: 12mm; left: 0; right: 0; text-align: center; font-size: 12px; color: #444; z-index: 1; }

          /* Avoid breaking paragraphs where possible */
          .page p { orphans: 3; widows: 3; }

          /* Optional: hide any on-screen-only elements when printing from the new window */
        </style>
      </head>
      <body>
        ${pagesHtml}
        <script>
          (function(){
            function doPrint(){
              try {
                window.focus();
                if (window.print) {
                  window.print();
                }
              } catch(e){
                console.error('Print error:', e);
              }
            }
            // Some mobile browsers require a small timeout
            window.addEventListener('load', function(){ setTimeout(doPrint, 250); });
          })();
        </script>
      </body>
      </html>`;
  };

  const handlePrint = () => {
    const html = makePrintableHtml();

    // Try opening a new window/tab (this is usually allowed because it's inside a user click handler)
    const newWin = window.open('', '_blank');

    if (!newWin) {
      // Popup blocked. Give a helpful fallback and attempt to navigate to an HTML blob (last resort).
      alert(
        'Popup blocked by the browser.\n\nPlease allow popups for this site, or use your browser menu (Share / Print) to print the page.\n\nAs a fallback the page will attempt to open the printable document in the current tab.'
      );

      try {
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        // navigate current tab to printable document (user can then print manually)
        window.location.href = url;
      } catch (e) {
        console.error('Fallback failed', e);
      }

      return;
    }

    // Write the printable HTML and close the document so the new window can load and trigger print.
    try {
      newWin.document.open();
      newWin.document.write(html);
      newWin.document.close();
    } catch (e) {
      console.error('Write to new window failed', e);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded focus:outline-none"
        aria-label="Print document"
      >
        Print Document
      </button>

      {/* Small on-screen preview (not a WYSIWYG print preview) */}
      <div className="mt-4 space-y-4">
        {Array.from({ length: Math.min(3, pages) }).map((_, idx) => (
          <div key={idx} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">Preview — Page {idx + 1}</h2>
            <p className="text-sm text-gray-600 mt-2">This is a small on-screen preview. The watermark & footer will be applied in the printed output (new tab/window).</p>
            <div className="mt-2 space-y-2">
              {Array.from({ length: 6 }).map((__, i) => (
                <p key={i} className="text-sm">Filler paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
