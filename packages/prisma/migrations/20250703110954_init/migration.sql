-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "ContactCategory" AS ENUM ('TOP_EXECUTIVE', 'MIDDLE_MANAGEMENT', 'CUSTOMER_SUPPORT', 'OTHER');

-- CreateEnum
CREATE TYPE "MediaCategory" AS ENUM ('PRESS', 'TV', 'ONLINE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileImage" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "company_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "CompanyContact" (
    "contact_id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "category" "ContactCategory",

    CONSTRAINT "CompanyContact_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "MediaContact" (
    "media_contact_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "category" "MediaCategory" NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "MediaContact_pkey" PRIMARY KEY ("media_contact_id")
);

-- CreateTable
CREATE TABLE "ComplaintMediaContact" (
    "complaint_id" INTEGER NOT NULL,
    "media_contact_id" INTEGER NOT NULL,
    "contacted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response_status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "ComplaintMediaContact_pkey" PRIMARY KEY ("complaint_id","media_contact_id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "complaint_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "disputed_value" DOUBLE PRECISION NOT NULL,
    "desired_resolution" TEXT NOT NULL,
    "current_escalation_level" INTEGER NOT NULL DEFAULT 1,
    "next_escalation_due_at" TIMESTAMP(3),
    "last_escalation_triggered" TIMESTAMP(3),
    "escalation_status" TEXT,
    "level1_subject" TEXT,
    "level1_issue_summary" TEXT,
    "level1_impact" TEXT,
    "level1_prior_attempts" TEXT,
    "level1_requested_action" TEXT,
    "level1_generated_email" TEXT,
    "level2_new_info" TEXT,
    "level2_tone_adjustment" TEXT,
    "level2_generated_email" TEXT,
    "level3_executive_warning" TEXT,
    "level3_external_threat" TEXT,
    "level3_generated_email" TEXT,
    "level4_media_plan" TEXT,
    "level4_generated_email" TEXT,
    "level5_legal_reference" TEXT,
    "level5_generated_email" TEXT,
    "level6_social_summary" TEXT,
    "level6_generated_email" TEXT,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("complaint_id")
);

-- CreateTable
CREATE TABLE "ComplaintContact" (
    "complaint_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "contacted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response_status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "ComplaintContact_pkey" PRIMARY KEY ("complaint_id","contact_id")
);

-- CreateTable
CREATE TABLE "ClassActionGroup" (
    "group_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "ClassActionGroup_pkey" PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "Scorecard" (
    "company_id" INTEGER NOT NULL,
    "response_time_avg" DOUBLE PRECISION NOT NULL,
    "resolution_rate" DOUBLE PRECISION NOT NULL,
    "customer_satisfaction" DOUBLE PRECISION NOT NULL,
    "escalation_frequency" DOUBLE PRECISION NOT NULL,
    "compensation_fairness" DOUBLE PRECISION NOT NULL,
    "recurrence_rate" DOUBLE PRECISION NOT NULL,
    "calculated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scorecard_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "Communication" (
    "communication_id" SERIAL NOT NULL,
    "complaint_id" INTEGER NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "sender_type" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "read_receipt" BOOLEAN NOT NULL,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("communication_id")
);

-- CreateTable
CREATE TABLE "Escalation" (
    "escalation_id" SERIAL NOT NULL,
    "complaint_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "triggered_at" TIMESTAMP(3) NOT NULL,
    "details" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Escalation_pkey" PRIMARY KEY ("escalation_id")
);

-- CreateTable
CREATE TABLE "Settlement" (
    "settlement_id" SERIAL NOT NULL,
    "complaint_id" INTEGER NOT NULL,
    "offered_amount" DECIMAL(65,30) NOT NULL,
    "counter_offer_amount" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "offered_at" TIMESTAMP(3) NOT NULL,
    "resolved_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settlement_pkey" PRIMARY KEY ("settlement_id")
);

-- CreateTable
CREATE TABLE "Document" (
    "document_id" SERIAL NOT NULL,
    "complaint_id" INTEGER NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL,
    "file_type" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "CompanyContact" ADD CONSTRAINT "CompanyContact_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaContact" ADD CONSTRAINT "MediaContact_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintMediaContact" ADD CONSTRAINT "ComplaintMediaContact_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "Complaint"("complaint_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintMediaContact" ADD CONSTRAINT "ComplaintMediaContact_media_contact_id_fkey" FOREIGN KEY ("media_contact_id") REFERENCES "MediaContact"("media_contact_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintContact" ADD CONSTRAINT "ComplaintContact_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "Complaint"("complaint_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplaintContact" ADD CONSTRAINT "ComplaintContact_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "CompanyContact"("contact_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scorecard" ADD CONSTRAINT "Scorecard_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "Complaint"("complaint_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalation" ADD CONSTRAINT "Escalation_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "Complaint"("complaint_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "Complaint"("complaint_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_complaint_id_fkey" FOREIGN KEY ("complaint_id") REFERENCES "Complaint"("complaint_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
