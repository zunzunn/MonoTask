"use client";

export default function PricingSection() {
  return (
    <section
      className="w-full px-5 md:px-8 py-12 my-12 text-center"
      style={{ maxWidth: "1024px" }}
    >
      <div
        className="rounded-xl p-12 border"
        style={{
          backgroundColor: "rgba(142, 207, 158, 0.1)",
          borderColor: "#c8e8d0",
        }}
      >
        <h2
          className="mb-4"
          style={{
            fontFamily: "Hanken Grotesk, sans-serif",
            fontSize: "32px",
            fontWeight: 600,
            lineHeight: "40px",
            letterSpacing: "-0.01em",
            color: "#2e3230",
          }}
        >
          One coffee a month for a year of clarity.
        </h2>

        <div
          className="mb-8"
          style={{
            fontFamily: "Hanken Grotesk, sans-serif",
            fontSize: "48px",
            fontWeight: 700,
            lineHeight: "56px",
            letterSpacing: "-0.01em",
            color: "#4a7c59",
          }}
        >
          $4.99{" "}
          <span
            className="font-body-md"
            style={{
              fontFamily: "Atkinson Hyperlegible Next, sans-serif",
              fontSize: "17px",
              fontWeight: 400,
              lineHeight: "26px",
              color: "#4a4e4a",
            }}
          >
            / month
          </span>
        </div>

        <button
          className="px-8 py-4 rounded-full transition-colors duration-200"
          style={{
            fontFamily: "Atkinson Hyperlegible Next, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.02em",
            backgroundColor: "#4a7c59",
            color: "#ffffff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4a7c59";
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#4a7c59";
            e.currentTarget.style.opacity = "1";
          }}
        >
          Start the 7-day no-overwhelm challenge
        </button>
      </div>
    </section>
  );
}