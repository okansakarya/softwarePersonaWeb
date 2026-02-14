# Todo Uygulaması + API Verileri

React + Vite + TypeScript ile geliştirilmiş TODO CRUD uygulaması. Üstte görev yönetimi (Ekle, Listele, Güncelle, Sil), altta JSONPlaceholder API'den çekilen kullanıcı listesi gösterilir.

## Özellikler

- **TODO:** Ekleme, listeleme, güncelleme, silme; LocalStorage ile kalıcılık
- **API:** JSONPlaceholder `/users` verisi; yükleniyor/hata durumları; "API'den Yenile" butonu
- Tailwind CSS, Netlify deploy uyumlu

## Kurulum ve Çalıştırma

```bash
npm install
npm run dev
```

## Build ve Netlify

```bash
npm run build
```

- Build çıktısı: `dist`
- Netlify: Build command `npm run build`, Publish directory `dist`

## Proje Ekran Görüntüsü

https://drive.google.com/file/d/1fKEGSCb3eZlSGzvc0bPPRwACSXj6wans/view?usp=drive_link
---

JSONPlaceholder API: https://jsonplaceholder.typicode.com/users
