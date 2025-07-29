import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? '', 'public/uploads');

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const files = formData.getAll('files') as Blob[];

  if (files.length === 0) {
    return NextResponse.json({
      success: false,
      message: 'No files provided',
    });
  }

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }

  const uploadedFiles = [];

  for (const file of files) {
    if (file instanceof Blob) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = (file as File).name;

      fs.writeFileSync(path.resolve(UPLOAD_DIR, fileName), buffer);
      uploadedFiles.push(fileName);
    }
  }

  return NextResponse.json({
    success: true,
    files: uploadedFiles,
  });
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({
      success: false,
      message: 'File name is required',
    });
  }

  const filePath = path.resolve(UPLOAD_DIR, fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, message: 'File not found' });
  }
};
