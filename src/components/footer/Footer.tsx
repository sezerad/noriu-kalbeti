import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <div
        style={{
          background: "gray",
          height: "3px",
        }}
      />

      <div className="footer">
        <p className="footer-label">About Us</p>
        <ul className="footer-ul">
          <li className="footer-li">Contact</li>
          <li className="footer-li">FAQs</li>
          <li className="footer-li">Why English with Milda?</li>
        </ul>
      </div>
    </div>
  );
}

//© 2023 English with Milda
