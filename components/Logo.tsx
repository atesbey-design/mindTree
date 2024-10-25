export default function Logo() {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <svg width="90" height="90" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Central node */}
          <circle cx="150" cy="150" r="45" fill="#4169E1" stroke="#000000" strokeWidth="8" />
          
          {/* Connecting lines */}
          <line x1="150" y1="105" x2="150" y2="30" stroke="#000000" strokeWidth="8" />
          <line x1="105" y1="150" x2="30" y2="150" stroke="#000000" strokeWidth="8" />
          <line x1="195" y1="150" x2="270" y2="150" stroke="#000000" strokeWidth="8" />
          <line x1="172" y1="172" x2="225" y2="225" stroke="#000000" strokeWidth="8" />
          <line x1="128" y1="172" x2="75" y2="225" stroke="#000000" strokeWidth="8" />
          
          {/* Outer nodes */}
          <circle cx="150" cy="30" r="25" fill="#FFD93D" stroke="#000000" strokeWidth="4" />
          <circle cx="30" cy="150" r="25" fill="#4ECDC4" stroke="#000000" strokeWidth="4" />
          <circle cx="270" cy="150" r="25" fill="#4ECDC4" stroke="#000000" strokeWidth="4" />
          <circle cx="225" cy="225" r="25" fill="#32CD32" stroke="#000000" strokeWidth="4" />
          <circle cx="75" cy="225" r="25" fill="#32CD32" stroke="#000000" strokeWidth="4" />
        </svg>
      </div>
    )
  }