const assert = require("assert");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

// Mock browser environment
const dom = new JSDOM(`<!DOCTYPE html><html><body>
  <form>
    <input type="text" id="number">
    <input type="password" id="password">
    <div id="errorMessage"></div>
  </form>
</body></html>`, { url: "http://localhost" });

global.document = dom.window.document;
global.window = dom.window;
global.localStorage = {
  storage: {},
  setItem(key, value) { this.storage[key] = value; },
  getItem(key) { return this.storage[key] || null; },
  removeItem(key) { delete this.storage[key]; },
};

// Mock alert
global.alert = (message) => {
  console.log(`Alert: ${message}`);
};

// Mock fetch
global.fetch = async (url) => {
  if (url.includes("users.json")) {
    return {
      ok: true,
      json: async () => [
        { userID: "000000001", password: "admin123" },
        { userID: "000000002", password: "sales123" },
      ],
    };
  }
  throw new Error("Network error");
};

// Load login.js
const loginPath = path.join(__dirname, "public", "login.js");
const loginCode = fs.readFileSync(loginPath, "utf-8");
eval(loginCode);

// Test cases
(async function runTests() {
  console.log("Running tests...");

  // Test 1: Invalid employee number
  document.getElementById("number").value = "12345";
  document.getElementById("password").value = "admin123";
  const errorMessage = document.getElementById("errorMessage");
  await OnSubmit({ preventDefault: () => {} });
  assert(errorMessage.innerHTML.includes("Employee number must be a 9-digit number."),
    "Should show error for invalid employee number");

  // Test 2: Valid login
  document.getElementById("number").value = "000000001";
  document.getElementById("password").value = "admin123";
  errorMessage.innerHTML = "";
  await OnSubmit({ preventDefault: () => {} });
  assert.strictEqual(errorMessage.innerHTML, "", "Should not show errors for valid login");

  // Test 3: Sticky employee number
  saveEmployeeNumber("000000001");
  assert.strictEqual(localStorage.getItem("empNumber"), "000000001",
    "Should save employee number in local storage");

  // Test 4: Clear employee number
  clearEmployeeNumber();
  assert.strictEqual(localStorage.getItem("empNumber"), null,
    "Should clear employee number from local storage");

  console.log("All tests passed!");
})();
