# lwofilm

Telif süresi dolmuş klasik yapımlar (**Public Domain**) ve **Creative Commons** lisanslı bağımsız filmler için geliştirilmiş açık kaynaklı web arşivi ve izleme arayüzü.

## Özellikler

- **Modern Koyu & Zümrüt Arayüz:** Koyu zemin üzerinde zümrüt yeşili vurgular, kart hover efektleri ve sade tipografi.
- **TMDB Veri Entegrasyonu:** Film ID'si üzerinden afiş, arka plan görseli, özet, puan, yıl ve tür bilgilerini veritabanına aktarma altyapısı.
- **Çoklu Video Kaynağı & Lisans Etiketi:** Sayfa yenilenmeden oynatıcı kaynak sekmeleri arasında geçiş yapabilme ve her yapım için lisans/kaynak bilgisini gösterme.
- **Hızlı Filtreleme ve Arama:** Tür, yapım yılı, lisans tipi ve başlık üzerinden içeriklere kolay erişim.
- **Yönetim Akışı:** Yeni film ve oynatıcı kaynağı eklemeyi kolaylaştıran yönetim yapısı.

## Kullanılan Teknolojiler

- **Framework:** Next.js (App Router), TypeScript
- **Stil:** TailwindCSS
- **İkonlar:** Lucide React
- **Veritabanı & ORM:** Prisma + SQLite (isteğe bağlı olarak PostgreSQL veya MySQL ile kullanılabilir)

## Kurulum

1. **Repoyu klonlayın:**

```bash
git clone [https://github.com/snrl-oss/lwofilm.git](https://github.com/snrl-oss/lwofilm.git)
cd lwofilm
```

2. **Bağımlılıkları yükleyin:**

```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın:**

Proje kök dizininde `.env` dosyası oluşturun ve gerekli değerleri ekleyin:

```env
DATABASE_URL="file:./dev.db"
TMDB_API_KEY="tmdb_api_anahtariniz"
```

4. **Veritabanı şemasını uygulayın:**

```bash
npx prisma db push
```

5. **Geliştirme sunucusunu başlatın:**

```bash
npm run dev
```

Tarayıcı üzerinden `http://localhost:3000` adresine giderek uygulamayı görüntüleyebilirsiniz.

## Klasör Yapısı

```text
├── prisma/
│   └── schema.prisma                  # Veritabanı modelleri (Movie, Category, VideoSource)
├── src/
│   └── app/
│       └── api/
│           └── admin/
│               └── fetch-tmdb/
│                   └── route.ts       # TMDB veri çekme ve kayıt endpoint'i
├── .env
└── package.json
```

## Geliştirme Notu

- Bu proje, mimari kurgu ve kodlama süreçlerinde yapay zeka (AI) araçlarından destek alınarak geliştirilmiştir.

## Lisans ve İçerik Politikası

- Bu yazılım **MIT License** ile lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakabilirsiniz.
- Proje yalnızca açık kaynaklı yazılım altyapısı sunar; yayınlanacak medya içeriklerinin telif ve lisans uygunluğu (Public Domain, Creative Commons veya hak sahibi izni) kullanıcı ve yayınlayıcının sorumluluğundadır.
