// src/components/Tabs.tsx
import React, { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  const renderContent = () => {
    const activeTabContent = tabs.find((tab) => tab.label === activeTab);
    return activeTabContent?.content;
  };

  return (
    <div className="p-6">
      <div className="flex space-x-4 border-b-2 border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`py-2 px-4 ${
              activeTab === tab.label
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default Tabs;
