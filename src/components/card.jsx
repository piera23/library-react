import React, {useState} from 'react';

// Componente Card
const Card = ({ 
  title, 
  text, 
  imageUrl = null, 
  imageAlt = "",
  category = null,
  date = null,
  readMoreLink = null,
  readMoreText = "Leggi di più",
  variant = "default",
  shadow = true 
}) => {
  return (
    <div className={`card ${shadow ? 'shadow' : ''} card-${variant}`}>
      {imageUrl && (
        <div className="img-responsive-wrapper">
          <div className="img-responsive">
            <figure className="img-wrapper">
              <img src={imageUrl} alt={imageAlt} />
            </figure>
          </div>
        </div>
      )}
      <div className="card-body">
        {category && <div className="category-top">{category}</div>}
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        {date && <span className="card-signature">{date}</span>}
        {readMoreLink && (
          <a className="read-more" href={readMoreLink}>
            <span className="text">{readMoreText}</span>
            <svg className="icon">
              <use href="/bootstrap-italia/dist/svg/sprites.svg#it-arrow-right"></use>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};
export default Card;