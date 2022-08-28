const Footer = () => {
  return (
    <footer id="footer" className="footer-container text-center">
      <div className="row">
        <div className="col-lg-12">
          <p className="copyright-author text-secondary mb-0">
            Copyright &copy; <span id="year"> {new Date().getFullYear()} </span>
            <span>
              Designed & Developed by
              <span className="text-primary">
                <a
                  href="https://sujay9550.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Sujay
                </a>
              </span>
            </span>
          </p>
          <p className="credits text-secondary mb-0">
            Icons & Images Credits -
            <a
              href="https://www.flaticon.com/icons"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Flaticon
            </a>
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Pexels
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
