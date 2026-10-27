# =============================================================
# VELORA Future Lab - Database Setup & Verification Script
# =============================================================
[CmdletBinding()]
param(
    [string]$HostName = "localhost",
    [int]$Port = 5432,
    [string]$User = "postgres",
    [string]$Database = "velora_futurelab",
    [string]$Password,
    [string]$PsqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
)

# 1. Resolve psql executable
if (-not (Test-Path $PsqlPath)) {
    $foundPsql = Get-Command psql -ErrorAction SilentlyContinue
    if ($foundPsql) {
        $PsqlPath = $foundPsql.Source
    } else {
        Write-Error "Could not locate psql.exe at '$PsqlPath' or in system PATH."
        exit 1
    }
}

# 2. Resolve password from arguments, environment, or .env
if (-not $Password) {
    if ($env:PGPASSWORD) {
        $Password = $env:PGPASSWORD
    } elseif (Test-Path "$PSScriptRoot\..\.env") {
        $envLines = Get-Content "$PSScriptRoot\..\.env"
        foreach ($line in $envLines) {
            if ($line -match "^\s*DB_PASSWORD\s*=\s*(.*)$") {
                $Password = $matches[1].Trim().Trim('"').Trim("'")
                break
            } elseif ($line -match "postgresql://[^:]+:([^@]+)@") {
                $Password = $matches[1].Trim()
                break
            }
        }
    }
}

if (-not $Password) {
    $Password = Read-Host -Prompt "Enter PostgreSQL password for user '$User'"
}

$env:PGPASSWORD = $Password

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host " VELORA Future Lab Database Setup & Verification" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Target Host:     $HostName"
Write-Host "Target Port:     $Port"
Write-Host "Target User:     $User"
Write-Host "Target Database: $Database"
Write-Host "Psql Path:       $PsqlPath"
Write-Host ""

# 3. Test basic connection
Write-Host "[1/4] Testing PostgreSQL server connection..." -ForegroundColor Yellow
$connTest = & $PsqlPath -h $HostName -p $Port -U $User -d postgres -w -t -A -c "SELECT version();" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to connect to PostgreSQL server: $connTest"
    $env:PGPASSWORD = $null
    exit 1
}
Write-Host "Connected successfully. Version: $($connTest.Split([Environment]::NewLine)[0])" -ForegroundColor Green

# 4. Check Database velora_futurelab
Write-Host "`n[2/4] Checking database '$Database'..." -ForegroundColor Yellow
$dbCheck = & $PsqlPath -h $HostName -p $Port -U $User -d postgres -w -t -A -c "SELECT 1 FROM pg_database WHERE datname = '$Database';" 2>&1
if ($dbCheck -match "1") {
    Write-Host "Database '$Database' exists." -ForegroundColor Green
} else {
    Write-Error "Database '$Database' does not exist."
    $env:PGPASSWORD = $null
    exit 1
}

# 5. Run Migration
Write-Host "`n[3/4] Applying migration (database/migrations/001_initial_velora_futurelab.sql)..." -ForegroundColor Yellow
$migrationFile = Join-Path $PSScriptRoot "migrations\001_initial_velora_futurelab.sql"
if (-not (Test-Path $migrationFile)) {
    Write-Error "Migration file not found at: $migrationFile"
    $env:PGPASSWORD = $null
    exit 1
}

$migrationOutput = & $PsqlPath -h $HostName -p $Port -U $User -d $Database -w -f $migrationFile 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Error applying migration: $migrationOutput"
    $env:PGPASSWORD = $null
    exit 1
}
Write-Host "Migration applied successfully." -ForegroundColor Green

# 6. Verification
Write-Host "`n[4/4] Verifying database schema..." -ForegroundColor Yellow

$tablesQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name;"
$existingTables = & $PsqlPath -h $HostName -p $Port -U $User -d $Database -w -t -A -c $tablesQuery 2>&1
$existingTableList = $existingTables -split "`r?`n" | Where-Object { $_ -match "\S" }

$expectedTables = @(
    "admins",
    "services",
    "blog_categories",
    "blog_posts",
    "careers",
    "job_applications",
    "contact_submissions",
    "pages",
    "media"
)

Write-Host "`n--- Table Verification ---" -ForegroundColor Cyan
$missingTables = @()
foreach ($t in $expectedTables) {
    if ($existingTableList -contains $t) {
        Write-Host " [OK] Table: $t" -ForegroundColor Green
    } else {
        Write-Host " [MISSING] Table: $t" -ForegroundColor Red
        $missingTables += $t
    }
}

$indexesQuery = "SELECT count(*) FROM pg_indexes WHERE schemaname = 'public';"
$indexCount = & $PsqlPath -h $HostName -p $Port -U $User -d $Database -w -t -A -c $indexesQuery 2>&1

$fkQuery = "SELECT count(*) FROM information_schema.table_constraints WHERE constraint_schema = 'public' AND constraint_type = 'FOREIGN KEY';"
$fkCount = & $PsqlPath -h $HostName -p $Port -U $User -d $Database -w -t -A -c $fkQuery 2>&1

$trgQuery = "SELECT count(*) FROM information_schema.triggers WHERE trigger_schema = 'public';"
$trgCount = & $PsqlPath -h $HostName -p $Port -U $User -d $Database -w -t -A -c $trgQuery 2>&1

Write-Host "`n--- Summary ---" -ForegroundColor Cyan
Write-Host "Total Public Tables:  $($existingTableList.Count) / $($expectedTables.Count)"
Write-Host "Total Public Indexes: $($indexCount.Trim())"
Write-Host "Total Foreign Keys:   $($fkCount.Trim())"
Write-Host "Total Triggers:       $($trgCount.Trim())"

if ($missingTables.Count -eq 0) {
    Write-Host "`nAll 9 tables and database requirements verified successfully!" -ForegroundColor Green
} else {
    Write-Warning "Missing tables detected: $($missingTables -join ', ')"
}

$env:PGPASSWORD = $null
