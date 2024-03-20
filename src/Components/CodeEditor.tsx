import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import styles from './Monaco.module.css'; // Import CSS module for styling

const MonacoEditorComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('html');
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [cssCode, setCssCode] = useState<string>('');
  const [jsCode, setJsCode] = useState<string>('');
  
  const [editorTheme, setEditorTheme] = useState<string>('vs-dark');

  useEffect(() => {
    const updateOutput = () => {
      const iframe = document.getElementById('outputFrame') as HTMLIFrameElement;
      if (iframe) {
        const html = `
          <html>
            <head>
              <style>${cssCode}</style>
            </head>
            <body>
              ${htmlCode}
              <script>${jsCode}</script>
            </body>
          </html>
        `;
        iframe.contentDocument?.write(html);
        iframe.contentDocument?.close();
      }
    };

    const timeoutId = setTimeout(updateOutput,0);
    return () => clearTimeout(timeoutId);
  }, [htmlCode, cssCode, jsCode]);

  const setActiveTabAndClearOutput = (tab: string) => {
    setActiveTab(tab);
  };
  const changeEditorTheme = (theme: string) => {
    setEditorTheme(theme);
  };


  return (
    <div className={styles.container}>
        <h1 className='text-2xl mb-3 text-center'>Simple Code Editor</h1>
      <div className={styles.tabButtons}>
        <button onClick={() => setActiveTabAndClearOutput('html')} className={activeTab === 'html' ? styles.active : ''}>HTML</button>
        <button onClick={() => setActiveTabAndClearOutput('css')} className={activeTab === 'css' ? styles.active : ''}>CSS</button>
        <button onClick={() => setActiveTabAndClearOutput('js')} className={activeTab === 'js' ? styles.active : ''}>JavaScript</button>
        <div className={styles.themeSelector}>
          <label>Select Editor Theme: </label>
          <select onChange={(e) => changeEditorTheme(e.target.value)}>
            <option value="vs">Light</option>
            <option value="vs-dark">Dark</option>
          </select>
        </div>
      </div>
      <div className={styles.editors}>
        {activeTab === 'html' && (
          <MonacoEditor
            width="100%"  height="100%"
            language="html"
            theme={editorTheme}
            value={htmlCode}
            onChange={setHtmlCode}
          />
        )}
        {activeTab === 'css' && (
          <MonacoEditor
            width="100%"
            height="100%"
            language="css"
            theme={editorTheme}
            value={cssCode}
            onChange={setCssCode}
          />
        )}
        {activeTab === 'js' && (
          <MonacoEditor
            width="100%"  height="100%"
            language="javascript"
            theme="vs-dark"
            value={jsCode}
            onChange={setJsCode}
          />
        )}
      </div>
 
      <div className={styles.output}>
        <h2>Output:</h2>
        <iframe id="outputFrame" title="Output" className={styles.outputFrame}></iframe>
      </div>
    </div>
  );
};

export default MonacoEditorComponent;
