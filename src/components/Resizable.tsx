import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './Resisable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    let timer: any;
    // Debouncing
    if (timer) {
      clearTimeout(timer);
    }
    const listener = () => {
      timer = setTimeout(() => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints: [width * 0.75, Infinity],
      minConstraints: [width * 0.2, Infinity],
      height: Infinity,
      width: width * 0.75,
      resizeHandles: ['e'],
    };
  } else {
    resizableProps = {
      maxConstraints: [Infinity, height * 0.9],
      minConstraints: [Infinity, 35],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
