import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";


const INPUT_FILE = path.join(
  process.cwd(),
  "data",
  "master_users.json"
);

const OUTPUT_FILE = path.join(
  process.cwd(),
  "data",
  "import_users.sql"
);


function sqlEscape(value) {
  if (value === null || value === undefined) {
    return "NULL";
  }

  return `'${String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "''")}'`;
}


function normalizeImageUrl(value) {
  if (!value) {
    return "";
  }

  const text = String(value).trim();

  // 如果真实 JSON 里是 Markdown 链接：
  // [https://xxx.png](https://xxx.png)
  const markdownMatch = text.match(
    /^\[(https?:\/\/[^\]]+)\]\([^)]+\)$/
  );

  if (markdownMatch) {
    return markdownMatch[1];
  }

  return text;
}


function mysqlDate(value) {
  if (!value) {
    return null;
  }

  // 2026-07-22 → 2026-07-22 00:00:00.000
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value} 00:00:00.000`;
  }

  return value;
}


const raw = fs.readFileSync(
  INPUT_FILE,
  "utf8"
);

const users = JSON.parse(raw);

if (!Array.isArray(users)) {
  throw new Error(
    "master_users.json 最外层必须是数组。"
  );
}


const accounts = new Set();

for (const user of users) {
  const account = String(
    user.account ?? ""
  )
    .trim()
    .toUpperCase();

  if (!account) {
    throw new Error(
      `发现没有 account 的记录，id=${user.id}`
    );
  }

  if (accounts.has(account)) {
    throw new Error(
      `发现重复 account：${account}`
    );
  }

  accounts.add(account);
}


const sql = [];

sql.push(
  "-- Generated from data/master_users.json"
);

sql.push(
  "START TRANSACTION;"
);


for (let index = 0; index < users.length; index++) {
  const item = users[index];

  const sourceId =
    item.id ?? index + 1;

  const userId =
    `user_${sourceId}`;

  const nftId =
    `nft_initial_${sourceId}`;

  const account = String(
    item.account
  )
    .trim()
    .toUpperCase();

  const password = String(
    item.password ?? ""
  );

  if (!password) {
    throw new Error(
      `账号 ${account} 没有 password`
    );
  }

  // cost 12
  const passwordHash =
    await bcrypt.hash(
      password,
      12
    );

  const imageUrl =
    normalizeImageUrl(
      item.imageUrl
    );

  const createdAt =
    mysqlDate(
      item.createdAt
    ) ??
    "2026-07-22 00:00:00.000";

  const attributes =
    item.attributes == null
      ? null
      : JSON.stringify(
          item.attributes
        );


  sql.push(`
INSERT INTO \`User\`
(
  \`id\`,
  \`account\`,
  \`passwordHash\`,
  \`createdAt\`
)
VALUES
(
  ${sqlEscape(userId)},
  ${sqlEscape(account)},
  ${sqlEscape(passwordHash)},
  ${sqlEscape(createdAt)}
);
`.trim());


  sql.push(`
INSERT INTO \`NFT\`
(
  \`id\`,
  \`imageUrl\`,
  \`type\`,
  \`collection\`,
  \`name\`,
  \`originalImage\`,
  \`metadata\`,
  \`attributes\`,
  \`ownerId\`,
  \`createdAt\`
)
VALUES
(
  ${sqlEscape(nftId)},
  ${sqlEscape(imageUrl)},
  'INITIAL',
  ${sqlEscape(item.collection)},
  ${sqlEscape(item.name)},
  ${sqlEscape(item.originalImage)},
  ${sqlEscape(item.metadata)},
  ${sqlEscape(attributes)},
  ${sqlEscape(userId)},
  ${sqlEscape(createdAt)}
);
`.trim());


  if (
    (index + 1) % 100 === 0
  ) {
    console.log(
      `Processed ${index + 1}/${users.length}`
    );
  }
}


sql.push(
  "COMMIT;"
);


fs.writeFileSync(
  OUTPUT_FILE,
  sql.join("\n\n"),
  "utf8"
);


console.log("");
console.log(
  `完成：${users.length} 个用户`
);

console.log(
  `SQL 文件：${OUTPUT_FILE}`
);