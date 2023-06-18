import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [typedText, setTypedText] = useState<string>('');

  useEffect(() => {
    const aText = [
      "- Interactive Exercises: Dive into our structured courses that cover Git concepts, branching strategies, collaboration workflows, and more. Learn at your own pace and track your progress as you complete each module.",
      "- Hands-on Exercises: Put your knowledge into practice with our carefully crafted exercises. Use the integrated Git command editor to solve real-world scenarios and reinforce your understanding of Git commands and their applications.",
      "- Custom Workflows: Want to create your own workflows? Our app allows you to customize and tailor Git workflows to match your specific development needs. Define your steps, add exercises.",
      "- Score Tracking: Keep track of your achievements and monitor your progress with our built-in scoring system. Each completed exercise contributes to your overall score.",
      " ",
      "Start your Git journey now and unlock the full potential of version control.",
      "Happy learning and happy coding!"
    ];

    const iSpeed = 2; // time delay of print out
    let iIndex = 0; // start printing array at this position
    let iArrLength = aText[0].length; // the length of the text array
    const iScrollAt = 20; // start scrolling up at this many lines
    let iTextPos = 0; // initialize text position
    let sContents = ''; // initialize contents variable
    let iRow: number; // initialize current row

    const typewriter = () => {
      sContents = '';
      iRow = Math.max(0, iIndex - iScrollAt);

      while (iRow < iIndex) {
        sContents += aText[iRow++] + '\n';
      }
      setTypedText(sContents + aText[iIndex].substring(0, iTextPos) + "_");

      if (iTextPos++ === iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex !== aText.length) {
          iArrLength = aText[iIndex].length;
          setTimeout(typewriter, 500);
        }
      } else {
        setTimeout(typewriter, iSpeed);
      }
    };

    typewriter();
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Roboto, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <main style={{ maxWidth: '600px', padding: '20px' }}>
        <header>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#3F497F', marginBottom: '20px' }}>
            Welcome to the Git Workflow Teacher
          </h1>
        </header>
        <p>We're thrilled to have you join our community.</p>
        <p>Our app is designed to help you learn and master Git workflows.</p>
        <p>
          With our app, you can embark on a journey to understand the fundamentals of Git workflows, practice various
          Git commands, and gain hands-on experience in managing code repositories effectively.
        </p>
        <p id="typedtext" style={{ fontWeight: 'normal', color: '#333333', marginTop: '20px', whiteSpace: 'pre-line' }}>
          {typedText}
        </p>
      </main>
    </div>
  );
};

export default Home;
