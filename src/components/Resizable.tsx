import { ResizableBox } from 'react-resizable';
import './Resisable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

// TODO => fix resizing Preview ( watch video 142 )

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={300} width={Infinity} resizeHandles={['s']}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
