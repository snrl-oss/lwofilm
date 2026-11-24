import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Klasik", slug: "klasik" },
  { name: "Sessiz Sinema", slug: "sessiz-sinema" },
  { name: "Korku", slug: "korku" },
  { name: "Bilim Kurgu", slug: "bilim-kurgu" },
  { name: "Komedi", slug: "komedi" },
  { name: "Gerilim", slug: "gerilim" },
  { name: "Film Noir", slug: "film-noir" },
  { name: "Dram", slug: "dram" },
  { name: "Belgesel", slug: "belgesel" },
  { name: "Animasyon", slug: "animasyon" },
  { name: "Macera", slug: "macera" },
  { name: "Aile", slug: "aile" },
  { name: "Western", slug: "western" },
  { name: "Dizi", slug: "dizi" },
];

const archive = (id) => `https://archive.org/embed/${id}`;
const yt = (id) => `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
const pd = (sourceUrl, attribution) => ({
  type: "PUBLIC_DOMAIN",
  sourceName: "Internet Archive",
  sourceUrl,
  attribution,
  verified: true,
});
const cc = (sourceUrl, attribution) => ({
  type: "CC_BY",
  sourceName: "Blender Foundation",
  sourceUrl,
  attribution,
  verified: true,
});
const archiveSrc = (label, id, quality = "1080p", language = "Orijinal Dil") => ({
  label,
  provider: "archive",
  url: archive(id),
  quality,
  language,
});

const films = [
  {
    slug: "metropolis-1927",
    title: "Metropolis",
    originalTitle: "Metropolis",
    tagline: "Geleceğin efendileri ile köleleri arasındaki köprü.",
    overview:
      "Fritz Lang'ın vizyoner distopyasında, lüks gökdelenlerin altında ezilen işçi sınıfı ile yönetici seçkinler ikiye bölünmüş bir gelecek şehri. Patronun oğlu Freder, yeraltındaki acıyı görünce babasının düzenine başkaldırır; kaderi, işçilerin umudu olan Maria ve insanlık dışı bir makineyle kesişir.",
    year: 1927,
    runtime: 153,
    rating: 8.3,
    voteCount: 189000,
    posterUrl: "/posters/metropolis.jpg",
    featured: true,
    categories: ["klasik", "sessiz-sinema", "bilim-kurgu", "dram"],
    license: pd(
      "https://archive.org/details/Metropolis1927EnglishVersion",
      "Fritz Lang, 1927 — ABD'de kamu malı (public domain).",
    ),
    sources: [
      archiveSrc(
        "Restore Edilmiş 1080p",
        "metropolis-1927-bdrip-1080p-x-265-dts-hd-ma-5.1-d-0ct-0r-lew-sev",
      ),
      archiveSrc("İngilizce Versiyon", "Metropolis1927EnglishVersion", "HD"),
    ],
  },
  {
    slug: "night-of-the-living-dead-1968",
    title: "Night of the Living Dead",
    originalTitle: "Night of the Living Dead",
    tagline: "Onlar geri döndü... ve açlar.",
    overview:
      "Kırsal bir Pensilvanya mezarlığında başlayan gizemli saldırılar, bir grup yabancıyı ıssız bir çiftlik evinde mahsur bırakır. Radyo yayınları ölülerin dirildiğini doğrularken, hayatta kalanların asıl savaşı kendi korkuları ve önyargılarıyla olur. Modern zombi sinemasının kurucu metni.",
    year: 1968,
    runtime: 96,
    rating: 7.8,
    voteCount: 143000,
    posterUrl: "/posters/night-of-the-living-dead.jpg",
    featured: true,
    categories: ["klasik", "korku", "gerilim"],
    license: pd(
      "https://archive.org/details/Night.Of.The.Living.Dead_1080p",
      "George A. Romero, 1968 — telif bildirimi hatası nedeniyle kamu malı.",
    ),
    sources: [
      archiveSrc("Restore Edilmiş 1080p", "Night.Of.The.Living.Dead_1080p"),
      archiveSrc("Orijinal DVD Kopyası", "night_of_the_living_dead_dvd", "DVD"),
    ],
  },
  {
    slug: "nosferatu-1922",
    title: "Nosferatu",
    originalTitle: "Nosferatu, eine Symphonie des Grauens",
    tagline: "İlk vampir, ilk gölge.",
    overview:
      "Murnau'nun korku başyapıtında emlak memuru Hutter, Transilvanya'daki gizemli Kont Orlok'un malikâneyi satın alması için yola çıkar. Gölgesi bile ölüm taşıyan kont, genç karısı Ellen'ın peşinden şehre gelir. Alman dışavurumculuğunun en ürkütücü görüntüleriyle örülü, sinema tarihinin ilk vampir filmi.",
    year: 1922,
    runtime: 94,
    rating: 7.9,
    voteCount: 108000,
    posterUrl: "/posters/nosferatu.jpg",
    featured: true,
    categories: ["klasik", "sessiz-sinema", "korku"],
    license: pd(
      "https://archive.org/details/Nosferatu_most_complete_version_93_mins.",
      "F. W. Murnau, 1922 — kamu malı.",
    ),
    sources: [
      archiveSrc(
        "En Eksiksiz Baskı",
        "Nosferatu_most_complete_version_93_mins.",
        "HD",
      ),
      archiveSrc("DVD Kalitesi", "Nosferatu_DVD_quality", "DVD"),
    ],
  },
  {
    slug: "the-cabinet-of-dr-caligari-1920",
    title: "The Cabinet of Dr. Caligari",
    originalTitle: "Das Cabinet des Dr. Caligari",
    tagline: "Her delilik bir hikâye anlatır.",
    overview:
      "Bir lunaparkta açılan iki cinayet, genç Francis'i hipnozcu Dr. Caligari ve uyurgezer Cesare'nin peşine düşürür. Çarpık dekorları, eğri perspektifleri ve kâbus mantığıyla Alman dışavurumculuğunun manifestosu; sinema tarihinin ilk psikolojik gerilimlerinden biri.",
    year: 1920,
    runtime: 76,
    rating: 8.0,
    voteCount: 67000,
    posterUrl: "/posters/caligari.jpg",
    categories: ["klasik", "sessiz-sinema", "korku"],
    license: pd(
      "https://archive.org/details/DasKabinettdesDoktorCaligariTheCabinetofDrCaligari",
      "Robert Wiene, 1920 — kamu malı.",
    ),
    sources: [
      archiveSrc(
        "Restore Edilmiş Baskı",
        "DasKabinettdesDoktorCaligariTheCabinetofDrCaligari",
        "HD",
      ),
      archiveSrc("Alternatif Arşiv Kopyası", "thecabinetofdrcaligari", "Orijinal"),
    ],
  },
  {
    slug: "his-girl-friday-1940",
    title: "His Girl Friday",
    originalTitle: "His Girl Friday",
    tagline: "Haber odası asla kapanmaz.",
    overview:
      "Gazete patronu Walter Burns, eski karısı ve yıldız muhabiri Hildy Johnson'ı evlenip gazetecilikten ayrılmaktan vazgeçirmeye çalışır. Bir cinayet haberi ve üst üste binen yalanlar, çifti yeniden aynı haber odasına sürükler. Baş döndürücü tempoda bir screwball klasiği.",
    year: 1940,
    runtime: 92,
    rating: 7.9,
    voteCount: 61000,
    posterUrl: "/posters/his-girl-friday.jpg",
    categories: ["klasik", "komedi"],
    license: pd(
      "https://archive.org/details/his_girl_friday",
      "Howard Hawks, 1940 — telif yenilenmediği için kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Arşiv Baskısı", "his_girl_friday", "HD"),
      archiveSrc("Alternatif Kopya", "HisGirlFriday-1940", "Orijinal"),
    ],
  },
  {
    slug: "the-general-1926",
    title: "The General",
    originalTitle: "The General",
    tagline: "Bir makinist, bir lokomotif ve bir ordu.",
    overview:
      "Konfederasyon makinisti Johnnie Gray, hem sevgilisini hem de çok sevdiği lokomotif 'The General'i kaçıran casusların peşine düşer. Buster Keaton'ın akıl almaz akrobasi ve gags'lerle ördüğü, sessiz sinemanın en büyük komedi şaheserlerinden biri.",
    year: 1926,
    runtime: 79,
    rating: 8.2,
    voteCount: 92000,
    posterUrl: "/posters/the-general.png",
    categories: ["klasik", "sessiz-sinema", "komedi"],
    license: pd(
      "https://archive.org/details/The_General_Buster_Keaton",
      "Buster Keaton & Clyde Bruckman, 1926 — kamu malı.",
    ),
    sources: [
      archiveSrc("Restore Edilmiş Baskı", "The_General_Buster_Keaton", "HD"),
      archiveSrc("Orijinal Arşiv", "TheGeneral", "Orijinal"),
    ],
  },
  {
    slug: "plan-9-from-outer-space-1959",
    title: "Plan 9 from Outer Space",
    originalTitle: "Plan 9 from Outer Space",
    tagline: "Gelecek, ölülerin elinde.",
    overview:
      "Ed Wood'un efsanevi 'en kötü film' unvanlı uzay istilası hikâyesi. Uzaylılar dünyayı ele geçirmek için ölüleri diriltir; herkes son derece ciddidir. Kötü sinemanın kült tapınağı, izlemesi garip biçimde keyifli bir gece filmi.",
    year: 1959,
    runtime: 79,
    rating: 4.0,
    voteCount: 41000,
    posterUrl: "/posters/plan-9.jpg",
    categories: ["klasik", "bilim-kurgu", "korku"],
    license: pd(
      "https://archive.org/details/plan-9-from-outer-space",
      "Ed Wood, 1959 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Arşiv Baskısı", "plan-9-from-outer-space", "Orijinal"),
      archiveSrc("Alternatif Kopya", "plan-9-from-outer-space_202009", "Orijinal"),
    ],
  },
  {
    slug: "sherlock-jr-1924",
    title: "Sherlock Jr.",
    originalTitle: "Sherlock Jr.",
    tagline: "Perde ile gerçek arasında bir dedektif.",
    overview:
      "Sinema makinisti Buster, sevgilisinin çalınan saatini bulmak için perdedeki dedektifin dünyasına adım atar. Film ile gerçeğin iç içe geçtiği, dönemine göre büyüleyici bir sinema ustalığı; 45 dakikaya sığdırılmış bir başyapıt.",
    year: 1924,
    runtime: 45,
    rating: 8.2,
    voteCount: 55000,
    posterUrl: "/posters/sherlock-jr.jpg",
    categories: ["klasik", "sessiz-sinema", "komedi"],
    license: pd(
      "https://archive.org/details/sherlockjr1924_201909",
      "Buster Keaton, 1924 — kamu malı.",
    ),
    sources: [
      archiveSrc("Yeni Restorasyon", "sherlockjr1924_201909", "HD"),
      archiveSrc("Alternatif Kopya", "sherlock-jr.-1924", "Orijinal"),
    ],
  },
  {
    slug: "detour-1945",
    title: "Detour",
    originalTitle: "Detour",
    tagline: "Kader, en kötü otostopçudur.",
    overview:
      "Piyanist Al Roberts, ülkeyi geçerken otostopla bindiği arabada bir ceset bulur ve kendini cinayet, şantaj ve yanlış kimliğin içinde bulur. Kaderin karanlık bir şaka gibi işlediği, düşük bütçeli bir film-noir cevheri.",
    year: 1945,
    runtime: 68,
    rating: 7.3,
    voteCount: 23000,
    posterUrl: "/posters/detour.jpg",
    categories: ["klasik", "film-noir", "gerilim"],
    license: pd(
      "https://archive.org/details/detour1945HD",
      "Edgar G. Ulmer, 1945 — kamu malı.",
    ),
    sources: [
      archiveSrc("HD Restorasyon", "detour1945HD", "HD"),
      archiveSrc("Orijinal Arşiv", "Detour1945_201808", "Orijinal"),
    ],
  },
  {
    slug: "carnival-of-souls-1962",
    title: "Carnival of Souls",
    originalTitle: "Carnival of Souls",
    tagline: "Bazı yolculuklar hiç bitmez.",
    overview:
      "Araba kazasından sağ kurtulan Mary, yeni bir hayata başlamak için şehre taşınır. Ancak terk edilmiş lunapark ve solgun bir adam onu karanlığa çekmektedir. Ruhsal bir kâbus gibi akan, bağımsız korku sinemasının unutulmaz klasiği.",
    year: 1962,
    runtime: 78,
    rating: 7.0,
    voteCount: 29000,
    posterUrl: "/posters/carnival-of-souls.jpg",
    categories: ["klasik", "korku", "gerilim"],
    license: pd(
      "https://archive.org/details/CarnivalofSouls",
      "Herk Harvey, 1962 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "CarnivalofSouls", "HD"),
      archiveSrc("Alternatif Kopya", "CarnivalOfSouls1962", "Orijinal"),
    ],
  },
  {
    slug: "a-trip-to-the-moon-1902",
    title: "A Trip to the Moon",
    originalTitle: "Le Voyage dans la Lune",
    tagline: "Sinemanın ilk büyük yolculuğu.",
    overview:
      "Profesör Barbenfouillis ve ekibi, dev bir top ateşiyle Ay'a yolculuk eder; orada dünyalılar için hiç de dostane olmayan Selenlilerle karşılaşır. Georges Méliès'in el yapımı dekorları ve hileleriyle sinemanın ilk büyük görsel efekt gösterisi.",
    year: 1902,
    runtime: 13,
    rating: 8.1,
    voteCount: 57000,
    posterUrl: "/posters/trip-to-the-moon.jpg",
    categories: ["klasik", "sessiz-sinema", "bilim-kurgu", "macera"],
    license: pd(
      "https://archive.org/details/ATripToTheMoonGeorgeMelies",
      "Georges Méliès, 1902 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Siyah-Beyaz", "ATripToTheMoonGeorgeMelies", "HD"),
      archiveSrc(
        "Renklendirilmiş Versiyon",
        "a-trip-to-the-moon-1902-colorized",
        "Renkli",
      ),
    ],
  },
  {
    slug: "nanook-of-the-north-1922",
    title: "Nanook of the North",
    originalTitle: "Nanook of the North",
    tagline: "Buzun üzerinde bir hayat.",
    overview:
      "Robert J. Flaherty'nin, Kanada'nın kuzeyinde yaşayan Inuk avcı Nanook ve ailesinin zorlu yaşamını beyazperdeye taşıdığı belgesel. Sinema tarihinin ilk uzun metrajlı belgesellerinden; kurgusal yönleriyle de tartışılagelen bir kilometre taşı.",
    year: 1922,
    runtime: 79,
    rating: 7.6,
    voteCount: 17000,
    posterUrl: "/posters/nanook.jpg",
    categories: ["klasik", "sessiz-sinema", "belgesel", "macera"],
    license: pd(
      "https://archive.org/details/nanookOfTheNorth1922",
      "Robert J. Flaherty, 1922 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "nanookOfTheNorth1922", "HD", "Sessiz"),
      archiveSrc("HD Restorasyon", "NanookOfTheNorth-HD", "HD", "Sessiz"),
    ],
  },
  {
    slug: "big-buck-bunny-2008",
    title: "Big Buck Bunny",
    originalTitle: "Big Buck Bunny",
    tagline: "Ormanda tatlı bir intikam.",
    overview:
      "Blender Vakfı'nın açık kaynak animasyon filmi. İri yapılı, sevimli tavşan Big Buck, ormanda kendisine zorbalık eden üç kemirgene karşı yaratıcı tuzaklarla dolu bir plan kurar. CC-BY lisanslı, tamamen özgür bir animasyon kısa filmi.",
    year: 2008,
    runtime: 10,
    rating: 6.5,
    voteCount: 9000,
    posterUrl: "/posters/big-buck-bunny.jpg",
    categories: ["animasyon", "komedi", "aile"],
    license: cc(
      "https://studio.blender.org/films/big-buck-bunny/",
      "© 2008 Blender Foundation — CC BY 3.0 ile lisanslıdır.",
    ),
    sources: [
      archiveSrc("Orijinal 1080p", "BigBuckBunny_124", "1080p", "Diyalogsuz"),
      {
        label: "Resmi YouTube",
        provider: "youtube",
        url: yt("YE7VzlLtp-4"),
        quality: "1080p",
        language: "Diyalogsuz",
      },
    ],
  },
  {
    slug: "sintel-2010",
    title: "Sintel",
    originalTitle: "Sintel",
    tagline: "Kaybettiğin şey, seni bulur.",
    overview:
      "Blender Foundation'ın üçüncü açık filmi. Yalnız savaşçı Sintel, kaybettiği ejder yavrusu Scales'i ararken karlı dağlardan çöle uzanan bir yolculuğa çıkar. CC-BY lisanslı, görsel şiirselliği yüksek bir fantastik kısa film.",
    year: 2010,
    runtime: 15,
    rating: 7.6,
    voteCount: 12000,
    posterUrl: "/posters/sintel.jpg",
    categories: ["animasyon", "macera", "dram"],
    license: cc(
      "https://studio.blender.org/films/sintel/",
      "© 2010 Blender Foundation — CC BY 3.0 ile lisanslıdır.",
    ),
    sources: [
      archiveSrc("Orijinal 1080p", "Sintel", "1080p", "Diyalogsuz"),
      {
        label: "Resmi YouTube",
        provider: "youtube",
        url: yt("eRsGyueVLvQ"),
        quality: "1080p",
        language: "Diyalogsuz",
      },
    ],
  },

  // ── Yeni eklenen klasikler ─────────────────────────────────────────────
  {
    slug: "the-kid-1921",
    title: "The Kid",
    originalTitle: "The Kid",
    tagline: "Bir pencere, bir bebek, bir hayat.",
    overview:
      "Chaplin'in Şarlo'su, kapısının önüne bırakılan bir bebeği sahiplenir ve onunla birlikte yoksulluğa rağmen sıcak bir hayat kurar. Yetimhaneden kaçış ve sokak kovalamacalarıyla örülü bu film, komedinin en saf haliyle duygusal bir başyapıt.",
    year: 1921,
    runtime: 68,
    rating: 8.3,
    voteCount: 122000,
    posterUrl: "/posters/the-kid.jpg",
    categories: ["klasik", "sessiz-sinema", "komedi", "dram"],
    license: pd(
      "https://archive.org/details/Brzdac1921",
      "Charlie Chaplin, 1921 — kamu malı.",
    ),
    sources: [
      archiveSrc("Restore Edilmiş Baskı", "Brzdac1921", "HD"),
      archiveSrc("Arşiv Kopyası", "turner_video_8", "Orijinal"),
    ],
  },
  {
    slug: "the-phantom-of-the-opera-1925",
    title: "The Phantom of the Opera",
    originalTitle: "The Phantom of the Opera",
    tagline: "Opera evinin altında bir gölge yaşar.",
    overview:
      "Paris Operası'nın mahzenlerinde yaşayan gizemli bir figür, genç soprano Christine'i kendi yıldızı yapmak için karanlık yollar dener. Lon Chaney'nin unutulmaz makyajıyla, gotik korkunun erken dönem başyapıtlarından biri.",
    year: 1925,
    runtime: 93,
    rating: 7.5,
    voteCount: 18000,
    posterUrl: "/posters/phantom-opera.jpg",
    categories: ["klasik", "sessiz-sinema", "korku", "dram"],
    license: pd(
      "https://archive.org/details/PhantomOfTheOpera1925HD",
      "Rupert Julian, 1925 — kamu malı.",
    ),
    sources: [
      archiveSrc("HD Restorasyon", "PhantomOfTheOpera1925HD", "HD"),
      archiveSrc(
        "New York Baskısı",
        "ThePhantomOfTheOpera1925NewYorkGeneralReleasePrint_620",
        "Orijinal",
      ),
    ],
  },
  {
    slug: "safety-last-1923",
    title: "Safety Last!",
    originalTitle: "Safety Last!",
    tagline: "Saat kulesinde asılı kalan adam.",
    overview:
      "Küçük kasabalı bir genç, şehirde başarılı görünmek için büyük mağazada işe girer; sonunda kendini bir gökdelenin cephesine tırmanırken bulur. Harold Lloyd'un saat kulesi sahnesi sinema tarihinin en ikonik komedi anlarından.",
    year: 1923,
    runtime: 74,
    rating: 8.0,
    voteCount: 22000,
    posterUrl: "/posters/safety-last.jpg",
    categories: ["klasik", "sessiz-sinema", "komedi"],
    license: pd(
      "https://archive.org/details/SafetyLastHaroldLloyd1923.FullMovieexcellentQuality.",
      "Harold Lloyd, 1923 — kamu malı.",
    ),
    sources: [
      archiveSrc(
        "Restore Edilmiş Baskı",
        "SafetyLastHaroldLloyd1923.FullMovieexcellentQuality.",
        "HD",
      ),
      archiveSrc("Alternatif Kopya", "silent-safety-last", "Orijinal"),
    ],
  },
  {
    slug: "steamboat-bill-jr-1928",
    title: "Steamboat Bill, Jr.",
    originalTitle: "Steamboat Bill, Jr.",
    tagline: "Fırtına, babayı ve oğulu birleştirir.",
    overview:
      "Şehirde eğitim görmüş narin Willie, huysuz bir nehir kaptanı olan babasının yanına döner. Bir kasırga sahnesinde setin gerçekten uçtuğu, Keaton'ın en cesur fiziksel komedilerinden biri.",
    year: 1928,
    runtime: 70,
    rating: 7.8,
    voteCount: 21000,
    posterUrl: "/posters/steamboat-bill.jpg",
    categories: ["klasik", "sessiz-sinema", "komedi"],
    license: pd(
      "https://archive.org/details/SteamboatBillJr.19281080p",
      "Charles Reisner, 1928 — kamu malı.",
    ),
    sources: [
      archiveSrc("1080p Restorasyon", "SteamboatBillJr.19281080p", "1080p"),
      archiveSrc("Orijinal iPod Sürümü", "steamboat_bill_ipod", "Orijinal"),
    ],
  },
  {
    slug: "house-on-haunted-hill-1959",
    title: "House on Haunted Hill",
    originalTitle: "House on Haunted Hill",
    tagline: "Bir gece kal, on bin dolar kazan… ya da öl.",
    overview:
      "Eksantrik milyoner Frederick Loren, karısı için bir 'ölüm partisi' düzenler: geceyi ürpertici bir malikânede geçiren herkese servet vaat eder. Vincent Price'ın keyifli kötülüğü ve karanlık ev oyunlarıyla klasik bir B-film eğlencesi.",
    year: 1959,
    runtime: 75,
    rating: 6.8,
    voteCount: 26000,
    posterUrl: "/posters/house-haunted-hill.jpg",
    categories: ["klasik", "korku", "gerilim"],
    license: pd(
      "https://archive.org/details/HouseOnHauntedHill1959",
      "William Castle, 1959 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "HouseOnHauntedHill1959", "HD"),
      archiveSrc("Alternatif Kopya", "house_on_haunted_hill_ipod", "Orijinal"),
    ],
  },
  {
    slug: "the-last-man-on-earth-1964",
    title: "The Last Man on Earth",
    originalTitle: "The Last Man on Earth",
    tagline: "Dünyanın sonunda bir adam, bir umut.",
    overview:
      "Bir salgın insanlığın çoğunu vampir benzeri yaratıklara dönüştürür; hayatta kalan bilim insanı Dr. Morgan, gündüzleri avlanıp geceleri evini savunur. Richard Matheson'un 'I Am Legend' romanının ilk sinema uyarlaması.",
    year: 1964,
    runtime: 86,
    rating: 6.8,
    voteCount: 21000,
    posterUrl: "/posters/last-man-earth.jpg",
    categories: ["klasik", "korku", "bilim-kurgu"],
    license: pd(
      "https://archive.org/details/TheLastManOnEarthHD",
      "Ubaldo Ragona & Sidney Salkow, 1964 — kamu malı.",
    ),
    sources: [
      archiveSrc("HD Restorasyon", "TheLastManOnEarthHD", "HD"),
      archiveSrc("Alternatif Kopya", "TheLastManOnEarth_72", "Orijinal"),
    ],
  },
  {
    slug: "doa-1949",
    title: "D.O.A.",
    originalTitle: "D.O.A.",
    tagline: "Ölümüne 24 saat kaldı.",
    overview:
      "Bir muhasebeci, kendisine yavaş etkili bir zehir verildiğini öğrenir. Kalan saatlerinde kendi katilini bulmak için şehri dolaşır. Film-noir'ın en çarpıcı açılışlarından birine sahip, nefes kesici bir kovalamaca.",
    year: 1949,
    runtime: 83,
    rating: 7.2,
    voteCount: 12000,
    posterUrl: "/posters/doa.jpg",
    categories: ["klasik", "film-noir", "gerilim"],
    license: pd(
      "https://archive.org/details/DOA1949_201710",
      "Rudolph Maté, 1949 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "DOA1949_201710", "HD"),
      archiveSrc("Renklendirilmiş Sürüm", "doa-1949", "Renkli"),
    ],
  },
  {
    slug: "suddenly-1954",
    title: "Suddenly",
    originalTitle: "Suddenly",
    tagline: "Küçük kasaba, büyük bir suikast.",
    overview:
      "Başkanın kasabaya yapacağı ziyaret, bir grup suikastçının planlarıyla gölgelenir. Frank Sinatra'nın soğuk tetikçi performansıyla gerilimi tek bir otel odasına sığdıran sıkı bir kara film.",
    year: 1954,
    runtime: 75,
    rating: 6.7,
    voteCount: 5000,
    posterUrl: "/posters/suddenly.jpg",
    categories: ["klasik", "film-noir", "gerilim"],
    license: pd(
      "https://archive.org/details/Suddenly1954",
      "Lewis Allen, 1954 — kamu malı.",
    ),
    sources: [archiveSrc("Orijinal Baskı", "Suddenly1954", "HD")],
  },
  {
    slug: "the-stranger-1946",
    title: "The Stranger",
    originalTitle: "The Stranger",
    tagline: "Savaş bitti, ama o hâlâ saklanıyor.",
    overview:
      "Savaş suçlusu bir Nazi, küçük bir Amerikan kasabasında saygın bir öğretmen olarak yeni bir hayat kurmuştur. Bir savaş suçları müfettişi onun izini bulur. Orson Welles'in yönettiği, gergin bir kedi-fare oyunu.",
    year: 1946,
    runtime: 95,
    rating: 7.3,
    voteCount: 13000,
    posterUrl: "/posters/the-stranger.jpg",
    categories: ["klasik", "film-noir", "gerilim", "dram"],
    license: pd(
      "https://archive.org/details/Stranger1946HD",
      "Orson Welles, 1946 — kamu malı.",
    ),
    sources: [
      archiveSrc("HD Restorasyon", "Stranger1946HD", "HD"),
      archiveSrc(
        "1080p Blu-ray",
        "the.stranger.1946.remastered.1080p.bluray.x264amiable",
        "1080p",
      ),
    ],
  },
  {
    slug: "scarlet-street-1945",
    title: "Scarlet Street",
    originalTitle: "Scarlet Street",
    tagline: "Her yalanın bir bedeli vardır.",
    overview:
      "Sıradan bir banka memuru, genç bir kadının ilgisine kapılıp kendini sanatçı sanan bir hayal dünyasına dalar. Fritz Lang'ın soğuk bakışıyla, insanın kendi yalanına nasıl yenildiğini anlatan bir noir.",
    year: 1945,
    runtime: 103,
    rating: 7.7,
    voteCount: 13000,
    posterUrl: "/posters/scarlet-street.jpg",
    categories: ["klasik", "film-noir", "dram"],
    license: pd(
      "https://archive.org/details/Scarlet.Street.194517",
      "Fritz Lang, 1945 — kamu malı.",
    ),
    sources: [
      archiveSrc("HD Restorasyon", "Scarlet.Street.194517", "HD"),
      archiveSrc("Orijinal Baskı", "ScarletStreet", "Orijinal"),
    ],
  },
  {
    slug: "the-hitch-hiker-1953",
    title: "The Hitch-Hiker",
    originalTitle: "The Hitch-Hiker",
    tagline: "Yolculuk bir kâbusa dönüşür.",
    overview:
      "İki arkadaş, Meksika'ya yaptıkları yolculukta kaçak bir katili arabalarına alır. Ida Lupino'nun yönettiği, kapalı mekânda gerilim yaratmanın ders kitabı niteliğindeki noir gerilimi.",
    year: 1953,
    runtime: 71,
    rating: 7.0,
    voteCount: 6000,
    posterUrl: "/posters/hitch-hiker.jpg",
    categories: ["klasik", "film-noir", "gerilim"],
    license: pd(
      "https://archive.org/details/Hitch_Hiker",
      "Ida Lupino, 1953 — kamu malı.",
    ),
    sources: [archiveSrc("Orijinal Baskı", "Hitch_Hiker", "HD")],
  },
  {
    slug: "the-little-princess-1939",
    title: "The Little Princess",
    originalTitle: "The Little Princess",
    tagline: "Her prensesin bir sığınağı vardır.",
    overview:
      "Babası savaşa giden küçük Sara, yatılı okulda hizmetçiye dönüştürülür; yine de umudunu ve hayal gücünü korur. Shirley Temple'ın ışıltısı ve ilk Technicolor sahneleriyle sıcak bir aile klasiği.",
    year: 1939,
    runtime: 93,
    rating: 7.1,
    voteCount: 5000,
    posterUrl: "/posters/little-princess.jpg",
    categories: ["klasik", "aile", "dram"],
    license: pd(
      "https://archive.org/details/little_princess",
      "Walter Lang, 1939 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "little_princess", "HD"),
      archiveSrc("Alternatif Kopya", "TheLittlePrincess1939", "Orijinal"),
    ],
  },
  {
    slug: "things-to-come-1936",
    title: "Things to Come",
    originalTitle: "Things to Come",
    tagline: "Yarın, bugünün hayalidir.",
    overview:
      "H. G. Wells'in senaryosundan uyarlanan film, bir savaşın yıktığı dünyadan geleceğin teknolojik ütopyasına uzanan yüzyıllık bir vizyon çizer. Döneminin en iddialı bilim kurgu yapımlarından biri.",
    year: 1936,
    runtime: 100,
    rating: 6.7,
    voteCount: 8000,
    posterUrl: "/posters/things-to-come.jpg",
    categories: ["klasik", "bilim-kurgu", "dram"],
    license: pd(
      "https://archive.org/details/things_to_come_ipod",
      "William Cameron Menzies, 1936 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "things_to_come_ipod", "HD"),
      archiveSrc("Alternatif Kopya", "ClaCinOnl_ThingsToCome", "Orijinal"),
    ],
  },
  {
    slug: "the-wasp-woman-1959",
    title: "The Wasp Woman",
    originalTitle: "The Wasp Woman",
    tagline: "Güzellik için ödenen bedel.",
    overview:
      "Kozmetik imparatoriçesi Janice, gençliğini geri kazanmak için arı serumu deneyen bir bilim insanının teklifini kabul eder. Roger Corman'ın kısa, tuhaf ve akılda kalıcı korku filmi.",
    year: 1959,
    runtime: 73,
    rating: 4.9,
    voteCount: 6000,
    posterUrl: "/posters/wasp-woman.jpg",
    categories: ["klasik", "korku", "bilim-kurgu"],
    license: pd(
      "https://archive.org/details/TheWaspWoman1959",
      "Roger Corman, 1959 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "TheWaspWoman1959", "HD"),
      archiveSrc("16:9 Versiyon", "TheWaspWoman1959169Version", "HD"),
    ],
  },
  {
    slug: "teenagers-from-outer-space-1959",
    title: "Teenagers from Outer Space",
    originalTitle: "Teenagers from Outer Space",
    tagline: "Uzaydan gelen gençler, dünyayı tehdit ediyor.",
    overview:
      "Dünyayı dev bir ıstakoz çiftliği yapmayı planlayan uzaylılar, genç bir dünyalı kıza âşık olan bir istilacının isyanıyla planlarını tehlikeye atar. Düşük bütçeli ama sevimli bir kült bilim kurgu.",
    year: 1959,
    runtime: 86,
    rating: 3.7,
    voteCount: 5000,
    posterUrl: "/posters/teenagers.jpg",
    categories: ["klasik", "bilim-kurgu", "korku"],
    license: pd(
      "https://archive.org/details/teenagers_from_outerspace",
      "Tom Graeff, 1959 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "teenagers_from_outerspace", "HD"),
      archiveSrc("Alternatif Kopya", "TeenagersFromOuterSpace1959", "Orijinal"),
    ],
  },
  {
    slug: "robot-monster-1953",
    title: "Robot Monster",
    originalTitle: "Robot Monster",
    tagline: "Dünya bir goril kostümünün elinde.",
    overview:
      "Uzaylı Ro-Man, insanlığı yok etmek için Dünya'ya gelir; geriye kalan bir aileyle tuhaf bir pazarlık yapar. Goril kaskı ve dalgıç kıyafetiyle sinema tarihinin en ünlü 'kötü film'lerinden biri.",
    year: 1953,
    runtime: 66,
    rating: 3.0,
    voteCount: 7000,
    posterUrl: "/posters/robot-monster.jpg",
    categories: ["klasik", "bilim-kurgu", "korku"],
    license: pd(
      "https://archive.org/details/robot-monster-1953",
      "Phil Tucker, 1953 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "robot-monster-1953", "HD"),
      archiveSrc("Restore & Renkli", "robot-monster-1953-colorized-movie-576p-sd", "Renkli"),
    ],
  },
  {
    slug: "the-beast-of-yucca-flats-1961",
    title: "The Beast of Yucca Flats",
    originalTitle: "The Beast of Yucca Flats",
    tagline: "Çölün ortasında bir canavar uyanır.",
    overview:
      "Bir nükleer deney kazası, bilim insanı Joseph Javorsky'yi çölde dolaşan bir canavara dönüştürür. Tor Johnson ve Coleman Francis imzalı, anlatımı ve kurgusuyla kültleşmiş bir tuhaflık.",
    year: 1961,
    runtime: 54,
    rating: 1.9,
    voteCount: 3000,
    posterUrl: "/posters/beast-yucca.jpg",
    categories: ["klasik", "korku", "bilim-kurgu"],
    license: pd(
      "https://archive.org/details/TheBeastOfYuccaFlats1961",
      "Coleman Francis, 1961 — kamu malı.",
    ),
    sources: [archiveSrc("Orijinal Baskı", "TheBeastOfYuccaFlats1961", "Orijinal")],
  },
  {
    slug: "charade-1963",
    title: "Charade",
    originalTitle: "Charade",
    tagline: "Herkes yalan söylüyor, özellikle âşıklar.",
    overview:
      "Kocası öldürülen Regina, ortada dolaşan gizemli bir servetin peşindeki dört tehlikeli adamla ve kendini farklı isimlerle tanıtan yakışıklı bir yabancıyla baş başa kalır. Cary Grant ve Audrey Hepburn'ün kimyasıyla bir gerilim komedisi.",
    year: 1963,
    runtime: 113,
    rating: 7.9,
    voteCount: 78000,
    posterUrl: "/posters/charade.jpg",
    featured: true,
    categories: ["klasik", "gerilim", "komedi"],
    license: pd(
      "https://archive.org/details/turner_video_341",
      "Stanley Donen, 1963 — telif bildirimi eksikliği nedeniyle kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "turner_video_341", "HD"),
      archiveSrc("Alternatif Kopya", "la35ca-Cinema_35_-_Charade_1963", "Orijinal"),
    ],
  },
  {
    slug: "the-39-steps-1935",
    title: "The 39 Steps",
    originalTitle: "The 39 Steps",
    tagline: "Bir adam, bir tren, bir komplo.",
    overview:
      "Sıradan bir Londralı, kendini bir casusluk komplosunun ortasında bulur ve İskoçya'ya uzanan bir kaçışa başlar. Hitchcock'un 'yanlış adam' temasını ustalıkla işlediği erken dönem başyapıtı.",
    year: 1935,
    runtime: 86,
    rating: 7.6,
    voteCount: 60000,
    posterUrl: "/posters/39-steps.jpg",
    categories: ["klasik", "gerilim", "macera"],
    license: pd(
      "https://archive.org/details/The39Steps_1935",
      "Alfred Hitchcock, 1935 — kamu malı.",
    ),
    sources: [
      archiveSrc("Orijinal Baskı", "The39Steps_1935", "HD"),
      archiveSrc("Alternatif Kopya", "the-39-steps_202306", "Orijinal"),
    ],
  },
  {
    slug: "popeye-aladdin-1939",
    title: "Temel Reis: Alaaddin'in Sihirli Lambası",
    originalTitle: "Popeye the Sailor: Aladdin and His Wonderful Lamp",
    tagline: "Ispanak, sihirden güçlüdür.",
    overview:
      "Temel Reis, Alaaddin'in sihirli lambasıyla ilgili bir hikâyenin içine düşer; Safinaz'ı kurtarmak için lambanın cinine ve bir dolu badiye rağmen savaşır. 1939 yapımı renkli Popeye kısa filmi, restorasyonlu Türkçe dublajıyla.",
    year: 1939,
    runtime: 17,
    rating: 7.0,
    voteCount: 1200,
    posterUrl: "/posters/popeye-aladdin.jpg",
    categories: ["klasik", "animasyon", "komedi", "aile"],
    license: pd(
      "https://archive.org/details/temel-reis-alaaddinin-sihirli-lambasi-1939-restorasyonlu-720-p-turkce-dublaj",
      "Fleischer Studios, 1939 — kamu malı. Türkçe dublaj arşiv kopyası.",
    ),
    sources: [
      archiveSrc(
        "Türkçe Dublaj · 720p",
        "temel-reis-alaaddinin-sihirli-lambasi-1939-restorasyonlu-720-p-turkce-dublaj",
        "720p",
        "Türkçe Dublaj",
      ),
    ],
  },

  // ── Diziler ───────────────────────────────────────────────────────────
  {
    slug: "the-beverly-hillbillies",
    title: "The Beverly Hillbillies",
    originalTitle: "The Beverly Hillbillies",
    tagline: "Dağdan geldiler, Beverly Hills'e yerleştiler.",
    overview:
      "Batı Virginia'nın dağlarında yaşayan Clampett ailesi, arazilerinde petrol bulunca Beverly Hills'e taşınır. Şehir hayatının kurallarını bilmeyen ailenin saflığı, dizinin en büyük komedi motorudur. 1962-1971 arasında yayınlanan kült sitcom'un kamu malı bölümleri.",
    year: 1962,
    runtime: 25,
    rating: 7.1,
    voteCount: 9000,
    posterUrl: "/posters/beverly-hillbillies.jpg",
    featured: true,
    kind: "SERIES",
    categories: ["klasik", "komedi", "aile", "dizi"],
    license: pd(
      "https://archive.org/details/The_Beverly_Hillbillies",
      "Filmways Television, 1962 — kamu malı bölümler.",
    ),
    sources: [],
    episodes: [
      {
        season: 1,
        number: 1,
        title: "The Clampetts Strike Oil",
        overview:
          "Clampett ailesi arazilerinde petrol bulur ve milyoner olarak Beverly Hills'e taşınmaya karar verir.",
        runtime: 25,
        sourceId: "Beverly_Hillbillies_Ep01_The_Clampetts_Strike_Oil",
      },
      {
        season: 1,
        number: 2,
        title: "Getting Settled",
        overview:
          "Aile, Beverly Hills'teki yeni malikânesine yerleşmeye çalışırken şehir hayatının tuhaflıklarıyla tanışır.",
        runtime: 25,
        sourceId: "Beverly_Hillbillies_Ep02_Getting_Settled",
      },
      {
        season: 1,
        number: 13,
        title: "Home for Christmas",
        overview:
          "Noel yaklaşırken Clampett'ler, dağlardaki eski evlerini ve geleneklerini özler.",
        runtime: 25,
        sourceId: "Beverly_Hillbillies_Ep13_Home_For_Christmas",
      },
    ],
  },
  {
    slug: "the-lone-ranger",
    title: "The Lone Ranger",
    originalTitle: "The Lone Ranger",
    tagline: "Maskeli adam ve sadık atı Silver.",
    overview:
      "Teksas Ranger'ları pusuya düşürüldükten sonra tek hayatta kalan adam, maskesini takıp suçla savaşmaya başlar. Kemo Sabe dostu Tonto ile birlikte Batı'nın adaletsizliklerine karşı durur. 1949 yapımı kült western dizisinin kamu malı bölümleri.",
    year: 1949,
    runtime: 24,
    rating: 7.4,
    voteCount: 3600,
    posterUrl: "/posters/lone-ranger.jpg",
    kind: "SERIES",
    categories: ["klasik", "western", "macera", "dizi"],
    license: pd(
      "https://archive.org/details/theloneranger_201705",
      "Apex Film / Wrather Productions, 1949 — kamu malı bölümler.",
    ),
    sources: [],
    episodes: [
      {
        season: 1,
        number: 1,
        title: "Enter the Lone Ranger",
        overview:
          "Ranger John Reid, pusudan sağ kurtulur ve suçluların peşine düşmek için maskesini takar.",
        runtime: 24,
        sourceId: "enter_the_lone_ranger",
      },
      {
        season: 1,
        number: 2,
        title: "The Legion of Old Timers",
        overview:
          "Bir grup emekli, genç bir çiftliği dolandırıcılardan korumak için bir araya gelir.",
        runtime: 24,
        sourceId: "LegionOfOldTimers1949",
      },
      {
        season: 1,
        number: 3,
        title: "Old Joe's Sister",
        overview:
          "Yanlış suçlamalarla karşı karşıya kalan bir aileye yardım eden Ranger, gerçek suçluyu arar.",
        runtime: 24,
        sourceId: "OldJoeSister",
      },
      {
        season: 1,
        number: 4,
        title: "Cannonball McKay",
        overview:
          "Eski bir haydut, geçmişini geride bırakıp dürüst bir hayat kurmaya çalışır.",
        runtime: 24,
        sourceId: "TheLoneRanger-CannonballMcKay",
      },
    ],
  },
  {
    slug: "dragnet-1951",
    title: "Dragnet",
    originalTitle: "Dragnet",
    tagline: "Sadece gerçekler, efendim.",
    overview:
      "Los Angeles Polis Departmanı'nda görevli Çavuş Joe Friday, her bölümde gerçek bir davayı belgesel soğukkanlılığıyla çözer. Polisiye dizilerin kalıplarını belirleyen, Jack Webb imzalı efsanevi yapımın kamu malı bölümleri.",
    year: 1951,
    runtime: 26,
    rating: 7.5,
    voteCount: 2800,
    posterUrl: "/posters/dragnet.jpg",
    kind: "SERIES",
    categories: ["klasik", "gerilim", "dram", "dizi"],
    license: pd(
      "https://archive.org/details/Dragnet1951",
      "Mark VII Limited, 1951 — kamu malı bölümler.",
    ),
    sources: [],
    episodes: [
      {
        season: 1,
        number: 1,
        title: "The Human Bomb",
        overview:
          "Bir adam, hapse atılmasına neden olan kişiyi bir bombayla tehdit eder.",
        runtime: 26,
        sourceId: "DragnetTheHumanBomb",
      },
      {
        season: 1,
        number: 2,
        title: "The Big Actor",
        overview:
          "Bir tiyatro oyuncusunun ölümü, göründüğünden çok daha karmaşık bir davanın kapısını aralar.",
        runtime: 26,
        sourceId: "DragnetTheBigActor",
      },
      {
        season: 1,
        number: 3,
        title: "The Big Betty",
        overview:
          "Bir dolandırıcılık çetesi, sahte bir yatırım planıyla insanları tuzağa düşürür.",
        runtime: 26,
        sourceId: "DragnetTheBigBetty",
      },
      {
        season: 1,
        number: 4,
        title: "The Big Oskar",
        overview:
          "Bir mücevher hırsızlığı vakasında ipuçları, beklenmedik bir şüpheliye işaret eder.",
        runtime: 26,
        sourceId: "Dragnet_The_Big_Oskar",
      },
    ],
  },
  {
    slug: "the-cisco-kid",
    title: "The Cisco Kid",
    originalTitle: "The Cisco Kid",
    tagline: "Batı'nın en zarif kahramanı.",
    overview:
      "Şık giyimli, neşeli haydut Cisco Kid ve sadık dostu Pancho, her bölümde adaleti sağlamak için yola çıkar. 1950'lerin renkli western dizisinin kamu malı bölümleri.",
    year: 1950,
    runtime: 26,
    rating: 6.8,
    voteCount: 900,
    posterUrl: "/posters/cisco-kid.jpg",
    kind: "SERIES",
    categories: ["klasik", "western", "macera", "dizi"],
    license: pd(
      "https://archive.org/details/TheCiscoKidpublicdomain",
      "Ziv Television, 1950 — kamu malı bölümler.",
    ),
    sources: [],
    episodes: [
      {
        season: 1,
        number: 8,
        title: "The Convict Story",
        overview:
          "Cisco, haksız yere suçlanan bir mahkûmun masumiyetini kanıtlamaya çalışır.",
        runtime: 26,
        sourceId: "cisco-kid-s-01-e-08-convict-story",
      },
    ],
  },
  {
    slug: "flash-gordon-conquers-the-universe",
    title: "Flash Gordon Conquers the Universe",
    originalTitle: "Flash Gordon Conquers the Universe",
    tagline: "Mongo'dan Dünya'ya uzanan savaş.",
    overview:
      "Ming'in yenilgisinden sonra Dünya'yı tehdit eden 'Mor Ölüm' salgınına karşı Flash, Dale ve Dr. Zarkov yeniden Mongo'ya döner. 1940 yapımı 12 bölümlük seri, cumartesi matinelerinin en parlak örneği.",
    year: 1940,
    runtime: 20,
    rating: 6.6,
    voteCount: 2100,
    posterUrl: "/posters/flash-gordon.jpg",
    kind: "SERIES",
    categories: ["klasik", "bilim-kurgu", "macera", "dizi"],
    license: pd(
      "https://archive.org/details/flash_gordon1",
      "Universal Pictures, 1940 — kamu malı.",
    ),
    sources: [],
    episodes: [
      {
        season: 1,
        number: 1,
        title: "Chapter 1: The Purple Death",
        overview:
          "Dünya'yı kasıp kavuran Mor Ölüm salgınının kaynağı Mongo'dadır; Flash ve ekibi yola çıkar.",
        runtime: 20,
        sourceId: "flash_gordon1",
      },
      {
        season: 1,
        number: 2,
        title: "Chapter 2: Freezing Torture",
        overview:
          "Flash, Ming'in adamlarının eline düşer ve dondurucu bir işkenceyle karşı karşıya kalır.",
        runtime: 20,
        sourceId: "flash_gordon2",
      },
      {
        season: 1,
        number: 3,
        title: "Chapter 3: Walking Bombs",
        overview:
          "Ming, Dünya'yı yürüyen bombalarla tehdit eder; Flash engel olmaya çalışır.",
        runtime: 20,
        sourceId: "flash_gordon3",
      },
    ],
  },
];

async function main() {
  console.log("🌱 LwoFilm veritabanı dolduruluyor...");

  await prisma.videoSource.deleteMany();
  await prisma.episode.deleteMany();
  await prisma.licenseInfo.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.createMany({ data: categories });
  const categoryRows = await prisma.category.findMany();
  const bySlug = Object.fromEntries(categoryRows.map((c) => [c.slug, c.id]));

  const normalizeSources = (sources = []) =>
    sources.map((source, index) => ({
      ...source,
      isDefault: Boolean(source.isDefault) || index === 0,
      sortOrder: index,
    }));

  for (const entry of films) {
    const {
      categories: catSlugs,
      license,
      sources,
      episodes,
      kind,
      ...data
    } = entry;

    const created = await prisma.movie.create({
      data: {
        ...data,
        kind: kind ?? "FILM",
        categories: {
          connect: catSlugs.map((slug) => ({ id: bySlug[slug] })),
        },
        license: {
          create: {
            ...license,
            verifiedAt: license.verified ? new Date() : null,
          },
        },
        sources: normalizeSources(sources).length
          ? { create: normalizeSources(sources) }
          : undefined,
      },
    });

    if (episodes?.length) {
      for (const episode of episodes) {
        const createdEpisode = await prisma.episode.create({
          data: {
            movieId: created.id,
            season: episode.season ?? 1,
            number: episode.number,
            title: episode.title,
            overview: episode.overview ?? null,
            runtime: episode.runtime ?? null,
            stillUrl: episode.stillUrl ?? null,
          },
        });

        await prisma.videoSource.createMany({
          data: normalizeSources([
            {
              label: episode.sourceLabel ?? "Orijinal Bölüm",
              provider: "archive",
              url: archive(episode.sourceId),
              quality: episode.quality ?? "HD",
              language: episode.language ?? "Orijinal Dil",
            },
          ]).map((source) => ({
            ...source,
            movieId: created.id,
            episodeId: createdEpisode.id,
          })),
        });
      }
    }

    console.log(
      `  ✓ ${entry.title} (${entry.year})${
        episodes ? ` · ${episodes.length} bölüm` : ""
      }`,
    );
  }

  console.log(
    `\n✅ ${films.length} yapım, ${categories.length} kategori hazır.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
