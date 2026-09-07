# Emre Can Kınalı — Benim dünyam

Fotoğraf ağırlıklı kişisel web sitesi: tam ekran İstanbul atmosferi, büyük isim tipografisi, fotoğraf kolajı, kişisel tanıtım, bugün ve gelecek bölümleri. Koyu lacivert, turuncu ve açık mavi renkler kullanılır.

## Çalıştırma

```bash
npm run dev
```

http://localhost:3001 adresini açın. Sunucuyu durdurmak için Ctrl+C kullanın. `server.mjs` değiştiğinde sunucuyu yeniden başlatın. Farklı port: `PORT=3002 npm run dev`.

HTML, CSS ve JavaScript kullanır; derleme ve bağımlılık kurulumu gerekmez. `index.html` doğrudan tarayıcıda da açılabilir.

```bash
npm run check
```

Bu komut JavaScript sözdizimini kontrol eder.

## Dosyalar ve kişiselleştirme

- `index.html`: Kişisel metinler ve bölümler.
- `style.css`: Masaüstü ve mobil düzenler; azaltılmış hareket tercihi desteği.
- `script.js`: Altı görsellik otomatik arka plan ve güncel yıl.
- `server.mjs`: 3001 portunda yerel sunucu ve izin verilen statik dosya yolları.
- `assets/istanbul-blue.png`: Yapay zekâ ile üretilmiş İstanbul atmosferi.
- `assets/night-study.png`: Yapay zekâ ile üretilmiş çalışma masası atmosferi.
- `assets/PROMPTS.md`: Yerleşik image_gen aracı için kullanılan tam üretim istemleri.

Görseller Emre'nin kişisel fotoğrafları değildir; sonradan kendi fotoğraflarıyla değiştirilebilir. Hedefler ilk taslak metinlerdir. Üniversite, bölüm, sınıf ve kendini geliştirme isteği kullanıcının verdiği bilgilere dayanır. Ad ve GitHub adresi bağlı profilden alınmıştır.

Arka plan İstanbul, Alpler, Kyoto, İzlanda, New York ve çalışma masası arasında 8 saniye aralıklarla, 1,8 saniyelik solma geçişiyle döner. Sonraki fotoğraf önceden yüklenir; başarısız yüklemeler atlanır. Sekme gizliyken ve azaltılmış hareket tercihi açıkken otomatik geçiş durur. Yeni görsellerin tam istemleri `assets/SLIDESHOW-PROMPTS.md` dosyasındadır. Hedeflerin başlıkları tıklanarak ayrıntıları açılır; klavyeyle de kullanılabilir.

GitHub deposu: https://github.com/kinaliemre/kisisel-web-sitem

Yeni tasarım yerel dosyalardadır. GitHub'a yansıması için commit ve push gerekir. Site henüz internette yayımlanmamıştır.
