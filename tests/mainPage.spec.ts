import "dotenv/config";
import { test } from "../helper/fixtures/pages.fixtures";

test.describe("Main Page tests", () => {
  test("Successful logout", async ({ loggedInMainPage }) => {
    await loggedInMainPage.logout();
  });
});
