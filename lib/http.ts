"use client";
// import type RequestInit from "next/dist/server/web/spec-extension/request";

type Server = "base" | "backup"
const AuthKey: string = "Authorization"

type ServerUrl = {
  base: string;
  backup: string;
};

const serverUrl: ServerUrl = {
  base: "http://192.168.0.30:3100",
  backup: "http://localhost:8030",
};

class Resp<T> {
  constructor(
    public result: boolean = false,
    public msg: string = "",
    public data: T | null = null,
  ) {}
}

async function FetchGet<T>(
  api: string,
  body: RequestInit = {},
  server: Server = "base",
): Promise<Resp<T>> {
  try {
    const response = await fetch(serverUrl[server] + api, {
      method: "GET",
      headers: { ...body.headers },
    });
    if (!response.ok) {
      throw new Error(`GET ${api} ${response.status}`);
    }
    return (await response.json()) as Resp<T>;
  } catch (err) {
    return new Resp<T>(false, String(err), null);
  }
}

async function FetchPost<T>(
  api: string,
  body: RequestInit,
  server: Server = "base",
): Promise<Resp<T>> {
  try {
    const response = await fetch(serverUrl[server] + api, {
      method: "POST",
      ...body,
      headers: {
        "Content-Type": "application/json",
        ...body.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`GET ${api} ${response.status}`);
    }
    
    console.log(`headers: ${JSON.stringify(response.headers)}`)
    
    if (response.headers.get("Content-Disposition")?.includes("filename=")) {
      await DownloadFile(response);
      return new Resp<T>(true, "download file success", null);
    }
    return (await response.json()) as Resp<T>;

  } catch (err) {
    return new Resp<T>(false, String(err), null);
  }
}

async function UploadFile<T>(
  api: string,
  body: RequestInit,
  server: Server = "base",
): Promise<Resp<T>> {
  try {
    const response = await fetch(serverUrl[server] + api, {
      method: "POST",
      ...body,
    });
    if (!response.ok) {
      throw new Error(`GET ${api} ${response.status}`);
    }

    return (await response.json()) as Resp<T>;
  } catch (error) {
    return new Resp<T>(false, String(error), null);
  }
}

async function FetchFile<T>(
  api: string,
  server: Server = "base",
): Promise<Resp<T>> {
  try {
    const response = await fetch(serverUrl[server] + api);
    if (!response.ok) {
      throw new Error(`GET ${api} ${response.status}`);
    }

    if (response.headers.get("Content-Disposition")?.includes("filename=")) {
      await DownloadFile(response);
      return new Resp<T>(true, "download file success", null);
    }
    
    return (await response.json()) as Resp<T>;
  } catch (error) {
    return new Resp<T>(false, String(error), null);
  }
}

async function DownloadFile(response: Response): Promise<boolean> {
  const disposition = response.headers.get("Content-Disposition");
  if (!disposition || !disposition.includes("filename=")) {
    return false;
  }
  const fileName = disposition.split("filename=")[1].replace(/["']/g, "");
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  return true;
}

export {
  serverUrl,
  FetchGet,
  FetchPost,
  FetchFile,
  UploadFile,
  DownloadFile,
  Resp,
  AuthKey,
};
