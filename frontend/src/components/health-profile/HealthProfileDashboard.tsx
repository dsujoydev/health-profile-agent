import React, { useState } from "react";
import { HealthProfileGreeting } from "./HealthProfileGreeting";
import { ProgramSuggestion } from "./ProgramSuggestion";
import { HealthAssessment } from "./HealthAssessment";

type TabType = "greeting" | "suggestion" | "assessment";

export function HealthProfileDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("greeting");

  const tabs = [
    { id: "greeting" as TabType, label: "Get Greeting", icon: "👋" },
    { id: "suggestion" as TabType, label: "Program Suggestion", icon: "💡" },
    { id: "assessment" as TabType, label: "Health Assessment", icon: "📋" },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "greeting":
        return <HealthProfileGreeting />;
      case "suggestion":
        return <ProgramSuggestion />;
      case "assessment":
        return <HealthAssessment />;
      default:
        return <HealthProfileGreeting />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏥 Health AI Agents</h1>
          <p className="text-gray-600 text-lg">Your AI-powered health and wellness companion</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id ? "bg-blue-600 text-white shadow-sm" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Component */}
        <div className="mb-8">{renderActiveComponent()}</div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            Powered by AI • Make sure your server is running on{" "}
            <code className="bg-gray-200 px-2 py-1 rounded text-xs">localhost:8000</code>
          </p>
        </div>
      </div>
    </div>
  );
}
