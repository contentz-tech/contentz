const { jsx } = require("@emotion/core");
const { memo } = require("react");
const { Code } = require("./html/code");
const Card = require("./card");

const FolderIcon = require("./icons/folder");
const FileIcon = require("./icons/file");

function sortByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function sortByType(a, b) {
  if ((a.type === "folder" || a.type === "directory") && b.type === "file") {
    return -1;
  }
  if (a.type === "file" && (b.type === "folder" || b.type === "directory")) {
    return 1;
  }
  return 0;
}

function mapChildren(children, level = 0) {
  return children
    .sort(sortByName)
    .sort(sortByType)
    .map(item => {
      if (item.type === "file") {
        return jsx(File, { level, key: item.name + item.type, ...item });
      }
      if (item.type === "directory" || item.type === "folder") {
        return jsx(Folder, { level, key: item.name + item.type, ...item });
      }
      return null;
    });
}

function calcIdents(level) {
  return Array.from(Array(level), (_, i) => jsx(Ident, { key: i }));
}

const Name = memo(props =>
  jsx("span", { css: { fontSize: "0.9em" } }, props.children)
);

const Ident = memo(() =>
  jsx("span", {
    css: {
      display: "inline-block",
      width: "30px",
      height: "35px",
      lineHeight: "35px",
      backgroundImage:
        "linear-gradient(to right, transparent 11px, rgb(234, 234, 234) 11px, rgb(234, 234, 234) 12px, transparent 12px)",
      verticalAlign: "top",
      backgroundRepeat: "no-repeat"
    }
  })
);

const Icon = memo(({ kind }) =>
  jsx(
    "i",
    {
      css: {
        marginRight: "0.25em",
        display: "inline-flex"
      }
    },
    kind === "file" ? jsx(FileIcon) : jsx(FolderIcon)
  )
);

const File = memo(props =>
  jsx(
    "li",
    { css: { display: "flex", alignItems: "center" } },
    calcIdents(props.level),
    jsx(
      "div",
      {
        css: {
          height: "30px",
          display: "flex",
          alignItems: "center",
          ":hover": { fontWeight: "bold" }
        }
      },
      jsx(Icon, { kind: props.type }),
      jsx(Name, null, props.name)
    )
  )
);

const Folder = memo(props =>
  jsx(
    "li",
    null,
    jsx(
      "details",
      { open: !props.close },
      jsx(
        "summary",
        {
          css: {
            display: "flex",
            alignItems: "center",
            outline: "none",
            ":hover": { fontWeight: "bold", cursor: "pointer" },
            "::-webkit-details-marker": { display: "none" }
          }
        },
        calcIdents(props.level),
        jsx(Icon, { kind: props.type }),
        jsx(Name, null, props.name)
      ),
      jsx(
        "ul",
        { css: { listStyleType: "none", paddingLeft: 0 } },
        mapChildren(props.children, props.level + 1)
      )
    )
  )
);

const FileTree = memo(props =>
  typeof props.children !== "string"
    ? jsx(Code, props)
    : jsx(
        Card,
        null,
        jsx(
          "ul",
          { css: { listStyleType: "none", paddingLeft: 0 } },
          mapChildren(JSON.parse(props.children), 0)
        )
      )
);

module.exports = FileTree;
