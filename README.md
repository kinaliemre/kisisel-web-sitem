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

Bu komut JavaScript sözdizimini kontrol eder.

## Kişiselleştirme

- `index.html`: Ana sayfa ve kısa tanışma.
- `hakkimda.html`, `calismalar.html`, `iletisim.html`: Menüden ulaşılan içerik sayfaları.
- `style.css`: Renkler, tipografi, masaüstü ve mobil düzenler.
- `script.js`: Alt bilgideki yılı günceller.
- `favicon.svg`: Sayfanın simgesi.
- `server.mjs`: Yerel önizleme sunucusu.

Girişte `assets/alps.png` sabit, CSS ile karartılmış dekoratif arka plan olarak kullanılır. Yapay zekâ ile oluşturulmuş görselin kaynak notları `assets/` klasöründedir. Yeni çalışmalar `calismalar.html` dosyasına eklenebilir.

GitHub deposu: https://github.com/kinaliemre/kisisel-web-sitem
