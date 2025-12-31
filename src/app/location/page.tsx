"use client";

import { useEffect, useState } from "react";

export default function LocationSharePage() {
  const PASSWORD = "Amethyst";
  const AUTO_UPDATE_SECONDS = 15; // ⬅ change this anytime

  const [enteredPassword, setEnteredPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* =====================
     PASSWORD CHECK
  ===================== */
  const handleLogin = () => {
    if (enteredPassword === PASSWORD) {
      setAuthorized(true);
      setError(null);
    } else {
      setError("Incorrect password.");
    }
  };

  /* =====================
     GET YOUR LOCATION
  ===================== */
  const updateLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setLastUpdated(new Date().toLocaleTimeString());
        setLoading(false);
      },
      () => {
        setError("Location permission denied.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  /* =====================
     AUTO UPDATE
  ===================== */
  useEffect(() => {
    if (!authorized) return;

    updateLocation(); // initial fetch

    const interval = setInterval(() => {
      updateLocation();
    }, AUTO_UPDATE_SECONDS * 1000);

    return () => clearInterval(interval);
  }, [authorized]);

  /* =====================
     PASSWORD SCREEN
  ===================== */
  if (!authorized) {
    return (
      <main style={styles.center}>
        <h2>Enter Password</h2>
        <input
          type="password"
          placeholder="Password"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          Unlock
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </main>
    );
  }

  /* =====================
     LOCATION VIEW
  ===================== */
  return (
    <main style={styles.center}>
      <h2>Your Live Location</h2>

      <p style={{ opacity: 0.7 }}>
        Auto-updates every {AUTO_UPDATE_SECONDS} seconds
      </p>

      <button onClick={updateLocation} style={styles.button}>
        {loading ? "Updating..." : "Update Now"}
      </button>

      {latitude && longitude && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Latitude:</strong> {latitude}</p>
          <p><strong>Longitude:</strong> {longitude}</p>
          <p><strong>Last updated:</strong> {lastUpdated}</p>

          <a
            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </main>
  );
}

/* =====================
   SIMPLE STYLES
===================== */
const styles: Record<string, React.CSSProperties> = {
  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    textAlign: "center",
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: 220,
  },
  button: {
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
};
