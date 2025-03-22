import { Configuration, LogLevel } from "@azure/msal-browser";

// MSAL configuration
export const msalConfig: Configuration = {
  auth: {
    clientId: "YOUR_APPLICATION_CLIENT_ID", // Replace with your Application (client) ID
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID", // Replace with your Directory (tenant) ID
    redirectUri: "http://localhost:5173", // Matches your redirect URI in Azure
  },
  cache: {
    cacheLocation: "sessionStorage", // Can also use "localStorage"
    storeAuthStateInCookie: false, // Set to true for IE11 or older browsers
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
      logLevel: LogLevel.Verbose, // Adjust for debugging
    },
  },
};

// Scopes for token request (e.g., for Microsoft Graph)
export const loginRequest = {
  scopes: ["User.Read"], // Add more scopes if needed
};