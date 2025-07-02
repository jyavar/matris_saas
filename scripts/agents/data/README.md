# @data Agent - Automated Data Processing

## 📋 Overview

The `@data` agent provides automated data processing capabilities for the STRATO Core OS™ framework. It handles database migrations, seeding, validation, backup operations, and analytics processing in a unified, configurable interface.

## 🚀 Features

### **Core Operations**
- **Database Migrations** - Automated schema updates and migrations
- **Data Seeding** - Populate database with initial/test data
- **Data Validation** - Environment and schema validation
- **Backup Operations** - Automated backup and restore
- **Analytics Processing** - Process and analyze data

### **Advanced Features**
- **Configurable Operations** - Run specific operations or all
- **Detailed Reporting** - Comprehensive operation results
- **Error Handling** - Graceful failure handling and recovery
- **CLI Interface** - Command-line tool for automation
- **Integration Ready** - Easy integration with CI/CD pipelines

## 🏗️ Architecture

### **Components**

```
@data Agent
├── DataManager          # Main orchestration class
├── DataProcessor        # Core processing logic
├── CLI Interface        # Command-line interface
└── Test Suite          # Comprehensive tests
```

### **Data Flow**

```
Input Options → DataManager → DataProcessor → Operations → Results → Reports
```

## 📖 Usage

### **Basic Usage**

```bash
# Run all operations
pnpm tsx scripts/agents/data/index.ts

# Run specific operations
pnpm tsx scripts/agents/data/index.ts --migrate --validate

# Verbose output
pnpm tsx scripts/agents/data/index.ts --verbose
```

### **Programmatic Usage**

```typescript
import { DataManager } from './scripts/agents/data/index'

const manager = new DataManager({
  migrate: true,
  seed: true,
  validate: true,
  verbose: true
})

const result = await manager.run()
console.log(result.status) // 'SUCCESS' | 'FAILED' | 'PARTIAL'
```

### **CLI Options**

| Option | Description | Default |
|--------|-------------|---------|
| `--migrate` | Run database migrations | `true` |
| `--seed` | Run database seeding | `false` |
| `--validate` | Run data validation | `true` |
| `--backup` | Run backup operations | `false` |
| `--analytics` | Run analytics processing | `true` |
| `--verbose, -v` | Enable verbose output | `false` |
| `--no-save` | Don't save processing report | `false` |
| `--no-exit` | Don't exit on failure | `false` |
| `--help, -h` | Show help message | - |

## 🔧 Configuration

### **Environment Variables**

The agent requires the following environment variables:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
```

### **Project Structure**

The agent expects the following project structure:

```
project/
├── supabase/
│   ├── config.toml          # Supabase configuration
│   └── migrations/          # Database migrations
├── scripts/
│   ├── db-seed.ts          # Database seeding script
│   └── backup.ts           # Backup script
└── logs/                   # Processing logs
```

## 📊 Output

### **Result Structure**

```typescript
interface DataResult {
  status: 'SUCCESS' | 'FAILED' | 'PARTIAL'
  summary: string
  timestamp: string
  operations: {
    migration: OperationResult
    seeding: OperationResult
    validation: OperationResult
    backup: OperationResult
    analytics: OperationResult
  }
  errors: string[]
  warnings: string[]
}
```

### **Operation Results**

```typescript
interface OperationResult {
  status: 'SUCCESS' | 'FAILED' | 'SKIPPED'
  message: string
  details?: unknown
  duration?: number
}
```

### **Example Output**

```
🔄 @data Agent Manager - Starting data processing...

📊 Data Processing Results:
==================================================
Status: ✅ SUCCESS
Summary: Data processing completed with 4/5 successful operations. 0 errors, 1 warnings.

📋 Operations:
✅ migration: SUCCESS - Database migrations completed successfully
   Duration: 1250ms
⏭️ seeding: SKIPPED - No seed script found
✅ validation: SUCCESS - Data validation completed successfully
   Duration: 320ms
⏭️ backup: SKIPPED - No backup script found
✅ analytics: SUCCESS - Analytics processing completed - 847 records processed
   Duration: 890ms

⚠️ Warnings:
1. Database seeding skipped - No seed script found

✅ Data processing completed
```

## 🧪 Testing

### **Run Tests**

```bash
# Run all tests
pnpm test scripts/agents/data/

# Run specific test file
pnpm test scripts/agents/data/index.test.ts

# Run with coverage
pnpm test:coverage scripts/agents/data/
```

### **Test Coverage**

The test suite covers:
- ✅ **DataManager** - Constructor, run method, display results
- ✅ **DataProcessor** - All processing operations
- ✅ **Environment Validation** - Variable checking
- ✅ **Schema Validation** - Database schema validation
- ✅ **Error Handling** - Graceful failure scenarios
- ✅ **CLI Interface** - Command-line argument parsing
- ✅ **Integration Tests** - Complete workflow testing

## 🔄 Integration

### **CI/CD Integration**

```yaml
# GitHub Actions example
- name: Data Processing
  run: |
    pnpm tsx scripts/agents/data/index.ts --migrate --validate --no-exit
```

### **Pre-commit Hooks**

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "pnpm tsx scripts/agents/data/index.ts --validate"
    }
  }
}
```

### **Scheduled Tasks**

```bash
# Cron job for daily backup
0 2 * * * cd /path/to/project && pnpm tsx scripts/agents/data/index.ts --backup
```

## 🚨 Error Handling

### **Common Errors**

| Error | Cause | Solution |
|-------|-------|----------|
| `Database migration failed` | Supabase not available | Check Supabase configuration |
| `Missing environment variables` | Required vars not set | Set SUPABASE_URL, SUPABASE_ANON_KEY, JWT_SECRET |
| `Schema validation failed` | No migration files | Create migration files in supabase/migrations/ |
| `Backup operations failed` | No backup script | Create scripts/backup.ts |

### **Recovery**

The agent provides detailed error information and recovery suggestions:

```bash
# Check environment
pnpm tsx scripts/agents/data/index.ts --validate

# Run with verbose output for debugging
pnpm tsx scripts/agents/data/index.ts --verbose --no-exit
```

## 📈 Performance

### **Optimization Tips**

1. **Selective Operations** - Only run needed operations
2. **Parallel Processing** - Operations run sequentially (future enhancement)
3. **Caching** - Results are cached for repeated operations
4. **Logging** - Detailed logs for performance analysis

### **Benchmarks**

| Operation | Average Time | Notes |
|-----------|-------------|-------|
| Migration | 1-3 seconds | Depends on schema complexity |
| Validation | 200-500ms | Environment and schema checks |
| Analytics | 500ms-2s | Data processing time |
| Backup | 1-5 seconds | Depends on data size |

## 🔮 Future Enhancements

### **Planned Features**
- [ ] **Parallel Processing** - Run operations concurrently
- [ ] **Incremental Backups** - Smart backup strategies
- [ ] **Data Migration Tools** - Advanced migration utilities
- [ ] **Real-time Monitoring** - Live operation tracking
- [ ] **Plugin System** - Extensible operation types

### **API Enhancements**
- [ ] **REST API** - HTTP interface for operations
- [ ] **WebSocket Support** - Real-time status updates
- [ ] **GraphQL Integration** - Query-based data operations

## 🤝 Contributing

### **Development Setup**

```bash
# Clone and setup
git clone <repository>
cd scripts/agents/data
pnpm install

# Run tests
pnpm test

# Run agent
pnpm tsx index.ts --help
```

### **Code Standards**

- ✅ **TypeScript** - Strict typing
- ✅ **ESLint** - Code quality
- ✅ **Prettier** - Code formatting
- ✅ **Tests** - 90%+ coverage required
- ✅ **Documentation** - JSDoc comments

## 📄 License

This agent is part of the STRATO Core OS™ framework and follows the same licensing terms.

---

**@data Agent** - Making data processing effortless and reliable in STRATO Core OS™ 🚀 