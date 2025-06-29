# 🐋 Docker – Jukselapp for Aino

## 📦 Starte lokal Postgres

### Grunnleggende PostgreSQL Container
```bash
docker run --name aino-postgres \
  -e POSTGRES_USER=aino \
  -e POSTGRES_PASSWORD=1Plomme3 \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -d postgres
```

### Med Persistent Storage
```bash
docker run --name aino-postgres \
  -e POSTGRES_USER=aino \
  -e POSTGRES_PASSWORD=1Plomme3 \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -v aino-postgres-data:/var/lib/postgresql/data \
  -d postgres
```

### Med Custom Network
```bash
# Opprett network
docker network create aino-network

# Start PostgreSQL med network
docker run --name aino-postgres \
  --network aino-network \
  -e POSTGRES_USER=aino \
  -e POSTGRES_PASSWORD=1Plomme3 \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -d postgres
```

---

## 🔧 Container Management

### Sjekke Status
```bash
# Liste alle containere
docker ps -a

# Sjekke logs
docker logs aino-postgres

# Sjekke container info
docker inspect aino-postgres
```

### Starte/Stoppe
```bash
# Starte container
docker start aino-postgres

# Stoppe container
docker stop aino-postgres

# Restarte container
docker restart aino-postgres
```

### Slette Container
```bash
# Stoppe og slette container
docker rm -f aino-postgres

# Slette alle stoppet containere
docker container prune
```

---

## 🗄️ Database Operasjoner

### Koble til PostgreSQL
```bash
# Via docker exec
docker exec -it aino-postgres psql -U aino -d postgres

# Via psql (hvis installert lokalt)
psql -h localhost -p 5432 -U aino -d postgres
```

### Backup og Restore
```bash
# Backup database
docker exec aino-postgres pg_dump -U aino postgres > backup.sql

# Restore database
docker exec -i aino-postgres psql -U aino postgres < backup.sql

# Backup med custom format
docker exec aino-postgres pg_dump -U aino -Fc postgres > backup.dump

# Restore custom format
docker exec -i aino-postgres pg_restore -U aino -d postgres < backup.dump
```

---

## 🐳 Docker Compose (Anbefalt)

### docker-compose.yml
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:latest
    container_name: aino-postgres
    environment:
      POSTGRES_USER: aino
      POSTGRES_PASSWORD: 1Plomme3
      POSTGRES_DB: postgres
    ports:
      - "5432:5432"
    volumes:
      - aino-postgres-data:/var/lib/postgresql/data
    networks:
      - aino-network

  # Backend service (fremtidig)
  backend:
    build: ./backend
    container_name: aino-backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://aino:1Plomme3@postgres:5432/postgres
    depends_on:
      - postgres
    networks:
      - aino-network

volumes:
  aino-postgres-data:

networks:
  aino-network:
    driver: bridge
```

### Kommandoer med Docker Compose
```bash
# Starte alle services
docker-compose up -d

# Stoppe alle services
docker-compose down

# Se logs
docker-compose logs postgres

# Restarte service
docker-compose restart postgres
```

---

## 🔍 Troubleshooting

### Connection Issues
```bash
# Sjekke om port er i bruk
lsof -i :5432

# Sjekke container status
docker ps | grep postgres

# Sjekke logs for feil
docker logs aino-postgres
```

### Reset Database
```bash
# Stoppe og slette container
docker rm -f aino-postgres

# Slette volume (VARSEL: Sletter all data!)
docker volume rm aino-postgres-data

# Starte på nytt
docker run --name aino-postgres \
  -e POSTGRES_USER=aino \
  -e POSTGRES_PASSWORD=1Plomme3 \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -d postgres
```

### Performance Issues
```bash
# Sjekke container ressurser
docker stats aino-postgres

# Sjekke disk usage
docker system df

# Cleanup ubrukte ressurser
docker system prune -a
```

---

## 🚀 Miljøvariabler

### Backend .env
```bash
DATABASE_URL=postgresql://aino:1Plomme3@localhost:5432/postgres
```

### Frontend .env
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

---

## 📋 Snarveier

### Quick Start
```bash
# 1. Start PostgreSQL
docker run --name aino-postgres \
  -e POSTGRES_USER=aino \
  -e POSTGRES_PASSWORD=1Plomme3 \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -d postgres

# 2. Vent 5 sekunder
sleep 5

# 3. Test connection
docker exec aino-postgres psql -U aino -d postgres -c "SELECT version();"
```

### Cleanup Script
```bash
#!/bin/bash
echo "🧹 Cleaning up Aino containers..."
docker stop aino-postgres 2>/dev/null
docker rm aino-postgres 2>/dev/null
docker volume rm aino-postgres-data 2>/dev/null
echo "✅ Cleanup complete!"
```

---

## 🎯 Tips & Tricks

### Development Workflow
1. **Start PostgreSQL:** `docker run --name aino-postgres ...`
2. **Oppdater DATABASE_URL:** `postgresql://aino:1Plomme3@localhost:5432/postgres`
3. **Kjør migrations:** `npx drizzle-kit push`
4. **Seed database:** `npx tsx scripts/seed.ts`
5. **Start backend:** `cd backend && npm run dev`
6. **Start frontend:** `cd frontend && npm run dev`

### Production Considerations
- Bruk secrets management for passwords
- Sett opp backup strategy
- Konfigurer monitoring og logging
- Bruk health checks
- Sett opp SSL/TLS for database connections

---

**💡 Husk:** Docker containers er ephemeral - bruk volumes for persistent data! 