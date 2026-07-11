<div align="center">

# eDoc Viewer

**XML tabanlı e-Belgeleri XSLT şablonlarıyla görüntülemek ve PDF olarak kaydetmek için geliştirilmiş React uygulaması.**

![React](https://img.shields.io/badge/React-16.13.1-61DAFB?logo=react\&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-4.x-0081CB?logo=mui\&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Web-4285F4?logo=googlechrome\&logoColor=white)
![Processing](https://img.shields.io/badge/İşleme-Tarayıcıda-success)

</div>

---

## Proje Hakkında

**eDoc Viewer**, XML formatındaki elektronik belgeleri XSLT şablonlarıyla işleyerek tarayıcı üzerinde okunabilir bir belge görünümüne dönüştürür.

Uygulama özellikle e-Fatura gibi UBL-TR tabanlı XML belgelerin görüntülenmesi amacıyla geliştirilmiştir. Kullanıcı bir XML dosyası seçebilir, gerektiğinde harici bir XSLT dosyası yükleyebilir ve oluşturulan belgeyi PDF olarak kaydedebilir.

XSLT dosyası ayrıca seçilmemişse uygulama, XML belgesi içerisindeki `cbc:EmbeddedDocumentBinaryObject` alanında Base64 olarak gömülü olan XSLT şablonunu kullanmayı dener.

> Seçilen XML ve XSLT dosyaları herhangi bir sunucuya gönderilmez. Tüm işlemler kullanıcının tarayıcısında gerçekleştirilir.

---

## Özellikler

* XML e-Belge dosyası seçme
* Harici XSLT şablonu seçme
* XML içerisindeki gömülü XSLT şablonunu otomatik algılama
* Base64 olarak gömülü XSLT içeriğini UTF-8 formatına dönüştürme
* XML ve XSLT dosyalarını tarayıcıda HTML çıktısına dönüştürme
* Oluşturulan belgeyi sayfa içerisinde önizleme
* Tarayıcının yazdırma ekranı üzerinden PDF olarak kaydetme
* Açık ve koyu tema desteği
* Sunucu ve veritabanı gerektirmeyen istemci taraflı çalışma

---

## Kullanım

1. **XML Dosyasını Seç** alanından görüntülemek istediğiniz XML belgesini seçin.
2. XML dosyasının içerisinde gömülü XSLT bulunmuyorsa **XSLT Dosyasını Seç** alanından uygun şablonu seçin.
3. **Faturayı Göster** butonuna tıklayın.
4. Dönüştürülen belge sayfanın alt bölümünde görüntülenecektir.
5. Belgeyi kaydetmek için **PDF Kaydet** butonuna tıklayın.
6. Açılan yazdırma ekranında hedef olarak **PDF olarak kaydet** seçeneğini kullanın.

PDF penceresi açılmıyorsa tarayıcınızın açılır pencere engelleyicisini kontrol edin.

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
   │   XML içindeki gömülü
   │   XSLT şablonu aranır
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

Dönüşüm işlemi tarayıcının yerleşik aşağıdaki API'leri kullanılarak gerçekleştirilir:

* `FileReader`
* `DOMParser`
* `XSLTProcessor`
* `TextDecoder`

---

## Kullanılan Teknolojiler

| Teknoloji        | Açıklama                                 |
| ---------------- | ---------------------------------------- |
| React 16.13.1    | Kullanıcı arayüzü ve uygulama akışı      |
| Create React App | Proje yapılandırması ve build süreci     |
| Material UI 4    | Arayüz bileşenleri ve tema desteği       |
| FileReader API   | Yerel XML ve XSLT dosyalarını okuma      |
| DOMParser        | XML metnini belge nesnesine dönüştürme   |
| XSLTProcessor    | XML belgesini XSLT ile HTML'e dönüştürme |
| GitHub Pages     | Statik uygulama yayını                   |

---

## Kurulum

Projeyi klonlayın:

```bash
git clone https://github.com/SabahattinAkal/edoc-viewer.git
cd edoc-viewer
```

Bağımlılıkları yükleyin:

```bash
yarn install
```

npm kullanıyorsanız:

```bash
npm install
```

---

## Kullanılabilir Komutlar

Proje dizininde aşağıdaki komutları çalıştırabilirsiniz.

### `yarn start`

Uygulamayı geliştirme modunda çalıştırır.

Tarayıcınızda aşağıdaki adresi açın:

```text
http://localhost:3000
```

Kaynak kod üzerinde değişiklik yaptığınızda sayfa otomatik olarak yenilenir. ESLint tarafından tespit edilen hatalar terminalde veya tarayıcı konsolunda görüntülenebilir.

npm kullanıyorsanız:

```bash
npm start
```

---

### `yarn test`

Test çalıştırıcısını etkileşimli izleme modunda başlatır.

```bash
yarn test
```

npm karşılığı:

```bash
npm test
```

> Projede henüz kapsamlı otomatik testler bulunmayabilir.

---

### `yarn build`

Uygulamanın production sürümünü oluşturur.

```bash
yarn build
```

npm karşılığı:

```bash
npm run build
```

Optimize edilmiş production dosyaları `build` klasörüne yazılır. JavaScript ve CSS dosyaları küçültülür ve dosya adlarına içerik hash değerleri eklenir.

---

### `yarn deploy`

Projeyi GitHub Pages üzerinde yayınlamak için kullanılır.

```bash
yarn deploy
```

Bu komut önce production build oluşturur, ardından `build` klasörünü `gh-pages` branch'ine gönderir.

Yayınlama öncesinde `package.json` dosyasına aşağıdaki alanın eklenmesi gerekir:

```json
{
  "homepage": "https://sabahattinakal.github.io/edoc-viewer"
}
```

---

### `yarn eject`

```bash
yarn eject
```

> **Dikkat:** Bu işlem geri alınamaz.

`eject` komutu Create React App tarafından yönetilen Webpack, Babel ve ESLint yapılandırmalarını proje içerisine çıkarır. Bu işlemden sonra yapılandırmanın yönetimi tamamen geliştiriciye geçer.

Çoğu geliştirme senaryosunda `eject` komutunun kullanılmasına gerek yoktur.

---

## Proje Yapısı

```text
edoc-viewer/
├── public/
│   └── index.html
├── src/
│   ├── Components/
│   │   └── Main.jsx
│   ├── App.css
│   ├── App.js
│   └── index.js
├── package.json
├── yarn.lock
└── README.md
```

### Önemli Dosyalar

* `src/App.js`
  Açık ve koyu tema yönetimini gerçekleştirir ve ana uygulama bileşenini yükler.

* `src/Components/Main.jsx`
  XML/XSLT dosya seçimi, gömülü XSLT çözümleme, belge dönüşümü, önizleme ve PDF işlemlerini içerir.

* `package.json`
  Proje bağımlılıklarını ve `start`, `test`, `build`, `deploy` gibi komutları içerir.

---

## Gizlilik

Uygulama tamamen istemci tarafında çalışır.

* XML dosyaları bir API'ye gönderilmez.
* XSLT dosyaları bir sunucuya yüklenmez.
* Belge dönüşümü tarayıcı içerisinde yapılır.
* Uygulama belge içeriğini veritabanına kaydetmez.

Hassas belgeleri görüntülerken uygulamayı güvenilir bir ortamda çalıştırmanız önerilir.

---

## Bilinen Sınırlamalar

* XSLT desteği tarayıcıya göre farklılık gösterebilir.
* XML içerisindeki gömülü şablon standart dışı bir alanda bulunuyorsa otomatik olarak tespit edilemeyebilir.
* Bazı XSLT şablonları harici görsel, font veya dosyalara ihtiyaç duyabilir.
* PDF çıktısı tarayıcının yazdırma motoruna bağlıdır.
* Çok büyük XML belgeleri tarayıcı performansını etkileyebilir.
* Uygulama şu anda XML şema doğrulaması yapmamaktadır.

---

## Geliştirme Önerileri

* Sürükle-bırak dosya yükleme
* Birden fazla XML dosyasını toplu görüntüleme
* e-Fatura, e-Arşiv ve e-İrsaliye türlerini otomatik algılama
* Daha detaylı XML ve XSLT hata mesajları
* Mobil uyumlu fatura önizleme
* PDF dosya adında fatura numarası kullanma
* React ve Material UI sürümlerini güncelleme
* Otomatik testler ekleme

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

5. Pull Request oluşturun.

Hata bildirirken kullandığınız örnek XML dosyasındaki kişisel, ticari ve mali bilgileri temizlemeyi unutmayın.

---

## Lisans

Bu proje için henüz açık kaynak lisansı belirtilmemiştir.

Projeyi kullanmak, değiştirmek veya dağıtmak için depo sahibinden izin alınması gerekebilir.

---

## Geliştirici

<div align="center">

**Sabahattin Akal**

[![GitHub](https://img.shields.io/badge/GitHub-SabahattinAkal-181717?logo=github)](https://github.com/SabahattinAkal)

Bu projeyi faydalı bulduysanız yıldız bırakabilirsiniz. ⭐

</div>
