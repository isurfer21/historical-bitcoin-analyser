function Footer() {
  return (
    <footer>
      <span property="dct:title" className="app-title">
        Historical Bitcoin
      </span>{" "}
      &copy; 2024 by{" "}
      <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/isurfer21">
        Abhishek Kumar
      </a>{" "}
      is licensed under{" "}
      <a
        href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1"
        target="_blank"
        rel="license noopener noreferrer"
        className="license"
      >
        CC BY-NC-ND 4.0 <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="CC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="BY" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="NC" />
        <img src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt="ND" />
      </a>
    </footer>
  );
}

export default Footer;
