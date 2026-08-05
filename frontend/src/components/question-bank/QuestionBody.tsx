"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css"; // Injects standard structural equation math styles

interface Props {
  content: string;
}

/**
 * Converts plain text subsections (a., b., c. or i., ii., iii.) into HTML ordered lists
 */
function convertPlainTextLists(content: string): string {
  let result = content;

  // Pattern 1: Letter subsections (a., b., c., d., etc.)
  // Find all lines starting with letter. and group them into one list
  const lines = result.split('\n');
  let inLetterList = false;
  let letterItems: string[] = [];
  let newLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isLetterItem = /^[a-z]\.\s+/.test(line.trim());
    
    if (isLetterItem) {
      if (!inLetterList) {
        inLetterList = true;
        letterItems = [];
      }
      const cleaned = line.trim().replace(/^[a-z]\.\s+/i, "");
      letterItems.push(`<li>${cleaned}</li>`);
    } else {
      if (inLetterList && letterItems.length > 0) {
        // End of letter list - output the OL
        newLines.push('<ol type="a" style="list-style-type: lower-alpha;">');
        newLines.push(...letterItems);
        newLines.push('</ol>');
        letterItems = [];
        inLetterList = false;
      }
      newLines.push(line);
    }
  }
  
  // Handle case where list is at end of content
  if (inLetterList && letterItems.length > 0) {
    newLines.push('<ol type="a" style="list-style-type: lower-alpha;">');
    newLines.push(...letterItems);
    newLines.push('</ol>');
  }
  
  result = newLines.join('\n');

  // Pattern 2: Roman numeral subsections (i., ii., iii., iv., etc.)
  // Matches: i. text\nii. text\niii. text (consecutive roman numerals)
  const romanPattern = /(?:^|\n)((?:(?:i{1,3}|iv|v|vi{0,3}|ix|x)\.\s+.+(?:\n|$))+)/gim;
  result = result.replace(romanPattern, (match, listContent) => {
    const items = listContent.trim().split(/\n(?=(?:i{1,3}|iv|v|vi{0,3}|ix|x)\.\s)/i);
    const listItems = items
      .map((item: string) => {
        const cleaned = item.replace(/^(?:i{1,3}|iv|v|vi{0,3}|ix|x)\.\s+/i, "").trim();
        return `<li>${cleaned}</li>`;
      })
      .join("\n");
    return `\n<ol type="i" style="list-style-type: lower-roman;">\n${listItems}\n</ol>\n`;
  });

  // Pattern 3: Numeric subsections (1., 2., 3., etc.)
  // Only convert if there are at least 2 consecutive numbered items
  const numericPattern = /(?:^|\n)((?:\d+\.\s+.+(?:\n|$)){2,})/gim;
  result = result.replace(numericPattern, (match, listContent) => {
    const items = listContent.trim().split(/\n(?=\d+\.\s)/);
    const listItems = items
      .map((item: string) => {
        const cleaned = item.replace(/^\d+\.\s+/, "").trim();
        return `<li>${cleaned}</li>`;
      })
      .join("\n");
    return `\n<ol>\n${listItems}\n</ol>\n`;
  });

  return result;
}

export default function QuestionBody({ content }: Props) {
  // Memoize the content transformation to ensure consistent output between SSR and CSR
  const normalizedContent = useMemo(() => {
    // Safe normalization: Converts LaTeX \( \) delimiters to standard $ inline symbols
    let result = content
      .replace(/\\ \(/g, "$")
      .replace(/\\ \)/g, "$")
      .replace(/\\\(/g, "$")
      .replace(/\\\)/g, "$");

    // Auto-detect and convert plain text lists (a., b., c. or i., ii., iii.)
    result = convertPlainTextLists(result);
    
    // Debug: log the converted HTML
    if (result.includes('<ol type="a"')) {
      console.log('Converted HTML:', result.substring(result.indexOf('<ol type="a"'), result.indexOf('</ol>') + 5));
    }
    
    return result;
  }, [content]);

  return (
    <div className="
      text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200
      
      /* Minimal paragraph spacing - matching original compact layout */
      [&_p]:mb-1
      
      /* Ordered and unordered lists with proper subsection styling */
      [&_ol]:my-2 [&_ol]:ml-6 [&_ol]:space-y-1
      [&_ul]:my-2 [&_ul]:ml-6 [&_ul]:space-y-1
      [&_li]:leading-relaxed
      
      /* Nested list styling */
      [&_ol_ol]:ml-5 [&_ol_ol]:mt-1
      [&_ol_ol_ol]:ml-5
      [&_ul]:list-disc
      [&_ul_ul]:list-circle [&_ul_ul]:ml-5 [&_ul_ul]:mt-1
      
      /* Table styling - responsive and versatile for financial statements, charts, balance sheets */
      [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-xs
      [&_table]:border [&_table]:border-slate-300 dark:[&_table]:border-slate-700
      [&_table]:shadow-sm [&_table]:rounded-lg [&_table]:overflow-hidden
      
      /* Table header styling (th) */
      [&_th]:bg-slate-100 [&_th]:font-bold [&_th]:text-slate-900 
      dark:[&_th]:bg-slate-800 dark:[&_th]:text-slate-100
      [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-center [&_th]:border
      [&_th]:border-slate-300 dark:[&_th]:border-slate-700
      
      /* Table cell styling (td) */
      [&_td]:px-3 [&_td]:py-2 [&_td]:text-left [&_td]:border
      [&_td]:border-slate-200 dark:[&_td]:border-slate-800
      
      /* Table row styling */
      [&_tr]:border-b [&_tr]:border-slate-200 dark:[&_tr]:border-slate-800
      [&_tbody_tr:hover]:bg-slate-50 dark:[&_tbody_tr:hover]:bg-slate-900/30
      [&_tbody_tr:last-child]:border-b-0
      
      /* Support for financial tables - right-align numeric columns when needed */
      [&_td[align=right]]:text-right [&_td[align=right]]:tabular-nums
      [&_td[align=center]]:text-center
      
      /* Strong/bold text in tables for totals/subtotals */
      [&_table_strong]:font-bold [&_table_strong]:text-slate-900 
      dark:[&_table_strong]:text-slate-100
      
      /* Images and charts */
      [&_img]:my-4 [&_img]:mx-auto [&_img]:max-w-full [&_img]:h-auto
      [&_img]:rounded-lg [&_img]:shadow-md
      
      /* Blockquotes for special instructions or notes */
      [&_blockquote]:my-4 [&_blockquote]:pl-4 [&_blockquote]:border-l-4
      [&_blockquote]:border-blue-400 [&_blockquote]:italic
      [&_blockquote]:text-slate-600 dark:[&_blockquote]:text-slate-400
      
      /* Code blocks for formulas or special formatting */
      [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-slate-100
      [&_code]:text-slate-800 dark:[&_code]:bg-slate-800 dark:[&_code]:text-slate-200
      [&_code]:text-xs [&_code]:font-mono
      
      /* Headings within question text */
      [&_h1]:text-base [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2
      [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-2
      [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1.5
      
      /* Horizontal rules for section breaks */
      [&_hr]:my-4 [&_hr]:border-slate-200 dark:[&_hr]:border-slate-800
    ">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}