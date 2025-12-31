"use client";
// CSS
import 'leaflet/dist/leaflet.css';

// Fireworks
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'

function FireWorks() {
  const ref = useRef<FireworksHandlers>(null)

  return (
    <div style={{ position: 'absolute', left: 0, width: '100vw', height: '100vh', background: '#000', margin: 0, padding: 0, overflow: 'hidden', zIndex: -1 }}>
      <Fireworks
        ref={ref}
        options={{
          // Specific Amethyst/Purple palette
          rocketsPoint: { min: 0, max: 100 },
          hue: { min: 210, max: 350 }, // 💜 purple spectrum
          delay: { min: 15, max: 30 },
          // Adjusting these for a "magical" feel
          traceLength: 3,
          flickering: 50,
          opacity: 0.5,
          acceleration: 1.05,
          friction: 0.97,
          gravity: 1.5,
          particles: 73,
          explosion: 11,
          intensity: 50,
        }}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '120vh',
          position: 'fixed',
          background: 'transparent',
          bottom: "-20vh",
        }}
      />
    </div>
  )
}

import { useEffect, useState, useRef } from "react";
import dbStorage from "@/utils/dbstorage";

// Leaflet (only import types; actual usage inside client-only code)
import type { MapContainerProps } from 'react-leaflet';

type Mode = "locked" | "viewer" | "owner";

export default function LoveLocationPage() {
  const [mode, setMode] = useState<Mode>("locked");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [ucoords, setUCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const viewerInterval = useRef<NodeJS.Timeout | null>(null);
  const ownerInterval = useRef<NodeJS.Timeout | null>(null);
  const [moriAddress, setMoriAddress] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");

  const getAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      return data.display_name || "";
    } catch {
      return "";
    }
  };

  useEffect(() => {
    if (coords) {
      getAddress(coords.lat, coords.lng).then(setMoriAddress);
    }
    if (ucoords) {
      getAddress(ucoords.lat, ucoords.lng).then(setUserAddress);
    }
  }, [coords, ucoords]);




  // Client-only flag
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const signin = async () => {
    await dbStorage.signin("2026", "2026");
  };

  const unlock = async () => {
    try {
      setError("");
      if (!localStorage.getItem("accessToken")) await signin();

      if (password === "Amethyst") setMode("viewer");
      else if (password === "Mori137") setMode("owner");
      else throw new Error("Wrong password");
    } catch (e: any) {
      setError(e.message || "Access denied");
    }
  };

  const updateLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const payload = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        updatedAt: new Date().toISOString(),
      };
      await dbStorage.setItem("love", "location", "mori", "current", JSON.stringify(payload));
      setCoords({ lat: payload.lat, lng: payload.lng });
      setLastUpdated(payload.updatedAt);
    });
  };

  const updateULocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      setUCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  const fetchLocation = async () => {
    const data = await dbStorage.getItem("love", "location", "mori", "current", null);
    if (data?.love.location.current) {
      const parsed = JSON.parse(data.love.location.current);
      setCoords({ lat: parsed.lat, lng: parsed.lng });
      setLastUpdated(parsed.updatedAt);
    }
  };

  useEffect(() => {
    if (mode === "viewer") {
      fetchLocation();
      updateULocation();
      viewerInterval.current = setInterval(fetchLocation, 1000);
      viewerInterval.current = setInterval(updateULocation, 1000);
    }

    if (mode === "owner") {
      updateLocation();
      ownerInterval.current = setInterval(updateLocation, 60000);
    }

    return () => {
      if (viewerInterval.current) clearInterval(viewerInterval.current);
      if (ownerInterval.current) clearInterval(ownerInterval.current);
    };
  }, [mode]);

  // Render Leaflet map **only on client**
  const renderMap = () => {
    if (!isClient || !coords || !ucoords) return null;

    // Lazy-load Leaflet here
    const { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } = require('react-leaflet');
    const L = require('leaflet');

    const customIcon = L.icon({
      iconUrl: '/leaflet/marker-icon.png',
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      shadowUrl: '/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    return (
      <MapContainer style={{ flex: '1', width: '100%', height: "90vh" }} center={[coords.lat, coords.lng]} zoom={12.5} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[coords.lat, coords.lng]} icon={customIcon}>
          <Popup>Mori is here 💖</Popup>
          <Tooltip direction="bottom" offset={[0, 10]} permanent>Mori: {moriAddress || ""}</Tooltip>
        </Marker>

        <Marker position={[ucoords.lat, ucoords.lng]} icon={customIcon}>
          <Popup>You are here 📍</Popup>
          <Tooltip direction="bottom" offset={[0, 10]} permanent>You: {userAddress || ""}</Tooltip>
        </Marker>

        <Polyline positions={[[ucoords.lat, ucoords.lng], [coords.lat, coords.lng]]} color="red" />
      </MapContainer>
    );
  };

  return (
    <div style={styles.container}>

      {mode === "locked" ? (
        <>
          <FireWorks />
          <div style={styles.card}>

            <h1 style={styles.title}>🎆 Happy New Year</h1>
            <p style={styles.subtitle}>A small gift so you always know where I am.</p>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button onClick={unlock} style={styles.button}>Open</button>

            {error && <p style={styles.error}>{error}</p>}
          </div>
        </>
      ) : (
        <div style={styles.fullScreen}>
          <div style={styles.overlay}>
            <h2 style={{ margin: 0, }}>
              {mode === "viewer" ? "Mori is here" : "📍 Updating your location"}
            </h2>
            {lastUpdated && <p style={styles.info}>Last updated: {new Date(lastUpdated).toLocaleString()}</p>}
            {mode === "owner" && <button onClick={updateLocation} style={styles.button}>Update Now</button>}
          </div>
          {coords && ucoords ? renderMap() : <p style={styles.loading}>Waiting for location…</p>}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: "100vh", fontFamily: "sans-serif", color: "#fff" },
  card: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 420, background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, textAlign: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" },
  title: { marginBottom: 8, fontSize: 24 },
  subtitle: { fontSize: 14, opacity: 0.9, marginBottom: 20 },
  input: { width: "100%", padding: 12, borderRadius: 8, border: "none", marginBottom: 12, fontSize: 16 },
  button: { width: "100%", padding: 12, borderRadius: 8, border: "none", background: "#ff7eb3", color: "#000", fontWeight: 600, cursor: "pointer", marginTop: 10 },
  error: { marginTop: 10, color: "#ffb4b4" },
  info: { marginTop: 5, fontSize: 13, opacity: 0.85 },
  loading: { textAlign: "center", marginTop: "50%", fontSize: 18 },
  fullScreen: { position: "relative", width: "100vw", height: "100vh", display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center" },
  overlay: { height: "10vh", zIndex: 5, top: 16, left: 16, right: 16, background: "rgba(0,0,0,0.5)", padding: 12, borderRadius: 12, textAlign: "center" },
};
