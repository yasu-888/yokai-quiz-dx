import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 以前は、デフォルトのエクスポートで HTTP メソッドを定義できましたが、現在は、各 HTTP メソッドを名前付きエクスポートで定義する必要があります。
export function GET() {
  const filePath = path.join(process.cwd(), "public", "db.json");

  try {
    const fileContents = fs.readFileSync(filePath);
    const data = JSON.parse(fileContents.toString("utf-8"));
    return NextResponse.json(data);
  } catch (error) {
    console.error(error); // エラーをコンソールに出力
    return NextResponse.json(
      { message: "データの読み込みに失敗しました" },
      { status: 500 }
    );
  }
}
