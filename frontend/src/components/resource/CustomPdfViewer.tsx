"use client";

import { useState } from "react";

interface PdfViewerProps {
  url: string;
  title?: string;
}

export default function CustomPdfViewer({ url, title }: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const embeddedUrl = `${url}#toolbar=1&navpanes=0&scrollbar=1&view=FitH&zoom=FitH`;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
      
      {/* Custom Action Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-4 py-2.5 dark:border-slate-800/80 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="truncate text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-[200px] sm:max-w-xs">
            {title || "Document View"}
          </span>
        </div>

        <div className="flex items-center gap-2">   
          <a
            href={url}
            download
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            title="Download PDF"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>

      {/* Frame Viewport — Fixed: Changed calc offset from 250px to 190px to make it taller */}
      <div className="relative h-[calc(100vh-190px)] w-full bg-slate-100 dark:bg-slate-900/40">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-50 dark:bg-slate-950 z-10">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Loading Document...
            </span>
          </div>
        )}

        <object
          data={embeddedUrl}
          type="application/pdf"
          className="block h-full w-full opacity-0 transition-opacity duration-300"
          style={{ opacity: isLoading ? 0 : 1 }}
          onLoad={() => setIsLoading(false)}
        >
          <iframe
            src={embeddedUrl}
            className="block h-full w-full border-none"
            onLoad={() => setIsLoading(false)}
          />
        </object>
      </div>
    </div>
  );
}