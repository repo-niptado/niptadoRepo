// File: cron-worker.ts

import "dotenv/config";
import cron from "node-cron";
import escalateLevel1ToLevel2 from "../server/cron/escalateLevel1ToLevel2";
import escalateLevel2ToLevel3 from "../server/cron/escalateLevel2ToLevel3";
import escalateLevel3ToLevel4 from "../server/cron/escalateLevel3ToLevel4";
import escalateLevel4ToLevel5 from "../server/cron/escalateLevel4ToLevel5";
import escalateLevel5ToLevel6 from "../server/cron/escalateLevel5ToLevel6";

console.log("✅ Cron worker started...");

// LEVEL 1 ➝ 2 after 7 days
cron.schedule("0 1 * * *", () => {
  console.log("⏱ Running escalation Level 1 ➝ Level 2...");
  escalateLevel1ToLevel2();
});

// LEVEL 2 ➝ 3 after 5 days
cron.schedule("0 2 * * *", () => {
  console.log("⏱ Running escalation Level 2 ➝ Level 3...");
  escalateLevel2ToLevel3();
});

// LEVEL 3 ➝ 4 after 3 days
cron.schedule("0 3 * * *", () => {
  console.log("⏱ Running escalation Level 3 ➝ Level 4...");
  escalateLevel3ToLevel4();
});

// LEVEL 4 ➝ 5 after 3 days
cron.schedule("0 4 * * *", () => {
  console.log("⏱ Running escalation Level 4 ➝ Level 5...");
  escalateLevel4ToLevel5();
});

// LEVEL 5 ➝ 6 after 3 days
cron.schedule("0 5 * * *", () => {
  console.log("⏱ Running escalation Level 5 ➝ Level 6...");
  escalateLevel5ToLevel6();
});


