import mlbblogo from "../imgs/MLBB logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="main-logo-container">
        <img
          src={mlbblogo}
          alt="Mobile Legends: Bang Bang logo"
          className="main-logo"
        />
      </div>
      <p className="title">MLBB Hero & Role Randomizer</p>
    </header>
  );
}
