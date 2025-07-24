# Restaurant Landing Page Deployment Script (PowerShell)
param(
    [Parameter(Position=0)]
    [ValidateSet("staging", "production")]
    [string]$Environment = "staging",
    
    [Parameter(Position=1)]
    [string]$BuildNumber = "latest",
    
    [Parameter()]
    [string]$RegistryUrl = $env:REGISTRY_URL
)

# Configuration
$ImageName = "restaurant-landing"
$ErrorActionPreference = "Stop"

# Logging functions
function Write-Log {
    param([string]$Message)
    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] $Message" -ForegroundColor Green
}

function Write-Error-Log {
    param([string]$Message)
    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] ERROR: $Message" -ForegroundColor Red
    exit 1
}

function Write-Warning-Log {
    param([string]$Message)
    Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] WARNING: $Message" -ForegroundColor Yellow
}

# Validate environment
function Test-Environment {
    Write-Log "Deploying to $Environment environment"
}

# Check prerequisites
function Test-Prerequisites {
    Write-Log "Checking prerequisites..."
    
    # Check if Docker is installed
    try {
        docker --version | Out-Null
    }
    catch {
        Write-Error-Log "Docker is not installed or not in PATH"
    }
    
    # Check if Docker Compose is installed
    try {
        docker-compose --version | Out-Null
    }
    catch {
        Write-Error-Log "Docker Compose is not installed or not in PATH"
    }
    
    # Check if required environment variables are set
    if (-not $RegistryUrl) {
        Write-Warning-Log "REGISTRY_URL not set, using default"
        $script:RegistryUrl = "ghcr.io/your-username"
    }
    
    Write-Log "Prerequisites check completed"
}

# Pull latest images
function Get-LatestImages {
    Write-Log "Pulling latest Docker images..."
    
    $env:REGISTRY_URL = $RegistryUrl
    $env:BUILD_NUMBER = $BuildNumber
    
    if ($Environment -eq "staging") {
        docker-compose -f docker-compose.staging.yml pull
    }
    else {
        docker-compose -f docker-compose.prod.yml pull
    }
    
    Write-Log "Images pulled successfully"
}

# Deploy application
function Start-Deployment {
    Write-Log "Deploying application..."
    
    $env:REGISTRY_URL = $RegistryUrl
    $env:BUILD_NUMBER = $BuildNumber
    
    if ($Environment -eq "staging") {
        # Deploy to staging
        docker-compose -f docker-compose.staging.yml down
        docker-compose -f docker-compose.staging.yml up -d
        
        # Wait for service to be ready
        Write-Log "Waiting for staging service to be ready..."
        Start-Sleep -Seconds 30
        
        # Health check
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing
            if ($response.StatusCode -eq 200) {
                Write-Log "Staging deployment successful"
            }
            else {
                Write-Error-Log "Staging deployment failed - health check failed"
            }
        }
        catch {
            Write-Error-Log "Staging deployment failed - health check failed: $($_.Exception.Message)"
        }
    }
    else {
        # Deploy to production
        Write-Log "Deploying to production with zero-downtime..."
        
        # Blue-green deployment simulation
        docker-compose -f docker-compose.prod.yml up -d --scale restaurant-landing-prod=2
        
        # Wait for new instances to be ready
        Write-Log "Waiting for new instances to be ready..."
        Start-Sleep -Seconds 60
        
        # Health check
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -UseBasicParsing
            if ($response.StatusCode -eq 200) {
                Write-Log "Production deployment successful"
                
                # Scale down old instances
                docker-compose -f docker-compose.prod.yml up -d --scale restaurant-landing-prod=2
            }
            else {
                Write-Error-Log "Production deployment failed - health check failed"
            }
        }
        catch {
            Write-Error-Log "Production deployment failed - health check failed: $($_.Exception.Message)"
        }
    }
}

# Rollback function
function Start-Rollback {
    Write-Log "Rolling back deployment..."
    
    if ($Environment -eq "staging") {
        docker-compose -f docker-compose.staging.yml down
        Write-Warning-Log "Rollback for staging - manual intervention required"
    }
    else {
        docker-compose -f docker-compose.prod.yml down
        Write-Warning-Log "Rollback for production - manual intervention required"
    }
}

# Cleanup old images
function Remove-OldImages {
    Write-Log "Cleaning up old Docker images..."
    
    # Remove dangling images
    docker image prune -f
    
    # Remove old images (keep last 5 versions)
    $images = docker images "$RegistryUrl/$ImageName" --format "table {{.Repository}}:{{.Tag}}`t{{.CreatedAt}}" | 
              Select-Object -Skip 1 | 
              Sort-Object { [DateTime]::Parse(($_ -split "`t")[1]) } -Descending |
              Select-Object -Skip 5
    
    foreach ($image in $images) {
        $imageTag = ($image -split "`t")[0]
        docker rmi $imageTag
    }
    
    Write-Log "Cleanup completed"
}

# Main deployment flow
function Start-Main {
    Write-Log "Starting deployment process..."
    
    Test-Environment
    Test-Prerequisites
    
    try {
        Get-LatestImages
        Start-Deployment
        
        Write-Log "Deployment completed successfully!"
        
        # Show deployment info
        Write-Host ""
        Write-Host "=== Deployment Information ===" -ForegroundColor Cyan
        Write-Host "Environment: $Environment" -ForegroundColor Cyan
        Write-Host "Build Number: $BuildNumber" -ForegroundColor Cyan
        Write-Host "Image: $RegistryUrl/$ImageName`:$BuildNumber" -ForegroundColor Cyan
        Write-Host "Timestamp: $(Get-Date)" -ForegroundColor Cyan
        Write-Host "=============================" -ForegroundColor Cyan
    }
    catch {
        Write-Error-Log "Deployment failed: $($_.Exception.Message)"
        Start-Rollback
    }
    finally {
        Remove-OldImages
    }
}

# Execute main function
Start-Main
