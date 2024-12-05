import React from 'react';
import { Helmet } from 'react-helmet';
import './footing.css';

export default function Home() {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="style.css" />
      </Helmet>
      <div className="container2">
        <div className="frame1">
          <img src="/images/logo.png" alt="logo" style={{ height: '100%' }} />
          <p id="Cyber">Cyber Track</p>
        </div>
        <div className="frame2">
          <div>
            <input type="text" placeholder="Search" />
            <button className="btn">Search</button>
          </div>
        </div>
      </div>

      <nav>
        <a href="home.html"><span>Home</span></a>
        <a href="about-us.html"><span>About Us</span></a>
        <a href="report-complaint.html"><span>Report Complaint</span></a>
        <a href="track-complaint.html"><span>Track Complaint</span></a>
        <a href="cyber-awareness.html"><span>Cyber Awareness</span></a>
        <a href="report-check-suspect.html"><span>Report & Check Suspect</span></a>
        <a href="alerts.html"><span>Alerts+</span></a>
      </nav>

      <div className="main1">
        <div className="frame1">
          <div className="photo">
            <div className="image-container">
              <img src="/images/photo.png" alt="slider" id="photo1" className="slideshow-image" />
            </div>
            <div className="controls">
              <button id="prev-btn" className="btn_change">&lt;</button>
              <button id="next-btn" className="btn_change">&gt;</button>
            </div>
            <div className="sus">
              <p className="sus-id">
                <span className="sus-id-1">Suspicious Activity Online?&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="sus-id-2">Call 98xxxxxxxx / Email xxx@gmail.com / Report Online</span>
                <a href="report.html"><span className="sus-btn">here</span></a>
              </p>
            </div>
          </div>
          <div className="names">
            <div className="name name1">
              <img src="/images/photo1.png" alt="photo1" id="photo2" />
              <p id="Name1">Name1</p>
            </div>
            <div className="name name2">
              <img src="/images/photo2.png" alt="photo2" id="photo3" />
              <p id="Name2">Name2</p>
            </div>
          </div>
        </div>
        <div className="container3">
          <h1>Highlights</h1>
          <div className="highlights">
            <div className="boxes box1">
              <div className="press">Press Release</div>
              <p className="heading-highlights">Heading of Cyber Crime Portal Something Important</p>
              <div className="line"></div>
              <p className="uploaded_date">17th October, 2024</p>
              <img src="/images/news1.png" alt="news1" className="h-photo" />
            </div>
            <div className="boxes box2">
              <div className="press">Press Release</div>
              <p className="heading-highlights">Heading of Cyber Crime Portal Something Important</p>
              <div className="line"></div>
              <p className="uploaded_date">17th October, 2024</p>
              <img src="/images/news2.png" alt="news2" className="h-photo" />
            </div>
            <div className="boxes box3">
              <div className="press">Press Release</div>
              <p className="heading-highlights">Heading of Cyber Crime Portal Something Important</p>
              <div className="line"></div>
              <p className="uploaded_date">17th October, 2024</p>
              <img src="/images/news3.png" alt="news3" className="h-photo" />
            </div>
          </div>
          <button className="btn view_highlights View">View All</button>
        </div>

        <div className="container4">
          <h1>Alerts & Updates</h1>
          <div className="alerts">
            <div className="box">
              <div className="press">Press release</div>
              <p className="heading-alerts">Heading of Cyber Crime Portal Something Important</p>
              <p className="uploaded-date">17th October, 2024</p>
              <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptatibus quas unde, quam eaque, minus.</p>
              <img src="/images/news4.png" alt="news1" className="news-image" />
            </div>
            <div className="box">
              <div className="press">Press release</div>
              <p className="heading-alerts">Heading of Cyber Crime Portal Something Important</p>
              <p className="uploaded-date">17th October, 2024</p>
              <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptates sequi iure similique amet tempore.</p>
              <img src="/images/news5.png" alt="news2" className="news-image" />
            </div>
            <div className="box">
              <div className="press">Press release</div>
              <p className="heading-alerts">Heading of Cyber Crime Portal Something Important</p>
              <p className="uploaded-date">17th October, 2024</p>
              <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sint voluptatibus officia, assumenda consequatur.</p>
              <img src="/images/news6.png" alt="news3" className="news-image" />
            </div>
          </div>
          <button className="btn View">View All</button>
        </div>

        <div className="container5">
          <h1>Social Media</h1>
          <div className="social-media">
            <div className="box">
              <p className="social-heading">Facebook</p>
              <img src="/images/facebook.png" alt="Facebook" className="social-img" />
            </div>
            <div className="box">
              <p className="social-heading">Twitter</p>
              <img src="/images/twitter.png" alt="Twitter" className="social-img" />
            </div>
            <div className="box">
              <p className="social-heading">YouTube</p>
              <img src="/images/youtube.png" alt="YouTube" className="social-img" />
            </div>
          </div>
          <button className="btn View">View All</button>
        </div>

        
      </div>
    </div>
  );
}