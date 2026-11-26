# Generator OTP

Project sederhana untuk membuat dan mengelola kode OTP 4 digit di browser.

## Fitur

- Generate kode OTP acak sebanyak 4 digit
- Pindah otomatis ke input berikutnya
- Navigasi dengan tombol panah kiri dan kanan
- Mendukung hapus digit dengan Backspace
- Mendukung tempel (`paste`) kode angka dari clipboard
- Validasi agar hanya angka yang dapat dimasukkan
- Status keterangan dan animasi saat OTP dibuat
- Tampilan responsif untuk desktop dan perangkat mobile

## Cara Menjalankan

Tidak diperlukan instalasi atau dependency.

1. Buka `index.html` langsung melalui browser.
2. Klik **Generate OTP** untuk membuat kode baru.
3. Digit akan otomatis terisi pada keempat kotak input.

Alternatif melalui server lokal dari folder root repository:

```bash
python3 -m http.server
```

Kemudian buka `http://localhost:8000/kode-otp/`.

## Struktur

- `index.html` — struktur antarmuka OTP
- `script.js` — generator angka, navigasi input, dan logika paste
- `style.css` — tampilan, animasi, dan layout responsif

## Catatan

Generator ini digunakan untuk latihan JavaScript dan tampilan antarmuka. OTP yang dibuat hanya menggunakan `Math.random()` dan tidak boleh digunakan sebagai mekanisme autentikasi keamanan produksi.
