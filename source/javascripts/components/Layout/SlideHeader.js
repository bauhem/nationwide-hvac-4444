import React from 'react';

const SlideHeader = ({title, description}) => {
  return (
    <div className="div-heading-slide">
      <h3 className="titre-big">{title}</h3>
      <p className="smaller-explanation">{description}</p>
    </div>
  )
}

export default SlideHeader;