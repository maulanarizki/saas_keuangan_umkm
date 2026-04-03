# 🚀 SaaS Keuangan UMKM - Laravel 13 + React (Inertia.js)

Aplikasi SaaS pencatatan keuangan berbasis **Laravel 13** dan **React (Inertia.js)** yang dirancang khusus untuk **UMKM** dengan pendekatan **multi-tenant (multi bisnis)**, **role-based access control**, dan sistem **auto-journal (double entry)**.

---

## 🎯 Tujuan Aplikasi

Menyediakan sistem pencatatan keuangan yang:

- ✅ Mudah digunakan oleh UMKM (tanpa paham debit/kredit)
- ✅ Mendukung multi usaha dalam satu akun
- ✅ Aman dengan isolasi data per bisnis
- ✅ Siap dikembangkan menjadi SaaS skala besar

---

## 🧠 Konsep Utama

### 1. Multi-Business (SaaS)
- 1 user dapat memiliki banyak bisnis (toko/usaha)
- Data setiap bisnis **terisolasi penuh**
- Menggunakan `business_id` sebagai boundary utama

---

### 2. Role & Permission (Multi-Tenant)
Menggunakan sistem RBAC berbasis **Spatie Laravel Permission (Teams Mode)**:

- Role berbeda untuk setiap bisnis
- Contoh:
  - User bisa menjadi **Admin di Toko A**
  - Tapi hanya **Staff di Toko B**

---

### 3. UMKM Friendly (Transaction First)
User hanya melakukan input:

- 💰 Pemasukan
- 💸 Pengeluaran

➡️ Sistem otomatis membuat jurnal (double entry)

---

### 4. Auto Journal System
Setiap transaksi akan menghasilkan:

- Journal Entry
- Journal Lines (Debit & Kredit balance)

---

## 🧭 User Flow (Fase 2)

### 🔐 Login
Setelah login, user diarahkan ke:

### 🏢 Launchpad (Pemilihan Toko)
- Menampilkan daftar bisnis
- Pilih bisnis → simpan ke session (`active_business_id`)

---

### 📊 Dashboard
Menampilkan:
- Total saldo kas
- Total pemasukan
- Total pengeluaran

---

### 💰 Transaksi
User dapat:
- Tambah pemasukan/pengeluaran
- Melihat daftar transaksi

➡️ Tanpa perlu memahami akuntansi

---

## 🧱 Arsitektur Sistem

### Backend (Laravel)
- Clean Architecture + DDD (Domain Driven Design)
- Service Layer untuk bisnis logic
- Repository pattern (optional)
- Spatie Permission (Teams Mode)

---

### Frontend (React + Inertia)
- SPA tanpa API terpisah
- Tailwind CSS
- Komponen reusable
- UX modern (SaaS style)

---

## 📁 Struktur UI
Pages/
├── Saas/
│ ├── Launchpad.tsx
│ ├── Dashboard.tsx
│ └── Transactions/
│ ├── Index.tsx
│ └── Form.tsx


---

## ⚙️ Fitur Utama

### ✅ Launchpad
- Pilih bisnis aktif
- Create bisnis baru

---

### ✅ Dashboard
- Ringkasan keuangan
- Data real-time

---

### ✅ Transaksi
- Input pemasukan/pengeluaran
- Auto generate jurnal

---

### ✅ Role Permission
- Akses berbasis role per bisnis
- Proteksi endpoint & UI

---

## 🔐 Security (Multi-Tenant)

- Semua data menggunakan `business_id`
- Session menyimpan `active_business_id`
- Middleware validasi akses bisnis
- Role permission scoped per bisnis

---

## 🔄 Session Handling

- `active_business_id` disimpan di session
- Digunakan di seluruh query
- User tidak bisa akses bisnis lain tanpa izin

---

## 🎨 UX Design Principles

- Simpel untuk UMKM
- Tidak menampilkan konsep debit/kredit
- Fokus pada:
  - pemasukan
  - pengeluaran
- Navigasi cepat antar bisnis

---

## 🚀 Roadmap

### Fase 1 ✅
- Database
- Auto Journal
- RBAC dasar

### Fase 2 (Current)
- Launchpad UI
- Dashboard
- Transaksi UI
- Multi-tenant role

### Fase 3 (Next)
- Laporan (Laba Rugi, Neraca)
- Inventory
- Hutang Piutang
- Export Excel/PDF

---

## 🛠️ Teknologi

- Laravel 13
- React (Inertia.js)
- Tailwind CSS
- Spatie Laravel Permission

---

## 📌 Catatan Penting

- Sistem dirancang untuk scalable ke microservices
- Siap dikembangkan menjadi SaaS komersial
- Arsitektur sudah mendukung multi-tenant secara penuh

---

## 🤝 Kontribusi

Silakan fork dan kembangkan sesuai kebutuhan 🚀

---

## 📄 License

MIT License
