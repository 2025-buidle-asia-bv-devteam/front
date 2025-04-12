import React, { useEffect, useState } from 'react';
import '../../styles/HeroWorkSection.css';

const HeroWorkSection = () => {
  const [step, setStep] = useState(-1);

  const directions = [
    { '--x': '0.1', '--y': '0.5' },
    { '--x': '0.3', '--y': '0.7' },
    { '--x': '0.6', '--y': '0.4' },
    { '--x': '0.5', '--y': '0.5' },
    { '--x': '0.3', '--y': '0.4' },
    { '--x': '0.4', '--y': '0.3' },
    { '--x': '0.5', '--y': '0.6' },
    { '--x': '0.2', '--y': '0.2' },
    { '--x': '0.7', '--y': '0.3' },
    { '--x': '0.6', '--y': '0.6' },
  ];

  const messages = [
    "Open up your story",
    "Create your scent with AI",
    "Spread your scent OnChain"
  ];

  const gradients = [
    'linear-gradient(135deg, #ffffff, #f8f8f8, #cac4b8)',
    'linear-gradient(135deg, #f8f8f8, #cac4b8, #ffffff)',
    'linear-gradient(135deg, #cac4b8, #ffffff, #f8f8f8)',
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // if (scrollY < vh || scrollY >= vh * 4) {
      //   setStep(-1);
      // } else {
      //   const newStep = Math.floor((scrollY - vh) / vh);
      //   setStep(newStep);
      // }
      if (scrollY < vh) {
        setStep(-1);
      } else if (scrollY >= vh && scrollY < vh * 4) {
        const newStep = Math.floor((scrollY - vh) / vh);
        setStep(newStep);
      } else {
        setStep(2);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const background = step >= 0 ? gradients[step] : gradients[0];

  return (
    <div className="hero-work-section-wrapper" style={{ height: '400vh' }}>
      <section
        className='hero-work-section scroll-effect'
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          background,
        }}
      >
        <div className="hero-content-inner">
          <h2>How <span>THYMIAN</span> Works</h2>

          {step >= 0 && (
            <h3 key={step} className="hero-step-text">
              {messages[step]}
            </h3>
          )}

          {/* <div className={`floating-words ${step === 1 ? 'gather' : step === 2 ? 'explode' : ''}`}>
            {[
              "Connection", "Story", "Bloom", "Emotion", "Perfume",
              "Network", "Memory", "Scent", "Human", "Artist"
            ].map((word, idx) => (
              <span
                key={word}
                style={{ '--x': directions[idx]['--x'], '--y': directions[idx]['--y'] } as React.CSSProperties}
              >
                {word}
              </span>
            ))}
          </div> */}
          {step === 2 ? (
            <div className="floating-words explode">
              {[
                "Connection", "Story", "Bloom", "Emotion", "Perfume",
                "Network", "Memory", "Scent", "Human", "Artist"
              ].map((word, wordIdx) => (
                <div className="word-wrapper" key={word + wordIdx}>
                  {Array.from(word).map((letter, letterIdx) => {
                    const randomX = (Math.random() * 2 - 1).toFixed(2);
                    const randomY = (Math.random() * 2 - 1).toFixed(2);
                    return (
                      <span
                        className="letter"
                        key={`${wordIdx}-${letterIdx}`}
                        style={
                          {
                            '--x': randomX,
                            '--y': randomY,
                          } as React.CSSProperties
                        }
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className={`floating-words ${step === 1 ? 'gather' : ''}`}>
              {[
                "Connection", "Story", "Bloom", "Emotion", "Perfume",
                "Network", "Memory", "Scent", "Human", "Artist"
              ].map((word, idx) => (
                <span
                  key={word}
                  style={
                    {
                      '--x': directions[idx]['--x'],
                      '--y': directions[idx]['--y'],
                    } as React.CSSProperties
                  }
                >
                  {word}
                </span>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default HeroWorkSection;
