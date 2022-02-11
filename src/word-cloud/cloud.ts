import { WordWithImportance } from "./bindings";
import cloud from "d3-cloud";
import * as d3 from "d3";

const cloudWidth = 600;
const cloudHeight = 400;
const wordsCount = 40;

const colors = ["#227C9D", "#17C3B2", "#FFCB77", "#FE6D73"];

// @ts-ignore
function draw(words, origin: string) {
  d3.select(`#cloudContainer${origin}`)
    .append("svg")
    .attr("width", cloudWidth)
    .attr("height", cloudHeight)
    .append("g")
    .attr(
      "transform",
      "translate(" + cloudWidth / 2 + "," + cloudHeight / 2 + ")"
    )
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", function (d) {
      // @ts-ignore
      return d.size + "px";
    })
    .style("font-family", "Impact")
    .style("fill", () => colors[Math.floor(Math.random() * colors.length)])
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      // @ts-ignore
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) {
      // @ts-ignore
      return d.text;
    });
}

export function drawCloud(words: WordWithImportance[], origin: string) {
  if (words.length === 0) {
    return;
  }

  const wordsSlice = words.slice(0, wordsCount);
  const highestScore = wordsSlice[0].tf_idf;
  const lowestScore = wordsSlice[wordsSlice.length - 1].tf_idf;

  const containerId = `#cloudContainer${origin}`;
  const container = document.querySelector(containerId);
  if (container) {
    container.innerHTML = "";
  }

  const layout = cloud()
    .size([cloudWidth, cloudHeight])
    .words(
      wordsSlice.map((word) => {
        const normalizedFontScalingFactor =
          (word.tf_idf - lowestScore) / (highestScore - lowestScore);
        // @ts-ignore
        return {
          text: word.word,
          size: 20 + normalizedFontScalingFactor * 20,
        };
      })
    )
    .padding(5)
    .rotate(function () {
      return -45 + Math.random() * 90;
    })
    .font("Impact")
    // @ts-ignore
    .fontSize(function (d) {
      return d.size;
    })
    .on("end", (words) => draw(words, origin));

  layout.start();
}
