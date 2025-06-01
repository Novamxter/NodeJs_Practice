import fs from "fs/promises";

try {
  await fs.writeFile("TestPro.txt", "\nThis is Fs Promise...");
  console.log("File created.");
} catch (e) {
  console.log(e);
}
