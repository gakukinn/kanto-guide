# Windows + Next.js 安全开发启动脚本
# 解决文件权限和锁定问题

function Start-DevSafely {
    Write-Host "🔧 清理开发环境..." -ForegroundColor Yellow
    
    # 1. 强制结束所有Node进程
    Write-Host "⏹️ 结束现有Node进程..."
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep 2
    
    # 2. 清理.next目录
    if (Test-Path ".next") {
        Write-Host "🗑️ 清理 .next 目录..."
        Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
        Start-Sleep 1
    }
    
    # 3. 清理临时文件
    Write-Host "🧹 清理临时文件..."
    Get-ChildItem -Path "." -Recurse -Name "*.tmp" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
    Get-ChildItem -Path "." -Recurse -Name "*.lock" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
    
    # 4. 清理npm缓存
    Write-Host "📦 清理npm缓存..."
    npm cache clean --force 2>$null
    
    # 5. 等待文件系统稳定
    Write-Host "⏳ 等待文件系统稳定..."
    Start-Sleep 3
    
    Write-Host "✅ 环境清理完成，启动开发服务器..." -ForegroundColor Green
    npm run dev
}

# 主函数
function Main {
    try {
        Start-DevSafely
    }
    catch {
        Write-Host "❌ 启动失败: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "💡 请尝试以管理员身份运行PowerShell" -ForegroundColor Yellow
    }
}

# 执行
Main 