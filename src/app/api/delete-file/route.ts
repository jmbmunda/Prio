import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { uuid } = await request.json();
    if (!uuid) return NextResponse.json({ error: "No uuid provided" }, { status: 400 });

    const response = await fetch(`https://api.uploadcare.com/files/${uuid}/storage/`, {
      method: "DELETE",
      headers: {
        Authorization: `Uploadcare.Simple ${process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY}:${process.env.UPLOADCARE_SECRET_KEY}`,
        Accept: "application/vnd.uploadcare-v0.7+json",
      },
    });

    if (response.ok) {
      return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
