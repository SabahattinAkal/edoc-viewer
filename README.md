# dievplc e-Belge Görüntüleyici

XML tabanlı e-Fatura, e-İrsaliye ve e-Arşiv belgelerini tarayıcı üzerinde XSLT ile dönüştürür; belgeyi önizlemenizi ve PDF olarak yazdırmanızı sağlar.

## Özellikler

- XML belgesi ve isteğe bağlı XSLT şablonu seçimi
- XML içindeki Base64 gömülü XSLT desteği
- Gömülü QR kodlarının önizlemede oluşturulması
- Açık/koyu tema
- Tamamen yerel işlem: belgeleriniz sunucuya gönderilmez
- Tarayıcının yazdırma akışıyla PDF kaydetme

## Başlatma

```bash
npm install
npm start
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Üretim derlemesi

```bash
npm run build
```

> React Scripts 3, güncel Node sürümlerinde derleme için `NODE_OPTIONS=--openssl-legacy-provider` ayarını gerektirebilir.

## Sahiplik ve lisans

Bu uygulamanın marka ve proje yönetimi dievplc.com kapsamındadır. Arayüz ve uygulama akışı Sabahattin Akal tarafından geliştirilmiştir.

Projede kullanılan açık kaynak bileşenlerin ve önceki sürümlere ait telif/lisans bildirimlerinin korunması gerekir; mevcut MIT lisansı için [LICENSE](LICENSE) dosyasına bakın.
