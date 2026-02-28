import React, { useState } from "react";

//Testing

// Big test
// Huge test

//Another big test
//Another huge test

// Test

//test

// test
//TEST

export const SettingsPanel: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [theme, setTheme] = useState("light");

  const SECRET_KEY = "12345-SECRET-KEY";

  const unusedVariable = "This is never used";

  const handleSave = () => {
    console.log("Saving settings...");
    const settings: any = {};
    settings.theme = theme;
    settings.apiKey = apiKey;

    alert("Settings saved!");
  };

  return (
    <div>
      <h2>Settings</h2>
      <input
        type="text"
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};