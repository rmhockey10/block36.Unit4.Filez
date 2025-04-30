import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  const folders = [{ name: "Albert" }, { name: "Bernard" }, { name: "Chloe" }];

  const files = [
    { name: "file1.txt", size: 1200, folder_id: 1 },
    { name: "file2.txt", size: 540, folder_id: 2 },
    { name: "file3.txt", size: 800, folder_id: 3 },
    { name: "file4.txt", size: 1500, folder_id: 1 },
    { name: "file5.txt", size: 300, folder_id: 2 },
    { name: "file6.txt", size: 620, folder_id: 3 },
    { name: "file7.txt", size: 2000, folder_id: 1 },
    { name: "file8.txt", size: 970, folder_id: 2 },
    { name: "file9.txt", size: 430, folder_id: 3 },
    { name: "file10.txt", size: 510, folder_id: 1 },
    { name: "file11.txt", size: 1250, folder_id: 2 },
    { name: "file12.txt", size: 880, folder_id: 3 },
    { name: "file13.txt", size: 770, folder_id: 1 },
    { name: "file14.txt", size: 620, folder_id: 2 },
    { name: "file15.txt", size: 340, folder_id: 3 },
    { name: "file16.txt", size: 1530, folder_id: 1 },
    { name: "file17.txt", size: 990, folder_id: 2 },
    { name: "file18.txt", size: 410, folder_id: 3 },
    { name: "file19.txt", size: 1330, folder_id: 1 },
    { name: "file20.txt", size: 560, folder_id: 2 },
  ];

  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];
    console.log(folder);
    await createFolder(folder);
  }

  async function createFolder({ name }) {
    const sql = `
  INSERT INTO folders
    (name)
  VALUES
    ($1)
  RETURNING *
  `;
    const values = [name];

    const res = await db.query(sql, values);
    return res.rows[0];
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.log(file);
    await createFile(file);
  }

  async function createFile({ name, size, folder_id }) {
    const sql = `
  INSERT INTO files
    (name, size, folder_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
    const values = [name, size, folder_id];

    const res = await db.query(sql, values);
    return res.rows[0];
  }
}
