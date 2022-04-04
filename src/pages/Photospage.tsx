import { FunctionComponent, useEffect } from 'react';

const Photospage: FunctionComponent = () => {
  useEffect(() => {
    console.log('Render photos page.');
  }, []);
  return <div>Photospage</div>;
};

export default Photospage;
