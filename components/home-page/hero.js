import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/k8-logo.jpg'
          alt='An image showing Pradeep Verma'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Captain Js</h1>
      <p>
        I blog about development and programming.
      </p>
    </section>
  );
}

export default Hero;
