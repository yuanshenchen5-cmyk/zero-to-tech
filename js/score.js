import { animate, scrambleText } from "https://cdn.jsdelivr.net/npm/animejs@4/+esm";

export function initScoreAnim() {
  var btn = document.querySelector(".primary-button");
  var scoreEl = document.querySelector("[data-score]");
  var input = document.querySelector("#text-input");
  var originalEl = document.querySelector("[data-original]");
  var sentimentEl = document.querySelector("[data-sentiment]");
  if (!btn || !scoreEl || !input || !originalEl || !sentimentEl) return;

  btn.addEventListener("click", function () {
    var text = input.value.trim();
    if (!text) {
      originalEl.textContent = "请输入要分析的文本";
      sentimentEl.textContent = "等待输入";
      scoreEl.textContent = "--";
      return;
    }

    var positiveWords = ["喜欢", "开心", "快乐", "美好", "希望", "轻松", "值得", "幸福"];
    var negativeWords = ["难过", "失望", "痛苦", "焦虑", "糟糕", "害怕", "孤独", "疲惫"];
    var positiveCount = positiveWords.filter(function (word) { return text.includes(word); }).length;
    var negativeCount = negativeWords.filter(function (word) { return text.includes(word); }).length;
    var score = Math.max(0.1, Math.min(0.95, 0.5 + (positiveCount - negativeCount) * 0.12));

    originalEl.textContent = text;
    sentimentEl.textContent = positiveCount > negativeCount ? "偏积极" : negativeCount > positiveCount ? "偏消极" : "较中性";
    animate(scoreEl, {
      innerHTML: scrambleText({ chars: "0-9." }),
      duration: 700,
      onComplete: function () { scoreEl.textContent = score.toFixed(2); },
    });
  });
}
 