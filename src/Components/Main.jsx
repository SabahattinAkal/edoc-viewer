import React, { Component } from 'react';

const FileIcon = () => <span className="file-icon" aria-hidden="true">⌁</span>;

class Main extends Component {
  state = { xmlFilePath: '', xsltFilePath: '', xmlFile: null, xsltFile: null, resultInvoice: '', error: '', isDragging: false };

  readFile = (file, type) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => this.setState({
      [type === 'xml' ? 'xmlFile' : 'xsltFile']: event.target.result,
      [type === 'xml' ? 'xmlFilePath' : 'xsltFilePath']: file.name,
      error: '',
    });
    reader.onerror = () => this.setState({ error: 'Dosya okunamadı. Lütfen tekrar deneyin.' });
    reader.readAsText(file);
  };

  onXmlChange = (event) => this.readFile(event.target.files && event.target.files[0], 'xml');
  onXsltChange = (event) => this.readFile(event.target.files && event.target.files[0], 'xslt');
  clearFile = (type) => this.setState({
    [type === 'xml' ? 'xmlFile' : 'xsltFile']: null,
    [type === 'xml' ? 'xmlFilePath' : 'xsltFilePath']: '',
    error: '',
  });

  b64ToUtf8 = (b64) => {
    const binary = atob(b64.replace(/\s/g, ''));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
  };

  showInvoice = () => {
    try {
      if (!this.state.xmlFile) {
        this.setState({ error: 'Önce görüntülemek istediğiniz XML belgesini seçin.' });
        return;
      }
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(this.state.xmlFile, 'text/xml');
      if (xmlDoc.querySelector('parsererror')) throw new Error('XML belgesi geçerli biçimde değil.');

      let xsltText = this.state.xsltFile;
      if (!xsltText) {
        const embedded = xmlDoc.getElementsByTagName('cbc:EmbeddedDocumentBinaryObject')[0];
        if (!embedded) throw new Error('Gömülü XSLT bulunamadı. Lütfen harici bir XSLT dosyası seçin.');
        xsltText = this.b64ToUtf8(embedded.textContent || '');
      }
      const xsltDoc = parser.parseFromString(xsltText, 'text/xml');
      if (xsltDoc.querySelector('parsererror')) throw new Error('XSLT belgesi geçerli biçimde değil.');
      const processor = new XSLTProcessor();
      processor.importStylesheet(xsltDoc);
      const fragment = processor.transformToFragment(xmlDoc, document);
      const host = document.createElement('div');
      host.appendChild(fragment);
      this.setState({ resultInvoice: host.innerHTML, error: '' });
    } catch (error) {
      this.setState({ error: error.message || 'Dönüştürme sırasında bir hata oluştu.' });
    }
  };

  savePdf = () => {
    if (!this.state.resultInvoice) {
      this.setState({ error: 'PDF oluşturmadan önce belge önizlemesini hazırlayın.' });
      return;
    }
    const win = window.open('', '_blank');
    if (!win) { this.setState({ error: 'Açılır pencere engellendi. Tarayıcı iznini kontrol edin.' }); return; }
    win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>e-Belge</title><style>@page{size:A4;margin:12mm}body{font-family:Arial,sans-serif}</style></head><body>${this.state.resultInvoice}</body></html>`);
    win.document.close();
    win.onload = () => { win.focus(); win.print(); };
  };

  render() {
    const { darkMode, onThemeToggle } = this.props;
    const { xmlFilePath, xsltFilePath, resultInvoice, error, isDragging } = this.state;
    return <main className="shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="eDoc Viewer ana sayfa"><span className="brand-mark">e</span><span>eDoc <b>Viewer</b></span></a>
        <div className="topbar-actions"><span className="privacy"><i /> Dosyalarınız cihazınızda kalır</span><button className="theme-toggle" onClick={onThemeToggle} aria-label="Temayı değiştir">{darkMode ? '☀' : '☾'}</button></div>
      </header>

      <section className="hero">
        <div className="eyebrow">E-BELGE GÖRÜNTÜLEME</div><h1>Belgelerinizi netlikle<br />görüntüleyin.</h1>
        <p>XML e-belgelerinizi XSLT şablonlarıyla anında dönüştürün, kontrol edin ve PDF olarak saklayın.</p>
      </section>

      <section className="workspace" aria-label="Belge yükleme alanı">
        <div className="section-heading"><div><span className="step">01</span><h2>Belgeyi yükleyin</h2></div><p>XML zorunludur · XSLT isteğe bağlıdır</p></div>
        <div className={isDragging ? 'dropzone is-dragging' : 'dropzone'} onDragOver={(e) => { e.preventDefault(); this.setState({ isDragging: true }); }} onDragLeave={() => this.setState({ isDragging: false })} onDrop={(e) => { e.preventDefault(); this.setState({ isDragging: false }); this.readFile(e.dataTransfer.files[0], 'xml'); }}>
          <input id="xml-input" type="file" accept=".xml,text/xml" onChange={this.onXmlChange} />
          <label htmlFor="xml-input" className="upload-main"><span className="upload-icon">↑</span><span><strong>{xmlFilePath || 'XML belgesini seçin'}</strong><small>{xmlFilePath ? 'Belge başarıyla hazırlandı' : 'veya dosyayı buraya sürükleyip bırakın'}</small></span><span className="browse">Dosya seç</span></label>
          {xmlFilePath && <button className="clear-file" onClick={() => this.clearFile('xml')} aria-label="XML dosyasını kaldır">×</button>}
        </div>
        <div className="secondary-upload"><div><FileIcon /><span><strong>XSLT şablonu</strong><small>Belgenizde gömülü şablon yoksa ekleyin</small></span></div><input id="xslt-input" type="file" accept=".xslt,.xsl,text/xml" onChange={this.onXsltChange} /><label htmlFor="xslt-input">{xsltFilePath || 'Şablon seç'}</label>{xsltFilePath && <button onClick={() => this.clearFile('xslt')} aria-label="XSLT dosyasını kaldır">×</button>}</div>
        <div className="actions"><button className="primary-action" onClick={this.showInvoice}><span>⌁</span> Belgeyi görüntüle</button><button className="secondary-action" disabled={!resultInvoice} onClick={this.savePdf}>PDF olarak kaydet <span>↗</span></button></div>
        {error && <div className="error-message" role="alert">{error}</div>}
      </section>

      <section className="preview-section">
        <div className="section-heading"><div><span className="step">02</span><h2>Belge önizlemesi</h2></div>{resultInvoice && <span className="ready"><i /> Hazır</span>}</div>
        <div className={resultInvoice ? 'preview-card has-document' : 'preview-card'}>{resultInvoice ? <div className="invoice-content" dangerouslySetInnerHTML={{ __html: resultInvoice }} /> : <div className="empty-preview"><div className="empty-icon">▤</div><h3>Önizlemeniz burada görünecek</h3><p>Belgenizi yükleyip “Belgeyi görüntüle” düğmesine tıklayın.</p></div>}</div>
      </section>
      <footer><span>eDoc Viewer</span><span>Yerel işlem · Güvenli görüntüleme</span></footer>
    </main>;
  }
}

export default Main;
