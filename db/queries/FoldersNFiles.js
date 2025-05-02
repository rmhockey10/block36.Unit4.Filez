import db from "#db/client";

export async function getFiles() {
  const sql = `
  SELECT files.*,folders.name AS folder_name
  FROM files
  JOIN folders ON files.folder_id = folders.id`;
  const { rows: files } = await db.query(sql);
  return files;
}

export async function getFolders() {
  const sql = `SELECT * FROM folders`;
  const { rows: folders } = await db.query(sql);
  return folders;
}

export async function getFolderByIdIncludingFiles(id) {
  const sql = `
  SELECT
  *,
  (
  SELECT json_agg(files)
  FROM files
  WHERE files.folder_id = folders.id
  ) AS files
   FROM folders
   WHERE id = $1
   `;
  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;
}

export async function createFile(name, size, id) {
  const sql = `
  INSERT INTO files
  (name, size, folder_id)
  VALUES
  ($1, $2, $3)
  RETURNING *
  `;
  const values = [name, size, id];

  const res = await db.query(sql, values);
  return res.rows[0];
}
