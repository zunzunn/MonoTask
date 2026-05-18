"use client";

const features = [
  {
    icon: "account_tree",
    iconBg: "#c8e8d0",
    iconColor: "#2a6038",
    title: "Decomposition Engine",
    description:
      "AI breaks massive, vague tasks into tiny, undeniable physical actions.",
  },
  {
    icon: "battery_charging_20",
    iconBg: "#f0e8db",
    iconColor: "#4a4538",
    title: "Potato Energy Mode",
    description:
      "Tell it you have 5% energy left. It finds a task you can do from the couch.",
  },
  {
    icon: "touch_app",
    iconBg: "#f8e0a8",
    iconColor: "#554020",
    title: "Tactile Rewards",
    description:
      "Completing a task feels weighty, organic, and satisfying. No hollow badges.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="w-full px-5 md:px-8 py-12 my-12"
      style={{ maxWidth: "1024px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-4 p-8 rounded-xl"
            style={{
              backgroundColor: "#f5f1ea",
              border: "1px solid #e4e0d8",
            }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              style={{
                backgroundColor: feature.iconBg,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  color: feature.iconColor,
                  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                {feature.icon}
              </span>
            </div>

            {/* Title */}
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
              {feature.title}
            </h3>

            {/* Description */}
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
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}