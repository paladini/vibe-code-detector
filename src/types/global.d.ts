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
  query(queryInfo: {
    active?: boolean;
    currentWindow?: boolean;
    [key: string]: unknown;
  }): Promise<ChromeTab[]>;
  sendMessage(
    tabId: number,
    message: unknown,
    callback: (response: unknown) => void
  ): void;
}

interface ChromeScripting {
  executeScript(options: {
    target: { tabId: number };
    files?: string[];
    func?: (...args: unknown[]) => unknown;
    args?: unknown[];
    world?: 'ISOLATED' | 'MAIN';
    injectImmediately?: boolean;
  }): Promise<unknown>;
}

declare const chrome: {
  runtime: ChromeRuntime;
  tabs: ChromeTabs;
  scripting: ChromeScripting;
};
