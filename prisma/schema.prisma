datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Ganti 'User' dengan model yang Anda butuhkan, misalnya 'Lead' atau 'Order'
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
