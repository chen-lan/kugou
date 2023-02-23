import request from "@/utils/request";
import mockAjax from "@/utils/mockRequest";

export const reqNav = () => mockAjax({ url: "/nav", method: "get" });
