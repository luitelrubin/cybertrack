import React from 'react';
import Highlights from './highlights';
import Crime from './crimes';

export default function Home() {
  return (
    <div>
      <Crime />
      <Highlights />
    </div>
  );
}
