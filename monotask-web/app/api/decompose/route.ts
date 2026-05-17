import { NextResponse } from "next/server";

const fallbackSteps = [
  "Take one slow breath.",
  "Clear one small spot near you.",
  "Do the first visible part for 2 minutes.",
  "Put one thing where it belongs.",
  "Take a short reset and notice what changed.",
];

function extractJsonArray(text: string): string[] | null {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === "string");
    }
  } catch {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return null;
    try {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) {
        return parsed.filter((item) => typeof item === "string");
      }
    } catch {
      return null;
    }
  }

  return null;
}

function fallbackForTask(task: string, potatoEnergy: boolean) {
  const trimmedTask = task.trim();

  if (!trimmedTask) {
    return fallbackSteps;
  }

  const start = potatoEnergy
    ? "Take one slow breath."
    : "Open or stand near the task.";

  return [
    start,
    `Look at "${trimmedTask}" for 10 seconds.`,
    "Choose the smallest visible piece.",
    "Work on only that piece for 2 minutes.",
    "Pause and decide the next tiny move.",
  ];
}

export async function POST(request: Request) {
  const { task, potatoEnergy = false } = await request.json();

  if (typeof task !== "string" || task.trim().length < 2) {
    return NextResponse.json(
      { error: "Please enter one task to break down." },
      { status: 400 },
    );
  }

  const apiKey = process.env.NVIDIA_API_KEY || process.env.NIM_API_KEY;
  const baseUrl =
    process.env.NIM_BASE_URL || "https://integrate.api.nvidia.com/v1";
  const model = process.env.NIM_MODEL || "meta/llama-3.1-8b-instruct";

  if (!apiKey) {
    return NextResponse.json({
      steps: fallbackForTask(task, potatoEnergy),
      source: "fallback",
    });
  }

  const systemPrompt = `You are the MonoTask Assistant, a highly empathetic expert in Executive Dysfunction and ADHD coaching. Your goal is to take a broad, overwhelming task and break it into 2-Minute Wins.

Rules:
1. Never use jargon. Keep language simple and encouraging.
2. Every sub-task must be something the user can finish in under 2 minutes.
3. Order tasks so the first one is the absolute easiest.
4. If the user sounds overwhelmed or Potato Energy is on, start with a physical grounding action.
5. Output ONLY a JSON array of strings. No conversational filler.`;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: potatoEnergy ? 0.35 : 0.45,
        max_tokens: 400,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Task: ${task}\nPotato Energy: ${potatoEnergy ? "on" : "off"}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`AI request failed with ${response.status}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const steps = typeof content === "string" ? extractJsonArray(content) : null;

    if (!steps?.length) {
      throw new Error("AI response did not contain a JSON array.");
    }

    return NextResponse.json({ steps: steps.slice(0, 7), source: "ai" });
  } catch {
    return NextResponse.json({
      steps: fallbackForTask(task, potatoEnergy),
      source: "fallback",
    });
  }
}
