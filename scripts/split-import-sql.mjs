import fs from "node:fs";
import path from "node:path";

const INPUT_FILE = path.join(
  process.cwd(),
  "data",
  "import_users.sql"
);

const OUTPUT_DIR = path.join(
  process.cwd(),
  "data",
  "import_batches"
);

// 腾讯云限制 100000 字符
// 我们保守控制在 90000
const MAX_CHARS = 90000;

fs.mkdirSync(
  OUTPUT_DIR,
  { recursive: true }
);

// 清理旧 batch
for (const file of fs.readdirSync(OUTPUT_DIR)) {
  if (file.endsWith(".sql")) {
    fs.unlinkSync(
      path.join(OUTPUT_DIR, file)
    );
  }
}

const sql = fs.readFileSync(
  INPUT_FILE,
  "utf8"
);

// 每一组必须同时包含：
// User INSERT + 对应 NFT INSERT
const pairs =
  sql.match(
    /INSERT INTO `User`[\s\S]*?;\s*INSERT INTO `NFT`[\s\S]*?;/g
  ) || [];

if (pairs.length === 0) {
  throw new Error(
    "没有找到 User + NFT INSERT 数据。"
  );
}

console.log(
  `找到 ${pairs.length} 个用户数据组`
);

const HEADER =
  "START TRANSACTION;\n\n";

const FOOTER =
  "\n\nCOMMIT;\n";

let batches = [];

let current =
  HEADER;

for (const pair of pairs) {

  const candidate =
    current +
    pair +
    "\n\n" +
    FOOTER;

  // 如果加入这一组后会超过限制
  if (
    candidate.length >
      MAX_CHARS &&
    current !== HEADER
  ) {

    current += FOOTER;

    batches.push(current);

    current =
      HEADER +
      pair +
      "\n\n";

  } else {

    current +=
      pair +
      "\n\n";

  }
}

// 最后一批
if (current !== HEADER) {

  current += FOOTER;

  batches.push(current);

}


// 写文件
for (
  let i = 0;
  i < batches.length;
  i++
) {

  const fileName =
    `batch_${String(i + 1).padStart(2, "0")}.sql`;

  const filePath =
    path.join(
      OUTPUT_DIR,
      fileName
    );

  fs.writeFileSync(
    filePath,
    batches[i],
    "utf8"
  );

  console.log(
    `${fileName}: ${batches[i].length} 字符`
  );
}


console.log("");
console.log(
  `完成：共生成 ${batches.length} 个批次`
);

console.log(
  `位置：${OUTPUT_DIR}`
);