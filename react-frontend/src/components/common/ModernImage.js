import React from 'react';
import { isPlainObject } from 'lodash';
import { Image } from 'react-bootstrap';

export const DynamicImageImport = require.context('../../assets/imgs', true);

// Returns a map of images to use depending on the browser.
// The provided <imagePath> should be relative to the imgs folder.
export const getModernImageSrc = imagePath => {
  return {
    // jp2: DynamicImageImport(`${imagePath}.jp2`),
    png: DynamicImageImport(`${imagePath}.png`)
  }
}

const ModernImage = ({ src, alt = '', ...props }) => {
  if (isPlainObject(src)) {
    // I.e. src is a map of images we might use depending on the browser.
    return <picture>
      {/* Safari */}
      {!!src.jp2 &&
        <source srcSet={src.jp2} type='image/jp2' />
      }
      {/* Most browsers */}
      {!!src.webp &&
        <source srcSet={src.webp} type='image/webp' />
      }
      {/* Ancient browsers */}
      <source srcSet={src.png} type='image/png' />
      <Image src={src.png} alt={alt} {...props} />
    </picture>
  } else {
    // I.e. src is actually just a single image.
    return <Image src={src} alt={alt} {...props} />
  }
}

export default ModernImage;
