"use client";

import { useState, useRef } from "react";

type DemoState =
  | "initial"
  | "loading"
  | "step1"
  | "step2"
  | "reward";

export default function Hero() {
  const [demoState, setDemoState] = useState<DemoState>("initial");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const jarFillRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inputRef.current?.blur();
    setDemoState("loading");
    setTimeout(() => setDemoState("step1"), 800);
  };

  const handleStep1 = () => setDemoState("step2");
  const handleStep2 = () => {
    setDemoState("reward");
    // Re-trigger fill animation
    if (jarFillRef.current) {
      jarFillRef.current.style.animation = "none";
      jarFillRef.current.getBoundingClientRect();
      jarFillRef.current.style.animation = "";
    }
  };

  const handleReset = () => {
    setDemoState("initial");
    setInputValue("");
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="w-full flex flex-col justify-center items-center px-5 md:px-8 relative mt-12 mb-12 z-40"
        style={{ minHeight: "80vh", maxWidth: "1024px" }}
      >
        <div className="text-center max-w-[720px] relative w-full flex flex-col items-center">
          {/* Headline */}
          <h1
            className="mb-3 relative z-40"
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: "56px",
              letterSpacing: "-0.01em",
              color: "#2e3230",
            }}
          >
            Productivity is too loud. MotAnos is the silence.
          </h1>

          {/* Subheadline */}
          <p
            className="mb-12 relative z-40"
            style={{
              fontFamily: "Atkinson Hyperlegible Next, sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "32px",
              color: "#4a4e4a",
            }}
          >
            The AI task assistant for brains that struggle with starting. We
            only show the next step.
          </p>

          {/* Interactive Demo Container */}
          <div
            className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[200px] transition-transform duration-300"
            id="demo-container"
          >
            {/* Initial State: Form & Pearls */}
            <div
              className="w-full relative transition-opacity duration-500"
              style={{
                opacity: demoState === "initial" ? 1 : 0,
                pointerEvents: demoState === "initial" ? "auto" : "none",
              }}
            >
              <div
                className="relative w-full z-50"
                id="demo-form-container"
              >
                {/* Pearls glow behind */}
                <div
                  className="absolute inset-0 rounded-full blur-xl -z-10"
                  style={{
                    backgroundColor: "rgba(142, 207, 158, 0.2)",
                  }}
                />
                <form
                  onSubmit={handleSubmit}
                  id="demo-form"
                  className="relative w-full flex items-center rounded-full p-1.5 border transition-all duration-300"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#c4c8bc",
                    boxShadow: "0 4px 20px rgba(46, 50, 48, 0.06)",
                  }}
                >
                  <input
                    ref={inputRef}
                    aria-label="Task input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What's the one thing you're avoiding?"
                    className="flex-grow bg-transparent border-none focus:ring-0 text-base px-6 py-4 outline-none"
                    style={{
                      fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                      fontSize: "17px",
                      fontWeight: 400,
                      lineHeight: "26px",
                      color: "#2e3230",
                    }}
                  />
                  <button
                    type="submit"
                    className="font-label-md px-8 py-4 rounded-full transition-colors duration-200 whitespace-nowrap"
                    style={{
                      fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      backgroundColor: "#4a7c59",
                      color: "#ffffff",
                      boxShadow: "0 4px 20px rgba(46, 50, 48, 0.06)",
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
                    Break it down
                  </button>
                </form>
                <p
                  className="text-center mt-4 font-label-sm"
                  style={{
                    fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    color: "#74796e",
                  }}
                >
                  No signup to try the demo.
                </p>
              </div>

              {/* Pearls decorative */}
              <div
                className="absolute inset-0 pointer-events-none -z-10"
                id="pearls-container"
              >
                {/* Pearl 1 */}
                <div
                  className="absolute -top-12 -left-8 w-16 h-16 rounded-full flex items-center justify-center animate-float-1"
                  style={{
                    backgroundColor: "rgba(74, 124, 89, 0.2)",
                    boxShadow: "0 0 30px rgba(74,124,89,0.4)",
                    border: "1px solid rgba(74,124,89,0.1)",
                    animationDelay: "0s",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      color: "rgba(74, 124, 89, 0.6)",
                      fontSize: "20px",
                      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    edit_document
                  </span>
                </div>

                {/* Pearl 2 */}
                <div
                  className="absolute -bottom-12 right-4 w-12 h-12 rounded-full flex items-center justify-center animate-float-2"
                  style={{
                    backgroundColor: "rgba(107, 99, 88, 0.2)",
                    boxShadow: "0 0 20px rgba(107,99,88,0.3)",
                    border: "1px solid rgba(107,99,88,0.1)",
                    animationDelay: "1s",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      color: "rgba(107, 99, 88, 0.6)",
                      fontSize: "18px",
                      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    email
                  </span>
                </div>

                {/* Pearl 3 */}
                <div
                  className="absolute top-1/2 -right-12 w-14 h-14 rounded-full flex items-center justify-center animate-float-3"
                  style={{
                    backgroundColor: "rgba(112, 92, 48, 0.2)",
                    boxShadow: "0 0 25px rgba(112,92,48,0.3)",
                    border: "1px solid rgba(112,92,48,0.1)",
                    animationDelay: "2s",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      color: "rgba(112, 92, 48, 0.6)",
                      fontSize: "18px",
                      fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    call
                  </span>
                </div>

                {/* Pearl 4 */}
                <div
                  className="absolute -bottom-8 left-16 w-10 h-10 rounded-full animate-float-1"
                  style={{
                    backgroundColor: "rgba(120, 168, 134, 0.3)",
                    boxShadow: "0 0 15px rgba(120,168,134,0.3)",
                    border: "1px solid rgba(120,168,134,0.1)",
                    animationDelay: "1.5s",
                  }}
                />
              </div>
            </div>

            {/* Loading State */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-50"
              style={{
                opacity: demoState === "loading" ? 1 : 0,
                pointerEvents: demoState === "loading" ? "auto" : "none",
              }}
            >
              <div
                className="flex items-center gap-2 animate-shimmer"
                style={{
                  fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                  fontSize: "20px",
                  fontWeight: 400,
                  color: "#4a7c59",
                }}
              >
                <span
                  className="material-symbols-outlined animate-spin text-xl"
                  style={{
                    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  progress_activity
                </span>
                Finding the first tiny step...
              </div>
            </div>

            {/* Step 1 State */}
            <div
              className="absolute w-full max-w-md mx-auto transition-all duration-500 z-50"
              style={{
                opacity: demoState === "step1" ? 1 : 0,
                pointerEvents: demoState === "step1" ? "auto" : "none",
                transform:
                  demoState === "step1" ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <div
                className="rounded-2xl p-6 border flex flex-col gap-6"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#c4c8bc",
                  boxShadow: "0 4px 20px rgba(46, 50, 48, 0.06)",
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className="text-label-sm uppercase tracking-widest mb-1 block"
                      style={{
                        fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        color: "#6b6358",
                      }}
                    >
                      Step 1
                    </span>
                    <h3
                      className="font-headline-md"
                      style={{
                        fontFamily: "Hanken Grotesk, sans-serif",
                        fontSize: "24px",
                        fontWeight: 600,
                        lineHeight: "32px",
                        color: "#2e3230",
                      }}
                    >
                      Open the document
                    </h3>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full flex items-center gap-1 text-label-sm"
                    style={{
                      fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      backgroundColor: "#f0ece4",
                      color: "#4a4e4a",
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                      }}
                    >
                      schedule
                    </span>{" "}
                    2 min
                  </span>
                </div>
                <button
                  onClick={handleStep1}
                  className="w-full py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  style={{
                    fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    backgroundColor: "#4a7c59",
                    color: "#ffffff",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    check_circle
                  </span>{" "}
                  Done
                </button>
              </div>
            </div>

            {/* Step 2 State */}
            <div
              className="absolute w-full max-w-md mx-auto transition-all duration-500 z-50"
              style={{
                opacity: demoState === "step2" ? 1 : 0,
                pointerEvents: demoState === "step2" ? "auto" : "none",
                transform:
                  demoState === "step2" ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <div
                className="rounded-2xl p-6 border flex flex-col gap-6"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#c4c8bc",
                  boxShadow: "0 4px 20px rgba(46, 50, 48, 0.06)",
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className="text-label-sm uppercase tracking-widest mb-1 block"
                      style={{
                        fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        color: "#6b6358",
                      }}
                    >
                      Step 2
                    </span>
                    <h3
                      className="font-headline-md"
                      style={{
                        fontFamily: "Hanken Grotesk, sans-serif",
                        fontSize: "24px",
                        fontWeight: 600,
                        lineHeight: "32px",
                        color: "#2e3230",
                      }}
                    >
                      Write just one sentence
                    </h3>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full flex items-center gap-1 text-label-sm"
                    style={{
                      fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      backgroundColor: "#f0ece4",
                      color: "#4a4e4a",
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{
                        fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                      }}
                    >
                      schedule
                    </span>{" "}
                    5 min
                  </span>
                </div>
                <button
                  onClick={handleStep2}
                  className="w-full py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  style={{
                    fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    backgroundColor: "#4a7c59",
                    color: "#ffffff",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    check_circle
                  </span>{" "}
                  Done
                </button>
              </div>
            </div>

            {/* Reward State */}
            <div
              className="absolute w-full max-w-md mx-auto transition-all duration-500 z-50 text-center flex flex-col items-center"
              style={{
                opacity: demoState === "reward" ? 1 : 0,
                pointerEvents: demoState === "reward" ? "auto" : "none",
                transform:
                  demoState === "reward" ? "translateY(0)" : "translateY(16px)",
              }}
            >
              {/* Zen Jar */}
              <div
                className="w-24 h-32 border-4 rounded-b-3xl rounded-t-lg relative overflow-hidden mb-6 flex items-end justify-center"
                style={{
                  borderColor: "#c4c8bc",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  className="absolute top-0 w-full h-4 border-b-4"
                  style={{ borderColor: "#c4c8bc" }}
                />
                {/* Sand/Zen filling */}
                <div
                  ref={jarFillRef}
                  className="w-full rounded-b-2xl origin-bottom"
                  style={{
                    height: "0%",
                    backgroundColor: "rgba(142, 207, 158, 0.8)",
                    animation: "fill-jar 1.5s ease-out forwards",
                    animationDelay: "0.5s",
                  }}
                />
                <span
                  className="material-symbols-outlined absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-3xl"
                  style={{
                    color: "#4a7c59",
                    opacity: 0.5,
                    zIndex: 10,
                    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  eco
                </span>
              </div>
              <h3
                className="mb-2"
                style={{
                  fontFamily: "Hanken Grotesk, sans-serif",
                  fontSize: "32px",
                  fontWeight: 600,
                  lineHeight: "40px",
                  letterSpacing: "-0.01em",
                  color: "#4a7c59",
                }}
              >
                You moved the needle.
              </h3>
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
                Momentum is built one tiny step at a time.
              </p>
              <button
                onClick={handleReset}
                className="mt-8 font-label-md underline underline-offset-4 transition-colors"
                style={{
                  fontFamily: "Atkinson Hyperlegible Next, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "#6b6358",
                }}
              >
                Reset Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}