-- CreateTable
CREATE TABLE "regions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "nameCn" TEXT NOT NULL,
    "nameJp" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "hanabi_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "datetime" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "googleMap" TEXT NOT NULL,
    "detailLink" TEXT,
    "regionId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hanabi_events_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "matsuri_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "datetime" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "googleMap" TEXT NOT NULL,
    "detailLink" TEXT,
    "regionId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "matsuri_events_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "hanami_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "datetime" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "googleMap" TEXT NOT NULL,
    "detailLink" TEXT,
    "regionId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hanami_events_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "momiji_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "datetime" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "googleMap" TEXT NOT NULL,
    "detailLink" TEXT,
    "regionId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "momiji_events_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "illumination_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "datetime" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "googleMap" TEXT NOT NULL,
    "detailLink" TEXT,
    "regionId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "illumination_events_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "culture_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "datetime" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "googleMap" TEXT NOT NULL,
    "detailLink" TEXT,
    "regionId" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "culture_events_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "validation_results" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "localValue" TEXT,
    "externalValue" TEXT,
    "isConsistent" BOOLEAN NOT NULL,
    "confidenceScore" REAL NOT NULL DEFAULT 0.0,
    "notes" TEXT,
    "validationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "external_raw_data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "rawHtml" TEXT,
    "parsedData" JSONB NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "scrapeDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "regions_code_key" ON "regions"("code");

-- CreateIndex
CREATE INDEX "hanabi_events_regionId_idx" ON "hanabi_events"("regionId");

-- CreateIndex
CREATE INDEX "matsuri_events_regionId_idx" ON "matsuri_events"("regionId");

-- CreateIndex
CREATE INDEX "hanami_events_regionId_idx" ON "hanami_events"("regionId");

-- CreateIndex
CREATE INDEX "momiji_events_regionId_idx" ON "momiji_events"("regionId");

-- CreateIndex
CREATE INDEX "illumination_events_regionId_idx" ON "illumination_events"("regionId");

-- CreateIndex
CREATE INDEX "culture_events_regionId_idx" ON "culture_events"("regionId");

-- CreateIndex
CREATE INDEX "validation_results_eventId_eventType_idx" ON "validation_results"("eventId", "eventType");

-- CreateIndex
CREATE INDEX "validation_results_validationDate_idx" ON "validation_results"("validationDate");

-- CreateIndex
CREATE INDEX "validation_results_isConsistent_idx" ON "validation_results"("isConsistent");

-- CreateIndex
CREATE INDEX "external_raw_data_eventId_idx" ON "external_raw_data"("eventId");

-- CreateIndex
CREATE INDEX "external_raw_data_scrapeDate_idx" ON "external_raw_data"("scrapeDate");

-- CreateIndex
CREATE INDEX "external_raw_data_sourceType_idx" ON "external_raw_data"("sourceType");
