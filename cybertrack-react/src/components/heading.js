import React from 'react';
import { Link } from 'react-router-dom';

export default function Heading() {
  return (
    <nav>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/complaint">
          <button>Complaint</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/notice">
          <button>Notice</button>
        </Link>
        <Link to ="/signup">
        <button>Signup</button>
        </Link>
      </div>
    </nav>
  );
}