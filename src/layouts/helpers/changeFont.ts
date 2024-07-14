import fonts from "@chinese-fonts/index";
import loadjs from "loadjs";

type fontName = keyof typeof fonts;

// https://github.com/cnpm/unpkg-white-list/pull/213
const fontCDN = "https://esm.sh";

export const fontList = Object.keys(fonts).map((font: string) => {
  return {
    key: font as fontName,
    name: fonts[font as fontName].name,
  };
});

export const changeFont = async (fontKey: fontName) => {
  const font = fonts[fontKey];
  const fontLinks = font.remotePath.map((fontInfo) => {
    return fontInfo.path.replace("packages", `${fontCDN}/@chinese-fonts`);
  });
  const fontFamily = font.remotePath[0].css.family
  await loadjs(fontLinks, { returnPromise: true });
  document.documentElement.style.setProperty("--custom-font", fontFamily);
  localStorage.setItem("custom-font", JSON.stringify({
    fontFamily,
    fontLinks
  }));
};
