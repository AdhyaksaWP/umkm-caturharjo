import React from 'react';
import Image from 'next/image';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen">
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
        quality={80}
      />
    </div>
  );
};

export default Background;
