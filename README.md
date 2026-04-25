# 🧠 Leka Leka
> Aplikasi pembelajaran interaktif untuk penyandang disleksia

---

## 📖 Tentang Aplikasi

**Leka Leka** adalah aplikasi mobile yang dirancang khusus untuk membantu penyandang disleksia belajar dengan cara yang menyenangkan dan ramah. Aplikasi ini menyediakan deteksi dini disleksia melalui tes singkat, serta konten pembelajaran yang disesuaikan dengan kebutuhan pengguna.

---

## ✅ Fitur yang Telah Dibuat

### 🔐 Autentikasi
- Halaman sambutan & pilihan masuk/daftar
- Registrasi akun baru (nama, email, password)
- Login dengan email & password
- Lupa password & reset password
- Verifikasi email via kode OTP 4 digit

### 🧪 Tes Disleksia
- Screening singkat (6 soal) setelah registrasi
- Alur tes: soal-1 → soal-2 → ... → soal-6 → selesai
- Pengguna dapat memilih langsung ikut tes atau nanti

### 🏠 Beranda
- Sapaan personal berdasarkan nama pengguna
- Progres pembelajaran harian (Hari 1–4)
- Banner selamat datang
- Fitur pencarian materi

### 🧭 Navigasi
- Tab bar animasi (Home, Report, Profil)
- Stack navigation untuk alur autentikasi & screening

---

## 🚀 Fitur yang Akan Dikembangkan

- [ ] **Foto Teks → Teks Ramah Disleksia** — Scan teks dari foto, lalu tampilkan ulang dengan font, spasi, dan warna yang lebih mudah dibaca oleh penyandang disleksia
- [ ] **Koneksi Database** — Simpan progres belajar harian pengguna ke server
- [ ] **Report / Laporan** — Visualisasi perkembangan belajar pengguna dari waktu ke waktu
- [ ] **Login dengan Google & Facebook** — Autentikasi sosial
- [ ] **Halaman Profil** — Edit profil & pengaturan akun
- [ ] **Notifikasi Harian** — Pengingat belajar rutin

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | [Expo](https://expo.dev) (React Native) |
| Bahasa | TypeScript |
| Navigasi | Expo Router (file-based routing) |
| UI & Styling | React Native StyleSheet |
| Ikon | Ionicons, FontAwesome5 (`@expo/vector-icons`) |
| Animasi | React Native Animated API |
| Gradient | `expo-linear-gradient` |
| Database | *(belum diintegrasikan — direncanakan: Supabase)* |
| Auth Backend | *(belum diintegrasikan — direncanakan: Supabase Auth)* |

---

## 📁 Struktur Folder

```
app/
├── (auth)/              # Alur autentikasi
│   ├── login.tsx        # Halaman sambutan
│   ├── masuk.tsx        # Form login
│   ├── daftar.tsx       # Form registrasi
│   ├── konfirmasi.tsx   # Konfirmasi akun & tawaran tes
│   ├── lupa-password.tsx
│   ├── verif-email.tsx  # Input OTP
│   └── reset-password.tsx
├── (screening)/         # Alur tes disleksia
│   ├── soal-1.tsx
│   ├── soal-2.tsx
│   ├── soal-3.tsx
│   ├── soal-4.tsx
│   ├── soal-5.tsx
│   ├── soal-6.tsx
│   └── soal-selesai.tsx
└── (tabs)/              # Halaman utama
    ├── index.tsx        # Beranda
    ├── report.tsx       # Laporan
    └── profile.tsx      # Profil
```

---

## ⚙️ Cara Menjalankan

```bash
# Clone repo
git clone https://github.com/Hamdi-Azzahid-Nasution/Team_Tinggal-Kilik-Klik-Jadi.git
cd Team_Tinggal-Kilik-Klik-Jadi

# Install dependencies
npm install

# Jalankan di Expo Go
npx expo start
```

---

## 👥 Tim

**Team Tinggal Kilik Klik Jadi** — Hackathon / Project Mahasiswa

---

## 📄 Lisensi

Project ini dibuat untuk tujuan edukatif.