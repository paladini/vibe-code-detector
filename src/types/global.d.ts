interface ChromeLastError {
  message?: string;
}

interface ChromeTab {
  id?: number;
  url?: string;
}

interface ChromeRuntime {
  lastError?: ChromeLastError;
}

interface ChromeTabs {
  query(queryInfo: { active: boolean; currentWindow: boolean }): Promise<ChromeTab[]>;
  sendMessage(
    tabId: number,
    message: { action: 'analyze' },
    callback: (response: unknown) => void
  ): void;
}

interface ChromeScripting {
  executeScript(options: {
    target: { tabId: number };
    files: string[];
  }): Promise<unknown>;
}

declare const chrome: {
  runtime: ChromeRuntime;
  tabs: ChromeTabs;
  scripting: ChromeScripting;
};
