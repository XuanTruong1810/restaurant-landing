#!/bin/bash

# Restaurant Landing Page Deployment Script
set -e

# Configuration
ENVIRONMENT=${1:-staging}
BUILD_NUMBER=${2:-latest}
REGISTRY_URL=${REGISTRY_URL:-"ghcr.io/your-username"}
IMAGE_NAME="restaurant-landing"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

# Validate environment
validate_environment() {
    if [[ ! "$ENVIRONMENT" =~ ^(staging|production)$ ]]; then
        error "Invalid environment: $ENVIRONMENT. Must be 'staging' or 'production'"
    fi
    
    log "Deploying to $ENVIRONMENT environment"
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed"
    fi
    
    # Check if required environment variables are set
    if [ -z "$REGISTRY_URL" ]; then
        warn "REGISTRY_URL not set, using default"
    fi
    
    log "Prerequisites check completed"
}

# Pull latest images
pull_images() {
    log "Pulling latest Docker images..."
    
    export REGISTRY_URL
    export BUILD_NUMBER
    
    if [ "$ENVIRONMENT" = "staging" ]; then
        docker-compose -f docker-compose.staging.yml pull
    else
        docker-compose -f docker-compose.prod.yml pull
    fi
    
    log "Images pulled successfully"
}

# Deploy application
deploy() {
    log "Deploying application..."
    
    export REGISTRY_URL
    export BUILD_NUMBER
    
    if [ "$ENVIRONMENT" = "staging" ]; then
        # Deploy to staging
        docker-compose -f docker-compose.staging.yml down
        docker-compose -f docker-compose.staging.yml up -d
        
        # Wait for service to be ready
        log "Waiting for staging service to be ready..."
        sleep 30
        
        # Health check
        if curl -f http://localhost:3001/health; then
            log "Staging deployment successful"
        else
            error "Staging deployment failed - health check failed"
        fi
        
    else
        # Deploy to production
        log "Deploying to production with zero-downtime..."
        
        # Blue-green deployment simulation
        docker-compose -f docker-compose.prod.yml up -d --scale restaurant-landing-prod=2
        
        # Wait for new instances to be ready
        log "Waiting for new instances to be ready..."
        sleep 60
        
        # Health check
        if curl -f http://localhost:3000/health; then
            log "Production deployment successful"
            
            # Scale down old instances
            docker-compose -f docker-compose.prod.yml up -d --scale restaurant-landing-prod=2
        else
            error "Production deployment failed - health check failed"
        fi
    fi
}

# Rollback function
rollback() {
    log "Rolling back deployment..."
    
    if [ "$ENVIRONMENT" = "staging" ]; then
        docker-compose -f docker-compose.staging.yml down
        # Deploy previous version (implement version tracking)
        warn "Rollback for staging - manual intervention required"
    else
        docker-compose -f docker-compose.prod.yml down
        # Deploy previous version (implement version tracking)
        warn "Rollback for production - manual intervention required"
    fi
}

# Cleanup old images
cleanup() {
    log "Cleaning up old Docker images..."
    
    # Remove dangling images
    docker image prune -f
    
    # Remove old images (keep last 5 versions)
    docker images "${REGISTRY_URL}/${IMAGE_NAME}" --format "table {{.Repository}}:{{.Tag}}\t{{.CreatedAt}}" | \
    tail -n +2 | sort -k2 -r | tail -n +6 | awk '{print $1}' | xargs -r docker rmi
    
    log "Cleanup completed"
}

# Main deployment flow
main() {
    log "Starting deployment process..."
    
    validate_environment
    check_prerequisites
    
    # Trap for cleanup on exit
    trap cleanup EXIT
    
    # Trap for rollback on error
    trap rollback ERR
    
    pull_images
    deploy
    
    log "Deployment completed successfully!"
    
    # Show deployment info
    echo ""
    echo "=== Deployment Information ==="
    echo "Environment: $ENVIRONMENT"
    echo "Build Number: $BUILD_NUMBER"
    echo "Image: ${REGISTRY_URL}/${IMAGE_NAME}:${BUILD_NUMBER}"
    echo "Timestamp: $(date)"
    echo "============================="
}

# Handle script arguments
case "${1:-deploy}" in
    "deploy")
        main
        ;;
    "rollback")
        rollback
        ;;
    "cleanup")
        cleanup
        ;;
    *)
        echo "Usage: $0 [deploy|rollback|cleanup] [staging|production] [build_number]"
        echo ""
        echo "Examples:"
        echo "  $0 deploy staging 123"
        echo "  $0 deploy production latest"
        echo "  $0 rollback production"
        echo "  $0 cleanup"
        exit 1
        ;;
esac
