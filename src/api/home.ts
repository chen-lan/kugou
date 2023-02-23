import request from "@/utils/request";
import mockAjax from "@/utils/mockRequest";

export const reqNav = () => request({ url: "/toplist", method: "get" });
