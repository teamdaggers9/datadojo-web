import React from "react";

const About = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12 col-xl-12">
          <div className="card">
            <div className="card-body" id="goal">
              <h1>Data Dojo</h1>
              <h4>Transforming intelligence to business bcumen</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xl-12">
          <div className="card">
            <div className="card-body" id="aboutBody">
              <h3>Who Are We?</h3>
              <p>
                Data Dojo is a data analytics and visualisation platform,
                providing a comprehensive and insightful view of the driving
                factors of your business organisation.
              </p>
              <h3>Our Purpose</h3>
              <p>
                Our research reveals that purpose-driven businesses are better
                at attracting and retaining talent, sparking innovation,
                navigating disruption, and yes, making a profit. Every review,
                every assessment, each statistic, every collaboration, and every
                record we come up with makes the working world better than it
                was before.
              </p>
              <h3>Why Us?</h3>
              <ul>
                <li>
                  We are focused on serving your business interests by providing
                  high-quality intelligence that assists in taking well-informed
                  decisions.
                </li>
                <li>
                  Our expertise in data scales across companies and businesses,
                  to deliver the information and insights you need to dominate
                  interruption and be relevant with end users.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="social-icons">
        <a href="https://www.twitter.com/" target="_blank">
          <i class="fa-brands fa-twitter-square"></i>
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <i class="fa-brands fa-facebook-square"></i>
        </a>
        <a href="https://www.dribbble.com/" target="_blank">
          <i class="fa-brands fa-dribbble-square"></i>
        </a>
        <a href="https://www.github.com/official" target="_blank">
          <i class="fa-brands fa-github-square"></i>
        </a>
      </div>
    </React.Fragment>
  );
};

export default About;