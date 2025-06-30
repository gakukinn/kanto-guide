import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    console.log('开始处理图片上传请求...');
    
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    
    if (!files || files.length === 0) {
      console.log('没有上传文件');
      return NextResponse.json({
        success: false,
        message: '没有上传文件'
      }, { status: 400 });
    }
    
    console.log(`接收到 ${files.length} 个文件`);
    
    // 确保上传目录存在
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    console.log('上传目录:', uploadDir);
    
    try {
      await mkdir(uploadDir, { recursive: true });
      console.log('上传目录创建/确认成功');
    } catch (error) {
      console.error('创建上传目录失败:', error);
      return NextResponse.json({
        success: false,
        message: '创建上传目录失败'
      }, { status: 500 });
    }
    
    const uploadedFiles = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`处理文件 ${i + 1}/${files.length}: ${file.name}, 大小: ${file.size} bytes, 类型: ${file.type}`);
      
      try {
        // 验证文件类型
        if (!file.type.startsWith('image/')) {
          console.log(`跳过非图片文件: ${file.name}`);
          continue;
        }
        
        // 验证文件大小 (最大5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          console.log(`文件过大: ${file.name} (${file.size} bytes > ${maxSize} bytes)`);
          continue;
        }
        
        // 读取文件
        console.log(`读取文件: ${file.name}`);
        const buffer = Buffer.from(await file.arrayBuffer());
        console.log(`文件读取成功，buffer长度: ${buffer.length}`);
        
        // 生成唯一文件名
        const timestamp = Date.now();
        const ext = path.extname(file.name);
        const nameWithoutExt = path.basename(file.name, ext);
        const finalFilename = `${timestamp}_${nameWithoutExt}${ext}`;
        const filePath = path.join(uploadDir, finalFilename);
        
        console.log(`保存文件到: ${filePath}`);
        
        // 保存文件
        await writeFile(filePath, buffer);
        console.log(`文件保存成功: ${finalFilename}`);
        
        // 生成访问URL
        const fileUrl = `/uploads/images/${finalFilename}`;
        
        uploadedFiles.push({
          originalName: file.name,
          savedName: finalFilename,
          url: fileUrl,
          size: file.size,
          type: file.type
        });
        
        console.log(`文件上传成功: ${file.name} -> ${finalFilename}`);
        
      } catch (error) {
        console.error(`处理文件 ${file.name} 时出错:`, error);
        // 继续处理下一个文件
        continue;
      }
    }
    
    if (uploadedFiles.length === 0) {
      console.log('没有成功上传任何文件');
      return NextResponse.json({
        success: false,
        message: '没有成功上传任何文件'
      }, { status: 400 });
    }
    
    console.log(`成功上传 ${uploadedFiles.length} 个文件`);
    
    return NextResponse.json({
      success: true,
      message: `成功上传了 ${uploadedFiles.length} 个图片`,
      data: {
        uploadedFiles,
        totalFiles: files.length,
        successCount: uploadedFiles.length
      }
    });
    
  } catch (error) {
    console.error('图片上传失败:', error);
    return NextResponse.json({
      success: false,
      message: '图片上传失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, { status: 500 });
  }
} 