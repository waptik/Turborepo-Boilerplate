async function main() {
  await Promise.resolve();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
