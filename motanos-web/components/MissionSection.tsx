"use client";

export default function MissionSection() {
  return (
    <section
      className="w-full px-5 md:px-8 py-12 mt-12 mb-24 text-center"
      style={{ maxWidth: "1024px" }}
    >
      <div className="max-w-2xl mx-auto">
        <h2
          className="mb-4"
          style={{
            fontFamily: "Hanken Grotesk, sans-serif",
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: "32px",
            color: "#2e3230",
          }}
        >
          Built for the neurodivergent brain.
        </h2>
        <p
          className="font-body-md mb-4"
          style={{
            fontFamily: "Atkinson Hyperlegible Next, sans-serif",
            fontSize: "17px",
            fontWeight: 400,
            lineHeight: "26px",
            color: "#4a4e4a",
          }}
        >
          We know the shame of a dusty to-do list. MotAnos is built with deep
          empathy for ADHD and executive dysfunction. We don&apos;t judge, we
          don&apos;t nag.
        </p>
        <p
          className="font-label-sm"
          style={{
            fontFamily: "Atkinson Hyperlegible Next, sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: "#74796e",
          }}
        >
          Your data is yours. We train no models on your personal struggles.
        </p>
      </div>
    </section>
  );
}