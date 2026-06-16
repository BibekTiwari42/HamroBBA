"use client";

import { useState } from "react";

interface TabNavProps {
  tabs: {
    id: string;
    label: string;
    icon?: string;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNav({
  tabs,
  activeTab,
  onTabChange,
}: TabNavProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
