import config from "@/helper/config.ts";
import axios from "axios";

const api = axios.create({
    baseURL: config.apiDomain,
});

export default api;
