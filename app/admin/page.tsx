"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ADMIN_USER = "admin";
const ADMIN_PASS = "chogam2024";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem("chogam-admin-auth", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Identifiants incorrects. Veuillez réessayer.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Montserrat:wght@300;400;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .admin-login-body {
          background: #0B1325;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-family: 'Montserrat', sans-serif;
        }

        .login-card {
          width: 340px;
          border-radius: 20px;
          border: 1px solid rgba(212, 175, 55, 0.4);
          background: linear-gradient(180deg, rgba(11,19,37,0.80) 0%, rgba(11,19,37,0.95) 100%),
                      url('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;
          box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(212,175,55,0.15);
          padding: 36px 28px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .login-logo-wrap {
          margin-bottom: 8px;
        }

        .login-title {
          color: #D4AF37;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 22px;
          letter-spacing: 2px;
          text-align: center;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          margin-bottom: 4px;
        }

        .login-subtitle {
          color: #CBD5E1;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.75;
          margin-bottom: 30px;
        }

        .login-input {
          width: 100%;
          height: 45px;
          padding: 0 15px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 8px;
          font-size: 14px;
          color: #fff;
          margin-bottom: 16px;
          outline: none;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }

        .login-input:focus {
          border-color: #D4AF37;
          background: rgba(212,175,55,0.08);
          box-shadow: 0 0 8px rgba(212,175,55,0.4);
        }

        .login-input::placeholder {
          color: #94A3B8;
          font-size: 13px;
        }

        .login-btn {
          width: 100%;
          height: 45px;
          background: linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%);
          color: #0B1325;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 1.5px;
          margin-top: 10px;
          cursor: pointer;
          border: none;
          border-radius: 25px;
          box-shadow: 0 4px 15px rgba(212,175,55,0.3);
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
        }

        .login-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #F3E5AB 0%, #D4AF37 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212,175,55,0.5);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-error {
          color: #FCA5A5;
          font-size: 12px;
          text-align: center;
          margin-top: 8px;
          font-family: 'Montserrat', sans-serif;
        }

        .login-hint {
          color: rgba(212,175,55,0.45);
          font-size: 11px;
          text-align: center;
          margin-top: 18px;
          letter-spacing: 0.5px;
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>

      <div className="admin-login-body">
        <form className="login-card" onSubmit={handleSubmit}>
          {/* Logo */}
          <div className="login-logo-wrap">
            <Image
              src="/brand/logo-chogam-gold.svg"
              alt="Chogam Logo"
              width={48}
              height={48}
              style={{ objectFit: "contain" }}
            />
          </div>

          <h2 className="login-title">CHOGAM</h2>
          <p className="login-subtitle">Espace Privé</p>

          <input
            type="text"
            className="login-input"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Connexion..." : "SE CONNECTER"}
          </button>

          <p className="login-hint">admin / chogam2024</p>
        </form>
      </div>
    </>
  );
}
