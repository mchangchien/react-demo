import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<{ name: string; roles: string[] } | null>(
    null
  );
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
          setUser({
            name: clientPrincipal.userDetails,
            roles: clientPrincipal.userRoles,
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
            <p>Welcome, {user.name}!</p>
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
