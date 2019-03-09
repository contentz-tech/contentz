const { Fragment } = require("react");
const { jsx } = require("@emotion/core");
const Card = require("./card");

function formatYoutubeEmbed(id) {
  return `https://www.youtube.com/embed/${id}`;
}

function Video({ youtube, src = formatYoutubeEmbed(youtube), caption }) {
  return jsx(
    Card,
    null,
    jsx(
      "div",
      {
        css: {
          margin: "1em 0",
          position: "relative",
          paddingBottom: "56.25%;",
          paddingTop: "25px",
          height: 0,
          marginBottom: caption ? "0.5em" : 0
        }
      },
      jsx("iframe", {
        src,
        title: caption || youtube ? "YouTube Video" : "Video",
        css: {
          border: "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }
      })
    ),
    jsx(
      "p",
      {
        css: {
          textAlign: "center",
          marginBottom: 0,
          fontSize: "0.8em",
          color: "rgba(0, 0, 0, 0.7)"
        }
      },
      caption
    )
  );
}

module.exports = Video;
