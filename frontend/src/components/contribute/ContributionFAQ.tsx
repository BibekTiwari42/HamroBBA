"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I upload handwritten notes?",
    answer: "Yes, as long as the handwriting is clear, legible, and scanned properly into a PDF format.",
  },
  {
    question: "How long does review take?",
    answer: "Our standard review time is between 24 and 72 hours. We carefully check each document to ensure high quality.",
  },
  {
    question: "Can I update my submission?",
    answer: "Once submitted, you cannot edit it directly. However, you can submit an updated version and let us know in the notes field to replace the old one.",
  },
  {
    question: "Will I receive credit?",
    answer: "Yes! Outstanding contributors may be acknowledged on the HamroBBA platform unless you explicitly request to remain anonymous during submission.",
  },
  {
    question: "Can I upload multiple PDFs?",
    answer: "Yes, but we prefer you combine them into a single PDF if they belong to the same chapter or subject. Otherwise, you can fill out the form multiple times.",
  },
];

export default function ContributionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Still have questions? Reach out to us at <a href="mailto:support@hamrobba.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@hamrobba.com</a>
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="font-semibold text-lg text-slate-900 dark:text-white">
                {faq.question}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} 
              />
            </button>
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-slate-600 dark:text-slate-400">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}