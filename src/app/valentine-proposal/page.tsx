"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dbstorage from "@/utils/dbstorage";

export default function ValentinePage() {
  const [aiMessage, setAiMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);

  const startConversation = async () => {
    setLoading(true);
    try {
      await dbstorage.signin("thetest", "thetest");
      const msg = await dbstorage.aiTXTGenerator(
        "Start a cute Valentine proposal that asks a yes or no question. Give the question, no more other explanation or stuff, straight to the question."
      );
      setAiMessage("Will you be my Valentine?"); // Extract msg
      setConversation([msg.msg]);
    } catch (err) {
      console.error(err);
      setAiMessage("Oops! Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const handleAnswer = async (answer: "Yes" | "No") => {
    setLoading(true);
    try {
      const prompt = `The user answered "${answer}" to "${aiMessage}". Continue the conversation in a cute, romantic way with a yes or no question. Concise just give the question in 26letter alphabet and "." "," only format no other words or explanation. Also add a reaction to previous respond of user too.`;
      const msg = await dbstorage.aiTXTGenerator(prompt);
      setAiMessage(msg.msg);
      setConversation([msg.msg]);
    } catch (err) {
      console.error(err);
      setAiMessage("Oops! Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
        fontFamily: "'Helvetica', sans-serif",
        padding: "20px",
      }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: "3rem",
          color: "#fff",
          textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Valentine Proposal

      </motion.h1>
      <h5>
        This is a conscious AI asking a question. Careful of your answer.
      </h5>

      {!conversation.length && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={startConversation}
          style={{
            padding: "12px 24px",
            fontSize: "1.2rem",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            background: "#fff",
            color: "#ee9ca7",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            marginBottom: "20px",
          }}
        >
          {loading ? "Starting..." : "Start 💖"}
        </motion.button>
      )}

      {conversation.length > 0 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "20px",
            maxWidth: "400px",
            textAlign: "center",
            color: "#333",
            boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
            marginBottom: "20px",
          }}
        >
          {conversation.map((line, i) => (
            <p key={i} style={{ margin: "10px 0" }}>
              {line}
            </p>
          ))}
        </motion.div>
      )}

      {conversation.length > 0 && !loading && (
        <div style={{ display: "flex", gap: "20px" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer("Yes")}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "#ff6f91",
              color: "#fff",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            Yes 💖
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer("No")}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              background: "#ffb6b9",
              color: "#fff",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            No 💔
          </motion.button>
        </div>
      )}

      {loading && <p style={{ marginTop: "20px", color: "#fff" }}>Thinking...</p>}
    </div>
  );
}
