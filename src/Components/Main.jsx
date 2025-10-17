// src/Components/Main.jsx
import React, { Component } from 'react';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import ClearIcon from '@material-ui/icons/Clear';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';

const theme = createMuiTheme();
const useStyles = {
  lvl1: { display: 'flex' },
  lvl2: { flexGrow: '1', maxWidth: '100%', overflowX: 'hidden' },
  lvl3: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'transform 195ms',
    minHeight: '95vh',
  },
  mainroot: { margin: '15px' },
  InoviceRoot: { position: 'relative', margin: 'auto', width: '850px' },
  root: {
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: { marginLeft: theme.spacing(1), flex: 1 },
  iconButton: { padding: 10 },
  divider: { height: 28, margin: 4 },
  actions: { marginTop: '8px', textAlign: 'center' },
  actionButton: { marginRight: '5px' },
};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xmlFilePath: '',
      xsltFilePath: '',
      xmlFile: null,
      xsltFile: null,
      resultInvoice: null,
      error: '',
    };
  }

  buildFileSelector = () => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
  };

  componentDidMount = () => {
    this.fileSelectorXml = this.buildFileSelector();
    this.fileSelectorXml.onchange = (e) => this.onHandleXmlFileSelectorChange(e);
    this.fileSelectorXslt = this.buildFileSelector();
    this.fileSelectorXslt.onchange = (e) => this.onHandleXsltFileSelectorChange(e);
  };

  onHandleXmlFileSelectorChange = (e) => {
    try {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      this.setState({ xmlFilePath: file.name, error: '' });
      const reader = new FileReader();
      reader.onload = (ev) => this.setState({ xmlFile: ev.target.result });
      reader.readAsText(file);
    } catch (error) {
      this.setState({ xmlFilePath: '', xmlFile: null, error: String(error) });
    }
  };

  onHandleXsltFileSelectorChange = (e) => {
    try {
      if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        alert('Tarayıcınız HTML5 File API desteklemiyor.');
        return;
      }
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      this.setState({ xsltFilePath: file.name, error: '' });
      const reader = new FileReader();
      reader.onload = (ev) => this.setState({ xsltFile: ev.target.result });
      reader.readAsText(file);
    } catch (error) {
      this.setState({ xsltFilePath: '', xsltFile: null, error: String(error) });
    }
  };

  onXmlFileClear = () => {
    if (this.fileSelectorXml) this.fileSelectorXml.value = '';
    this.setState({ xmlFile: null, xmlFilePath: '', error: '' });
  };

  onXsltFileClear = () => {
    if (this.fileSelectorXslt) this.fileSelectorXslt.value = '';
    this.setState({ xsltFile: null, xsltFilePath: '', error: '' });
  };

  handleXmlFileSelect = (e) => {
    e.preventDefault();
    this.fileSelectorXml && this.fileSelectorXml.click();
  };

  handleXsltFileSelect = (e) => {
    e.preventDefault();
    this.fileSelectorXslt && this.fileSelectorXslt.click();
  };

  shortDate = () => {
    let date = new Date().toLocaleString();
    date = date.split(' ').join('-').split('.').join('-').split(':').join('-');
    return date;
  };

  // ---- WEB UYUMLU PDF: Yeni pencerede açıp tarayıcı Print → PDF ----
  onSaveClick = async () => {
    try {
      if (!this.state.resultInvoice) {
        alert('Önce "Faturayı Göster" ile önizleme oluştur.');
        return;
      }
      const win = window.open('', '_blank');
      if (!win) {
        alert('Popup engellendi. Lütfen bu site için açılır pencerelere izin ver.');
        return;
      }
      // Basit, self-contained HTML
      win.document.open();
      win.document.write(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Fatura - ${this.shortDate()}</title>
            <style>
              html,body{margin:0;padding:0}
              @page{size: A4; margin: 12mm}
            </style>
          </head>
          <body>${this.state.resultInvoice}</body>
        </html>
      `);
      win.document.close();
      // içerik yüklenince print
      win.onload = () => {
        try { win.focus(); win.print(); } catch(_) {}
      };
    } catch (err) {
      console.error(err);
      alert('PDF için yazdırma penceresi açılamadı.');
    }
  };

  // Base64 → UTF-8 dönüştürücü (tarayıcı)
  b64ToUtf8 = (b64) => {
    try {
      // atob -> binary string; sonra UTF-8’e çevir
      const binStr = atob(b64);
      const bytes = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
      const dec = new TextDecoder('utf-8');
      return dec.decode(bytes);
    } catch (e) {
      console.warn('Base64 decode başarısız:', e);
      return '';
    }
  };

  onShowClick = () => {
    try {
      if (!this.state.xmlFile) {
        alert('Lütfen XML dosyasını seç.');
        return;
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(this.state.xmlFile, 'text/xml');

      let xsltDoc = null;

      // Eğer XML içinde gömülü XSLT varsa ve kullanıcı ayrıca XSLT seçmemişse onu kullan
      const embedded = xmlDoc.getElementsByTagName('cbc:EmbeddedDocumentBinaryObject');
      if (embedded && embedded[0] && !this.state.xsltFile) {
        const b64 = embedded[0].textContent || '';
        const xsltText = this.b64ToUtf8(b64);
        xsltDoc = parser.parseFromString(xsltText, 'text/xml');
      } else if (this.state.xsltFile) {
        xsltDoc = parser.parseFromString(this.state.xsltFile, 'text/xml');
      } else {
        alert('XSLT seçmediniz ve XML içinde gömülü XSLT bulunamadı.');
        return;
      }

      const xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsltDoc);
      const resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);

      if (resultDocument) {
        const host = document.getElementById('example');
        host.innerHTML = '';
        host.appendChild(resultDocument);
        this.setState({ resultInvoice: host.innerHTML, error: '' });
      } else {
        this.setState({ error: 'Dönüşüm sonucu boş döndü.' });
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: String(err) });
      alert('Dönüşüm sırasında hata oluştu. Detay için konsolu kontrol edin.');
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.lvl1}>
        <div className={classes.lvl2}>
          <div className={classes.lvl3}>
            <Container maxWidthXl>
              <div className={classes.mainroot}>
                <Paper component="form" className={classes.root}>
                  <InputBase
                    className={classes.input}
                    placeholder="Xml Dosyasını Seç"
                    value={this.state.xmlFilePath || ''}
                    disabled
                  />
                  <IconButton
                    className={classes.iconButton}
                    aria-label="folder"
                    onClick={this.handleXmlFileSelect}
                  >
                    <FolderIcon />
                  </IconButton>
                  <IconButton
                    className={classes.iconButton}
                    aria-label="clear"
                    onClick={this.onXmlFileClear}
                  >
                    <ClearIcon />
                  </IconButton>
                </Paper>

                <Paper component="form" className={classes.root}>
                  <InputBase
                    className={classes.input}
                    placeholder="Xslt Dosyasını Seç (opsiyonel)"
                    value={this.state.xsltFilePath || ''}
                    disabled
                  />
                  <IconButton
                    className={classes.iconButton}
                    aria-label="folder"
                    onClick={this.handleXsltFileSelect}
                  >
                    <FolderIcon />
                  </IconButton>
                  <IconButton
                    className={classes.iconButton}
                    aria-label="clear"
                    onClick={this.onXsltFileClear}
                  >
                    <ClearIcon />
                  </IconButton>
                </Paper>

                <Divider orientation="horizontal" variant="fullWidth" />
                <div className={classes.actions}>
                  <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    onClick={this.onShowClick}
                  >
                    Faturayı Göster
                  </Button>
                  <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    onClick={this.onSaveClick}
                  >
                    PDF Kaydet
                  </Button>
                </div>

                <div>
                  <div className={classes.InoviceRoot} id="example"></div>
                </div>

                {this.state.error ? (
                  <div style={{ color: 'crimson', marginTop: 8, textAlign: 'center' }}>
                    {this.state.error}
                  </div>
                ) : null}
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(MainPage);
