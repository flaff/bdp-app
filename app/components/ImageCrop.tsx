import * as React from 'react';
const styles = require('./ImageCrop.css');

interface ImageCropProps {
  children: JSX.Element;
  width: number;
  height: number;
  unit?: string;
}

const
  createCropperStyle = (width: number, height: number, unit: string = '%') => ({
  }),
  createCroppedStyle = (width: number, height: number, unit: string = '%') => ({
    marginTop: `-${height}${unit}`,
    marginRight: `-${width * 2}${unit}`,
    marginBottom: `-${height}${unit}`,
    marginLeft: `-${width}${unit}`
  });

export default (props: ImageCropProps) => (
  <div style={createCropperStyle(props.width, props.height, props.unit)} className={styles.imageCropper}>
    <div style={createCroppedStyle(props.width, props.height, props.unit)}>
      {props.children}
    </div>
  </div>
);
