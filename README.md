<div align="center">

# eDoc Viewer

**XML tabanlı e-Belgeleri XSLT şablonlarıyla tarayıcı üzerinde görüntülemek ve PDF olarak kaydetmek için geliştirilmiş React uygulaması.**

![React](https://img.shields.io/badge/React-16.13.1-61DAFB?logo=react&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-4.x-0081CB?logo=mui&logoColor=white)
![License](https://img.shields.io/badge/Lisans-MIT-green)
![Processing](https://img.shields.io/badge/İşleme-Tarayıcıda-success)

</div>

---

## Proje Hakkında

**eDoc Viewer**, XML formatındaki elektronik belgeleri XSLT şablonlarıyla işleyerek tarayıcı içerisinde okunabilir bir belge görünümüne dönüştürür.

Uygulama özellikle UBL-TR tabanlı e-Fatura ve benzeri elektronik belgelerin görüntülenmesi amacıyla kullanılabilir. Kullanıcı bir XML dosyası seçebilir, gerektiğinde harici bir XSLT dosyası yükleyebilir ve oluşturulan belgeyi tarayıcının yazdırma ekranı üzerinden PDF olarak kaydedebilir.

Harici bir XSLT dosyası seçilmediğinde uygulama, XML içerisindeki `cbc:EmbeddedDocumentBinaryObject` alanında Base64 olarak gömülü bulunan XSLT şablonunu kullanmayı dener.

> Seçilen XML ve XSLT dosyaları uygulama tarafından bir sunucuya yüklenmez. Dönüştürme işlemi tarayıcı içerisinde gerçekleştirilir. Bununla birlikte, kullanılan XSLT şablonu harici görsel, font veya başka kaynaklar içeriyorsa tarayıcı bu kaynaklara ağ isteği gönderebilir.

---

## Özellikler

- Yerel XML e-Belge dosyası seçme
- İsteğe bağlı harici XSLT şablonu seçme
- XML içerisindeki gömülü XSLT şablonunu otomatik kullanma
- Base64 olarak gömülü XSLT içeriğini UTF-8 olarak çözümleme
- XML ve XSLT içeriğini tarayıcıda HTML çıktısına dönüştürme
- Oluşturulan belgeyi sayfa içerisinde önizleme
- Tarayıcının yazdırma ekranı üzerinden PDF olarak kaydetme
- Açık ve koyu tema desteği
- Sunucu ve veritabanı gerektirmeyen istemci taraflı çalışma
- Temel hata yakalama ve kullanıcı uyarıları

---

## Kullanım

1. **XML Dosyasını Seç** alanından görüntülemek istediğiniz XML belgesini seçin.
2. XML dosyasında gömülü XSLT bulunmuyorsa **XSLT Dosyasını Seç** alanından uygun şablonu seçin.
3. **Faturayı Göster** butonuna tıklayın.
4. Dönüştürülen belge sayfanın alt bölümünde görüntülenecektir.
5. **PDF Kaydet** butonuna tıklayın.
6. Açılan yazdırma ekranında hedef olarak **PDF olarak kaydet** seçeneğini kullanın.

> PDF penceresi açılmıyorsa tarayıcınızın bu site için açılır pencere iznini kontrol edin.

---

## Nasıl Çalışır?

```text
XML dosyası seçilir
        │
        ▼
Harici XSLT seçilmiş mi?
   ┌────┴────┐
  Evet      Hayır
   │          │
   │          ▼
   │   XML içerisindeki
   │   gömülü XSLT aranır
   │          │
   └────┬─────┘
        ▼
XML + XSLT dönüşümü
        │
        ▼
HTML belge önizlemesi
        │
        ▼
Yazdır / PDF olarak kaydet
```

Dönüşüm sırasında ağırlıklı olarak aşağıdaki tarayıcı API'leri kullanılır:

- `FileReader`
- `DOMParser`
- `XSLTProcessor`
- `TextDecoder`
- `window.print()`

---

## Kullanılan Teknolojiler

| Teknoloji | Kullanım amacı |
| --- | --- |
| React 16.13.1 | Kullanıcı arayüzü ve uygulama akışı |
| Create React App | Proje yapılandırması ve build süreci |
| Material-UI 4 | Arayüz bileşenleri ve tema desteği |
| FileReader API | Yerel XML ve XSLT dosyalarını okuma |
| DOMParser | XML metnini belge nesnesine dönüştürme |
| XSLTProcessor | XML belgesini XSLT ile HTML'e dönüştürme |
| TextDecoder | Base64 içeriğinden elde edilen veriyi UTF-8 çözümleme |
| Browser Print API | Oluşturulan belgeyi yazdırma veya PDF olarak kaydetme |

---

## Kurulum

Repoyu klonlayın:

```bash
git clone https://github.com/SabahattinAkal/edoc-viewer.git
cd edoc-viewer
```

Bağımlılıkları yükleyin:

```bash
npm install
```

veya:

```bash
yarn install
```

Geliştirme sunucusunu başlatın:

```bash
npm start
```

veya:

```bash
yarn start
```

Uygulama varsayılan olarak aşağıdaki adreste açılır:

```text
http://localhost:3000
```

---

## Kullanılabilir Komutlar

### Geliştirme ortamı

```bash
npm start
```

### Testler

```bash
npm test
```

> Projede şu anda yalnızca temel Create React App test yapısı bulunmaktadır.

### Production build

```bash
npm run build
```

Optimize edilmiş dosyalar `build` klasörüne oluşturulur.

### GitHub Pages dağıtımı

```bash
yarn deploy
```

Dağıtımdan önce `package.json` içerisinde uygun `homepage` alanının tanımlandığından emin olun:

```json
{
  "homepage": "https://sabahattinakal.github.io/edoc-viewer"
}
```

---

## Proje Yapısı

```text
edoc-viewer/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── Components/
│   │   └── Main.jsx
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
├── package-lock.json
├── yarn.lock
├── LICENSE
└── README.md
```

### Önemli Dosyalar

- `src/App.js`  
  Material-UI tema yapısını, açık/koyu tema geçişini ve ana uygulama bileşenini içerir.

- `src/Components/Main.jsx`  
  XML/XSLT dosya seçimi, gömülü XSLT çözümleme, belge dönüşümü, önizleme ve tarayıcı tabanlı PDF akışını içerir.

- `package.json`  
  Proje bağımlılıklarını ve çalıştırma komutlarını tanımlar.

---

## Gizlilik ve Güvenlik

Uygulama seçilen belgeleri kendi başına bir API'ye veya veritabanına göndermez.

- XML ve XSLT dosyaları yerel olarak okunur.
- Dönüştürme işlemi tarayıcı içerisinde yapılır.
- Belge içeriği uygulama tarafından kalıcı olarak saklanmaz.
- Hassas e-Belgeler yalnızca güvenilir cihaz ve tarayıcılarda açılmalıdır.
- XSLT içerisinde tanımlanan harici kaynaklar ayrıca ağ üzerinden yüklenebilir.
- Kaynağı bilinmeyen XML veya XSLT dosyaları kullanılmamalıdır.

---

## Bilinen Sınırlamalar

- `XSLTProcessor` desteği ve davranışı tarayıcıya göre değişebilir.
- Gömülü XSLT farklı bir XML namespace ön ekiyle tanımlanmışsa otomatik algılama başarısız olabilir.
- Bazı XSLT şablonları harici görsellere, fontlara veya dosyalara ihtiyaç duyabilir.
- PDF çıktısının görünümü tarayıcının yazdırma motoruna bağlıdır.
- Büyük XML dosyaları tarayıcı performansını etkileyebilir.
- Uygulama XML şema veya imza doğrulaması yapmaz.
- Bu araç, belgenin mali veya hukuki geçerliliğini kontrol etmez.

---

## Proje Geçmişi ve Atıf

Bu proje, **Hakan Uçar** tarafından geliştirilen
[OnlineEDocumentShow](https://github.com/HakanUcaar/OnlineEDocumentShow)
projesi temel alınarak hazırlanmıştır.

Orijinal proje MIT Lisansı altında yayımlanmıştır:

```text
Copyright (c) 2020 Hakan Uçar
```

Bu repoda yapılan başlıca uyarlamalar arasında Electron'a bağlı PDF oluşturma akışının tarayıcı yazdırma ekranına taşınması, Base64/UTF-8 çözümleme iyileştirmeleri ve hata yönetimi düzenlemeleri bulunmaktadır.

### Katkı ve bakım

- **Orijinal proje ve temel uygulama:** Hakan Uçar
- **Web uyarlaması, düzenlemeler ve depo bakımı:** Sabahattin Akal

Bu atıf, orijinal geliştiricinin telif hakkını ve katkısını korumak amacıyla README ve `LICENSE` dosyasında muhafaza edilmelidir.

---

## Katkıda Bulunma

1. Repoyu fork edin.
2. Yeni bir branch oluşturun:

```bash
git checkout -b feature/yeni-ozellik
```

3. Değişikliklerinizi commit edin:

```bash
git commit -m "feat: yeni özellik eklendi"
```

4. Branch'i gönderin:

```bash
git push origin feature/yeni-ozellik
```

5. Bir Pull Request oluşturun.

Hata bildirirken örnek XML belgelerindeki kişisel, ticari, mali ve hukuki bilgileri temizlemeyi unutmayın.

---

## Lisans

Bu proje, orijinal **OnlineEDocumentShow** projesinin MIT Lisansı şartlarına uygun olarak MIT Lisansı altında dağıtılmaktadır.

Ayrıntılar için [`LICENSE`](./LICENSE) dosyasını inceleyin.

MIT Lisansı; yazılımın kullanılmasına, kopyalanmasına, değiştirilmesine, birleştirilmesine, yayımlanmasına ve dağıtılmasına izin verir. Orijinal telif hakkı ve lisans bildiriminin yazılımın tüm kopyalarında veya önemli bölümlerinde korunması gerekir.

---

<div align="center">

### Bakım ve web uyarlaması

**Sabahattin Akal**

[![GitHub](https://img.shields.io/badge/GitHub-SabahattinAkal-181717?logo=github)](https://github.com/SabahattinAkal)

</div>
