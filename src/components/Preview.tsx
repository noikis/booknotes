import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
}

const html = `
    <html>
      <head>
      <style> 
      html, body {
        width: 500px;
        height: 500px;
        background: white;
      }
      </style
      </head>
      <body>    
        <div id="root"></div>
        <script>
 
          window.addEventListener('message', (event) => {
            try {
        
               eval(event.data);
         
            } catch (err) {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    //iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
    console.log('Preview render');
  }, [code]);

  return (
    <iframe
      width='500'
      height='500'
      title='preview'
      ref={iframe}
      sandbox='allow-scripts'
      srcDoc={html}
    />
  );
};

export default Preview;
