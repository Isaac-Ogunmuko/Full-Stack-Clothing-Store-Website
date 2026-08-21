import React from 'react';


export default function Review() {
  return (
    <div 
      style={{ 
        background: '#139b2a', 
        minHeight: '100vh', 
        width: '100%', 
        color: '#ffffff', 
        paddingTop: '160px', 
        paddingLeft: '32px', 
        paddingRight: '32px' 
      }} 
      className="review-container"
    >
      <div 
        style={{ 
          maxWidth: '56rem', 
          marginLeft: 'auto', 
          marginRight: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px' 
        }} 
        className="review-content"
      >
        <h1 
          style={{ fontSize: '2.25rem', fontFamily: 'serif', color: '#fde68a' }} 
          className="review-title"
        >
          Customer Reviews
        </h1>
        <p 
          style={{ color: '#e5e7eb', lineHeight: '1.625' }} 
          className="review-description"
        >
          See what our clients are saying about our African clothing and fabrics.
        </p>
      </div>
    </div>
  );
}
