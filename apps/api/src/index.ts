import { db } from './db/client';

async function main() {
  console.log('DB client initialized:', !!db);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
