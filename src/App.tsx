import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface Claim {
  typ: string;
  val: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<{
    name: string;
    roles: string[];
    permissions: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user info from Static Web Apps authentication endpoint
    const fetchUser = async () => {
      try {
        const response = await fetch("/.auth/me");
        if (response.ok) {
          const data = await response.json();
          console.log("Raw payload from /.auth/me:", data); // Debug raw response
          const clientPrincipal = data.clientPrincipal;
          // Function to get claim value by type
          const getClaimValue = (claimType: string): string => {
            if (
              !clientPrincipal.claims ||
              !Array.isArray(clientPrincipal.claims)
            ) {
              console.warn("No valid claims array found in clientPrincipal");
              return "";
            }

            const claim = clientPrincipal.claims.find(
              (claim: Claim) => claim.typ === claimType
            );

            return claim ? claim.val : "";
          };
          const approles = getClaimValue("roles");
          setUser({
            name: clientPrincipal.userDetails,
            roles: clientPrincipal.userRoles,
            permissions: approles,
          });
        } else {
          setError("Please log in to see your roles.");
        }
      } catch (err) {
        setError("Error fetching user info.");
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        {user ? (
          <>
            <p>
              Welcome, {user.name} ({user.roles})! permission is{" "}
              {user.permissions}
            </p>
            <p>Your roles: {user.roles.join(", ")}</p>
            <a href="/.auth/logout">Logout</a>
          </>
        ) : (
          <>
            <p>{error || "Not logged in."}</p>
            <a href="/.auth/login/aad">Login with Microsoft Entra</a>
          </>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
