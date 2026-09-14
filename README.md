# Emre Can Kınalı — Kişisel sayfam

Koyu zemin, ince tipografi ve sabit dağ arka planıyla sade kişisel web sitesi. Ana sayfa, hakkında, çalışmalar ve iletişim için ayrı HTML sayfaları kullanır. Üst menü sayfalar arasında geçiş yapar; aktif sayfa alt çizgiyle belirtilir. Mobil ekranlara uyumludur; harici font, bağımlılık veya otomatik animasyon içermez.

## Çalıştırma

```bash
npm run dev
```

http://localhost:3001 adresini açın. Sunucuyu durdurmak için Ctrl+C kullanın. Farklı port: `PORT=3002 npm run dev`.

HTML, CSS ve JavaScript kullanır; derleme ve bağımlılık kurulumu gerekmez. `index.html` doğrudan tarayıcıda da açılabilir.

```bash
npm run check
```

Bu komut JavaScript sözdizimini, sunucunun özel dosyaları engellemesini, yayın dosyalarının kapsamını ve sayfalardaki yerel bağlantıları kontrol eder. Node.js 22 veya üzerini kullanın.

## Yayına hazırlama

```bash
npm run check
npm run build
```

Hosting hizmetinde yayın klasörü olarak **yalnızca `dist/`** seçilmelidir. Proje kökünü yüklemeyin. Derleme, bu üretilmiş klasörü her çalıştırmada yeniden oluşturur; içine elle dosya koymayın.

Yayın çıktısı dört HTML sayfası, CSS, JavaScript, favicon, kullanılan tek arka plan görseli ve `_headers` dosyasından oluşur. `.git`, `.env`, sunucu kodu, testler, geliştirme notları ve kullanılmayan görseller bu çıktıya alınmaz. İzin verilen dosyalar `site-config.mjs` içinde açıkça listelenmiştir. `.gitignore` tek başına bir web sunucusunda erişimi engellemez.

HTML, CSS ve tarayıcı JavaScript’i ziyaretçiler tarafından görülebilir. Bu dosyalarda parola veya özel anahtar tutulmamalıdır. Sayfalarda gösterilen ad, eğitim bilgisi, GitHub profili ve proje açıklamaları da herkese açık olacaktır. Proje kartları başka depoların kodunu veya veritabanını bu siteye kopyalamaz; yalnızca herkese açık depo bağlantılarını içerir.

`_headers` biçimini destekleyen hosting hizmetlerinde güvenlik başlıkları uygulanır. Diğer hizmetlerde aynı başlıkları sunucu/panel üzerinden tanımlayın. HTML içindeki CSP ve referrer ayarları temel korumayı taşır; iframe engellemesi için HTTP başlıkları gerekir. [CSP başvuru belgesi](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy).

`server.mjs` yerel önizleme içindir ve yalnızca `127.0.0.1` üzerinde dinler. Canlı yayın HTTPS sağlayan bir statik hosting hizmetinde `dist/` üzerinden yapılmalıdır. Bu komutlar otomatik yükleme veya yayınlama yapmaz. Önceden proje kökü yüklenmişse eski yayın dosyaları da kaldırılarak çıktı değiştirilmelidir; yalnızca yeni dosyaları eklemek eski dosyaları gizlemez.

## Kişiselleştirme

- `index.html`: Ana sayfa ve kısa tanışma.
- `hakkimda.html`, `calismalar.html`, `iletisim.html`: Menüden ulaşılan içerik sayfaları.
- `style.css`: Renkler, tipografi, masaüstü ve mobil düzenler.
- `script.js`: Alt bilgideki yılı günceller.
- `favicon.svg`: Sayfanın simgesi.
- `server.mjs`: Yerel önizleme sunucusu.

Girişte `assets/alps.png` sabit, CSS ile karartılmış dekoratif arka plan olarak kullanılır. Yapay zekâ ile oluşturulmuş görselin kaynak notları `assets/` klasöründedir. Yeni çalışmalar `calismalar.html` dosyasına eklenebilir.

GitHub deposu: https://github.com/kinaliemre/kisisel-web-sitem
