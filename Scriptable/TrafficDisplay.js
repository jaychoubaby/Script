// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: bell;

// 提供商名称
const SERVICE_NAME = "<SERVICE_NAME>";
// 提供商 shadowsocks 订阅地址
const API_URL = "<API_URL>";
// 购买日期
const BUY_DAY = 21;

const widget = await buildWidget();
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentSmall();
}
Script.complete();

function formatBytes(bytes, decimals = 2, split = false) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const number = String(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)));

  const unit = sizes[i];

  if (split) {
    const [int, decimal] = number.split(".");
    return [int, decimal, unit];
  }

  return number + unit;
}

async function fetchTrafficInfo() {
  const request = new Request(API_URL);
  request.method = "HEAD";
  request.headers = {
    "user-agent": "Quantumult%20X",
  };
  await request.load();
  const infoString = request.response.headers["subscription-userinfo"];
  const { upload, download, total, expire } = infoString
    .split(";")
    .reduce((map, item) => {
      const [key, value] = item.trim().split("=");
      map[key] = Number(value);
      return map;
    }, {});

  const used = upload + download;
  const remaining = total - used;

  //const df = new DateFormatter();
  //  df.dateFormat = "yyyy-mm-dd";
  //  info.expire = df.string(new Date(info.expire * 1000));

  return {
    used,
    remaining,
    total,
    expireAt: expire,
  };
}

function computeResetDaysFromNow() {
  const today = new Date();
  const day = today.getDate();
  if (day > 0 && day < BUY_DAY) {
    return BUY_DAY - day;
  }

  return (
    new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() -
    today.getDate() +
    BUY_DAY
  );
}

async function main() {
  try {
    const info = await fetchTrafficInfo();
    console.log(info);
  } catch (err) {
    console.log(err);
  }
}

async function buildWidget() {
  const info = await fetchTrafficInfo();

  const widget = new ListWidget();

  let gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [new Color("141414"), new Color("13233F")];
  widget.backgroundGradient = gradient;

  /** header */
  const headerStack = widget.addStack();

  addSFSymbol(headerStack, "cube.transparent", {
    color: Color.white(),
    opacity: 0.7,
  });

  headerStack.addSpacer(4);

  addText(headerStack, SERVICE_NAME, {
    opacity: 0.7,
    font: Font.mediumSystemFont(13),
  });

  widget.addSpacer();

  /** body */
  const [remainingInt, remainingDecimal, remainingUnit] = formatBytes(
    info.remaining,
    2,
    true
  );
  const remainingStack = widget.addStack();

  remainingStack.addSpacer();
  addText(remainingStack, remainingInt + "." + remainingDecimal, {
    font: Font.boldSystemFont(32),
  });
  // addText(remainingStack, remainingDecimal, {
  //   font: Font.boldSystemFont(24),
  // });
  remainingStack.addSpacer();

  remainingStack.bottomAlignContent();

  const descStack = widget.addStack();
  descStack.addSpacer();
  addText(descStack, `${remainingUnit} 剩余`, {
    opacity: 0.7,
    font: Font.mediumSystemFont(10),
  });
  descStack.addSpacer();

  widget.addSpacer(4);

  widget.addSpacer(4);

  const progressBarStack = widget.addStack();

  // progressBarStack.addSpacer();
  addImage(progressBarStack, createProgressImage(info.total, info.used), {
    size: new Size(125, 5),
  });
  //   progressBarStack.addSpacer();

  const progressLabelStack = widget.addStack();
  addText(progressLabelStack, formatBytes(info.used), {
    opacity: 0.7,
    font: Font.mediumSystemFont(10),
  });
  widget.addSpacer(2);

  progressLabelStack.addSpacer();
  addText(progressLabelStack, formatBytes(info.total), {
    opacity: 0.7,
    font: Font.mediumSystemFont(10),
  });

  widget.addSpacer();

  const footerStack = widget.addStack();
  addText(footerStack, `距下次重置：${computeResetDaysFromNow()}天`, {
    opacity: 0.7,
    font: Font.mediumSystemFont(12),
  });

  return widget;
}

function addText(target, text, { color = Color.white(), font, opacity } = {}) {
  const textElement = target.addText(text);

  if (opacity) {
    textElement.textOpacity = opacity;
  }

  if (font) {
    textElement.font = font;
  }

  textElement.textColor = color;

  return textElement;
}

function addImage(target, image, { size, tintColor, opacity }) {
  const imageElement = target.addImage(image);

  if (size) {
    imageElement.imageSize = size;
  }

  if (tintColor) {
    imageElement.tintColor = tintColor;
  }

  if (opacity) {
    imageElement.imageOpacity = opacity;
  }

  return imageElement;
}

function addSFSymbol(
  target,
  name,
  { size = new Size(16, 16), color = Color.white(), opacity } = {}
) {
  const font = Font.systemFont(22);
  const sfSymbol = SFSymbol.named(name);
  sfSymbol.applyFont(font);

  addImage(target, sfSymbol.image, {
    tintColor: color,
    size,
    opacity,
  });
}

function createProgressImage(total, process, { size = new Size(125, 5) } = {}) {
  const context = new DrawContext();
  (context.size = size), (context.opaque = false);
  context.respectScreenScale = true;
  context.setFillColor(new Color("#48484b"));
  const path = new Path();
  path.addRoundedRect(new Rect(0, 0, size.width, size.height), 3, 2);
  context.addPath(path);
  context.fillPath();
  context.setFillColor(Color.blue());
  const path1 = new Path();
  path1.addRoundedRect(
    new Rect(0, 0, (size.width * process) / total, size.height),
    3,
    2
  );
  context.addPath(path1);
  context.fillPath();
  return context.getImage();
}
