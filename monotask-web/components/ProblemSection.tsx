"use client";

export default function ProblemSection() {
  return (
    <section
      className="w-full px-5 md:px-8 py-12 my-12"
      style={{ maxWidth: "1024px" }}
    >
      <h2
        className="text-center mb-12"
        style={{
          fontFamily: "Hanken Grotesk, sans-serif",
          fontSize: "32px",
          fontWeight: 600,
          lineHeight: "40px",
          letterSpacing: "-0.01em",
          color: "#2e3230",
        }}
      >
        You don&apos;t have a laziness problem. You have a starting problem.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: copy */}
        <div className="flex flex-col gap-3">
          <p
            className="font-body-md"
            style={{
              fontFamily: "Atkinson Hyperlegible Next, sans-serif",
              fontSize: "17px",
              fontWeight: 400,
              lineHeight: "26px",
              color: "#4a4e4a",
            }}
          >
            Traditional tools assume you just need to write things down.
          </p>
          <ul className="list-none space-y-4">
            <li className="flex items-start gap-4">
              <span
                className="material-symbols-outlined mt-0.5"
                style={{
                  color: "#b83230",
                  fontSize: "20px",
                  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                close
              </span>
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
                Additive lists create overwhelming walls of text.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span
                className="material-symbols-outlined mt-0.5"
                style={{
                  color: "#4a7c59",
                  fontSize: "20px",
                  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                check
              </span>
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
                Subtractive design removes everything but the next right step.
              </span>
            </li>
          </ul>
        </div>

        {/* Right: visual */}
        <div
          className="relative rounded-xl p-8 min-h-[300px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: "#f5f1ea",
            border: "1px solid #c4c8bc",
          }}
        >
          {/* Radial gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255, 218, 216, 0.2) 0%, transparent 70%)",
            }}
          />
          <div
            className="relative z-10 w-full max-w-xs bg-white p-6 rounded-lg border text-center"
            style={{
              borderColor: "#c4c8bc",
              boxShadow: "0 4px 20px rgba(46, 50, 48, 0.06)",
            }}
          >
            <span
              className="material-symbols-outlined mb-2 block"
              style={{
                color: "#4a7c59",
                fontSize: "32px",
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              target
            </span>
            <p
              className="font-label-md"
              style={{
                fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "#2e3230",
              }}
            >
              Just focus on this.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}