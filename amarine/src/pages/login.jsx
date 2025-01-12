import React, { useState } from 'react';
import axios from 'axios';

import * as script from "../script";
import HeaderLogin from "../components/HeaderLogin";
import FooterLogin from "../components/FooterLogin";

function Login() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setMessage('Email dan password harus diisi');
      return;
    }
  
    try {
      console.log("Email:", email);
      console.log("Password:", password);
  
      const response = await axios.post(`${BASE_URL}/logincoy`, { email, password });
      console.log('Response from server:', response.data);
  
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      window.location.href = '/beranda'; // Setelah login sukses, pindah ke halaman utama
  
    } catch (error) {
      console.error('Error during login:', error);
  
      if (error.response) {
        // Menangani error berdasarkan status code
        if (error.response.status === 401) {
          setMessage('Email atau password salah');
        } else {
          setMessage('Terjadi kesalahan pada server');
        }
      } else {
        setMessage('Terjadi kesalahan dalam permintaan');
      }
    }
  };
  
  return (
    <div>
      {/* Header */}
      <HeaderLogin />
      {/* Header End */}

      {/* Main Content */}
      <div className="main-content">
        <div className="wrapper-main-content-login wrapper-main-content-login1">
          <section className="section-gambar-login">
            <img src="assets/image-login.png" alt="" />
          </section>
          <section className="section-login">
            <header>Masuk</header>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Masukkan email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onInvalid={(e) =>
                  e.target.setCustomValidity("Tolong masukkan Email!")
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
              <div className="password-input">
                <input
                  type="password"
                  placeholder="Masukkan kata sandi"
                  required
                   id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Tolong masukkan Kata Sandi!")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
               <img
                      src="assets/open-eye.svg"
                      alt=""
                      id="open-eye-password"
                      className="open-eye d-none"
                      onClick={() => script.togglePassword("password")}
                    />
                    <img
                      src="assets/close-eye.svg"
                      alt=""
                      id="close-eye-password"
                      className="close-eye"
                      onClick={() => script.togglePassword("password")}
                    />
              </div>
              <div className="ingat-lupa-kata-sandi">
                <input
                  type="button"
                  value=""
                  name="s&k"
                  id="ingat-btn"
                  onClick={() => script.toggleIngat()}
                />
                <label htmlFor="ingat">Ingat nama pengguna</label>
                <a href="lupakatasandi1">Lupa Kata Sandi?</a>
              </div>
              <input type="submit" value="Masuk" />
              
              {message && <p className="error-message">{message}</p>} {/* Menampilkan pesan kesalahan */}
            </form>
            <div className="divider">atau</div>
            <div className="media-sosial-login">
              <a href="login">
                <img src="assets/facebook.svg" alt="Facebook" />
              </a>
              <a href="login">
                <img src="assets/apple.svg" alt="Apple" />
              </a>
              <a href="login">
                <img src="assets/google.svg" alt="Google" />
              </a>
            </div>
            <div className="tidak-memiliki-akun">
              <span>Tidak memiliki akun?</span> <a href="daftar">Daftar</a>
 </div>
          </section>
        </div>
      </div>
      {/* Main Content End */}

      {/* Footer */}
      <FooterLogin />
      {/* Footer End */}
    </div>
  );
}

export default Login;