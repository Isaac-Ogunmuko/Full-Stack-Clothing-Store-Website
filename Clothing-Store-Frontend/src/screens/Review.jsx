import React from 'react';

export default function Review() {
  // Sample review data modeled after your store
  const allReviews = [
    {
      name: "EnnyJewels",
      date: "Jul 24, 2026",
      rating: 5,
      text: "Beautiful fabric and excellent service!",
      item: "African Swiss Lace Fabric, Cotton, Brown Orange Gold, 5 Yards",
      img: "/SwissLace(1).jfif",
      avatar: ""
    },
    {
      name: "Salamotu",
      date: "Jul 21, 2026",
      rating: 5,
      text: "I love the material very lovely",
      item: "Royal Blue Swiss Lace, African Cotton Fabric, 5 Yards",
      img: "/SwissLace(2).jfif",
      reply: {
        seller: "Esther",
        date: "Jul 21, 2026",
        text: "Thank you so much for your kind feedback"
      }
    },
    {
      name: "Mary",
      date: "Jun 24, 2026",
      rating: 5,
      text: "We got the purple material to have my wedding dress made out of & let me tell you this was absolutely STUNNING!!",
      item: "High-Quality Sequin Lace Fabric",
      img: "/SwissLace(3).jfif"
    }
  ];

  return (
    <div 
      style={{ 
        backgroundColor: '#ffffff', 
        minHeight: '100vh', 
        width: '100%', 
        color: '#222222', 
        paddingTop: '140px', 
        paddingLeft: '32px', 
        paddingRight: '32px',
        paddingBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} 
      className="review-container"
    >
      <div 
        style={{ 
          maxWidth: '900px', 
          width: '100%',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '24px' 
        }} 
        className="review-content"
      >
        {/* PAGE HEADER & STATS */}
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#121212', marginBottom: '8px' }}>
            Reviews
          </h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>4.7 ★</span>
            <span style={{ fontSize: '14px', color: '#666' }}>(60)</span>
          </div>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Average item review • We calculate this number using a recency-weighted average of all ratings.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '10px 0' }} />

        {/* REVIEWS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {allReviews.map((rev, index) => (
            <div key={index} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* User info & Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: '#555' }}>
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#121212' }}>{rev.name}</span>
                  <span style={{ fontSize: '13px', color: '#666', marginLeft: '6px' }}>on {rev.date}</span>
                </div>
              </div>

              {/* Stars */}
              <div style={{ color: '#d97706', fontSize: '14px' }}>
                {"★".repeat(rev.rating)}
              </div>

              {/* Review Text */}
              <p style={{ fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
                {rev.text}
              </p>

              {/* Optional Seller Response */}
              {rev.reply && (
                <div style={{ backgroundColor: '#f9f9f9', padding: '12px 16px', borderRadius: '6px', borderLeft: '3px solid #121212', marginTop: '6px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#121212' }}>
                    {rev.reply.seller} <span style={{ fontWeight: 'normal', color: '#666' }}>responded on {rev.reply.date}</span>
                  </p>
                  <p style={{ fontSize: '13px', color: '#444', marginTop: '4px' }}>
                    {rev.reply.text}
                  </p>
                </div>
              )}

              {/* Purchased Item Preview Card */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', backgroundColor: '#fafafa', padding: '10px', borderRadius: '8px', border: '1px solid #eee', width: 'fit-content' }}>
                <img src={rev.img} alt={rev.item} style={{ width: '50px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                <span style={{ fontSize: '13px', color: '#333', fontWeight: '500' }}>{rev.item}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}