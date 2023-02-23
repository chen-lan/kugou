import Mock from "mockjs";
import nav from "./nav.json";

// Mock.mock("/mock/floors", { code: 200, data: floors });
Mock.mock("/mock/nav", { code: 200, data: nav });
