import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './Resisable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    // Debouncing
    if (timer) {
      clearTimeout(timer);
    }
    const listener = () => {
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        // Fix library bug
        if (width > window.innerWidth * 0.75) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
    // eslint-disable-next-line
  }, []);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 35],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
