import { GRAMMAR_LESSONS } from "./grammar.js";

function getLessonOfDay(getLessonProgressFn) {
  if (typeof getLessonProgressFn === "function") {
    return (
      GRAMMAR_LESSONS.find((l) => {
        const p = getLessonProgressFn(l);
        return p.pct < 100;
      }) || null
    );
  }

  return GRAMMAR_LESSONS[0] || null;
}

function passageWordCount(text) {
  return (text.match(/[ঀ-৿A-Za-z]+/g) || []).length;
}

export { getLessonOfDay, passageWordCount };
